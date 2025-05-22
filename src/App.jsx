import { useState, useEffect, useRef } from "react";
import "./App.css";
import FAQ from "./FAQ.json"; 

const guideProjects = {
  "黃金鼠尾蝠是誰": {
    audioUrl: "https://my-tts-audio.s3.ap-northeast-1.amazonaws.com/goldbat-full-v3.mp3",
    subtitles: [
      { start: 0.0, end: 2.333, text: "哈囉Everyone，我是小蝠" },
      { start: 2.4, end: 4.7, text: "屬於金黃鼠耳蝠家族的一員" },
      { start: 4.8, end: 7.2, text: "你也可以稱我們為「黃金蝙蝠」！" },
      { start: 7.9, end: 10.966, text: "我平常都待在校門口的大葉欖仁樹上" },
      { start: 11.6, end: 13.566, text: "白天喜歡倒掛著睡覺" },
      { start: 13.566, end: 15.466, text: "晚上才會出來活動喔" },
      { start: 16.1, end: 18.3, text: "先介紹一下我的外型特色" },
      { start: 18.3, end: 19.933, text: "我的毛是金黃色的" },
      { start: 19.966, end: 21.466, text: "還帶著黑色條紋" },
      { start: 21.5, end: 24.766, text: "就像穿了超酷的披風一樣，超級有型" },
      { start: 25.5, end: 27.26, text: "雖然我叫「鼠耳蝠」" },
      { start: 27.300, end: 28.933, text: "但我可不是老鼠喔" },
      { start: 28.966, end: 30.700, text: "我是一隻會飛的蝙蝠" },
      { start: 30.766, end: 34.2, text: "而且是幫助你們人類消滅蚊子的「夜間守護者」" },
      { start: 35.0, end: 38.133, text: "下次你經過校門口那棵大葉欖仁樹時" },
      { start: 38.233, end: 39.266, text: "可以抬頭看看" },
      { start: 39.266, end: 42.200, text: "說不定你會看到我正在偷看你喔" }
    ]
  },
  "在大社國小的家": {
    audioUrl: "https://my-tts-audio.s3.ap-northeast-1.amazonaws.com/goldbat-habitat-final.mp3",
    subtitles: [
      { start: 0.166, end: 2.933, text: "我們金黃鼠耳蝠在春天到秋天時" },
      { start: 3.033, end: 5.133, text: "會住在雲嘉南的平原地區" },
      { start: 5.766, end: 8.533, text: "因為這裡氣候溫暖、昆蟲又多" },
      { start: 8.633, end: 10.7, text: "是覓食和棲息的好地方" },
      { start: 11.4, end: 14.166, text: "但這些年來，這裡慢慢改變了" },
      { start: 14.766, end: 16.333, text: "晚上的燈光變亮" },
      { start: 16.366, end: 18.566, text: "讓我們飛不穩、也睡不好" },
      { start: 19.2, end: 20.866, text: "再加上農藥的噴灑" },
      { start: 20.966, end: 22.933, text: "讓我們愛吃的蟲蟲變少" },
      { start: 23.0, end: 26.066, text: "甚至吃了還會讓我們生病、不舒服" },
      { start: 26.766, end: 28.7, text: "另外，可以躲的大樹" },
      { start: 28.766, end: 30.966, text: "竟也一棵棵的被砍伐消失了" },
      { start: 31.533, end: 35.066, text: "因此 我們開始在各地尋找新的棲息地" },
      { start: 35.7, end: 36.566, text: "有一年" },
      { start: 36.6, end: 38.7, text: "我們飛到了台南大社國小" },
      { start: 39.166, end: 41.466, text: "發現這裡的大葉欖仁樹又高又密" },
      { start: 41.466, end: 44.2, text: "白天好睡覺，晚上光害也不嚴重" },
      { start: 44.2, end: 47.366, text: "學校旁還有農田和水圳" },
      { start: 47.433, end: 49.333, text: "蚊子多、蟲蟲也多" },
      { start: 49.4, end: 51.966, text: "讓我們吃得又飽，又住的開心" },
      { start: 52.566, end: 55.033, text: "而我們通常在這裡住到秋天" },
      { start: 55.633, end: 57.3, text: "等到天氣轉涼後" },
      { start: 57.3, end: 59.733, text: "就會飛到中部的高山地區過冬" },
      { start: 59.8, end: 62.166, text: "找個洞穴或安靜的地方冬眠" },
      { start: 62.2, end: 63.933, text: "等明年春天再回來" },
      { start: 64.7, end: 66.533, text: "所以，每年四月到十月" },
      { start: 66.6, end: 69.433, text: "你們都能在大社國小的大葉欖仁樹上" },
      { start: 69.466, end: 71.333, text: "看到我們倒掛的身影呦" }
    ]
  },
  "蝙蝠的生態角色": {
    audioUrl: "https://my-tts-audio.s3.ap-northeast-1.amazonaws.com/goldbat-role-final.mp3",
    subtitles: [
  { start: 0.166, end: 3.0, text: "晚上了，你們都躺在被窩裡睡覺" },
  { start: 3.1, end: 4.933, text: "那你知道我們在做甚麼嗎？" },
  { start: 5.7, end: 8.533, text: "我每天晚上都在抓昆蟲！" },
  { start: 8.633, end: 11.4, text: "像蚊子、飛蛾、小甲蟲等" },
  { start: 11.466, end: 12.8, text: "通通是我的菜" },
  { start: 13.466, end: 15.4, text: "一晚可以吃掉幾百隻" },
  { start: 15.466, end: 16.966, text: "是不是很厲害啊！" },
  { start: 17.566, end: 19.966, text: "大家都叫我「夜間捕蟲高手」" },
  { start: 20.1, end: 23.166, text: "同時，我也是名副其實的「農田守護者」。" },
  { start: 23.866, end: 26.5, text: "有我們在，農民可以少噴一點農藥" },
  { start: 26.5, end: 28.5, text: "對環境也比較健康" },
  { start: 29.166, end: 31.733, text: "不過我們也不是沒有敵人喔" },
  { start: 32.366, end: 35.266, text: "像貓頭鷹、蛇，還有一些大鳥" },
  { start: 35.3, end: 37.566, text: "總是趁著我們不注意時出現" },
  { start: 38.366, end: 42.0, text: "所以我們都會選一處安靜且有遮蔽的地方休息" },
  { start: 42.066, end: 43.933, text: "像學校的大樹或屋簷" },
  { start: 44.0, end: 45.4, text: "這樣也比較安全" },
  { start: 46.166, end: 49.066, text: "別因為我們嬌小的外型就小看我們喔" },
  { start: 49.066, end: 52.5, text: "我們的存在對整個生態系統其實是很重要的" },
  { start: 52.5, end: 53.933, text: "只要我們活得好" },
  { start: 53.966, end: 56.5, text: "整個自然環境也會跟著更好呢！" }
]

  },
  "危機與保育": {
    audioUrl: "https://my-tts-audio.s3.ap-northeast-1.amazonaws.com/goldbat-closing-final.mp3",
    subtitles: [
  { start: 0.233, end: 1.333, text: "說了這麼多" },
  { start: 1.4, end: 4.0, text: "其實我們黃金蝙蝠一直都很低調" },
  { start: 4.033, end: 6.566, text: "白天只想找個安全的地方休息" },
  { start: 6.633, end: 8.933, text: "晚上再出來吃點蟲子止飢" },
  { start: 9.566, end: 10.933, text: "但現在的環境" },
  { start: 10.933, end: 13.3, text: "對我們來說卻越來越不容易了" },
  { start: 13.966, end: 15.9, text: "很多地方的大樹被砍了" },
  { start: 15.966, end: 17.3, text: "老房子被拆了" },
  { start: 17.333, end: 18.966, text: "我們能躲的地方變少" },
  { start: 19.633, end: 22.2, text: "到了晚上，天空也還亮亮的" },
  { start: 22.266, end: 24.733, text: "使得我們飛行時容易因此迷路" },
  { start: 24.733, end: 27.0, text: "也不敢靠近光源太強的地方" },
  { start: 27.666, end: 30.6, text: "而且，還常有人對我們有所誤解" },
  { start: 30.666, end: 32.1, text: "以為我們會吸血" },
  { start: 32.166, end: 34.466, text: "或者覺得看到蝙蝠很不吉利" },
  { start: 35.066, end: 37.5, text: "一看到我們，就想趕我們走" },
  { start: 37.566, end: 38.9, text: "甚至抓捕我們" },
  { start: 39.533, end: 41.5, text: "其實我們一點都不危險" },
  { start: 42.066, end: 44.933, text: "我們幫忙吃害蟲，保護農作物" },
  { start: 45.533, end: 47.2, text: "只要給我們一點空間" },
  { start: 47.233, end: 49.166, text: "我們會默默地做很多事" },
  { start: 49.2, end: 50.9, text: "對人類很有幫助的" },
  { start: 51.6, end: 53.8, text: "希望透過更多的宣導教育" },
  { start: 53.866, end: 55.2, text: "讓更多人知道" },
  { start: 55.2, end: 57.166, text: "我們黃金蝙蝠不是壞東西" },
  { start: 57.433, end: 59.333, text: "而是值得被保護的夥伴" },
  { start: 59.4, end: 62.333, text: "讓我們能夠更安心地繼續住在你們身邊" },
  { start: 63.2, end: 66.133, text: "最後，期待我們的友誼日久天長" },
  { start: 66.833, end: 68.933, text: "下次要再來看看我們喔" }
]

  }
};
function App() {
  const [showReady, setShowReady] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const audioIntroRef = useRef(null);

  // 嘴型動畫狀態
  const [batMouthOpen, setBatMouthOpen] = useState(false);
  const mouthTimeoutRef = useRef();

  // FAQ/問答彈窗
  const [showFAQ, setShowFAQ] = useState(false);
  const [faqInput, setFaqInput] = useState("");
  const [faqText, setFaqText] = useState(""); // FAQ字幕專用

  // 響應式 intro 影片偵測
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const introVideo = isPortrait
    ? "/media/蝙蝠直的.mp4"
    : "/media/蝙蝠橫的.mp4";
  const introAudio = "/media/環境音.mp3";
  const introBg = "/media/背景.png";

  // --------- 語音導覽狀態 ---------
  const [currentProject, setCurrentProject] = useState(null);
  const [currentText, setCurrentText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const audioRef = useRef(null);
  const rafRef = useRef(null);

  const projectKeys = Object.keys(guideProjects);
  const firstProjectKey = projectKeys[0];

  // 嘴型動畫控制
  useEffect(() => {
    clearTimeout(mouthTimeoutRef.current);
    // FAQ或主導覽有字幕時才動嘴
    if (!currentText && !faqText) {
      setBatMouthOpen(false);
      return;
    }
    if ((isPlaying && currentText) || faqText) {
      function animateMouth() {
        setBatMouthOpen(v => !v);
        const randomDelay = Math.floor(Math.random() * 170) + 180;
        mouthTimeoutRef.current = setTimeout(animateMouth, randomDelay);
      }
      animateMouth();
      return () => clearTimeout(mouthTimeoutRef.current);
    }
    return () => clearTimeout(mouthTimeoutRef.current);
  }, [isPlaying, currentText, faqText]);

  // 語音導覽「開始」按鈕
  const handleStartGuide = () => {
    setFaqText(""); // FAQ 字幕清空
    setCurrentProject(firstProjectKey);
    setIsPlaying(true);
    setCurrentText("");
    if (audioIntroRef.current) {
      audioIntroRef.current.pause();
      audioIntroRef.current.currentTime = 0;
    }
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play();
    }, 100);
  };

  // 切換段落
  const playProject = (key) => {
    setFaqText(""); // FAQ 字幕清空
    setIsPlaying(true);
    setCurrentProject(key);
    setCurrentText("");
    setIsDropdownOpen(false);
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play();
    }, 100);
  };

  // FAQ搜尋並 TTS 回覆
  function handleFaqSubmit() {
    if (!faqInput.trim()) return;
    // 問 FAQ 時自動暫停主流程語音
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    const keyword = faqInput.trim();
    const found = FAQ.find(
      qa =>
        qa.q.toLowerCase().includes(keyword.toLowerCase()) ||
        (qa.a && qa.a.toLowerCase().includes(keyword.toLowerCase()))
    );
    let answer = found ? found.a : "很抱歉，暫時沒有找到相關答案。";
    setFaqText(answer); // 只設定 FAQ 字幕
    setShowFAQ(false);
    setFaqInput("");
    speakText(answer, () => setFaqText("")); // TTS 結束後自動清空
  }

  // 字幕偵測
  useEffect(() => {
    if (!currentProject) return;
    const checkSubtitle = () => {
      const audio = audioRef.current;
      const currentTime = audio ? audio.currentTime : 0;
      const subs = guideProjects[currentProject].subtitles;
      const current = subs.find(
        (s) => currentTime >= s.start && currentTime <= s.end
      );
      // 只有在沒有 FAQ 字幕時，才切換主流程字幕
      if (!faqText) setCurrentText(current ? current.text : "");
      rafRef.current = requestAnimationFrame(checkSubtitle);
    };
    rafRef.current = requestAnimationFrame(checkSubtitle);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [currentProject, faqText]);

  // FAQ 回覆 TTS (瀏覽器原生語音)
  function speakText(text, onEnd) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = "zh-TW"; // 語言依內容調整
    if (onEnd) {
      utter.onend = onEnd;
    }
    window.speechSynthesis.speak(utter);
  }

  // 音檔播完
  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="container">
      {/* 1. 初始狀態：背景圖＋按鈕 */}
      {showReady && (
        <div className="intro-bg-overlay" style={{ backgroundImage: `url(${introBg})` }}>
          <button
            className="ready-button"
            onClick={() => {
              setShowReady(false);
              setShowIntro(true);
            }}
          >
            我準備啟程
          </button>
          <p className="intro-tip">請開啟聲音，讓我來向你介紹！</p>
        </div>
      )}

      {/* 2. 播放影片，影片結束才開始播放音樂 */}
      {showIntro && (
        <div className="intro-video-overlay">
          <video
            src={introVideo}
            autoPlay
            playsInline
            onEnded={() => {
              setShowIntro(false);
              setTimeout(() => {
                if (audioIntroRef.current) {
                  audioIntroRef.current.currentTime = 0;
                  audioIntroRef.current.muted = false;
                  audioIntroRef.current.volume = 1;
                  audioIntroRef.current.play().catch(e => {
                    alert("音效播放失敗: " + e.message);
                  });
                }
              }, 100);
            }}
            className="intro-video"
            controls={false}
          />
        </div>
      )}

      {/* 3. intro 音樂元件 */}
      <audio
        ref={audioIntroRef}
        src={introAudio}
        loop
        style={{ display: "none" }}
      />

      {/* 4. 主頁內容 */}
      {!showReady && !showIntro && (
        <>
          {/* 主視覺大蝙蝠圖（嘴型動畫，上移一些） */}
          <img
            src={
              (faqText || currentText)
                ? (batMouthOpen ? "/media/bat.png" : "/media/閉嘴.png")
                : "/media/閉嘴.png"
            }
            alt="黃金蝙蝠"
            className="bat-background"
          />

          {/* 右上角下拉選單 */}
          <div className="dropdown">
            <button
              className="dropdown-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              單件介紹 🔽
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {projectKeys.map((key) => (
                  <button key={key} onClick={() => playProject(key)}>
                    {key}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 開啟導覽（這時結束音樂） */}
          {!currentProject && (
            <div className="start-section">
              <button className="start-button" onClick={handleStartGuide}>
                開啟導覽
              </button>
            </div>
          )}

          {/* 音訊播放器 + 控制按鈕 */}
          {currentProject && (
            <>
              <audio
                key={currentProject}
                ref={audioRef}
                onEnded={handleEnded}
              >
                <source
                  src={guideProjects[currentProject].audioUrl}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
              <div className="control-buttons">
                <button
                  onClick={() => {
                    setFaqText(""); // 清空 FAQ 字幕
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                      audioRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                >
                  再聽一遍
                </button>
                <button
                  onClick={() => {
                    setFaqText(""); // 清空 FAQ 字幕
                    if (audioRef.current) {
                      if (audioRef.current.paused) {
                        audioRef.current.play();
                        setIsPlaying(true);
                      } else {
                        audioRef.current.pause();
                        setIsPlaying(false);
                      }
                    }
                  }}
                >
                  暫停 / 播放
                </button>
                <button
                  onClick={() => {
                    setFaqText(""); // 清空 FAQ 字幕
                    const currentIndex = projectKeys.indexOf(currentProject);
                    const nextIndex = (currentIndex + 1) % projectKeys.length;
                    playProject(projectKeys[nextIndex]);
                  }}
                >
                  播放下一篇
                </button>
              </div>
            </>
          )}

          {/* FAQ字幕優先顯示（與導覽無關，永遠單獨渲染） */}
          {(faqText || currentText) && (
            <div className="subtitle-display">
              <p>{faqText || currentText}</p>
            </div>
          )}

          {/* FAQ 按鈕 */}
          <button className="faq-fab" onClick={() => setShowFAQ(true)}>
            我還<br />想問
          </button>

          {/* FAQ 彈窗 */}
          {showFAQ && (
            <div className="faq-popup">
              <button
                className="faq-close"
                onClick={() => {
                  setShowFAQ(false);
                  setFaqInput("");
                }}
                title="關閉"
              >
                ✕
              </button>
              <div className="faq-row">
                <input
                  id="faq-q"
                  value={faqInput}
                  onChange={e => setFaqInput(e.target.value)}
                  placeholder="請輸入你的問題"
                  onKeyDown={e => {
                    if (e.key === "Enter") handleFaqSubmit();
                  }}
                  autoFocus
                />
                <button
                  className="faq-submit"
                  onClick={handleFaqSubmit}
                >
                  送出
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;