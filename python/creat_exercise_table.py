import os
import time
from tqdm import tqdm
import pandas as pd
import myfunc as mf
sample_col=['name','eventKey','eventLabel','exerciseTime','overveiew','youtubeID','videoUrl']
df = pd.read_excel('サンプルデータ.xlsx',sheet_name='sample', index_col=0)
df = df[sample_col]
# CREATE TABLE文生成
today = time.strftime("%y%m%d")
table_name = f"exercise_table"
create_table_sql, insert_sql_list = mf.create_table(df, table_name)
with open(f'./out/create_table.sql', 'w', encoding='utf8') as f:
  f.write(create_table_sql)
### INSERT文生成
# INSERT文をファイルに書き込む  
with open(f'./out/insert_{today}.sql', 'w', encoding='utf8') as f:
    for insert_sql in insert_sql_list:
        f.write(insert_sql + '\n')
# SQLモデルクラス生成
sql_file_path = f"./out/create_table.sql"
mf.create_model_from_sql(sql_file_path)