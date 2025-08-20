import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { getContexts, getCurrentContext, getPods, grepLogs, setCurrentContext } from '../application/services/KubernetesService.js';

export async function registerKubernetesTools(server:McpServer): Promise<void> {
    server.tool(
        'kubernetes-get-contexts',
        'Retorna todos os contextos do kubernetes',
        {},
        async () => {
            const contexts = getContexts() as string;
            return {
                content: [{
                    type: 'text',
                    text: contexts
                }]
            };
        }
    );

    server.tool(
        'kubernetes-get-current-context',
        'Retorna o contexto atual do kubernetes',
        {},
        async () => {
            const context = getCurrentContext() as string;
            return {
                content: [{
                    type: 'text',
                    text: context
                }]
            };
        }
    );

    server.tool(
        'kubernetes-get-pods',
        'Retorna as pods do kubernetes',
        {},
        async () => {
            const pods = getPods() as string;
            return {
                content: [{
                    type: 'text',
                    text: pods
                }]
            };
        }
    );

    server.tool(
        'kubernetes-set-context',
        'Define o contexto atual do kubernetes',
        {
            context: z.string().describe('Nome do contexto a ser definido')
        },
        async ({ context }) => {
            setCurrentContext(context);
            return {
                content: [{
                    type: 'text',
                    text: `Contexto definido para: ${context}`
                }]
            };
        }
    );

    server.tool(
        'kubernetes-grep-logs',
        'Busca logs de uma pod do kubernetes',
        {
            podName: z.string().describe('Nome da pod'),
            namespace: z.string().describe('Namespace da pod'),
            query: z.string().describe('Consulta para filtrar os logs de uma pod')
        },
        async ({ podName, namespace, query }) => {
            const logs = grepLogs(podName, namespace, query) as string;
            return {
                content: [{
                    type: 'text',
                    text: logs
                }]
            };
        }
    );
}
