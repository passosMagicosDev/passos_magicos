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

          <div className="flex gap-4 flex-col">
            <button
              onClick={handleActive}
              className="w-full justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Visualizar inscritos
            </button>

            <button
              onClick={() => deleteEvent(evento.idEvento)}
              className="w-full  justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Deletar Evento
            </button>
          </div>
          {isActive && (
            <div className="overlay fixed left-0 top-0 w-full h-screen bg-black/80">
              <div className="flex justify-end">
                <button onClick={handleActive} className="p-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 2C8.2 2 2 8.2 2 16C2 23.8 8.2 30 16 30C23.8 30 30 23.8 30 16C30 8.2 23.8 2 16 2ZM16 28C9.4 28 4 22.6 4 16C4 9.4 9.4 4 16 4C22.6 4 28 9.4 28 16C28 22.6 22.6 28 16 28Z"
                      fill="white"
                    />
                    <path
                      d="M21.4 23L16 17.6L10.6 23L9 21.4L14.4 16L9 10.6L10.6 9L16 14.4L21.4 9L23 10.6L17.6 16L23 21.4L21.4 23Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-5 absolute left-0 top-16  xl:-bottom-24 w-full overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
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
            </div>
          )}
        </div>
      </div>
    );
  }
);
EventosCadastrados.displayName = "EventosCadastrados";
export default EventosCadastrados;
