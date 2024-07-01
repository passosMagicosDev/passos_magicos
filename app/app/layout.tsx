import Navbar from "@/components/navbar";
import NavbarMobile from "@/components/navbarMobile";
import { DataUserProvider } from "@/context/UserDataContext";
import { verifyLogin } from "@/hooks/verifyLogin";
import { Roboto } from "next/font/google";

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
  await verifyLogin();

  return (
    <main
      className={`flex-col xl:flex-row flex min-h-screen ${roboto.className}`}
    >
      <DataUserProvider>
        <div className="hidden xl:flex">
          <Navbar />
        </div>
        <div className="block xl:hidden">
          <NavbarMobile />
        </div>
        <div className="flex flex-col flex-1">{children}</div>
      </DataUserProvider>
    </main>
  );
}
