/***********************
 TUTU • app.js
 Multi-page Mobile Website
 English learning through Tamil
************************/

/* ---------- Helpers ---------- */
const $ = (id) => document.getElementById(id);

function speak(text, lang = "en-US") {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

function saveLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function loadLS(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

/* ---------- Tamil Letters Generator ---------- */
function generateTamilLettersFull() {
  // 12 Uyir
  const uyir = [
    { ta: "அ", enSound: "a", taSound: "அ" },
    { ta: "ஆ", enSound: "aa", taSound: "ஆ" },
    { ta: "இ", enSound: "i", taSound: "இ" },
    { ta: "ஈ", enSound: "ee", taSound: "ஈ" },
    { ta: "உ", enSound: "u", taSound: "உ" },
    { ta: "ஊ", enSound: "uu", taSound: "ஊ" },
    { ta: "எ", enSound: "e", taSound: "எ" },
    { ta: "ஏ", enSound: "ae", taSound: "ஏ" },
    { ta: "ஐ", enSound: "ai", taSound: "ஐ" },
    { ta: "ஒ", enSound: "o", taSound: "ஒ" },
    { ta: "ஓ", enSound: "oo", taSound: "ஓ" },
    { ta: "ஔ", enSound: "au", taSound: "ஔ" },
  ];

  // 18 Mei (with pulli)
  const mei = [
    { base: "க", mei: "க்", enSound: "ka/k", taSound: "க்" },
    { base: "ங", mei: "ங்", enSound: "nga/ng", taSound: "ங்" },
    { base: "ச", mei: "ச்", enSound: "cha/sa", taSound: "ச்" },
    { base: "ஞ", mei: "ஞ்", enSound: "nya/nj", taSound: "ஞ்" },
    { base: "ட", mei: "ட்", enSound: "ta/t", taSound: "ட்" },
    { base: "ண", mei: "ண்", enSound: "na/n", taSound: "ண்" },
    { base: "த", mei: "த்", enSound: "tha/th", taSound: "த்" },
    { base: "ந", mei: "ந்", enSound: "na/n", taSound: "ந்" },
    { base: "ப", mei: "ப்", enSound: "pa/p", taSound: "ப்" },
    { base: "ம", mei: "ம்", enSound: "ma/m", taSound: "ம்" },
    { base: "ய", mei: "ய்", enSound: "ya/y", taSound: "ய்" },
    { base: "ர", mei: "ர்", enSound: "ra/r", taSound: "ர்" },
    { base: "ல", mei: "ல்", enSound: "la/l", taSound: "ல்" },
    { base: "வ", mei: "வ்", enSound: "va/v", taSound: "வ்" },
    { base: "ழ", mei: "ழ்", enSound: "zha/zh", taSound: "ழ்" },
    { base: "ள", mei: "ள்", enSound: "La/L", taSound: "ள்" },
    { base: "ற", mei: "ற்", enSound: "Ra/rr", taSound: "ற்" },
    { base: "ன", mei: "ன்", enSound: "na/n", taSound: "ன்" },
  ];

  const vowelSigns = [
    { uyir: "அ", sign: "", hint: "a" },
    { uyir: "ஆ", sign: "ா", hint: "aa" },
    { uyir: "இ", sign: "ி", hint: "i" },
    { uyir: "ஈ", sign: "ீ", hint: "ee" },
    { uyir: "உ", sign: "ு", hint: "u" },
    { uyir: "ஊ", sign: "ூ", hint: "uu" },
    { uyir: "எ", sign: "ெ", hint: "e" },
    { uyir: "ஏ", sign: "ே", hint: "ae" },
    { uyir: "ஐ", sign: "ை", hint: "ai" },
    { uyir: "ஒ", sign: "ொ", hint: "o" },
    { uyir: "ஓ", sign: "ோ", hint: "oo" },
    { uyir: "ஔ", sign: "ௌ", hint: "au" },
  ];

  const list = [];

  uyir.forEach((u) => {
    list.push({ group: "Uyir (Vowels)", ta: u.ta, enSound: u.enSound, taSound: u.taSound });
  });

  mei.forEach((m) => {
    list.push({ group: "Mei (Consonants)", ta: m.mei, enSound: m.enSound, taSound: m.taSound });
  });

  mei.forEach((m) => {
    vowelSigns.forEach((v) => {
      list.push({
        group: "UyirMei (216 Letters)",
        ta: m.base + v.sign,
        enSound: `${m.enSound}-${v.hint}`,
        taSound: m.base + v.sign,
      });
    });
  });

  const grantha = [
    { ta: "ஜ", enSound: "ja/j", taSound: "ஜ" },
    { ta: "ஷ", enSound: "sha/sh", taSound: "ஷ" },
    { ta: "ஸ", enSound: "sa/s", taSound: "ஸ" },
    { ta: "ஹ", enSound: "ha/h", taSound: "ஹ" },
    { ta: "க்ஷ", enSound: "ksha", taSound: "க்ஷ" },
    { ta: "ஶ்ரீ", enSound: "sri", taSound: "ஶ்ரீ" },
  ];
  grantha.forEach((g) => list.push({ group: "Grantha (Extra)", ta: g.ta, enSound: g.enSound, taSound: g.taSound }));

  return list;
}

/* ---------- DATA (Starter Pack) ----------
   NOTE:
   This is a base system.
   You can expand to 1000 words + 500 sentences + 100 paragraphs by adding more objects.
----------------------------------------- */
const DATA = {
  tamilLetters: generateTamilLettersFull(),

  // Sound rules lessons (beginner-friendly)
  rules: [
    {
      title: "Silent letters (காணாமல் போகும் எழுத்து)",
      points: [
        "knife = k silent → நைஃப்",
        "know = k silent → நோ",
        "write = w silent → ரைட்",
        "hour = h silent → ஆவர்",
        "night = gh silent → நைட்",
      ],
    },
    {
      title: "Double letters (இரட்டை எழுத்து)",
      points: [
        "ball = ll → ல்",
        "class = ss → ஸ",
        "egg = gg → க்",
      ],
    },
    {
      title: "Digraphs (2 letters = 1 sound)",
      points: [
        "sh = ஷ → shop = ஷாப்",
        "ch = ச → chair = சேர்",
        "ph = ஃப → phone = ஃபோன்",
        "th = த → thank = தேங்க்",
      ],
    },
    {
      title: "Vowel teams (2 vowels together)",
      points: [
        "ee = ஈ → see = சீ",
        "ea = ஈ/எ → tea = டீ, bread = ப்ரெட்",
        "oo = ஊ → moon = மூன்",
        "oa = ஓ → road = ரோட்",
        "ou = அவ் → out = அவுட்",
      ],
    },
    {
      title: "Magic 'e' (கடைசியில் e இருந்தா ஒலி நீளமாகும்)",
      points: [
        "name = நேம்",
        "cake = கேக்",
        "time = டைம்",
        "five = ஃபைவ்",
      ],
    },
    {
      title: "Ending stop sound (கடைசி சத்தம் நிறுத்தம்)",
      points: [
        "milk → மில்க் (க்)",
        "cat → காட் (ட்)",
        "cup → கப் (ப்)",
        "pen → பென் (ன்)",
      ],
    },
  ],

  // Words (starter; you will expand later)
  words: [
    {
      id: "w1",
      en: "Ball",
      ta_meaning: "பந்து",
      ta_sound: "பால்",
      breakdown: [{ part: "Ba", ta: "ப" }, { part: "ll", ta: "ல்" }],
      rule: "Double 'll' sound = ல்",
      example_en: "This is a ball.",
      example_ta: "இது ஒரு பந்து.",
    },
    {
      id: "w2",
      en: "Milk",
      ta_meaning: "பால்",
      ta_sound: "மில்க்",
      breakdown: [{ part: "Mi", ta: "மி" }, { part: "lk", ta: "ல்க்" }],
      rule: "Ending stop sound 'k' = 'க்'",
      example_en: "I drink milk.",
      example_ta: "நான் பால் குடிப்பேன்.",
    },
    {
      id: "w3",
      en: "Knife",
      ta_meaning: "கத்தி",
      ta_sound: "நைஃப்",
      breakdown: [{ part: "k", ta: "(silent)" }, { part: "ni", ta: "நை" }, { part: "fe", ta: "ஃப்" }],
      rule: "k is silent in 'kn' words",
      example_en: "This is a knife.",
      example_ta: "இது ஒரு கத்தி.",
    },
    {
      id: "w4",
      en: "School",
      ta_meaning: "பள்ளி",
      ta_sound: "ஸ்கூல்",
      breakdown: [{ part: "Sch", ta: "ஸ்க" }, { part: "ool", ta: "ூல்" }],
      rule: "sch sound = ஸ்க",
      example_en: "I go to school.",
      example_ta: "நான் பள்ளிக்கு போவேன்.",
    },
  ],

  // Sentences (starter; expand later)
  sentences: [
    { id: "s1", en: "Hello!", ta_meaning: "வணக்கம்!", ta_sound: "ஹலோ!" },
    { id: "s2", en: "How are you?", ta_meaning: "நீங்கள் எப்படி இருக்கிறீர்கள்?", ta_sound: "ஹவ் ஆர் யூ?" },
    { id: "s3", en: "I am fine.", ta_meaning: "நான் நன்றாக இருக்கிறேன்.", ta_sound: "ஐ ஆம் ஃபைன்." },
    { id: "s4", en: "Thank you.", ta_meaning: "நன்றி.", ta_sound: "தேங்க் யூ." },
    { id: "s5", en: "I like milk.", ta_meaning: "எனக்கு பால் பிடிக்கும்.", ta_sound: "ஐ லைக் மில்க்." },
  ],
};

/* ---------- SETTINGS + PROGRESS ---------- */
const SETTINGS_KEY = "tutu_settings_v1";
const PROGRESS_KEY = "tutu_progress_v1";

const settings = loadLS(SETTINGS_KEY, {
  showMeaning: true,
  showSound: true,
  bigFont: false,
  theme: "dark",
});

const progress = loadLS(PROGRESS_KEY, {
  doneWords: {},
  doneSent: {},
  lastPage: "home",
  lastWordIndex: 0,
  lastSentIndex: 0,
});

/* ---------- UI NAV ---------- */
const pages = ["home", "letters", "words", "sentences", "rules", "practice", "quiz", "progress", "settings"];

function showPage(name) {
  pages.forEach((p) => {
    const el = $("page-" + p);
    if (el) el.classList.remove("active");
  });
  const target = $("page-" + name);
  if (target) target.classList.add("active");

  document.querySelectorAll(".navBtn").forEach((b) => {
    b.classList.toggle("active", b.dataset.nav === name);
  });

  progress.lastPage = name;
  saveLS(PROGRESS_KEY, progress);
}

/* ---------- THEME + SETTINGS APPLY ---------- */
function applySettings() {
  document.body.classList.toggle("light", settings.theme === "light");
  document.body.classList.toggle("bigFont", !!settings.bigFont);

  $("setMeaning").checked = !!settings.showMeaning;
  $("setSound").checked = !!settings.showSound;
  $("setBigFont").checked = !!settings.bigFont;
}

/* ---------- LETTERS RENDER ---------- */
let lettersFilter = "All";

function renderLettersChips() {
  const chips = ["All", "Uyir (Vowels)", "Mei (Consonants)", "UyirMei (216 Letters)", "Grantha (Extra)"];
  const wrap = $("lettersChips");
  wrap.innerHTML = "";
  chips.forEach((c) => {
    const btn = document.createElement("button");
    btn.className = "chip" + (lettersFilter === c ? " active" : "");
    btn.textContent = c === "All" ? "All" : c.split(" ")[0];
    btn.onclick = () => {
      lettersFilter = c;
      renderLettersChips();
      renderLettersList();
    };
    wrap.appendChild(btn);
  });
}

function renderLettersList() {
  const q = $("lettersSearch").value.trim().toLowerCase();
  const list = $("lettersList");
  list.innerHTML = "";

  let items = DATA.tamilLetters;

  if (lettersFilter !== "All") {
    items = items.filter((x) => x.group === lettersFilter);
  }

  if (q) {
    items = items.filter((x) => (x.ta + " " + x.enSound + " " + x.taSound + " " + x.group).toLowerCase().includes(q));
  }

  items.slice(0, 400).forEach((x) => {
    const card = document.createElement("div");
    card.className = "item";
    card.innerHTML = `
      <div class="rowBetween">
        <div>
          <div class="bigText">${x.ta}</div>
          <div class="smallText">${x.group}</div>
        </div>
        <div class="badge">${x.enSound}</div>
      </div>
      <div class="kv">
        <div class="kvLine"><span class="kvKey">Tamil sound</span><span class="kvVal">${x.taSound}</span></div>
      </div>
    `;
    list.appendChild(card);
  });
}

/* ---------- WORDS RENDER (Pagination) ---------- */
const WORDS_PAGE_SIZE = 20;
let wordsPage = 0;

function getWordsFiltered() {
  const q = $("wordsSearch").value.trim().toLowerCase();
  let items = DATA.words;

  if (q) {
    items = items.filter((w) => {
      const blob = `${w.en} ${w.ta_meaning} ${w.ta_sound} ${w.rule} ${w.example_en} ${w.example_ta}`.toLowerCase();
      return blob.includes(q);
    });
  }
  return items;
}

function renderWords() {
  const list = $("wordsList");
  list.innerHTML = "";

  const items = getWordsFiltered();
  const start = wordsPage * WORDS_PAGE_SIZE;
  const pageItems = items.slice(start, start + WORDS_PAGE_SIZE);

  $("wordsPagerText").textContent = `Page ${wordsPage + 1} / ${Math.max(1, Math.ceil(items.length / WORDS_PAGE_SIZE))}`;

  pageItems.forEach((w, idx) => {
    const card = document.createElement("div");
    card.className = "item";

    const done = !!progress.doneWords[w.id];

    const meaningHTML = settings.showMeaning ? `<div class="kvLine"><span class="kvKey">Meaning</span><span class="kvVal">${w.ta_meaning}</span></div>` : "";
    const soundHTML = settings.showSound ? `<div class="kvLine"><span class="kvKey">Tamil sound</span><span class="kvVal">${w.ta_sound}</span></div>` : "";

    const breakdownHTML = (w.breakdown && w.breakdown.length)
      ? `<div class="breakdown">
          ${w.breakdown.map(b => `<span class="pill">${b.part} → ${b.ta}</span>`).join("")}
        </div>`
      : "";

    card.innerHTML = `
      <div class="rowBetween">
        <div>
          <div class="bigText">${w.en}</div>
          <div class="smallText">${done ? "✅ Completed" : "⬜ Not done"}</div>
        </div>
        <div class="badge">${w.rule || "Rule"}</div>
      </div>

      <div class="kv">
        ${meaningHTML}
        ${soundHTML}
        <div class="kvLine"><span class="kvKey">Example</span><span class="kvVal">${w.example_en}</span></div>
        <div class="kvLine"><span class="kvKey">Tamil</span><span class="kvVal">${w.example_ta}</span></div>
        ${breakdownHTML}
      </div>

      <div class="actions">
        <button class="actionBtn" data-act="listen">🔊 Listen</button>
        <button class="actionBtn" data-act="done">${done ? "Undo" : "Mark Done"}</button>
        <button class="actionBtn" data-act="quiz">🧪 Quiz</button>
      </div>
    `;

    card.querySelector('[data-act="listen"]').onclick = () => speak(w.en, "en-US");
    card.querySelector('[data-act="done"]').onclick = () => {
      progress.doneWords[w.id] = !progress.doneWords[w.id];
      saveLS(PROGRESS_KEY, progress);
      renderProgress();
      renderWords();
    };
    card.querySelector('[data-act="quiz"]').onclick = () => {
      startQuiz("word", w);
    };

    list.appendChild(card);
  });
}

/* ---------- SENTENCES RENDER (Pagination) ---------- */
const SENT_PAGE_SIZE = 15;
let sentPage = 0;

function getSentFiltered() {
  const q = $("sentSearch").value.trim().toLowerCase();
  let items = DATA.sentences;
  if (q) {
    items = items.filter((s) => {
      const blob = `${s.en} ${s.ta_meaning} ${s.ta_sound}`.toLowerCase();
      return blob.includes(q);
    });
  }
  return items;
}

function renderSentences() {
  const list = $("sentList");
  list.innerHTML = "";

  const items = getSentFiltered();
  const start = sentPage * SENT_PAGE_SIZE;
  const pageItems = items.slice(start, start + SENT_PAGE_SIZE);

  $("sentPagerText").textContent = `Page ${sentPage + 1} / ${Math.max(1, Math.ceil(items.length / SENT_PAGE_SIZE))}`;

  pageItems.forEach((s) => {
    const card = document.createElement("div");
    card.className = "item";
    const done = !!progress.doneSent[s.id];

    const meaningHTML = settings.showMeaning ? `<div class="kvLine"><span class="kvKey">Meaning</span><span class="kvVal">${s.ta_meaning}</span></div>` : "";
    const soundHTML = settings.showSound ? `<div class="kvLine"><span class="kvKey">Tamil sound</span><span class="kvVal">${s.ta_sound}</span></div>` : "";

    card.innerHTML = `
      <div class="rowBetween">
        <div>
          <div class="midText">${s.en}</div>
          <div class="smallText">${done ? "✅ Completed" : "⬜ Not done"}</div>
        </div>
        <div class="badge">Sentence</div>
      </div>

      <div class="kv">
        ${meaningHTML}
        ${soundHTML}
      </div>

      <div class="actions">
        <button class="actionBtn" data-act="listen">🔊 Listen</button>
        <button class="actionBtn" data-act="done">${done ? "Undo" : "Mark Done"}</button>
        <button class="actionBtn" data-act="quiz">🧪 Quiz</button>
      </div>
    `;

    card.querySelector('[data-act="listen"]').onclick = () => speak(s.en, "en-US");
    card.querySelector('[data-act="done"]').onclick = () => {
      progress.doneSent[s.id] = !progress.doneSent[s.id];
      saveLS(PROGRESS_KEY, progress);
      renderProgress();
      renderSentences();
    };
    card.querySelector('[data-act="quiz"]').onclick = () => {
      startQuiz("sentence", s);
    };

    list.appendChild(card);
  });
}

/* ---------- RULES RENDER ---------- */
function renderRules() {
  const list = $("rulesList");
  list.innerHTML = "";

  DATA.rules.forEach((r) => {
    const card = document.createElement("div");
    card.className = "item";
    card.innerHTML = `
      <div class="rowBetween">
        <div>
          <div class="midText">${r.title}</div>
          <div class="smallText">Tamil teacher style rules</div>
        </div>
        <div class="badge">Rule</div>
      </div>
      <div class="kv">
        ${r.points.map(p => `<div class="kvLine"><span class="kvKey">•</span><span class="kvVal">${p}</span></div>`).join("")}
      </div>
    `;
    list.appendChild(card);
  });
}

/* ---------- PRACTICE (Speaking) ---------- */
let practiceIndex = 0;

function renderPractice() {
  const s = DATA.sentences[practiceIndex % DATA.sentences.length] || DATA.sentences[0];
  $("practiceEn").textContent = s.en;
  $("practiceTa").textContent = settings.showMeaning ? s.ta_meaning : "";
  $("practiceSound").textContent = settings.showSound ? s.ta_sound : "";
  $("micText").textContent = "Mic result will show here...";
}

function startSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    $("micText").textContent = "❌ உங்கள் browser-ல் Mic support இல்லை. நீங்க சத்தமாக வாசித்து practice பண்ணுங்க 👍";
    return;
  }
  const rec = new SpeechRecognition();
  rec.lang = "en-US";
  rec.interimResults = false;
  rec.maxAlternatives = 1;

  $("micText").textContent = "🎧 Listening... பேசுங்க...";
  rec.start();

  rec.onresult = (e) => {
    const text = e.results[0][0].transcript;
    $("micText").textContent = "✅ You said: " + text;
  };
  rec.onerror = () => {
    $("micText").textContent = "❌ Mic error. மீண்டும் முயற்சி செய்யுங்க.";
  };
}

