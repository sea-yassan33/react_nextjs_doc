"use client";

import { useState, useEffect, useActionState, startTransition } from "react";
import { getCookingInfo } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Markdown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";
import remarkGfm from 'remark-gfm';

export function CookingForm() {
  const [recipe, setrecipe] = useState("");
  const [result, setResult] = useState("");
  //Next.js App Router の Server Actions と結びつくフック
  // state:サーバーから返ってきた「最新の実行結果」
  // action:Server Action を呼ぶための関数
  // isPending処理中かどうか（ローディング状態）
  const [state, action, isPending] = useActionState(getCookingInfo, null);
  //サーバーからの結果を UI へ反映
  useEffect(() => {
    if (state?.text) {
      setResult(state.text);
    }
  }, [state]);
  // 送信ボタンが押された際の処理
  const handleSubmit = async (e: React.FormEvent) => {
    //フォームのデフォルトのページリロードを防ぐ。
    e.preventDefault();
    // 入力チェック
    if (!recipe.trim()) return;
    //FormData を引数として受け取り、actionに渡す
    const formData = new FormData();
    formData.set("recipe", JSON.stringify(recipe));
    startTransition(() => {
      action(formData);
    });
  };
  return (
    <Card className="w-full shadow-xl bg-white/70 backdrop-blur-md">
      <CardContent className="p-6 flex flex-col gap-1">
        <form onSubmit={handleSubmit} className="">
          <h1 className="text-2xl font-semibold text-center text-orange-700" >料理メニュー入力</h1>
          <div className="flex flex-col items-center">
            <Input
              type="text"
              value={recipe}
              onChange={(e) => setrecipe(e.target.value)}
              placeholder="食材名を入力"
              className="bg-white md:w-[30%] text-center my-5"
              required
            />
            <Button
              type="submit"
              disabled={isPending}
              className="bg-orange-600 hover:bg-orange-700 text-white md:w-[30%] text-center"
            >
              {isPending ? "読み込み中..." : "レシピを作る"}
            </Button>
          </div>
        </form>
        <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200 text-orange-900">
          {result && (
            <div className="">
              <h2 className="text-xl font-semibold mb-4">
                {recipe || "該当食材"}のレシピ
              </h2>
              <div className="prose">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    a: ({ ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {props.children}
                      </a>
                    ),
                  }}
                >
                  {result}
                </Markdown>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}