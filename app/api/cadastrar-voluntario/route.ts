import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

interface Voluntario {
  nome: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  confirmarEmail: string;
  areaAtuacao: string;
  senha: string;
}

export async function POST(request: Request) {
  const data: Voluntario = await request.json();
  const hashedPassword = await hash(data.senha, 10);

  try {
    await prisma.voluntario.create({
      data: {
        areaAtuacao: data.areaAtuacao,
        dataNacimento: data.dataNascimento,
        email: data.email,
        nome: data.nome,
        senha: hashedPassword,
        telefone: data.telefone,
        admin: false,
      },
    });

    return NextResponse.json({ message: "Cadastrado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
