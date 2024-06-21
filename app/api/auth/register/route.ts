import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email: "",
      name: "",
      password: hashedPassword,
    },
  });

  console.log(user);
  return NextResponse.json({ user });
}
