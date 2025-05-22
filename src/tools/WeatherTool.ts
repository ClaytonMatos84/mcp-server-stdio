import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { getWeather } from '../application/services/WeatherService.js';

export async function registerWeatherTool(server:McpServer): Promise<void> {
    server.tool(
        'get-weather',
        'Retornar o clima de uma cidade',
        {
            cidade: z.string().describe('Nome da cidade')
        },
        async ({ cidade }) => {
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
