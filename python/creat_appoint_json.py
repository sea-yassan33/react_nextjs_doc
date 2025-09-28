import sys
import models
import databases
from datetime import datetime
import pandas as pd
import json
import os
reserv_col=['id','name','email','reserv_date','inquiry_detail','delet_flag','create_at','updated_at']
session = databases.create_new_session()
list = session.query(models.Reserv_table).all()
## df作成
df = pd.DataFrame([vars(d) for d in list])
## モデルに定義したカラムだけ表示
df = df[reserv_col]
## 日付を文字列に変換
datastr = datetime.now().strftime('%Y%m%d')
#file_name_react ='../pre-react/assets/data/'
file_name_nextjs ='../pre-nextjs/public/data/'
## nullは""に置換
df = df.fillna("")
## json用のリストを作成
json_list=[]
for index, row in df.iterrows():
  json_list.append({
    "id": row["id"],
    "name": row["name"],
    "email": row["email"],
    "reserv_date": row["reserv_date"].strftime('%Y-%m-%d %H:%M:%S'),
    "inquiry_detail": row["inquiry_detail"],
    "delet_flag": row["delet_flag"],
    "created_at": row["create_at"].strftime('%Y-%m-%d %H:%M:%S'),
    "updated_at": row["updated_at"].strftime('%Y-%m-%d %H:%M:%S')
  })
## jsonファイルに書き換える(React)
## ディレクトリが存在しない場合は作成
## jsonファイルに書き出し
# if not os.path.exists(f'{file_name_react}'):
#   os.makedirs(f'{file_name_react}')
# with open(f'{file_name_react}/sample_data.json', 'w',encoding='utf-8') as f:
#     json.dump(json_list, f,ensure_ascii=False, indent=4)
## jsonファイルに書き換える(Next.js)
## ディレクトリが存在しない場合は作成
## jsonファイルに書き出し
if not os.path.exists(f'{file_name_nextjs}'):
  os.makedirs(f'{file_name_nextjs}')
with open(f'{file_name_nextjs}/sample_reserv_data.json', 'w',encoding='utf-8') as f:
    json.dump(json_list, f,ensure_ascii=False, indent=4)