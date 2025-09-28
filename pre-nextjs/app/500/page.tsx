import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServerError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-5xl font-bold text-purple-600 mb-4">500</h1>
        <p className="text-lg text-gray-700 mb-6">サーバーエラーが発生しました。<br/>しばらくしてから再度お試しください。</p>
        <Link href="/reservation">
          <Button>予約リストへ戻る</Button>
        </Link>
      </div>
    </div>
  );
}