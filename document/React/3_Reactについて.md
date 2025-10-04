# React(Vite)について

## Reactとは
- Meta社が開発したJavaScriptライブラリで、ユーザーインターフェース（UI）を構築するために使用されます。
- コンポーネントベースのアーキテクチャを採用しており、再利用可能なUIコンポーネントを作成し、それらを組み合わせて複雑なインターフェースを構築できます。

### 主な特徴
- **コンポーネントベース**: UIを小さな部品（コンポーネント）に分割し、再利用性と保守性を向上させます。
- **仮想DOM**: ページの変更があった際、まずメモリ上に作成された仮想DOM上で差分を計算し、必要な箇所だけを実際のWebページに反映します。この仕組みにより、ページ全体の再レンダリングが不要となり、レンダリングが高速化されます。
- JSX（JavaScript XML）: JavaScript内でHTMLのような構文を使用できる拡張子で、UIの構造を直感的に記述できます。

### Reactの利用例
- シングルページアプリケーション（SPA）
- モバイルアプリケーション（React Nativeを使用）
- ダッシュボードや管理画面
- VR/ARアプリケーション（React 360を使用）

## Viteとは
- 現代のWebプロジェクトのために、より速く無駄のない開発体験を提供することを目的としたビルドツールです。

### Viteの特徴
- **npmの依存関係の解決とバンドリング**: Viteは、ESモジュールを使用して依存関係を解決し、開発中に必要なモジュールのみを動的にロードします。これにより、初期のビルド時間が大幅に短縮されます。依存関係は積極的にキャッシュされ、再ビルド時のパフォーマンスが向上します。
- **ホットモジュールリプレースメント（HMR）**: Viteは、コードの変更を即座にブラウザに反映させるHMR機能を提供します。これにより、開発者はページ全体をリロードすることなく、変更をリアルタイムで確認できます。
- **Rollupベースのビルド**: Viteは、複数のJavaScriptファイルをまとめて一つのファイル（バンドル）にするツールです。これにより、最適化されたバンドルが生成され、パフォーマンスが向上します。

## コンポーネントとは
- コンポーネントとは、画面の構成要素を定義したものになります。
- コンポーネントを組み合わせて画面を作っていくことになります。
- メリット
  - 再利用性が高い
  - 保守性が高い
  - 可読性が高い
- コンポーネントはJSXという記法で記述します。
  - JSXはJavaScriptの中にHTMLのような記述ができるようにしたものです。

```jsx
// app/app.tsx
import { Button } from "@/components/ui/button"
import { tv } from 'tailwind-variants';
export default function Home() {
  // styleの定義
  const twStayles = tv({
    variants: {
      style:{
        text01:'text-cyan-400',
        button01:'flex min-h-svh flex-col items-center justify-cente',
      },
    },
  });
  // jsx記法
  return (
    <>
      <div className={twStayles({style:'text01'})}>
        first_commit
      </div>
      <div className={twStayles({style:'button01'})}>
        <Button>Click me</Button>
      </div>
    </>
  );
}
```

```jsx
// app/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## Propsとは
- Propsとは、コンポーネントに渡すことができる引数のようなものです。
- Propsを使うことで、コンポーネントの再利用性が高まります。
- propsは親から子にのみ渡すことができます。

```jsx  
const App =(props) => {
  return (
    <div className="App">
      {props.hoge}
    </div>
  );
}
<App hoge={"hoge"} />
```

## 状態管理とは
- 状態管理とは、コンポーネントの状態を管理することです。
- Next.jsでは、useStateやuseReducerなどのフックを使って状態管理を行います。
- Next.jsで使用する場合は「use state」をつける必要があり、付けた場合はクライアントコンポーネントとして扱われます。

### 【例】カウントアップ
```jsx
import { useState } from  "react"
const App = () => {
  // countが状態(state), setCountはcountを更新する時に使う
  const [count, setCount] = useState(0)
  return(
    <>
	  {/* カウンターの数字(count)を表示 */}
	  <p>現在の数字：{count}</p>
	  <button onClick={() => setCount((prevCount) => prevCount + 1)}></button>
    </>
  )
}
export default App
```

- 子コンポーネントなど別のコンポーネント内でも「カウンターの数字」を使いたい場合
```jsx
import { useState } from  "react"
// 子コンポーネント
const Child = ({ count }: { count: number }) => {
  return <p>現在の数字：{count}</p>
}
// 親コンポーネント
const App = () => {
  const [count, setCount] = useState(0)
  return(
  <>
    {/* カウンターの数字(count)を表示 */}
    <button onClick={() => setCount((prevCount) => prevCount + 1)}></button>
    {/* 子コンポーネントにcountを渡す */}
	  <Child count={count} />
	</>
  )
}
export default App
```

## 参照
- [公式：React](https://ja.react.dev/learn)
- [公式：Vite](https://ja.vite.dev/guide/)
- [公式：Rollup](https://rollupjs.org/introduction/)
- [JavaScript人気バンドラーを徹底比較](https://kinsta.com/jp/blog/rollup-vs-webpack-vs-parcel/)
- [React入門(根本的なことからわかりやすく解説)](https://zenn.dev/hinoshin/articles/77f06d10940efe)
- [【2024年最新版】 Reactの状態管理ライブラリ比較３選＋α（Redux, Zustand, Jotai）](https://qiita.com/kinopy513/items/0f3c9bedcd6efbae4325)