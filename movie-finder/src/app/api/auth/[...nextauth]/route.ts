import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { prisma } from "../../../../../lib/prisma";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email.toLowerCase() }
                });
                if (!user) {
                    return null;
                }
                const isPasswordValid = await compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
            }
        }),
    ],
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token && session.user) {
            session.user.id = token.id as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXT_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };