import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { registerMathTool } from '../../tools/MathTool.js';
import { registerWeatherTool } from '../../tools/WeatherTool.js';
import { registerUsersTool } from '../../tools/UsersTool.js';
import { registerDockerTools } from '../../tools/DockerTool.js';

export function createServer(): McpServer {
    const server = new McpServer({
        name: 'mcp-server-stdio',
        version: '1.0.0'
    });

    return server;
}

export async function registerTools(server: McpServer): Promise<void> {
    await registerMathTool(server);
    await registerWeatherTool(server);
    await registerUsersTool(server);
    await registerDockerTools(server);
}
