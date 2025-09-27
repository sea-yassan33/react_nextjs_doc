import HeroSection from "@/components/Home/hero";
import NewsSection from "@/components/Home/news";
import AppsSection from "@/components/Home/apps";
import AboutSection from "@/components/Home/about";
import { AccessSection } from "@/components/Home/access";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AppsSection />
      <NewsSection />
      <AboutSection />
      <AccessSection />
    </div>
  );
}
