import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { getWeather } from './tools/WeatherTool.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

async function main() {
    try {
        const server = new McpServer({
            name: 'mcp-server-stdio',
            version: '1.0.0'
        });

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

        const transport = new StdioServerTransport();
        await server.connect(transport);
    } catch (error) {
        console.error(`Error execute mcp-server -> ${error}`);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error('Fatal error main process:', error);
    process.exit(1);
});
