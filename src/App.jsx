import { useState, useEffect, useRef } from "react";
import "./App.css";
const API_BASE = "https://goldbat-tts-api.onrender.com";


const guideProjects = {
  "黃金鼠尾蝠是誰": {
    audioUrl: "https://my-tts-audio.s3.ap-northeast-1.amazonaws.com/goldbat-intro-0.9.mp3",
    subtitles: [
      
  { start: 0.066, end: 2.466, text: "哈囉你們好，我是小蝠" },
  { start: 2.633, end: 5.233, text: "屬於金黃鼠耳蝠家族的一員" },
  { start: 5.400, end: 8.100, text: "你也可以稱我們為「黃金蝙蝠」" },
  { start: 8.566, end: 11.866, text: "我平常都待在校門口的大葉欖仁樹上" },
  { start: 12.000, end: 13.933, text: "白天喜歡倒掛著睡覺" },
  { start: 14.000, end: 16.133, text: "晚上才會出來活動喔" },
  { start: 16.633, end: 19.100, text: "先介紹一下我的外型特色" },
  { start: 19.200, end: 20.966, text: "我的毛是金黃色的" },
  { start: 21.033, end: 22.700, text: "還帶著黑色條紋" },
  { start: 22.866, end: 26.500, text: "就像穿了超酷的披風一樣，超級有型" },
  { start: 26.966, end: 28.466, text: "雖然我叫「鼠耳蝠」" },
  { start: 28.866, end: 30.666, text: "但我可不是老鼠喔" },
  { start: 30.766, end: 32.666, text: "我是一隻會飛的蝙蝠" },
  { start: 32.833, end: 36.900, text: "而且是幫助你們人類消滅蚊子的「夜間守護者」" },
  { start: 37.266, end: 40.633, text: "下次你經過校門口那棵大葉欖仁樹時" },
  { start: 40.633, end: 42.033, text: "可以抬頭看看" },
  { start: 42.033, end: 45.233, text: "說不定你會看到我正在偷看你喔" }

    ]
  },
  "在大社國小的家": {
    audioUrl: "https://my-tts-audio.s3.ap-northeast-1.amazonaws.com/goldbat-habitat-0.9.mp3",
    subtitles: [     
  { start: 0.033, end: 3.200, text: "我們金黃鼠耳蝠在春天到秋天時" },
  { start: 3.300, end: 5.600, text: "會住在雲嘉南的平原地區" },
  { start: 5.666, end: 8.633, text: "因為這裡氣候溫暖、昆蟲又多" },
  { start: 8.800, end: 11.266, text: "是覓食和棲息的好地方" },
  { start: 11.666, end: 14.600, text: "但這些年來，這裡慢慢改變了" },
  { start: 14.600, end: 16.133, text: "晚上的燈光變亮" },
  { start: 16.200, end: 18.533, text: "讓我們飛不穩、也睡不好" },
  { start: 18.866, end: 20.700, text: "再加上農藥的噴灑" },
  { start: 20.833, end: 23.000, text: "讓我們愛吃的蟲蟲變少" },
  { start: 23.066, end: 26.266, text: "甚至吃了還會讓我們生病、不舒服" },
  { start: 26.600, end: 27.300, text: "另外" },
  { start: 27.300, end: 31.066, text: "可以躲的大樹竟也一棵棵的被砍伐消失了" },
  { start: 31.300, end: 32.066, text: "因此" },
  { start: 32.066, end: 34.933, text: "我們開始在各地尋找新的棲息地" },
  { start: 35.000, end: 38.200, text: "有一年，我們飛到了台南大社國小" },
  { start: 38.433, end: 41.400, text: "發現這裡的大葉欖仁樹又高又密" },
  { start: 41.466, end: 44.866, text: "白天好睡覺，晚上光害也不嚴重" },
  { start: 45.300, end: 47.700, text: "學校旁還有農田和水圳" },
  { start: 47.866, end: 49.933, text: "蚊子多、蟲蟲也多" },
  { start: 50.066, end: 52.933, text: "讓我們吃得又飽，又住的開心" },
  { start: 53.400, end: 55.866, text: "而我們通常在這裡住到秋天" },
  { start: 56.033, end: 57.433, text: "等到天氣轉涼後" },
  { start: 57.900, end: 60.833, text: "就會飛到中部的高山地區過冬" },
  { start: 61.233, end: 63.700, text: "找個洞穴或安靜的地方冬眠" },
  { start: 63.833, end: 65.633, text: "等明年春天再回來" },
  { start: 66.266, end: 68.800, text: "所以每年四月到十月" },
  { start: 69.000, end: 72.333, text: "你們都能在大社國小的大葉欖仁樹上" },
  { start: 72.433, end: 74.533, text: "看到我們倒掛的身影呦" }
    ]
  },
  "蝙蝠的生態角色": {
    audioUrl: "https://my-tts-audio.s3.ap-northeast-1.amazonaws.com/goldbat-role-0.9.mp3",
    subtitles: [
  { start: 0.033, end: 3.100, text: "晚上了，你們都躺在被窩裡睡覺" },
  { start: 3.266, end: 5.533, text: "那你知道我們在做甚麼嗎？" },
  { start: 5.833, end: 8.133, text: "我每天晚上都在抓昆蟲" },
  { start: 8.366, end: 11.000, text: "像蚊子、飛蛾、小甲蟲等" },
  { start: 11.200, end: 14.733, text: "通通是我的菜，一晚可以吃掉幾百隻" },
  { start: 14.866, end: 16.566, text: "是不是很厲害啊！" },
  { start: 16.900, end: 19.433, text: "大家都叫我「夜間捕蟲高手」" },
  { start: 19.733, end: 23.266, text: "同時我也是名副其實的「農田守護者」" },
  { start: 23.500, end: 26.400, text: "有我們在，農民可以少噴一點農藥" },
  { start: 26.400, end: 28.700, text: "對環境也比較健康" },
  { start: 29.100, end: 31.400, text: "不過我們也不是沒有敵人喔" },
  { start: 31.600, end: 34.733, text: "像貓頭鷹、蛇，還有一些大鳥" },
  { start: 34.766, end: 37.333, text: "總是趁著我們不注意時出現" },
  { start: 37.800, end: 41.933, text: "所以我們都會選一處安靜且有遮蔽的地方休息" },
  { start: 42.066, end: 44.266, text: "像學校的大樹或屋簷" },
  { start: 44.366, end: 45.866, text: "這樣也比較安全" },
  { start: 46.466, end: 49.533, text: "別因為我們嬌小的外型就小看我們喔" },
  { start: 49.666, end: 53.800, text: "我們的存在對整個生態系統其實是很重要的" },
  { start: 54.100, end: 55.500, text: "只要我們活得好" },
  { start: 55.666, end: 58.366, text: "整個自然環境也會跟著更好呢" }
]

  },
  "危機與保育": {
    audioUrl: "https://my-tts-audio.s3.ap-northeast-1.amazonaws.com/goldbat-closing-0.9.mp3",
    subtitles: [
  { start: 0.066, end: 1.133, text: "說了這麼多" },
  { start: 1.266, end: 4.333, text: "其實我們黃金蝙蝠一直都很低調" },
  { start: 4.700, end: 7.366, text: "白天只想找個安全的地方休息" },
  { start: 7.566, end: 10.233, text: "晚上再出來吃點蟲子止飢" },
  { start: 10.600, end: 11.933, text: "但現在的環境" },
  { start: 11.966, end: 14.833, text: "對我們來說卻越來越不容易了" },
  { start: 15.166, end: 17.300, text: "很多地方的大樹被砍了" },
  { start: 17.433, end: 18.866, text: "老房子被拆了" },
  { start: 18.866, end: 20.833, text: "我們能躲的地方變少" },
  { start: 21.200, end: 23.900, text: "到了晚上，天空也還亮亮的" },
  { start: 23.966, end: 26.833, text: "使得我們飛行時容易因此迷路" },
  { start: 26.833, end: 29.533, text: "也不敢靠近光源太強的地方" },
  { start: 29.966, end: 32.966, text: "而且，還常有人對我們有所誤解" },
  { start: 33.066, end: 34.633, text: "以為我們會吸血" },
  { start: 34.766, end: 37.633, text: "或者覺得看到蝙蝠很不吉利" },
  { start: 37.966, end: 40.500, text: "一看到我們，就想趕我們走" },
  { start: 40.600, end: 42.100, text: "甚至抓捕我們" },
  { start: 42.400, end: 44.433, text: "其實我們一點都不危險" },
  { start: 44.433, end: 45.966, text: "我們幫忙吃害蟲" },
  { start: 46.033, end: 47.366, text: "保護農作物" },
  { start: 47.700, end: 49.433, text: "只要給我們一點空間" },
  { start: 49.600, end: 51.733, text: "我們會默默地做很多事" },
  { start: 51.800, end: 53.766, text: "對人類很有幫助的" },
  { start: 54.066, end: 56.433, text: "希望透過更多的宣導教育" },
  { start: 56.566, end: 57.933, text: "讓更多人知道" },
  { start: 57.966, end: 60.300, text: "我們黃金蝙蝠不是壞東西" },
  { start: 60.466, end: 62.833, text: "而是值得被保護的夥伴" },
  { start: 63.233, end: 66.666, text: "讓我們能夠更安心地繼續住在你們身邊" },
  { start: 66.766, end: 69.566, text: "最後，期待我們的友誼日久天長" },
  { start: 69.866, end: 72.033, text: "下次要再來看看我們喔" }
]

  }
};

