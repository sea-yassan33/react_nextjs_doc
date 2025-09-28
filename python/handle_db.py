# -*- encoding: utf-8 -*-
import sys
import models
import databases
from datetime import datetime, timedelta
sys.dont_write_bytecode = True
## 予約リスト取得
def select_all_appoint_list():
  session = databases.create_new_session()
  list = session.query(models.Reserv_table).all()
  if list == None:
    list = []
  return list
## 予約登録
def insert_appoint(data):
  session = databases.create_new_session()
  new_reserv = models.Reserv_table(
      name=data.name,
      email=data.email,
      reserv_date=data.reserv_date,
      inquiry_detail=data.inquiry_detail,
  )
  session.add(new_reserv)
  session.commit()
  session.refresh(new_reserv)
  session.close()
  return new_reserv