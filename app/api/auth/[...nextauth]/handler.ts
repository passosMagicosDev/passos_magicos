import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
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
        const voluntario = await prisma.voluntario.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!voluntario) return null;
        if (credentials?.password && voluntario.senha) {
          const passwordMatch = await compare(
            credentials?.password,
            voluntario.senha
          );
          if (passwordMatch) {
            return {
              id: voluntario.id.toString(), // Assuming id is a string in voluntario type
              email: voluntario.email,
            };
          }
          return null;
        }

        return null;
      },
    }),
  ],
};
