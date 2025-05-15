import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export async function registerMathTool(server:McpServer): Promise<void> {
    server.tool(
        'math',
        'Realizar cálculos de soma/subtração/multiplicação/divisão de 2 números',
        {
            operation: z.enum(['adição', 'subtração', 'multiplicação', 'divisão']),
            num1: z.number().describe('primeiro número da conta'),
            num2: z.number().describe('segundo número da conta')
        },
        async ({ operation, num1, num2 }) => {
            let result: number;
            switch (operation) {
                case 'adição':
                    result = num1 + num2;
                    break;
                case 'subtração':
                    result = (num1 >= num2) ? num1 - num2 : num2 - num1;
                    break;
                case 'multiplicação':
                    result = num1 * num2;
                    break;
                case 'divisão':
                    if (num2 == 0) throw new Error('Não pode realizar a divisão por zero');
                    result = num1 / num2;
                    break;
                default:
                    throw new Error('Operação inválida');
            }
            return {
                content: [{
                    type: 'text',
                    text: `Result -> ${result}`
                }]
            };
        }
    );
}
