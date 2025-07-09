import { MultiServerMCPClient } from "@langchain/mcp-adapters";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import * as dotenv from "dotenv";

dotenv.config();

console.log(process.env.OPENAI_API_KEY)

const client = new MultiServerMCPClient({
    throwOnLoadError: true,
    prefixToolNameWithServerName: true,
    additionalToolNamePrefix: "mcp",
    useStandardContentBlocks: true,

    mcpServers: {
        everything: {
            transport: "stdio",
            command: "npx",
            args: ["-y", "@modelcontextprotocol/server-everything"],
            // Restart configuration for stdio transport
            restart: {
                enabled: true,
                maxAttempts: 3,
                delayMs: 1000,
            },
        },
        stringManipulation: {
            transport: "stdio",
            command: "node",
            args: ["--experimental-strip-types", "servers/string-manipulation.ts"],
            // Restart configuration for stdio transport
            restart: {
                enabled: true,
                maxAttempts: 3,
                delayMs: 1000,
            },
        },

        // here's a filesystem server
        // filesystem: {
        //   transport: "stdio",
        //   command: "npx",
        //   args: ["-y", "@modelcontextprotocol/server-filesystem"],
        // },
    },
});

const tools = await client.getTools();
tools.forEach((tool) => {
    console.log(`Tool: ${tool.name}`);
    console.log(`Description: ${tool.description}`);
    console.log(`Tool Metadata: ${JSON.stringify(tool.metadata, null, 2)}`);
    console.log(`\n`);
});

const model = new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
});

// Create the React agent
const agent = createReactAgent({
    llm: model,
    tools,
});

const runAgent = async (content: string) => {
    try {
        const response = await agent.invoke({
            messages: [{ role: "user", content }],
        });
        console.log(`\Conversation for: "${content}"\n`);
        console.log(response.messages.map((m) => m.content).join("\n"));
    } catch (error) {
        console.error("Error during agent execution:", error);
        if (error.name === "ToolException") {
            console.error("Tool execution failed:", error.message);
        }
    }

}

// Run the agent
await runAgent("Reverse the string 'Hello, World!'");
await runAgent("What is the sum of 5 and 10?");

await client.close();