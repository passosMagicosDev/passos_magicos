import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(
        credentials: { email: string; password: string } | undefined,
        req
      ) {
        const user = await prisma.user.findUnique({
          where: {
            email: "",
          },
        });

        if (!user) return null;

        const passwordMatch = await compare("", user?.password);

        if (passwordMatch) {
          return {
            id: user.id.toString(), // Assuming id is a string in User type
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
