import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { GoogleProfile } from "next-auth/providers/google";
import { createUser, findUserByEmail } from "@/lib/user";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        try {
          const user = await findUserByEmail(credentials?.email as string);
          if (!user) return null;

          const isValidPassword = await bcrypt.compare(
            credentials?.password ?? "",
            user.password_hash as string
          );

          if (!isValidPassword) return null;

          return {
            id: String(user.id),
            email: user.email,
            name: user.username,
            phone_number: user.phone_number,
          };
        } catch (error) {
          console.error("Credentials Provider Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          const existingUser = await findUserByEmail(profile?.email as string);
          if (!existingUser) {
            await createUser({
              username: profile?.name as string,
              email: profile?.email as string,
            });
          }
          return true;
        } catch (error) {
          console.error("Google Sign-In Error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
        if (token) {
            session.user = {
                email: token.email,
                name: token.name,
            };
        };
        session.user.token = token;
        return session;
      },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
