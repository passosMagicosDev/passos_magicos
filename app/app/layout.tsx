import Navbar from "@/components/navbar";
import { verifyLogin } from "@/hooks/verifyLogin";
import { Roboto } from "next/font/google";
import { redirect } from "next/navigation";

const roboto = Roboto({ weight: ["500", "400", "700"], subsets: ["latin"] });

export interface UserData {
  email: string | undefined;
  areaAtuacao: string | null | undefined;
  admin: boolean | null | undefined;
  nome: string | undefined;
  id: number | undefined;
  eventosCadastrados: {
    id: number;
  }[];
  eventosInscritos: {
    id: number;
    eventoId: number;
  }[];
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dataUser = await verifyLogin();

  if (!dataUser.admin) {
    redirect("/app");
  }

  return (
    <main className={`flex min-h-screen ${roboto.className}`}>
      <Navbar />
      <div className="flex flex-col flex-1">{children}</div>
    </main>
  );
}
