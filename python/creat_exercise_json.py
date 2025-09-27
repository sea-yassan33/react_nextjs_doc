import sys
import models
import databases
from datetime import datetime
import pandas as pd
import json
import os
sample_col=['id','name','eventKey','eventLabel','exerciseTime','overveiew','youtubeID',"created_at","updated_at"]
session = databases.create_new_session()
list = session.query(models.Exercise_table).all()
## df作成
df = pd.DataFrame([vars(d) for d in list])
## モデルに定義したカラムだけ表示
df = df[sample_col]
## 日付を文字列に変換
datastr = datetime.now().strftime('%Y%m%d')
file_name ='../pre-react/assets/data/'
## nullは""に置換
df = df.fillna("")
## json用のリストを作成
json_list=[]
for index, row in df.iterrows():
  youtube_url = 'https://www.youtube.com/embed/'+row["youtubeID"]
  json_list.append({
    "id": row["id"],
    "name": row["name"],
    "eventKey": row["eventKey"],
    "eventLabel": row["eventLabel"],
    "exerciseTime": row["exerciseTime"],
    "overveiew": row["overveiew"],
    "videoUrl": youtube_url,
    "created_at": row["created_at"].strftime('%Y-%m-%d %H:%M:%S'),
    "updated_at": row["updated_at"].strftime('%Y-%m-%d %H:%M:%S')
  })
## jsonファイルに書き換える
## ディレクトリが存在しない場合は作成
if not os.path.exists(f'{file_name}'):
  os.makedirs(f'{file_name}')
## jsonファイルに書き出し
with open(f'{file_name}/sample_data.json', 'w',encoding='utf-8') as f:
    json.dump(json_list, f,ensure_ascii=False, indent=4)