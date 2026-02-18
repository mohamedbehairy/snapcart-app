import { UserInterface } from "@/interfaces/AuthInterfaces";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Snap Cart",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(authData) {
        try {
          const response = await fetch(
            `${process.env.API_URL}/api/v1/auth/signin`,
            {
              method: "POST",
              body: JSON.stringify({
                email: authData?.email,
                password: authData?.password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          const data = await response.json();
          if (response.ok) {
            return {
              id: data.user.email,
              user: data.user,
              token: data.token,
            };
          } else {
            throw new Error(data.message || "Authentication failed");
          }
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Authentication service unavailable");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user: userRes }) {
      if (userRes) {
        token.user = userRes.user;
        token.token = userRes.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as UserInterface;
        session.token = token.token as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.AUTH_SECRET,
};
