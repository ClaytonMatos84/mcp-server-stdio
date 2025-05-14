import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { getWeather } from '../../tools/WeatherTool.js';

export function createServer(): McpServer {
    const server = new McpServer({
        name: 'mcp-server-stdio',
        version: '1.0.0'
    });

    return server;
}

export async function registerTools(server: McpServer): Promise<void> {
    server.tool(
        'get-weather',
        'Retornar o clima de uma cidade',
        {
            cidade: z.string().describe('Nome da cidade')
        },
        async ({cidade}) => {
            const weatherResponse = await getWeather(cidade as string);

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(weatherResponse)
                }]
            };
        }
    );
}
