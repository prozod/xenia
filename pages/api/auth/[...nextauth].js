import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	callbacks: {
		async session({ session, user }) {
			if (session?.user) {
				session.user.id = user.id
			}
			return session
		},
		async signOut() {
			console.log("logged out")
		},
	},
}
export default NextAuth(authOptions)
