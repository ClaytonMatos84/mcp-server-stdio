import axios from 'axios';

import { ResponseCountry, User } from '../model/User.js';

const API_URL = 'http://localhost:8080';

export async function getSuperUsers(): Promise<User[]> {
    try {
        const response = await axios.get(`${API_URL}/superusers`);
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

export async function getTopCountries(): Promise<ResponseCountry[]> {
    try {
        const response = await axios.get(`${API_URL}/top-countries`);
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