# Mastra-next.js
- Mastra-next.jsのプロジェクト

## 追加ライブラリ
```sh
## ui.shadcn
## https://ui.shadcn.com/
npx shadcn@latest init -d
## button,input,cardを追加
npx shadcn@latest add
  
## Markdownレンダリング用ライブラリ
npm install react-markdown @tailwindcss/typography remark-gfm rehype-highlight
```

- ./src/app/globals.css
```css
/* 下記を追加 */
@plugin "@tailwindcss/typography";
```

## Docment

- [mastra_next.js導入方法](../../document/mastra/Next.jsとMastraとの連携.md)