function App() {
  const [showReady, setShowReady] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [FAQ, setFAQ] = useState([]); // 📥 載入 FAQ.json 的資料
  const audioIntroRef = useRef(null);

  const videoRef = useRef(null); // ✅ 新增影片參考

  const [playingSource, setPlayingSource] = useState(null); // 'main' | 'faq' | null

  // 嘴型動畫狀態
  const [batMouthOpen, setBatMouthOpen] = useState(false);
  const mouthTimeoutRef = useRef();

  const [batImgLoaded, setBatImgLoaded] = useState(false);
const [batClosedImgLoaded, setBatClosedImgLoaded] = useState(false);

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

  const introBg = "/media/bg3.png";
  const introVideo = isPortrait ? "media/bat-portrait-v2.mp4" : "/media/bat-landscape.mp4";
  const introAudio = "/media/環境音.mp3";

  const [currentProject, setCurrentProject] = useState(null);
  const [currentText, setCurrentText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const audioRef = useRef(null);
  const rafRef = useRef(null);

  

  const projectKeys = Object.keys(guideProjects);
  const firstProjectKey = projectKeys[0];

  // ⬇️ 加在其他 useState 後面
const [isNightMode, setIsNightMode] = useState(false); // ✅ 新增 state：是否夜晚模式
const [isFlowerMode, setIsFlowerMode] = useState(false);
const [customBg, setCustomBg] = useState(null); // 目前是否有「字幕控制的背景」


const lastBgUrlRef = useRef(null);

function setBodyBackground(url) {
  const bgLayer = document.getElementById("bg-layer");
  if (!bgLayer) {
    console.warn("找不到 #bg-layer，背景無法切換。");
    return;
  }
  if (lastBgUrlRef.current === url) return;
  lastBgUrlRef.current = url;

  // ⭐️ 不動 opacity，只在圖片載入好才一次換過去，不透明
  const img = new Image();
  img.src = url;
  img.onload = () => {
    bgLayer.style.backgroundImage = `url('${url}')`;
    // 完全不用動 opacity
  };
}




useEffect(() => {
  const openImg = new Image();
  openImg.src = "/media/bat.png";
  openImg.onload = () => setBatImgLoaded(true);

  const closedImg = new Image();
  closedImg.src = "/media/bat-closed.png";
  closedImg.onload = () => setBatClosedImgLoaded(true);
}, []);

useEffect(() => {
  // 預先載入 bg.png 並設為背景（解決閃圖）
  setBodyBackground("/media/bg3.png");
}, []);

useEffect(() => {
  const preloadList = [
    "bat.png", "bat-closed.png", "bg3.png", "night.bg.png", "flowers.bg.png",
    "nightlight.png", "dashu.png", "caves.png", "treefell.bg.png",
    "insects.png", "bird.bg.png", "nicenight.png", "end.png"
  ];

  preloadList.forEach(name => {
    const img = new Image();
    img.src = `/media/${name}`;
  });
}, []);


  useEffect(() => {
  clearTimeout(mouthTimeoutRef.current);
  console.log("動畫啟動條件", { isPlaying, batImgLoaded, batClosedImgLoaded });

  // 只判斷 isPlaying + 兩張圖有載入即可
  if (!isPlaying || !batImgLoaded || !batClosedImgLoaded) {
    setBatMouthOpen(false);
    return;
  }

  function animateMouth() {
    setBatMouthOpen(v => !v);
    const randomDelay = Math.floor(Math.random() * 170) + 180;
    mouthTimeoutRef.current = setTimeout(animateMouth, randomDelay);
  }

  animateMouth();
  return () => clearTimeout(mouthTimeoutRef.current);
}, [isPlaying, batImgLoaded, batClosedImgLoaded]);




  // 🔁 一開始載入 FAQ.json 檔案
  useEffect(() => {
    fetch("/data/FAQ.json")
      .then(res => res.json())
      .then(data => setFAQ(data));
  }, []);

  const handleStartGuide = () => {
    setFaqText("");
    setCurrentProject(firstProjectKey);
    setIsPlaying(true);
    setCurrentText("");
    setPlayingSource("main");
    if (audioIntroRef.current) {
      audioIntroRef.current.pause();
      audioIntroRef.current.currentTime = 0;
    }
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play();
    }, 100);
  };

  const playProject = (key) => {
  setFaqText("");
  setCurrentText("");
  setIsPlaying(true);
  setPlayingSource("main");
  setIsDropdownOpen(false);

  setCustomBg(null);

  // ✅ 切換段落時，先重設背景與狀態
  setIsNightMode(false);
  setIsFlowerMode(false);

  // ✅ 根據新段落切換背景（開頭立即切）

if (key === "黃金鼠耳蝠是誰") {
  setBodyBackground("/media/bg3.png");
}

  if (key === "在大社國小的家") {
  setIsFlowerMode(true);
  setBodyBackground("/media/flowers.bg.png");
}

if (key === "蝙蝠的生態角色") {
  setBodyBackground("/media/night.bg.png");
}

if (key === "危機與保育") {
  setBodyBackground("/media/treefell.bg.png");
}


  // 若播放第一段，背景會依字幕時機切換夜景（不立即切）
  setCurrentProject(key);

  setTimeout(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, 100);
};




  async function handleFaqSubmit() {
  if (!faqInput.trim()) return;

  // 暫停主流程語音
  if (audioRef.current && !audioRef.current.paused) {
    audioRef.current.pause();
    setIsPlaying(false);
  }

  const userQuestion = faqInput.trim();

  try {
    const res = await fetch(`${API_BASE}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userQuestion })
    });

    const data = await res.json();
    const answer = data.answer || "我不知道怎麼回答這題，請再問問看別的問題喔～";

    setShowFAQ(false);
    setFaqInput("");
    speakText(answer, 1.0); // 播放語音
  } catch (err) {
    console.error("❌ 無法取得回答：", err);
    speakText("抱歉，我現在無法回答，可能是網路有問題喔", 1.0);
  }
}


  useEffect(() => {
    if (showReady) {
      document.body.classList.add("ready-bg");
    } else {
      document.body.classList.remove("ready-bg");
    }
  }, [showReady]);

  useEffect(() => {
  if (!currentProject) return;

  const checkSubtitle = () => {
    if (!isPlaying) {
      rafRef.current = requestAnimationFrame(checkSubtitle);
      return; 
    }
    const audio = audioRef.current;
    const currentTime = audio ? audio.currentTime : 0;
    const subs = guideProjects[currentProject].subtitles;
    
    const current = subs.find(
  (s) => currentTime >= s.start && currentTime <= s.end
);

// ✅ 危機與保育 - 夜光背景
if (
  currentProject === "危機與保育" &&
  current?.text?.includes("到了晚上，天空也還亮亮的") &&
  customBg !== "crisis-nightlight"
) {
  setCustomBg("crisis-nightlight");
  setBodyBackground("/media/nightlight.png");
}

// ✅ 危機與保育 - 最後一句「其實我們一點都不危險」
else if (
  currentProject === "危機與保育" &&
  current?.text?.includes("其實我們一點都不危險") &&
  customBg !== "crisis-end"
) {
  setCustomBg("crisis-end");
  setBodyBackground("/media/end.png");
}


if (
  currentProject === "蝙蝠的生態角色" &&
  current?.text?.includes("我每天晚上都在抓昆蟲") &&
  customBg !== "insects"
) {
  setCustomBg("insects");
  setBodyBackground("/media/insects.png");
}

// ✅ 蝙蝠的生態角色 - 猛禽威脅
else if (
  currentProject === "蝙蝠的生態角色" &&
  current?.text?.includes("像貓頭鷹、蛇，還有一些大鳥") &&
  customBg !== "bird"
) {
  setCustomBg("bird");
  setBodyBackground("/media/bird.bg.png");
}

// ✅ 蝙蝠的生態角色 - 鼓勵觀眾
else if (
  currentProject === "蝙蝠的生態角色" &&
  current?.text?.includes("別因為我們嬌小的外型就小看我們喔") &&
  customBg !== "nicenight"
) {
  setCustomBg("nicenight");
  setBodyBackground("/media/nicenight.png");
}

// ✅ 第一段：晚上燈光變亮（夜光）
if (
  currentProject === "在大社國小的家" &&
  current?.text === "晚上的燈光變亮" &&
  customBg !== "nightlight"
) {
  setCustomBg("nightlight");
  setBodyBackground("/media/nightlight.png");
}

// ✅ 第二段：飛到大社（大社背景）
else if (
  currentProject === "在大社國小的家" &&
  current?.text === "有一年，我們飛到了台南大社國小" &&
  customBg !== "dashu"
) {
  setCustomBg("dashu");
  setBodyBackground("/media/dashu.png");
}

// ✅ 第三段：冬眠（洞穴背景）
else if (
  currentProject === "在大社國小的家" &&
  current?.text === "找個洞穴或安靜的地方冬眠" &&
  customBg !== "caves"
) {
  setCustomBg("caves");
  setBodyBackground("/media/caves.png");
}



    // ✅ 「晚上才會出來活動喔」→ 切夜晚背景
    if (
      currentProject === "黃金鼠尾蝠是誰" &&
      current?.text === "晚上才會出來活動喔" &&
      !isNightMode
    ) {
      setIsNightMode(true);
      setBodyBackground("/media/night.bg.png");
    }

    // ✅ 「在大社國小的家」→ 全段期間切花園背景（只切一次）
    if (
  currentProject === "在大社國小的家" &&
  !isFlowerMode &&
  customBg === null &&
  isPlaying // ✅ 僅播放中才執行
) {
  setIsFlowerMode(true);
  setBodyBackground("/media/flowers.bg.png");
}


    if (!faqText) setCurrentText(current ? current.text : "");
    rafRef.current = requestAnimationFrame(checkSubtitle);
  };

  rafRef.current = requestAnimationFrame(checkSubtitle);
  return () => cancelAnimationFrame(rafRef.current);
}, [currentProject, faqText, isNightMode, isFlowerMode, customBg, isPlaying]);




  const audioRefFaq = useRef(null); // 新增一個 audioRefFaq

async function speakText(text, rate = 1.0, onEnd) {
  if (audioRefFaq.current) {
    audioRefFaq.current.pause();
    audioRefFaq.current = null;
  }

  try {
    const filename = `faq-${Date.now()}.mp3`;
    const wasMainPlaying = audioRef.current && !audioRef.current.paused;
    if (wasMainPlaying) audioRef.current.pause();

    const res = await fetch(`${API_BASE}/api/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, filename, rate }),
    });

    const data = await res.json();
    if (!data.url) throw new Error(data.error || "語音生成失敗");

    const audio = new Audio(data.url);
    audioRefFaq.current = audio;

    audio.onloadedmetadata = () => {
      const fullText = text; // ✅ 新增這行，避免錯誤
      const duration = audio.duration || 6;
      const minSegmentLength = 15;

      const splitRegex = /(?<=[，、。！？；])/g; // ✅ 按標點分段
      const segments = fullText.length > minSegmentLength
        ? fullText
            .split(splitRegex)
            .map(s => s.trim().replace(/[，、。！？；]*$/, "")) // ✅ 去尾標點
            .filter(Boolean)
        : [fullText];

      const totalChars = segments.reduce((sum, seg) => sum + seg.length, 0);
      let index = 0;

      function showNext() {
        if (index >= segments.length) return;
        const seg = segments[index];
        const time = (seg.length / totalChars) * duration * 1000;
        setFaqText(seg);
        index++;
        setTimeout(showNext, time);
      }

      showNext();
      audio.play();
      setIsPlaying(true);
      setPlayingSource("faq");
    };

    audio.onended = () => {
      setFaqText("");
      setIsPlaying(false);
      setPlayingSource("main");
      audioRefFaq.current = null;
      if (onEnd) onEnd();
    };
  } catch (err) {
    console.error("❌ 播放失敗：", err);
    setFaqText("");
    setIsPlaying(false);
    setPlayingSource(null);
    if (onEnd) onEnd();
  }
}



  const handleEnded = () => {
  setIsPlaying(false);

  // 新增這行：播放結束時清空 customBg
  setCustomBg(null);

  if (currentProject === "黃金鼠尾蝠是誰" && isNightMode) {
    setIsNightMode(false);
  }

  if (currentProject === "在大社國小的家" && isFlowerMode) {
    setIsFlowerMode(false);
  }

  if (currentProject === "危機與保育") {
    setBodyBackground("/media/bg3.png");
  }

  // ✅ 不清除 customBg（結尾保持最後畫面）
};



  return (
    <div className="container">
        <div id="bg-layer" />
      {showReady && (
        <div className="intro-bg-overlay">
          <div className="intro-align-wrapper">
            <div className="intro-center-block">
              <button className="ready-button" onClick={() => {
  setShowReady(false);
  setShowIntro(true);

  setTimeout(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => {
        alert("影片播放失敗：" + e.message);
      });
    }
  }, 200); // 可微調延遲
}}>

                我準備啟程
              </button>
              <p className="intro-tip">請開啟聲音，讓我來向你介紹！</p>
            </div>
          </div>
        </div>
      )}

      {showIntro && (
        <div className="intro-video-overlay">
          <video
            ref={videoRef}  
            src={introVideo}
            preload="auto"
            playsInline
            onEnded={() => {
  setShowIntro(false);

  // ✅ 設定背景圖為 bg1.png
  setBodyBackground("/media/bg3.png");

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

            className={`intro-video ${isPortrait ? "cover" : "contain"}`}
            controls={false}
          />
        </div>
      )}

      <audio ref={audioIntroRef} src={introAudio} loop style={{ display: "none" }} />

      {!showReady && !showIntro && (
        <>
          {(() => {
  const hasSpeech = Boolean(faqText || currentText);
  const showOpen = hasSpeech && batMouthOpen && batImgLoaded;          // 只有在開口圖載入好才顯示
  const showClosed = !hasSpeech || !batMouthOpen || !batImgLoaded;     // 其他情況顯示閉口（安全底圖）

  return (
    <>
      {/* 閉口層：當成安全底圖，優先顯示 */}
      <img
        src="/media/bat-closed.png"
        alt="黃金蝙蝠-閉口"
        className="bat-img"
        style={{ opacity: showClosed ? 1 : 0 }}
        loading="eager"
        decoding="async"
        draggable="false"
      />

      {/* 開口層：只有在需要時且圖片已載入才淡入 */}
      <img
        src="/media/bat.png"
        alt="黃金蝙蝠-開口"
        className="bat-img"
        style={{ opacity: showOpen ? 1 : 0 }}
        loading="eager"
        decoding="async"
        draggable="false"
      />

      {hasSpeech && (
        <div className="subtitle-display">
          <p>{faqText || currentText}</p>
        </div>
      )}
    </>
  );
})()}




          <div className="dropdown">
            <button
              className="dropdown-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              單元列表 🔽
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

          {!currentProject && (
            <div className="control-buttons">
              <button className="start-button" onClick={handleStartGuide}>
                開啟導覽
              </button>
            </div>
          )}

          {currentProject && (
            <>
              <audio key={currentProject} ref={audioRef} onEnded={handleEnded}>
                <source
                  src={guideProjects[currentProject].audioUrl}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
              <div className="control-buttons">
                <button onClick={() => {
                  setFaqText("");
                  if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                    setIsPlaying(true);
                  }
                }}>
                  再聽一遍
                </button>
                <button onClick={() => {
  if (playingSource === "main" && audioRef.current) {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  } else if (playingSource === "faq" && audioRefFaq.current) {
    if (audioRefFaq.current.paused) {
      audioRefFaq.current.play();
      setIsPlaying(true);
    } else {
      audioRefFaq.current.pause();
      setIsPlaying(false);
    }
  }
}}>
  暫停 / 播放
</button>



                <button onClick={() => {
  // ✅ 停止 FAQ 音訊並清除狀態
  if (audioRefFaq.current) {
    audioRefFaq.current.pause();
    audioRefFaq.current = null;
  }

  setFaqText("");           // ✅ 清除 FAQ 字幕
  setIsPlaying(true);       // ✅ 嘴巴動畫會根據這個啟動
  setPlayingSource("main"); // ✅ 告訴系統「現在是主線播放」

  // 播放下一個主線段落
  const currentIndex = projectKeys.indexOf(currentProject);
  const nextIndex = (currentIndex + 1) % projectKeys.length;
  playProject(projectKeys[nextIndex]);
}}>
  播放下一篇
</button>

              </div>
            </>
          )}

          <button className="faq-fab" onClick={() => setShowFAQ(true)}>
            我還<br />想問
          </button>

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
                <button className="faq-submit" onClick={handleFaqSubmit}>
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
