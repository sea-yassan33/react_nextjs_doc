# -*- encoding: utf-8 -*-
from fastapi import FastAPI, Depends, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import schemas
import handle_db
from datetime import datetime
# FastAPIインスタンス生成
app = FastAPI()
# CORS設定
origins = ["http://localhost:3000","http://127.0.0.1:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ルーティング
## home
@app.get(path="/")
async def FastAPI():
    return { "message" : "Hello Fast API" }
## 予約リスト取得
@app.get(path="/api/appoint_list")
async def get_list_user():
  result = handle_db.select_all_appoint_list()
  return {
    "status": "OK",
    "data": result
  }
## 予約登録
@app.post(path="/api/appoint_add", response_model=schemas.ReservResponse)
async def create_reservation(reservation: schemas.ReservCreate):
    try:
        new_reserv = handle_db.insert_appoint(reservation)
        print(new_reserv)
        if not new_reserv:
            raise HTTPException(status_code=400, detail="Failed to create reservation")
        return new_reserv
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
   