import React from "react";
import { ToastContainer } from "react-toastify";

type Props = {
  id: number;
  nomeEvento: string;
  dataEvento: string | null;
  descricaoEvento: string | null;
  horaInicio: string | null;
  horaFim: string | null;
  quantidadeDePessoas: number;
  actions?: boolean;
};
function CardsVoluntariados({
  id,
  nomeEvento,
  descricaoEvento,
  dataEvento,
  horaInicio,
  horaFim,
  quantidadeDePessoas,
  actions,
}: Props) {
  return (
    <div className="flex xl:gap-2 relative flex-wrap">
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex flex-wrap gap-4" key={id}>
          <div className="max-w-[500px] w-full p-6 xl:h-full bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {nomeEvento}
              </h5>
            </a>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <strong>Data do Evento:</strong>{" "}
              {dataEvento
                ? new Date(dataEvento).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : "-"}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <strong>Hora do evento:</strong> {horaInicio || "-"} as {horaFim}{" "}
              <br />
            </p>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <strong>Descrição:</strong> {descricaoEvento}
            </p>
            {actions && (
              <>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <strong>Quantidade de pessoas:</strong>{" "}
                  {quantidadeDePessoas || "-"}
                </p>
                <div className="flex gap-4">
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Visualizar inscritos
                  </button>

                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    Deletar Evento
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsVoluntariados;
