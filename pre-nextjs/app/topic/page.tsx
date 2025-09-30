import { documents } from "@/components/Topic/document";
import TopickList from "@/components/Topic/topickList";

export default function TopicPage() {

  return (
    <div className="md:p-20">
      <h1 className='text-[#2176AE] font-bold text-4xl md:text-5xl mb-6'>健康トピック(markdow形式)</h1>
      <TopickList documents={documents} num={30} id_flag={true} />
    </div>
  )
}