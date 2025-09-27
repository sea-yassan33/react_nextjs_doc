import warnings
warnings.filterwarnings("ignore")
import random
import re
from faker import Faker
from datetime import datetime, timedelta
import pandas as pd
import json
import pykakasi
fake = Faker('ja_JP')
# MySQL用データ型マッピング
def map_mysql_dtype(col, dtype):
  if col == 'id':
    return "`id` INT AUTO_INCREMENT PRIMARY KEY"
  elif pd.api.types.is_integer_dtype(dtype):
    return f"`{col}` INT"
  elif pd.api.types.is_float_dtype(dtype):
    return f"`{col}` DOUBLE"
  elif pd.api.types.is_datetime64_any_dtype(dtype):
    return f"`{col}` DATETIME"
  else:
    return f"`{col}` VARCHAR(255)"
# Creat table SQL文を生成する関数
def create_table(df, table_name):
  columns = [map_mysql_dtype(col, dtype) for col, dtype in zip(df.columns, df.dtypes)]
  create_table_sql = f"CREATE TABLE `{table_name}` (\n  `id` INT AUTO_INCREMENT PRIMARY KEY" + ",\n  " +",\n  ".join(columns) + ",\n  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
  # INSERT INTO文生成（idは自動採番なので除外）
  insert_sql_list = []
  cols_without_id = [col for col in df.columns if col != 'id']
  for _, row in df.iterrows():
    values = []
    for col in cols_without_id:
      x = row[col]
      if isinstance(x, str):
        values.append(f"'{x}'")
      elif pd.isna(x):
        values.append("NULL")
      elif isinstance(x, pd.Timestamp):
        values.append(f"'{x.strftime('%Y-%m-%d %H:%M:%S')}'")
      else:
        values.append(str(x))
    insert_sql = f"INSERT INTO `{table_name}` ({', '.join(cols_without_id)}) VALUES ({', '.join(values)});"
    insert_sql_list.append(insert_sql)
  return create_table_sql, insert_sql_list
# 性別の選択肢
genders = ['Men', 'Female']
# マッピング: SQL型 → SQLAlchemy型
type_map = {
  "CHAR": "CHAR",
  "VARCHAR": "VARCHAR",
  "DATETIME": "DATETIME",
  "INT": "Integer",
  "TEXT": "String",
  "DATE": "Date",
  "TIMESTAMP": "DATETIME",
}
## 漢字を平仮名に変換
def convert_to_hiragana(text):
    kakasi = pykakasi.kakasi()
    kakasi.setMode('J', 'H')  # 漢字を平仮名に変換
    kakasi.setMode('K', 'H')  # カタカナを平仮名に変換
    converter = kakasi.getConverter()
    return converter.do(text)
# ダミーデータ生成関数
def generate_dummy_data(num_records=10):
  data = []
  num_int = 0
  for _ in range(num_records):
    num_int += 1
    # 名前を生成
    name = fake.name()
    # 平仮名に変換
    kana_name = convert_to_hiragana(name)
    created_at = fake.date_time_this_decade()
    updated_at = fake.date_time_between_dates(datetime_start=created_at, datetime_end=datetime.now())
    record = {
      "id": num_int,
      "name": name,
      "kana": kana_name,
      "age": random.randint(5, 99),
      "duration": random.randint(1, 5),
      "gender": random.choice(genders) if random.random() > 0.2 else None,
      "phone_number": fake.phone_number() if random.random() > 0.2 else None,
      "email": fake.email() if random.random() > 0.2 else None,
      "first_visit_date": None,
      "last_visit_date": None,
      "profession_ids": "",
      "memo": fake.text(max_nb_chars=100) if random.random() > 0.2 else None,
      "created_at": created_at.isoformat(),
      "updated_at": updated_at.isoformat()
    }
    data.append(record)
    #with open('dummy_data.json', 'w', encoding='utf-8') as f:
    #  json.dump(data, f, ensure_ascii=False, indent=2)
    ## データフレーム作成
    df = pd.DataFrame(data)
    ## 型変換
    df = df.astype({
      "id": "int64",
      "name": "string",
      "kana": "string",
      "age": "int64",
      "duration": "int64",
      "gender": "string",
      "phone_number": "string",
      "email": "string",
      "first_visit_date": "datetime64[ns]",
      "last_visit_date": "datetime64[ns]",
      "profession_ids": "string",
      "memo": "string",
      "created_at": "datetime64[ns]",
      "updated_at": "datetime64[ns]"
    })
  return df
