import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google" 
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOperation } from "@/app/lib/main";
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
              username: { label: "Username", type: "text", placeholder: "sagar" },
              password: {  label: "Password", type: "password" }
            },
            async authorize(credentials) {
              //here custom logic will go to check that user is in db and credentials are correct
              console.log(credentials)
              if (!credentials || !credentials.username || !credentials.password)
                  return null;
              console.log("hello2")
              const Auth = new AuthOperation()
              
              const {username, password} = credentials
              console.log(username,password)
              const res = await Auth.login({ identifier: username, password: password })
              console.log(res)
              return res.data as any
            }
          })
    ],
    callbacks: {
      async jwt({ token, user, account}) {
        if (user) {
          token.id = user.id;
        }
        if (account) {
          token.accessToken = account.access_token;
          console.log(account.access_token)
          
        }
        return token;
      },
    },
})
export {handler as GET, handler as POST}