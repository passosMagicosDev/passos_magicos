import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

interface Voluntario {
  nome: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  confirmarEmail: string;
  senha: string;
  areaAtuacao: { nome: string }[];
  admin_validade: string;
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
      !data.areaAtuacao.length ||
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

    // Hash da senha
    const hashedPassword = await hash(data.senha, 10);

    // Verificar se o e-mail já está cadastrado
    const voluntarioExistente = await prisma.voluntario.findUnique({
      where: {
        email: data.email,
      },
    });

    if (voluntarioExistente) {
      return NextResponse.json(
        { error: "E-mail já cadastrado" },
        { status: 400 }
      );
    }

    await prisma.voluntario.create({
      data: {
        nome: data.nome,
        dataNascimento: data.dataNascimento,
        telefone: data.telefone,
        email: data.email,
        senha: hashedPassword,
        areaAtuacao: JSON.stringify(
          data.areaAtuacao.map((area) => ({ nome: area.nome }))
        ),
        admin: data.admin_validade !== "" ? true : false,
        empresa: data.areaAtuacao.filter((el) => el.nome == "Empresa")
          ? true
          : false,
      },
    });

    return NextResponse.json({ message: "Cadastrado com sucesso" });
  } catch (error: any) {
    console.error("Erro ao cadastrar voluntário:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Erro de banco de dados ao cadastrar voluntário" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Erro desconhecido ao cadastrar voluntário" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
