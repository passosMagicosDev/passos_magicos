"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import useLoading from "@/hooks/Loading";
import { categorias, categoriasEvento } from "@/utils/categoriasVoluntario"; // Importe corretamente as categorias necessárias
import Image from "next/image";
import Spinner from "@/public/imgs/icons/spinner.svg";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Evento {
  nomeEvento: string;
  dataEvento: string;
  horaInicio: string;
  horaFim: string;
  categoriaEvento: string;
  localEvento: string;
  descricaoEvento: string;
  quantidadeDePessoas: string;
  quantidadeVoluntarios: number;
  criadorId: number;
  areasAtuacao: { nome: string }[]; // Alteração para array de objetos com nome
}

interface EventoValidate {
  nomeEvento: string;
  dataEvento: string;
  horaInicio: string;
  horaFim: string;
  categoriaEvento: string;
  localEvento: string;
  descricaoEvento: string;
  quantidadeDePessoas: string;
  quantidadeVoluntarios: string;
  areasAtuacao: string;
}

type Props = {
  criadorId: number;
};

function CadastrarEventoForm({ criadorId }: Props) {
  const router = useRouter();
  const [loading, startLoading, stopLoading] = useLoading();
  const [evento, setEvento] = useState<Evento>({
    nomeEvento: "",
    dataEvento: "",
    horaInicio: "",
    horaFim: "",
    categoriaEvento: "",
    localEvento: "",
    descricaoEvento: "",
    quantidadeDePessoas: "",
    quantidadeVoluntarios: 0,
    criadorId: criadorId,
    areasAtuacao: [], // Inicializa como um array vazio de objetos
  });

  const [erros, setErros] = useState<Partial<EventoValidate>>({});

  const notifySuccess = () =>
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

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    if (name === "areasAtuacao") {
      const isChecked = evento.areasAtuacao.some((area) => area.nome === value);
      const updatedAreas = isChecked
        ? evento.areasAtuacao.filter((area) => area.nome !== value)
        : [...evento.areasAtuacao, { nome: value }];

      setEvento({
        ...evento,
        areasAtuacao: updatedAreas,
      });
    } else {
      setEvento({
        ...evento,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startLoading();

    const camposObrigatorios: (keyof EventoValidate)[] = [
      "nomeEvento",
      "dataEvento",
      "horaInicio",
      "horaFim",
      "categoriaEvento",
      "localEvento",
      "quantidadeDePessoas",
      "descricaoEvento",
      "quantidadeVoluntarios",
    ];

    const novosErros: Partial<EventoValidate> = {};
    let formularioValido = true;

    camposObrigatorios.forEach((campo) => {
      if (!evento[campo as keyof Evento]) {
        novosErros[campo] = `O campo é obrigatório`;
        formularioValido = false;
      }
    });

    if (!formularioValido) {
      setErros(novosErros);
      stopLoading();
      return;
    }

    try {
      const eventoParaEnviar = {
        ...evento,
        areasAtuacao: JSON.stringify(
          evento.areasAtuacao.map((area) => ({ nome: area.nome }))
        ),
      };

      const response = await fetch("/api/evento/cadastrar-evento", {
        method: "POST",
        body: JSON.stringify(eventoParaEnviar),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const data = await response.json();

      if (data.error) {
        notifyError(data.error);
        return;
      }

      setEvento({
        nomeEvento: "",
        dataEvento: "",
        horaInicio: "",
        horaFim: "",
        categoriaEvento: "",
        localEvento: "",
        descricaoEvento: "",
        quantidadeDePessoas: "",
        quantidadeVoluntarios: 0,
        criadorId: 0,
        areasAtuacao: [],
      });

      notifySuccess();
      router.refresh();
    } catch (error) {
      console.error("Erro ao cadastrar evento:", error);
      notifyError("Erro ao cadastrar evento. Tente novamente mais tarde.");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="flex-1">
      <h1 className="text-xl text-[#333] p-5 bg-[#F2F2F2] w-full">
        Cadastrar Evento
      </h1>

      <form onSubmit={handleSubmit} className="w-full px-5 py-12 mx-auto">
        <h2 className="text-3xl mb-6">Cadastrar Evento</h2>
        <div className="relative float-label-input mt-5 mb-2">
          <input
            type="text"
            id="nomeEvento"
            name="nomeEvento"
            placeholder=""
            value={evento.nomeEvento}
            onChange={handleInputChange}
            className={`w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400 ${
              erros.nomeEvento ? "border-red-500" : ""
            }`}
          />
          <label
            htmlFor="nome"
            className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out bg-white mx-2 text-grey-darker"
          >
            Nome do Evento
          </label>
          {erros.nomeEvento && (
            <p className="text-red-500 text-xs mt-1">{erros.nomeEvento}</p>
          )}
        </div>

        {/* Data do Evento */}
        <div className="mb-4">
          <label
            htmlFor="dataEvento"
            className="block text-sm font-medium text-gray-700"
          >
            Data do Evento
          </label>
          <input
            type="date"
            id="dataEvento"
            name="dataEvento"
            value={evento.dataEvento}
            onChange={handleInputChange}
            className={`border border-gray-300 rounded-md p-2 mt-1 w-full focus:outline-none focus:shadow-outline ${
              erros.dataEvento ? "border-red-500" : ""
            }`}
          />
          {erros.dataEvento && (
            <p className="text-red-500 text-xs mt-1">{erros.dataEvento}</p>
          )}
        </div>

        {/* Hora de Início e Hora de Término (em um mesmo div para alinhar em linha) */}
        <div className="mb-4 flex gap-2">
          <div className="w-1/2">
            <label
              htmlFor="horaInicio"
              className="block text-sm font-medium text-gray-700"
            >
              Hora de Início
            </label>
            <input
              type="time"
              id="horaInicio"
              name="horaInicio"
              value={evento.horaInicio}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full focus:outline-none focus:shadow-outline ${
                erros.horaInicio ? "border-red-500" : ""
              }`}
            />
            {erros.horaInicio && (
              <p className="text-red-500 text-xs mt-1">{erros.horaInicio}</p>
            )}
          </div>
          <div className="w-1/2">
            <label
              htmlFor="horaFim"
              className="block text-sm font-medium text-gray-700"
            >
              Hora de Término
            </label>
            <input
              type="time"
              id="horaFim"
              name="horaFim"
              value={evento.horaFim}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full focus:outline-none focus:shadow-outline ${
                erros.horaFim ? "border-red-500" : ""
              }`}
            />
            {erros.horaFim && (
              <p className="text-red-500 text-xs mt-1">{erros.horaFim}</p>
            )}
          </div>
        </div>

        {/* Categoria do Evento */}
        <div className="relative float-label-input mt-5 mb-2">
          <select
            id="categoriaEvento"
            name="categoriaEvento"
            value={evento.categoriaEvento}
            onChange={handleInputChange}
            className={`w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400 ${
              erros.categoriaEvento ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled hidden>
              Categoria do Evento
            </option>
            {categoriasEvento.map((el) => (
              <option key={el.nome} value={el.nome}>
                {el.nome}
              </option>
            ))}
          </select>
          <label
            htmlFor="categoriaEvento"
            className={`absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out bg-white mx-2 text-grey-darker ${
              evento.categoriaEvento ? "transform -translate-y-4 scale-75" : ""
            }`}
          >
            Categoria do Evento
          </label>
          {erros.categoriaEvento && (
            <p className="text-red-500 text-xs mt-1">{erros.categoriaEvento}</p>
          )}
        </div>
        {/* Áreas de Atuação */}
        <div className="mt-6 mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Áreas de Atuação do voluntário
          </label>
          <div className="flex gap-4">
            {categorias.map((area) => (
              <div key={area.nome} className="mt-1 cursor-pointer">
                <input
                  type="checkbox"
                  id={area.nome}
                  name="areasAtuacao"
                  value={area.nome}
                  checked={evento.areasAtuacao.some(
                    (a) => a.nome === area.nome
                  )}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor={area.nome} className="text-sm text-gray-800">
                  {area.nome}
                </label>
              </div>
            ))}
          </div>
          {erros.areasAtuacao && (
            <p className="text-red-500 text-xs mt-1">{erros.areasAtuacao}</p>
          )}
        </div>

        {/* Quantidade do evento */}
        <div className="relative float-label-input mt-5 mb-2">
          <input
            type="number"
            id="quantidadeDePessoas"
            name="quantidadeDePessoas"
            placeholder=""
            value={evento.quantidadeDePessoas}
            onChange={handleInputChange}
            className={`w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400 ${
              erros.quantidadeDePessoas ? "border-red-500" : ""
            }`}
          />
          <label
            htmlFor="quantidadeDePessoas"
            className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out bg-white mx-2 text-grey-darker"
          >
            Quantidade de pessoas para o Evento
          </label>
          {erros.quantidadeDePessoas && (
            <p className="text-red-500 text-xs mt-1">
              {erros.quantidadeDePessoas}
            </p>
          )}
        </div>

        {/* Quantidade de Voluntários */}
        <div className="relative float-label-input mt-5 mb-2">
          <input
            type="number"
            id="quantidadeVoluntarios"
            name="quantidadeVoluntarios"
            placeholder=""
            value={evento.quantidadeVoluntarios}
            onChange={handleInputChange}
            className={`w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400 ${
              erros.quantidadeVoluntarios ? "border-red-500" : ""
            }`}
          />
          <label
            htmlFor="quantidadeVoluntarios"
            className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out bg-white mx-2 text-grey-darker"
          >
            Quantidade de Voluntários Necessários
          </label>
          {erros.quantidadeVoluntarios && (
            <p className="text-red-500 text-xs mt-1">
              {erros.quantidadeVoluntarios}
            </p>
          )}
        </div>

        {/* Local do Evento */}
        <div className="relative float-label-input mt-5 mb-2">
          <input
            type="text"
            id="localEvento"
            name="localEvento"
            placeholder=""
            value={evento.localEvento}
            onChange={handleInputChange}
            className={`w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400 ${
              erros.localEvento ? "border-red-500" : ""
            }`}
          />
          <label
            htmlFor="localEvento"
            className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out bg-white mx-2 text-grey-darker"
          >
            Local do Evento
          </label>
          {erros.localEvento && (
            <p className="text-red-500 text-xs mt-1">{erros.localEvento}</p>
          )}
        </div>

        {/* Descrição do Evento */}
        <div className="relative float-label-input mt-5 mb-2">
          <textarea
            id="descricaoEvento"
            name="descricaoEvento"
            value={evento.descricaoEvento}
            onChange={handleInputChange}
            className={`w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400 ${
              erros.descricaoEvento ? "border-red-500" : ""
            }`}
          />
          <label
            htmlFor="descricaoEvento"
            className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out bg-white mx-2 text-grey-darker"
          >
            Descrição do Evento
          </label>
          {erros.descricaoEvento && (
            <p className="text-red-500 text-xs mt-1">{erros.descricaoEvento}</p>
          )}
        </div>

        {/* Botão de Cadastro */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-3"
          disabled={loading}
        >
          {loading ? (
            <span className="flex gap-2">
              Cadastrando evento...{" "}
              <Image className="animate-spin" src={Spinner} alt="" />
            </span>
          ) : (
            "Cadastrar Evento"
          )}
        </button>
      </form>
    </div>
  );
}

export default CadastrarEventoForm;
