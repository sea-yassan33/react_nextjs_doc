'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Reservation } from "@/lib/reserve/reserveUtils";
import config from "@/config/propaties";
import sample_data from "@/public/data/sample_reserv_data.json";
import { format } from "date-fns";

export default function ReservList(){
  // 状態管理
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // フォームの状態管理
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reservDate, setReservDate] = useState("");
  const [inquiryDetail, setInquiryDetail] = useState("");
  const [loading, setLoading] = useState(false);
  // 登録リストデータ取得
  const fetchReservations = async () => {
    try {
      const res = await fetch(`${config.appointList}`);
      if (res.ok) {
        const data = await res.json();
        console.log("【Success】データ取得成功：", data);
        // 取得データを状態にセット
        setReservations(data.data);
      } else{
        console.error("【Error】データ取得失敗：", res.status);
        // サンプルデータを表示
        setReservations(sample_data);
      }
    } catch (e) {
      console.error("【Error】データ取得失敗：", e);
      // サンプルデータを表示
      setReservations(sample_data);
    }
  };
  // コンポーネントマウント時にデータ取得
  React.useEffect(() => {
    fetchReservations();
  }, []);
  // 予約登録処理
  const handleNewReservation = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${config.appointAdd}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          reserv_date: reservDate,
          inquiry_detail: inquiryDetail,
        }),
      });
      if (res.ok) {
        console.log("【Success】登録成功");
        // 登録後、リストを再取得
        await fetchReservations();
        router.refresh();
      } else if (res.status === 404) {
        router.push("/404");
      } else {
        router.push("/500");
      }
    } catch (e) {
      console.error("【Error】登録失敗：", e);
      router.push("/500");
    } finally {
      setLoading(false);
      setOpen(false);
      setName("");
      setEmail("");
      setReservDate("");
      setInquiryDetail("");
    }
  };
  return(
    <section className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">予約リスト</h1>
        <Button onClick={() => setOpen(true)}>新規登録</Button>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">氏名</th>
              <th className="p-2 text-left">メール</th>
              <th className="p-2 text-left">予約日時</th>
              <th className="p-2 text-left">問い合わせ内容</th>
            </tr>
          </thead>
          <tbody>
            {reservations.filter((r) => r.delet_flag === 0).map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.email}</td>
                <td className="p-2">{format(r.reserv_date, "yyyy/MM/dd hh:mm")}</td>
                <td className="p-2">{r.inquiry_detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 新規登録モーダル */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新規予約登録</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">氏名</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">メール</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="reserv_date">予約日時</Label>
              <Input
                id="reserv_date"
                type="datetime-local"
                value={reservDate}
                onChange={(e) => setReservDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="inquiry_detail">問い合わせ内容</Label>
              <Textarea
                id="inquiry_detail"
                value={inquiryDetail}
                onChange={(e) => setInquiryDetail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleNewReservation} disabled={loading}>
              {loading ? "登録中..." : "登録"}
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              キャンセル
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}