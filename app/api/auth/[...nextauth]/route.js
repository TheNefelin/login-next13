import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch("https://kartax-api-py.vercel.app/usuario-logearse/", {
            cache: "no-store",
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=&username=${credentials.username}&password=${credentials.password}&scope=&client_id=&client_secret=`,
          })  
 
          const data = await res.json()
          console.log(data)

          if (!res.ok) {
            return null
          } else {
            const user = { name: credentials.username, email: credentials.username }
            return user
          }
        } catch (err) {
          return null
        }
      }
    })
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 
