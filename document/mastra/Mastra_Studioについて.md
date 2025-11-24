# Mastra_Studioについて
- Mastra（マストラ）は、JavaScript/TypeScript製のオープンソースAIエージェント開発フレームワークです。
- エージェント開発に必要な機能（ワークフロー、エージェント、RAG＜Retrieval Augmented Generation：外部知識検索＞、評価など）をまとめて提供するため、対話型アシスタントから自律的なタスク実行エージェントまで幅広く構築可能

## Mastra独自のメリット・デメリット
- **メリット**：
  - TypeScriptの強みを活かし、Webアプリ～サーバーレスとスムーズ統合。
  - ワークフローやRAG、評価・監視などをひとつのフレームワークで完結できる
- **デメリット**：
  - 新しいプロジェクトでコミュニティ規模がまだ小さい
  - Python中心の資産を流用しづらい

|フレームワーク（主要言語）|特徴・強み|適したユースケース|注意点・弱み|
|:----|:----|:----|:----|
|Mastra|エージェント、ワークフロー、RAG、評価を統合|フロントエンド～バックエンドをTypeScriptで統一|Python資産を直接活用しづらい、国内情報が少ない|
|LangChain|豊富なツール・モデル連携と広大なコミュニティ|Python中心の研究・実験|機能が多く習得コストが高い|

## Mastraの実例紹介

- カスタマーサポート自動化
  - ユーザーからの問い合わせを自動対応
  - RAG機能を使い、FAQやマニュアルをエージェントが参照することで、高品質な回答を実現
- 専門資料の解析とレポート生成
  - 航空宇宙分野のPDF資料を読み込み、CAD図面を自動生成するElectronアプリも開発されています。
- スマートホーム・IoTチャットボット
  - 家の各設備（エアコン、照明、防犯センサーなど）をエージェントのツールに登録
- 旅行プラン提案アシスタント
  - Showcaseで公開された「TravelAI」は、複数のエージェントが協働して旅行プランを生成するデモ。
  - ユーザーの要望をヒアリングしながら、観光地情報エージェントや日程最適化エージェントなどがマルチエージェント構成で最適解を提案

## 導入方法
# mastra導入

```sh
##　導入
npm create mastra@latest

> npx
> create-mastra

┌   Mastra Create
◇  What do you want to name your project?
│  pre-mastra
◇  Where should we create the Mastra files? (default: src/)
│  src/
◇  Select a default provider:
│  Google
◇  Enter your Google API key?
│  Skip for now
◇  Make your IDE into a Mastra expert? (Installs Mastra's MCP server)
│  Skip for now
◇  Project structure created
◇  npm dependencies installed

```

- 必要なモジュールを導入
```sh
cd pre-mastra

## 必要なモジュールを入れる
## 導入中「warn」はpeerDependencies のバージョン衝突を “適切に解決した” の通知
## エラー（ERROR）がなければOK
npm install @ai-sdk/google @mastra/mcp dotenv

## npm install @mastra/core

touch tsconfig.json
```

- [tsconfig.json](./tsconfig.json)の作成

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

### 環境ファイルの作成
```sh
## サンプルファイルを基にenvファイルを作成
cp .env.example .env
```

```sh
[.env.example]
GOOGLE_GENERATIVE_AI_API_KEY=your-api-key
```

### LLMモデルを変更
- [./pre-mastra/src/mastra/agents/weather-agent.ts](../../mastra/pre-mastra/src/mastra/agents/weather-agent.ts)

```ts
// moduleを追加
import { google } from '@ai-sdk/google';
import path from 'path';
import 'dotenv/config';

// 下記に変更
model: google('gemini-2.5-flash'),

// 下記に変更
memory: new Memory({
  storage: new LibSQLStore({
    url: `file:${path.resolve(process.cwd(), 'mastra.db')}`
  }),
```

- [./pre-mastra/src/mastra/tools/weather-tool.ts](../../mastra/pre-mastra/src/mastra/tools/weather-tool.ts)

```ts
// moduleを追加
import { google } from '@ai-sdk/google';

// 下記に変更
model: google('gemini-2.5-flash'),
```

## mastraのサーバーを立ち上げる

```sh
# 開発サーバーの起動
npm run dev

# アプリケーションのビルド
npm run build
# プロダクション環境での起動
npm run start
```

### ブラウザ画面

http://localhost:4111/agents