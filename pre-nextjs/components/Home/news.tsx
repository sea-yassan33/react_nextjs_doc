import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {Heart, Salad, Dumbbell } from "lucide-react";
import { documents } from "@/components/parts/document";
import TopickList from "@/components/TopickList";

const newsItems = [
  {
    icon: Heart,
    date: "2024.03.21",
    title: "心臓の健康を保つための新しい研究結果",
    description: "日常的な運動と食事管理が心臓病のリスクを大幅に低減することが判明",
    category: "健康"
  },
  {
    icon: Salad,
    date: "2024.03.20",
    title: "地中海式食事法の最新メリット",
    description: "長期研究により、認知機能の維持と寿命延長への効果が確認される",
    category: "栄養"
  },
  {
    icon: Dumbbell,
    date: "2024.03.19",
    title: "効果的な筋力トレーニングの新手法",
    description: "少ない時間で最大の効果を得られる最新のトレーニング方法を紹介",
    category: "運動"
  },
];

export default function NewsSection() {
  // updatedAtで新しい順に並び替え
  const docmentData = documents.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <section className="w-full bg-gray-50 py-20">
      {/* 健康情報一覧 */}
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            最新トピック情報
          </h2>
          <p className="text-lg text-gray-600">
            運動・栄養に関する最新のニュースをお届けします
          </p>
        </div>
        {/* News Cards */}
        <TopickList documents={docmentData} num={4}/>
      </div>
      <hr className="mt-3 mb-3"/>
      <div className="container mx-auto px-4 mt-3">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            最新データ
          </h2>
          <p className="text-lg text-gray-600">
            公共データの情報をお届けします
          </p>
        </div>
        {/* News Cards */}
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {newsItems.slice(0, 2).map((item, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
                    {item.category}
                  </span>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
                <div className="flex h-12 items-center gap-2">
                  <item.icon className="h-6 w-6 text-gray-900" />
                  <CardTitle className="line-clamp-2 text-lg">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}