"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Spinner from "@/public/imgs/icons/spinnerOrange.svg";
import { Id } from "react-toastify";
import { useRouter } from "next/navigation";

interface UserData {
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

type Props = {
  idEvento: number;
  idVoluntario: number;
  toastSuccess: (message: string) => Id;
  toastError: (message: string) => Id;
  updateUserData: (newEvento: { id: number; eventoId: number }) => void;
  userData: UserData;
};

function ButtonModal({
  idEvento,
  idVoluntario,
  toastError,
  toastSuccess,
  updateUserData,
  userData,
}: Props) {
  const router = useRouter();
  const [buttonState, setButtonState] = useState({
    loading: false,
  });
  const verifyInscrito = userData.eventosInscritos.some(
    (el) => el.eventoId === idEvento
  );

  async function handleSubmit() {
    if (verifyInscrito) {
      toastError("Você já está inscrito nesse evento");
      return;
    }

    setButtonState({ loading: true });

    const ids = {
      idEvento: idEvento,
      idVoluntario: idVoluntario,
    };

    if (!ids.idEvento) {
      toastError("Erro: idEvento não fornecido.");
      setButtonState({ loading: false });
      return;
    }

    if (!ids.idVoluntario) {
      toastError("Erro: idVoluntario não fornecido.");
      setButtonState({ loading: false });
      return;
    }

    try {
      const response = await fetch("/api/evento/cadastro-em-evento", {
        method: "POST",
        body: JSON.stringify(ids),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const result = await response.json();

      if (response.ok) {
        toastSuccess(result.message);
        setButtonState({ loading: false });
        updateUserData({ eventoId: idEvento, id: Number(userData.id) });
        router.refresh();
      } else {
        toastError(result.error);
        setButtonState({ loading: false });
      }
    } catch (error) {
      toastError("Erro ao enviar dados");
      setButtonState({ loading: false });
    }
  }

  return (
    <>
      {verifyInscrito ? (
        <p className="text-orange-400 text-center mt-4">
          Você já está inscrito nesse evento!
        </p>
      ) : (
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 mx-auto mt-12 text-base text-[#F58334] border-[2px] rounded border-[#F58334] py-2 max-w-[316px] w-full"
        >
          {buttonState.loading ? (
            <span className="flex gap-2">
              Se inscrevendo
              <Image src={Spinner} alt="Carregando" className="animate-spin" />
            </span>
          ) : (
            <span>Increva-se para esta ação</span>
          )}
        </button>
      )}
    </>
  );
}

export default ButtonModal;