/* ---------- QUIZ SYSTEM ---------- */
let quizState = {
  type: "word",
  item: null,
  qIndex: 0,
  score: 0,
  total: 5,
  currentCorrect: null,
};

function randInt(n) {
  return Math.floor(Math.random() * n);
}

function pickRandom(arr, count) {
  const copy = [...arr];
  const out = [];
  while (copy.length && out.length < count) {
    out.push(copy.splice(randInt(copy.length), 1)[0]);
  }
  return out;
}

function startQuiz(type, item) {
  quizState = { type, item, qIndex: 0, score: 0, total: 5, currentCorrect: null };
  showPage("quiz");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const box = $("quizBox");
  box.innerHTML = "";

  const isWord = quizState.type === "word";
  const item = quizState.item;

  // Question types:
  // 1) Meaning MCQ
  // 2) Sound MCQ
  // 3) Rule MCQ (word only)
  const qType = isWord ? ["meaning", "sound", "rule"][quizState.qIndex % 3] : ["meaning", "sound"][quizState.qIndex % 2];

  let question = "";
  let options = [];
  let correct = "";

  if (qType === "meaning") {
    question = `Q${quizState.qIndex + 1}: "${item.en}" meaning என்ன?`;
    correct = item.ta_meaning;
    const pool = (isWord ? DATA.words : DATA.sentences).map(x => x.ta_meaning);
    options = pickRandom(pool.filter(x => x !== correct), 3);
    options.push(correct);
  }

  if (qType === "sound") {
    question = `Q${quizState.qIndex + 1}: "${item.en}" Tamil sound என்ன?`;
    correct = item.ta_sound;
    const pool = (isWord ? DATA.words : DATA.sentences).map(x => x.ta_sound);
    options = pickRandom(pool.filter(x => x !== correct), 3);
    options.push(correct);
  }

  if (qType === "rule") {
    question = `Q${quizState.qIndex + 1}: "${item.en}" rule என்ன?`;
    correct = item.rule || "Rule";
    const pool = DATA.words.map(x => x.rule || "Rule");
    options = pickRandom(pool.filter(x => x !== correct), 3);
    options.push(correct);
  }

  options = options.sort(() => Math.random() - 0.5);
  quizState.currentCorrect = correct;

  box.innerHTML = `
    <div class="quizQ">${question}</div>
    <div class="quizOptions" id="quizOptions"></div>
  `;

  const optWrap = $("quizOptions");
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "optBtn";
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === quizState.currentCorrect) {
        btn.classList.add("correct");
        quizState.score += 1;
      } else {
        btn.classList.add("wrong");
      }
      // disable all
      optWrap.querySelectorAll("button").forEach(b => b.disabled = true);
      $("quizScore").textContent = `Score: ${quizState.score} / ${quizState.total}`;
    };
    optWrap.appendChild(btn);
  });

  $("quizScore").textContent = `Score: ${quizState.score} / ${quizState.total}`;
}

