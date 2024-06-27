import CadastrarVoluntarioForm from "@/components/cadastrarVoluntarioForm";
import Navbar from "@/components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function CadastroVoluntario() {
  return (
    <>
      <ToastContainer />
      <CadastrarVoluntarioForm />
    </>
  );
}

export default CadastroVoluntario;
