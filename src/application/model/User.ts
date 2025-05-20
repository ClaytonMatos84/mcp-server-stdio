type Acao = 'login' | 'logout';

interface Projeto {
    nome: string;
    concluido: boolean;
}

interface Equipe {
    nome: string;
    lider: boolean;
    projetos: Projeto[];
}

interface Log {
    data: string; // formato ISO (YYYY-MM-DD)
    acao: Acao;
}

export interface User {
    id: string;
    nome: string;
    idade: number;
    score: number;
    ativo: boolean;
    pais: string;
    equipe: Equipe;
    logs: Log[];
}

export interface ResponseCountry {
    country: string
    total: number
}