/* ---------- PROGRESS ---------- */
function renderProgress() {
  const doneW = Object.values(progress.doneWords).filter(Boolean).length;
  const doneS = Object.values(progress.doneSent).filter(Boolean).length;

  $("progWords").textContent = doneW;
  $("progSent").textContent = doneS;

  $("statWords").textContent = DATA.words.length;
  $("statSentences").textContent = DATA.sentences.length;
  $("statLetters").textContent = DATA.tamilLetters.length;
}

/* ---------- EVENTS ---------- */
function initEvents() {
  // bottom nav
  document.querySelectorAll(".navBtn").forEach((btn) => {
    btn.addEventListener("click", () => showPage(btn.dataset.nav));
  });

  // home cards
  document.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => showPage(btn.dataset.nav));
  });

  $("btnStart").onclick = () => showPage("letters");
  $("btnContinue").onclick = () => showPage(progress.lastPage || "home");

  // theme
  $("btnTheme").onclick = () => {
    settings.theme = settings.theme === "dark" ? "light" : "dark";
    saveLS(SETTINGS_KEY, settings);
    applySettings();
  };

  // letters search
  $("lettersSearch").addEventListener("input", renderLettersList);

  // words search + pager
  $("wordsSearch").addEventListener("input", () => {
    wordsPage = 0;
    renderWords();
  });
  $("btnWordsPrev").onclick = () => {
    wordsPage = Math.max(0, wordsPage - 1);
    renderWords();
  };
  $("btnWordsNext").onclick = () => {
    const total = getWordsFiltered().length;
    const maxPage = Math.max(0, Math.ceil(total / WORDS_PAGE_SIZE) - 1);
    wordsPage = Math.min(maxPage, wordsPage + 1);
    renderWords();
  };

  // sentences search + pager
  $("sentSearch").addEventListener("input", () => {
    sentPage = 0;
    renderSentences();
  });
  $("btnSentPrev").onclick = () => {
    sentPage = Math.max(0, sentPage - 1);
    renderSentences();
  };
  $("btnSentNext").onclick = () => {
    const total = getSentFiltered().length;
    const maxPage = Math.max(0, Math.ceil(total / SENT_PAGE_SIZE) - 1);
    sentPage = Math.min(maxPage, sentPage + 1);
    renderSentences();
  };

  // practice
  $("btnSpeakEnglish").onclick = () => speak($("practiceEn").textContent, "en-US");
  $("btnNextPractice").onclick = () => {
    practiceIndex += 1;
    renderPractice();
  };
  $("btnMic").onclick = () => startSpeechRecognition();

  // quiz buttons
  $("btnQuizNext").onclick = () => {
    quizState.qIndex += 1;
    if (quizState.qIndex >= quizState.total) {
      $("quizBox").innerHTML = `<div class="quizQ">🎉 Quiz Finished!</div><div class="smallText">Final Score: ${quizState.score} / ${quizState.total}</div>`;
      return;
    }
    renderQuizQuestion();
  };
  $("btnQuizRestart").onclick = () => {
    quizState.qIndex = 0;
    quizState.score = 0;
    renderQuizQuestion();
  };

  // settings toggles
  $("setMeaning").onchange = (e) => {
    settings.showMeaning = e.target.checked;
    saveLS(SETTINGS_KEY, settings);
    renderWords();
    renderSentences();
    renderPractice();
  };
  $("setSound").onchange = (e) => {
    settings.showSound = e.target.checked;
    saveLS(SETTINGS_KEY, settings);
    renderWords();
    renderSentences();
    renderPractice();
  };
  $("setBigFont").onchange = (e) => {
    settings.bigFont = e.target.checked;
    saveLS(SETTINGS_KEY, settings);
    applySettings();
  };

  // reset progress
  $("btnReset").onclick = () => {
    if (!confirm("Reset progress?")) return;
    progress.doneWords = {};
    progress.doneSent = {};
    saveLS(PROGRESS_KEY, progress);
    renderProgress();
    renderWords();
    renderSentences();
  };
}

/* ---------- INIT ---------- */
function init() {
  applySettings();

  renderProgress();
  renderLettersChips();
  renderLettersList();

  renderRules();
  renderWords();
  renderSentences();
  renderPractice();

  initEvents();

  // restore last page
  showPage(progress.lastPage || "home");
}

init();
