import { EventoPrisma } from "@/types/types";

export function formatarEvento(evento: EventoPrisma) {
  if (!evento.dataEvento) return;

  const dataObj = new Date(
    Date.UTC(
      new Date(evento.dataEvento).getUTCFullYear(),
      new Date(evento.dataEvento).getUTCMonth(),
      new Date(evento.dataEvento).getUTCDate()
    )
  );

  const diasSemana = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];

  const nomeDia = diasSemana[dataObj.getUTCDay()];
  const dia = dataObj.getUTCDate();

  const mes = dataObj.getUTCMonth() + 1;

  const formatted_data = `${nomeDia} - ${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}`;

  const hora = `${evento.horaInicio} - ${evento.horaFim}`;

  return {
    idEvento: evento.id,
    mes: mes,
    dia: dia,
    title: evento.nomeEvento,
    formatted_data: formatted_data,
    hora: hora,
    local: evento.localEvento,
    desc: evento.descricaoEvento,
    categoria: evento.categoriaEvento,
    quantidadeDePessoas: evento.quantidadeDePessoas,
  };
}
