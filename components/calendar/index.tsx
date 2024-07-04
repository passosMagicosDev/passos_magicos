"use client";

import React, { useEffect, useState } from "react";
import Modal from "../modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDataUser } from "@/context/UserDataContext";
import ChangeDate from "./changeDate";
import { notifyError, notifySuccess } from "@/utils/notify";
import RenderCalendar from "./renderCalendar";
import { Evento } from "@/types/types";
import LoadingCalendar from "@/app/app/(calendar)/loading";

export default function Calendar() {
  const [eventosDB, setEventoDB] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  const userData = useDataUser();
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [atualYear, setAtualYear] = useState(new Date().getFullYear());
  const quantidadeDiasMes = new Date(atualYear, mesAtual + 1, 0).getDate();
  const [openModalActive, setOpenModalActive] = useState(false);
  const primeiroDiaSemana = new Date(atualYear, mesAtual, 1).getDay();
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

  const updateUserData = (newEvento: { id: number; eventoId: number }) => {
    setUserDataElement((prevUserData) => ({
      ...prevUserData,
      eventosInscritos: [...prevUserData.eventosInscritos, newEvento],
    }));
  };

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);
        const cachedEventos = sessionStorage.getItem("eventosCache");
        if (cachedEventos) {
          const data = JSON.parse(cachedEventos);
          setEventoDB(data);
          setLoading(false);

          return;
        }

        const response = await fetch(`/api/evento/get-eventos`);
        if (!response.ok) {
          notifyError("Failed to fetch eventos");
          setLoading(false);

          return;
        }
        const data: { data: Evento[] } = await response.json();
        if (data.data) {
          setEventoDB(data.data);
          sessionStorage.setItem("eventosCache", JSON.stringify(data.data));
        }
      } catch (error) {
        notifyError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, [userData]);

  if (loading) {
    return <LoadingCalendar />;
  }

  const reserveDB: Evento[] = [
    {
      categoria: "",
      desc: "",
      dia: 0,
      formatted_data: "",
      hora: "",
      id: 0,
      local: "",
      mes: 0,
      quantidadeDePessoas: 0,
      title: "",
    },
  ];
  return (
    <section>
      <Modal
        closeModal={closeModal}
        onModal={openModalActive}
        evento={eventoDetails}
        userData={userDataElement}
        toastError={notifyError}
        toastSuccess={notifySuccess}
        updateUserData={updateUserData}
      />

      <ToastContainer />
      <ChangeDate
        atualYear={atualYear}
        mesAtual={mesAtual}
        setAtualYear={setAtualYear}
        setMesAtual={setMesAtual}
      />
      {eventosDB.length >= 0 ? (
        <RenderCalendar
          calendario={calendario}
          eventosDB={eventosDB}
          mesAtual={mesAtual}
          openModal={openModal}
        />
      ) : (
        <RenderCalendar
          calendario={calendario}
          eventosDB={reserveDB}
          mesAtual={mesAtual}
          openModal={openModal}
        />
      )}
    </section>
  );
}
