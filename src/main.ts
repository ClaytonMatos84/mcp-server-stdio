import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer, registerTools } from './application/services/ServerService.js';

async function main() {
    try {
        const server = createServer();
        await registerTools(server);

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
