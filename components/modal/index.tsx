import React from "react";
import Location from "@/public/imgs/icons/location.svg";
import Close from "@/public/imgs/icons/close.svg";
import Check from "@/public/imgs/icons/check.svg";

import Image from "next/image";

interface Evento {
  onModal: boolean;
  closeModal: () => void;
  evento: {
    mes: number;
    dia: number;
    title: string;
    formatted_data: string;
    hora: string;
    local: string;
    desc: string;
    categoria: string;
  };
}

function Modal({ evento, onModal, closeModal }: Evento) {
  const inscrito = false;
  return (
    <div
      className={`fixed left-0 top-0 bg-black/30 w-full h-screen z-10 flex items-center justify-center transition-all ${
        onModal
          ? "opacity-100 pointer-events-auto"
          : " opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[#fff]  max-w-[488px] w-full rounded-[20px] relative">
        <button onClick={closeModal} className="absolute right-5 top-7">
          <Image src={Close} alt="" />
        </button>
        <h3 className="text-2xl text-[#F58334] border-b border-b-[#EBEBEB] pt-6 pb-3 px-5">
          {evento.title}
        </h3>

        <div className="pt-10 px-5 pb-8">
          <p className="text-xl text-[#97A0B1]">{evento.formatted_data}</p>
          <p className="text-xl text-[#97A0B1] mb-3">{evento.hora}</p>

          <p className="flex text-[#F58334] max-w-[290px] items-start gap-1 mb-4">
            <Image src={Location} alt="" />
            {evento.local}
          </p>

          <p>{evento.desc}</p>

          <button className="flex items-center justify-center gap-2 mx-auto mt-12 text-base text-[#F58334] border-[2px] rounded border-[#F58334] py-2 max-w-[316px] w-full">
            {inscrito ? (
              <span>
                Inscrito com sucesso
                <Image src={Check} alt="" />
              </span>
            ) : (
              <span>Increva-se para esta ação</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
