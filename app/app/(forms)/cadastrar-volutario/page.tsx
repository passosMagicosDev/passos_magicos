import CadastrarVoluntarioForm from "@/components/cadastrarVoluntarioForm";
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
