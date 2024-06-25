import React from "react";
type Props = {
  inscritos: {
    id: number;
    eventoId: number;
    voluntarioId: number;
    nome: string;
    email: string;
    telefone: string | null;
  }[];
};
function ListaVoluntarios({ inscritos }: Props) {
  return (
    <tbody>
      {inscritos.length >= 1 ? (
        inscritos.map((el, index) => (
          <tr
            key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {el.nome}
            </th>

            <td className="px-6 py-4">{el.email}</td>
            <td className="px-6 py-4">{el.telefone}</td>
          </tr>
        ))
      ) : (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            Sem Registro
          </th>
          <td className="px-6 py-4">Sem Registro</td>
          <td className="px-6 py-4">Sem Registro</td>
        </tr>
      )}
    </tbody>
  );
}

export default ListaVoluntarios;
