[![Open in Devcontainer](https://img.shields.io/badge/Open%20in-DevContainer-blue?logo=visualstudiocode&logoColor=white)](https://github.com/containers/devcontainer)
[![Open in GitHub Codespaces](https://img.shields.io/badge/Open%20in-GitHub%20Codespaces-blue?logo=github&logoColor=white)](https://github.com/codespaces/new?repo=valeriocomo/mcp)

# MCP Multi-Server Agent Example

This project demonstrates how to use the Model Context Protocol (MCP) with multiple tool servers in a Node.js environment. It leverages the `@langchain/mcp-adapters` package to connect to different MCP servers, enabling advanced tool orchestration for language model agents.

## Features

- **Multi-Server MCP Client**: Connects to multiple MCP tool servers, including a general-purpose server and a custom string manipulation server.
- **OpenAI Integration**: Uses the OpenAI GPT-4o model for language understanding and reasoning.
- **Dynamic Tool Discovery**: Automatically loads and lists available tools from all configured MCP servers.
- **Agent Execution**: Runs a React-style agent that can invoke tools based on user input.
- **Custom Tool Server**: Includes a sample string manipulation server implemented in TypeScript.

## Project Structure

- `index.ts` — Main entry point. Sets up the MCP client, loads tools, initializes the agent, and runs example queries.
- `servers/string-manipulation.ts` — Custom MCP server providing string manipulation tools (e.g., reversing strings).
- `package.json` — Project dependencies and scripts.

## Usage

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set your OpenAI API key:**
   Create a `.env` file in the project root with:
   ```env
   OPENAI_API_KEY=your-openai-api-key
   ```
3. **Run the project:**
   ```bash
   npx tsx index.ts
   ```

## Example Output

The agent will:
- Reverse the string 'Hello, World!' using the string manipulation server.
- Calculate the sum of 5 and 10 using the general-purpose server.

## Requirements
- Node.js (with npm)
- Access to the OpenAI API

## License
MIT
