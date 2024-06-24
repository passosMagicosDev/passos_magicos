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
  try {
    const data: Voluntario = await request.json();

    // Validar campos obrigatórios
    if (
      !data.nome ||
      !data.dataNascimento ||
      !data.telefone ||
      !data.email ||
      !data.confirmarEmail ||
      !data.areaAtuacao ||
      !data.senha
    ) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Validar se os e-mails são iguais
    if (data.email !== data.confirmarEmail) {
      return NextResponse.json(
        { error: "Os e-mails não coincidem" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(data.senha, 10);

    await prisma.voluntario.create({
      data: {
        areaAtuacao: data.areaAtuacao,
        email: data.email,
        nome: data.nome,
        senha: hashedPassword,
        telefone: data.telefone,
        dataNascimento: data.dataNascimento,
        admin: false,
      },
    });

    return NextResponse.json({ message: "Cadastrado com sucesso" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Tratar erros conhecidos do Prisma
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "E-mail já cadastrado" },
          { status: 400 }
        );
      }
    }
    return NextResponse.json(
      { error: "Erro ao cadastrar voluntário" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
