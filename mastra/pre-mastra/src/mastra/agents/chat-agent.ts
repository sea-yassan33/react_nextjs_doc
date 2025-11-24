import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
// import { MCPClient } from "@mastra/mcp";
import { google } from '@ai-sdk/google';
import path from 'path';

// const mcp = new MCPClient({
//   servers: {
//     "dice-roller": {
//       "command": "npx",
//       "args": [
//         "-y", "@modelcontextprotocol/server-sequential-thinking"
//       ],
//     },
//   },
// });

export const ChatAgent = new Agent({
  name: 'Chat Agent',

  instructions: "あなたは親切で知識豊富はAIアシスタントです。ユーザーの質問に対してわかりやすく丁寧に回答してください",
  model: google('gemini-2.5-flash'),
  memory: new Memory({
    storage: new LibSQLStore({
      url: `file:${path.resolve(process.cwd(), 'mastra.db')}`, // パスは.mastra/outputディレクトリからの相対パスです
    }),
  }),
});