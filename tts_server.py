from flask import Flask, request, jsonify
from flask_cors import CORS
import os, requests, tempfile
import boto3
from dotenv import load_dotenv

# 載入 .env 環境變數
load_dotenv()

# 讀取 Azure 設定
AZURE_TTS_KEY = os.getenv("AZURE_TTS_KEY")
AZURE_REGION = os.getenv("AZURE_REGION")

# 防呆：檢查是否正確載入
if not AZURE_TTS_KEY or not AZURE_REGION:
    raise ValueError("❌ 缺少 AZURE_TTS_KEY 或 AZURE_REGION，請確認 .env 設定")

AZURE_ENDPOINT = f"https://{AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1"

# 讀取 AWS 設定
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")
AWS_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")

if not AWS_ACCESS_KEY_ID or not AWS_SECRET_ACCESS_KEY or not AWS_REGION or not AWS_BUCKET_NAME:
    raise ValueError("❌ 缺少 AWS S3 設定，請確認 .env 檔案是否包含完整 AWS 權限資訊")

# 初始化 Flask 與 S3
app = Flask(__name__)
CORS(app)

s3 = boto3.client(
    "s3",
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

@app.route("/api/tts", methods=["POST"])
def azure_tts():
    data = request.get_json()
    text = data.get("text", "").strip()
    filename = data.get("filename", "output.mp3")
    voice = data.get("voice", "zh-CN-XiaoruiNeural")
    style = data.get("style", "chat")
    rate = data.get("rate", "+10%")
    pitch = data.get("pitch", "+20%")

    if not text:
        return jsonify({"error": "❌ 未提供文字"}), 400

    # 準備 SSML 語音內容
    ssml = f"""
    <speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis'
           xmlns:mstts='http://www.w3.org/2001/mstts' xml:lang='zh-CN'>
      <voice name='{voice}'>
        <mstts:express-as style='{style}'>
          <prosody rate='{rate}' pitch='{pitch}'>
            {text}
          </prosody>
        </mstts:express-as>
      </voice>
    </speak>
    """

    headers = {
        "Ocp-Apim-Subscription-Key": AZURE_TTS_KEY,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3"
    }

    try:
        response = requests.post(AZURE_ENDPOINT, headers=headers, data=ssml.encode("utf-8"))
    except Exception as e:
        return jsonify({"error": "❌ Azure 連線失敗", "details": str(e)}), 500

    if response.status_code == 200:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmpfile:
            tmpfile.write(response.content)
            tmp_path = tmpfile.name

        try:
            s3.upload_file(
                tmp_path, AWS_BUCKET_NAME, filename,
                ExtraArgs={"ContentType": "audio/mpeg", "ACL": "public-read"}
            )
            os.remove(tmp_path)
            s3_url = f"https://{AWS_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{filename}"
            return jsonify({"status": "ok", "url": s3_url})
        except Exception as e:
            return jsonify({"error": "❌ S3 上傳失敗", "details": str(e)}), 500
    else:
        return jsonify({"error": "❌ Azure TTS 產生失敗", "details": response.text}), 500

if __name__ == "__main__":
    print(f"✅ Flask 語音服務啟動中…")
    print(f"🌐 AZURE_REGION: {AZURE_REGION}")
    print(f"☁️  AWS_BUCKET_NAME: {AWS_BUCKET_NAME}")
    app.run(debug=True)
