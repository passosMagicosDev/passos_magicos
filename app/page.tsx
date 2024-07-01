import Image from "next/image";
import Link from "next/link";
import Volunataria from "@/public/imgs/voluntaria.png";
import Logo from "@/public/imgs/logo.png";

export default function App() {
  return (
    <main className="min-h-screen bg-background-gray flex items-center justify-center">
      <div className="max-w-[1372px] px-4 flex items-center h-full justify-between mx-auto gap-20">
        <div className="max-w-[571px]">
          <h1 className="text-6xl text-text-dark">
            Já faz parte do nosso Voluntariado?
          </h1>
          <p className="text-text-medium text-base my-8">
            Se já recebeu nosso convite, clique no botão abaixo e acesse nosso
            cronograma agora mesmo!
          </p>
          <Link
            href="/login"
            className="block w-max py-3 px-10 rounded bg-button-blue text-base font-medium text-white"
          >
            Acessar Voluntariado
          </Link>
        </div>

        <div className="h-auto relative rounded-2xl overflow-hidden">
          <Image
            src={Logo}
            alt="Logo Passos Mágicos"
            className="absolute left-10 top-10"
          />
          <Image
            className="max-h-[calc(100vh-40px)] object-cover"
            quality={100}
            src={Volunataria}
            alt="Mulher se volunatariando para projeto"
          />

          <div className="bg-gradient-to-t from-black to-transparent text-white text-base pt-44 absolute w-full bottom-0 pb-10 pl-10">
            <p>Quer fazer parte do nosso Voluntariado?</p>
            <p className="text-base text-white my-4">
              Se você quer fazer parte do nosso time, clique no botão abaixo!
            </p>

            <div className="flex gap-5">
              <Link
                href="https://forms.gle/N19W9FyP8b4CLLEJ8"
                className="block w-max py-3 px-10 rounded bg-transparent text-base font-medium text-white border"
              >
                Quero ser voluntário
              </Link>

              <Link
                target="blank"
                href="https://passosmagicos.org.br/como-apoiar/"
                className="block w-max py-3 px-10 rounded bg-transparent text-base font-medium text-white border"
              >
                Quero doar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
