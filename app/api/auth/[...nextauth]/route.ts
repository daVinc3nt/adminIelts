import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google" 
import { NextAuthOptions } from "next-auth";
import { cookies } from "next/headers";
export const authOptions: NextAuthOptions = {
	secret: process.env.AUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token = Object.assign({}, token, {
					myToken: account.access_token,
				});
				cookies().set("gid", account.access_token);
			}
			return token;
		},
	},
};
const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}