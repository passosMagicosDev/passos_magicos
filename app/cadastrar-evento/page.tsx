import Navbar from "@/components/navbar";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";

import { verifyLogin } from "@/hooks/verifyLogin";
import CadastrarEventoForm from "@/components/cadastrarEventoForm";

async function CadastrarEvento() {
  const { admin } = await verifyLogin();

  if (!admin) redirect("/app");

  return (
    <main className="flex min-h-screen">
      <ToastContainer />
      <Navbar />
      <CadastrarEventoForm />
    </main>
  );
}

export default CadastrarEvento;
