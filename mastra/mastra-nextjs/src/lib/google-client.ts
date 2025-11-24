// src/lib/google-client.ts
import { createGoogleGenerativeAI } from "@ai-sdk/google";

/**
 * Google AI Studio API Key を使った Google Client 初期化処理
 */
export function initializeGoogleClient() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY が設定されていません。");
  }

  return createGoogleGenerativeAI({
    apiKey: apiKey, // Google AI Studio の API Key
  });
}
