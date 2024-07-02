"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventosCadastrados from ".";
import { notifyError, notifySuccess } from "@/utils/notify";
import { useDataUser } from "@/context/UserDataContext";
import { EventoDetalhado } from "@/types/types";
import { Evento } from "@prisma/client";

function ControlerEventos() {
  const { id } = useDataUser();

  const [eventos, setEventos] = useState<EventoDetalhado[]>([]);
  const [activeEventId, setActiveEventId] = useState<number | null>(null);

  const handleToggleActive = (eventId: number) => {
    setActiveEventId(activeEventId === eventId ? null : eventId);
  };

  function updateEventDeletado(idEventDeletado: number) {
    if (eventos) {
      const filtered: EventoDetalhado[] = eventos.filter(
        (el) => el.idEvento !== idEventDeletado
      );
      setEventos(filtered);
      sessionStorage.setItem("eventosCache", JSON.stringify(filtered));
    }
  }

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const cache = sessionStorage.getItem("eventosCache");
        const cacheParam = cache ? `&cache=${encodeURIComponent(cache)}` : "";
        const response = await fetch(
          `/api/evento/eventos-criados-voluntario?id=${id}${cacheParam}`
        );

        if (!response.ok) {
          notifyError("Failed to fetch eventos");
          return;
        }

        const data = await response.json();
        const eventosCriados = data.eventosCriados;
        setEventos(eventosCriados);

        sessionStorage.setItem("eventosCache", JSON.stringify(eventosCriados));
      } catch (error) {
        notifyError((error as Error).message);
      }
    };

    const cache = sessionStorage.getItem("eventosCache");
    if (cache) {
      const getCache = JSON.parse(cache);
      const itemsUser = getCache.filter(
        (el: { criadorId: number | undefined }) => el.criadorId === id
      );
      setEventos(itemsUser);
    } else {
      fetchEventos();
    }
  }, [id]);

  return (
    <div className="flex gap-2 relative flex-wrap">
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {eventos && eventos.length >= 1 ? (
          eventos.map((el) => (
            <EventosCadastrados
              updateEventDeletado={updateEventDeletado}
              notifyError={notifyError}
              notifySuccess={notifySuccess}
              key={el.idEvento}
              evento={el}
              isActive={activeEventId === el.idEvento}
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
