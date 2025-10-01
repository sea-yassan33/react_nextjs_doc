# FastAPIの使い方

- https://fastapi.tiangolo.com/ja/

- https://qiita.com/kim-grs/items/3debef3841c78f03c8c0

# FastAPIとは
- FastAPIは、Pythonで書かれたWebフレームワークであり、APIの開発を迅速かつ簡単に行うことができる
- 高速なパフォーマンスを提供し、非同期プログラミングをサポートしている

# FastAPIのインストール

```sh
pip install fastapi

pip install "uvicorn[standard]"
```

- FastAPIのサンプルコード

```python
from fastapi import FastAPI
# FastAPIのインスタンス
app = FastAPI()
# FastAPIのルーティング1
@app.get("/")
def read_root():
    return {"Hello": "World"}
# FastAPIのルーティング2
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

## FastAPIの起動

```sh 
uvicorn main:app --reload

## アクセス
http://127.0.0.1:8000/items/5?q=somequery
```

## 自動対話型の API ドキュメント
```sh
http://127.0.0.1:8000/docs
```

## 代替の API ドキュメント
```sh
http://127.0.0.1:8000/redoc
```