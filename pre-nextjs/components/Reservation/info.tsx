

export default function Info(){
  return(
    <section className="w-full pt-6 pb-12 bg-white">
      {/* お知らせバー */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <div className="flex items-center justify-between bg-[#FCEEEE] rounded-2xl px-6 py-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center bg-[#D72638] text-white rounded-full px-3 py-1 text-sm font-semibold">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" /></svg>
                大切なお知らせ
              </span>
              <span className="text-[#D72638] font-semibold text-base ml-4">
                2025年XX月XX日
              </span>
            </span>
            <span className="ml-6 text-[#D72638] font-medium text-base">
              サーバーメンテンナンスの為、予約システムが一時的に利用できません。
            </span>
          </div>
          <span className="text-[#D72638] font-bold text-2xl">&rarr;</span>
        </div>
      </div>
    </section>
  )
}