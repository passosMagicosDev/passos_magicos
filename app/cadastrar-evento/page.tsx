"use client";

import Navbar from "@/components/navbar";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface Evento {
  nomeEvento: string;
  dataEvento: string;
  horaInicio: string;
  horaFim: string;
  categoriaEvento: string;
  localEvento: string;
  descricaoEvento: string;
}

function CadastarEvento() {
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
        novosErros[campo] = `O campo ${campo} é obrigatório`;
        formularioValido = false;
      }
    });

    if (!formularioValido) {
      setErros(novosErros);
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

    // Exemplo de envio para o backend (simulado)
    console.log("Evento para enviar:", eventoParaEnviar);

    const data = await fetch("/api/cadastrar-evento", {
      method: "POST",
      body: JSON.stringify(eventoParaEnviar),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    console.log(data);

    // Limpar os campos do formulário após o envio
    setEvento({
      nomeEvento: "",
      dataEvento: "",
      horaInicio: "",
      horaFim: "",
      categoriaEvento: "",
      localEvento: "",
      descricaoEvento: "",
    });

    // Limpar os erros
    setErros({});
  };

  return (
    <main className="flex min-h-screen">
      <Navbar />
      <div className="flex-1">
        <h1 className="text-xl text-[#333] p-5 bg-[#F2F2F2] w-full">
          Cadastrar Evento
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nomeEvento"
              className="block text-sm font-medium text-gray-700"
            >
              Nome do Evento
            </label>
            <input
              type="text"
              id="nomeEvento"
              name="nomeEvento"
              placeholder="Digite o nome do evento"
              value={evento.nomeEvento}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full ${
                erros.nomeEvento ? "border-red-500" : ""
              }`}
            />
            {erros.nomeEvento && (
              <p className="text-red-500 text-xs mt-1">{erros.nomeEvento}</p>
            )}
          </div>

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
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full ${
                erros.dataEvento ? "border-red-500" : ""
              }`}
            />
            {erros.dataEvento && (
              <p className="text-red-500 text-xs mt-1">{erros.dataEvento}</p>
            )}
          </div>

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
                className={`border border-gray-300 rounded-md p-2 mt-1 w-full ${
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
                className={`border border-gray-300 rounded-md p-2 mt-1 w-full ${
                  erros.horaFim ? "border-red-500" : ""
                }`}
              />
              {erros.horaFim && (
                <p className="text-red-500 text-xs mt-1">{erros.horaFim}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="categoriaEvento"
              className="block text-sm font-medium text-gray-700"
            >
              Categoria do Evento
            </label>
            <select
              id="categoriaEvento"
              name="categoriaEvento"
              value={evento.categoriaEvento}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full ${
                erros.categoriaEvento ? "border-red-500" : ""
              }`}
            >
              <option value="">Selecione uma categoria</option>
              <option value="categoria1">Categoria 1</option>
              <option value="categoria2">Categoria 2</option>
            </select>
            {erros.categoriaEvento && (
              <p className="text-red-500 text-xs mt-1">
                {erros.categoriaEvento}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="localEvento"
              className="block text-sm font-medium text-gray-700"
            >
              Local do Evento
            </label>
            <input
              type="text"
              id="localEvento"
              name="localEvento"
              placeholder="Digite o local do evento"
              value={evento.localEvento}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full ${
                erros.localEvento ? "border-red-500" : ""
              }`}
            />
            {erros.localEvento && (
              <p className="text-red-500 text-xs mt-1">{erros.localEvento}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="descricaoEvento"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição do Evento
            </label>
            <textarea
              id="descricaoEvento"
              name="descricaoEvento"
              placeholder="Digite uma descrição do evento"
              rows={4}
              value={evento.descricaoEvento}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full resize-none ${
                erros.descricaoEvento ? "border-red-500" : ""
              }`}
            ></textarea>
            {erros.descricaoEvento && (
              <p className="text-red-500 text-xs mt-1">
                {erros.descricaoEvento}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-3"
          >
            Adicionar Evento
          </button>
        </form>
      </div>
    </main>
  );
}

export default CadastarEvento;
