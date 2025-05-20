import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { inspectContainer, listAllContainers, startContainer, stopContainer } from '../application/services/DockerService.js';
import { z } from 'zod';

export async function registerDockerTools(server:McpServer): Promise<void> {
    server.tool(
        'list-containers',
        'Retornar os containers criados na máquina',
        {},
        async () => {
            const containersResponse = await listAllContainers();
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(containersResponse)
                }]
            };
        }
    );

    server.tool(
        'start-container',
        'Inicia um container docker',
        {
            containerId: z.string().describe('id do container')
        },
        async ({ containerId }) => {
            const containerResponse = await startContainer(containerId);
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(containerResponse)
                }]
            };
        }
    );

    server.tool(
        'stop-container',
        'Para um container docker',
        {
            containerId: z.string().describe('id do container')
        },
        async ({ containerId }) => {
            const containerResponse = await stopContainer(containerId);
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(containerResponse)
                }]
            };
        }
    );

    server.tool(
        'inspect-container',
        'Retorna as informações de um container docker',
        {
            containerId: z.string().describe('id do container')
        },
        async ({ containerId }) => {
            const containerResponse = await inspectContainer(containerId);
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(containerResponse)
                }]
            };
        }
    );
}
