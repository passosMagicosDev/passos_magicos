import CadastrarVoluntarioForm from "@/components/cadastrarVoluntarioForm";
import Navbar from "@/components/navbar";
import { verifyLogin } from "@/hooks/verifyLogin";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function CadastroVoluntario() {
  const { admin } = await verifyLogin();

  if (!admin) redirect("/app");
  return (
    <>
      <ToastContainer />
      <CadastrarVoluntarioForm />
    </>
  );
}

export default CadastroVoluntario;
