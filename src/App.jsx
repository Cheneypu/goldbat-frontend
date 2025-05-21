import { useState, useEffect, useRef } from "react";
import "./App.css";

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
  const [currentProject, setCurrentProject] = useState(null);
  const [currentText, setCurrentText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const audioRef = useRef(null);
  const rafRef = useRef(null);

  const projectKeys = Object.keys(guideProjects);
  const firstProjectKey = projectKeys[0];

  const handleStartGuide = () => {
    setCurrentProject(firstProjectKey);
    setIsPlaying(true);
    setCurrentText("");
  };

  const playProject = (key) => {
    setIsPlaying(true);         // ✅ 播放控制交給 useEffect
    setCurrentProject(key);
    setCurrentText("");
    setIsDropdownOpen(false);
  };

  // ✅ 音檔播放與字幕同步
  useEffect(() => {
    if (!currentProject || !isPlaying) return;

    const timeout = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .catch(() => alert("音訊播放失敗，請再點一次"));
      }
    }, 100); // 等待 audio 元件掛載完畢

    const checkSubtitle = () => {
      const audio = audioRef.current;
      const currentTime = audio.currentTime;
      const subs = guideProjects[currentProject].subtitles;
      const current = subs.find(
        (s) => currentTime >= s.start && currentTime <= s.end
      );
      setCurrentText(current ? current.text : "");
      rafRef.current = requestAnimationFrame(checkSubtitle);
    };

    rafRef.current = requestAnimationFrame(checkSubtitle);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [currentProject, isPlaying]);

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentText("");
  };

  return (
    <div className="container">
      {/* 🔽 下拉選單 */}
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

      {/* 🔘 開始導覽 */}
      {!currentProject && (
        <div className="start-section">
          <button className="start-button" onClick={handleStartGuide}>
            開始導覽
          </button>
        </div>
      )}

      {/* 🎧 音訊播放器 + 字幕 + 控制按鈕 */}
      {currentProject && (
        <>
          {/* ✅ 這裡是最關鍵修正，加上 key={currentProject} */}
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

          {/* ✅ 字幕區塊：播放中才顯示 */}
          {isPlaying && (
             <div className="subtitle-display">
             <p>{currentText || "　"}</p>
             </div>
          )}

          {/* ✅ 控制按鈕區塊：永遠顯示 */}
          <div className="control-buttons">
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                  audioRef.current.play();
                }
              }}
            >
              再聽一遍
            </button>

            <button
              onClick={() => {
                if (audioRef.current) {
                  if (audioRef.current.paused) {
                    audioRef.current.play();
                  } else {
                    audioRef.current.pause();
                  }
                }
              }}
            >
              暫停 / 播放
            </button>

            <button
              onClick={() => {
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
    </div>
  );
}

export default App;