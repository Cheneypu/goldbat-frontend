from TTS.api import TTS

# 選擇 Coqui 官方支援的中文模型
model_name = "tts_models/zh-CN/baker/tacotron2-DDC-GST"

# 載入模型
tts = TTS(model_name=model_name).to("cpu")

# 中文語音合成
text = "你好，我是 AI 中文語音合成測試"
tts.tts_to_file(text=text, file_path="output.wav")

print("✅ 成功產生 output.wav")
