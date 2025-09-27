# Next_jsのプロジェクト立ち上げ方法

```sh
npx create-next-app@latest

Need to install the following packages:
create-next-app@15.5.4
Ok to proceed? (y) y

√ What is your project named? ... pre-nextjs
√ Would you like to use TypeScript? ... No / Yes
√ Which linter would you like to use? » ESLint
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like your code inside a `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to use Turbopack? (recommended) ... No / Yes
√ Would you like to customize the import alias (`@/*` by default)? ... No / Yes
```

## プロジェクトの起動

```sh 
cd [プロジェクト名]
npm run dev
```

http://localhost:3000 にアクセスして、Next.jsのウェルカムページが表示されれば成功です。

## 初期設定
- 用意するディレクトリ
```sh
mkdir -p public/img
mkdir -p public/data
mkdir -p app/components
```

- 追加ライブラリ
```sh
## Tailwind Variants
npm install tailwind-variants

## ui.shadcn
## https://ui.shadcn.com/
npx shadcn@latest init -d
npx shadcn@latest add

### 以下必要に応じて追加
## Headless UI
## https://headlessui.com/v1
npm install @headlessui/react

## reacticons
## https://react-icons.github.io/react-icons/
npm install react-icons

## Heroicons
## https://zenn.dev/nino_cast/books/43c539eb47caab/viewer/807f3b
## https://heroicons.com/solid
npm install @heroicons/react

## ブラウザ依存のライブラリ
## https://qiita.com/KokiSakano/items/e3a42a12f5de3c9f88ea
npm install framer-motion
```