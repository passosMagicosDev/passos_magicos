import Navbar from "@/components/navbar";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";

import { verifyLogin } from "@/hooks/verifyLogin";
import CadastrarEventoForm from "@/components/cadastrarEventoForm";

async function CadastrarEvento() {
  const { admin, id } = await verifyLogin();

  if (!admin) redirect("/app");

  return (
    <>
      <ToastContainer />
      <CadastrarEventoForm criadorId={Number(id)} />
    </>
  );
}

export default CadastrarEvento;
