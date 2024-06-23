"use client";

import Navbar from "@/components/navbar";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface Voluntario {
  nome: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  confirmarEmail: string;
  areaAtuacao: string;
  senha: string;
  confirmarSenha: string;
}

function CadastroVoluntario() {
  const [voluntario, setVoluntario] = useState<Voluntario>({
    nome: "",
    dataNascimento: "",
    telefone: "",
    email: "",
    confirmarEmail: "",
    areaAtuacao: "",
    senha: "",
    confirmarSenha: "",
  });

  const [erros, setErros] = useState<Partial<Voluntario>>({});

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setVoluntario({
      ...voluntario,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verificar se todos os campos estão preenchidos
    const novosErros: Partial<Voluntario> = {};
    let formularioValido = true;

    Object.keys(voluntario).forEach((campo) => {
      if (!voluntario[campo as keyof Voluntario]) {
        novosErros[campo as keyof Voluntario] = "Este campo é obrigatório";
        formularioValido = false;
      }
    });

    // Validar se os e-mails são iguais
    if (voluntario.email !== voluntario.confirmarEmail) {
      novosErros.confirmarEmail = "Os e-mails não coincidem";
      formularioValido = false;
    }

    // Validar se as senhas são iguais
    if (voluntario.senha !== voluntario.confirmarSenha) {
      novosErros.confirmarSenha = "As senhas não coincidem";
      formularioValido = false;
    }

    if (!formularioValido) {
      setErros(novosErros);
      return;
    }

    // Lógica de envio do formulário para o backend
    console.log("Voluntário para enviar:", voluntario);

    const data = await fetch("/api/cadastrar-voluntario", {
      method: "POST",
      body: JSON.stringify(voluntario),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    console.log(data);

    // // Limpar o formulário após o envio
    // setVoluntario({
    //   nome: "",
    //   dataNascimento: "",
    //   telefone: "",
    //   email: "",
    //   confirmarEmail: "",
    //   areaAtuacao: "",
    //   senha: "",
    //   confirmarSenha: "",
    // });

    // Limpar os erros
    setErros({});
  };

  return (
    <main className="flex min-h-screen">
      <Navbar />
      <div className="flex-1">
        <h1 className="text-xl text-[#333] p-5 bg-[#F2F2F2] w-full">
          Cadastrar Voluntário
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Nome */}
          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={voluntario.nome}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full ${
                erros.nome ? "border-red-500" : ""
              }`}
            />
            {erros.nome && (
              <p className="text-red-500 text-xs mt-1">{erros.nome}</p>
            )}
          </div>

          {/* Data de Nascimento */}
          <div className="mb-4">
            <label
              htmlFor="dataNascimento"
              className="block text-sm font-medium text-gray-700"
            >
              Data de Nascimento
            </label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={voluntario.dataNascimento}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full ${
                erros.dataNascimento ? "border-red-500" : ""
              }`}
            />
            {erros.dataNascimento && (
              <p className="text-red-500 text-xs mt-1">
                {erros.dataNascimento}
              </p>
            )}
          </div>

          {/* Telefone */}
          <div className="mb-4">
            <label
              htmlFor="telefone"
              className="block text-sm font-medium text-gray-700"
            >
              Telefone
            </label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={voluntario.telefone}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full ${
                erros.telefone ? "border-red-500" : ""
              }`}
            />
            {erros.telefone && (
              <p className="text-red-500 text-xs mt-1">{erros.telefone}</p>
            )}
          </div>

          {/* E-mail */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={voluntario.email}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full ${
                erros.email ? "border-red-500" : ""
              }`}
            />
            {erros.email && (
              <p className="text-red-500 text-xs mt-1">{erros.email}</p>
            )}
          </div>

          {/* Confirmar E-mail */}
          <div className="mb-4">
            <label
              htmlFor="confirmarEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmar E-mail
            </label>
            <input
              type="email"
              id="confirmarEmail"
              name="confirmarEmail"
              value={voluntario.confirmarEmail}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full ${
                erros.confirmarEmail ? "border-red-500" : ""
              }`}
            />
            {erros.confirmarEmail && (
              <p className="text-red-500 text-xs mt-1">
                {erros.confirmarEmail}
              </p>
            )}
          </div>

          {/* Área de Atuação */}
          <div className="mb-4">
            <label
              htmlFor="areaAtuacao"
              className="block text-sm font-medium text-gray-700"
            >
              Área de Atuação
            </label>
            <input
              type="text"
              id="areaAtuacao"
              name="areaAtuacao"
              value={voluntario.areaAtuacao}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full ${
                erros.areaAtuacao ? "border-red-500" : ""
              }`}
            />
            {erros.areaAtuacao && (
              <p className="text-red-500 text-xs mt-1">{erros.areaAtuacao}</p>
            )}
          </div>

          {/* Senha */}
          <div className="mb-4">
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={voluntario.senha}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full ${
                erros.senha ? "border-red-500" : ""
              }`}
            />
            {erros.senha && (
              <p className="text-red-500 text-xs mt-1">{erros.senha}</p>
            )}
          </div>

          {/* Confirmar Senha */}
          <div className="mb-4">
            <label
              htmlFor="confirmarSenha"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={voluntario.confirmarSenha}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded-md p-2 mt-1 w-full ${
                erros.confirmarSenha ? "border-red-500" : ""
              }`}
            />
            {erros.confirmarSenha && (
              <p className="text-red-500 text-xs mt-1">
                {erros.confirmarSenha}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-3"
          >
            Cadastrar Voluntário
          </button>
        </form>
      </div>
    </main>
  );
}

export default CadastroVoluntario;
