import React from "react";
import Location from "@/public/imgs/icons/location.svg";
import Close from "@/public/imgs/icons/close.svg";

import Image from "next/image";
import { Id } from "react-toastify";
import ButtonModal from "./button";

interface Evento {
  idEvento: number;
  mes: number;
  dia: number;
  title: string;
  formatted_data: string;
  hora: string;
  local: string;
  desc: string;
  categoria: string;
  quantidadeDePessoas: bigint;
}

interface UserData {
  email: string | undefined;
  areaAtuacao: string | null | undefined;
  admin: boolean | null | undefined;
  nome: string | undefined;
  id: number | undefined;
  eventosCadastrados: {
    id: number;
  }[];

  eventosInscritos: {
    id: number;
    eventoId: number;
  }[];
}

interface Props {
  evento: Evento;
  onModal: boolean;
  closeModal: () => void;
  toastSuccess: (message: string) => Id;
  toastError: (message: string) => Id;
  userData: UserData;
  updateUserData: (newEvento: { id: number; eventoId: number }) => void;
}

function Modal({
  evento,
  onModal,
  userData,
  closeModal,
  toastError,
  toastSuccess,
  updateUserData,
}: Props) {
  return (
    <div
      className={`fixed left-0 top-0 bg-black/30 w-full h-screen z-10 flex items-center justify-center transition-all ${
        onModal
          ? "opacity-100 pointer-events-auto"
          : " opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[#fff] max-w-[488px] w-full rounded-[20px] relative">
        <button onClick={closeModal} className="absolute right-5 top-7">
          <Image src={Close} alt="" />
        </button>
        <h3 className="text-2xl text-[#F58334] border-b border-b-[#EBEBEB] pt-6 pb-3 px-5">
          {evento.title}
        </h3>

        <div className="pt-5 px-5 pb-8">
          <p className="text-xl text-[#97A0B1]">{evento.formatted_data}</p>
          <p className="text-xl text-[#97A0B1]">{evento.hora}</p>
          <p className="text-xl text-[#97A0B1] mb-3">
            Quantidade de pessoas: {Number(evento.quantidadeDePessoas)}
          </p>

          <p className="flex text-[#F58334] max-w-[290px] items-start gap-1 mb-4">
            <Image src={Location} alt="" />
            {evento.local}
          </p>

          <p>{evento.desc}</p>
          <ButtonModal
            idEvento={evento.idEvento}
            idVoluntario={Number(userData.id)}
            toastError={toastError}
            toastSuccess={toastSuccess}
            updateUserData={updateUserData}
            userData={userData}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
