"use client";

import React from "react";
import ListaVoluntarios from "./listaVoluntarios";
import { useRouter } from "next/navigation";
import { EventoDetalhado } from "@/types/types";

type Props = {
  notifyError: (message: string) => void;
  notifySuccess: (message: string) => void;

  evento: EventoDetalhado;
  isActive: boolean;
  onToggleActive: (eventId: number) => void;
  updateEventDeletado(idEventDeltado: number): void;
};

const EventosCadastrados = React.memo(
  ({
    evento,
    isActive,
    onToggleActive,
    notifyError,
    notifySuccess,
    updateEventDeletado,
  }: Props) => {
    const handleActive = () => {
      onToggleActive(evento.idEvento);
    };

    const router = useRouter();

    const deleteEvent = async (eventId: number) => {
      const confirmed = confirm(
        "Tem certeza de que deseja excluir este evento?"
      );
      if (!confirmed) return;

      try {
        const response = await fetch("/api/evento/deletar", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: eventId }),
        });
        const data = await response.json();

        if (!response.ok || data.error) {
          notifyError(data.error);
          return;
        }
        updateEventDeletado(data.idDeletado);
        notifySuccess(data.message);
        router.refresh();
      } catch (error) {
        notifyError("Erro ao Deletar Evento");
      }
    };

    return (
      <div className="flex p-5">
        <div
          key={evento.idEvento}
          className="max-w-[500px] w-full p-6 h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {evento.title}
            </h5>
          </a>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <strong>Data do Evento:</strong> {evento.formatted_data}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <strong>Hora do vento:</strong> {evento.hora} <br />
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <strong>Quantidade de pessoas:</strong>{" "}
            {evento.quantidadeDePessoas || "-"}
          </p>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <strong>Descrição:</strong> {evento.desc}
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleActive}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Visualizar inscritos
            </button>

            <button
              onClick={() => deleteEvent(evento.idEvento)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Deletar Evento
            </button>
          </div>
          {isActive && (
            <div className="px-5 absolute left-0 -bottom-24 w-full">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nome do inscrito
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Telefone
                    </th>
                  </tr>
                </thead>
                <ListaVoluntarios inscritos={evento.inscritos} />
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
);
EventosCadastrados.displayName = "EventosCadastrados";
export default EventosCadastrados;
