import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Brain, Dumbbell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const apps = [
  {
    icon: Activity,
    title: "運動情報",
    description: "様々な運動の情報を提供します",
    link: "#",
    image: "/img/home/img02.jpg",
  },
  {
    icon: Dumbbell,
    title: "栄養情報",
    description: "バランスの取れた食事プランを提案します。",
    link: "#",
    image: "/img/home/img01.jpg",
  },
  {
    icon: Brain,
    title: "AI支援ツール",
    description: "AIを活用したヘルスケアプログラムを提供しています。",
    link: "#",
    image: "/img/home/img03.jpg",
  },
];

export default function AppsSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            サービス
          </h2>
          <p className="text-lg text-gray-600">
            あなたの健康をサポートする便利な機能
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {apps.map((app, index) => (
            <Card key={index} className="group overflow-hidden">
              <Link href={app.link}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={app.image}
                    alt={app.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <app.icon className="absolute bottom-4 left-4 h-8 w-8 text-white" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{app.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {app.description}
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}