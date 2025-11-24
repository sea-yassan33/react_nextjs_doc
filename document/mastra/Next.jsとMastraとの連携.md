# mastra_next.js導入方法
- next.jsでアプリを作成する際、AIエージェントをMastraのツールを使って実装

## 導入手順

```sh
## next.jsのプロジェクトを立ち上げる
npx create-next-app@15.5.4

$ npx create-next-app@15.5.4
√ What is your project named? ... mastra-nextjs
√ Would you like to use TypeScript? ... / Yes
√ Which linter would you like to use? » ESLint
√ Would you like to use Tailwind CSS? ... / Yes
√ Would you like your code inside a `src/` directory? ... / Yes
√ Would you like to use App Router? (recommended) ...  / Yes
√ Would you like to use Turbopack? (recommended) ... / Yes
√ Would you like to customize the import alias (`@/*` by default)? ... No /

## プロジェクト内に移動
cd mastra-nextjs

## mastraクライアント初期化
npx mastra@latest init

✔ Successfully installed Mastra core dependencies
┌   Mastra Init
│
◇  Where should we create the Mastra files? (default: src/)
│  src/
│
◇  Select a default provider:
│  Google
│
◇  Enter your Google API key?
│  Skip for now
│
◇  Make your IDE into a Mastra expert? (Installs Mastra's MCP server)
│  Skip for now

```

### next.config.jsに追加

```js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@mastra/*"],
};

export default nextConfig;

```

### 必要なモジュールをインストール
```sh
npm install @ai-sdk/google @mastra/mcp dotenv

```

### 環境ファイルの作成
```sh
## サンプルファイルを基にenvファイルを作成
cp .env.example .env
```

```sh
[.env]
GOOGLE_GENERATIVE_AI_API_KEY=your-api-key
```

### mastraのサーバーも起動ができるようにする
- ./package.json

```json
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    // 下記を追加
    "msdev": "mastra dev",
  },
```

### agentの作成
- [./src/mastra/agents/cooking-agents.ts](../../mastra/mastra-nextjs/src/mastra/agents/cooking-agents.ts)

### 作成したagentを組み込む
- [./src/mastra/index.ts](../../mastra/mastra-nextjs/src/mastra/index.ts)

### mastraを起動し作成したagentが動くか確認

```sh
npm run msdev
```

![mastra_chack](https://i.gyazo.com/af63050614de51e8ae4948e38bd856ed.png)

### actions.tsファイルを作成
- [./src/lib/actions.ts](../../mastra/mastra-nextjs/src/lib/actions.ts)
- Mastraと通信の基盤も含めて作成

```ts
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
```

### CookingFormコンポーネントを作成
- ユーザーが食材を入力した後にgetCookingInfoアクションを呼び出す仕組み

- [./src./components/cookingForm.tsx](../../mastra/mastra-nextjs/src/components/cookingForm.tsx)

### ページ本体にCookingFormコンポーネントを組み込む

- [./src/app/page.tsx](../../mastra/mastra-nextjs/src/app/page.tsx)

### フロント側で動くか確認

```sh
npm run dev
```

![front_check](https://i.gyazo.com/362a1c6ff7b987974bdb9d15bd9c0f9e.png)

## 参考
- [MastraとNext.jsで生成AIアプリケーション作ってCDKでデプロイしましょう](https://qiita.com/Syoitu/items/bfcc49e3941e8fefe4da)
