import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { getSuperUsers, getTopCountries } from '../application/services/UserService.js';

export async function registerUsersTool(server:McpServer): Promise<void> {
    server.tool(
        'get-super-users',
        'Retornar os dados de usuário com score >= 950 e que estão ativos',
        {},
        async () => {
            const usersResponse = await getSuperUsers();
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
            const topCountries = await getTopCountries();
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(topCountries)
                }]
            };
        }
    );
}
