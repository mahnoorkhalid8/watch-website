import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

const users = [
    { id: "1", name: "Mahnoor", email: "mahnoorkhalid814@gmai.com", password: bcrypt.hashSync("123456", 10) },
];

export const authOptions: NextAuthOptions ={
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                const user = users.find(u => u.email === credentials?.email);
                if (user && bcrypt.compareSync(credentials!.password, user.password)) {
                    return {id: user.id, name: user.name, email: user.email};
                }
                return null;
            },
        }),
    ],
    pages: {signIn: "/login"},
    session: {strategy: "jwt"},
    secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here-change-in-production",
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
};
