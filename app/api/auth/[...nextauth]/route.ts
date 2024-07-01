import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "@/lib/prisma";

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
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Por favor, preencha todos os campos.");
        }

        const voluntario = await prisma.voluntario.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!voluntario) {
          throw new Error("E-mail não encontrado.");
        }

        // Verifica se voluntario.senha é uma string antes de comparar
        if (typeof voluntario.senha !== "string") {
          throw new Error("Erro: senha do voluntário inválida.");
        }

        const passwordMatch = await compare(
          credentials.password,
          voluntario.senha
        );

        if (!passwordMatch) {
          throw new Error("Senha incorreta.");
        }

        return {
          id: voluntario.id.toString(), // Assuming id is a string in voluntario type
          email: voluntario.email,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },

  events: {},
  debug: false,
});

export { handler as GET, handler as POST };
