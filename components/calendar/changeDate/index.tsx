import React from "react";
import Arrow from "@/public/imgs/icons/arrow.svg";
import Filter from "@/public/imgs/icons/filter.svg";
import Image from "next/image";
import { dicionarioMeses } from "@/utils/calendar";

type Props = {
  atualYear: number;
  mesAtual: number;
  setMesAtual: React.Dispatch<React.SetStateAction<number>>;
  setAtualYear: React.Dispatch<React.SetStateAction<number>>;
};
function ChangeDate({ atualYear, mesAtual, setMesAtual, setAtualYear }: Props) {
  const titleMonth = dicionarioMeses[mesAtual];

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

  return (
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
  );
}

export default ChangeDate;
