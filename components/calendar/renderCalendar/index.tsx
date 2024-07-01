import { Evento } from "@/types/types";
import React from "react";
type Props = {
  calendario: any[];
  eventosDB: Evento[];
  openModal(evento: any): void;
  mesAtual: number;
};
function RenderCalendar({ calendario, eventosDB, mesAtual, openModal }: Props) {
  const mapaEventos: { [key: string]: any[] } = {};

  eventosDB.forEach((evento) => {
    const key = `${evento.mes}-${evento.dia}`;
    if (!mapaEventos[key]) {
      mapaEventos[key] = [];
    }
    mapaEventos[key].push(evento);
  });

  const encontrarEventos = (dia: number, mes: number): any[] => {
    const key = `${mes}-${dia}`;
    return mapaEventos[key] || [];
  };
  const diasSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  return (
    <div className="p-5">
      <div className="flex">
        {diasSemana.map((dia, index) => (
          <div
            key={index}
            className={`text-center flex-1 border border-[#EBEBEB] py-4 ${
              (index === 0 && "rounded-tl-2xl") ||
              (index === 6 && "rounded-tr-2xl")
            }`}
          >
            {dia}
          </div>
        ))}
      </div>
      <div className="border-[#EBEBEB] flex flex-wrap">
        {calendario.map((item, index) => {
          const eventosDoDia = encontrarEventos(
            item.dia,
            mesAtual +
              (item.mes === "anterior" ? 0 : item.mes === "proximo" ? 2 : 1)
          );
          return (
            <div
              key={index}
              className="w-[14.28%] border border-[#e6e6e6] flex items-center justify-center min-h-[100px] pt-14 relative"
            >
              <span
                className={`absolute right-3 top-3 ${
                  item.mes === "anterior" || item.mes === "proximo"
                    ? "text-[#C3C3C3]"
                    : ""
                }`}
              >
                {item.dia}
              </span>
              <div className="flex flex-col w-full px-3 gap-1 pb-3 relative">
                {eventosDoDia.map((evento, evtIndex) => (
                  <button
                    onClick={() => openModal(evento)}
                    key={evtIndex}
                    className="bottom-1 text-left relative bg-blue-200 p-1 rounded text-xs"
                  >
                    <span className="block absolute w-[3px] bg-blue-700 h-[80%] rounded"></span>
                    <div className="pl-3">
                      {evento.categoria}
                      <span className="block">{evento.hora}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RenderCalendar;
