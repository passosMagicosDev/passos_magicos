import Link from "next/link";
import React from "react";
import BannerAzul from "@/public/imgs/banner_azul.png";
import Criancas from "@/public/imgs/criancas.png";
import Logo from "@/public/imgs/logo.png";

import Image from "next/image";

function Login() {
  return (
    <main className="flex h-screen">
      <div className="bg-blue-950 flex-1 flex flex-col w-[30%]">
        <div className="relative w-full h-[70%]">
          <h1 className="absolute text-5xl text-white font-bold max-w-[326px] left-10 bottom-10">
            Já faz parte do nosso Voluntariado?
          </h1>
          <Image
            alt=""
            src={BannerAzul}
            className="w-full object-cover h-full"
            quality={100}
          />
        </div>

        <div className="relative w-full h-[30%]">
          <Image
            alt=""
            src={Logo}
            className="absolute left-6 top-6"
            quality={100}
            width={130}
            height={52}
          />
          <Image
            alt=""
            height={384}
            src={Criancas}
            className="w-full object-cover flex-1 h-[100%]"
            quality={100}
          />
        </div>
      </div>

      <div className="flex items-center w-[70%]">
        <div className="max-w-[526px] mx-auto flex flex-col">
          <h2 className="mb-14 text-4xl text-center text-text-dark">
            Acesse sua conta
          </h2>
          <form action="">
            <div className="relative float-label-input">
              <input
                type="text"
                id="email"
                placeholder=""
                className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400"
              />
              <label
                htmlFor="name"
                className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
              >
                Email
              </label>
            </div>

            <div className="relative float-label-input mt-5 mb-10">
              <input
                type="text"
                id="password"
                placeholder=""
                className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-blue-400"
              />
              <label
                htmlFor="name"
                className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
              >
                Senha
              </label>
            </div>
          </form>

          <Link href="" className="text-xs text-[#0367B0] font-medium">
            Esqueceu a senha?
          </Link>

          <button className="mt-16 bg-[#0367B0] py-3 text-white text-base font-medium rounded">
            Acessar conta
          </button>

          <label
            htmlFor="newsletter"
            className="flex gap-2 mt-5 cursor-pointer"
          >
            <input type="checkbox" name="" id="newsletter" />
            <span className="text-[#666666] text-base">
              Eu quero receber atualizações da newsletter via e-mail
            </span>
          </label>
        </div>
      </div>
    </main>
  );
}

export default Login;
