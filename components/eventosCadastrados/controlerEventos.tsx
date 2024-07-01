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

  function updateEventDeletado(idEventDeltado: number) {
    if (eventos) {
      const filtered: EventoDetalhado[] = eventos?.filter(
        (el) => el.idEvento !== idEventDeltado
      );
      setEventos(filtered);
      sessionStorage.setItem("eventosCache", JSON.stringify(filtered));
    }
  }

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch(
          `/api/evento/eventos-criados-voluntario?id=${id}`
        );

        if (!response.ok) {
          notifyError("Failed to fetch eventos");
          return;
        }
        const data: EventoDetalhado[] = await response.json();
        if (data) {
          setEventos(data);

          const cache = sessionStorage.getItem("eventosCache");
          if (cache) {
            const cacheArray: Evento[] = JSON.parse(cache);
            const updateCache = [...cacheArray, data];
            sessionStorage.setItem("eventosCache", JSON.stringify(updateCache));
          }
        }
      } catch (error) {
        notifyError((error as Error).message);
      }
    };

    const cache = sessionStorage.getItem("eventosCache");
    if (cache) {
      const getCache = JSON.parse(cache);
      setEventos(getCache);
    } else {
      fetchEventos();
    }
  }, [id]);

  return (
    <div className="flex gap-2 relative flex-wrap">
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {eventos && eventos.length >= 1 ? (
          eventos.map((el) => {
            return (
              <EventosCadastrados
                updateEventDeletado={updateEventDeletado}
                notifyError={notifyError}
                notifySuccess={notifySuccess}
                key={el.idEvento}
                evento={el}
                isActive={activeEventId === el.idEvento}
                onToggleActive={handleToggleActive}
              />
            );
          })
        ) : (
          <p>Você não possui em nenhum evento.</p>
        )}
      </div>
    </div>
  );
}

export default ControlerEventos;
