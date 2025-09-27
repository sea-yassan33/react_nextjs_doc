'use client';
import { useMemo, useState } from "react";
import {Search as SearchIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button"
import { ExerciseModal } from "@/components/excise-motion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import type { ExerciseRow,EventKey  } from "@/lib/exercise/interfaceUtils";
import sample_data from "@/public/data/sample_data.json";

// モーダル用データ
const exerciseDetails: { [id: number]: ExerciseRow } = sample_data.reduce(
  // idをキーにした連想配列に変換
  (acc: { [id: number]: ExerciseRow }, row: ExerciseRow) => {
    acc[row.id] = row;
    return acc;
  },
  {}
);
// タブの定義
const EVENT_TABS: { key: EventKey; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "walking", label: "ウォーキング" },
  { key: "running", label: "ランニング" },
  { key: "stretch", label: "ストレッチ" },
  { key: "circit", label: "サーキット系" },
  { key: "dance", label: "ダンス系" },
  { key: "yoga", label: "ヨガ" },
];
// テーブルに表示するデータ（必要に応じて拡張可能）
const ALL_EXERCISES: ExerciseRow[] = sample_data;
// 1ページあたりの行数
const PAGE_SIZE = 10;
// メインコンポーネント
export default function ExeciseApp() {
  // 状態管理
  const [selectedEvent, setSelectedEvent] = useState<EventKey>("all");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null);
  // フィルタリング
  const filtered = useMemo(() => {
    // 部位で絞り込み
    const byMuscle =
      selectedEvent === "all"
        ? ALL_EXERCISES
        : ALL_EXERCISES.filter((e) => e.eventKey === selectedEvent);
    // さらに検索文字列で絞り込み
    const bySearch = search.trim()
      ? byMuscle.filter((e) =>
          e.name.toLowerCase().includes(search.trim().toLowerCase())
        )
      : byMuscle;
    return bySearch;
  }, [selectedEvent, search]);
  // ページング
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paged = filtered.slice(start, end);
    // イベント選択時の処理
  const handleSelectEvent = (key: EventKey) => {
    setSelectedEvent(key);
    setPage(1);
  };
    // モーダル制御
  const openModal = (id: number) => {
    setSelectedExerciseId(id);
  };
  const closeModal = () => setSelectedExerciseId(null);
  return (
    <main className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">運動リスト(sample)</h2>
        {/* 検索 + アクション */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex w-full sm:w-auto items-center gap-2">
            <SearchIcon className="h-4 w-4" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-72"
            />
          </div>
        </div>
        {/* 部位絞り込み */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">【Select Part】</span>
          <div className="flex flex-wrap gap-2">
            {EVENT_TABS.map((tab) => (
              <Button
                key={tab.key}
                type="button"
                onClick={() => handleSelectEvent(tab.key)}
                variant={selectedEvent === tab.key ? "default" : "outline"}
                className="h-8 px-3"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* テーブル */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[35%]">運動名</TableHead>
              <TableHead className="w-[30%]">種目</TableHead>
              <TableHead className="w-[35%]">概要</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  該当する種目がありません
                </TableCell>
              </TableRow>
            ) : (
              paged.map((row) => (
                <TableRow key={`${row.eventKey}-${row.id}`}>
                  <TableCell className="align-top">
                    <button
                      type="button"
                      onClick={() => openModal(row.id)}
                      className="text-sky-600 hover:underline font-medium"
                    >
                      {row.name}
                    </button>
                  </TableCell>
                  <TableCell className="align-top">
                    <Badge variant="secondary" className="rounded-md">
                      {row.eventLabel}
                    </Badge>
                  </TableCell>
                  <TableCell className="align-top">
                    {row.overveiew ? (
                      <Badge variant="outline" className="rounded-md">
                        {row.overveiew}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {/* フッター: 件数とページネーション */}
        <div className="flex items-center justify-between px-4 py-3 border-t text-sm">
          <div className="text-muted-foreground">
            Showing {total === 0 ? 0 : start + 1}-{Math.min(end, total)} of {total}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {/* 簡易ページ番号（先頭/現在/末尾） */}
            <Button
              variant={currentPage === 1 ? "default" : "outline"}
              className="h-8 px-3"
              onClick={() => setPage(1)}
            >
              1
            </Button>
            {totalPages > 3 && currentPage > 3 && <span className="px-1">…</span>}
            {totalPages >= 2 && currentPage !== 1 && currentPage !== totalPages && (
              <Button variant="default" className="h-8 px-3" disabled>
                {currentPage}
              </Button>
            )}
            {totalPages > 3 && currentPage < totalPages - 2 && <span className="px-1">…</span>}
            {totalPages >= 2 && (
              <Button
                variant={currentPage === totalPages ? "default" : "outline"}
                className="h-8 px-3"
                onClick={() => setPage(totalPages)}
              >
                {totalPages}
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {/* モーダル表示（指定のコンポーネントを利用） */}
      <ExerciseModal
        exercise={ selectedExerciseId ? exerciseDetails[selectedExerciseId] : null }
        open={!!selectedExerciseId}
        onClose={closeModal}
      />
    </main>
  )
}