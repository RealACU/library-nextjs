import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "name", type: "text" },
        secret: { label: "secret", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.name || !credentials?.secret) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            name: credentials.name,
          },
        });

        if (!user || !user?.hashedSecret) {
          throw new Error("Invalid credentials");
        }

        const isCorrectSecret = await bcrypt.compare(
          credentials.secret,
          user.hashedSecret
        );

        if (!isCorrectSecret) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
