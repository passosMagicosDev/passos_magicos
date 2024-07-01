"use client";
import { useSession } from "next-auth/react";
import { UserData } from "@/app/app/layout";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const DataUserContext = createContext<UserData>({
  admin: false,
  areaAtuacao: "",
  email: "",
  eventosCadastrados: [],
  eventosInscritos: [],
  id: 0,
  nome: "",
});

export const useDataUser = () => useContext(DataUserContext);

export const DataUserProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<UserData>({
    admin: false,
    areaAtuacao: "",
    email: "",
    eventosCadastrados: [],
    eventosInscritos: [],
    id: 0,
    nome: "",
  });

  const emailUser = sessionStorage.getItem("email_user") || "";

  useEffect(() => {
    const fetchData = async () => {
      const userDataFetch = await fetch(`/api/data-user?email=${emailUser}`, {
        method: "GET",
      });
      if (!userDataFetch.ok) return;
      const result = await userDataFetch.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <DataUserContext.Provider value={data}>{children}</DataUserContext.Provider>
  );
};
