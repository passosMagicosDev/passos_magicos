export interface Evento {
  id: number;
  mes: number | null;
  dia: number;
  title: string;
  formatted_data: string;
  hora: string;
  local: string;
  desc: string;
  categoria: string;
  quantidadeDePessoas: number;
}

export interface EventoPrisma {
  id: number;
  nomeEvento: string;
  dataEvento: string | null;
  horaInicio: string | null;
  horaFim: string | null;
  categoriaEvento: string | null;
  localEvento: string | null;
  descricaoEvento: string | null;
  quantidadeDePessoas: number;
  inscritos: {
    id: number;
    eventoId: number;
    voluntarioId: number;
    nome: string;
    email: string;
    telefone: string | null;
  }[];
}

export interface EventoCadastrado {
  idEvento: number;
  nomeEvento: string | null;
  dataEvento: string | null;
  horaInicio: string | null;
  horaFim: string | null;
  categoriaEvento: string | null;
  localEvento: string | null;
  quantidadeDePessoas: number | null;
  quantidadeVoluntarios: number | null;
  descricaoEvento: string | null;
  criadorId: number;
  areasAtuacao: string | null;
  inscritos: {
    id: number;
    eventoId: number;
    voluntarioId: number;
    nome: string;
    email: string;
    telefone: string | null;
  }[];
}

interface EventoDetalhado {
  idEvento: number;
  mes: number;
  dia: number;
  title: string;
  formatted_data: string;
  hora: string;
  local: string;
  desc: string;
  categoria: string;
  quantidadeDePessoas: number;
  inscritos: {
    id: number;
    eventoId: number;
    voluntarioId: number;
    nome: string;
    email: string;
    telefone: string | null;
  }[];
}
