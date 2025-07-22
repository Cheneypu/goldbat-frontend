import os
from dotenv import load_dotenv
import boto3
from google.cloud import texttospeech
from tempfile import NamedTemporaryFile

# 載入 .env
load_dotenv()

# Google 與 AWS 設定
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

tts_client = texttospeech.TextToSpeechClient()
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION")
)
bucket = os.getenv("AWS_BUCKET_NAME")

# 固定語音參數
voice = texttospeech.VoiceSelectionParams(
    language_code=os.getenv("GOOGLE_TTS_LANGUAGE_CODE", "cmn-TW"),
    name=os.getenv("GOOGLE_TTS_VOICE_NAME", "cmn-TW-Wavenet-A")
)
audio_config = texttospeech.AudioConfig(
    audio_encoding=texttospeech.AudioEncoding.MP3,
    speaking_rate=float(os.getenv("GOOGLE_TTS_SPEAKING_RATE", "1.0")),
    pitch=float(os.getenv("GOOGLE_TTS_PITCH", "0.0"))
)

texts = {
    "goldbat-intro-new.mp3": "哈囉Everyone，我是小蝠，屬於金黃鼠耳蝠家族的一員，你也可以稱我們為「黃金蝙蝠」！，我平常都待在校門口的大葉欖仁樹上，白天喜歡倒掛著睡覺，晚上才會出來活動喔，先介紹一下我的外型特色，我的毛是金黃色的，還帶著黑色條紋，就像穿了超酷的披風一樣，超級有型，雖然我叫「鼠耳蝠」，但我可不是老鼠喔，我是一隻會飛的蝙蝠，而且是幫助你們人類消滅蚊子的「夜間守護者」，下次你經過校門口那棵大葉欖仁樹時，可以抬頭看看，說不定你會看到我正在偷看你喔。",
    "goldbat-habitat-new.mp3": "我們金黃鼠耳蝠在春天到秋天時，會住在雲嘉南的平原地區，因為這裡氣候溫暖、昆蟲又多，是覓食和棲息的好地方，但這些年來，這裡慢慢改變了，晚上的燈光變亮，讓我們飛不穩、也睡不好，再加上農藥的噴灑，讓我們愛吃的蟲蟲變少，甚至吃了還會讓我們生病、不舒服，另外，可以躲的大樹，竟也一棵棵的被砍伐消失了，因此 我們開始在各地尋找新的棲息地，有一年，我們飛到了台南大社國小，發現這裡的大葉欖仁樹又高又密，白天好睡覺，晚上光害也不嚴重，學校旁還有農田和水圳，蚊子多、蟲蟲也多，讓我們吃得又飽，又住的開心，而我們通常在這裡住到秋天，等到天氣轉涼後，就會飛到中部的高山地區過冬，找個洞穴或安靜的地方冬眠，等明年春天再回來，所以，每年四月到十月，你們都能在大社國小的大葉欖仁樹上，看到我們倒掛的身影呦。",
    "goldbat-role-new.mp3": "晚上了，你們都躺在被窩裡睡覺，那你知道我們在做甚麼嗎？，我每天晚上都在抓昆蟲！，像蚊子、飛蛾、小甲蟲等，通通是我的菜，一晚可以吃掉幾百隻，是不是很厲害啊！，大家都叫我「夜間捕蟲高手」，同時，我也是名副其實的「農田守護者」。，有我們在，農民可以少噴一點農藥，對環境也比較健康，不過我們也不是沒有敵人喔，像貓頭鷹、蛇，還有一些大鳥，總是趁著我們不注意時出現，所以我們都會選一處安靜且有遮蔽的地方休息，像學校的大樹或屋簷，這樣也比較安全，別因為我們嬌小的外型就小看我們喔，我們的存在對整個生態系統其實是很重要的，只要我們活得好，整個自然環境也會跟著更好呢！。",
    "goldbat-closing-new.mp3": "說了這麼多，其實我們黃金蝙蝠一直都很低調，白天只想找個安全的地方休息，晚上再出來吃點蟲子止飢，但現在的環境，對我們來說卻越來越不容易了，很多地方的大樹被砍了，老房子被拆了，我們能躲的地方變少，到了晚上，天空也還亮亮的，使得我們飛行時容易因此迷路，也不敢靠近光源太強的地方，而且，還常有人對我們有所誤解，以為我們會吸血，或者覺得看到蝙蝠很不吉利，一看到我們，就想趕我們走，甚至抓捕我們，其實我們一點都不危險，我們幫忙吃害蟲，保護農作物，只要給我們一點空間，我們會默默地做很多事，對人類很有幫助的，希望透過更多的宣導教育，讓更多人知道，我們黃金蝙蝠不是壞東西，而是值得被保護的夥伴，讓我們能夠更安心地繼續住在你們身邊，最後，期待我們的友誼日久天長，下次要再來看看我們喔。"
}

for filename, text in texts.items():
    synthesis_input = texttospeech.SynthesisInput(text=text)
    response = tts_client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config
    )
    with NamedTemporaryFile(delete=False, suffix=".mp3") as out:
        out.write(response.audio_content)
        temp_path = out.name

    s3.upload_file(temp_path, bucket, filename, ExtraArgs={"ContentType": "audio/mpeg"})
    print(f"✅ 上傳完成：{filename}")