
import { Mastra } from '@mastra/core/mastra';
//import { createLogger } from "@mastra/core/logger";
import { PinoLogger } from '@mastra/loggers';
import { CookingAgent } from "./agents/cooking-agents";
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { CookingAgent,weatherAgent },
  storage: new LibSQLStore({
    // stores observability, scores, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  telemetry: {
    // serviceName: "ai",
    enabled: false,
  },
  observability: {
    // Enables DefaultExporter and CloudExporter for AI tracing
    default: { enabled: true }, 
  },
});