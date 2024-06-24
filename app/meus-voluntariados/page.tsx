import Navbar from "@/components/navbar";
import { verifyLogin } from "@/hooks/verifyLogin";
import React from "react";

async function MeusVoluntariados() {
  await verifyLogin();

  return (
    <main className="flex min-h-screen">
      <Navbar />
      <div className="flex-1">
        <h1 className="text-xl text-[#333] p-5 bg-[#F2F2F2] w-full">
          Meus Voluntariados
        </h1>
      </div>
    </main>
  );
}

export default MeusVoluntariados;
