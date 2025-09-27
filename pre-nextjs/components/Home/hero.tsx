import Image from "next/image";
import { tv } from 'tailwind-variants';

export default function HeroSection() {
    const twStayles = tv({
    variants: {
      style:{
        main01:'relative w-full h-[600px] flex items-center bg-gradient-to-br from-[#0062A5] to-[#3083C9] overflow-hidden',
      },
    },
  });
  return (
    <section className={twStayles({style:'main01'})}>
        {/* 背景画像 */}
        <Image
          src="/img/home/hero.jpg"
          alt="総合医療センター"
          fill
          className="object-cover object-center opacity-80"
          priority
        />
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0062A5]/70 to-[#3083C9]/10" />
        {/* テキストコンテンツ */}
        <div className="relative z-10 max-w-3xl px-8">
          <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight drop-shadow-md mb-8">
            最新のテクノロジーを屈指し、<br />
            予防情報サービスを<br/>
            提供します。
          </h1>
          <div className="space-y-2">
            <div className="bg-white/90 rounded px-3 py-1 w-fit text-lg font-medium text-gray-900 shadow">
              私たちは
            </div>
            <div className="bg-white/90 rounded px-3 py-1 w-fit text-lg font-medium text-gray-900 shadow">
              予防を大切にし、
            </div>
            <div className="bg-white/90 rounded px-3 py-1 w-fit text-lg font-medium text-gray-900 shadow">
              総合予防センターとして
            </div>
            <div className="bg-white/90 rounded px-3 py-1 w-fit text-lg font-medium text-gray-900 shadow">
              新たな一歩を踏み出しました。
            </div>
            <div className="bg-white/90 rounded px-3 py-1 w-fit text-lg font-medium text-gray-900 shadow">
              （Next.js開発環境でのサンプルページ）
            </div>
          </div>
        </div>
      </section>
  );
}