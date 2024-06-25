"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventosCadastrados from ".";

type Props = {
  evento: {
    id: number;
    nomeEvento: string | null;
    dataEvento: string | null;
    horaInicio: string | null;
    horaFim: string | null;
    categoriaEvento: string | null;
    localEvento: string | null;
    quantidadeDePessoas: number | null;
    quantidadeVoluntarios: number | null;
    descricaoEvento: string | null;
    criadorId: number;
    areasAtuacao: string | null;
    inscritos: {
      id: number;
      eventoId: number;
      voluntarioId: number;
      nome: string;
      email: string;
      telefone: string | null;
    }[];
  }[];
};

function ControlerEventos({ evento }: Props) {
  const notifySuccess = () =>
    toast.success("Cadastrado com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = (message: string) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [activeEventId, setActiveEventId] = useState<number | null>(null);

  const handleToggleActive = (eventId: number) => {
    setActiveEventId(activeEventId === eventId ? null : eventId);
  };

  return (
    <div className="flex gap-2 relative flex-wrap">
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {evento.length >= 1 ? (
          evento.map((el) => (
            <EventosCadastrados
              notifyError={notifyError}
              notifySuccess={notifySuccess}
              key={el.id}
              evento={el}
              isActive={activeEventId === el.id}
              onToggleActive={handleToggleActive}
            />
          ))
        ) : (
          <p>Você não possui em nenhum evento.</p>
        )}
      </div>
    </div>
  );
}

export default ControlerEventos;
