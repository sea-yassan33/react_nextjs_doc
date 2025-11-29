# LangChain・LangGraphについて

## 前提条件

- OpenAIライブラリを使用して実装しています。
- Geminiモデルを使用します。

## OpenAI 互換性

- Gemini モデルには、OpenAIライブラリと REST API を使用してアクセスできます。

### インストール
```sh
pip install openai
```

### gminiモデル呼び出し方法
```py
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()
gemini_api=os.environ['GOOGLE_AI_ST_API']
gemini_base_url='https://generativelanguage.googleapis.com/v1beta/openai/'
client = OpenAI(api_key=gemini_api,base_url=gemini_base_url)
## 1_gminiモデルを呼ぶ方法
response = client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {
            "role": "user",
            "content": "Pythonについて教えて下さい。"
        }
    ]
)
print(response.to_json(indent=2))
```