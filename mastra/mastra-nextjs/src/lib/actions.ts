"use server";

import { mastra } from "@/mastra";
// Mastraに定義したCookingAgentを呼び出すコード
export async function getCookingInfo(prevState: unknown, formData: FormData) {
  const recipe = JSON.parse(formData.get("recipe") as string);
  const agent = mastra.getAgent("CookingAgent");
  const prompt = `${recipe}のレシピを考えて下さい ` 
  const result = await agent.generate(prompt);

  return {
    text: result.text,
    finishReason: result.finishReason,
    timestamp: new Date().toISOString(),
    totalTokens: result.usage?.totalTokens
  };
}

