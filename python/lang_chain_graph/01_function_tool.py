from openai import OpenAI
import json
import os
from dotenv import load_dotenv
load_dotenv("../.env")
gemini_api=os.environ['GOOGLE_AI_ST_API']
gemini_base_url='https://generativelanguage.googleapis.com/v1beta/openai/'
client = OpenAI(api_key=gemini_api,base_url=gemini_base_url)
# 日本語 → 英語マッピング
JP_TO_EN = {
  "東京": "Tokyo",
  "大阪": "Osaka",
  "京都": "Kyoto",
}
# 天気情報を取得するダミー関数
def get_weather(prefecture, unit="celsius"):
  weather_info = {
    "Tokyo": {"location": "Tokyo", "weather": "晴れ", "temperature": "25", "unit": unit},
    "Osaka": {"location": "Osaka", "weather": "曇り", "temperature": "22", "unit": unit},
    "Kyoto": {"location": "Kyoto", "weather": "雨", "temperature": "18", "unit": unit},
    "NotFound": {"location": "NotFound", "weather": "unknown", "temperature": "unknown", "unit": unit},
  }
  en = JP_TO_EN.get(prefecture, prefecture)
  return weather_info.get(en, weather_info["NotFound"])
## ツール作成
function_tools = [
  {
    "type": "function",
    "function": {
      "name": "get_weather",
      "description": "特定の場所の現在の天気を取得する",
      "parameters": {
        "type": "object",
        "properties": {
          "prefecture": {
            "type": "string",
            "description": "県名。例：東京、北海道"
          },
          "unit": {
            "type": "string",
            "enum": ["celsius", "fahrenheit"],
            "description": "温度の単位"
          }
        },
        "required": ["prefecture"]
      }
    }
  }
]
# LLM 呼び出し（FunctionCall 生成）
messages = [
  {"role": "system", "content": "都市名が日本語の場合、英語表記にしてget_weatherを呼んでください"},
  {"role":"user","content":"東京の天気はどうですか？get_weatherのレスポンスを基にアドバイスをしてください。"}
]
response = client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=messages,
    tools=function_tools,
)
# toolの実行
res_message = response.choices[0].message
messages.append(res_message.to_dict())
available_func = {
  "get_weather": get_weather,
}
## 関数が複数あることを想定してループ
for tool_call in res_message.tool_calls:
  ## 関数を実行
  func_name = tool_call.function.name
  func_to_call = available_func[func_name]
  # AI から渡された引数(JSON)
  func_args = json.loads(tool_call.function.arguments)
  func_res = func_to_call(
    prefecture=func_args.get("prefecture"),
    unit=func_args.get("unit", "celsius")
  )
  ## 関数実行結果を会話履歴に追加
  ## Tool レスポンスは文字列で渡す必要あり
  messages.append({
    "role": "tool",
    "tool_call_id": tool_call.id,
    "name": func_name,
    "content": json.dumps(func_res)
  })
# 最終 LLM 応答生成
## 汎用 SYSTEM プロンプト
SYSTEM_JSON = """
あなたは JSON 出力専用のアシスタントです。
必ず JSON のみを出力し、日本語の説明文は一切書かないでください。

【出力ルール】
- JSON のトップレベルは必ずオブジェクト {}
- キーは必ずダブルクォート
- 値も必ずダブルクォート
- 余計な文章や説明は禁止
- 与えられた schema に従って JSON を生成

以下の schema に従って出力してください。
"""
schema = {
    "prefecture": "Wrefecture in string format",
    "wether": "Weather in string format",
    "temperature": "temperature in integer format",
    "coment": "advice in string fromat"
}
messages.append( {"role": "system", "content": SYSTEM_JSON + json.dumps(schema, ensure_ascii=False)})
final_res = client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=messages,
    response_format={"type": "json_object"} 
)
json_output = final_res.choices[0].message.content
# ▼ 4. JSON をファイルとして保存
with open("../out/weather_result.json", "w", encoding="utf-8") as f:
    f.write(json_output)
print(json_output)