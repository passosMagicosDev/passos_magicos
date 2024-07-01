"use client";

import React from "react";
import { redirect } from "next/navigation";
import ControlerEventos from "@/components/eventosCadastrados/controlerEventos";
import { useDataUser } from "@/context/UserDataContext";

function CadastrarEvento() {
  const { admin } = useDataUser();
  if (!admin) redirect("/app");

  return (
    <section className="flex flex-col flex-1">
      <div className="">
        <h1 className="text-xl text-[#333] p-5 bg-[#F2F2F2] w-full">
          Meus Eventos Cadastrados
        </h1>
      </div>
      <ControlerEventos />
    </section>
  );
}

export default CadastrarEvento;
