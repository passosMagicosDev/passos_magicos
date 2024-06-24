import Calendar from "@/public/imgs/icons/calendar.svg";
import QueroDoar from "@/public/imgs/icons/quero_doar.svg";
import Faq from "@/public/imgs/icons/faq.svg";
import MeuPerfil from "@/public/imgs/icons/meu_perfil.svg";
import Voluntariados from "@/public/imgs/icons/voluntariado.svg";

export const itemsNavBar = [
  {
    img: Calendar,
    item: "Agenda de Voluntariado",
    active: false,
    url: "/app",
  },
  {
    img: Voluntariados,
    item: "Meus Voluntariados",
    active: false,
    url: "/meus-voluntariados",
  },
];
export const itemsNavBarAdmin = [
  {
    img: Calendar,
    item: "Agenda de Voluntariado",
    active: false,
    url: "/app",
  },
  {
    img: QueroDoar,
    item: "Cadastrar voluntário",
    active: false,
    url: "/cadastrar-volutario",
  },
  {
    img: MeuPerfil,
    item: "Cadastrar Evento",
    active: false,
    url: "/cadastrar-evento",
  },
  {
    img: Voluntariados,
    item: "Meus Voluntariados",
    active: false,
    url: "/meus-voluntariados",
  },
];
