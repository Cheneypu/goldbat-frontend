import boto3
import os
from dotenv import load_dotenv

# 載入 .env 設定
load_dotenv()
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION")
)

bucket = os.getenv("AWS_BUCKET_NAME")
folder = "."

for filename in os.listdir(folder):
    if filename.endswith(".mp3"):
        s3.upload_file(os.path.join(folder, filename), bucket, filename,
                       ExtraArgs={"ContentType": "audio/mpeg"})
        print(f"✅ 上傳成功：{filename}")