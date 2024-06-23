"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { useRouter } from "next/navigation";

function FormLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let valid = true;
    const newErrors: { email?: string; password?: string; general?: string } =
      {};

    if (!email) {
      newErrors.email = "O campo de e-mail é obrigatório";
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "E-mail inválido";
      valid = false;
    }

    if (!password) {
      newErrors.password = "O campo de senha é obrigatório";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!result?.ok) {
        throw new Error(result?.error || "Erro ao fazer login");
      }

      router.push("/app");
    } catch (error: any) {
      setErrors({ general: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative float-label-input">
        <input
          type="text"
          id="email"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400 ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        <label
          htmlFor="email"
          className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out bg-white mx-2 text-grey-darker"
        >
          Email
        </label>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div className="relative float-label-input mt-5 mb-2">
        <input
          type="password"
          id="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400 ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        <label
          htmlFor="password"
          className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out bg-white mx-2 text-grey-darker"
        >
          Senha
        </label>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-[#0367B0] py-3 text-white text-base font-medium rounded mb-2"
      >
        Acessar conta
      </button>
      {errors.general && (
        <p className="text-red-500 text-xs mt-1">{errors.general}</p>
      )}
    </form>
  );
}

export default FormLogin;
