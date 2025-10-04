# Next.jsについて

## 1.コンポーネントについて

### ClientComponent
- ファイルの先頭に`"use client"`を記述することで、クライアントコンポーネントとして扱われます。
- クライアントコンポーネントは、ブラウザ上で動作し、ユーザーの操作に応じて動的に変化するUIを実現します。
- クライアントコンポーネントでは、ユースケースを使用時に扱われます。

- ユースケース
  - useState: 状態管理を行うためのフック
  - useEffect: 副作用を扱うためのフック
  - useCallback: 関数をメモ化するためのフック
  - イベントはハンドラ利用時
  - fetch APIやaxiosなどのクライアントサイドでのデータ取得
  - 検索コンポーネント
  - タブ切替／ハンバーガーメニュー

- 無暗に`"use client"`をつけるのは避ける
  - クライアントコンポーネントは、サーバーコンポーネントに比べてパフォーマンスが劣るため、必要な場合にのみ使用することが推奨されます。
  - SSR（サーバーサイドレンダリング）やSSG（静的サイト生成）の恩恵を受けられなくなるため、SEOの観点からも注意が必要です。
  - SEOの観点からも、サーバーコンポーネントを優先的に使用することが望ましいです。
  - 親コンポーネントに`"use client"`をつけると、子コンポーネントもすべてクライアントコンポーネントとして扱われるため、注意が必要です。
  - セキュリティの観点からも、クライアントコンポーネントに機密情報を含めないようにすることが重要です。

### ServerComponent
- デフォルトでは、Next.jsのコンポーネントはサーバーコンポーネントとして扱われます。
- サーバー上でレンダリングされ、静的なHTMLを生成します。
- データベースへのアクセスやAPIの呼び出しなど、サーバーサイドでの処理を行うことができます。
- SEOの観点からも有利です。

## 2.データフェッチ
### fetch API
- Next.jsでは、サーバーコンポーネントで直接データフェッチを行うことができます。
- `fetch`関数を使用して、APIからデータを取得します。
- デフォルトはSSR（サーバーサイドレンダリング）ですが、`{ cache: 'no-store' }`を指定することで、常に最新のデータを取得することができます。

### ORM等を利用した関数
- PrismaやMongooseなどのORMを利用して、データベースからデータを取得する関数を作成します。
- サーバーコンポーネント内でその関数を呼び出して、データを取得します。

### クライアントコンポーネントの場合
- useSWRかTanstak Qureryのクライアントサイドのデータフェッチライブラリを使用することもできます。

### ベストプラクティス
- 可能な限りサーバーコンポーネントでデータフェッチを行い、静的なHTMLを生成することが推奨されます。
例：サーバコンポーネントでのデータフェッチ
```jsx
import React from 'react';
// データフェッチ関数
const fetchData = async () => {
  const res = await fetch('https://api.example.com/data', { cache: 'no-store' });
  return res.json();
}
// コンポーネント
const MyComponent = async () => {
  const data = await fetchData();
  return (
    <div>
      <h1>Data from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
export default MyComponent;
```

- Container/Presentationalパターンを採用し、データフェッチのロジックをコンポーネントから分離することが望ましいです。
- 理由は以下の通りです。
  - 可読性が上がります。
  - メンテナンスがしやすくなります。
  - テストがしやすくなります。

例：Container/Presentationalパターン
```jsx
// 型定義
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
// 子コンポーネント
export function TodoPagePresentation({ todo }: { todo: Todo }) {
  return (
    <>
      <h1>{todo.title}</h1>
      <pre>
        <code>{JSON.stringify(todo, null, 2)}</code>
      </pre>
    </>
  );
}
// 親コンポーネント
export default async function Page() {
  const res = await fetch("https://dummyjson.com/todos/random", {next: {revalidate: 0,},});
  const todo = ((res) => res.json()) as Todo;
  {/* 子コンポーネントにデータを渡す*/}
  return <TodoPagePresentation todo={todo} />;
}
```

## 3.キャッシュ
- Next.jsでは、デフォルトでサーバーコンポーネントのデータフェッチはキャッシュされます。

### Request Memoization
- 同じリクエストが複数回行われた場合、最初のリクエストの結果がキャッシュされ、以降のリクエストではキャッシュされた結果が返されます。
- fetch関数の第二引数に`{ next: { revalidate: 秒数 } }`を指定することで、キャッシュの有効期限を設定できます。
  - 例：`{ next: { revalidate: 60 } }`と指定した場合、60秒間キャッシュが有効になります。
- 動的メタデータを利用する場合も、同様にキャッシュが適用されます。

### Data Cache設定
- `fetch`関数の第二引数に`{ cache: 'no-store' }`を指定することで、キャッシュを無効化できます。
- `{ cache: 'force-cache' }`を指定することで、常にキャッシュを使用します。
- `{ cache: 'default' }`を指定することで、デフォルトのキャッシュ動作を使用します。
- `{ next: { revalidate: 0 } }`を指定することで、常に最新のデータを取得します。
- `{ next: { revalidate: 秒数 } }`を指定することで、キャッシュの有効期限を設定できます。
  - 注意：秒数指定した場合、キャッシュの有効期限が切れた後も、次のリクエストまではキャッシュが使用されます。
  - 例えば61秒後にリクエストが来た場合、60秒のキャッシュが切れているため、新しいデータが取得されます（裏でキャッシュデータの入れ替えを行う）が、画面表示は60秒前の古いキャッシュデータ表示されます。次のリクエストの際に、再度新しいデータが表示されます。
- `{ next: {tags: ['tag1', 'tag2'] } }`を指定することで、タグを利用したキャッシュの管理が可能です。

### Routing Cache設定
- ページコンポーネントの`export const revalidate = 秒数;`を指定することで、ページ全体のキャッシュの有効期限を設定できます。

## 2.メタデータ
- Next.jsでは、ページごとにメタデータを設定できます。
- `export const metadata = { title: 'ページタイトル', description: 'ページの説明' };`をページコンポーネント内に記述することで、メタデータを設定できます。
- 動的メタデータを設定する場合は、`generateMetadata`関数を使用します。

### 静的なメタデータ設定
```jsx
// app/page.tsx
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ページタイトル',
  description: 'ページの説明',
};
export default function Page() {
  return (
    // 省略
  );
}

```

### 動的なメタデータ設定
```jsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
// 型定義
type Props = { params: { slug: string } };
// データフェッチ関数
async function fetchPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`);
  return res.json();
}
// 動的メタデータ設定関数
export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
  const post = await fetchPost(slug);
  return {
    title: post.title,
    description: post.description,
  };
}
// ページコンポーネント
export default async function PostPage({ params: { slug } }: Props) {
  const post = await fetchPost(slug);
  return (
    // 省略
  );
}
```

#### メタデータ設定の詳細
- 公式ドキュメント：[generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields)


# 参考
- [公式：Next.js](https://nextjs.org/docs)
- [Next.jsの考え方](https://zenn.dev/akfm/books/nextjs-basic-principle)
- [【完全保存版】Next.js App Routerのベストプラクティスを解説](https://youtu.be/Ca1h3KUfQ5k?si=pozPrENFO2D5rSy0)
- [【備忘録】Next.js（App Router）でメタデータを設定する](https://qiita.com/tk526608/items/f7d8cd1f135486c872ea)
- [Next.jsのmeta-data設定方法](https://zenn.dev/omegamaster/articles/nextjs-meta-data)