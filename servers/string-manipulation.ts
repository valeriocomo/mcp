import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "mpc-string-manipulation-server",
    version: "1.0.0",
});

server.registerTool("reverse",
    {
        title: "Reverse String",
        description: "Returns the reversed version of the input string.",
        inputSchema: { s: z.string() }
    },
    async ({ s }) => ({
        content: [{ type: "text", text: s ? s.split("").reverse().join("") : s }],
    })
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.log("mpc-string-manipulation-serve is running.");