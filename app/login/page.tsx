import Link from "next/link";
import React from "react";
import BannerAzul from "@/public/imgs/banner_azul.png";
import Criancas from "@/public/imgs/criancas.png";
import Logo from "@/public/imgs/logo.png";
import Image from "next/image";
import FormLogin from "@/components/formLogin";

function Login() {
  return (
    <main className="flex h-screen justify-center">
      <div className="bg-blue-950 flex-1 lg:flex flex-col w-[30%] hidden">
        <div className="relative w-full h-[70%]">
          <h1 className="absolute text-4xl xl:text-5xl left-7 text-white font-bold max-w-[326px] xl:left-10 bottom-10">
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

      <div className="flex items-center px-6 md:w-[70%]">
        <div className="max-w-[526px] mx-auto flex flex-col">
          <h2 className="mb-14 text-4xl text-center text-text-dark">
            Acesse sua conta
          </h2>
          <FormLogin />

          <Link href="" className="text-xs text-[#0367B0] font-medium">
            Esqueceu a senha?
          </Link>

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
