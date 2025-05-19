from flask import Flask, request, send_file
from TTS.api import TTS

app = Flask(__name__)
tts = TTS(model_name="tts_models/zh-CN/baker/tacotron2-DDC-GST").to("cpu")


@app.route("/speak", methods=["POST"])
def speak():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return {"error": "請提供文字內容"}, 400

    output_path = "output.wav"
    tts.tts_to_file(text=text, file_path=output_path)
    return send_file(output_path, as_attachment=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