# MySQL用データ型マッピング
def map_mysql_dtype(col, dtype):
  if col == 'id':
    return "`id` INT AUTO_INCREMENT PRIMARY KEY"
  elif pd.api.types.is_integer_dtype(dtype):
    return f"`{col}` INT"
  elif pd.api.types.is_float_dtype(dtype):
    return f"`{col}` DOUBLE"
  elif pd.api.types.is_datetime64_any_dtype(dtype):
    return f"`{col}` DATETIME"
  else:
    return f"`{col}` VARCHAR(255)"
# Creat table SQL文を生成する関数
def create_table(df, table_name):
  columns = [map_mysql_dtype(col, dtype) for col, dtype in zip(df.columns, df.dtypes)]
  create_table_sql = f"CREATE TABLE `{table_name}` (\n  " + ",\n  ".join(columns) + "\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
  # INSERT INTO文生成（idは自動採番なので除外）
  insert_sql_list = []
  cols_without_id = [col for col in df.columns if col != 'id']
  for _, row in df.iterrows():
    values = []
    for col in cols_without_id:
      x = row[col]
      if isinstance(x, str):
        values.append(f"'{x}'")
      elif pd.isna(x):
        values.append("NULL")
      elif isinstance(x, pd.Timestamp):
        values.append(f"'{x.strftime('%Y-%m-%d %H:%M:%S')}'")
      else:
        values.append(str(x))
    insert_sql = f"INSERT INTO `{table_name}` ({', '.join(cols_without_id)}) VALUES ({', '.join(values)});"
    insert_sql_list.append(insert_sql)
  return create_table_sql, insert_sql_list
# カラム定義を解析する関数
def parse_column(line):
  # 列定義を正規表現で分解
  match = re.match(r'\s*`?(\w+)`?\s+([A-Z]+)(?:\((\d+)\))?.*', line, re.IGNORECASE)
  if not match:
    return None
  name, t, length = match.groups()
  t = t.upper()
  if t in type_map:
    if length:
      col_type = f"{type_map[t]}({length})"
    else:
      col_type = type_map[t]
  else:
    col_type = t
  is_pk = 'PRIMARY KEY' in line.upper()
  return name, col_type, is_pk
# SQLAlchemyモデルクラスを生成する関数
def convert_to_model(table_name, columns):
  lines = []
  lines.append("# -*- encoding: utf-8 -*-")
  lines.append("import datetime")
  lines.append("import uuid")
  lines.append("import sys")
  lines.append("from sqlalchemy import (Column, String,Integer, Text, ForeignKey,CHAR, VARCHAR, INT, create_engine, MetaData, DECIMAL, DATETIME, exc, event, Index, and_)")
  lines.append("from sqlalchemy.ext.declarative import declarative_base")
  lines.append("sys.dont_write_bytecode = True")
  lines.append("## SQLAlchemyのベースクラスを定義  ")
  lines.append("Base = declarative_base()")
  lines.append(f"## {table_name.capitalize()}モデルクラスの定義")
  lines.append(f"class {table_name.capitalize()}(Base):")
  lines.append(f"  __tablename__ = '{table_name}'")
  for name, col_type, is_pk in columns:
    pk = ", primary_key=True" if is_pk else ""
    lines.append(f"  {name} = Column({col_type}{pk})")
  # __init__メソッドの自動生成（idと日付系を自動セット）
  lines.append("  def __init__(self):")
  lines.append("    self.id = str(uuid.uuid4())")
  lines.append('    now_data_time = str(datetime.datetime.now().strftime("%Y%m%d%H%M%S"))')
  lines.append("    self.create_at =  now_data_time")
  lines.append("    self.update_at =  now_data_time")
  return "\n".join(lines)
def create_model_from_sql(sql_file):
  with open(sql_file, encoding="utf-8") as f:
    sql = f.read()
  sql = sql.replace(" ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", "").replace("ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;", "")
  table_match = re.search(r'CREATE TABLE\s+`?(\w+)`?\s*\((.*?)\);', sql, re.DOTALL | re.IGNORECASE)
  if table_match:
    table_name = table_match.group(1)
    column_lines = table_match.group(2).splitlines()
    columns = []
    for line in column_lines:
      col = parse_column(line)
      if col:
        columns.append(col)
    #print(convert_to_model(table_name, columns))
    # ファイルに書き出し
    with open(f"./out/{table_name}.py", "w", encoding="utf-8") as f:
      f.write(convert_to_model(table_name, columns))
  else:
    print("テーブル定義のパースに失敗しました。")
    exit(1)