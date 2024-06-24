"use client";

import { dicionarioMeses } from "@/utils/calendar";
import Arrow from "@/public/imgs/icons/arrow.svg";
import Filter from "@/public/imgs/icons/filter.svg";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "../modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Evento {
  eventosDB: {
    id: number;
    mes: number;
    dia: number;
    title: string;
    formatted_data: string;
    hora: string;
    local: string;
    desc: string;
    categoria: string;
  }[];
}

interface UserData {
  userData: {
    email: string | undefined;
    areaAtuacao: string | null | undefined;
    admin: boolean | null | undefined;
    nome: string | undefined;
    id: number | undefined;
    eventosCadastrados: {
      id: number;
    }[];
  };
}

interface Props extends Evento, UserData {}

function Calendar({ eventosDB, userData }: Props) {
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [atualYear, setAtualYear] = useState(new Date().getFullYear());
  const quantidadeDiasMes = new Date(atualYear, mesAtual + 1, 0).getDate();
  const [openModalActive, setOpenModalActive] = useState(false);
  const titleMonth = dicionarioMeses[mesAtual];

  const notify = () =>
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

  function nextMonth() {
    if (mesAtual === 11) {
      setMesAtual(0);
      setAtualYear((prevState) => prevState + 1);
    } else {
      setMesAtual((prevState) => prevState + 1);
    }
  }

  function prevMonth() {
    if (mesAtual === 0) {
      setMesAtual(11);
      setAtualYear((prevState) => prevState - 1);
    } else {
      setMesAtual((prevState) => prevState - 1);
    }
  }

  const primeiroDiaSemana = new Date(atualYear, mesAtual, 1).getDay();

  const diasSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const quantidadeDiasMesAnterior = new Date(atualYear, mesAtual, 0).getDate();

  const calendario = [];
  let diaAtual = 1;

  for (let i = primeiroDiaSemana; i > 0; i--) {
    calendario.push({
      dia: quantidadeDiasMesAnterior - i + 1,
      mes: "anterior",
    });
  }

  while (diaAtual <= quantidadeDiasMes) {
    calendario.push({
      dia: diaAtual,
      mes: "atual",
    });
    diaAtual++;
  }

  let diaProximoMes = 1;
  while (calendario.length % 7 !== 0) {
    calendario.push({
      dia: diaProximoMes,
      mes: "proximo",
    });
    diaProximoMes++;
  }

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

  const [eventoDetails, setEventoDetails] = useState<any>({
    categoria: "",
    desc: "",
    dia: 0,
    formatted_data: "",
    hora: "",
    local: "",
    mes: 0,
    title: "",
    id: 0,
  });

  function openModal(evento: any) {
    setEventoDetails(evento);
    setOpenModalActive(true);
  }

  function closeModal() {
    setOpenModalActive(false);
  }

  const [userDataElement, setUserDataElement] = useState(userData);

  const updateUserData = (eventoId: number) => {
    setUserDataElement((prevUserData) => ({
      ...prevUserData,
      eventosCadastrados: [
        ...prevUserData.eventosCadastrados,
        { id: eventoId },
      ],
    }));
  };

  return (
    <section>
      <Modal
        closeModal={closeModal}
        onModal={openModalActive}
        evento={eventoDetails}
        userData={userDataElement}
        toastError={notifyError}
        toastSuccess={notify}
        updateUserData={updateUserData}
      />

      <ToastContainer />
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center gap-5">
          <h2 className="text-3xl text-[#333333] font-medium">
            {titleMonth} {atualYear}
          </h2>

          <div className="flex gap-3">
            <button
              disabled={mesAtual === new Date().getMonth()}
              onClick={prevMonth}
              className="border w-8 h-8 flex items-center justify-center rounded disabled:opacity-50"
            >
              <Image src={Arrow} alt="" />
            </button>

            <button
              onClick={nextMonth}
              className="rotate-180 border w-8 h-8 flex items-center justify-center rounded"
            >
              <Image src={Arrow} alt="" />
            </button>
          </div>
        </div>

        <button className="border w-8 h-8 flex items-center justify-center rounded">
          <Image src={Filter} alt="" />
        </button>
      </div>

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
    </section>
  );
}

export default Calendar;
