import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { weatherTool } from '../tools/weather-tool';
import { scorers } from '../scorers/weather-scorer';
import { google } from '@ai-sdk/google';
import path from 'path';
import 'dotenv/config';

export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: `
    あなたは正確な気象情報を提供する親切な天気アシスタントです。

    あなたの主な役割は、ユーザーが特定の場所の天気情報を取得できるよう支援することです。応答する際は以下を守ってください:
    - 場所が指定されていない場合は、必ず場所を尋ねてください
    - 場所の名前が英語でない場合は、英語に翻訳してください
    - 複数の部分を持つ場所を指定する場合(例:「東京, 東京」)、最も関連性の高い部分を使用してください(例:「Tokyo」)
    - 湿度、風の状態、降水量などの関連情報を含めてください
    - 簡潔かつ有益な応答を心がけてください

    weatherToolを使用して現在の気象データを取得してください。
    そのデータより日本語でアドバイスなど回答をして下さい
`,
  model: google('gemini-2.5-flash'),
  tools: { weatherTool },
  scorers: {
    toolCallAppropriateness: {
      scorer: scorers.toolCallAppropriatenessScorer,
      sampling: {
        type: 'ratio',
        rate: 1,
      },
    },
    completeness: {
      scorer: scorers.completenessScorer,
      sampling: {
        type: 'ratio',
        rate: 1,
      },
    },
    translation: {
      scorer: scorers.translationScorer,
      sampling: {
        type: 'ratio',
        rate: 1,
      },
    },
  },
  memory: new Memory({
    storage: new LibSQLStore({
      url: `file:${path.resolve(process.cwd(), 'mastra.db')}`
    }),
  }),
});
