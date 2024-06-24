"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import useLoading from "@/hooks/Loading";
import { categorias } from "@/utils/categoriasVoluntario";
import Image from "next/image";
import Spinner from "@/public/imgs/icons/spinner.svg";
import { toast } from "react-toastify";

interface Evento {
  nomeEvento: string;
  dataEvento: string;
  horaInicio: string;
  horaFim: string;
  categoriaEvento: string;
  localEvento: string;
  descricaoEvento: string;
}

function CadastrarEventoForm() {
  const [loading, startLoading, stopLoading] = useLoading();
  const [evento, setEvento] = useState<Evento>({
    nomeEvento: "",
    dataEvento: "",
    horaInicio: "",
    horaFim: "",
    categoriaEvento: "",
    localEvento: "",
    descricaoEvento: "",
  });

  const [erros, setErros] = useState<Partial<Evento>>({});

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
    setEvento({
      ...evento,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startLoading();

    // Verifica se todos os campos obrigatórios estão preenchidos
    const camposObrigatorios: (keyof Evento)[] = [
      "nomeEvento",
      "dataEvento",
      "horaInicio",
      "horaFim",
      "categoriaEvento",
      "localEvento",
      "descricaoEvento",
    ];

    const novosErros: Partial<Evento> = {};
    let formularioValido = true;

    camposObrigatorios.forEach((campo) => {
      if (!evento[campo]) {
        novosErros[campo] = `O campo é obrigatório`;
        formularioValido = false;
      }
    });

    if (!formularioValido) {
      setErros(novosErros);
      stopLoading();
      return;
    }

    // Se o formulário for válido, pode prosseguir com o envio
    const eventoParaEnviar: Evento = {
      nomeEvento: evento.nomeEvento,
      dataEvento: evento.dataEvento,
      horaInicio: evento.horaInicio,
      horaFim: evento.horaFim,
      categoriaEvento: evento.categoriaEvento,
      localEvento: evento.localEvento,
      descricaoEvento: evento.descricaoEvento,
    };

    try {
      const response = await fetch("/api/cadastrar-evento", {
        method: "POST",
        body: JSON.stringify(evento),
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
      });

      notifySuccess();
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
        {/* Nome do Evento */}

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
            {categorias.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          <label
            htmlFor="areaAtuacao"
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
            htmlFor="nome"
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
              erros.localEvento ? "border-red-500" : ""
            }`}
          />
          <label
            htmlFor="descricaoEvento"
            className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out bg-white mx-2 text-grey-darker"
          >
            Descrição do Evento
          </label>
          {erros.localEvento && (
            <p className="text-red-500 text-xs mt-1">{erros.localEvento}</p>
          )}
        </div>

        {/* Botão de Cadastro */}
        <button
          type="submit"
          className="  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-3"
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
