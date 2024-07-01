import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CadastrarEventoForm from "@/components/cadastrarEventoForm";

function CadastrarEvento() {
  return (
    <>
      <ToastContainer />
      <CadastrarEventoForm />
    </>
  );
}

export default CadastrarEvento;
