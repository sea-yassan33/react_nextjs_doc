import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-6">お探しのページは見つかりませんでした。</p>
        <Link href="/reservation">
          <Button>予約リストへ戻る</Button>
        </Link>
      </div>
    </div>
  );
}