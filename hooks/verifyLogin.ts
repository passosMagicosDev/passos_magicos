import { authOptions } from "@/app/api/auth/[...nextauth]/handler";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export async function verifyLogin() {
  const loginUser = await getServerSession(authOptions);
  if (!loginUser) {
    redirect("/");
  }
}
