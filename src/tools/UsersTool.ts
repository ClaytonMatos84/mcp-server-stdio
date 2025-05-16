import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

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

interface User {
    id: string;
    nome: string;
    idade: number;
    score: number;
    ativo: boolean;
    pais: string;
    equipe: Equipe;
    logs: Log[];
}

interface ResponseCountry {
    country: string
    total: number
}

export async function registerUsersTool(server:McpServer): Promise<void> {
    server.tool(
        'get-super-users',
        'Retornar os dados de usuário com score >= 950 e que estão ativos',
        {},
        async () => {
            const usersResponse = await _getSuperUsers(API_URL);
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(usersResponse)
                }]
            };
        }
    );

    server.tool(
        'get-top-countries',
        'Retornar a quantidade dos super usuários separados por país',
        {},
        async () => {
            const topCountries = await _getTopCountries(API_URL);
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(topCountries)
                }]
            };
        }
    );
}

const _getSuperUsers = async (baseUrl: string): Promise<User[]> => {
    try {
        const response = await axios.get(`${baseUrl}/superusers`);
        const responseUsers = response.data;
        return responseUsers.data as User[];
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching superusers data:', error.message);
            throw new Error(`Erro ao buscar dados da api de usuários. ${error.message}`);
        }
        throw new Error('Erro ao buscar dados da api de usuários.');
    }
}

const _getTopCountries = async (baseUrl: string): Promise<ResponseCountry[]> => {
    try {
        const response = await axios.get(`${baseUrl}/top-countries`);
        const responseCountries = response.data;
        return responseCountries.countries as ResponseCountry[];
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching top-countries data:', error.message);
            throw new Error(`Erro ao buscar dados da api de usuários. ${error.message}`);
        }
        throw new Error('Erro ao buscar dados da api de usuários.');
    }
}
