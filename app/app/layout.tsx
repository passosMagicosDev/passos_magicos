import Navbar from "@/components/navbar";
import { Roboto } from "next/font/google";
const roboto = Roboto({ weight: ["500", "400", "700"], subsets: ["latin"] });

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`flex min-h-screen ${roboto.className}`}>
      <Navbar />
      <div className="flex flex-col flex-1">{children}</div>
    </main>
  );
}
