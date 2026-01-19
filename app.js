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
// ===== Fluent Pack 1 (Words 5–104) =====
{
  id:"w5",
  en:"Cat",
  ta_meaning:"பூனை",
  ta_sound:"கேட்",
  breakdown:[{part:"C",ta:"க"},{part:"at",ta:"ட்"}],
  rule:"Ending t = ட்",
  example_en:"The cat is small.",
  example_ta:"பூனை சிறியது."
},
{
  id:"w6",
  en:"Dog",
  ta_meaning:"நாய்",
  ta_sound:"டாக்",
  breakdown:[{part:"D",ta:"ட"},{part:"og",ta:"ாக்"}],
  rule:"o sound = ஆ (sometimes)",
  example_en:"The dog is happy.",
  example_ta:"நாய் சந்தோஷமாக உள்ளது."
},
{
  id:"w7",
  en:"Pen",
  ta_meaning:"பேனா",
  ta_sound:"பென்",
  breakdown:[{part:"Pe",ta:"பெ"},{part:"n",ta:"ன்"}],
  rule:"Ending n = ன்",
  example_en:"This is my pen.",
  example_ta:"இது என் பேனா."
},
{
  id:"w8",
  en:"Book",
  ta_meaning:"புத்தகம்",
  ta_sound:"புக்",
  breakdown:[{part:"Boo",ta:"பு"},{part:"k",ta:"க்"}],
  rule:"oo sometimes = உ",
  example_en:"I read a book.",
  example_ta:"நான் புத்தகம் படிப்பேன்."
},
{
  id:"w9",
  en:"Bag",
  ta_meaning:"பை",
  ta_sound:"பேக்",
  breakdown:[{part:"Ba",ta:"பே"},{part:"g",ta:"க்"}],
  rule:"Ending g = க்",
  example_en:"My bag is new.",
  example_ta:"என் பை புதியது."
},
{
  id:"w10",
  en:"Box",
  ta_meaning:"பெட்டி",
  ta_sound:"பாக்ஸ்",
  breakdown:[{part:"Bo",ta:"பா"},{part:"x",ta:"க்ஸ்"}],
  rule:"x sound = க்ஸ்",
  example_en:"Open the box.",
  example_ta:"பெட்டியை திற."
},
{
  id:"w11",
  en:"Cup",
  ta_meaning:"கோப்பை",
  ta_sound:"கப்",
  breakdown:[{part:"Cu",ta:"க"},{part:"p",ta:"ப்"}],
  rule:"Ending p = ப்",
  example_en:"This is a cup.",
  example_ta:"இது ஒரு கோப்பை."
},
{
  id:"w12",
  en:"Bus",
  ta_meaning:"பஸ்",
  ta_sound:"பஸ்",
  breakdown:[{part:"Bu",ta:"ப"},{part:"s",ta:"ஸ்"}],
  rule:"Ending s = ஸ",
  example_en:"The bus is coming.",
  example_ta:"பஸ் வருகிறது."
},
{
  id:"w13",
  en:"Car",
  ta_meaning:"கார்",
  ta_sound:"கார்",
  breakdown:[{part:"Ca",ta:"கா"},{part:"r",ta:"ர்"}],
  rule:"ar sound = ஆர்",
  example_en:"This is my car.",
  example_ta:"இது என் கார்."
},
{
  id:"w14",
  en:"Bike",
  ta_meaning:"பைக்",
  ta_sound:"பைக்",
  breakdown:[{part:"Bi",ta:"பை"},{part:"ke",ta:"க்"}],
  rule:"Magic e makes vowel long",
  example_en:"I have a bike.",
  example_ta:"என்னிடம் பைக் உள்ளது."
},
{
  id:"w15",
  en:"Phone",
  ta_meaning:"போன்",
  ta_sound:"ஃபோன்",
  breakdown:[{part:"Ph",ta:"ஃப"},{part:"one",ta:"ோன்"}],
  rule:"ph = ஃப",
  example_en:"My phone is here.",
  example_ta:"என் போன் இங்கே உள்ளது."
},
{
  id:"w16",
  en:"Fan",
  ta_meaning:"விசிறி",
  ta_sound:"ஃபேன்",
  breakdown:[{part:"Fa",ta:"ஃபே"},{part:"n",ta:"ன்"}],
  rule:"short vowel sound",
  example_en:"Turn on the fan.",
  example_ta:"விசிறியை ஆன் செய்."
},
{
  id:"w17",
  en:"Light",
  ta_meaning:"விளக்கு",
  ta_sound:"லைட்",
  breakdown:[{part:"Li",ta:"லை"},{part:"ght",ta:"ட்"}],
  rule:"gh silent",
  example_en:"Switch on the light.",
  example_ta:"விளக்கை ஆன் செய்."
},
{
  id:"w18",
  en:"Door",
  ta_meaning:"கதவு",
  ta_sound:"டோர்",
  breakdown:[{part:"Do",ta:"டோ"},{part:"or",ta:"ர்"}],
  rule:"or sound = ஓர்",
  example_en:"Close the door.",
  example_ta:"கதவை மூடு."
},
{
  id:"w19",
  en:"Window",
  ta_meaning:"ஜன்னல்",
  ta_sound:"விண்டோ",
  breakdown:[{part:"Win",ta:"வின்"},{part:"dow",ta:"டோ"}],
  rule:"ow sound = ஓ",
  example_en:"Open the window.",
  example_ta:"ஜன்னலை திற."
},
{
  id:"w20",
  en:"Chair",
  ta_meaning:"நாற்காலி",
  ta_sound:"சேர்",
  breakdown:[{part:"Ch",ta:"ச"},{part:"air",ta:"ேர்"}],
  rule:"ch = ச",
  example_en:"Sit on the chair.",
  example_ta:"நாற்காலியில் உட்கார்."
},
{
  id:"w21",
  en:"Table",
  ta_meaning:"மேசை",
  ta_sound:"டேபிள்",
  breakdown:[{part:"Ta",ta:"டே"},{part:"ble",ta:"பிள்"}],
  rule:"ble ending = பிள்",
  example_en:"The table is big.",
  example_ta:"மேசை பெரியது."
},
{
  id:"w22",
  en:"Room",
  ta_meaning:"அறை",
  ta_sound:"ரூம்",
  breakdown:[{part:"Ro",ta:"ரூ"},{part:"om",ta:"ம்"}],
  rule:"oo = ஊ",
  example_en:"My room is clean.",
  example_ta:"என் அறை சுத்தம்."
},
{
  id:"w23",
  en:"Bed",
  ta_meaning:"படுக்கை",
  ta_sound:"பெட்",
  breakdown:[{part:"Be",ta:"பெ"},{part:"d",ta:"ட்"}],
  rule:"Ending d = ட்",
  example_en:"I sleep on the bed.",
  example_ta:"நான் படுக்கையில் தூங்குவேன்."
},
{
  id:"w24",
  en:"Food",
  ta_meaning:"உணவு",
  ta_sound:"ஃபூட்",
  breakdown:[{part:"Foo",ta:"ஃபூ"},{part:"d",ta:"ட்"}],
  rule:"oo = ஊ",
  example_en:"Food is ready.",
  example_ta:"உணவு தயாராக உள்ளது."
},
{
  id:"w25",
  en:"Water",
  ta_meaning:"தண்ணீர்",
  ta_sound:"வாட்டர்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"ter",ta:"டர்"}],
  rule:"er ending = அர்",
  example_en:"Drink water.",
  example_ta:"தண்ணீர் குடி."
},
{
  id:"w26",
  en:"Tea",
  ta_meaning:"தேநீர்",
  ta_sound:"டீ",
  breakdown:[{part:"T",ta:"ட்"},{part:"ea",ta:"ஈ"}],
  rule:"ea can sound like ஈ",
  example_en:"Tea is hot.",
  example_ta:"தேநீர் சூடாக உள்ளது."
},
{
  id:"w27",
  en:"Rice",
  ta_meaning:"சோறு",
  ta_sound:"ரைஸ்",
  breakdown:[{part:"Ri",ta:"ரை"},{part:"ce",ta:"ஸ்"}],
  rule:"ce ending = ஸ",
  example_en:"I eat rice.",
  example_ta:"நான் சோறு சாப்பிடுவேன்."
},
{
  id:"w28",
  en:"Egg",
  ta_meaning:"முட்டை",
  ta_sound:"எக்",
  breakdown:[{part:"E",ta:"எ"},{part:"gg",ta:"க்"}],
  rule:"double consonant sound",
  example_en:"Egg is good.",
  example_ta:"முட்டை நல்லது."
},
{
  id:"w29",
  en:"Fish",
  ta_meaning:"மீன்",
  ta_sound:"ஃபிஷ்",
  breakdown:[{part:"Fi",ta:"ஃபி"},{part:"sh",ta:"ஷ்"}],
  rule:"sh = ஷ",
  example_en:"Fish is tasty.",
  example_ta:"மீன் சுவையாக இருக்கும்."
},
{
  id:"w30",
  en:"Fruit",
  ta_meaning:"பழம்",
  ta_sound:"ஃப்ரூட்",
  breakdown:[{part:"Fru",ta:"ஃப்ரூ"},{part:"it",ta:"ட்"}],
  rule:"ui/ru sound",
  example_en:"Eat fruit daily.",
  example_ta:"தினமும் பழம் சாப்பிடு."
},
{
  id:"w31",
  en:"Apple",
  ta_meaning:"ஆப்பிள்",
  ta_sound:"ஆப்பிள்",
  breakdown:[{part:"Ap",ta:"ஆ"},{part:"ple",ta:"ப்பிள்"}],
  rule:"ple ending = பிள்",
  example_en:"Apple is red.",
  example_ta:"ஆப்பிள் சிவப்பு."
},
{
  id:"w32",
  en:"Mango",
  ta_meaning:"மாம்பழம்",
  ta_sound:"மேங்கோ",
  breakdown:[{part:"Man",ta:"மேன்"},{part:"go",ta:"கோ"}],
  rule:"ng sound",
  example_en:"Mango is sweet.",
  example_ta:"மாம்பழம் இனிப்பு."
},
{
  id:"w33",
  en:"Salt",
  ta_meaning:"உப்பு",
  ta_sound:"சால்ட்",
  breakdown:[{part:"Sa",ta:"சா"},{part:"lt",ta:"ல்ட்"}],
  rule:"lt ending = ல்ட்",
  example_en:"Add salt.",
  example_ta:"உப்பு சேர்."
},
{
  id:"w34",
  en:"Sugar",
  ta_meaning:"சர்க்கரை",
  ta_sound:"ஷுகர்",
  breakdown:[{part:"Su",ta:"ஷு"},{part:"gar",ta:"கர்"}],
  rule:"s can sound like sh here",
  example_en:"Less sugar.",
  example_ta:"சர்க்கரை குறைவு."
},
{
  id:"w35",
  en:"Name",
  ta_meaning:"பெயர்",
  ta_sound:"நேம்",
  breakdown:[{part:"Na",ta:"நே"},{part:"me",ta:"ம்"}],
  rule:"Magic e makes vowel long",
  example_en:"My name is Ravi.",
  example_ta:"என் பெயர் ரவி."
},
{
  id:"w36",
  en:"Time",
  ta_meaning:"நேரம்",
  ta_sound:"டைம்",
  breakdown:[{part:"Ti",ta:"டை"},{part:"me",ta:"ம்"}],
  rule:"Magic e makes vowel long",
  example_en:"What time is it?",
  example_ta:"இப்போது என்ன நேரம்?"
},
{
  id:"w37",
  en:"Day",
  ta_meaning:"நாள்",
  ta_sound:"டே",
  breakdown:[{part:"D",ta:"ட"},{part:"ay",ta:"ே"}],
  rule:"ay sound = ஏ",
  example_en:"Today is a good day.",
  example_ta:"இன்று நல்ல நாள்."
},
{
  id:"w38",
  en:"Night",
  ta_meaning:"இரவு",
  ta_sound:"நைட்",
  breakdown:[{part:"Ni",ta:"நை"},{part:"ght",ta:"ட்"}],
  rule:"gh silent",
  example_en:"Good night.",
  example_ta:"இனிய இரவு."
},
{
  id:"w39",
  en:"Right",
  ta_meaning:"வலது / சரி",
  ta_sound:"ரைட்",
  breakdown:[{part:"Ri",ta:"ரை"},{part:"ght",ta:"ட்"}],
  rule:"gh silent",
  example_en:"Turn right.",
  example_ta:"வலது பக்கம் திரும்பு."
},
{
  id:"w40",
  en:"Left",
  ta_meaning:"இடது",
  ta_sound:"லெஃப்ட்",
  breakdown:[{part:"Le",ta:"லெ"},{part:"ft",ta:"ஃப்ட்"}],
  rule:"ft ending = ஃப்ட்",
  example_en:"Turn left.",
  example_ta:"இடது பக்கம் திரும்பு."
},
{
  id:"w41",
  en:"Go",
  ta_meaning:"போ",
  ta_sound:"கோ",
  breakdown:[{part:"G",ta:"க"},{part:"o",ta:"ோ"}],
  rule:"o sound = ஓ",
  example_en:"Go now.",
  example_ta:"இப்போ போ."
},
{
  id:"w42",
  en:"Come",
  ta_meaning:"வா",
  ta_sound:"கம்",
  breakdown:[{part:"Co",ta:"க"},{part:"me",ta:"ம்"}],
  rule:"o short sound",
  example_en:"Come here.",
  example_ta:"இங்கே வா."
},
{
  id:"w43",
  en:"Stop",
  ta_meaning:"நிறுத்து",
  ta_sound:"ஸ்டாப்",
  breakdown:[{part:"St",ta:"ஸ்ட"},{part:"op",ta:"ாப்"}],
  rule:"st blend",
  example_en:"Stop the car.",
  example_ta:"காரை நிறுத்து."
},
{
  id:"w44",
  en:"Start",
  ta_meaning:"தொடங்கு",
  ta_sound:"ஸ்டார்ட்",
  breakdown:[{part:"St",ta:"ஸ்ட"},{part:"art",ta:"ார்ட்"}],
  rule:"ar sound = ஆர",
  example_en:"Start now.",
  example_ta:"இப்போ தொடங்கு."
},
{
  id:"w45",
  en:"Fast",
  ta_meaning:"வேகமாக",
  ta_sound:"ஃபாஸ்ட்",
  breakdown:[{part:"Fa",ta:"ஃபா"},{part:"st",ta:"ஸ்ட்"}],
  rule:"st ending = ஸ்ட்",
  example_en:"Run fast.",
  example_ta:"வேகமாக ஓடு."
},
{
  id:"w46",
  en:"Slow",
  ta_meaning:"மெதுவாக",
  ta_sound:"ஸ்லோ",
  breakdown:[{part:"Sl",ta:"ஸ்ல"},{part:"ow",ta:"ோ"}],
  rule:"ow sound = ஓ",
  example_en:"Walk slow.",
  example_ta:"மெதுவாக நட."
},
{
  id:"w47",
  en:"Good",
  ta_meaning:"நல்லது",
  ta_sound:"குட்",
  breakdown:[{part:"Go",ta:"கு"},{part:"od",ta:"ட்"}],
  rule:"oo sometimes = உ",
  example_en:"This is good.",
  example_ta:"இது நல்லது."
},
{
  id:"w48",
  en:"Bad",
  ta_meaning:"கெட்டது",
  ta_sound:"பேட்",
  breakdown:[{part:"Ba",ta:"பே"},{part:"d",ta:"ட்"}],
  rule:"Ending d = ட்",
  example_en:"This is bad.",
  example_ta:"இது கெட்டது."
},
{
  id:"w49",
  en:"New",
  ta_meaning:"புதிய",
  ta_sound:"நியூ",
  breakdown:[{part:"Ne",ta:"நி"},{part:"w",ta:"யூ"}],
  rule:"ew sound = யூ",
  example_en:"This is new.",
  example_ta:"இது புதியது."
},
{
  id:"w50",
  en:"Old",
  ta_meaning:"பழைய",
  ta_sound:"ஓல்ட்",
  breakdown:[{part:"O",ta:"ஓ"},{part:"ld",ta:"ல்ட்"}],
  rule:"ld ending = ல்ட்",
  example_en:"This is old.",
  example_ta:"இது பழையது."
},
{
  id:"w51",
  en:"Big",
  ta_meaning:"பெரியது",
  ta_sound:"பிக்",
  breakdown:[{part:"Bi",ta:"பி"},{part:"g",ta:"க்"}],
  rule:"Ending g = க்",
  example_en:"This is big.",
  example_ta:"இது பெரியது."
},
{
  id:"w52",
  en:"Small",
  ta_meaning:"சிறியது",
  ta_sound:"ஸ்மால்",
  breakdown:[{part:"Sma",ta:"ஸ்மா"},{part:"ll",ta:"ல்"}],
  rule:"double ll = ல்",
  example_en:"This is small.",
  example_ta:"இது சிறியது."
},
{
  id:"w53",
  en:"Hot",
  ta_meaning:"சூடு",
  ta_sound:"ஹாட்",
  breakdown:[{part:"Ho",ta:"ஹா"},{part:"t",ta:"ட்"}],
  rule:"Ending t = ட்",
  example_en:"Tea is hot.",
  example_ta:"தேநீர் சூடு."
},
{
  id:"w54",
  en:"Cold",
  ta_meaning:"குளிர்",
  ta_sound:"கோல்ட்",
  breakdown:[{part:"Co",ta:"கோ"},{part:"ld",ta:"ல்ட்"}],
  rule:"ld ending = ல்ட்",
  example_en:"Water is cold.",
  example_ta:"தண்ணீர் குளிராக உள்ளது."
},
{
  id:"w55",
  en:"Open",
  ta_meaning:"திற",
  ta_sound:"ஓபன்",
  breakdown:[{part:"O",ta:"ஓ"},{part:"pen",ta:"பென்"}],
  rule:"split syllables",
  example_en:"Open the door.",
  example_ta:"கதவை திற."
},
{
  id:"w56",
  en:"Close",
  ta_meaning:"மூடு",
  ta_sound:"க்ளோஸ்",
  breakdown:[{part:"Clo",ta:"க்ளோ"},{part:"se",ta:"ஸ்"}],
  rule:"se ending = ஸ",
  example_en:"Close the window.",
  example_ta:"ஜன்னலை மூடு."
},
{
  id:"w57",
  en:"Clean",
  ta_meaning:"சுத்தம்",
  ta_sound:"க்ளீன்",
  breakdown:[{part:"Cle",ta:"க்ளீ"},{part:"an",ta:"ன்"}],
  rule:"ea can sound like ஈ",
  example_en:"Keep it clean.",
  example_ta:"சுத்தமாக வை."
},
{
  id:"w58",
  en:"Dirty",
  ta_meaning:"அழுக்கு",
  ta_sound:"டர்டி",
  breakdown:[{part:"Dir",ta:"டர்"},{part:"ty",ta:"ட்டி"}],
  rule:"ty ending = டி",
  example_en:"This is dirty.",
  example_ta:"இது அழுக்கு."
},
{
  id:"w59",
  en:"Happy",
  ta_meaning:"சந்தோஷம்",
  ta_sound:"ஹாப்பி",
  breakdown:[{part:"Ha",ta:"ஹா"},{part:"ppy",ta:"ப்பி"}],
  rule:"double consonant sound",
  example_en:"I am happy.",
  example_ta:"நான் சந்தோஷமாக இருக்கிறேன்."
},
{
  id:"w60",
  en:"Sad",
  ta_meaning:"சோகம்",
  ta_sound:"சேட்",
  breakdown:[{part:"Sa",ta:"ச"},{part:"d",ta:"ட்"}],
  rule:"Ending d = ட்",
  example_en:"He is sad.",
  example_ta:"அவன் சோகமாக இருக்கிறான்."
},

// --- Continue (61–104) ---
{
  id:"w61", en:"Yes", ta_meaning:"ஆம்", ta_sound:"யெஸ்",
  breakdown:[{part:"Ye",ta:"யெ"},{part:"s",ta:"ஸ்"}],
  rule:"Ending s = ஸ", example_en:"Yes, I can.", example_ta:"ஆம், நான் முடியும்."
},
{
  id:"w62", en:"No", ta_meaning:"இல்லை", ta_sound:"நோ",
  breakdown:[{part:"N",ta:"ந"},{part:"o",ta:"ோ"}],
  rule:"o sound = ஓ", example_en:"No, thank you.", example_ta:"இல்லை, நன்றி."
},
{
  id:"w63", en:"Please", ta_meaning:"தயவு செய்து", ta_sound:"ப்ளீஸ்",
  breakdown:[{part:"Ple",ta:"ப்ளீ"},{part:"ase",ta:"ஸ்"}],
  rule:"ea sound = ஈ", example_en:"Please help me.", example_ta:"தயவு செய்து உதவுங்கள்."
},
{
  id:"w64", en:"Help", ta_meaning:"உதவி", ta_sound:"ஹெல்ப்",
  breakdown:[{part:"He",ta:"ஹெ"},{part:"lp",ta:"ல்ப்"}],
  rule:"lp ending = ல்ப்", example_en:"Help me.", example_ta:"எனக்கு உதவி செய்."
},
{
  id:"w65", en:"Call", ta_meaning:"அழை / கால் செய்", ta_sound:"கால்",
  breakdown:[{part:"Ca",ta:"கா"},{part:"ll",ta:"ல்"}],
  rule:"double ll = ல்", example_en:"Call me.", example_ta:"என்னை கால் செய்."
},
{
  id:"w66", en:"Wait", ta_meaning:"காத்திரு", ta_sound:"வேய்ட்",
  breakdown:[{part:"Wa",ta:"வே"},{part:"it",ta:"ட்"}],
  rule:"ai/ay sound = ஏய்", example_en:"Wait here.", example_ta:"இங்கே காத்திரு."
},
{
  id:"w67", en:"Now", ta_meaning:"இப்போது", ta_sound:"நவ்",
  breakdown:[{part:"No",ta:"ந"},{part:"w",ta:"வ்"}],
  rule:"ow sound = அவ்", example_en:"Come now.", example_ta:"இப்போ வா."
},
{
  id:"w68", en:"Later", ta_meaning:"பிறகு", ta_sound:"லேட்டர்",
  breakdown:[{part:"La",ta:"லே"},{part:"ter",ta:"டர்"}],
  rule:"er ending = அர்", example_en:"Do it later.", example_ta:"பிறகு செய்."
},
{
  id:"w69", en:"Today", ta_meaning:"இன்று", ta_sound:"டுடே",
  breakdown:[{part:"To",ta:"டு"},{part:"day",ta:"டே"}],
  rule:"day = டே", example_en:"Today is Sunday.", example_ta:"இன்று ஞாயிறு."
},
{
  id:"w70", en:"Tomorrow", ta_meaning:"நாளை", ta_sound:"டுமாரோ",
  breakdown:[{part:"To",ta:"டு"},{part:"mor",ta:"மார"},{part:"row",ta:"ோ"}],
  rule:"split syllables", example_en:"Come tomorrow.", example_ta:"நாளை வா."
},
{
  id:"w71", en:"One", ta_meaning:"ஒன்று", ta_sound:"வன்",
  breakdown:[{part:"O",ta:"வ"},{part:"ne",ta:"ன்"}],
  rule:"one sounds like வண்", example_en:"One pen.", example_ta:"ஒரு பேனா."
},
{
  id:"w72", en:"Two", ta_meaning:"இரண்டு", ta_sound:"டூ",
  breakdown:[{part:"Tw",ta:"ட"},{part:"o",ta:"ூ"}],
  rule:"two = டூ", example_en:"Two books.", example_ta:"இரண்டு புத்தகங்கள்."
},
{
  id:"w73", en:"Three", ta_meaning:"மூன்று", ta_sound:"த்ரீ",
  breakdown:[{part:"Th",ta:"த"},{part:"ree",ta:"ரீ"}],
  rule:"th = த", example_en:"Three cats.", example_ta:"மூன்று பூனைகள்."
},
{
  id:"w74", en:"Four", ta_meaning:"நான்கு", ta_sound:"ஃபோர்",
  breakdown:[{part:"Fo",ta:"ஃபோ"},{part:"ur",ta:"ர்"}],
  rule:"our/ur sound", example_en:"Four chairs.", example_ta:"நான்கு நாற்காலிகள்."
},
{
  id:"w75", en:"Five", ta_meaning:"ஐந்து", ta_sound:"ஃபைவ்",
  breakdown:[{part:"Fi",ta:"ஃபை"},{part:"ve",ta:"வ்"}],
  rule:"magic e", example_en:"Five days.", example_ta:"ஐந்து நாட்கள்."
},
{
  id:"w76", en:"Red", ta_meaning:"சிவப்பு", ta_sound:"ரெட்",
  breakdown:[{part:"Re",ta:"ரெ"},{part:"d",ta:"ட்"}],
  rule:"ending d = ட்", example_en:"This is red.", example_ta:"இது சிவப்பு."
},
{
  id:"w77", en:"Blue", ta_meaning:"நீலம்", ta_sound:"ப்ளூ",
  breakdown:[{part:"Bl",ta:"ப்ள"},{part:"ue",ta:"ூ"}],
  rule:"ue = ஊ", example_en:"Sky is blue.", example_ta:"வானம் நீலம்."
},
{
  id:"w78", en:"Green", ta_meaning:"பச்சை", ta_sound:"க்ரீன்",
  breakdown:[{part:"Gr",ta:"க்ர"},{part:"een",ta:"ீன்"}],
  rule:"ee = ஈ", example_en:"Leaves are green.", example_ta:"இலைகள் பச்சை."
},
{
  id:"w79", en:"Black", ta_meaning:"கருப்பு", ta_sound:"ப்ளாக்",
  breakdown:[{part:"Bla",ta:"ப்ளா"},{part:"ck",ta:"க்"}],
  rule:"ck = க்", example_en:"This is black.", example_ta:"இது கருப்பு."
},
{
  id:"w80", en:"White", ta_meaning:"வெள்ளை", ta_sound:"வைட்",
  breakdown:[{part:"Wh",ta:"வ"},{part:"ite",ta:"ைட்"}],
  rule:"wh = வ", example_en:"Milk is white.", example_ta:"பால் வெள்ளை."
},
{
  id:"w81", en:"Father", ta_meaning:"அப்பா", ta_sound:"ஃபாதர்",
  breakdown:[{part:"Fa",ta:"ஃபா"},{part:"ther",ta:"தர்"}],
  rule:"th = த", example_en:"My father is kind.", example_ta:"என் அப்பா நல்லவர்."
},
{
  id:"w82", en:"Mother", ta_meaning:"அம்மா", ta_sound:"மதர்",
  breakdown:[{part:"Mo",ta:"ம"},{part:"ther",ta:"தர்"}],
  rule:"th = த", example_en:"My mother is happy.", example_ta:"என் அம்மா சந்தோஷம்."
},
{
  id:"w83", en:"Brother", ta_meaning:"அண்ணன்/தம்பி", ta_sound:"ப்ரதர்",
  breakdown:[{part:"Bro",ta:"ப்ர"},{part:"ther",ta:"தர்"}],
  rule:"th = த", example_en:"My brother is here.", example_ta:"என் அண்ணன் இங்கே இருக்கிறார்."
},
{
  id:"w84", en:"Sister", ta_meaning:"அக்கா/தங்கை", ta_sound:"சிஸ்டர்",
  breakdown:[{part:"Sis",ta:"சிஸ்"},{part:"ter",ta:"டர்"}],
  rule:"er ending = அர்", example_en:"My sister is good.", example_ta:"என் அக்கா நல்லவர்."
},
{
  id:"w85", en:"Friend", ta_meaning:"நண்பர்", ta_sound:"ஃப்ரெண்ட்",
  breakdown:[{part:"Fri",ta:"ஃப்ரி"},{part:"end",ta:"ெண்ட்"}],
  rule:"end = எண்ட்", example_en:"He is my friend.", example_ta:"அவன் என் நண்பன்."
},
{
  id:"w86", en:"Teacher", ta_meaning:"ஆசிரியர்", ta_sound:"டீச்சர்",
  breakdown:[{part:"Tea",ta:"டீ"},{part:"cher",ta:"ச்சர்"}],
  rule:"ch = ச", example_en:"Teacher is kind.", example_ta:"ஆசிரியர் நல்லவர்."
},
{
  id:"w87", en:"Student", ta_meaning:"மாணவர்", ta_sound:"ஸ்டூடன்ட்",
  breakdown:[{part:"Stu",ta:"ஸ்டூ"},{part:"dent",ta:"டன்ட்"}],
  rule:"st blend", example_en:"I am a student.", example_ta:"நான் ஒரு மாணவன்."
},
{
  id:"w88", en:"Work", ta_meaning:"வேலை", ta_sound:"வர்க்",
  breakdown:[{part:"Wo",ta:"வ"},{part:"rk",ta:"ர்க்"}],
  rule:"or sound changes", example_en:"I go to work.", example_ta:"நான் வேலைக்கு போவேன்."
},
{
  id:"w89", en:"Job", ta_meaning:"வேலை", ta_sound:"ஜாப்",
  breakdown:[{part:"Jo",ta:"ஜா"},{part:"b",ta:"ப்"}],
  rule:"ending b = ப்", example_en:"I need a job.", example_ta:"எனக்கு வேலை வேண்டும்."
},
{
  id:"w90", en:"Money", ta_meaning:"பணம்", ta_sound:"மனி",
  breakdown:[{part:"Mo",ta:"ம"},{part:"ney",ta:"னி"}],
  rule:"ey sound = இ", example_en:"Money is important.", example_ta:"பணம் முக்கியம்."
},
{
  id:"w91", en:"Market", ta_meaning:"சந்தை", ta_sound:"மார்கெட்",
  breakdown:[{part:"Mar",ta:"மார்"},{part:"ket",ta:"கெட்"}],
  rule:"ket ending = கெட்", example_en:"Go to market.", example_ta:"சந்தைக்கு போ."
},
{
  id:"w92", en:"Shop", ta_meaning:"கடை", ta_sound:"ஷாப்",
  breakdown:[{part:"Sh",ta:"ஷ"},{part:"op",ta:"ாப்"}],
  rule:"sh = ஷ", example_en:"This is a shop.", example_ta:"இது ஒரு கடை."
},
{
  id:"w93", en:"Temple", ta_meaning:"கோவில்", ta_sound:"டெம்பிள்",
  breakdown:[{part:"Tem",ta:"டெம்"},{part:"ple",ta:"பிள்"}],
  rule:"ple ending = பிள்", example_en:"I go to temple.", example_ta:"நான் கோவிலுக்கு போவேன்."
},
{
  id:"w94", en:"Hospital", ta_meaning:"மருத்துவமனை", ta_sound:"ஹாஸ்பிட்டல்",
  breakdown:[{part:"Hos",ta:"ஹாஸ்"},{part:"pi",ta:"பி"},{part:"tal",ta:"டல்"}],
  rule:"split syllables", example_en:"Hospital is near.", example_ta:"மருத்துவமனை அருகில் உள்ளது."
},
{
  id:"w95", en:"Doctor", ta_meaning:"மருத்துவர்", ta_sound:"டாக்டர்",
  breakdown:[{part:"Doc",ta:"டாக்"},{part:"tor",ta:"டர்"}],
  rule:"or ending = அர்", example_en:"Doctor helps us.", example_ta:"மருத்துவர் உதவி செய்கிறார்."
},
{
  id:"w96", en:"Police", ta_meaning:"காவல்துறை", ta_sound:"போலீஸ்",
  breakdown:[{part:"Po",ta:"போ"},{part:"lice",ta:"லீஸ்"}],
  rule:"ce ending = ஸ", example_en:"Police are here.", example_ta:"போலீஸ் இங்கே இருக்கிறார்கள்."
},
{
  id:"w97", en:"Road", ta_meaning:"சாலை", ta_sound:"ரோட்",
  breakdown:[{part:"Ro",ta:"ரோ"},{part:"ad",ta:"ட்"}],
  rule:"oa = ஓ", example_en:"The road is long.", example_ta:"சாலை நீளம்."
},
{
  id:"w98", en:"Street", ta_meaning:"தெரு", ta_sound:"ஸ்ட்ரீட்",
  breakdown:[{part:"Str",ta:"ஸ்ட்ர"},{part:"eet",ta:"ீட்"}],
  rule:"ee = ஈ", example_en:"This street is busy.", example_ta:"இந்த தெரு பிஸி."
},
{
  id:"w99", en:"City", ta_meaning:"நகரம்", ta_sound:"சிட்டி",
  breakdown:[{part:"Ci",ta:"சி"},{part:"ty",ta:"ட்டி"}],
  rule:"ty ending = டி", example_en:"My city is big.", example_ta:"என் நகரம் பெரியது."
},
{
  id:"w100", en:"Village", ta_meaning:"கிராமம்", ta_sound:"வில்லேஜ்",
  breakdown:[{part:"Vil",ta:"வில்"},{part:"lage",ta:"லேஜ்"}],
  rule:"ge = ஜ்", example_en:"My village is small.", example_ta:"என் கிராமம் சிறியது."
},
{
  id:"w101", en:"Read", ta_meaning:"படி", ta_sound:"ரீட்",
  breakdown:[{part:"Re",ta:"ரீ"},{part:"ad",ta:"ட்"}],
  rule:"ea = ஈ", example_en:"Read this book.", example_ta:"இந்த புத்தகம் படி."
},
{
  id:"w102", en:"Write", ta_meaning:"எழுது", ta_sound:"ரைட்",
  breakdown:[{part:"w",ta:"(silent)"},{part:"ri",ta:"ரை"},{part:"te",ta:"ட்"}],
  rule:"w silent in wr words",
  example_en:"Write your name.",
  example_ta:"உன் பெயரை எழுது."
},
{
  id:"w103", en:"Speak", ta_meaning:"பேசு", ta_sound:"ஸ்பீக்",
  breakdown:[{part:"Sp",ta:"ஸ்ப"},{part:"eak",ta:"ீக்"}],
  rule:"ea = ஈ", example_en:"Speak slowly.", example_ta:"மெதுவாக பேசு."
},
{
  id:"w104", en:"Listen", ta_meaning:"கேள்", ta_sound:"லிஸன்",
  breakdown:[{part:"Lis",ta:"லிஸ்"},{part:"ten",ta:"ன்"}],
  rule:"t can be silent (sometimes)",
  example_en:"Listen to me.",
  example_ta:"என்னை கேள்."
},
// ===== Fluent Pack 1 (Sentences 6–55) =====
{ id:"s6", en:"What is your name?", ta_meaning:"உங்கள் பெயர் என்ன?", ta_sound:"வாட் இஸ் யோர் நேம்?" },
{ id:"s7", en:"My name is Kishor.", ta_meaning:"என் பெயர் கிஷோர்.", ta_sound:"மை நேம் இஸ் கிஷோர்." },
{ id:"s8", en:"Where are you from?", ta_meaning:"நீங்கள் எங்கிருந்து வந்தீர்கள்?", ta_sound:"வேர் ஆர் யூ ஃப்ரம்?" },
{ id:"s9", en:"I am from Tamil Nadu.", ta_meaning:"நான் தமிழ்நாட்டில் இருந்து வந்தேன்.", ta_sound:"ஐ ஆம் ஃப்ரம் தமிழ்நாடு." },
{ id:"s10", en:"Please speak slowly.", ta_meaning:"தயவு செய்து மெதுவாக பேசுங்கள்.", ta_sound:"ப்ளீஸ் ஸ்பீக் ஸ்லோலி." },

{ id:"s11", en:"I don't understand.", ta_meaning:"எனக்கு புரியவில்லை.", ta_sound:"ஐ டோன்ட் அண்டர்ஸ்டாண்ட்." },
{ id:"s12", en:"Can you repeat?", ta_meaning:"மீண்டும் சொல்ல முடியுமா?", ta_sound:"கேன் யூ ரிபீட்?" },
{ id:"s13", en:"I am learning English.", ta_meaning:"நான் ஆங்கிலம் கற்றுக்கொள்கிறேன்.", ta_sound:"ஐ ஆம் லெர்னிங் இங்கிலிஷ்." },
{ id:"s14", en:"I can read now.", ta_meaning:"நான் இப்போது படிக்க முடியும்.", ta_sound:"ஐ கேன் ரீட் நவ்." },
{ id:"s15", en:"I want to speak English.", ta_meaning:"நான் ஆங்கிலம் பேச வேண்டும்.", ta_sound:"ஐ வான்ட் டு ஸ்பீக் இங்கிலிஷ்." },

{ id:"s16", en:"Open the door.", ta_meaning:"கதவை திற.", ta_sound:"ஓபன் த டோர்." },
{ id:"s17", en:"Close the window.", ta_meaning:"ஜன்னலை மூடு.", ta_sound:"க்ளோஸ் த விண்டோ." },
{ id:"s18", en:"Switch on the light.", ta_meaning:"விளக்கை ஆன் செய்.", ta_sound:"ஸ்விட்ச் ஆன் த லைட்." },
{ id:"s19", en:"Switch off the fan.", ta_meaning:"விசிறியை ஆஃப் செய்.", ta_sound:"ஸ்விட்ச் ஆஃப் த ஃபேன்." },
{ id:"s20", en:"Sit on the chair.", ta_meaning:"நாற்காலியில் உட்கார்.", ta_sound:"சிட் ஆன் த சேர்." },

{ id:"s21", en:"Stand up.", ta_meaning:"எழுந்து நில்.", ta_sound:"ஸ்டாண்ட் அப்." },
{ id:"s22", en:"Sit down.", ta_meaning:"உட்கார்.", ta_sound:"சிட் டவுன்." },
{ id:"s23", en:"Come here.", ta_meaning:"இங்கே வா.", ta_sound:"கம் ஹியர்." },
{ id:"s24", en:"Go there.", ta_meaning:"அங்கே போ.", ta_sound:"கோ தேர்." },
{ id:"s25", en:"Wait here.", ta_meaning:"இங்கே காத்திரு.", ta_sound:"வேய்ட் ஹியர்." },

{ id:"s26", en:"Drink water.", ta_meaning:"தண்ணீர் குடி.", ta_sound:"ட்ரிங்க் வாட்டர்." },
{ id:"s27", en:"I like tea.", ta_meaning:"எனக்கு தேநீர் பிடிக்கும்.", ta_sound:"ஐ லைக் டீ." },
{ id:"s28", en:"I eat rice.", ta_meaning:"நான் சோறு சாப்பிடுவேன்.", ta_sound:"ஐ ஈட் ரைஸ்." },
{ id:"s29", en:"Food is ready.", ta_meaning:"உணவு தயாராக உள்ளது.", ta_sound:"ஃபூட் இஸ் ரெடி." },
{ id:"s30", en:"I am hungry.", ta_meaning:"எனக்கு பசிக்கிறது.", ta_sound:"ஐ ஆம் ஹங்க்ரி." },

{ id:"s31", en:"I am happy.", ta_meaning:"நான் சந்தோஷமாக இருக்கிறேன்.", ta_sound:"ஐ ஆம் ஹாப்பி." },
{ id:"s32", en:"I am sad.", ta_meaning:"நான் சோகமாக இருக்கிறேன்.", ta_sound:"ஐ ஆம் சேட்." },
{ id:"s33", en:"This is good.", ta_meaning:"இது நல்லது.", ta_sound:"திஸ் இஸ் குட்." },
{ id:"s34", en:"This is bad.", ta_meaning:"இது கெட்டது.", ta_sound:"திஸ் இஸ் பேட்." },
{ id:"s35", en:"It is hot.", ta_meaning:"சூடாக உள்ளது.", ta_sound:"இட் இஸ் ஹாட்." },

{ id:"s36", en:"It is cold.", ta_meaning:"குளிராக உள்ளது.", ta_sound:"இட் இஸ் கோல்ட்." },
{ id:"s37", en:"My bag is new.", ta_meaning:"என் பை புதியது.", ta_sound:"மை பேக் இஸ் நியூ." },
{ id:"s38", en:"My phone is here.", ta_meaning:"என் போன் இங்கே உள்ளது.", ta_sound:"மை ஃபோன் இஸ் ஹியர்." },
{ id:"s39", en:"I have a book.", ta_meaning:"என்னிடம் ஒரு புத்தகம் உள்ளது.", ta_sound:"ஐ ஹேவ் அ புக்." },
{ id:"s40", en:"I read a book.", ta_meaning:"நான் புத்தகம் படிப்பேன்.", ta_sound:"ஐ ரீட் அ புக்." },

{ id:"s41", en:"Write your name.", ta_meaning:"உன் பெயரை எழுது.", ta_sound:"ரைட் யோர் நேம்." },
{ id:"s42", en:"Listen to me.", ta_meaning:"என்னை கேள்.", ta_sound:"லிஸன் டு மீ." },
{ id:"s43", en:"Speak clearly.", ta_meaning:"தெளிவாக பேசு.", ta_sound:"ஸ்பீக் கிளியர்லி." },
{ id:"s44", en:"Please help me.", ta_meaning:"தயவு செய்து உதவி செய்யுங்கள்.", ta_sound:"ப்ளீஸ் ஹெல்ப் மீ." },
{ id:"s45", en:"Call me later.", ta_meaning:"பிறகு என்னை கால் செய்.", ta_sound:"கால் மீ லேட்டர்." },

{ id:"s46", en:"I go to work.", ta_meaning:"நான் வேலைக்கு போவேன்.", ta_sound:"ஐ கோ டு வர்க்." },
{ id:"s47", en:"I need money.", ta_meaning:"எனக்கு பணம் வேண்டும்.", ta_sound:"ஐ நீட் மணி." },
{ id:"s48", en:"Go to the market.", ta_meaning:"சந்தைக்கு போ.", ta_sound:"கோ டு த மார்கெட்." },
{ id:"s49", en:"This shop is big.", ta_meaning:"இந்த கடை பெரியது.", ta_sound:"திஸ் ஷாப் இஸ் பிக்." },
{ id:"s50", en:"The road is long.", ta_meaning:"சாலை நீளமாக உள்ளது.", ta_sound:"த ரோட் இஸ் லாங்." },

{ id:"s51", en:"Turn right.", ta_meaning:"வலது பக்கம் திரும்பு.", ta_sound:"டர்ன் ரைட்." },
{ id:"s52", en:"Turn left.", ta_meaning:"இடது பக்கம் திரும்பு.", ta_sound:"டர்ன் லெஃப்ட்." },
{ id:"s53", en:"Good night.", ta_meaning:"இனிய இரவு.", ta_sound:"குட் நைட்." },
{ id:"s54", en:"Good morning.", ta_meaning:"காலை வணக்கம்.", ta_sound:"குட் மார்னிங்." },
{ id:"s55", en:"See you tomorrow.", ta_meaning:"நாளை சந்திப்போம்.", ta_sound:"சி யூ டுமாரோ." },
// ===== Fluent Pack 2 (Words 105–204) =====
{
  id:"w105",
  en:"Boy",
  ta_meaning:"பையன்",
  ta_sound:"பாய்",
  breakdown:[{part:"Bo",ta:"பா"},{part:"y",ta:"ய்"}],
  rule:"oy sound = ஆய்/ஓய்",
  example_en:"The boy is happy.",
  example_ta:"பையன் சந்தோஷமாக இருக்கிறான்."
},
{
  id:"w106",
  en:"Girl",
  ta_meaning:"பெண் குழந்தை",
  ta_sound:"கேர்ல்",
  breakdown:[{part:"Gi",ta:"க"},{part:"rl",ta:"ர்ல்"}],
  rule:"rl ending = ர்ல்",
  example_en:"The girl is smart.",
  example_ta:"பெண் குழந்தை புத்திசாலி."
},
{
  id:"w107",
  en:"Man",
  ta_meaning:"ஆண்",
  ta_sound:"மேன்",
  breakdown:[{part:"Ma",ta:"மே"},{part:"n",ta:"ன்"}],
  rule:"a short sound",
  example_en:"He is a man.",
  example_ta:"அவன் ஒரு ஆண்."
},
{
  id:"w108",
  en:"Woman",
  ta_meaning:"பெண்",
  ta_sound:"வுமன்",
  breakdown:[{part:"Wo",ta:"வு"},{part:"man",ta:"மன்"}],
  rule:"o sound changes",
  example_en:"She is a woman.",
  example_ta:"அவள் ஒரு பெண்."
},
{
  id:"w109",
  en:"Child",
  ta_meaning:"குழந்தை",
  ta_sound:"சைல்ட்",
  breakdown:[{part:"Chi",ta:"சை"},{part:"ld",ta:"ல்ட்"}],
  rule:"ch = ச",
  example_en:"The child is playing.",
  example_ta:"குழந்தை விளையாடுகிறது."
},
{
  id:"w110",
  en:"Family",
  ta_meaning:"குடும்பம்",
  ta_sound:"ஃபேமிலி",
  breakdown:[{part:"Fa",ta:"ஃபே"},{part:"mi",ta:"மி"},{part:"ly",ta:"லி"}],
  rule:"split syllables",
  example_en:"My family is good.",
  example_ta:"என் குடும்பம் நல்லது."
},
{
  id:"w111",
  en:"Home",
  ta_meaning:"வீடு",
  ta_sound:"ஹோம்",
  breakdown:[{part:"Ho",ta:"ஹோ"},{part:"me",ta:"ம்"}],
  rule:"magic e",
  example_en:"I am at home.",
  example_ta:"நான் வீட்டில் இருக்கிறேன்."
},
{
  id:"w112",
  en:"House",
  ta_meaning:"வீடு",
  ta_sound:"ஹவுஸ்",
  breakdown:[{part:"Hou",ta:"ஹவ்"},{part:"se",ta:"ஸ்"}],
  rule:"ou sound = அவ்",
  example_en:"This is my house.",
  example_ta:"இது என் வீடு."
},
{
  id:"w113",
  en:"Street",
  ta_meaning:"தெரு",
  ta_sound:"ஸ்ட்ரீட்",
  breakdown:[{part:"Str",ta:"ஸ்ட்ர"},{part:"eet",ta:"ீட்"}],
  rule:"ee = ஈ",
  example_en:"This street is clean.",
  example_ta:"இந்த தெரு சுத்தமாக உள்ளது."
},
{
  id:"w114",
  en:"Near",
  ta_meaning:"அருகில்",
  ta_sound:"நியர்",
  breakdown:[{part:"Ne",ta:"நி"},{part:"ar",ta:"யர்"}],
  rule:"ea/ear sound = இயர்",
  example_en:"Come near me.",
  example_ta:"என் அருகில் வா."
},
{
  id:"w115",
  en:"Far",
  ta_meaning:"தூரம்",
  ta_sound:"ஃபார்",
  breakdown:[{part:"Fa",ta:"ஃபா"},{part:"r",ta:"ர்"}],
  rule:"ar = ஆர",
  example_en:"It is far.",
  example_ta:"அது தூரம்."
},
{
  id:"w116",
  en:"Here",
  ta_meaning:"இங்கே",
  ta_sound:"ஹியர்",
  breakdown:[{part:"He",ta:"ஹி"},{part:"re",ta:"யர்"}],
  rule:"ere = இயர்",
  example_en:"Come here.",
  example_ta:"இங்கே வா."
},
{
  id:"w117",
  en:"There",
  ta_meaning:"அங்கே",
  ta_sound:"தேர்",
  breakdown:[{part:"Th",ta:"த"},{part:"ere",ta:"ேர்"}],
  rule:"th = த",
  example_en:"Go there.",
  example_ta:"அங்கே போ."
},
{
  id:"w118",
  en:"Inside",
  ta_meaning:"உள்ளே",
  ta_sound:"இன்சைட்",
  breakdown:[{part:"In",ta:"இன்"},{part:"side",ta:"சைட்"}],
  rule:"compound word",
  example_en:"Stay inside.",
  example_ta:"உள்ளே இரு."
},
{
  id:"w119",
  en:"Outside",
  ta_meaning:"வெளியே",
  ta_sound:"அவுட்சைட்",
  breakdown:[{part:"Out",ta:"அவுட்"},{part:"side",ta:"சைட்"}],
  rule:"compound word",
  example_en:"Go outside.",
  example_ta:"வெளியே போ."
},
{
  id:"w120",
  en:"Morning",
  ta_meaning:"காலை",
  ta_sound:"மார்னிங்",
  breakdown:[{part:"Mor",ta:"மார்"},{part:"ning",ta:"னிங்"}],
  rule:"ng sound",
  example_en:"Good morning.",
  example_ta:"காலை வணக்கம்."
},
{
  id:"w121",
  en:"Evening",
  ta_meaning:"மாலை",
  ta_sound:"ஈவ்னிங்",
  breakdown:[{part:"Eve",ta:"ஈவ்"},{part:"ning",ta:"னிங்"}],
  rule:"ng sound",
  example_en:"Good evening.",
  example_ta:"மாலை வணக்கம்."
},
{
  id:"w122",
  en:"Afternoon",
  ta_meaning:"மதியம்",
  ta_sound:"ஆஃப்டர்நூன்",
  breakdown:[{part:"Af",ta:"ஆஃப்"},{part:"ter",ta:"டர்"},{part:"noon",ta:"நூன்"}],
  rule:"oo = ஊ",
  example_en:"Good afternoon.",
  example_ta:"மதிய வணக்கம்."
},
{
  id:"w123",
  en:"Week",
  ta_meaning:"வாரம்",
  ta_sound:"வீக்",
  breakdown:[{part:"Wee",ta:"வீ"},{part:"k",ta:"க்"}],
  rule:"ee = ஈ",
  example_en:"One week is seven days.",
  example_ta:"ஒரு வாரம் ஏழு நாட்கள்."
},
{
  id:"w124",
  en:"Month",
  ta_meaning:"மாதம்",
  ta_sound:"மந்த்",
  breakdown:[{part:"Mo",ta:"ம"},{part:"nth",ta:"ந்த்"}],
  rule:"th = த",
  example_en:"This month is busy.",
  example_ta:"இந்த மாதம் பிஸி."
},
{
  id:"w125",
  en:"Year",
  ta_meaning:"ஆண்டு",
  ta_sound:"யியர்",
  breakdown:[{part:"Ye",ta:"யி"},{part:"ar",ta:"யர்"}],
  rule:"ear sound = இயர்",
  example_en:"This year is good.",
  example_ta:"இந்த ஆண்டு நல்லது."
},
{
  id:"w126",
  en:"Sunday",
  ta_meaning:"ஞாயிறு",
  ta_sound:"சன்டே",
  breakdown:[{part:"Sun",ta:"சன்"},{part:"day",ta:"டே"}],
  rule:"day = டே",
  example_en:"Sunday is holiday.",
  example_ta:"ஞாயிறு விடுமுறை."
},
{
  id:"w127",
  en:"Monday",
  ta_meaning:"திங்கள்",
  ta_sound:"மண்டே",
  breakdown:[{part:"Mon",ta:"மன்"},{part:"day",ta:"டே"}],
  rule:"day = டே",
  example_en:"Monday is busy.",
  example_ta:"திங்கள் பிஸி."
},
{
  id:"w128",
  en:"Tuesday",
  ta_meaning:"செவ்வாய்",
  ta_sound:"டியூஸ்டே",
  breakdown:[{part:"Tues",ta:"டியூஸ்"},{part:"day",ta:"டே"}],
  rule:"day = டே",
  example_en:"Tuesday is good.",
  example_ta:"செவ்வாய் நல்லது."
},
{
  id:"w129",
  en:"Wednesday",
  ta_meaning:"புதன்",
  ta_sound:"வென்ஸ்டே",
  breakdown:[{part:"Wed",ta:"வெட்"},{part:"nes",ta:"ன்"},{part:"day",ta:"டே"}],
  rule:"d can be silent in wednesday",
  example_en:"Wednesday is mid week.",
  example_ta:"புதன் வார நடுப்பு."
},
{
  id:"w130",
  en:"Thursday",
  ta_meaning:"வியாழன்",
  ta_sound:"தர்ஸ்டே",
  breakdown:[{part:"Thur",ta:"தர்"},{part:"s",ta:"ஸ்"},{part:"day",ta:"டே"}],
  rule:"th = த",
  example_en:"Thursday is important.",
  example_ta:"வியாழன் முக்கியம்."
},
{
  id:"w131",
  en:"Friday",
  ta_meaning:"வெள்ளி",
  ta_sound:"ஃப்ரைடே",
  breakdown:[{part:"Fri",ta:"ஃப்ரை"},{part:"day",ta:"டே"}],
  rule:"day = டே",
  example_en:"Friday is good.",
  example_ta:"வெள்ளி நல்லது."
},
{
  id:"w132",
  en:"Saturday",
  ta_meaning:"சனி",
  ta_sound:"சாட்டர்டே",
  breakdown:[{part:"Sa",ta:"சா"},{part:"tur",ta:"டர்"},{part:"day",ta:"டே"}],
  rule:"er sound = அர்",
  example_en:"Saturday is holiday.",
  example_ta:"சனி விடுமுறை."
},
{
  id:"w133",
  en:"Question",
  ta_meaning:"கேள்வி",
  ta_sound:"க்வெஸ்சன்",
  breakdown:[{part:"Ques",ta:"க்வெஸ்"},{part:"tion",ta:"சன்"}],
  rule:"tion = ஷன்/சன்",
  example_en:"Answer the question.",
  example_ta:"கேள்விக்கு பதில் சொல்."
},
{
  id:"w134",
  en:"Answer",
  ta_meaning:"பதில்",
  ta_sound:"ஆன்சர்",
  breakdown:[{part:"An",ta:"ஆன்"},{part:"swer",ta:"சர்"}],
  rule:"w silent in answer",
  example_en:"Give me the answer.",
  example_ta:"எனக்கு பதில் கொடு."
},
{
  id:"w135",
  en:"Practice",
  ta_meaning:"பயிற்சி",
  ta_sound:"ப்ராக்டிஸ்",
  breakdown:[{part:"Prac",ta:"ப்ராக்"},{part:"tice",ta:"டிஸ்"}],
  rule:"ce ending = ஸ",
  example_en:"Practice daily.",
  example_ta:"தினமும் பயிற்சி செய்."
},
{
  id:"w136",
  en:"Lesson",
  ta_meaning:"பாடம்",
  ta_sound:"லெசன்",
  breakdown:[{part:"Les",ta:"லெஸ்"},{part:"son",ta:"ன்"}],
  rule:"o short sound",
  example_en:"This lesson is easy.",
  example_ta:"இந்த பாடம் எளிது."
},
{
  id:"w137",
  en:"Easy",
  ta_meaning:"எளிது",
  ta_sound:"ஈஸி",
  breakdown:[{part:"Ea",ta:"ஈ"},{part:"sy",ta:"சி"}],
  rule:"ea = ஈ",
  example_en:"This is easy.",
  example_ta:"இது எளிது."
},
{
  id:"w138",
  en:"Hard",
  ta_meaning:"கடினம்",
  ta_sound:"ஹார்ட்",
  breakdown:[{part:"Ha",ta:"ஹா"},{part:"rd",ta:"ர்ட்"}],
  rule:"rd ending = ர்ட்",
  example_en:"This is hard.",
  example_ta:"இது கடினம்."
},
{
  id:"w139",
  en:"Understand",
  ta_meaning:"புரிந்து கொள்",
  ta_sound:"அண்டர்ஸ்டாண்ட்",
  breakdown:[{part:"Un",ta:"அன்"},{part:"der",ta:"டர்"},{part:"stand",ta:"ஸ்டாண்ட்"}],
  rule:"split syllables",
  example_en:"I understand now.",
  example_ta:"இப்போது எனக்கு புரிகிறது."
},
{
  id:"w140",
  en:"Meaning",
  ta_meaning:"அர்த்தம்",
  ta_sound:"மீனிங்",
  breakdown:[{part:"Mea",ta:"மீ"},{part:"ning",ta:"னிங்"}],
  rule:"ea = ஈ",
  example_en:"What is the meaning?",
  example_ta:"அர்த்தம் என்ன?"
},
{
  id:"w141",
  en:"Speak",
  ta_meaning:"பேசு",
  ta_sound:"ஸ்பீக்",
  breakdown:[{part:"Sp",ta:"ஸ்ப"},{part:"eak",ta:"ீக்"}],
  rule:"ea = ஈ",
  example_en:"Speak in English.",
  example_ta:"ஆங்கிலத்தில் பேசு."
},
{
  id:"w142",
  en:"Reading",
  ta_meaning:"படித்தல்",
  ta_sound:"ரீடிங்",
  breakdown:[{part:"Rea",ta:"ரீ"},{part:"ding",ta:"டிங்"}],
  rule:"ea = ஈ",
  example_en:"Reading is good.",
  example_ta:"படித்தல் நல்லது."
},
{
  id:"w143",
  en:"Writing",
  ta_meaning:"எழுத்து எழுதுதல்",
  ta_sound:"ரைட்டிங்",
  breakdown:[{part:"Wri",ta:"ரை"},{part:"ting",ta:"டிங்"}],
  rule:"wr = w silent",
  example_en:"Writing is practice.",
  example_ta:"எழுதுதல் பயிற்சி."
},
{
  id:"w144",
  en:"Speaking",
  ta_meaning:"பேசுதல்",
  ta_sound:"ஸ்பீக்கிங்",
  breakdown:[{part:"Spea",ta:"ஸ்பீ"},{part:"king",ta:"கிங்"}],
  rule:"ea = ஈ",
  example_en:"Speaking needs practice.",
  example_ta:"பேச பயிற்சி தேவை."
},
{
  id:"w145",
  en:"Listen",
  ta_meaning:"கேள்",
  ta_sound:"லிஸன்",
  breakdown:[{part:"Lis",ta:"லிஸ்"},{part:"ten",ta:"ன்"}],
  rule:"t can be silent sometimes",
  example_en:"Listen carefully.",
  example_ta:"கவனமாக கேள்."
},
{
  id:"w146",
  en:"Repeat",
  ta_meaning:"மீண்டும் சொல்",
  ta_sound:"ரிபீட்",
  breakdown:[{part:"Re",ta:"ரி"},{part:"peat",ta:"பீட்"}],
  rule:"ea = ஈ",
  example_en:"Repeat after me.",
  example_ta:"என் பிறகு மீண்டும் சொல்."
},
{
  id:"w147",
  en:"Correct",
  ta_meaning:"சரி",
  ta_sound:"கரெக்ட்",
  breakdown:[{part:"Cor",ta:"க"},{part:"rect",ta:"ரெக்ட்"}],
  rule:"ct ending = க்ட்",
  example_en:"Your answer is correct.",
  example_ta:"உன் பதில் சரி."
},
{
  id:"w148",
  en:"Wrong",
  ta_meaning:"தவறு",
  ta_sound:"ராங்",
  breakdown:[{part:"Wro",ta:"ரோ"},{part:"ng",ta:"ங்"}],
  rule:"wr = w silent",
  example_en:"This is wrong.",
  example_ta:"இது தவறு."
},
{
  id:"w149",
  en:"Quiet",
  ta_meaning:"அமைதி",
  ta_sound:"க்வயட்",
  breakdown:[{part:"Qui",ta:"க்வை"},{part:"et",ta:"ட்"}],
  rule:"qu = க்வ",
  example_en:"Be quiet.",
  example_ta:"அமைதியாக இரு."
},
{
  id:"w150",
  en:"Noise",
  ta_meaning:"சத்தம்",
  ta_sound:"நாய்ஸ்",
  breakdown:[{part:"Noi",ta:"நாய்"},{part:"se",ta:"ஸ்"}],
  rule:"oi = ஆய்",
  example_en:"Too much noise.",
  example_ta:"அதிக சத்தம்."
},

// (151–204) compact but same style
{
  id:"w151", en:"Roadside", ta_meaning:"சாலை ஓரம்", ta_sound:"ரோட்சைட்",
  breakdown:[{part:"Road",ta:"ரோட்"},{part:"side",ta:"சைட்"}],
  rule:"compound word", example_en:"Stand roadside.", example_ta:"சாலை ஓரத்தில் நில்."
},
{
  id:"w152", en:"Ticket", ta_meaning:"டிக்கெட்", ta_sound:"டிக்கெட்",
  breakdown:[{part:"Ti",ta:"டி"},{part:"cket",ta:"க்கெட்"}],
  rule:"ck = க்", example_en:"Buy a ticket.", example_ta:"டிக்கெட் வாங்கு."
},
{
  id:"w153", en:"Train", ta_meaning:"ரயில்", ta_sound:"ட்ரெயின்",
  breakdown:[{part:"Tra",ta:"ட்ரே"},{part:"in",ta:"யின்"}],
  rule:"ai = எய்", example_en:"Train is fast.", example_ta:"ரயில் வேகம்."
},
{
  id:"w154", en:"Driver", ta_meaning:"ஓட்டுநர்", ta_sound:"ட்ரைவர்",
  breakdown:[{part:"Dri",ta:"ட்ரை"},{part:"ver",ta:"வர்"}],
  rule:"er = அர்", example_en:"Driver is here.", example_ta:"ஓட்டுநர் இங்கே இருக்கிறார்."
},
{
  id:"w155", en:"Nurse", ta_meaning:"செவிலியர்", ta_sound:"நர்ஸ்",
  breakdown:[{part:"Nur",ta:"நர்"},{part:"se",ta:"ஸ்"}],
  rule:"se = ஸ", example_en:"Nurse helps.", example_ta:"செவிலியர் உதவி செய்கிறார்."
},
{
  id:"w156", en:"Bottle", ta_meaning:"பாட்டில்", ta_sound:"பாட்டில்",
  breakdown:[{part:"Bot",ta:"பா"},{part:"tle",ta:"ட்டில்"}],
  rule:"tle = டில்", example_en:"This is a bottle.", example_ta:"இது ஒரு பாட்டில்."
},
{
  id:"w157", en:"Plate", ta_meaning:"தட்டு", ta_sound:"ப்ளேட்",
  breakdown:[{part:"Pla",ta:"ப்ளே"},{part:"te",ta:"ட்"}],
  rule:"magic e", example_en:"Keep the plate.", example_ta:"தட்டையை வை."
},
{
  id:"w158", en:"Spoon", ta_meaning:"ஸ்பூன்", ta_sound:"ஸ்பூன்",
  breakdown:[{part:"Spo",ta:"ஸ்பூ"},{part:"on",ta:"ன்"}],
  rule:"oo = ஊ", example_en:"Use spoon.", example_ta:"ஸ்பூன் பயன்படுத்து."
},
{
  id:"w159", en:"Glass", ta_meaning:"கிளாஸ்", ta_sound:"க்ளாஸ்",
  breakdown:[{part:"Gla",ta:"க்ளா"},{part:"ss",ta:"ஸ்"}],
  rule:"ss = ஸ", example_en:"This is a glass.", example_ta:"இது ஒரு கிளாஸ்."
},
{
  id:"w160", en:"Road", ta_meaning:"சாலை", ta_sound:"ரோட்",
  breakdown:[{part:"Ro",ta:"ரோ"},{part:"ad",ta:"ட்"}],
  rule:"oa = ஓ", example_en:"Road is busy.", example_ta:"சாலை பிஸி."
},
{
  id:"w161", en:"Hospital", ta_meaning:"மருத்துவமனை", ta_sound:"ஹாஸ்பிட்டல்",
  breakdown:[{part:"Hos",ta:"ஹாஸ்"},{part:"pi",ta:"பி"},{part:"tal",ta:"டல்"}],
  rule:"split syllables", example_en:"Go hospital.", example_ta:"மருத்துவமனைக்கு போ."
},
{
  id:"w162", en:"Temple", ta_meaning:"கோவில்", ta_sound:"டெம்பிள்",
  breakdown:[{part:"Tem",ta:"டெம்"},{part:"ple",ta:"பிள்"}],
  rule:"ple = பிள்", example_en:"Temple is near.", example_ta:"கோவில் அருகில்."
},
{
  id:"w163", en:"Office", ta_meaning:"அலுவலகம்", ta_sound:"ஆஃபிஸ்",
  breakdown:[{part:"Of",ta:"ஆஃப்"},{part:"fice",ta:"ஃபிஸ்"}],
  rule:"ce = ஸ", example_en:"I go to office.", example_ta:"நான் அலுவலகம் போவேன்."
},
{
  id:"w164", en:"Computer", ta_meaning:"கம்ப்யூட்டர்", ta_sound:"கம்ப்யூட்டர்",
  breakdown:[{part:"Com",ta:"கம்"},{part:"pu",ta:"ப்யூ"},{part:"ter",ta:"டர்"}],
  rule:"er = அர்", example_en:"Computer is useful.", example_ta:"கம்ப்யூட்டர் பயனுள்ளது."
},
{
  id:"w165", en:"Mobile", ta_meaning:"மொபைல்", ta_sound:"மொபைல்",
  breakdown:[{part:"Mo",ta:"மொ"},{part:"bile",ta:"பைல்"}],
  rule:"magic e", example_en:"My mobile is new.", example_ta:"என் மொபைல் புதியது."
},
{
  id:"w166", en:"Internet", ta_meaning:"இணையம்", ta_sound:"இன்டர்நெட்",
  breakdown:[{part:"In",ta:"இன்"},{part:"ter",ta:"டர்"},{part:"net",ta:"நெட்"}],
  rule:"split syllables", example_en:"Internet is fast.", example_ta:"இணையம் வேகம்."
},
{
  id:"w167", en:"Website", ta_meaning:"வலைத்தளம்", ta_sound:"வெப்சைட்",
  breakdown:[{part:"Web",ta:"வெப்"},{part:"site",ta:"சைட்"}],
  rule:"compound word", example_en:"This is my website.", example_ta:"இது என் வலைத்தளம்."
},
{
  id:"w168", en:"Password", ta_meaning:"கடவுச்சொல்", ta_sound:"பாஸ்வேர்ட்",
  breakdown:[{part:"Pass",ta:"பாஸ்"},{part:"word",ta:"வேர்ட்"}],
  rule:"ss = ஸ", example_en:"Remember password.", example_ta:"கடவுச்சொல் நினைவில் வை."
},
{
  id:"w169", en:"Login", ta_meaning:"உள்நுழை", ta_sound:"லாகின்",
  breakdown:[{part:"Lo",ta:"லா"},{part:"gin",ta:"கின்"}],
  rule:"g sound", example_en:"Login now.", example_ta:"இப்போ உள்நுழை."
},
{
  id:"w170", en:"Logout", ta_meaning:"வெளியேறு", ta_sound:"லாக்அவுட்",
  breakdown:[{part:"Log",ta:"லாக்"},{part:"out",ta:"அவுட்"}],
  rule:"ou = அவ்", example_en:"Logout later.", example_ta:"பிறகு வெளியேறு."
},
{
  id:"w171", en:"Button", ta_meaning:"பட்டன்", ta_sound:"பட்டன்",
  breakdown:[{part:"But",ta:"பட்"},{part:"ton",ta:"டன்"}],
  rule:"tt/ double sound", example_en:"Press the button.", example_ta:"பட்டனை அழுத்து."
},
{
  id:"w172", en:"Click", ta_meaning:"கிளிக்", ta_sound:"கிளிக்",
  breakdown:[{part:"Cli",ta:"க்ளி"},{part:"ck",ta:"க்"}],
  rule:"ck = க்", example_en:"Click here.", example_ta:"இங்கே கிளிக் செய்."
},
{
  id:"w173", en:"Open", ta_meaning:"திற", ta_sound:"ஓபன்",
  breakdown:[{part:"O",ta:"ஓ"},{part:"pen",ta:"பென்"}],
  rule:"split syllables", example_en:"Open the app.", example_ta:"அப்பை திற."
},
{
  id:"w174", en:"Close", ta_meaning:"மூடு", ta_sound:"க்ளோஸ்",
  breakdown:[{part:"Clo",ta:"க்ளோ"},{part:"se",ta:"ஸ்"}],
  rule:"se = ஸ", example_en:"Close the app.", example_ta:"அப்பை மூடு."
},
{
  id:"w175", en:"Again", ta_meaning:"மீண்டும்", ta_sound:"அகெயின்",
  breakdown:[{part:"A",ta:"அ"},{part:"gain",ta:"கெயின்"}],
  rule:"ai = எய்", example_en:"Try again.", example_ta:"மீண்டும் முயற்சி செய்."
},
{
  id:"w176", en:"Try", ta_meaning:"முயற்சி செய்", ta_sound:"ட்ரை",
  breakdown:[{part:"Tr",ta:"ட்ர"},{part:"y",ta:"ை"}],
  rule:"y sound = ஐ", example_en:"Try now.", example_ta:"இப்போ முயற்சி செய்."
},
{
  id:"w177", en:"Finish", ta_meaning:"முடி", ta_sound:"ஃபினிஷ்",
  breakdown:[{part:"Fi",ta:"ஃபி"},{part:"nish",ta:"னிஷ்"}],
  rule:"sh = ஷ", example_en:"Finish the work.", example_ta:"வேலையை முடி."
},
{
  id:"w178", en:"Begin", ta_meaning:"தொடங்கு", ta_sound:"பிகின்",
  breakdown:[{part:"Be",ta:"பி"},{part:"gin",ta:"கின்"}],
  rule:"g sound", example_en:"Begin now.", example_ta:"இப்போ தொடங்கு."
},
{
  id:"w179", en:"Need", ta_meaning:"தேவை", ta_sound:"நீட்",
  breakdown:[{part:"Nee",ta:"நீ"},{part:"d",ta:"ட்"}],
  rule:"ee = ஈ", example_en:"I need help.", example_ta:"எனக்கு உதவி தேவை."
},
{
  id:"w180", en:"Want", ta_meaning:"வேண்டும்", ta_sound:"வான்ட்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"nt",ta:"ன்ட்"}],
  rule:"nt ending = ன்ட்", example_en:"I want water.", example_ta:"எனக்கு தண்ணீர் வேண்டும்."
},
{
  id:"w181", en:"Like", ta_meaning:"பிடிக்கும்", ta_sound:"லைக்",
  breakdown:[{part:"Li",ta:"லை"},{part:"ke",ta:"க்"}],
  rule:"magic e", example_en:"I like tea.", example_ta:"எனக்கு தேநீர் பிடிக்கும்."
},
{
  id:"w182", en:"Love", ta_meaning:"காதல் / மிகவும் பிடிக்கும்", ta_sound:"லவ்",
  breakdown:[{part:"Lo",ta:"ல"},{part:"ve",ta:"வ்"}],
  rule:"e silent sometimes", example_en:"I love my family.", example_ta:"என் குடும்பத்தை நான் விரும்புகிறேன்."
},
{
  id:"w183", en:"Hate", ta_meaning:"வெறுப்பு", ta_sound:"ஹேட்",
  breakdown:[{part:"Ha",ta:"ஹே"},{part:"te",ta:"ட்"}],
  rule:"magic e", example_en:"I hate noise.", example_ta:"எனக்கு சத்தம் பிடிக்காது."
},
{
  id:"w184", en:"Buy", ta_meaning:"வாங்கு", ta_sound:"பை",
  breakdown:[{part:"Bu",ta:"ப"},{part:"y",ta:"ை"}],
  rule:"y = ஐ", example_en:"Buy this.", example_ta:"இதைக் வாங்கு."
},
{
  id:"w185", en:"Sell", ta_meaning:"விற்று", ta_sound:"செல்",
  breakdown:[{part:"Se",ta:"செ"},{part:"ll",ta:"ல்"}],
  rule:"double ll = ல்", example_en:"Sell the old phone.", example_ta:"பழைய போனை விற்று."
},
{
  id:"w186", en:"Pay", ta_meaning:"பணம் செலுத்து", ta_sound:"பே",
  breakdown:[{part:"Pa",ta:"பே"},{part:"y",ta:""}],
  rule:"ay = ஏ", example_en:"Pay now.", example_ta:"இப்போ பணம் செலுத்து."
},
{
  id:"w187", en:"Price", ta_meaning:"விலை", ta_sound:"ப்ரைஸ்",
  breakdown:[{part:"Pri",ta:"ப்ரை"},{part:"ce",ta:"ஸ்"}],
  rule:"ce = ஸ", example_en:"What is the price?", example_ta:"விலை என்ன?"
},
{
  id:"w188", en:"Cheap", ta_meaning:"குறைந்த விலை", ta_sound:"சீப்",
  breakdown:[{part:"Ch",ta:"ச"},{part:"eap",ta:"ீப்"}],
  rule:"ch = ச", example_en:"This is cheap.", example_ta:"இது குறைந்த விலை."
},
{
  id:"w189", en:"Costly", ta_meaning:"அதிக விலை", ta_sound:"காஸ்ட்லி",
  breakdown:[{part:"Cos",ta:"காஸ்"},{part:"tly",ta:"ட்லி"}],
  rule:"st blend", example_en:"This is costly.", example_ta:"இது அதிக விலை."
},
{
  id:"w190", en:"Strong", ta_meaning:"வலிமையான", ta_sound:"ஸ்ட்ராங்",
  breakdown:[{part:"Str",ta:"ஸ்ட்ர"},{part:"ong",ta:"ாங்"}],
  rule:"ng sound", example_en:"He is strong.", example_ta:"அவன் வலிமையானவன்."
},
{
  id:"w191", en:"Weak", ta_meaning:"பலவீனமான", ta_sound:"வீக்",
  breakdown:[{part:"Wea",ta:"வீ"},{part:"k",ta:"க்"}],
  rule:"ea = ஈ", example_en:"I feel weak.", example_ta:"நான் பலவீனமாக உணர்கிறேன்."
},
{
  id:"w192", en:"Ready", ta_meaning:"தயார்", ta_sound:"ரெடி",
  breakdown:[{part:"Re",ta:"ரெ"},{part:"dy",ta:"டி"}],
  rule:"y ending = இ", example_en:"I am ready.", example_ta:"நான் தயாராக இருக்கிறேன்."
},
{
  id:"w193", en:"Late", ta_meaning:"தாமதம்", ta_sound:"லேட்",
  breakdown:[{part:"La",ta:"லே"},{part:"te",ta:"ட்"}],
  rule:"magic e", example_en:"Don't be late.", example_ta:"தாமதமாகாதே."
},
{
  id:"w194", en:"Early", ta_meaning:"முன்னதாக", ta_sound:"எர்லி",
  breakdown:[{part:"Ear",ta:"எர்"},{part:"ly",ta:"லி"}],
  rule:"ear sound", example_en:"Come early.", example_ta:"முன்னதாக வா."
},
{
  id:"w195", en:"Busy", ta_meaning:"பிஸி", ta_sound:"பிஸி",
  breakdown:[{part:"Bu",ta:"பி"},{part:"sy",ta:"சி"}],
  rule:"y ending = இ", example_en:"I am busy.", example_ta:"நான் பிஸியாக இருக்கிறேன்."
},
{
  id:"w196", en:"Free", ta_meaning:"வெற்றிடம் / காலியாக", ta_sound:"ஃப்ரீ",
  breakdown:[{part:"Fre",ta:"ஃப்ரீ"}],
  rule:"ee = ஈ", example_en:"I am free now.", example_ta:"நான் இப்போது காலியாக இருக்கிறேன்."
},
{
  id:"w197", en:"Sure", ta_meaning:"நிச்சயம்", ta_sound:"ஷூர்",
  breakdown:[{part:"Su",ta:"ஷு"},{part:"re",ta:"ர்"}],
  rule:"sure sound", example_en:"Are you sure?", example_ta:"நிச்சயமா?"
},
{
  id:"w198", en:"Maybe", ta_meaning:"இருக்கலாம்", ta_sound:"மேபி",
  breakdown:[{part:"May",ta:"மே"},{part:"be",ta:"பி"}],
  rule:"ay = ஏ", example_en:"Maybe tomorrow.", example_ta:"நாளை இருக்கலாம்."
},
{
  id:"w199", en:"Always", ta_meaning:"எப்போதும்", ta_sound:"ஆல்வேஸ்",
  breakdown:[{part:"Al",ta:"ஆல்"},{part:"ways",ta:"வேஸ்"}],
  rule:"s ending = ஸ", example_en:"Always be happy.", example_ta:"எப்போதும் சந்தோஷமாக இரு."
},
{
  id:"w200", en:"Never", ta_meaning:"ஒருபோதும் இல்லை", ta_sound:"நெவர்",
  breakdown:[{part:"Ne",ta:"நெ"},{part:"ver",ta:"வர்"}],
  rule:"er = அர்", example_en:"Never give up.", example_ta:"ஒருபோதும் கைவிடாதே."
},
{
  id:"w201", en:"Before", ta_meaning:"முன்பு", ta_sound:"பிஃபோர்",
  breakdown:[{part:"Be",ta:"பி"},{part:"fore",ta:"ஃபோர்"}],
  rule:"ore = ஓர்", example_en:"I saw it before.", example_ta:"நான் முன்பு பார்த்தேன்."
},
{
  id:"w202", en:"After", ta_meaning:"பிறகு", ta_sound:"ஆஃப்டர்",
  breakdown:[{part:"Af",ta:"ஆஃப்"},{part:"ter",ta:"டர்"}],
  rule:"er = அர்", example_en:"After school, play.", example_ta:"பள்ளிக்கு பிறகு விளையாடு."
},
{
  id:"w203", en:"First", ta_meaning:"முதல்", ta_sound:"ஃபர்ஸ்ட்",
  breakdown:[{part:"Fir",ta:"ஃபர்"},{part:"st",ta:"ஸ்ட்"}],
  rule:"st = ஸ்ட்", example_en:"First listen.", example_ta:"முதலில் கேள்."
},
{
  id:"w204", en:"Last", ta_meaning:"கடைசி", ta_sound:"லாஸ்ட்",
  breakdown:[{part:"La",ta:"லா"},{part:"st",ta:"ஸ்ட்"}],
  rule:"st = ஸ்ட்", example_en:"This is last.", example_ta:"இது கடைசி."
},
// ===== Fluent Pack 2 (Sentences 56–105) =====
{ id:"s56", en:"I am at home.", ta_meaning:"நான் வீட்டில் இருக்கிறேன்.", ta_sound:"ஐ ஆம் அட் ஹோம்." },
{ id:"s57", en:"He is my friend.", ta_meaning:"அவன் என் நண்பன்.", ta_sound:"ஹீ இஸ் மை ஃப்ரெண்ட்." },
{ id:"s58", en:"She is my sister.", ta_meaning:"அவள் என் அக்கா/தங்கை.", ta_sound:"ஷீ இஸ் மை சிஸ்டர்." },
{ id:"s59", en:"My father is working.", ta_meaning:"என் அப்பா வேலை செய்கிறார்.", ta_sound:"மை ஃபாதர் இஸ் வர்க்கிங்." },
{ id:"s60", en:"My mother is cooking.", ta_meaning:"என் அம்மா சமைக்கிறார்.", ta_sound:"மை மதர் இஸ் குக்கிங்." },

{ id:"s61", en:"The child is sleeping.", ta_meaning:"குழந்தை தூங்குகிறது.", ta_sound:"த சைல்ட் இஸ் ஸ்லீப்பிங்." },
{ id:"s62", en:"I want to learn.", ta_meaning:"நான் கற்றுக்கொள்ள வேண்டும்.", ta_sound:"ஐ வான்ட் டு லெர்ன்." },
{ id:"s63", en:"I need more practice.", ta_meaning:"எனக்கு மேலும் பயிற்சி தேவை.", ta_sound:"ஐ நீட் மோர் ப்ராக்டிஸ்." },
{ id:"s64", en:"This lesson is easy.", ta_meaning:"இந்த பாடம் எளிது.", ta_sound:"திஸ் லெசன் இஸ் ஈஸி." },
{ id:"s65", en:"This lesson is hard.", ta_meaning:"இந்த பாடம் கடினம்.", ta_sound:"திஸ் லெசன் இஸ் ஹார்ட்." },

{ id:"s66", en:"I understand now.", ta_meaning:"இப்போது எனக்கு புரிகிறது.", ta_sound:"ஐ அண்டர்ஸ்டாண்ட் நவ்." },
{ id:"s67", en:"I don't know.", ta_meaning:"எனக்கு தெரியாது.", ta_sound:"ஐ டோன்ட் நோ." },
{ id:"s68", en:"I know this word.", ta_meaning:"இந்த வார்த்தை எனக்கு தெரியும்.", ta_sound:"ஐ நோ திஸ் வார்ட்." },
{ id:"s69", en:"Please repeat again.", ta_meaning:"தயவு செய்து மீண்டும் சொல்லுங்கள்.", ta_sound:"ப்ளீஸ் ரிபீட் அகெயின்." },
{ id:"s70", en:"Speak clearly, please.", ta_meaning:"தெளிவாக பேசுங்கள்.", ta_sound:"ஸ்பீக் கிளியர்லி ப்ளீஸ்." },

{ id:"s71", en:"Be quiet.", ta_meaning:"அமைதியாக இரு.", ta_sound:"பீ க்வயட்." },
{ id:"s72", en:"Don't make noise.", ta_meaning:"சத்தம் செய்யாதே.", ta_sound:"டோன்ட் மேக் நாய்ஸ்." },
{ id:"s73", en:"I am busy today.", ta_meaning:"நான் இன்று பிஸியாக இருக்கிறேன்.", ta_sound:"ஐ ஆம் பிஸி டுடே." },
{ id:"s74", en:"I am free now.", ta_meaning:"நான் இப்போது காலியாக இருக்கிறேன்.", ta_sound:"ஐ ஆம் ஃப்ரீ நவ்." },
{ id:"s75", en:"Come early tomorrow.", ta_meaning:"நாளை முன்னதாக வா.", ta_sound:"கம் எர்லி டுமாரோ." },

{ id:"s76", en:"Don't be late.", ta_meaning:"தாமதமாகாதே.", ta_sound:"டோன்ட் பீ லேட்." },
{ id:"s77", en:"Are you ready?", ta_meaning:"நீ தயாரா?", ta_sound:"ஆர் யூ ரெடி?" },
{ id:"s78", en:"I am ready now.", ta_meaning:"நான் இப்போது தயாராக இருக்கிறேன்.", ta_sound:"ஐ ஆம் ரெடி நவ்." },
{ id:"s79", en:"Maybe later.", ta_meaning:"பிறகு இருக்கலாம்.", ta_sound:"மேபி லேட்டர்." },
{ id:"s80", en:"I am sure.", ta_meaning:"நிச்சயம்.", ta_sound:"ஐ ஆம் ஷூர்." },

{ id:"s81", en:"Always tell the truth.", ta_meaning:"எப்போதும் உண்மை சொல்.", ta_sound:"ஆல்வேஸ் டெல் த ட்ரூத்." },
{ id:"s82", en:"Never give up.", ta_meaning:"ஒருபோதும் கைவிடாதே.", ta_sound:"நெவர் கிவ் அப்." },
{ id:"s83", en:"I will try again.", ta_meaning:"நான் மீண்டும் முயற்சி செய்கிறேன்.", ta_sound:"ஐ வில் ட்ரை அகெயின்." },
{ id:"s84", en:"Finish your work.", ta_meaning:"உன் வேலையை முடி.", ta_sound:"ஃபினிஷ் யோர் வர்க்." },
{ id:"s85", en:"Begin the lesson.", ta_meaning:"பாடத்தை தொடங்கு.", ta_sound:"பிகின் த லெசன்." },

{ id:"s86", en:"Press the button.", ta_meaning:"பட்டனை அழுத்து.", ta_sound:"ப்ரெஸ் த பட்டன்." },
{ id:"s87", en:"Click here.", ta_meaning:"இங்கே கிளிக் செய்.", ta_sound:"க்ளிக் ஹியர்." },
{ id:"s88", en:"Open the website.", ta_meaning:"வலைத்தளத்தை திற.", ta_sound:"ஓபன் த வெப்சைட்." },
{ id:"s89", en:"Close the website.", ta_meaning:"வலைத்தளத்தை மூடு.", ta_sound:"க்ளோஸ் த வெப்சைட்." },
{ id:"s90", en:"Remember the password.", ta_meaning:"கடவுச்சொல்லை நினைவில் வை.", ta_sound:"ரிமெம்பர் த பாஸ்வேர்ட்." },

{ id:"s91", en:"Login now.", ta_meaning:"இப்போ உள்நுழை.", ta_sound:"லாகின் நவ்." },
{ id:"s92", en:"Logout later.", ta_meaning:"பிறகு வெளியேறு.", ta_sound:"லாக்அவுட் லேட்டர்." },
{ id:"s93", en:"I use mobile.", ta_meaning:"நான் மொபைல் பயன்படுத்துகிறேன்.", ta_sound:"ஐ யூஸ் மொபைல்." },
{ id:"s94", en:"Internet is fast.", ta_meaning:"இணையம் வேகமாக உள்ளது.", ta_sound:"இன்டர்நெட் இஸ் ஃபாஸ்ட்." },
{ id:"s95", en:"My computer is slow.", ta_meaning:"என் கம்ப்யூட்டர் மெதுவாக உள்ளது.", ta_sound:"மை கம்ப்யூட்டர் இஸ் ஸ்லோ." },

{ id:"s96", en:"What is the price?", ta_meaning:"விலை என்ன?", ta_sound:"வாட் இஸ் த ப்ரைஸ்?" },
{ id:"s97", en:"This is cheap.", ta_meaning:"இது குறைந்த விலை.", ta_sound:"திஸ் இஸ் சீப்." },
{ id:"s98", en:"This is costly.", ta_meaning:"இது அதிக விலை.", ta_sound:"திஸ் இஸ் காஸ்ட்லி." },
{ id:"s99", en:"Buy this one.", ta_meaning:"இதையே வாங்கு.", ta_sound:"பை திஸ் வன்." },
{ id:"s100", en:"Sell the old phone.", ta_meaning:"பழைய போனை விற்று.", ta_sound:"செல் த ஓல்ட் ஃபோன்." },

{ id:"s101", en:"Pay now.", ta_meaning:"இப்போ பணம் செலுத்து.", ta_sound:"பே நவ்." },
{ id:"s102", en:"I go to office.", ta_meaning:"நான் அலுவலகத்திற்கு போவேன்.", ta_sound:"ஐ கோ டு ஆஃபிஸ்." },
{ id:"s103", en:"I come back soon.", ta_meaning:"நான் சீக்கிரம் திரும்பி வருவேன்.", ta_sound:"ஐ கம் பேக் சூன்." },
{ id:"s104", en:"Answer the question.", ta_meaning:"கேள்விக்கு பதில் சொல்.", ta_sound:"ஆன்சர் த க்வெஸ்சன்." },
{ id:"s105", en:"Your answer is correct.", ta_meaning:"உன் பதில் சரி.", ta_sound:"யோர் ஆன்சர் இஸ் கரெக்ட்." },
// ===== Fluent Pack 3 (Words 205–304) =====
{
  id:"w205",
  en:"Eat",
  ta_meaning:"சாப்பிடு",
  ta_sound:"ஈட்",
  breakdown:[{part:"E",ta:"ஈ"},{part:"at",ta:"ட்"}],
  rule:"ea sound = ஈ",
  example_en:"Eat your food.",
  example_ta:"உன் உணவை சாப்பிடு."
},
{
  id:"w206",
  en:"Drink",
  ta_meaning:"குடி",
  ta_sound:"ட்ரிங்க்",
  breakdown:[{part:"Dri",ta:"ட்ரி"},{part:"nk",ta:"ங்"}],
  rule:"nk ending = ங்",
  example_en:"Drink water.",
  example_ta:"தண்ணீர் குடி."
},
{
  id:"w207",
  en:"Sleep",
  ta_meaning:"தூங்கு",
  ta_sound:"ஸ்லீப்",
  breakdown:[{part:"Sle",ta:"ஸ்லீ"},{part:"ep",ta:"ப்"}],
  rule:"ee = ஈ",
  example_en:"Sleep early.",
  example_ta:"முன்னதாக தூங்கு."
},
{
  id:"w208",
  en:"Wake",
  ta_meaning:"எழுந்திரு",
  ta_sound:"வேக்",
  breakdown:[{part:"Wa",ta:"வே"},{part:"ke",ta:"க்"}],
  rule:"magic e",
  example_en:"Wake up now.",
  example_ta:"இப்போ எழுந்திரு."
},
{
  id:"w209",
  en:"Walk",
  ta_meaning:"நட",
  ta_sound:"வாக்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"lk",ta:"க்"}],
  rule:"l can be silent (walk = வாக்)",
  example_en:"Walk slowly.",
  example_ta:"மெதுவாக நட."
},
{
  id:"w210",
  en:"Run",
  ta_meaning:"ஓடு",
  ta_sound:"ரன்",
  breakdown:[{part:"Ru",ta:"ர"},{part:"n",ta:"ன்"}],
  rule:"short vowel",
  example_en:"Run fast.",
  example_ta:"வேகமாக ஓடு."
},
{
  id:"w211",
  en:"Jump",
  ta_meaning:"தாவு",
  ta_sound:"ஜம்ப்",
  breakdown:[{part:"Ju",ta:"ஜ"},{part:"mp",ta:"ம்ப்"}],
  rule:"mp ending = ம்ப்",
  example_en:"Jump now.",
  example_ta:"இப்போ தாவு."
},
{
  id:"w212",
  en:"Play",
  ta_meaning:"விளையாடு",
  ta_sound:"ப்ளே",
  breakdown:[{part:"Pla",ta:"ப்ளே"},{part:"y",ta:""}],
  rule:"ay = ஏ",
  example_en:"Children play.",
  example_ta:"குழந்தைகள் விளையாடுகிறார்கள்."
},
{
  id:"w213",
  en:"Study",
  ta_meaning:"படி",
  ta_sound:"ஸ்டடி",
  breakdown:[{part:"Stu",ta:"ஸ்ட"},{part:"dy",ta:"டி"}],
  rule:"y ending = இ",
  example_en:"Study daily.",
  example_ta:"தினமும் படி."
},
{
  id:"w214",
  en:"Learn",
  ta_meaning:"கற்று",
  ta_sound:"லெர்ன்",
  breakdown:[{part:"Lea",ta:"லெ"},{part:"rn",ta:"ர்ன்"}],
  rule:"ear sound changes",
  example_en:"Learn English.",
  example_ta:"ஆங்கிலம் கற்று."
},
{
  id:"w215",
  en:"Teach",
  ta_meaning:"கற்பி",
  ta_sound:"டீச்",
  breakdown:[{part:"Tea",ta:"டீ"},{part:"ch",ta:"ச்"}],
  rule:"ch = ச",
  example_en:"Teach me English.",
  example_ta:"எனக்கு ஆங்கிலம் கற்பிக்கவும்."
},
{
  id:"w216",
  en:"Read",
  ta_meaning:"படி",
  ta_sound:"ரீட்",
  breakdown:[{part:"Rea",ta:"ரீ"},{part:"d",ta:"ட்"}],
  rule:"ea = ஈ",
  example_en:"Read this.",
  example_ta:"இதைக் படி."
},
{
  id:"w217",
  en:"Write",
  ta_meaning:"எழுது",
  ta_sound:"ரைட்",
  breakdown:[{part:"w",ta:"(silent)"},{part:"ri",ta:"ரை"},{part:"te",ta:"ட்"}],
  rule:"w silent in wr",
  example_en:"Write your name.",
  example_ta:"உன் பெயரை எழுது."
},
{
  id:"w218",
  en:"Speak",
  ta_meaning:"பேசு",
  ta_sound:"ஸ்பீக்",
  breakdown:[{part:"Sp",ta:"ஸ்ப"},{part:"eak",ta:"ீக்"}],
  rule:"ea = ஈ",
  example_en:"Speak slowly.",
  example_ta:"மெதுவாக பேசு."
},
{
  id:"w219",
  en:"Listen",
  ta_meaning:"கேள்",
  ta_sound:"லிஸன்",
  breakdown:[{part:"Lis",ta:"லிஸ்"},{part:"ten",ta:"ன்"}],
  rule:"t silent sometimes",
  example_en:"Listen carefully.",
  example_ta:"கவனமாக கேள்."
},
{
  id:"w220",
  en:"See",
  ta_meaning:"பார்",
  ta_sound:"சீ",
  breakdown:[{part:"Se",ta:"சி"},{part:"e",ta:"ீ"}],
  rule:"ee = ஈ",
  example_en:"See this.",
  example_ta:"இதை பார்."
},
{
  id:"w221",
  en:"Look",
  ta_meaning:"பார்",
  ta_sound:"லுக்",
  breakdown:[{part:"Lo",ta:"ல"},{part:"ok",ta:"க்"}],
  rule:"oo sometimes = உ",
  example_en:"Look at me.",
  example_ta:"என்னை பார்."
},
{
  id:"w222",
  en:"Watch",
  ta_meaning:"கவனித்து பார்",
  ta_sound:"வாட்ச்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"tch",ta:"ச்"}],
  rule:"tch = ச்",
  example_en:"Watch TV.",
  example_ta:"டிவி பார்."
},
{
  id:"w223",
  en:"Talk",
  ta_meaning:"பேசு",
  ta_sound:"டாக்",
  breakdown:[{part:"Ta",ta:"டா"},{part:"lk",ta:"க்"}],
  rule:"l silent (talk = டாக்)",
  example_en:"Talk to me.",
  example_ta:"என்னிடம் பேசு."
},
{
  id:"w224",
  en:"Say",
  ta_meaning:"சொல்",
  ta_sound:"சே",
  breakdown:[{part:"Sa",ta:"சே"},{part:"y",ta:""}],
  rule:"ay = ஏ",
  example_en:"Say hello.",
  example_ta:"ஹலோ சொல்லு."
},
{
  id:"w225",
  en:"Tell",
  ta_meaning:"சொல்லு",
  ta_sound:"டெல்",
  breakdown:[{part:"Te",ta:"டெ"},{part:"ll",ta:"ல்"}],
  rule:"double ll = ல்",
  example_en:"Tell me.",
  example_ta:"எனக்கு சொல்லு."
},
{
  id:"w226",
  en:"Ask",
  ta_meaning:"கேள்",
  ta_sound:"ஆஸ்க்",
  breakdown:[{part:"As",ta:"ஆஸ்"},{part:"k",ta:"க்"}],
  rule:"sk ending = ஸ்க்",
  example_en:"Ask a question.",
  example_ta:"ஒரு கேள்வி கேள்."
},
{
  id:"w227",
  en:"Answer",
  ta_meaning:"பதில்",
  ta_sound:"ஆன்சர்",
  breakdown:[{part:"An",ta:"ஆன்"},{part:"swer",ta:"சர்"}],
  rule:"w silent",
  example_en:"Answer me.",
  example_ta:"எனக்கு பதில் சொல்."
},
{
  id:"w228",
  en:"Call",
  ta_meaning:"கால் செய்",
  ta_sound:"கால்",
  breakdown:[{part:"Ca",ta:"கா"},{part:"ll",ta:"ல்"}],
  rule:"double ll = ல்",
  example_en:"Call me now.",
  example_ta:"இப்போ என்னை கால் செய்."
},
{
  id:"w229",
  en:"Send",
  ta_meaning:"அனுப்பு",
  ta_sound:"செண்ட்",
  breakdown:[{part:"Se",ta:"செ"},{part:"nd",ta:"ண்ட்"}],
  rule:"nd ending = ண்ட்",
  example_en:"Send message.",
  example_ta:"மெசேஜ் அனுப்பு."
},
{
  id:"w230",
  en:"Message",
  ta_meaning:"செய்தி",
  ta_sound:"மெசேஜ்",
  breakdown:[{part:"Mes",ta:"மெ"},{part:"sage",ta:"சேஜ்"}],
  rule:"ge = ஜ்",
  example_en:"Read my message.",
  example_ta:"என் செய்தியை படி."
},
{
  id:"w231",
  en:"Reply",
  ta_meaning:"பதில் அனுப்பு",
  ta_sound:"ரிப்ளை",
  breakdown:[{part:"Re",ta:"ரி"},{part:"ply",ta:"ப்ளை"}],
  rule:"y = ஐ",
  example_en:"Reply me.",
  example_ta:"எனக்கு பதில் அனுப்பு."
},
{
  id:"w232",
  en:"Again",
  ta_meaning:"மீண்டும்",
  ta_sound:"அகெயின்",
  breakdown:[{part:"A",ta:"அ"},{part:"gain",ta:"கெயின்"}],
  rule:"ai = எய்",
  example_en:"Say again.",
  example_ta:"மீண்டும் சொல்லு."
},
{
  id:"w233",
  en:"Thank",
  ta_meaning:"நன்றி",
  ta_sound:"தேங்க்",
  breakdown:[{part:"Tha",ta:"தே"},{part:"nk",ta:"ங்"}],
  rule:"nk = ங்",
  example_en:"Thank you.",
  example_ta:"நன்றி."
},
{
  id:"w234",
  en:"Sorry",
  ta_meaning:"மன்னிக்கவும்",
  ta_sound:"சாரி",
  breakdown:[{part:"Sor",ta:"சா"},{part:"ry",ta:"ரி"}],
  rule:"y ending = இ",
  example_en:"Sorry, I am late.",
  example_ta:"மன்னிக்கவும், நான் தாமதம்."
},
{
  id:"w235",
  en:"Welcome",
  ta_meaning:"வரவேற்கிறேன்",
  ta_sound:"வெல்கம்",
  breakdown:[{part:"Wel",ta:"வெல்"},{part:"come",ta:"கம்"}],
  rule:"o sound changes",
  example_en:"Welcome home.",
  example_ta:"வீட்டுக்கு வரவேற்கிறேன்."
},
{
  id:"w236",
  en:"Morning",
  ta_meaning:"காலை",
  ta_sound:"மார்னிங்",
  breakdown:[{part:"Mor",ta:"மார்"},{part:"ning",ta:"னிங்"}],
  rule:"ng sound",
  example_en:"Good morning.",
  example_ta:"காலை வணக்கம்."
},
{
  id:"w237",
  en:"Evening",
  ta_meaning:"மாலை",
  ta_sound:"ஈவ்னிங்",
  breakdown:[{part:"Eve",ta:"ஈவ்"},{part:"ning",ta:"னிங்"}],
  rule:"ng sound",
  example_en:"Good evening.",
  example_ta:"மாலை வணக்கம்."
},
{
  id:"w238",
  en:"Night",
  ta_meaning:"இரவு",
  ta_sound:"நைட்",
  breakdown:[{part:"Ni",ta:"நை"},{part:"ght",ta:"ட்"}],
  rule:"gh silent",
  example_en:"Good night.",
  example_ta:"இனிய இரவு."
},
{
  id:"w239",
  en:"Week",
  ta_meaning:"வாரம்",
  ta_sound:"வீக்",
  breakdown:[{part:"Wee",ta:"வீ"},{part:"k",ta:"க்"}],
  rule:"ee = ஈ",
  example_en:"One week.",
  example_ta:"ஒரு வாரம்."
},
{
  id:"w240",
  en:"Month",
  ta_meaning:"மாதம்",
  ta_sound:"மந்த்",
  breakdown:[{part:"Mo",ta:"ம"},{part:"nth",ta:"ந்த்"}],
  rule:"th = த",
  example_en:"This month.",
  example_ta:"இந்த மாதம்."
},

// (241–304) short common words
{
  id:"w241", en:"Good", ta_meaning:"நல்லது", ta_sound:"குட்",
  breakdown:[{part:"Go",ta:"கு"},{part:"od",ta:"ட்"}],
  rule:"oo sometimes = உ", example_en:"Good job.", example_ta:"நல்ல வேலை."
},
{
  id:"w242", en:"Better", ta_meaning:"மேலும் நல்ல", ta_sound:"பெட்டர்",
  breakdown:[{part:"Bet",ta:"பெட்"},{part:"ter",ta:"டர்"}],
  rule:"er = அர்", example_en:"Do better.", example_ta:"மேலும் நல்லா செய்."
},
{
  id:"w243", en:"Best", ta_meaning:"சிறந்த", ta_sound:"பெஸ்ட்",
  breakdown:[{part:"Be",ta:"பெ"},{part:"st",ta:"ஸ்ட்"}],
  rule:"st = ஸ்ட்", example_en:"You are best.", example_ta:"நீ சிறந்தவன்."
},
{
  id:"w244", en:"More", ta_meaning:"மேலும்", ta_sound:"மோர்",
  breakdown:[{part:"Mo",ta:"மோ"},{part:"re",ta:"ர்"}],
  rule:"magic e", example_en:"I need more.", example_ta:"எனக்கு மேலும் வேண்டும்."
},
{
  id:"w245", en:"Less", ta_meaning:"குறைவு", ta_sound:"லெஸ்",
  breakdown:[{part:"Le",ta:"லெ"},{part:"ss",ta:"ஸ்"}],
  rule:"ss = ஸ", example_en:"Less sugar.", example_ta:"சர்க்கரை குறைவு."
},
{
  id:"w246", en:"Many", ta_meaning:"பல", ta_sound:"மெனி",
  breakdown:[{part:"Ma",ta:"மெ"},{part:"ny",ta:"னி"}],
  rule:"y ending = இ", example_en:"Many people.", example_ta:"பல மக்கள்."
},
{
  id:"w247", en:"Few", ta_meaning:"சில", ta_sound:"ஃப்யூ",
  breakdown:[{part:"Fe",ta:"ஃபி"},{part:"w",ta:"யூ"}],
  rule:"ew = யூ", example_en:"Few words.", example_ta:"சில வார்த்தைகள்."
},
{
  id:"w248", en:"All", ta_meaning:"அனைத்து", ta_sound:"ஆல்",
  breakdown:[{part:"A",ta:"ஆ"},{part:"ll",ta:"ல்"}],
  rule:"ll = ல்", example_en:"All good.", example_ta:"அனைத்தும் நல்லது."
},
{
  id:"w249", en:"Some", ta_meaning:"சில", ta_sound:"சம்",
  breakdown:[{part:"So",ta:"ச"},{part:"me",ta:"ம்"}],
  rule:"o short", example_en:"Some water.", example_ta:"சில தண்ணீர்."
},
{
  id:"w250", en:"Same", ta_meaning:"அதே", ta_sound:"சேம்",
  breakdown:[{part:"Sa",ta:"சே"},{part:"me",ta:"ம்"}],
  rule:"magic e", example_en:"Same thing.", example_ta:"அதே விஷயம்."
},
{
  id:"w251", en:"Different", ta_meaning:"வேறு", ta_sound:"டிஃப்ரெண்ட்",
  breakdown:[{part:"Dif",ta:"டிஃப்"},{part:"fer",ta:"ஃபர்"},{part:"ent",ta:"எண்ட்"}],
  rule:"split syllables", example_en:"Different words.", example_ta:"வேறு வார்த்தைகள்."
},
{
  id:"w252", en:"Same", ta_meaning:"அதே", ta_sound:"சேம்",
  breakdown:[{part:"Sa",ta:"சே"},{part:"me",ta:"ம்"}],
  rule:"magic e", example_en:"Same again.", example_ta:"மீண்டும் அதே."
},
{
  id:"w253", en:"Open", ta_meaning:"திற", ta_sound:"ஓபன்",
  breakdown:[{part:"O",ta:"ஓ"},{part:"pen",ta:"பென்"}],
  rule:"split", example_en:"Open it.", example_ta:"அதை திற."
},
{
  id:"w254", en:"Close", ta_meaning:"மூடு", ta_sound:"க்ளோஸ்",
  breakdown:[{part:"Clo",ta:"க்ளோ"},{part:"se",ta:"ஸ்"}],
  rule:"se = ஸ", example_en:"Close it.", example_ta:"அதை மூடு."
},
{
  id:"w255", en:"Start", ta_meaning:"தொடங்கு", ta_sound:"ஸ்டார்ட்",
  breakdown:[{part:"St",ta:"ஸ்ட"},{part:"art",ta:"ார்ட்"}],
  rule:"st blend", example_en:"Start now.", example_ta:"இப்போ தொடங்கு."
},
{
  id:"w256", en:"Stop", ta_meaning:"நிறுத்து", ta_sound:"ஸ்டாப்",
  breakdown:[{part:"St",ta:"ஸ்ட"},{part:"op",ta:"ாப்"}],
  rule:"st blend", example_en:"Stop now.", example_ta:"இப்போ நிறுத்து."
},
{
  id:"w257", en:"Wait", ta_meaning:"காத்திரு", ta_sound:"வேய்ட்",
  breakdown:[{part:"Wa",ta:"வே"},{part:"it",ta:"ட்"}],
  rule:"ai = எய்", example_en:"Wait a minute.", example_ta:"ஒரு நிமிடம் காத்திரு."
},
{
  id:"w258", en:"Minute", ta_meaning:"நிமிடம்", ta_sound:"மினிட்",
  breakdown:[{part:"Mi",ta:"மி"},{part:"nute",ta:"னிட்"}],
  rule:"silent e", example_en:"One minute.", example_ta:"ஒரு நிமிடம்."
},
{
  id:"w259", en:"Second", ta_meaning:"விநாடி", ta_sound:"செகண்ட்",
  breakdown:[{part:"Se",ta:"செ"},{part:"cond",ta:"கண்ட்"}],
  rule:"nd = ண்ட்", example_en:"One second.", example_ta:"ஒரு விநாடி."
},
{
  id:"w260", en:"Hour", ta_meaning:"மணி", ta_sound:"ஆவர்",
  breakdown:[{part:"h",ta:"(silent)"},{part:"our",ta:"ஆவர்"}],
  rule:"h silent", example_en:"One hour.", example_ta:"ஒரு மணி நேரம்."
},
{
  id:"w261", en:"Day", ta_meaning:"நாள்", ta_sound:"டே",
  breakdown:[{part:"D",ta:"ட"},{part:"ay",ta:"ே"}],
  rule:"ay = ஏ", example_en:"One day.", example_ta:"ஒரு நாள்."
},
{
  id:"w262", en:"Week", ta_meaning:"வாரம்", ta_sound:"வீக்",
  breakdown:[{part:"Wee",ta:"வீ"},{part:"k",ta:"க்"}],
  rule:"ee = ஈ", example_en:"One week.", example_ta:"ஒரு வாரம்."
},
{
  id:"w263", en:"Year", ta_meaning:"ஆண்டு", ta_sound:"யியர்",
  breakdown:[{part:"Ye",ta:"யி"},{part:"ar",ta:"யர்"}],
  rule:"ear = இயர்", example_en:"One year.", example_ta:"ஒரு ஆண்டு."
},
{
  id:"w264", en:"Before", ta_meaning:"முன்பு", ta_sound:"பிஃபோர்",
  breakdown:[{part:"Be",ta:"பி"},{part:"fore",ta:"ஃபோர்"}],
  rule:"ore = ஓர்", example_en:"Before class.", example_ta:"வகுப்புக்கு முன்பு."
},
{
  id:"w265", en:"After", ta_meaning:"பிறகு", ta_sound:"ஆஃப்டர்",
  breakdown:[{part:"Af",ta:"ஆஃப்"},{part:"ter",ta:"டர்"}],
  rule:"er = அர்", example_en:"After class.", example_ta:"வகுப்புக்கு பிறகு."
},
{
  id:"w266", en:"First", ta_meaning:"முதல்", ta_sound:"ஃபர்ஸ்ட்",
  breakdown:[{part:"Fir",ta:"ஃபர்"},{part:"st",ta:"ஸ்ட்"}],
  rule:"st = ஸ்ட்", example_en:"First step.", example_ta:"முதல் படி."
},
{
  id:"w267", en:"Next", ta_meaning:"அடுத்து", ta_sound:"நெக்ஸ்ட்",
  breakdown:[{part:"Ne",ta:"நெ"},{part:"xt",ta:"க்ஸ்ட்"}],
  rule:"x = க்ஸ்", example_en:"Next page.", example_ta:"அடுத்த பக்கம்."
},
{
  id:"w268", en:"Last", ta_meaning:"கடைசி", ta_sound:"லாஸ்ட்",
  breakdown:[{part:"La",ta:"லா"},{part:"st",ta:"ஸ்ட்"}],
  rule:"st = ஸ்ட்", example_en:"Last one.", example_ta:"கடைசி ஒன்று."
},
{
  id:"w269", en:"Page", ta_meaning:"பக்கம்", ta_sound:"பேஜ்",
  breakdown:[{part:"Pa",ta:"பே"},{part:"ge",ta:"ஜ்"}],
  rule:"ge = ஜ்", example_en:"Open page.", example_ta:"பக்கத்தை திற."
},
{
  id:"w270", en:"Word", ta_meaning:"வார்த்தை", ta_sound:"வர்ட்",
  breakdown:[{part:"Wo",ta:"வ"},{part:"rd",ta:"ர்ட்"}],
  rule:"rd = ர்ட்", example_en:"One word.", example_ta:"ஒரு வார்த்தை."
},
{
  id:"w271", en:"Sentence", ta_meaning:"வாக்கியம்", ta_sound:"சென்டன்ஸ்",
  breakdown:[{part:"Sen",ta:"சென்"},{part:"tence",ta:"டன்ஸ்"}],
  rule:"ce = ஸ", example_en:"Read a sentence.", example_ta:"ஒரு வாக்கியம் படி."
},
{
  id:"w272", en:"Story", ta_meaning:"கதை", ta_sound:"ஸ்டோரி",
  breakdown:[{part:"Sto",ta:"ஸ்டோ"},{part:"ry",ta:"ரி"}],
  rule:"y ending = இ", example_en:"Tell a story.", example_ta:"ஒரு கதை சொல்லு."
},
{
  id:"w273", en:"Speak", ta_meaning:"பேசு", ta_sound:"ஸ்பீக்",
  breakdown:[{part:"Sp",ta:"ஸ்ப"},{part:"eak",ta:"ீக்"}],
  rule:"ea = ஈ", example_en:"Speak English.", example_ta:"ஆங்கிலம் பேசு."
},
{
  id:"w274", en:"English", ta_meaning:"ஆங்கிலம்", ta_sound:"இங்கிலிஷ்",
  breakdown:[{part:"En",ta:"இன்"},{part:"glish",ta:"க்லிஷ்"}],
  rule:"sh = ஷ", example_en:"English is easy.", example_ta:"ஆங்கிலம் எளிது."
},
{
  id:"w275", en:"Tamil", ta_meaning:"தமிழ்", ta_sound:"தமிழ்",
  breakdown:[{part:"Ta",ta:"த"},{part:"mil",ta:"மில்"}],
  rule:"basic", example_en:"Tamil is my language.", example_ta:"தமிழ் என் மொழி."
},
{
  id:"w276", en:"Sound", ta_meaning:"ஒலி", ta_sound:"சவுண்ட்",
  breakdown:[{part:"Sou",ta:"சவ்"},{part:"nd",ta:"ண்ட்"}],
  rule:"ou = அவ்", example_en:"Correct sound.", example_ta:"சரி ஒலி."
},
{
  id:"w277", en:"Silent", ta_meaning:"ஒலி இல்லாத", ta_sound:"சைலண்ட்",
  breakdown:[{part:"Si",ta:"சை"},{part:"lent",ta:"லண்ட்"}],
  rule:"silent letters", example_en:"K is silent.", example_ta:"K ஒலி இல்லை."
},
{
  id:"w278", en:"Rule", ta_meaning:"விதி", ta_sound:"ரூல்",
  breakdown:[{part:"Ru",ta:"ரூ"},{part:"le",ta:"ல்"}],
  rule:"oo = ஊ", example_en:"Follow the rule.", example_ta:"விதியை பின்பற்று."
},
{
  id:"w279", en:"Example", ta_meaning:"உதாரணம்", ta_sound:"எக்ஸாம்பிள்",
  breakdown:[{part:"Ex",ta:"எக்ஸ்"},{part:"am",ta:"ஆம்"},{part:"ple",ta:"பிள்"}],
  rule:"ple = பிள்", example_en:"See example.", example_ta:"உதாரணம் பார்."
},
{
  id:"w280", en:"Practice", ta_meaning:"பயிற்சி", ta_sound:"ப்ராக்டிஸ்",
  breakdown:[{part:"Prac",ta:"ப்ராக்"},{part:"tice",ta:"டிஸ்"}],
  rule:"ce = ஸ", example_en:"Practice everyday.", example_ta:"தினமும் பயிற்சி செய்."
},
{
  id:"w281", en:"Everyday", ta_meaning:"தினமும்", ta_sound:"எவ்ரிடே",
  breakdown:[{part:"Eve",ta:"எவ்"},{part:"ry",ta:"ரி"},{part:"day",ta:"டே"}],
  rule:"day = டே", example_en:"Practice everyday.", example_ta:"தினமும் பயிற்சி செய்."
},
{
  id:"w282", en:"Perfect", ta_meaning:"சரியாக", ta_sound:"பர்ஃபெக்ட்",
  breakdown:[{part:"Per",ta:"பர்"},{part:"fect",ta:"ஃபெக்ட்"}],
  rule:"ct = க்ட்", example_en:"Perfect answer.", example_ta:"சரியான பதில்."
},
{
  id:"w283", en:"Improve", ta_meaning:"மேம்படுத்து", ta_sound:"இம்ப்ரூவ்",
  breakdown:[{part:"Im",ta:"இம்"},{part:"prove",ta:"ப்ரூவ்"}],
  rule:"magic e", example_en:"Improve your English.", example_ta:"உன் ஆங்கிலத்தை மேம்படுத்து."
},
{
  id:"w284", en:"Fluent", ta_meaning:"தடையில்லாமல் பேசும்", ta_sound:"ஃப்ளூஎன்ட்",
  breakdown:[{part:"Flu",ta:"ஃப்ளூ"},{part:"ent",ta:"என்ட்"}],
  rule:"split", example_en:"Speak fluent English.", example_ta:"தடையில்லாமல் ஆங்கிலம் பேசு."
},
{
  id:"w285", en:"Slow", ta_meaning:"மெது", ta_sound:"ஸ்லோ",
  breakdown:[{part:"Sl",ta:"ஸ்ல"},{part:"ow",ta:"ோ"}],
  rule:"ow = ஓ", example_en:"Speak slow.", example_ta:"மெதுவாக பேசு."
},
{
  id:"w286", en:"Fast", ta_meaning:"வேகம்", ta_sound:"ஃபாஸ்ட்",
  breakdown:[{part:"Fa",ta:"ஃபா"},{part:"st",ta:"ஸ்ட்"}],
  rule:"st = ஸ்ட்", example_en:"Don't speak fast.", example_ta:"வேகமாக பேசாதே."
},
{
  id:"w287", en:"Correct", ta_meaning:"சரி", ta_sound:"கரெக்ட்",
  breakdown:[{part:"Cor",ta:"க"},{part:"rect",ta:"ரெக்ட்"}],
  rule:"ct = க்ட்", example_en:"Correct pronunciation.", example_ta:"சரி உச்சரிப்பு."
},
{
  id:"w288", en:"Pronunciation", ta_meaning:"உச்சரிப்பு", ta_sound:"ப்ரனன்சியேஷன்",
  breakdown:[{part:"Pro",ta:"ப்ர"},{part:"nun",ta:"னன்"},{part:"ci",ta:"சி"},{part:"a",ta:"ே"},{part:"tion",ta:"ஷன்"}],
  rule:"tion = ஷன்",
  example_en:"Pronunciation is important.",
  example_ta:"உச்சரிப்பு முக்கியம்."
},
{
  id:"w289", en:"Simple", ta_meaning:"எளிய", ta_sound:"சிம்பிள்",
  breakdown:[{part:"Sim",ta:"சிம்"},{part:"ple",ta:"பிள்"}],
  rule:"ple = பிள்", example_en:"Simple words.", example_ta:"எளிய வார்த்தைகள்."
},
{
  id:"w290", en:"Difficult", ta_meaning:"கடினம்", ta_sound:"டிஃபிகல்ட்",
  breakdown:[{part:"Dif",ta:"டிஃப்"},{part:"fi",ta:"ஃபி"},{part:"cult",ta:"கல்ட்"}],
  rule:"lt = ல்ட்", example_en:"This is difficult.", example_ta:"இது கடினம்."
},
{
  id:"w291", en:"Goodbye", ta_meaning:"பிரியாவிடை", ta_sound:"குட்பை",
  breakdown:[{part:"Good",ta:"குட்"},{part:"bye",ta:"பை"}],
  rule:"y = ஐ", example_en:"Goodbye!", example_ta:"பிரியாவிடை!"
},
{
  id:"w292", en:"Hello", ta_meaning:"வணக்கம்", ta_sound:"ஹலோ",
  breakdown:[{part:"He",ta:"ஹ"},{part:"llo",ta:"லோ"}],
  rule:"double l", example_en:"Hello!", example_ta:"வணக்கம்!"
},
{
  id:"w293", en:"Please", ta_meaning:"தயவு செய்து", ta_sound:"ப்ளீஸ்",
  breakdown:[{part:"Ple",ta:"ப்ளீ"},{part:"ase",ta:"ஸ்"}],
  rule:"ea = ஈ", example_en:"Please wait.", example_ta:"தயவு செய்து காத்திருங்கள்."
},
{
  id:"w294", en:"Sorry", ta_meaning:"மன்னிக்கவும்", ta_sound:"சாரி",
  breakdown:[{part:"Sor",ta:"சா"},{part:"ry",ta:"ரி"}],
  rule:"y ending = இ", example_en:"Sorry.", example_ta:"மன்னிக்கவும்."
},
{
  id:"w295", en:"Thank you", ta_meaning:"நன்றி", ta_sound:"தேங்க் யூ",
  breakdown:[{part:"Thank",ta:"தேங்க்"},{part:"you",ta:"யூ"}],
  rule:"nk = ங்", example_en:"Thank you!", example_ta:"நன்றி!"
},
{
  id:"w296", en:"Good morning", ta_meaning:"காலை வணக்கம்", ta_sound:"குட் மார்னிங்",
  breakdown:[{part:"Good",ta:"குட்"},{part:"morning",ta:"மார்னிங்"}],
  rule:"ng sound", example_en:"Good morning!", example_ta:"காலை வணக்கம்!"
},
{
  id:"w297", en:"Good night", ta_meaning:"இனிய இரவு", ta_sound:"குட் நைட்",
  breakdown:[{part:"Good",ta:"குட்"},{part:"night",ta:"நைட்"}],
  rule:"gh silent", example_en:"Good night!", example_ta:"இனிய இரவு!"
},
{
  id:"w298", en:"How", ta_meaning:"எப்படி", ta_sound:"ஹவ்",
  breakdown:[{part:"Ho",ta:"ஹ"},{part:"w",ta:"வ்"}],
  rule:"ow = அவ்", example_en:"How are you?", example_ta:"நீ எப்படி இருக்கிறாய்?"
},
{
  id:"w299", en:"What", ta_meaning:"என்ன", ta_sound:"வாட்",
  breakdown:[{part:"Wh",ta:"வ"},{part:"at",ta:"ட்"}],
  rule:"wh = வ", example_en:"What is this?", example_ta:"இது என்ன?"
},
{
  id:"w300", en:"Where", ta_meaning:"எங்கே", ta_sound:"வேர்",
  breakdown:[{part:"Wh",ta:"வ"},{part:"ere",ta:"ேர்"}],
  rule:"wh = வ", example_en:"Where are you?", example_ta:"நீ எங்கே இருக்கிறாய்?"
},
{
  id:"w301", en:"When", ta_meaning:"எப்போது", ta_sound:"வென்",
  breakdown:[{part:"Wh",ta:"வ"},{part:"en",ta:"ென்"}],
  rule:"wh = வ", example_en:"When will you come?", example_ta:"நீ எப்போது வருவாய்?"
},
{
  id:"w302", en:"Why", ta_meaning:"ஏன்", ta_sound:"வை",
  breakdown:[{part:"Wh",ta:"வ"},{part:"y",ta:"ை"}],
  rule:"wh = வ", example_en:"Why are you sad?", example_ta:"நீ ஏன் சோகமாக இருக்கிறாய்?"
},
{
  id:"w303", en:"Who", ta_meaning:"யார்", ta_sound:"ஹூ",
  breakdown:[{part:"Wh",ta:"ஹ"},{part:"o",ta:"ூ"}],
  rule:"who = ஹூ", example_en:"Who is he?", example_ta:"அவன் யார்?"
},
{
  id:"w304", en:"Which", ta_meaning:"எது", ta_sound:"விச்",
  breakdown:[{part:"Wh",ta:"வ"},{part:"ich",ta:"ிச்"}],
  rule:"ch = ச", example_en:"Which one?", example_ta:"எது?"
},
// ===== Fluent Pack 3 (Sentences 106–155) =====
{ id:"s106", en:"Eat your food.", ta_meaning:"உன் உணவை சாப்பிடு.", ta_sound:"ஈட் யோர் ஃபூட்." },
{ id:"s107", en:"Drink water now.", ta_meaning:"இப்போ தண்ணீர் குடி.", ta_sound:"ட்ரிங்க் வாட்டர் நவ்." },
{ id:"s108", en:"Sleep early today.", ta_meaning:"இன்று முன்னதாக தூங்கு.", ta_sound:"ஸ்லீப் எர்லி டுடே." },
{ id:"s109", en:"Wake up now.", ta_meaning:"இப்போ எழுந்திரு.", ta_sound:"வேக் அப் நவ்." },
{ id:"s110", en:"Walk slowly.", ta_meaning:"மெதுவாக நட.", ta_sound:"வாக் ஸ்லோலி." },

{ id:"s111", en:"Run fast.", ta_meaning:"வேகமாக ஓடு.", ta_sound:"ரன் ஃபாஸ்ட்." },
{ id:"s112", en:"Jump now.", ta_meaning:"இப்போ தாவு.", ta_sound:"ஜம்ப் நவ்." },
{ id:"s113", en:"Children play outside.", ta_meaning:"குழந்தைகள் வெளியே விளையாடுகிறார்கள்.", ta_sound:"சில்ட்ரன் ப்ளே அவுட்சைட்." },
{ id:"s114", en:"Study everyday.", ta_meaning:"தினமும் படி.", ta_sound:"ஸ்டடி எவ்ரிடே." },
{ id:"s115", en:"Learn English daily.", ta_meaning:"தினமும் ஆங்கிலம் கற்று.", ta_sound:"லெர்ன் இங்கிலிஷ் டெய்லி." },

{ id:"s116", en:"Teach me slowly.", ta_meaning:"மெதுவாக கற்பிக்கவும்.", ta_sound:"டீச் மீ ஸ்லோலி." },
{ id:"s117", en:"Read this word.", ta_meaning:"இந்த வார்த்தையை படி.", ta_sound:"ரீட் திஸ் வர்ட்." },
{ id:"s118", en:"Write this sentence.", ta_meaning:"இந்த வாக்கியத்தை எழுது.", ta_sound:"ரைட் திஸ் சென்டன்ஸ்." },
{ id:"s119", en:"Speak in English.", ta_meaning:"ஆங்கிலத்தில் பேசு.", ta_sound:"ஸ்பீக் இன் இங்கிலிஷ்." },
{ id:"s120", en:"Listen carefully.", ta_meaning:"கவனமாக கேள்.", ta_sound:"லிஸன் கேர் ஃபுல்லி." },

{ id:"s121", en:"Look at me.", ta_meaning:"என்னை பார்.", ta_sound:"லுக் அட் மீ." },
{ id:"s122", en:"Watch TV now.", ta_meaning:"இப்போ டிவி பார்.", ta_sound:"வாட்ச் டிவி நவ்." },
{ id:"s123", en:"Talk to me.", ta_meaning:"என்னிடம் பேசு.", ta_sound:"டாக் டு மீ." },
{ id:"s124", en:"Say hello.", ta_meaning:"ஹலோ சொல்லு.", ta_sound:"சே ஹலோ." },
{ id:"s125", en:"Tell me the truth.", ta_meaning:"எனக்கு உண்மை சொல்லு.", ta_sound:"டெல் மீ த ட்ரூத்." },

{ id:"s126", en:"Ask a question.", ta_meaning:"ஒரு கேள்வி கேள்.", ta_sound:"ஆஸ்க் அ க்வெஸ்சன்." },
{ id:"s127", en:"Answer me now.", ta_meaning:"இப்போ எனக்கு பதில் சொல்.", ta_sound:"ஆன்சர் மீ நவ்." },
{ id:"s128", en:"Call me now.", ta_meaning:"இப்போ என்னை கால் செய்.", ta_sound:"கால் மீ நவ்." },
{ id:"s129", en:"Send a message.", ta_meaning:"ஒரு மெசேஜ் அனுப்பு.", ta_sound:"செண்ட் அ மெசேஜ்." },
{ id:"s130", en:"Reply me soon.", ta_meaning:"சீக்கிரம் பதில் அனுப்பு.", ta_sound:"ரிப்ளை மீ சூன்." },

{ id:"s131", en:"Say it again.", ta_meaning:"மீண்டும் சொல்லு.", ta_sound:"சே இட் அகெயின்." },
{ id:"s132", en:"Thank you so much.", ta_meaning:"மிகவும் நன்றி.", ta_sound:"தேங்க் யூ சோ மச்." },
{ id:"s133", en:"Sorry, I am late.", ta_meaning:"மன்னிக்கவும், நான் தாமதம்.", ta_sound:"சாரி ஐ ஆம் லேட்." },
{ id:"s134", en:"Welcome to my home.", ta_meaning:"என் வீட்டுக்கு வரவேற்கிறேன்.", ta_sound:"வெல்கம் டு மை ஹோம்." },
{ id:"s135", en:"Good night, sleep well.", ta_meaning:"இனிய இரவு, நன்றாக தூங்கு.", ta_sound:"குட் நைட் ஸ்லீப் வெல்." },

{ id:"s136", en:"I want to improve.", ta_meaning:"நான் மேம்படுத்த வேண்டும்.", ta_sound:"ஐ வான்ட் டு இம்ப்ரூவ்." },
{ id:"s137", en:"Practice makes perfect.", ta_meaning:"பயிற்சி தான் முழுமை தரும்.", ta_sound:"ப்ராக்டிஸ் மேக்ஸ் பர்ஃபெக்ட்." },
{ id:"s138", en:"Speak slowly and clearly.", ta_meaning:"மெதுவாகவும் தெளிவாகவும் பேசு.", ta_sound:"ஸ்பீக் ஸ்லோலி அண்ட் கிளியர்லி." },
{ id:"s139", en:"English is simple.", ta_meaning:"ஆங்கிலம் எளிது.", ta_sound:"இங்கிலிஷ் இஸ் சிம்பிள்." },
{ id:"s140", en:"Tamil helps me.", ta_meaning:"தமிழ் எனக்கு உதவுகிறது.", ta_sound:"தமிழ் ஹெல்ப்ஸ் மீ." },

{ id:"s141", en:"What is this?", ta_meaning:"இது என்ன?", ta_sound:"வாட் இஸ் திஸ்?" },
{ id:"s142", en:"Where are you?", ta_meaning:"நீ எங்கே இருக்கிறாய்?", ta_sound:"வேர் ஆர் யூ?" },
{ id:"s143", en:"When will you come?", ta_meaning:"நீ எப்போது வருவாய்?", ta_sound:"வென் வில் யூ கம்?" },
{ id:"s144", en:"Why are you sad?", ta_meaning:"நீ ஏன் சோகமாக இருக்கிறாய்?", ta_sound:"வை ஆர் யூ சேட்?" },
{ id:"s145", en:"Who is he?", ta_meaning:"அவன் யார்?", ta_sound:"ஹூ இஸ் ஹீ?" },

{ id:"s146", en:"Which one do you want?", ta_meaning:"எதை நீ வேண்டும்?", ta_sound:"விச் வன் டு யூ வான்ட்?" },
{ id:"s147", en:"I want this one.", ta_meaning:"எனக்கு இதுதான் வேண்டும்.", ta_sound:"ஐ வான்ட் திஸ் வன்." },
{ id:"s148", en:"I don't want that.", ta_meaning:"எனக்கு அது வேண்டாம்.", ta_sound:"ஐ டோன்ட் வான்ட் தாட்." },
{ id:"s149", en:"This is my first lesson.", ta_meaning:"இது என் முதல் பாடம்.", ta_sound:"திஸ் இஸ் மை ஃபர்ஸ்ட் லெசன்." },
{ id:"s150", en:"This is the last page.", ta_meaning:"இது கடைசி பக்கம்.", ta_sound:"திஸ் இஸ் த லாஸ்ட் பேஜ்." },

{ id:"s151", en:"Next page, please.", ta_meaning:"அடுத்த பக்கம் தயவு செய்து.", ta_sound:"நெக்ஸ்ட் பேஜ் ப்ளீஸ்." },
{ id:"s152", en:"I will learn English.", ta_meaning:"நான் ஆங்கிலம் கற்றுக்கொள்வேன்.", ta_sound:"ஐ வில் லெர்ன் இங்கிலிஷ்." },
{ id:"s153", en:"I will speak English.", ta_meaning:"நான் ஆங்கிலம் பேசுவேன்.", ta_sound:"ஐ வில் ஸ்பீக் இங்கிலிஷ்." },
{ id:"s154", en:"I will read English.", ta_meaning:"நான் ஆங்கிலம் படிப்பேன்.", ta_sound:"ஐ வில் ரீட் இங்கிலிஷ்." },
{ id:"s155", en:"I will write English.", ta_meaning:"நான் ஆங்கிலம் எழுதுவேன்.", ta_sound:"ஐ வில் ரைட் இங்கிலிஷ்." },
// ===== Fluent Pack 4 (Words 305–404) =====
{
  id:"w305",
  en:"Knife",
  ta_meaning:"கத்தி",
  ta_sound:"நைஃப்",
  breakdown:[{part:"k",ta:"(silent)"},{part:"ni",ta:"நை"},{part:"fe",ta:"ஃப்"}],
  rule:"k silent in kn- words",
  example_en:"This knife is sharp.",
  example_ta:"இந்த கத்தி கூர்மையாக உள்ளது."
},
{
  id:"w306",
  en:"Know",
  ta_meaning:"தெரியும்",
  ta_sound:"நோ",
  breakdown:[{part:"k",ta:"(silent)"},{part:"now",ta:"நோ"}],
  rule:"k silent in know",
  example_en:"I know you.",
  example_ta:"நான் உன்னை அறிவேன்."
},
{
  id:"w307",
  en:"Knee",
  ta_meaning:"முட்டி (கால் மூட்டு)",
  ta_sound:"நீ",
  breakdown:[{part:"k",ta:"(silent)"},{part:"nee",ta:"நீ"}],
  rule:"k silent + ee = ஈ",
  example_en:"My knee hurts.",
  example_ta:"என் முட்டி வலிக்கிறது."
},
{
  id:"w308",
  en:"Write",
  ta_meaning:"எழுது",
  ta_sound:"ரைட்",
  breakdown:[{part:"w",ta:"(silent)"},{part:"rite",ta:"ரைட்"}],
  rule:"w silent in wr- words",
  example_en:"Write your name.",
  example_ta:"உன் பெயரை எழுது."
},
{
  id:"w309",
  en:"Wrong",
  ta_meaning:"தவறு",
  ta_sound:"ராங்",
  breakdown:[{part:"w",ta:"(silent)"},{part:"rong",ta:"ராங்"}],
  rule:"w silent in wr- words",
  example_en:"This is wrong.",
  example_ta:"இது தவறு."
},
{
  id:"w310",
  en:"Wrap",
  ta_meaning:"மூடு / சுற்று",
  ta_sound:"ரேப்",
  breakdown:[{part:"w",ta:"(silent)"},{part:"rap",ta:"ரேப்"}],
  rule:"w silent in wrap",
  example_en:"Wrap the gift.",
  example_ta:"பரிசை சுற்றி மூடு."
},
{
  id:"w311",
  en:"Comb",
  ta_meaning:"சீப்பு",
  ta_sound:"கோம்",
  breakdown:[{part:"Co",ta:"கோ"},{part:"mb",ta:"ம்"}],
  rule:"b silent in -mb",
  example_en:"Use a comb.",
  example_ta:"சீப்பு பயன்படுத்து."
},
{
  id:"w312",
  en:"Thumb",
  ta_meaning:"பெருவிரல்",
  ta_sound:"தம்",
  breakdown:[{part:"Thu",ta:"த"},{part:"mb",ta:"ம்"}],
  rule:"b silent in thumb",
  example_en:"My thumb is okay.",
  example_ta:"என் பெருவிரல் சரி."
},
{
  id:"w313",
  en:"Climb",
  ta_meaning:"ஏறு",
  ta_sound:"க்ளைம்",
  breakdown:[{part:"Cli",ta:"க்ளை"},{part:"mb",ta:"ம்"}],
  rule:"b silent in climb",
  example_en:"Climb slowly.",
  example_ta:"மெதுவாக ஏறு."
},
{
  id:"w314",
  en:"Light",
  ta_meaning:"ஒளி",
  ta_sound:"லைட்",
  breakdown:[{part:"Li",ta:"லை"},{part:"ght",ta:"ட்"}],
  rule:"gh silent in light",
  example_en:"Turn on the light.",
  example_ta:"லைட்டை ஆன் செய்."
},
{
  id:"w315",
  en:"Night",
  ta_meaning:"இரவு",
  ta_sound:"நைட்",
  breakdown:[{part:"Ni",ta:"நை"},{part:"ght",ta:"ட்"}],
  rule:"gh silent",
  example_en:"Good night.",
  example_ta:"இனிய இரவு."
},
{
  id:"w316",
  en:"Right",
  ta_meaning:"சரி / வலது",
  ta_sound:"ரைட்",
  breakdown:[{part:"Ri",ta:"ரை"},{part:"ght",ta:"ட்"}],
  rule:"gh silent",
  example_en:"You are right.",
  example_ta:"நீ சரி."
},
{
  id:"w317",
  en:"Eight",
  ta_meaning:"எட்டு",
  ta_sound:"எய்ட்",
  breakdown:[{part:"Ei",ta:"எய்"},{part:"ght",ta:"ட்"}],
  rule:"gh silent + ei = எய்",
  example_en:"I have eight books.",
  example_ta:"எனக்கு எட்டு புத்தகங்கள் உள்ளன."
},
{
  id:"w318",
  en:"Laugh",
  ta_meaning:"சிரி",
  ta_sound:"லாஃப்",
  breakdown:[{part:"Lau",ta:"லா"},{part:"gh",ta:"(silent)"},{part:"f",ta:"ஃப்"}],
  rule:"gh silent in laugh",
  example_en:"Laugh loudly.",
  example_ta:"சத்தமாக சிரி."
},
{
  id:"w319",
  en:"Daughter",
  ta_meaning:"மகள்",
  ta_sound:"டாட்டர்",
  breakdown:[{part:"Dau",ta:"டா"},{part:"gh",ta:"(silent)"},{part:"ter",ta:"டர்"}],
  rule:"gh silent in daughter",
  example_en:"My daughter is smart.",
  example_ta:"என் மகள் புத்திசாலி."
},
{
  id:"w320",
  en:"Thought",
  ta_meaning:"எண்ணம்",
  ta_sound:"தாட்",
  breakdown:[{part:"Thou",ta:"தா"},{part:"ght",ta:"ட்"}],
  rule:"gh silent",
  example_en:"Good thought.",
  example_ta:"நல்ல எண்ணம்."
},
{
  id:"w321",
  en:"Phone",
  ta_meaning:"தொலைபேசி",
  ta_sound:"ஃபோன்",
  breakdown:[{part:"Ph",ta:"ஃப"},{part:"one",ta:"ோன்"}],
  rule:"ph = ஃப",
  example_en:"My phone is new.",
  example_ta:"என் போன் புதியது."
},
{
  id:"w322",
  en:"Photo",
  ta_meaning:"புகைப்படம்",
  ta_sound:"ஃபோட்டோ",
  breakdown:[{part:"Ph",ta:"ஃப"},{part:"o",ta:"ோ"},{part:"to",ta:"டோ"}],
  rule:"ph = ஃப",
  example_en:"Take a photo.",
  example_ta:"ஒரு புகைப்படம் எடு."
},
{
  id:"w323",
  en:"Elephant",
  ta_meaning:"யானை",
  ta_sound:"எலிஃபண்ட்",
  breakdown:[{part:"E",ta:"எ"},{part:"le",ta:"லி"},{part:"phant",ta:"ஃபண்ட்"}],
  rule:"ph = ஃப",
  example_en:"Elephant is big.",
  example_ta:"யானை பெரியது."
},
{
  id:"w324",
  en:"School",
  ta_meaning:"பள்ளி",
  ta_sound:"ஸ்கூல்",
  breakdown:[{part:"Sch",ta:"ஸ்க"},{part:"ool",ta:"ூல்"}],
  rule:"oo = ஊ",
  example_en:"I go to school.",
  example_ta:"நான் பள்ளிக்கு போகிறேன்."
},
{
  id:"w325",
  en:"Chair",
  ta_meaning:"நாற்காலி",
  ta_sound:"சேர்",
  breakdown:[{part:"Ch",ta:"ச"},{part:"air",ta:"ேர்"}],
  rule:"ch = ச",
  example_en:"Sit on the chair.",
  example_ta:"நாற்காலியில் உட்கார்."
},
{
  id:"w326",
  en:"Ship",
  ta_meaning:"கப்பல்",
  ta_sound:"ஷிப்",
  breakdown:[{part:"Sh",ta:"ஷ"},{part:"ip",ta:"ிப்"}],
  rule:"sh = ஷ",
  example_en:"The ship is big.",
  example_ta:"கப்பல் பெரியது."
},
{
  id:"w327",
  en:"Shop",
  ta_meaning:"கடை",
  ta_sound:"ஷாப்",
  breakdown:[{part:"Sh",ta:"ஷ"},{part:"op",ta:"ாப்"}],
  rule:"sh = ஷ",
  example_en:"Go to the shop.",
  example_ta:"கடைக்கு போ."
},
{
  id:"w328",
  en:"Fish",
  ta_meaning:"மீன்",
  ta_sound:"ஃபிஷ்",
  breakdown:[{part:"Fi",ta:"ஃபி"},{part:"sh",ta:"ஷ்"}],
  rule:"sh = ஷ",
  example_en:"Fish is tasty.",
  example_ta:"மீன் ருசியாக உள்ளது."
},
{
  id:"w329",
  en:"Dish",
  ta_meaning:"உணவு தட்டு",
  ta_sound:"டிஷ்",
  breakdown:[{part:"Di",ta:"டி"},{part:"sh",ta:"ஷ்"}],
  rule:"sh = ஷ",
  example_en:"Wash the dish.",
  example_ta:"தட்டையை கழுவு."
},
{
  id:"w330",
  en:"Brush",
  ta_meaning:"பிரஷ்",
  ta_sound:"ப்ரஷ்",
  breakdown:[{part:"Bru",ta:"ப்ர"},{part:"sh",ta:"ஷ்"}],
  rule:"sh = ஷ",
  example_en:"Brush your teeth.",
  example_ta:"பற்களை துலக்கு."
},
{
  id:"w331",
  en:"Watch",
  ta_meaning:"கடிகாரம் / பாரு",
  ta_sound:"வாட்ச்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"tch",ta:"ச்"}],
  rule:"tch = ச்",
  example_en:"I have a watch.",
  example_ta:"எனக்கு ஒரு கடிகாரம் உள்ளது."
},
{
  id:"w332",
  en:"Catch",
  ta_meaning:"பிடி",
  ta_sound:"கேச்",
  breakdown:[{part:"Ca",ta:"கே"},{part:"tch",ta:"ச்"}],
  rule:"tch = ச்",
  example_en:"Catch the ball.",
  example_ta:"பந்தை பிடி."
},
{
  id:"w333",
  en:"Match",
  ta_meaning:"போட்டி / தீப்பெட்டி",
  ta_sound:"மேச்",
  breakdown:[{part:"Ma",ta:"மே"},{part:"tch",ta:"ச்"}],
  rule:"tch = ச்",
  example_en:"We won the match.",
  example_ta:"நாம் போட்டியில் ஜெயித்தோம்."
},
{
  id:"w334",
  en:"This",
  ta_meaning:"இது",
  ta_sound:"திஸ்",
  breakdown:[{part:"Th",ta:"த"},{part:"is",ta:"ிஸ்"}],
  rule:"th = த",
  example_en:"This is good.",
  example_ta:"இது நல்லது."
},
{
  id:"w335",
  en:"That",
  ta_meaning:"அது",
  ta_sound:"தாட்",
  breakdown:[{part:"Th",ta:"த"},{part:"at",ta:"ாட்"}],
  rule:"th = த",
  example_en:"That is my book.",
  example_ta:"அது என் புத்தகம்."
},
{
  id:"w336",
  en:"Think",
  ta_meaning:"யோசி",
  ta_sound:"திங்க்",
  breakdown:[{part:"Th",ta:"த"},{part:"ink",ta:"ிங்க்"}],
  rule:"th = த",
  example_en:"Think before you speak.",
  example_ta:"பேசுவதற்கு முன் யோசி."
},
{
  id:"w337",
  en:"Three",
  ta_meaning:"மூன்று",
  ta_sound:"த்ரீ",
  breakdown:[{part:"Th",ta:"த"},{part:"ree",ta:"ரீ"}],
  rule:"th = த + ee = ஈ",
  example_en:"I have three pens.",
  example_ta:"எனக்கு மூன்று பேன்கள் உள்ளன."
},
{
  id:"w338",
  en:"Mother",
  ta_meaning:"அம்மா",
  ta_sound:"மதர்",
  breakdown:[{part:"Mo",ta:"ம"},{part:"ther",ta:"தர்"}],
  rule:"th = த",
  example_en:"My mother is kind.",
  example_ta:"என் அம்மா நல்லவர்."
},
{
  id:"w339",
  en:"Father",
  ta_meaning:"அப்பா",
  ta_sound:"ஃபாதர்",
  breakdown:[{part:"Fa",ta:"ஃபா"},{part:"ther",ta:"தர்"}],
  rule:"th = த",
  example_en:"My father works.",
  example_ta:"என் அப்பா வேலை செய்கிறார்."
},
{
  id:"w340",
  en:"Brother",
  ta_meaning:"அண்ணன்/தம்பி",
  ta_sound:"ப்ரதர்",
  breakdown:[{part:"Bro",ta:"ப்ர"},{part:"ther",ta:"தர்"}],
  rule:"th = த",
  example_en:"My brother is tall.",
  example_ta:"என் அண்ணன் உயரம்."
},

// (341–404) more common + rules
{
  id:"w341", en:"The", ta_meaning:"அந்த/இது (article)", ta_sound:"த",
  breakdown:[{part:"Th",ta:"த"},{part:"e",ta:""}],
  rule:"the = த/தி (context)", example_en:"The boy is here.", example_ta:"அந்த பையன் இங்கே இருக்கிறான்."
},
{
  id:"w342", en:"There", ta_meaning:"அங்கே", ta_sound:"தேர்",
  breakdown:[{part:"Th",ta:"த"},{part:"ere",ta:"ேர்"}],
  rule:"th = த", example_en:"Go there.", example_ta:"அங்கே போ."
},
{
  id:"w343", en:"Then", ta_meaning:"அப்புறம்", ta_sound:"தென்",
  breakdown:[{part:"Th",ta:"த"},{part:"en",ta:"ென்"}],
  rule:"th = த", example_en:"Eat, then sleep.", example_ta:"சாப்பிட்டு அப்புறம் தூங்கு."
},
{
  id:"w344", en:"Thin", ta_meaning:"மெலிந்த", ta_sound:"தின்",
  breakdown:[{part:"Th",ta:"த"},{part:"in",ta:"ின்"}],
  rule:"th = த", example_en:"He is thin.", example_ta:"அவன் மெலிந்தவன்."
},
{
  id:"w345", en:"Thick", ta_meaning:"தடிமன்", ta_sound:"திக்",
  breakdown:[{part:"Th",ta:"த"},{part:"ick",ta:"ிக்"}],
  rule:"th = த", example_en:"This book is thick.", example_ta:"இந்த புத்தகம் தடிமன்."
},
{
  id:"w346", en:"Thumb", ta_meaning:"பெருவிரல்", ta_sound:"தம்",
  breakdown:[{part:"Thu",ta:"த"},{part:"mb",ta:"ம்"}],
  rule:"b silent", example_en:"My thumb hurts.", example_ta:"என் பெருவிரல் வலிக்கிறது."
},
{
  id:"w347", en:"Phone", ta_meaning:"தொலைபேசி", ta_sound:"ஃபோன்",
  breakdown:[{part:"Ph",ta:"ஃப"},{part:"one",ta:"ோன்"}],
  rule:"ph = ஃப", example_en:"Call on phone.", example_ta:"போனில் கால் செய்."
},
{
  id:"w348", en:"Graph", ta_meaning:"வரைபடம்", ta_sound:"க்ராஃப்",
  breakdown:[{part:"Gra",ta:"க்ரா"},{part:"ph",ta:"ஃப்"}],
  rule:"ph = ஃப", example_en:"Draw a graph.", example_ta:"வரைபடம் வரை."
},
{
  id:"w349", en:"Check", ta_meaning:"சரிபார்", ta_sound:"செக்",
  breakdown:[{part:"Che",ta:"செ"},{part:"ck",ta:"க்"}],
  rule:"ck = க்", example_en:"Check it.", example_ta:"அதை சரிபார்."
},
{
  id:"w350", en:"Back",
  ta_meaning:"பின்னால்",
  ta_sound:"பேக்",
  breakdown:[{part:"Ba",ta:"பே"},{part:"ck",ta:"க்"}],
  rule:"ck = க்",
  example_en:"Come back.",
  example_ta:"திரும்பி வா."
},
{
  id:"w351", en:"Black", ta_meaning:"கருப்பு", ta_sound:"ப்ளாக்",
  breakdown:[{part:"Bla",ta:"ப்ளா"},{part:"ck",ta:"க்"}],
  rule:"ck = க்", example_en:"Black color.", example_ta:"கருப்பு நிறம்."
},
{
  id:"w352", en:"Clock", ta_meaning:"கடிகாரம்", ta_sound:"க்ளாக்",
  breakdown:[{part:"Clo",ta:"க்ளா"},{part:"ck",ta:"க்"}],
  rule:"ck = க்", example_en:"See the clock.", example_ta:"கடிகாரத்தை பார்."
},
{
  id:"w353", en:"Truck", ta_meaning:"லாரி", ta_sound:"ட்ரக்",
  breakdown:[{part:"Tru",ta:"ட்ர"},{part:"ck",ta:"க்"}],
  rule:"ck = க்", example_en:"Truck is big.", example_ta:"லாரி பெரியது."
},
{
  id:"w354", en:"Phone call", ta_meaning:"போன் கால்", ta_sound:"ஃபோன் கால்",
  breakdown:[{part:"Phone",ta:"ஃபோன்"},{part:"call",ta:"கால்"}],
  rule:"compound", example_en:"Make a phone call.", example_ta:"போன் கால் செய்."
},
{
  id:"w355", en:"Bread", ta_meaning:"பிரெட்", ta_sound:"ப்ரெட்",
  breakdown:[{part:"Bre",ta:"ப்ரெ"},{part:"ad",ta:"ட்"}],
  rule:"ea short = எ", example_en:"Eat bread.", example_ta:"பிரெட் சாப்பிடு."
},
{
  id:"w356", en:"Break", ta_meaning:"உடை / இடைவேளை", ta_sound:"ப்ரேக்",
  breakdown:[{part:"Bre",ta:"ப்ரே"},{part:"ak",ta:"க்"}],
  rule:"ea = ஏ", example_en:"Take a break.", example_ta:"இடைவேளை எடு."
},
{
  id:"w357", en:"Head", ta_meaning:"தலை", ta_sound:"ஹெட்",
  breakdown:[{part:"Hea",ta:"ஹெ"},{part:"d",ta:"ட்"}],
  rule:"ea short = எ", example_en:"My head hurts.", example_ta:"என் தலை வலிக்கிறது."
},
{
  id:"w358", en:"Hear", ta_meaning:"கேள்", ta_sound:"ஹியர்",
  breakdown:[{part:"Hea",ta:"ஹீ"},{part:"r",ta:"ர்"}],
  rule:"ea = ஈ", example_en:"I can hear you.", example_ta:"நான் உன்னை கேட்க முடியும்."
},
{
  id:"w359", en:"Heart", ta_meaning:"இதயம்", ta_sound:"ஹார்ட்",
  breakdown:[{part:"Hea",ta:"ஹா"},{part:"rt",ta:"ர்ட்"}],
  rule:"ea changes sound", example_en:"Heart is important.", example_ta:"இதயம் முக்கியம்."
},
{
  id:"w360", en:"Bear", ta_meaning:"கரடி", ta_sound:"பேர்",
  breakdown:[{part:"Bea",ta:"பே"},{part:"r",ta:"ர்"}],
  rule:"ea = ஏ", example_en:"Bear is strong.", example_ta:"கரடி வலிமையானது."
},
{
  id:"w361", en:"Pear", ta_meaning:"பேரிக்காய்", ta_sound:"பேர்",
  breakdown:[{part:"Pea",ta:"பே"},{part:"r",ta:"ர்"}],
  rule:"ea = ஏ", example_en:"Pear is sweet.", example_ta:"பேரிக்காய் இனிப்பு."
},
{
  id:"w362", en:"Fear", ta_meaning:"பயம்", ta_sound:"ஃபியர்",
  breakdown:[{part:"Fea",ta:"ஃபீ"},{part:"r",ta:"ர்"}],
  rule:"ea = ஈ", example_en:"Don't fear.", example_ta:"பயப்படாதே."
},
{
  id:"w363", en:"Team", ta_meaning:"அணி", ta_sound:"டீம்",
  breakdown:[{part:"Tea",ta:"டீ"},{part:"m",ta:"ம்"}],
  rule:"ea = ஈ", example_en:"My team won.", example_ta:"என் அணி ஜெயித்தது."
},
{
  id:"w364", en:"Meat", ta_meaning:"இறைச்சி", ta_sound:"மீட்",
  breakdown:[{part:"Mea",ta:"மீ"},{part:"t",ta:"ட்"}],
  rule:"ea = ஈ", example_en:"Meat is costly.", example_ta:"இறைச்சி விலை அதிகம்."
},
{
  id:"w365", en:"Seat", ta_meaning:"இருக்கை", ta_sound:"சீட்",
  breakdown:[{part:"Sea",ta:"சீ"},{part:"t",ta:"ட்"}],
  rule:"ea = ஈ", example_en:"Sit on the seat.", example_ta:"இருக்கையில் உட்கார்."
},
{
  id:"w366", en:"Beat", ta_meaning:"அடி", ta_sound:"பீட்",
  breakdown:[{part:"Bea",ta:"பீ"},{part:"t",ta:"ட்"}],
  rule:"ea = ஈ", example_en:"Don't beat.", example_ta:"அடிக்காதே."
},
{
  id:"w367", en:"Great", ta_meaning:"மிகச் சிறந்த", ta_sound:"க்ரேட்",
  breakdown:[{part:"Gre",ta:"க்ரே"},{part:"at",ta:"ட்"}],
  rule:"ea = ஏ", example_en:"Great job.", example_ta:"மிகச் சிறந்த வேலை."
},
{
  id:"w368", en:"Bread", ta_meaning:"பிரெட்", ta_sound:"ப்ரெட்",
  breakdown:[{part:"Bre",ta:"ப்ரெ"},{part:"ad",ta:"ட்"}],
  rule:"ea = எ", example_en:"Bread is soft.", example_ta:"பிரெட் மென்மை."
},
{
  id:"w369", en:"Weather", ta_meaning:"வானிலை", ta_sound:"வெதர்",
  breakdown:[{part:"Wea",ta:"வெ"},{part:"ther",ta:"தர்"}],
  rule:"ea short = எ", example_en:"Weather is good.", example_ta:"வானிலை நல்லது."
},
{
  id:"w370", en:"Feather", ta_meaning:"இறகு", ta_sound:"ஃபெதர்",
  breakdown:[{part:"Fea",ta:"ஃபெ"},{part:"ther",ta:"தர்"}],
  rule:"ea short = எ", example_en:"Feather is light.", example_ta:"இறகு லேசானது."
},
{
  id:"w371", en:"Teacher", ta_meaning:"ஆசிரியர்", ta_sound:"டீச்சர்",
  breakdown:[{part:"Tea",ta:"டீ"},{part:"cher",ta:"ச்சர்"}],
  rule:"ch = ச", example_en:"Teacher is kind.", example_ta:"ஆசிரியர் நல்லவர்."
},
{
  id:"w372", en:"Beach", ta_meaning:"கடற்கரை", ta_sound:"பீச்",
  breakdown:[{part:"Bea",ta:"பீ"},{part:"ch",ta:"ச்"}],
  rule:"ch = ச", example_en:"Go to beach.", example_ta:"கடற்கரைக்கு போ."
},
{
  id:"w373", en:"Peach", ta_meaning:"பீச் பழம்", ta_sound:"பீச்",
  breakdown:[{part:"Pea",ta:"பீ"},{part:"ch",ta:"ச்"}],
  rule:"ch = ச", example_en:"Peach is sweet.", example_ta:"பீச் இனிப்பு."
},
{
  id:"w374", en:"Rich", ta_meaning:"பணக்காரன்", ta_sound:"ரிச்",
  breakdown:[{part:"Ri",ta:"ரி"},{part:"ch",ta:"ச்"}],
  rule:"ch = ச", example_en:"He is rich.", example_ta:"அவன் பணக்காரன்."
},
{
  id:"w375", en:"Much", ta_meaning:"அதிகம்", ta_sound:"மச்",
  breakdown:[{part:"Mu",ta:"ம"},{part:"ch",ta:"ச்"}],
  rule:"ch = ச", example_en:"Too much sugar.", example_ta:"சர்க்கரை அதிகம்."
},
{
  id:"w376", en:"Such", ta_meaning:"அப்படிப் போன்ற", ta_sound:"சச்",
  breakdown:[{part:"Su",ta:"ச"},{part:"ch",ta:"ச்"}],
  rule:"ch = ச", example_en:"Such a good day.", example_ta:"எவ்வளவு நல்ல நாள்."
},
{
  id:"w377", en:"Watch", ta_meaning:"பார்", ta_sound:"வாட்ச்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"tch",ta:"ச்"}],
  rule:"tch = ச்", example_en:"Watch this.", example_ta:"இதை பார்."
},
{
  id:"w378", en:"Kitchen", ta_meaning:"சமையலறை", ta_sound:"கிச்சன்",
  breakdown:[{part:"Kit",ta:"கிட்"},{part:"chen",ta:"சன்"}],
  rule:"ch = ச", example_en:"Go to kitchen.", example_ta:"சமையலறைக்கு போ."
},
{
  id:"w379", en:"Chicken", ta_meaning:"கோழி", ta_sound:"சிக்கன்",
  breakdown:[{part:"Chi",ta:"சி"},{part:"cken",ta:"க்கன்"}],
  rule:"ch = ச", example_en:"Chicken curry.", example_ta:"கோழி குழம்பு."
},
{
  id:"w380", en:"Teacher", ta_meaning:"ஆசிரியர்", ta_sound:"டீச்சர்",
  breakdown:[{part:"Tea",ta:"டீ"},{part:"cher",ta:"ச்சர்"}],
  rule:"ch = ச", example_en:"My teacher helps me.", example_ta:"என் ஆசிரியர் உதவுகிறார்."
},
{
  id:"w381", en:"Think", ta_meaning:"யோசி", ta_sound:"திங்க்",
  breakdown:[{part:"Th",ta:"த"},{part:"ink",ta:"ிங்க்"}],
  rule:"th = த", example_en:"Think well.", example_ta:"நன்றாக யோசி."
},
{
  id:"w382", en:"Thing", ta_meaning:"விஷயம்", ta_sound:"திங்",
  breakdown:[{part:"Th",ta:"த"},{part:"ing",ta:"ிங்"}],
  rule:"ng = ங்", example_en:"Good thing.", example_ta:"நல்ல விஷயம்."
},
{
  id:"w383", en:"Thank", ta_meaning:"நன்றி", ta_sound:"தேங்க்",
  breakdown:[{part:"Tha",ta:"தே"},{part:"nk",ta:"ங்"}],
  rule:"nk = ங்", example_en:"Thank you.", example_ta:"நன்றி."
},
{
  id:"w384", en:"Thirsty", ta_meaning:"தாகம்", ta_sound:"தர்ஸ்டி",
  breakdown:[{part:"Thir",ta:"தர்"},{part:"sty",ta:"ஸ்டி"}],
  rule:"th = த", example_en:"I am thirsty.", example_ta:"எனக்கு தாகம்."
},
{
  id:"w385", en:"Bath", ta_meaning:"குளியல்", ta_sound:"பாத்",
  breakdown:[{part:"Ba",ta:"பா"},{part:"th",ta:"த்"}],
  rule:"th = த்", example_en:"Take a bath.", example_ta:"குளி எடு."
},
{
  id:"w386", en:"Math", ta_meaning:"கணிதம்", ta_sound:"மேத்",
  breakdown:[{part:"Ma",ta:"மே"},{part:"th",ta:"த்"}],
  rule:"th = த்", example_en:"Math is easy.", example_ta:"கணிதம் எளிது."
},
{
  id:"w387", en:"Path", ta_meaning:"பாதை", ta_sound:"பாத்",
  breakdown:[{part:"Pa",ta:"பா"},{part:"th",ta:"த்"}],
  rule:"th = த்", example_en:"This is the path.", example_ta:"இது பாதை."
},
{
  id:"w388", en:"With", ta_meaning:"உடன்", ta_sound:"வித்",
  breakdown:[{part:"Wi",ta:"வி"},{part:"th",ta:"த்"}],
  rule:"th = த்", example_en:"Come with me.", example_ta:"என்னுடன் வா."
},
{
  id:"w389", en:"Without", ta_meaning:"இல்லாமல்", ta_sound:"விதவுட்",
  breakdown:[{part:"With",ta:"வித்"},{part:"out",ta:"அவுட்"}],
  rule:"compound word", example_en:"Without phone.", example_ta:"போன் இல்லாமல்."
},
{
  id:"w390", en:"Mother", ta_meaning:"அம்மா", ta_sound:"மதர்",
  breakdown:[{part:"Mo",ta:"ம"},{part:"ther",ta:"தர்"}],
  rule:"th = த", example_en:"My mother cooks.", example_ta:"என் அம்மா சமைக்கிறார்."
},
{
  id:"w391", en:"Father", ta_meaning:"அப்பா", ta_sound:"ஃபாதர்",
  breakdown:[{part:"Fa",ta:"ஃபா"},{part:"ther",ta:"தர்"}],
  rule:"th = த", example_en:"My father works.", example_ta:"என் அப்பா வேலை செய்கிறார்."
},
{
  id:"w392", en:"Brother", ta_meaning:"அண்ணன்/தம்பி", ta_sound:"ப்ரதர்",
  breakdown:[{part:"Bro",ta:"ப்ர"},{part:"ther",ta:"தர்"}],
  rule:"th = த", example_en:"My brother studies.", example_ta:"என் அண்ணன் படிக்கிறான்."
},
{
  id:"w393", en:"Weather", ta_meaning:"வானிலை", ta_sound:"வெதர்",
  breakdown:[{part:"Wea",ta:"வெ"},{part:"ther",ta:"தர்"}],
  rule:"th = த", example_en:"Weather is hot.", example_ta:"வானிலை சூடு."
},
{
  id:"w394", en:"Together", ta_meaning:"ஒன்றாக", ta_sound:"டுகெதர்",
  breakdown:[{part:"To",ta:"டு"},{part:"gether",ta:"கெதர்"}],
  rule:"th = த", example_en:"We are together.", example_ta:"நாம் ஒன்றாக இருக்கிறோம்."
},
{
  id:"w395", en:"Other", ta_meaning:"மற்றது", ta_sound:"அதர்",
  breakdown:[{part:"O",ta:"அ"},{part:"ther",ta:"தர்"}],
  rule:"th = த", example_en:"Other one.", example_ta:"மற்றது."
},
{
  id:"w396", en:"Another", ta_meaning:"மற்றொரு", ta_sound:"அனதர்",
  breakdown:[{part:"A",ta:"அ"},{part:"no",ta:"ன"},{part:"ther",ta:"தர்"}],
  rule:"th = த", example_en:"Another chance.", example_ta:"மற்றொரு வாய்ப்பு."
},
{
  id:"w397", en:"Nothing", ta_meaning:"எதுவும் இல்லை", ta_sound:"நதிங்",
  breakdown:[{part:"No",ta:"ந"},{part:"thing",ta:"திங்"}],
  rule:"th = த", example_en:"Nothing is there.", example_ta:"எதுவும் இல்லை."
},
{
  id:"w398", en:"Something", ta_meaning:"ஏதாவது", ta_sound:"சம்திங்",
  breakdown:[{part:"Some",ta:"சம்"},{part:"thing",ta:"திங்"}],
  rule:"th = த", example_en:"Something is wrong.", example_ta:"ஏதோ தவறு."
},
{
  id:"w399", en:"Anything", ta_meaning:"எதாவது", ta_sound:"எனிதிங்",
  breakdown:[{part:"Any",ta:"எனி"},{part:"thing",ta:"திங்"}],
  rule:"th = த", example_en:"Do you need anything?", example_ta:"உனக்கு எதாவது வேண்டுமா?"
},
{
  id:"w400", en:"Everything", ta_meaning:"எல்லாமே", ta_sound:"எவ்ரிதிங்",
  breakdown:[{part:"Every",ta:"எவ்ரி"},{part:"thing",ta:"திங்"}],
  rule:"th = த", example_en:"Everything is okay.", example_ta:"எல்லாமே சரி."
},
{
  id:"w401", en:"Father's", ta_meaning:"அப்பாவின்", ta_sound:"ஃபாதர்ஸ்",
  breakdown:[{part:"Father",ta:"ஃபாதர்"},{part:"'s",ta:"ஸ்"}],
  rule:"'s = ஸ", example_en:"Father's phone.", example_ta:"அப்பாவின் போன்."
},
{
  id:"w402", en:"Mother's", ta_meaning:"அம்மாவின்", ta_sound:"மதர்ஸ்",
  breakdown:[{part:"Mother",ta:"மதர்"},{part:"'s",ta:"ஸ்"}],
  rule:"'s = ஸ", example_en:"Mother's bag.", example_ta:"அம்மாவின் பை."
},
{
  id:"w403", en:"Children", ta_meaning:"குழந்தைகள்", ta_sound:"சில்ட்ரன்",
  breakdown:[{part:"Chil",ta:"சில்"},{part:"dren",ta:"ட்ரன்"}],
  rule:"dr = ட்ர", example_en:"Children are playing.", example_ta:"குழந்தைகள் விளையாடுகிறார்கள்."
},
{
  id:"w404", en:"People", ta_meaning:"மக்கள்", ta_sound:"பீப்பிள்",
  breakdown:[{part:"Peo",ta:"பீ"},{part:"ple",ta:"பிள்"}],
  rule:"ple = பிள்", example_en:"Many people.", example_ta:"பல மக்கள்."
},
// ===== Fluent Pack 4 (Sentences 156–205) =====
{ id:"s156", en:"This knife is sharp.", ta_meaning:"இந்த கத்தி கூர்மையாக உள்ளது.", ta_sound:"திஸ் நைஃப் இஸ் ஷார்ப்." },
{ id:"s157", en:"I know you.", ta_meaning:"நான் உன்னை அறிவேன்.", ta_sound:"ஐ நோ யூ." },
{ id:"s158", en:"My knee hurts.", ta_meaning:"என் முட்டி வலிக்கிறது.", ta_sound:"மை நீ ஹர்ட்ஸ்." },
{ id:"s159", en:"Write your name.", ta_meaning:"உன் பெயரை எழுது.", ta_sound:"ரைட் யோர் நேம்." },
{ id:"s160", en:"This is wrong.", ta_meaning:"இது தவறு.", ta_sound:"திஸ் இஸ் ராங்." },

{ id:"s161", en:"Wrap the gift.", ta_meaning:"பரிசை சுற்றி மூடு.", ta_sound:"ரேப் த கிஃப்ட்." },
{ id:"s162", en:"Use a comb.", ta_meaning:"சீப்பு பயன்படுத்து.", ta_sound:"யூஸ் அ கோம்." },
{ id:"s163", en:"My thumb is okay.", ta_meaning:"என் பெருவிரல் சரி.", ta_sound:"மை தம் இஸ் ஓகே." },
{ id:"s164", en:"Climb slowly.", ta_meaning:"மெதுவாக ஏறு.", ta_sound:"க்ளைம் ஸ்லோலி." },
{ id:"s165", en:"Turn on the light.", ta_meaning:"லைட்டை ஆன் செய்.", ta_sound:"டர்ன் ஆன் த லைட்." },

{ id:"s166", en:"Good night.", ta_meaning:"இனிய இரவு.", ta_sound:"குட் நைட்." },
{ id:"s167", en:"You are right.", ta_meaning:"நீ சரி.", ta_sound:"யூ ஆர் ரைட்." },
{ id:"s168", en:"I have eight books.", ta_meaning:"எனக்கு எட்டு புத்தகங்கள் உள்ளன.", ta_sound:"ஐ ஹேவ் எய்ட் புக்க்ஸ்." },
{ id:"s169", en:"Laugh loudly.", ta_meaning:"சத்தமாக சிரி.", ta_sound:"லாஃப் லவுட்லி." },
{ id:"s170", en:"My daughter is smart.", ta_meaning:"என் மகள் புத்திசாலி.", ta_sound:"மை டாட்டர் இஸ் ஸ்மார்ட்." },

{ id:"s171", en:"Good thought.", ta_meaning:"நல்ல எண்ணம்.", ta_sound:"குட் தாட்." },
{ id:"s172", en:"My phone is new.", ta_meaning:"என் போன் புதியது.", ta_sound:"மை ஃபோன் இஸ் நியூ." },
{ id:"s173", en:"Take a photo.", ta_meaning:"ஒரு புகைப்படம் எடு.", ta_sound:"டேக் அ ஃபோட்டோ." },
{ id:"s174", en:"Elephant is big.", ta_meaning:"யானை பெரியது.", ta_sound:"எலிஃபண்ட் இஸ் பிக்." },
{ id:"s175", en:"I go to school.", ta_meaning:"நான் பள்ளிக்கு போகிறேன்.", ta_sound:"ஐ கோ டு ஸ்கூல்." },

{ id:"s176", en:"Sit on the chair.", ta_meaning:"நாற்காலியில் உட்கார்.", ta_sound:"சிட் ஆன் த சேர்." },
{ id:"s177", en:"Go to the shop.", ta_meaning:"கடைக்கு போ.", ta_sound:"கோ டு த ஷாப்." },
{ id:"s178", en:"Fish is tasty.", ta_meaning:"மீன் ருசியாக உள்ளது.", ta_sound:"ஃபிஷ் இஸ் டேஸ்டி." },
{ id:"s179", en:"Wash the dish.", ta_meaning:"தட்டையை கழுவு.", ta_sound:"வாஷ் த டிஷ்." },
{ id:"s180", en:"Brush your teeth.", ta_meaning:"பற்களை துலக்கு.", ta_sound:"ப்ரஷ் யோர் டீத்." },

{ id:"s181", en:"Catch the ball.", ta_meaning:"பந்தை பிடி.", ta_sound:"கேச் த பால்." },
{ id:"s182", en:"We won the match.", ta_meaning:"நாம் போட்டியில் ஜெயித்தோம்.", ta_sound:"வி வன் த மேச்." },
{ id:"s183", en:"Think before you speak.", ta_meaning:"பேசுவதற்கு முன் யோசி.", ta_sound:"திங் பிஃபோர் யூ ஸ்பீக்." },
{ id:"s184", en:"I have three pens.", ta_meaning:"எனக்கு மூன்று பேன்கள் உள்ளன.", ta_sound:"ஐ ஹேவ் த்ரீ பென்ஸ்." },
{ id:"s185", en:"My mother is kind.", ta_meaning:"என் அம்மா நல்லவர்.", ta_sound:"மை மதர் இஸ் கைண்ட்." },

{ id:"s186", en:"My father works.", ta_meaning:"என் அப்பா வேலை செய்கிறார்.", ta_sound:"மை ஃபாதர் வர்க்ஸ்." },
{ id:"s187", en:"My brother is tall.", ta_meaning:"என் அண்ணன் உயரம்.", ta_sound:"மை ப்ரதர் இஸ் டால்." },
{ id:"s188", en:"The boy is here.", ta_meaning:"அந்த பையன் இங்கே இருக்கிறான்.", ta_sound:"த பாய் இஸ் ஹியர்." },
{ id:"s189", en:"Go there.", ta_meaning:"அங்கே போ.", ta_sound:"கோ தேர்." },
{ id:"s190", en:"Eat, then sleep.", ta_meaning:"சாப்பிட்டு அப்புறம் தூங்கு.", ta_sound:"ஈட் தென் ஸ்லீப்." },

{ id:"s191", en:"He is thin.", ta_meaning:"அவன் மெலிந்தவன்.", ta_sound:"ஹீ இஸ் தின்." },
{ id:"s192", en:"This book is thick.", ta_meaning:"இந்த புத்தகம் தடிமன்.", ta_sound:"திஸ் புக் இஸ் திக்." },
{ id:"s193", en:"Call on phone.", ta_meaning:"போனில் கால் செய்.", ta_sound:"கால் ஆன் ஃபோன்." },
{ id:"s194", en:"Check it.", ta_meaning:"அதை சரிபார்.", ta_sound:"செக் இட்." },
{ id:"s195", en:"Come back.", ta_meaning:"திரும்பி வா.", ta_sound:"கம் பேக்." },

{ id:"s196", en:"Take a break.", ta_meaning:"இடைவேளை எடு.", ta_sound:"டேக் அ ப்ரேக்." },
{ id:"s197", en:"My head hurts.", ta_meaning:"என் தலை வலிக்கிறது.", ta_sound:"மை ஹெட் ஹர்ட்ஸ்." },
{ id:"s198", en:"I can hear you.", ta_meaning:"நான் உன்னை கேட்க முடியும்.", ta_sound:"ஐ கேன் ஹியர் யூ." },
{ id:"s199", en:"Don't fear.", ta_meaning:"பயப்படாதே.", ta_sound:"டோன்ட் ஃபியர்." },
{ id:"s200", en:"Sit on the seat.", ta_meaning:"இருக்கையில் உட்கார்.", ta_sound:"சிட் ஆன் த சீட்." },

{ id:"s201", en:"Great job.", ta_meaning:"மிகச் சிறந்த வேலை.", ta_sound:"க்ரேட் ஜாப்." },
{ id:"s202", en:"Weather is good.", ta_meaning:"வானிலை நல்லது.", ta_sound:"வெதர் இஸ் குட்." },
{ id:"s203", en:"My teacher helps me.", ta_meaning:"என் ஆசிரியர் உதவுகிறார்.", ta_sound:"மை டீச்சர் ஹெல்ப்ஸ் மீ." },
{ id:"s204", en:"Go to kitchen.", ta_meaning:"சமையலறைக்கு போ.", ta_sound:"கோ டு கிச்சன்." },
{ id:"s205", en:"Do you need anything?", ta_meaning:"உனக்கு எதாவது வேண்டுமா?", ta_sound:"டு யூ நீட் எனிதிங்?" },
// ===== Fluent Pack 5 (Words 405–504) =====
{
  id:"w405",
  en:"Cake",
  ta_meaning:"கேக்",
  ta_sound:"கேக்",
  breakdown:[{part:"Ca",ta:"கே"},{part:"ke",ta:"க்"}],
  rule:"Magic e makes vowel long (a→ஏ)",
  example_en:"I like cake.",
  example_ta:"எனக்கு கேக் பிடிக்கும்."
},
{
  id:"w406",
  en:"Make",
  ta_meaning:"செய்",
  ta_sound:"மேக்",
  breakdown:[{part:"Ma",ta:"மே"},{part:"ke",ta:"க்"}],
  rule:"Magic e (a→ஏ)",
  example_en:"Make tea.",
  example_ta:"டீ செய்."
},
{
  id:"w407",
  en:"Name",
  ta_meaning:"பெயர்",
  ta_sound:"நேம்",
  breakdown:[{part:"Na",ta:"நே"},{part:"me",ta:"ம்"}],
  rule:"Magic e (a→ஏ)",
  example_en:"My name is Ravi.",
  example_ta:"என் பெயர் ரவி."
},
{
  id:"w408",
  en:"Game",
  ta_meaning:"விளையாட்டு",
  ta_sound:"கேம்",
  breakdown:[{part:"Ga",ta:"கே"},{part:"me",ta:"ம்"}],
  rule:"Magic e (a→ஏ)",
  example_en:"This game is fun.",
  example_ta:"இந்த விளையாட்டு வேடிக்கையாக உள்ளது."
},
{
  id:"w409",
  en:"Same",
  ta_meaning:"அதே",
  ta_sound:"சேம்",
  breakdown:[{part:"Sa",ta:"சே"},{part:"me",ta:"ம்"}],
  rule:"Magic e (a→ஏ)",
  example_en:"Same place.",
  example_ta:"அதே இடம்."
},
{
  id:"w410",
  en:"Late",
  ta_meaning:"தாமதம்",
  ta_sound:"லேட்",
  breakdown:[{part:"La",ta:"லே"},{part:"te",ta:"ட்"}],
  rule:"Magic e (a→ஏ)",
  example_en:"I am late.",
  example_ta:"நான் தாமதம்."
},
{
  id:"w411",
  en:"Gate",
  ta_meaning:"வாசல்",
  ta_sound:"கேட்",
  breakdown:[{part:"Ga",ta:"கே"},{part:"te",ta:"ட்"}],
  rule:"Magic e (a→ஏ)",
  example_en:"Open the gate.",
  example_ta:"வாசலை திற."
},
{
  id:"w412",
  en:"Date",
  ta_meaning:"தேதி",
  ta_sound:"டேட்",
  breakdown:[{part:"Da",ta:"டே"},{part:"te",ta:"ட்"}],
  rule:"Magic e (a→ஏ)",
  example_en:"What is the date?",
  example_ta:"இன்று தேதி என்ன?"
},
{
  id:"w413",
  en:"Time",
  ta_meaning:"நேரம்",
  ta_sound:"டைம்",
  breakdown:[{part:"Ti",ta:"டை"},{part:"me",ta:"ம்"}],
  rule:"Magic e (i→ஐ)",
  example_en:"What time is it?",
  example_ta:"இப்போ நேரம் என்ன?"
},
{
  id:"w414",
  en:"Like",
  ta_meaning:"பிடிக்கும்",
  ta_sound:"லைக்",
  breakdown:[{part:"Li",ta:"லை"},{part:"ke",ta:"க்"}],
  rule:"Magic e (i→ஐ)",
  example_en:"I like you.",
  example_ta:"எனக்கு நீ பிடிக்கும்."
},
{
  id:"w415",
  en:"Bike",
  ta_meaning:"பைக்",
  ta_sound:"பைக்",
  breakdown:[{part:"Bi",ta:"பை"},{part:"ke",ta:"க்"}],
  rule:"Magic e (i→ஐ)",
  example_en:"My bike is new.",
  example_ta:"என் பைக் புதியது."
},
{
  id:"w416",
  en:"Rice",
  ta_meaning:"அரிசி",
  ta_sound:"ரைஸ்",
  breakdown:[{part:"Ri",ta:"ரை"},{part:"ce",ta:"ஸ்"}],
  rule:"Magic e (i→ஐ) + ce = ஸ",
  example_en:"I eat rice.",
  example_ta:"நான் அரிசி சாப்பிடுகிறேன்."
},
{
  id:"w417",
  en:"Nice",
  ta_meaning:"நல்லது",
  ta_sound:"நைஸ்",
  breakdown:[{part:"Ni",ta:"நை"},{part:"ce",ta:"ஸ்"}],
  rule:"Magic e (i→ஐ) + ce = ஸ",
  example_en:"Nice to meet you.",
  example_ta:"உங்களை சந்தித்ததில் மகிழ்ச்சி."
},
{
  id:"w418",
  en:"Face",
  ta_meaning:"முகம்",
  ta_sound:"ஃபேஸ்",
  breakdown:[{part:"Fa",ta:"ஃபே"},{part:"ce",ta:"ஸ்"}],
  rule:"Magic e (a→ஏ) + ce = ஸ",
  example_en:"Wash your face.",
  example_ta:"முகத்தை கழுவு."
},
{
  id:"w419",
  en:"Place",
  ta_meaning:"இடம்",
  ta_sound:"ப்ளேஸ்",
  breakdown:[{part:"Pla",ta:"ப்ளே"},{part:"ce",ta:"ஸ்"}],
  rule:"Magic e + ce = ஸ",
  example_en:"This place is good.",
  example_ta:"இந்த இடம் நல்லது."
},
{
  id:"w420",
  en:"Home",
  ta_meaning:"வீடு",
  ta_sound:"ஹோம்",
  breakdown:[{part:"Ho",ta:"ஹோ"},{part:"me",ta:"ம்"}],
  rule:"Magic e (o→ஓ)",
  example_en:"Go home.",
  example_ta:"வீட்டுக்கு போ."
},
{
  id:"w421",
  en:"Hope",
  ta_meaning:"நம்பிக்கை",
  ta_sound:"ஹோப்",
  breakdown:[{part:"Ho",ta:"ஹோ"},{part:"pe",ta:"ப்"}],
  rule:"Magic e (o→ஓ)",
  example_en:"I hope you win.",
  example_ta:"நீ ஜெயிப்பாய் என்று நம்புகிறேன்."
},
{
  id:"w422",
  en:"Note",
  ta_meaning:"குறிப்பு",
  ta_sound:"நோட்",
  breakdown:[{part:"No",ta:"நோ"},{part:"te",ta:"ட்"}],
  rule:"Magic e (o→ஓ)",
  example_en:"Write a note.",
  example_ta:"ஒரு குறிப்பு எழுது."
},
{
  id:"w423",
  en:"Rose",
  ta_meaning:"ரோஜா",
  ta_sound:"ரோஸ்",
  breakdown:[{part:"Ro",ta:"ரோ"},{part:"se",ta:"ஸ்"}],
  rule:"Magic e (o→ஓ) + se=ஸ்",
  example_en:"This rose is red.",
  example_ta:"இந்த ரோஜா சிவப்பு."
},
{
  id:"w424",
  en:"Cute",
  ta_meaning:"அழகான",
  ta_sound:"க்யூட்",
  breakdown:[{part:"Cu",ta:"க்யூ"},{part:"te",ta:"ட்"}],
  rule:"Magic e (u→யூ)",
  example_en:"Cute baby.",
  example_ta:"அழகான குழந்தை."
},
{
  id:"w425",
  en:"Tube",
  ta_meaning:"குழாய்",
  ta_sound:"ட்யூப்",
  breakdown:[{part:"Tu",ta:"ட்யூ"},{part:"be",ta:"ப்"}],
  rule:"Magic e (u→யூ)",
  example_en:"Water tube.",
  example_ta:"தண்ணீர் குழாய்."
},
{
  id:"w426",
  en:"Use",
  ta_meaning:"பயன்படுத்து",
  ta_sound:"யூஸ்",
  breakdown:[{part:"U",ta:"யூ"},{part:"se",ta:"ஸ்"}],
  rule:"Magic e (u→யூ)",
  example_en:"Use this.",
  example_ta:"இதை பயன்படுத்து."
},
{
  id:"w427",
  en:"Rule",
  ta_meaning:"விதி",
  ta_sound:"ரூல்",
  breakdown:[{part:"Ru",ta:"ரூ"},{part:"le",ta:"ல்"}],
  rule:"u→ஊ sound here",
  example_en:"Follow the rule.",
  example_ta:"விதியை பின்பற்று."
},
{
  id:"w428",
  en:"One",
  ta_meaning:"ஒன்று",
  ta_sound:"வன்",
  breakdown:[{part:"O",ta:"வ"},{part:"ne",ta:"ன்"}],
  rule:"one = வன் (special word)",
  example_en:"One apple.",
  example_ta:"ஒரு ஆப்பிள்."
},
{
  id:"w429",
  en:"Two",
  ta_meaning:"இரண்டு",
  ta_sound:"டூ",
  breakdown:[{part:"Tw",ta:"ட்வ"},{part:"o",ta:"ூ"}],
  rule:"oo = ஊ",
  example_en:"Two pens.",
  example_ta:"இரண்டு பேன்கள்."
},
{
  id:"w430",
  en:"Three",
  ta_meaning:"மூன்று",
  ta_sound:"த்ரீ",
  breakdown:[{part:"Th",ta:"த"},{part:"ree",ta:"ரீ"}],
  rule:"th + ee",
  example_en:"Three books.",
  example_ta:"மூன்று புத்தகங்கள்."
},

// oo words
{
  id:"w431",
  en:"Book",
  ta_meaning:"புத்தகம்",
  ta_sound:"புக்",
  breakdown:[{part:"Bo",ta:"ப"},{part:"ok",ta:"க்"}],
  rule:"oo sometimes = உ (book=புக்)",
  example_en:"This is my book.",
  example_ta:"இது என் புத்தகம்."
},
{
  id:"w432",
  en:"Look",
  ta_meaning:"பார்",
  ta_sound:"லுக்",
  breakdown:[{part:"Lo",ta:"ல"},{part:"ok",ta:"க்"}],
  rule:"oo = உ",
  example_en:"Look here.",
  example_ta:"இங்கே பார்."
},
{
  id:"w433",
  en:"Cook",
  ta_meaning:"சமை",
  ta_sound:"குக்",
  breakdown:[{part:"Co",ta:"க"},{part:"ok",ta:"க்"}],
  rule:"oo = உ",
  example_en:"Cook rice.",
  example_ta:"அரிசி சமை."
},
{
  id:"w434",
  en:"Good",
  ta_meaning:"நல்ல",
  ta_sound:"குட்",
  breakdown:[{part:"Go",ta:"கு"},{part:"od",ta:"ட்"}],
  rule:"oo short sound",
  example_en:"Good morning.",
  example_ta:"காலை வணக்கம்."
},
{
  id:"w435",
  en:"Food",
  ta_meaning:"உணவு",
  ta_sound:"ஃபூட்",
  breakdown:[{part:"Fo",ta:"ஃபூ"},{part:"od",ta:"ட்"}],
  rule:"oo = ஊ (food=ஃபூட்)",
  example_en:"Food is ready.",
  example_ta:"உணவு தயாராக உள்ளது."
},
{
  id:"w436",
  en:"Moon",
  ta_meaning:"நிலா",
  ta_sound:"மூன்",
  breakdown:[{part:"Mo",ta:"மூ"},{part:"on",ta:"ன்"}],
  rule:"oo = ஊ",
  example_en:"The moon is bright.",
  example_ta:"நிலா பிரகாசமாக உள்ளது."
},
{
  id:"w437",
  en:"Soon",
  ta_meaning:"விரைவில்",
  ta_sound:"சூன்",
  breakdown:[{part:"So",ta:"சூ"},{part:"on",ta:"ன்"}],
  rule:"oo = ஊ",
  example_en:"Come soon.",
  example_ta:"சீக்கிரம் வா."
},
{
  id:"w438",
  en:"Room",
  ta_meaning:"அறை",
  ta_sound:"ரூம்",
  breakdown:[{part:"Ro",ta:"ரூ"},{part:"om",ta:"ம்"}],
  rule:"oo = ஊ",
  example_en:"This room is big.",
  example_ta:"இந்த அறை பெரியது."
},
{
  id:"w439",
  en:"School",
  ta_meaning:"பள்ளி",
  ta_sound:"ஸ்கூல்",
  breakdown:[{part:"Sch",ta:"ஸ்க"},{part:"ool",ta:"ூல்"}],
  rule:"oo = ஊ",
  example_en:"School is near.",
  example_ta:"பள்ளி அருகில் உள்ளது."
},
{
  id:"w440",
  en:"Cool",
  ta_meaning:"குளிர்ச்சி",
  ta_sound:"கூல்",
  breakdown:[{part:"Co",ta:"கூ"},{part:"ol",ta:"ல்"}],
  rule:"oo = ஊ",
  example_en:"Cool weather.",
  example_ta:"குளிர்ந்த வானிலை."
},

// ai/ay words
{
  id:"w441",
  en:"Rain",
  ta_meaning:"மழை",
  ta_sound:"ரெயின்",
  breakdown:[{part:"Ra",ta:"ரெ"},{part:"in",ta:"யின்"}],
  rule:"ai = எய்",
  example_en:"Rain is coming.",
  example_ta:"மழை வரப்போகிறது."
},
{
  id:"w442",
  en:"Train",
  ta_meaning:"ரயில்",
  ta_sound:"ட்ரெயின்",
  breakdown:[{part:"Tra",ta:"ட்ரெ"},{part:"in",ta:"யின்"}],
  rule:"ai = எய்",
  example_en:"The train is late.",
  example_ta:"ரயில் தாமதம்."
},
{
  id:"w443",
  en:"Main",
  ta_meaning:"முக்கிய",
  ta_sound:"மேயின்",
  breakdown:[{part:"Ma",ta:"மே"},{part:"in",ta:"யின்"}],
  rule:"ai = எய்",
  example_en:"Main road.",
  example_ta:"முக்கிய சாலை."
},
{
  id:"w444",
  en:"Pain",
  ta_meaning:"வலி",
  ta_sound:"பெயின்",
  breakdown:[{part:"Pa",ta:"பெ"},{part:"in",ta:"யின்"}],
  rule:"ai = எய்",
  example_en:"I have pain.",
  example_ta:"எனக்கு வலி உள்ளது."
},
{
  id:"w445",
  en:"Day",
  ta_meaning:"நாள்",
  ta_sound:"டே",
  breakdown:[{part:"Da",ta:"டே"},{part:"y",ta:""}],
  rule:"ay = ஏ",
  example_en:"Good day.",
  example_ta:"நல்ல நாள்."
},
{
  id:"w446",
  en:"Play",
  ta_meaning:"விளையாடு",
  ta_sound:"ப்ளே",
  breakdown:[{part:"Pla",ta:"ப்ளே"},{part:"y",ta:""}],
  rule:"ay = ஏ",
  example_en:"Play now.",
  example_ta:"இப்போ விளையாடு."
},
{
  id:"w447",
  en:"Stay",
  ta_meaning:"தங்கு",
  ta_sound:"ஸ்டே",
  breakdown:[{part:"Sta",ta:"ஸ்டே"},{part:"y",ta:""}],
  rule:"ay = ஏ",
  example_en:"Stay here.",
  example_ta:"இங்கே தங்கு."
},
{
  id:"w448",
  en:"May",
  ta_meaning:"மே மாதம் / இருக்கலாம்",
  ta_sound:"மே",
  breakdown:[{part:"Ma",ta:"மே"},{part:"y",ta:""}],
  rule:"ay = ஏ",
  example_en:"May I come in?",
  example_ta:"நான் உள்ளே வரலாமா?"
},
{
  id:"w449",
  en:"Say",
  ta_meaning:"சொல்",
  ta_sound:"சே",
  breakdown:[{part:"Sa",ta:"சே"},{part:"y",ta:""}],
  rule:"ay = ஏ",
  example_en:"Say it.",
  example_ta:"அதை சொல்."
},
{
  id:"w450",
  en:"Today",
  ta_meaning:"இன்று",
  ta_sound:"டுடே",
  breakdown:[{part:"To",ta:"டு"},{part:"day",ta:"டே"}],
  rule:"day = டே",
  example_en:"Today is Sunday.",
  example_ta:"இன்று ஞாயிறு."
},

// oa words
{
  id:"w451",
  en:"Boat",
  ta_meaning:"படகு",
  ta_sound:"போட்",
  breakdown:[{part:"Bo",ta:"போ"},{part:"at",ta:"ட்"}],
  rule:"oa = ஓ",
  example_en:"Boat is in water.",
  example_ta:"படகு தண்ணீரில் உள்ளது."
},
{
  id:"w452",
  en:"Road",
  ta_meaning:"சாலை",
  ta_sound:"ரோட்",
  breakdown:[{part:"Ro",ta:"ரோ"},{part:"ad",ta:"ட்"}],
  rule:"oa = ஓ",
  example_en:"This road is long.",
  example_ta:"இந்த சாலை நீளமாக உள்ளது."
},
{
  id:"w453",
  en:"Soap",
  ta_meaning:"சோப்பு",
  ta_sound:"சோப்",
  breakdown:[{part:"So",ta:"சோ"},{part:"ap",ta:"ப்"}],
  rule:"oa = ஓ",
  example_en:"Use soap.",
  example_ta:"சோப்பு பயன்படுத்து."
},
{
  id:"w454",
  en:"Coat",
  ta_meaning:"கோட்",
  ta_sound:"கோட்",
  breakdown:[{part:"Co",ta:"கோ"},{part:"at",ta:"ட்"}],
  rule:"oa = ஓ",
  example_en:"Wear a coat.",
  example_ta:"கோட் போடு."
},
{
  id:"w455",
  en:"Goat",
  ta_meaning:"ஆடு",
  ta_sound:"கோட்",
  breakdown:[{part:"Go",ta:"கோ"},{part:"at",ta:"ட்"}],
  rule:"oa = ஓ",
  example_en:"Goat gives milk.",
  example_ta:"ஆடு பால் தரும்."
},

// ou words
{
  id:"w456",
  en:"Out",
  ta_meaning:"வெளியே",
  ta_sound:"அவுட்",
  breakdown:[{part:"Ou",ta:"அவ்"},{part:"t",ta:"ட்"}],
  rule:"ou = அவ்",
  example_en:"Go out.",
  example_ta:"வெளியே போ."
},
{
  id:"w457",
  en:"House",
  ta_meaning:"வீடு",
  ta_sound:"ஹவுஸ்",
  breakdown:[{part:"Hou",ta:"ஹவ்"},{part:"se",ta:"ஸ்"}],
  rule:"ou = அவ்",
  example_en:"This is my house.",
  example_ta:"இது என் வீடு."
},
{
  id:"w458",
  en:"Mouse",
  ta_meaning:"எலி / மவுஸ்",
  ta_sound:"மவுஸ்",
  breakdown:[{part:"Mou",ta:"மவ்"},{part:"se",ta:"ஸ்"}],
  rule:"ou = அவ்",
  example_en:"Mouse is small.",
  example_ta:"எலி சிறியது."
},
{
  id:"w459",
  en:"Cloud",
  ta_meaning:"மேகம்",
  ta_sound:"க்ளவுட்",
  breakdown:[{part:"Clou",ta:"க்ளவ்"},{part:"d",ta:"ட்"}],
  rule:"ou = அவ்",
  example_en:"Cloud is dark.",
  example_ta:"மேகம் கருமையாக உள்ளது."
},
{
  id:"w460",
  en:"Loud",
  ta_meaning:"சத்தம் அதிகம்",
  ta_sound:"லவுட்",
  breakdown:[{part:"Lou",ta:"லவ்"},{part:"d",ta:"ட்"}],
  rule:"ou = அவ்",
  example_en:"Don't speak loud.",
  example_ta:"சத்தமாக பேசாதே."
},

// ee words
{
  id:"w461",
  en:"See",
  ta_meaning:"பார்",
  ta_sound:"சீ",
  breakdown:[{part:"Se",ta:"சி"},{part:"e",ta:"ீ"}],
  rule:"ee = ஈ",
  example_en:"See this.",
  example_ta:"இதை பார்."
},
{
  id:"w462",
  en:"Tree",
  ta_meaning:"மரம்",
  ta_sound:"ட்ரீ",
  breakdown:[{part:"Tr",ta:"ட்ர"},{part:"ee",ta:"ீ"}],
  rule:"ee = ஈ",
  example_en:"Tree is tall.",
  example_ta:"மரம் உயரம்."
},
{
  id:"w463",
  en:"Green",
  ta_meaning:"பச்சை",
  ta_sound:"க்ரீன்",
  breakdown:[{part:"Gr",ta:"க்ர"},{part:"een",ta:"ீன்"}],
  rule:"ee = ஈ",
  example_en:"Green color.",
  example_ta:"பச்சை நிறம்."
},
{
  id:"w464",
  en:"Need",
  ta_meaning:"வேண்டும்",
  ta_sound:"நீட்",
  breakdown:[{part:"Ne",ta:"நீ"},{part:"ed",ta:"ட்"}],
  rule:"ee = ஈ",
  example_en:"I need water.",
  example_ta:"எனக்கு தண்ணீர் வேண்டும்."
},
{
  id:"w465",
  en:"Meet",
  ta_meaning:"சந்தி",
  ta_sound:"மீட்",
  breakdown:[{part:"Me",ta:"மீ"},{part:"et",ta:"ட்"}],
  rule:"ee = ஈ",
  example_en:"Meet me tomorrow.",
  example_ta:"நாளை என்னை சந்தி."
},

// ea words (different sounds)
{
  id:"w466",
  en:"Tea",
  ta_meaning:"டீ",
  ta_sound:"டீ",
  breakdown:[{part:"Te",ta:"டீ"},{part:"a",ta:""}],
  rule:"ea = ஈ",
  example_en:"Tea is hot.",
  example_ta:"டீ சூடாக உள்ளது."
},
{
  id:"w467",
  en:"Sea",
  ta_meaning:"கடல்",
  ta_sound:"சீ",
  breakdown:[{part:"Se",ta:"சி"},{part:"a",ta:"ீ"}],
  rule:"ea = ஈ",
  example_en:"Sea is big.",
  example_ta:"கடல் பெரியது."
},
{
  id:"w468",
  en:"Head",
  ta_meaning:"தலை",
  ta_sound:"ஹெட்",
  breakdown:[{part:"Hea",ta:"ஹெ"},{part:"d",ta:"ட்"}],
  rule:"ea sometimes = எ",
  example_en:"My head hurts.",
  example_ta:"என் தலை வலிக்கிறது."
},
{
  id:"w469",
  en:"Bread",
  ta_meaning:"பிரெட்",
  ta_sound:"ப்ரெட்",
  breakdown:[{part:"Bre",ta:"ப்ரெ"},{part:"ad",ta:"ட்"}],
  rule:"ea = எ",
  example_en:"Bread is soft.",
  example_ta:"பிரெட் மென்மை."
},
{
  id:"w470",
  en:"Break",
  ta_meaning:"உடை / இடைவேளை",
  ta_sound:"ப்ரேக்",
  breakdown:[{part:"Bre",ta:"ப்ரே"},{part:"ak",ta:"க்"}],
  rule:"ea = ஏ",
  example_en:"Take a break.",
  example_ta:"இடைவேளை எடு."
},

// final 34 quick useful words
{
  id:"w471", en:"Small", ta_meaning:"சிறியது", ta_sound:"ஸ்மால்",
  breakdown:[{part:"Sma",ta:"ஸ்மா"},{part:"ll",ta:"ல்"}],
  rule:"ll = ல்", example_en:"Small boy.", example_ta:"சிறிய பையன்."
},
{
  id:"w472", en:"Tall", ta_meaning:"உயரம்", ta_sound:"டால்",
  breakdown:[{part:"Ta",ta:"டா"},{part:"ll",ta:"ல்"}],
  rule:"ll = ல்", example_en:"Tall tree.", example_ta:"உயரமான மரம்."
},
{
  id:"w473", en:"Call", ta_meaning:"கால் செய்", ta_sound:"கால்",
  breakdown:[{part:"Ca",ta:"கா"},{part:"ll",ta:"ல்"}],
  rule:"ll = ல்", example_en:"Call me.", example_ta:"என்னை கால் செய்."
},
{
  id:"w474", en:"Fall", ta_meaning:"விழு", ta_sound:"ஃபால்",
  breakdown:[{part:"Fa",ta:"ஃபா"},{part:"ll",ta:"ல்"}],
  rule:"ll = ல்", example_en:"Don't fall.", example_ta:"விழாதே."
},
{
  id:"w475", en:"Tell", ta_meaning:"சொல்லு", ta_sound:"டெல்",
  breakdown:[{part:"Te",ta:"டெ"},{part:"ll",ta:"ல்"}],
  rule:"ll = ல்", example_en:"Tell me.", example_ta:"எனக்கு சொல்லு."
},
{
  id:"w476", en:"Help", ta_meaning:"உதவி", ta_sound:"ஹெல்ப்",
  breakdown:[{part:"He",ta:"ஹெ"},{part:"lp",ta:"ல்ப்"}],
  rule:"lp ending", example_en:"Help me.", example_ta:"எனக்கு உதவி செய்."
},
{
  id:"w477", en:"Keep", ta_meaning:"வைத்திரு", ta_sound:"கீப்",
  breakdown:[{part:"Kee",ta:"கீ"},{part:"p",ta:"ப்"}],
  rule:"ee = ஈ", example_en:"Keep it.", example_ta:"அதை வைத்திரு."
},
{
  id:"w478", en:"Deep", ta_meaning:"ஆழம்", ta_sound:"டீப்",
  breakdown:[{part:"Dee",ta:"டீ"},{part:"p",ta:"ப்"}],
  rule:"ee = ஈ", example_en:"Deep water.", example_ta:"ஆழமான தண்ணீர்."
},
{
  id:"w479", en:"Keep calm", ta_meaning:"அமைதியாக இரு", ta_sound:"கீப் கால்ம்",
  breakdown:[{part:"Keep",ta:"கீப்"},{part:"calm",ta:"காம்"}],
  rule:"phrase", example_en:"Keep calm.", example_ta:"அமைதியாக இரு."
},
{
  id:"w480", en:"Calm", ta_meaning:"அமைதி", ta_sound:"காம்",
  breakdown:[{part:"Ca",ta:"கா"},{part:"lm",ta:"ம்"}],
  rule:"l silent sometimes (calm=காம்)",
  example_en:"Stay calm.",
  example_ta:"அமைதியாக இரு."
},
{
  id:"w481", en:"Half", ta_meaning:"பாதி", ta_sound:"ஹாஃப்",
  breakdown:[{part:"Ha",ta:"ஹா"},{part:"lf",ta:"ஃப்"}],
  rule:"l silent in half",
  example_en:"Half cup.",
  example_ta:"பாதி கப்."
},
{
  id:"w482", en:"Talk", ta_meaning:"பேசு", ta_sound:"டாக்",
  breakdown:[{part:"Ta",ta:"டா"},{part:"lk",ta:"க்"}],
  rule:"l silent in talk",
  example_en:"Talk to me.", example_ta:"என்னிடம் பேசு."
},
{
  id:"w483", en:"Walk", ta_meaning:"நட", ta_sound:"வாக்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"lk",ta:"க்"}],
  rule:"l silent in walk",
  example_en:"Walk slowly.", example_ta:"மெதுவாக நட."
},
{
  id:"w484", en:"Would", ta_meaning:"இருக்கும் (polite)", ta_sound:"வுட்",
  breakdown:[{part:"Wou",ta:"வு"},{part:"ld",ta:"ட்"}],
  rule:"l silent sometimes",
  example_en:"I would like tea.", example_ta:"எனக்கு டீ வேண்டும்."
},
{
  id:"w485", en:"Could", ta_meaning:"முடியும்", ta_sound:"குட்",
  breakdown:[{part:"Cou",ta:"கு"},{part:"ld",ta:"ட்"}],
  rule:"l silent sometimes",
  example_en:"I could help you.", example_ta:"நான் உனக்கு உதவி செய்ய முடியும்."
},
{
  id:"w486", en:"Should", ta_meaning:"வேண்டும் (advice)", ta_sound:"ஷுட்",
  breakdown:[{part:"Shou",ta:"ஷு"},{part:"ld",ta:"ட்"}],
  rule:"l silent sometimes",
  example_en:"You should study.", example_ta:"நீ படிக்க வேண்டும்."
},
{
  id:"w487", en:"Cold", ta_meaning:"குளிர்", ta_sound:"கோல்ட்",
  breakdown:[{part:"Co",ta:"கோ"},{part:"ld",ta:"ல்ட்"}],
  rule:"ld ending", example_en:"Cold water.", example_ta:"குளிர்ந்த தண்ணீர்."
},
{
  id:"w488", en:"Old", ta_meaning:"பழைய", ta_sound:"ஓல்ட்",
  breakdown:[{part:"O",ta:"ஓ"},{part:"ld",ta:"ல்ட்"}],
  rule:"ld ending", example_en:"Old book.", example_ta:"பழைய புத்தகம்."
},
{
  id:"w489", en:"Gold", ta_meaning:"தங்கம்", ta_sound:"கோல்ட்",
  breakdown:[{part:"Go",ta:"கோ"},{part:"ld",ta:"ல்ட்"}],
  rule:"ld ending", example_en:"Gold ring.", example_ta:"தங்க மோதிரம்."
},
{
  id:"w490", en:"Hold", ta_meaning:"பிடி", ta_sound:"ஹோல்ட்",
  breakdown:[{part:"Ho",ta:"ஹோ"},{part:"ld",ta:"ல்ட்"}],
  rule:"ld ending", example_en:"Hold my hand.", example_ta:"என் கையை பிடி."
},
{
  id:"w491", en:"Hand", ta_meaning:"கை", ta_sound:"ஹேண்ட்",
  breakdown:[{part:"Ha",ta:"ஹே"},{part:"nd",ta:"ண்ட்"}],
  rule:"nd = ண்ட்", example_en:"My hand hurts.", example_ta:"என் கை வலிக்கிறது."
},
{
  id:"w492", en:"Stand", ta_meaning:"நில்", ta_sound:"ஸ்டேண்ட்",
  breakdown:[{part:"Sta",ta:"ஸ்டே"},{part:"nd",ta:"ண்ட்"}],
  rule:"nd = ண்ட்", example_en:"Stand here.", example_ta:"இங்கே நில்."
},
{
  id:"w493", en:"Understand", ta_meaning:"புரிந்து கொள்", ta_sound:"அண்டர்ஸ்டேண்ட்",
  breakdown:[{part:"Un",ta:"அன்"},{part:"der",ta:"டர்"},{part:"stand",ta:"ஸ்டேண்ட்"}],
  rule:"compound", example_en:"I understand.", example_ta:"நான் புரிந்துகொண்டேன்."
},
{
  id:"w494", en:"Friend", ta_meaning:"நண்பன்", ta_sound:"ஃப்ரெண்ட்",
  breakdown:[{part:"Fri",ta:"ஃப்ரி"},{part:"end",ta:"எண்ட்"}],
  rule:"end = எண்ட்", example_en:"He is my friend.", example_ta:"அவன் என் நண்பன்."
},
{
  id:"w495", en:"Family", ta_meaning:"குடும்பம்", ta_sound:"ஃபேமிலி",
  breakdown:[{part:"Fa",ta:"ஃபே"},{part:"mi",ta:"மி"},{part:"ly",ta:"லி"}],
  rule:"y ending = இ", example_en:"My family is good.", example_ta:"என் குடும்பம் நல்லது."
},
{
  id:"w496", en:"Money", ta_meaning:"பணம்", ta_sound:"மனி",
  breakdown:[{part:"Mo",ta:"ம"},{part:"ney",ta:"னி"}],
  rule:"ey = இ", example_en:"Money is important.", example_ta:"பணம் முக்கியம்."
},
{
  id:"w497", en:"Honey", ta_meaning:"தேன்", ta_sound:"ஹனி",
  breakdown:[{part:"Ho",ta:"ஹ"},{part:"ney",ta:"னி"}],
  rule:"ey = இ", example_en:"Honey is sweet.", example_ta:"தேன் இனிப்பு."
},
{
  id:"w498", en:"Sunny", ta_meaning:"வெயில்", ta_sound:"சன்னி",
  breakdown:[{part:"Sun",ta:"சன்"},{part:"ny",ta:"னி"}],
  rule:"y ending = இ", example_en:"Sunny day.", example_ta:"வெயில் நாள்."
},
{
  id:"w499", en:"Funny", ta_meaning:"வேடிக்கை", ta_sound:"ஃபன்னி",
  breakdown:[{part:"Fun",ta:"ஃபன்"},{part:"ny",ta:"னி"}],
  rule:"y ending = இ", example_en:"Funny story.", example_ta:"வேடிக்கையான கதை."
},
{
  id:"w500", en:"Happy", ta_meaning:"மகிழ்ச்சி", ta_sound:"ஹாப்பி",
  breakdown:[{part:"Ha",ta:"ஹா"},{part:"ppy",ta:"ப்பி"}],
  rule:"double consonant", example_en:"I am happy.", example_ta:"நான் மகிழ்ச்சி."
},
{
  id:"w501", en:"Baby", ta_meaning:"குழந்தை", ta_sound:"பேபி",
  breakdown:[{part:"Ba",ta:"பே"},{part:"by",ta:"பி"}],
  rule:"y ending = இ", example_en:"Baby is cute.", example_ta:"குழந்தை அழகாக உள்ளது."
},
{
  id:"w502", en:"Maybe", ta_meaning:"இருக்கலாம்", ta_sound:"மேபி",
  breakdown:[{part:"Ma",ta:"மே"},{part:"ybe",ta:"பி"}],
  rule:"y ending = இ", example_en:"Maybe tomorrow.", example_ta:"நாளை இருக்கலாம்."
},
{
  id:"w503", en:"Today", ta_meaning:"இன்று", ta_sound:"டுடே",
  breakdown:[{part:"To",ta:"டு"},{part:"day",ta:"டே"}],
  rule:"day = டே", example_en:"Today is good.", example_ta:"இன்று நல்லது."
},
{
  id:"w504", en:"Tomorrow", ta_meaning:"நாளை", ta_sound:"டுமாரோ",
  breakdown:[{part:"To",ta:"டு"},{part:"mor",ta:"மா"},{part:"row",ta:"ரோ"}],
  rule:"ow = ஓ", example_en:"See you tomorrow.", example_ta:"நாளை சந்திப்போம்."
},
// ===== Fluent Pack 5 (Sentences 206–255) =====
{ id:"s206", en:"I like cake.", ta_meaning:"எனக்கு கேக் பிடிக்கும்.", ta_sound:"ஐ லைக் கேக்." },
{ id:"s207", en:"Make tea.", ta_meaning:"டீ செய்.", ta_sound:"மேக் டீ." },
{ id:"s208", en:"My name is Ravi.", ta_meaning:"என் பெயர் ரவி.", ta_sound:"மை நேம் இஸ் ரவி." },
{ id:"s209", en:"This game is fun.", ta_meaning:"இந்த விளையாட்டு வேடிக்கையாக உள்ளது.", ta_sound:"திஸ் கேம் இஸ் ஃபன்." },
{ id:"s210", en:"I am late.", ta_meaning:"நான் தாமதம்.", ta_sound:"ஐ ஆம் லேட்." },

{ id:"s211", en:"Open the gate.", ta_meaning:"வாசலை திற.", ta_sound:"ஓபன் த கேட்." },
{ id:"s212", en:"What is the date?", ta_meaning:"இன்று தேதி என்ன?", ta_sound:"வாட் இஸ் த டேட்?" },
{ id:"s213", en:"What time is it?", ta_meaning:"இப்போ நேரம் என்ன?", ta_sound:"வாட் டைம் இஸ் இட்?" },
{ id:"s214", en:"I like you.", ta_meaning:"எனக்கு நீ பிடிக்கும்.", ta_sound:"ஐ லைக் யூ." },
{ id:"s215", en:"My bike is new.", ta_meaning:"என் பைக் புதியது.", ta_sound:"மை பைக் இஸ் நியூ." },

{ id:"s216", en:"I eat rice.", ta_meaning:"நான் அரிசி சாப்பிடுகிறேன்.", ta_sound:"ஐ ஈட் ரைஸ்." },
{ id:"s217", en:"Nice to meet you.", ta_meaning:"உங்களை சந்தித்ததில் மகிழ்ச்சி.", ta_sound:"நைஸ் டு மீட் யூ." },
{ id:"s218", en:"Wash your face.", ta_meaning:"முகத்தை கழுவு.", ta_sound:"வாஷ் யோர் ஃபேஸ்." },
{ id:"s219", en:"This place is good.", ta_meaning:"இந்த இடம் நல்லது.", ta_sound:"திஸ் ப்ளேஸ் இஸ் குட்." },
{ id:"s220", en:"Go home.", ta_meaning:"வீட்டுக்கு போ.", ta_sound:"கோ ஹோம்." },

{ id:"s221", en:"I hope you win.", ta_meaning:"நீ ஜெயிப்பாய் என்று நம்புகிறேன்.", ta_sound:"ஐ ஹோப் யூ வின்." },
{ id:"s222", en:"Write a note.", ta_meaning:"ஒரு குறிப்பு எழுது.", ta_sound:"ரைட் அ நோட்." },
{ id:"s223", en:"This rose is red.", ta_meaning:"இந்த ரோஜா சிவப்பு.", ta_sound:"திஸ் ரோஸ் இஸ் ரெட்." },
{ id:"s224", en:"Cute baby.", ta_meaning:"அழகான குழந்தை.", ta_sound:"க்யூட் பேபி." },
{ id:"s225", en:"Use this.", ta_meaning:"இதை பயன்படுத்து.", ta_sound:"யூஸ் திஸ்." },

{ id:"s226", en:"One apple.", ta_meaning:"ஒரு ஆப்பிள்.", ta_sound:"வன் ஆப்பிள்." },
{ id:"s227", en:"Two pens.", ta_meaning:"இரண்டு பேன்கள்.", ta_sound:"டூ பென்ஸ்." },
{ id:"s228", en:"Three books.", ta_meaning:"மூன்று புத்தகங்கள்.", ta_sound:"த்ரீ புக்க்ஸ்." },
{ id:"s229", en:"This is my book.", ta_meaning:"இது என் புத்தகம்.", ta_sound:"திஸ் இஸ் மை புக்." },
{ id:"s230", en:"Look here.", ta_meaning:"இங்கே பார்.", ta_sound:"லுக் ஹியர்." },

{ id:"s231", en:"Cook rice.", ta_meaning:"அரிசி சமை.", ta_sound:"குக் ரைஸ்." },
{ id:"s232", en:"Food is ready.", ta_meaning:"உணவு தயாராக உள்ளது.", ta_sound:"ஃபூட் இஸ் ரெடி." },
{ id:"s233", en:"The moon is bright.", ta_meaning:"நிலா பிரகாசமாக உள்ளது.", ta_sound:"த மூன் இஸ் பிரைட்." },
{ id:"s234", en:"Come soon.", ta_meaning:"சீக்கிரம் வா.", ta_sound:"கம் சூன்." },
{ id:"s235", en:"This room is big.", ta_meaning:"இந்த அறை பெரியது.", ta_sound:"திஸ் ரூம் இஸ் பிக்." },

{ id:"s236", en:"Cool weather.", ta_meaning:"குளிர்ந்த வானிலை.", ta_sound:"கூல் வெதர்." },
{ id:"s237", en:"Rain is coming.", ta_meaning:"மழை வரப்போகிறது.", ta_sound:"ரெயின் இஸ் கமிங்." },
{ id:"s238", en:"The train is late.", ta_meaning:"ரயில் தாமதம்.", ta_sound:"த ட்ரெயின் இஸ் லேட்." },
{ id:"s239", en:"Main road.", ta_meaning:"முக்கிய சாலை.", ta_sound:"மேயின் ரோட்." },
{ id:"s240", en:"I have pain.", ta_meaning:"எனக்கு வலி உள்ளது.", ta_sound:"ஐ ஹேவ் பெயின்." },

{ id:"s241", en:"Stay here.", ta_meaning:"இங்கே தங்கு.", ta_sound:"ஸ்டே ஹியர்." },
{ id:"s242", en:"May I come in?", ta_meaning:"நான் உள்ளே வரலாமா?", ta_sound:"மே ஐ கம் இன்?" },
{ id:"s243", en:"Today is Sunday.", ta_meaning:"இன்று ஞாயிறு.", ta_sound:"டுடே இஸ் சண்டே." },
{ id:"s244", en:"Boat is in water.", ta_meaning:"படகு தண்ணீரில் உள்ளது.", ta_sound:"போட் இஸ் இன் வாட்டர்." },
{ id:"s245", en:"This road is long.", ta_meaning:"இந்த சாலை நீளமாக உள்ளது.", ta_sound:"திஸ் ரோட் இஸ் லாங்." },

{ id:"s246", en:"Use soap.", ta_meaning:"சோப்பு பயன்படுத்து.", ta_sound:"யூஸ் சோப்." },
{ id:"s247", en:"Go out.", ta_meaning:"வெளியே போ.", ta_sound:"கோ அவுட்." },
{ id:"s248", en:"This is my house.", ta_meaning:"இது என் வீடு.", ta_sound:"திஸ் இஸ் மை ஹவுஸ்." },
{ id:"s249", en:"Cloud is dark.", ta_meaning:"மேகம் கருமையாக உள்ளது.", ta_sound:"க்ளவுட் இஸ் டார்க்." },
{ id:"s250", en:"Don't speak loud.", ta_meaning:"சத்தமாக பேசாதே.", ta_sound:"டோன்ட் ஸ்பீக் லவுட்." },

{ id:"s251", en:"I need water.", ta_meaning:"எனக்கு தண்ணீர் வேண்டும்.", ta_sound:"ஐ நீட் வாட்டர்." },
{ id:"s252", en:"Meet me tomorrow.", ta_meaning:"நாளை என்னை சந்தி.", ta_sound:"மீட் மீ டுமாரோ." },
{ id:"s253", en:"Stay calm.", ta_meaning:"அமைதியாக இரு.", ta_sound:"ஸ்டே காம்." },
{ id:"s254", en:"You should study.", ta_meaning:"நீ படிக்க வேண்டும்.", ta_sound:"யூ ஷுட் ஸ்டடி." },
{ id:"s255", en:"See you tomorrow.", ta_meaning:"நாளை சந்திப்போம்.", ta_sound:"சீ யூ டுமாரோ." },
// ===== Fluent Pack 6 (Words 505–604) =====
{
  id:"w505",
  en:"Cat",
  ta_meaning:"பூனை",
  ta_sound:"கேட்",
  breakdown:[{part:"Ca",ta:"கே"},{part:"t",ta:"ட்"}],
  rule:"Short a = அ/எ sound (cat)",
  example_en:"The cat is small.",
  example_ta:"பூனை சிறியது."
},
{
  id:"w506",
  en:"Hat",
  ta_meaning:"தலைக்கவசம்",
  ta_sound:"ஹேட்",
  breakdown:[{part:"Ha",ta:"ஹே"},{part:"t",ta:"ட்"}],
  rule:"Short a",
  example_en:"This hat is new.",
  example_ta:"இந்த தொப்பி புதியது."
},
{
  id:"w507",
  en:"Bat",
  ta_meaning:"வௌவால் / பேட்",
  ta_sound:"பேட்",
  breakdown:[{part:"Ba",ta:"பே"},{part:"t",ta:"ட்"}],
  rule:"Short a",
  example_en:"Bat can fly.",
  example_ta:"வௌவால் பறக்கும்."
},
{
  id:"w508",
  en:"Mat",
  ta_meaning:"பாய்",
  ta_sound:"மேட்",
  breakdown:[{part:"Ma",ta:"மே"},{part:"t",ta:"ட்"}],
  rule:"Short a",
  example_en:"Sit on the mat.",
  example_ta:"பாயில் உட்கார்."
},
{
  id:"w509",
  en:"Bag",
  ta_meaning:"பை",
  ta_sound:"பேக்",
  breakdown:[{part:"Ba",ta:"பே"},{part:"g",ta:"க்"}],
  rule:"g ending = க்",
  example_en:"My bag is heavy.",
  example_ta:"என் பை கனமாக உள்ளது."
},
{
  id:"w510",
  en:"Man",
  ta_meaning:"ஆண்",
  ta_sound:"மேன்",
  breakdown:[{part:"Ma",ta:"மே"},{part:"n",ta:"ன்"}],
  rule:"Short a",
  example_en:"That man is kind.",
  example_ta:"அந்த மனிதர் நல்லவர்."
},
{
  id:"w511",
  en:"Fan",
  ta_meaning:"விசிறி",
  ta_sound:"ஃபேன்",
  breakdown:[{part:"Fa",ta:"ஃபே"},{part:"n",ta:"ன்"}],
  rule:"Short a",
  example_en:"Turn on the fan.",
  example_ta:"விசிறியை ஆன் செய்."
},
{
  id:"w512",
  en:"Pan",
  ta_meaning:"பாத்திரம்",
  ta_sound:"பேன்",
  breakdown:[{part:"Pa",ta:"பே"},{part:"n",ta:"ன்"}],
  rule:"Short a",
  example_en:"Pan is hot.",
  example_ta:"பாத்திரம் சூடாக உள்ளது."
},
{
  id:"w513",
  en:"Map",
  ta_meaning:"வரைபடம்",
  ta_sound:"மேப்",
  breakdown:[{part:"Ma",ta:"மே"},{part:"p",ta:"ப்"}],
  rule:"Short a",
  example_en:"See the map.",
  example_ta:"வரைபடத்தை பார்."
},
{
  id:"w514",
  en:"Cap",
  ta_meaning:"கேப்/தொப்பி",
  ta_sound:"கேப்",
  breakdown:[{part:"Ca",ta:"கே"},{part:"p",ta:"ப்"}],
  rule:"Short a",
  example_en:"Wear a cap.",
  example_ta:"கேப் போடு."
},

// Short e words
{
  id:"w515",
  en:"Bed",
  ta_meaning:"படுக்கை",
  ta_sound:"பெட்",
  breakdown:[{part:"Be",ta:"பெ"},{part:"d",ta:"ட்"}],
  rule:"Short e = எ",
  example_en:"Go to bed.",
  example_ta:"படுக்கைக்கு போ."
},
{
  id:"w516",
  en:"Red",
  ta_meaning:"சிவப்பு",
  ta_sound:"ரெட்",
  breakdown:[{part:"Re",ta:"ரெ"},{part:"d",ta:"ட்"}],
  rule:"Short e",
  example_en:"Red color.",
  example_ta:"சிவப்பு நிறம்."
},
{
  id:"w517",
  en:"Pen",
  ta_meaning:"பேனா",
  ta_sound:"பென்",
  breakdown:[{part:"Pe",ta:"பெ"},{part:"n",ta:"ன்"}],
  rule:"Short e",
  example_en:"This pen is mine.",
  example_ta:"இந்த பேனா என்னுடையது."
},
{
  id:"w518",
  en:"Ten",
  ta_meaning:"பத்து",
  ta_sound:"டென்",
  breakdown:[{part:"Te",ta:"டெ"},{part:"n",ta:"ன்"}],
  rule:"Short e",
  example_en:"Ten rupees.",
  example_ta:"பத்து ரூபாய்."
},
{
  id:"w519",
  en:"Men",
  ta_meaning:"ஆண்கள்",
  ta_sound:"மென்",
  breakdown:[{part:"Me",ta:"மெ"},{part:"n",ta:"ன்"}],
  rule:"Short e",
  example_en:"Many men.",
  example_ta:"பல ஆண்கள்."
},
{
  id:"w520",
  en:"Get",
  ta_meaning:"பெறு",
  ta_sound:"கெட்",
  breakdown:[{part:"Ge",ta:"கெ"},{part:"t",ta:"ட்"}],
  rule:"Short e",
  example_en:"Get ready.",
  example_ta:"தயார் ஆகு."
},
{
  id:"w521",
  en:"Set",
  ta_meaning:"அமை / செட் செய்",
  ta_sound:"செட்",
  breakdown:[{part:"Se",ta:"செ"},{part:"t",ta:"ட்"}],
  rule:"Short e",
  example_en:"Set the time.",
  example_ta:"நேரத்தை செட் செய்."
},
{
  id:"w522",
  en:"Let",
  ta_meaning:"அனுமதி",
  ta_sound:"லெட்",
  breakdown:[{part:"Le",ta:"லெ"},{part:"t",ta:"ட்"}],
  rule:"Short e",
  example_en:"Let me go.",
  example_ta:"என்னை போக விடு."
},
{
  id:"w523",
  en:"Next",
  ta_meaning:"அடுத்து",
  ta_sound:"நெக்ஸ்ட்",
  breakdown:[{part:"Ne",ta:"நெ"},{part:"xt",ta:"க்ஸ்ட்"}],
  rule:"x = க்ஸ்",
  example_en:"Next lesson.",
  example_ta:"அடுத்த பாடம்."
},
{
  id:"w524",
  en:"Best",
  ta_meaning:"சிறந்த",
  ta_sound:"பெஸ்ட்",
  breakdown:[{part:"Be",ta:"பெ"},{part:"st",ta:"ஸ்ட்"}],
  rule:"st = ஸ்ட்",
  example_en:"You are the best.",
  example_ta:"நீ சிறந்தவன்."
},

// Short i words
{
  id:"w525",
  en:"Sit",
  ta_meaning:"உட்கார்",
  ta_sound:"சிட்",
  breakdown:[{part:"Si",ta:"சி"},{part:"t",ta:"ட்"}],
  rule:"Short i = இ",
  example_en:"Sit here.",
  example_ta:"இங்கே உட்கார்."
},
{
  id:"w526",
  en:"Bit",
  ta_meaning:"சிறிது",
  ta_sound:"பிட்",
  breakdown:[{part:"Bi",ta:"பி"},{part:"t",ta:"ட்"}],
  rule:"Short i",
  example_en:"A bit more.",
  example_ta:"சிறிது மேலும்."
},
{
  id:"w527",
  en:"Big",
  ta_meaning:"பெரிய",
  ta_sound:"பிக்",
  breakdown:[{part:"Bi",ta:"பி"},{part:"g",ta:"க்"}],
  rule:"Short i",
  example_en:"Big house.",
  example_ta:"பெரிய வீடு."
},
{
  id:"w528",
  en:"Pig",
  ta_meaning:"பன்றி",
  ta_sound:"பிக்",
  breakdown:[{part:"Pi",ta:"பி"},{part:"g",ta:"க்"}],
  rule:"Short i",
  example_en:"Pig is fat.",
  example_ta:"பன்றி கொழுத்தது."
},
{
  id:"w529",
  en:"Lip",
  ta_meaning:"உதடு",
  ta_sound:"லிப்",
  breakdown:[{part:"Li",ta:"லி"},{part:"p",ta:"ப்"}],
  rule:"Short i",
  example_en:"My lip hurts.",
  example_ta:"என் உதடு வலிக்கிறது."
},
{
  id:"w530",
  en:"Tip",
  ta_meaning:"சிறிய ஆலோசனை",
  ta_sound:"டிப்",
  breakdown:[{part:"Ti",ta:"டி"},{part:"p",ta:"ப்"}],
  rule:"Short i",
  example_en:"Give me a tip.",
  example_ta:"எனக்கு ஒரு ஆலோசனை சொல்."
},
{
  id:"w531",
  en:"Pin",
  ta_meaning:"முள் / பின்",
  ta_sound:"பின்",
  breakdown:[{part:"Pi",ta:"பி"},{part:"n",ta:"ன்"}],
  rule:"Short i",
  example_en:"Use a pin.",
  example_ta:"முள் பயன்படுத்து."
},
{
  id:"w532",
  en:"Win",
  ta_meaning:"ஜெயி",
  ta_sound:"வின்",
  breakdown:[{part:"Wi",ta:"வி"},{part:"n",ta:"ன்"}],
  rule:"Short i",
  example_en:"I will win.",
  example_ta:"நான் ஜெயிப்பேன்."
},
{
  id:"w533",
  en:"Fish",
  ta_meaning:"மீன்",
  ta_sound:"ஃபிஷ்",
  breakdown:[{part:"Fi",ta:"ஃபி"},{part:"sh",ta:"ஷ்"}],
  rule:"sh = ஷ",
  example_en:"Fish is tasty.",
  example_ta:"மீன் ருசி."
},
{
  id:"w534",
  en:"Dish",
  ta_meaning:"தட்டு",
  ta_sound:"டிஷ்",
  breakdown:[{part:"Di",ta:"டி"},{part:"sh",ta:"ஷ்"}],
  rule:"sh = ஷ",
  example_en:"Wash the dish.",
  example_ta:"தட்டை கழுவு."
},

// Short o words
{
  id:"w535",
  en:"Hot",
  ta_meaning:"சூடு",
  ta_sound:"ஹாட்",
  breakdown:[{part:"Ho",ta:"ஹா"},{part:"t",ta:"ட்"}],
  rule:"Short o = ஆ",
  example_en:"Tea is hot.",
  example_ta:"டீ சூடு."
},
{
  id:"w536",
  en:"Not",
  ta_meaning:"இல்லை",
  ta_sound:"நாட்",
  breakdown:[{part:"No",ta:"நா"},{part:"t",ta:"ட்"}],
  rule:"Short o",
  example_en:"I am not ready.",
  example_ta:"நான் தயாரில்லை."
},
{
  id:"w537",
  en:"Top",
  ta_meaning:"மேல் பகுதி",
  ta_sound:"டாப்",
  breakdown:[{part:"To",ta:"டா"},{part:"p",ta:"ப்"}],
  rule:"Short o",
  example_en:"Top of the box.",
  example_ta:"பெட்டியின் மேல்."
},
{
  id:"w538",
  en:"Box",
  ta_meaning:"பெட்டி",
  ta_sound:"பாக்ஸ்",
  breakdown:[{part:"Bo",ta:"பா"},{part:"x",ta:"க்ஸ்"}],
  rule:"x = க்ஸ்",
  example_en:"Open the box.",
  example_ta:"பெட்டியை திற."
},
{
  id:"w539",
  en:"Dog",
  ta_meaning:"நாய்",
  ta_sound:"டாக்",
  breakdown:[{part:"Do",ta:"டா"},{part:"g",ta:"க்"}],
  rule:"Short o",
  example_en:"Dog is friendly.",
  example_ta:"நாய் நண்பன்."
},
{
  id:"w540",
  en:"Shop",
  ta_meaning:"கடை",
  ta_sound:"ஷாப்",
  breakdown:[{part:"Sh",ta:"ஷ"},{part:"op",ta:"ாப்"}],
  rule:"sh = ஷ",
  example_en:"Go to shop.",
  example_ta:"கடைக்கு போ."
},
{
  id:"w541",
  en:"Stop",
  ta_meaning:"நிறுத்து",
  ta_sound:"ஸ்டாப்",
  breakdown:[{part:"St",ta:"ஸ்ட"},{part:"op",ta:"ாப்"}],
  rule:"blend st",
  example_en:"Stop now.",
  example_ta:"இப்போ நிறுத்து."
},
{
  id:"w542",
  en:"Drop",
  ta_meaning:"விடு / விழு",
  ta_sound:"ட்ராப்",
  breakdown:[{part:"Dr",ta:"ட்ர"},{part:"op",ta:"ாப்"}],
  rule:"blend dr",
  example_en:"Don't drop it.",
  example_ta:"அதை கீழே விடாதே."
},
{
  id:"w543",
  en:"From",
  ta_meaning:"இருந்து",
  ta_sound:"ஃப்ராம்",
  breakdown:[{part:"Fr",ta:"ஃப்ர"},{part:"om",ta:"ாம்"}],
  rule:"short o",
  example_en:"I am from India.",
  example_ta:"நான் இந்தியாவிலிருந்து."
},
{
  id:"w544",
  en:"Come",
  ta_meaning:"வா",
  ta_sound:"கம்",
  breakdown:[{part:"Co",ta:"க"},{part:"me",ta:"ம்"}],
  rule:"o sound changes",
  example_en:"Come here.",
  example_ta:"இங்கே வா."
},

// Short u words
{
  id:"w545",
  en:"Sun",
  ta_meaning:"சூரியன்",
  ta_sound:"சன்",
  breakdown:[{part:"Su",ta:"ச"},{part:"n",ta:"ன்"}],
  rule:"Short u = அ",
  example_en:"The sun is hot.",
  example_ta:"சூரியன் சூடு."
},
{
  id:"w546",
  en:"Bus",
  ta_meaning:"பஸ்",
  ta_sound:"பஸ்",
  breakdown:[{part:"Bu",ta:"ப"},{part:"s",ta:"ஸ்"}],
  rule:"Short u",
  example_en:"Bus is coming.",
  example_ta:"பஸ் வருகிறது."
},
{
  id:"w547",
  en:"Cup",
  ta_meaning:"கப்",
  ta_sound:"கப்",
  breakdown:[{part:"Cu",ta:"க"},{part:"p",ta:"ப்"}],
  rule:"Short u",
  example_en:"One cup of tea.",
  example_ta:"ஒரு கப் டீ."
},
{
  id:"w548",
  en:"Cut",
  ta_meaning:"வெட்டு",
  ta_sound:"கட்",
  breakdown:[{part:"Cu",ta:"க"},{part:"t",ta:"ட்"}],
  rule:"Short u",
  example_en:"Cut the paper.",
  example_ta:"காகிதத்தை வெட்டு."
},
{
  id:"w549",
  en:"Fun",
  ta_meaning:"வேடிக்கை",
  ta_sound:"ஃபன்",
  breakdown:[{part:"Fu",ta:"ஃப"},{part:"n",ta:"ன்"}],
  rule:"Short u",
  example_en:"This is fun.",
  example_ta:"இது வேடிக்கை."
},
{
  id:"w550",
  en:"Run",
  ta_meaning:"ஓடு",
  ta_sound:"ரன்",
  breakdown:[{part:"Ru",ta:"ர"},{part:"n",ta:"ன்"}],
  rule:"Short u",
  example_en:"Run fast.",
  example_ta:"வேகமாக ஓடு."
},
{
  id:"w551",
  en:"Jump",
  ta_meaning:"தாவு",
  ta_sound:"ஜம்ப்",
  breakdown:[{part:"Ju",ta:"ஜ"},{part:"mp",ta:"ம்ப்"}],
  rule:"mp ending = ம்ப்",
  example_en:"Jump high.",
  example_ta:"உயரமாக தாவு."
},
{
  id:"w552",
  en:"Lunch",
  ta_meaning:"மதிய உணவு",
  ta_sound:"லன்ச்",
  breakdown:[{part:"Lu",ta:"ல"},{part:"nch",ta:"ன்ச்"}],
  rule:"nch = ன்ச்",
  example_en:"Lunch is ready.",
  example_ta:"மதிய உணவு தயாராக உள்ளது."
},
{
  id:"w553",
  en:"Much",
  ta_meaning:"அதிகம்",
  ta_sound:"மச்",
  breakdown:[{part:"Mu",ta:"ம"},{part:"ch",ta:"ச்"}],
  rule:"ch = ச",
  example_en:"Too much work.",
  example_ta:"வேலை அதிகம்."
},
{
  id:"w554",
  en:"Such",
  ta_meaning:"அப்படிப் போன்ற",
  ta_sound:"சச்",
  breakdown:[{part:"Su",ta:"ச"},{part:"ch",ta:"ச்"}],
  rule:"ch = ச",
  example_en:"Such a nice day.",
  example_ta:"எவ்வளவு நல்ல நாள்."
},

// Blend words (st, sp, tr, dr, pl, bl)
{
  id:"w555",
  en:"Stop",
  ta_meaning:"நிறுத்து",
  ta_sound:"ஸ்டாப்",
  breakdown:[{part:"St",ta:"ஸ்ட"},{part:"op",ta:"ாப்"}],
  rule:"st blend",
  example_en:"Stop here.",
  example_ta:"இங்கே நிறுத்து."
},
{
  id:"w556",
  en:"Start",
  ta_meaning:"தொடங்கு",
  ta_sound:"ஸ்டார்ட்",
  breakdown:[{part:"St",ta:"ஸ்ட"},{part:"art",ta:"ார்ட்"}],
  rule:"st blend",
  example_en:"Start now.",
  example_ta:"இப்போ தொடங்கு."
},
{
  id:"w557",
  en:"Street",
  ta_meaning:"தெரு",
  ta_sound:"ஸ்ட்ரீட்",
  breakdown:[{part:"Str",ta:"ஸ்ட்ர"},{part:"eet",ta:"ீட்"}],
  rule:"ee = ஈ",
  example_en:"This street is long.",
  example_ta:"இந்த தெரு நீளம்."
},
{
  id:"w558",
  en:"Strong",
  ta_meaning:"வலிமையான",
  ta_sound:"ஸ்ட்ராங்",
  breakdown:[{part:"Str",ta:"ஸ்ட்ர"},{part:"ong",ta:"ாங்"}],
  rule:"ng = ங்",
  example_en:"He is strong.",
  example_ta:"அவன் வலிமையானவன்."
},
{
  id:"w559",
  en:"Speak",
  ta_meaning:"பேசு",
  ta_sound:"ஸ்பீக்",
  breakdown:[{part:"Sp",ta:"ஸ்ப"},{part:"eak",ta:"ீக்"}],
  rule:"ea = ஈ",
  example_en:"Speak slowly.",
  example_ta:"மெதுவாக பேசு."
},
{
  id:"w560",
  en:"Spell",
  ta_meaning:"எழுத்துச் சொல்",
  ta_sound:"ஸ்பெல்",
  breakdown:[{part:"Spe",ta:"ஸ்பெ"},{part:"ll",ta:"ல்"}],
  rule:"ll = ல்",
  example_en:"Spell the word.",
  example_ta:"வார்த்தையை எழுத்துச் சொல்லு."
},
{
  id:"w561",
  en:"Spring",
  ta_meaning:"வசந்தம்",
  ta_sound:"ஸ்ப்ரிங்",
  breakdown:[{part:"Spr",ta:"ஸ்ப்ர"},{part:"ing",ta:"ிங்"}],
  rule:"ng = ங்",
  example_en:"Spring season.",
  example_ta:"வசந்த காலம்."
},
{
  id:"w562",
  en:"Train",
  ta_meaning:"ரயில்",
  ta_sound:"ட்ரெயின்",
  breakdown:[{part:"Tr",ta:"ட்ர"},{part:"ain",ta:"ேயின்"}],
  rule:"ai = எய்",
  example_en:"Train is fast.",
  example_ta:"ரயில் வேகம்."
},
{
  id:"w563",
  en:"Tree",
  ta_meaning:"மரம்",
  ta_sound:"ட்ரீ",
  breakdown:[{part:"Tr",ta:"ட்ர"},{part:"ee",ta:"ீ"}],
  rule:"ee = ஈ",
  example_en:"Tree is green.",
  example_ta:"மரம் பச்சை."
},
{
  id:"w564",
  en:"Try",
  ta_meaning:"முயற்சி செய்",
  ta_sound:"ட்ரை",
  breakdown:[{part:"Tr",ta:"ட்ர"},{part:"y",ta:"ை"}],
  rule:"y = ஐ",
  example_en:"Try again.",
  example_ta:"மீண்டும் முயற்சி செய்."
},
{
  id:"w565",
  en:"Drop",
  ta_meaning:"கீழே விடு",
  ta_sound:"ட்ராப்",
  breakdown:[{part:"Dr",ta:"ட்ர"},{part:"op",ta:"ாப்"}],
  rule:"dr blend",
  example_en:"Don't drop it.",
  example_ta:"அதை கீழே விடாதே."
},
{
  id:"w566",
  en:"Drive",
  ta_meaning:"ஓட்டு",
  ta_sound:"ட்ரைவ்",
  breakdown:[{part:"Dri",ta:"ட்ரை"},{part:"ve",ta:"வ்"}],
  rule:"magic e",
  example_en:"Drive carefully.",
  example_ta:"கவனமாக ஓட்டு."
},
{
  id:"w567",
  en:"Play",
  ta_meaning:"விளையாடு",
  ta_sound:"ப்ளே",
  breakdown:[{part:"Pl",ta:"ப்ள"},{part:"ay",ta:"ே"}],
  rule:"ay = ஏ",
  example_en:"Play outside.",
  example_ta:"வெளியே விளையாடு."
},
{
  id:"w568",
  en:"Place",
  ta_meaning:"இடம்",
  ta_sound:"ப்ளேஸ்",
  breakdown:[{part:"Pla",ta:"ப்ளே"},{part:"ce",ta:"ஸ்"}],
  rule:"ce = ஸ",
  example_en:"Good place.",
  example_ta:"நல்ல இடம்."
},
{
  id:"w569",
  en:"Blue",
  ta_meaning:"நீலம்",
  ta_sound:"ப்ளூ",
  breakdown:[{part:"Bl",ta:"ப்ள"},{part:"ue",ta:"ூ"}],
  rule:"ue = யூ/ஊ",
  example_en:"Blue color.",
  example_ta:"நீல நிறம்."
},
{
  id:"w570",
  en:"Black",
  ta_meaning:"கருப்பு",
  ta_sound:"ப்ளாக்",
  breakdown:[{part:"Bla",ta:"ப்ளா"},{part:"ck",ta:"க்"}],
  rule:"ck = க்",
  example_en:"Black bag.",
  example_ta:"கருப்பு பை."
},

// Remaining 34 useful words for daily life
{
  id:"w571", en:"Water", ta_meaning:"தண்ணீர்", ta_sound:"வாட்டர்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"ter",ta:"டர்"}],
  rule:"er = அர்", example_en:"Drink water.", example_ta:"தண்ணீர் குடி."
},
{
  id:"w572", en:"Tea", ta_meaning:"டீ", ta_sound:"டீ",
  breakdown:[{part:"T",ta:"ட"},{part:"ea",ta:"ீ"}],
  rule:"ea = ஈ", example_en:"Tea is hot.", example_ta:"டீ சூடு."
},
{
  id:"w573", en:"Coffee", ta_meaning:"காபி", ta_sound:"காஃபி",
  breakdown:[{part:"Cof",ta:"காஃப்"},{part:"fee",ta:"ஃபீ"}],
  rule:"ee = ஈ", example_en:"Coffee is strong.", example_ta:"காபி ஸ்ட்ராங்."
},
{
  id:"w574", en:"Sugar", ta_meaning:"சர்க்கரை", ta_sound:"ஷுகர்",
  breakdown:[{part:"Su",ta:"ஷு"},{part:"gar",ta:"கர்"}],
  rule:"g soft sometimes", example_en:"Less sugar.", example_ta:"சர்க்கரை குறைவு."
},
{
  id:"w575", en:"Salt", ta_meaning:"உப்பு", ta_sound:"சால்ட்",
  breakdown:[{part:"Sa",ta:"சா"},{part:"lt",ta:"ல்ட்"}],
  rule:"lt ending", example_en:"Add salt.", example_ta:"உப்பு போடு."
},
{
  id:"w576", en:"Rice", ta_meaning:"அரிசி", ta_sound:"ரைஸ்",
  breakdown:[{part:"Ri",ta:"ரை"},{part:"ce",ta:"ஸ்"}],
  rule:"ce = ஸ", example_en:"Rice is white.", example_ta:"அரிசி வெள்ளை."
},
{
  id:"w577", en:"Milk", ta_meaning:"பால்", ta_sound:"மில்க்",
  breakdown:[{part:"Mi",ta:"மி"},{part:"lk",ta:"ல்க்"}],
  rule:"lk = ல்க்", example_en:"Milk is good.", example_ta:"பால் நல்லது."
},
{
  id:"w578", en:"Egg", ta_meaning:"முட்டை", ta_sound:"எக்",
  breakdown:[{part:"E",ta:"எ"},{part:"gg",ta:"க்"}],
  rule:"double g", example_en:"Egg is tasty.", example_ta:"முட்டை ருசி."
},
{
  id:"w579", en:"Bread", ta_meaning:"பிரெட்", ta_sound:"ப்ரெட்",
  breakdown:[{part:"Bre",ta:"ப்ரெ"},{part:"ad",ta:"ட்"}],
  rule:"ea = எ", example_en:"Eat bread.", example_ta:"பிரெட் சாப்பிடு."
},
{
  id:"w580", en:"Fruit", ta_meaning:"பழம்", ta_sound:"ஃப்ரூட்",
  breakdown:[{part:"Fr",ta:"ஃப்ர"},{part:"uit",ta:"ூட்"}],
  rule:"ui = ஊ", example_en:"Eat fruit.", example_ta:"பழம் சாப்பிடு."
},
{
  id:"w581", en:"Apple", ta_meaning:"ஆப்பிள்", ta_sound:"ஆப்பிள்",
  breakdown:[{part:"Ap",ta:"ஆப்"},{part:"ple",ta:"பிள்"}],
  rule:"ple = பிள்", example_en:"Apple is red.", example_ta:"ஆப்பிள் சிவப்பு."
},
{
  id:"w582", en:"Banana", ta_meaning:"வாழைப்பழம்", ta_sound:"பனானா",
  breakdown:[{part:"Ba",ta:"ப"},{part:"na",ta:"னா"},{part:"na",ta:"னா"}],
  rule:"syllables", example_en:"Banana is yellow.", example_ta:"வாழைப்பழம் மஞ்சள்."
},
{
  id:"w583", en:"Mango", ta_meaning:"மாம்பழம்", ta_sound:"மேங்கோ",
  breakdown:[{part:"Man",ta:"மேன்"},{part:"go",ta:"கோ"}],
  rule:"ng = ங்", example_en:"Mango is sweet.", example_ta:"மாம்பழம் இனிப்பு."
},
{
  id:"w584", en:"Orange", ta_meaning:"ஆரஞ்சு", ta_sound:"ஆரஞ்ச்",
  breakdown:[{part:"Or",ta:"ஆர்"},{part:"ange",ta:"ஞ்ச்"}],
  rule:"ge = ஜ்/ச்", example_en:"Orange is tasty.", example_ta:"ஆரஞ்சு ருசி."
},
{
  id:"w585", en:"Vegetable", ta_meaning:"காய்கறி", ta_sound:"வெஜிடபிள்",
  breakdown:[{part:"Ve",ta:"வெ"},{part:"ge",ta:"ஜி"},{part:"ta",ta:"ட"},{part:"ble",ta:"பிள்"}],
  rule:"ble = பிள்", example_en:"Vegetable is healthy.", example_ta:"காய்கறி நல்லது."
},
{
  id:"w586", en:"Tomato", ta_meaning:"தக்காளி", ta_sound:"டொமேட்டோ",
  breakdown:[{part:"To",ta:"டொ"},{part:"ma",ta:"மே"},{part:"to",ta:"டோ"}],
  rule:"syllables", example_en:"Tomato is red.", example_ta:"தக்காளி சிவப்பு."
},
{
  id:"w587", en:"Potato", ta_meaning:"உருளைக்கிழங்கு", ta_sound:"படேட்டோ",
  breakdown:[{part:"Po",ta:"ப"},{part:"ta",ta:"டே"},{part:"to",ta:"டோ"}],
  rule:"syllables", example_en:"Potato curry.", example_ta:"உருளைக்கிழங்கு குழம்பு."
},
{
  id:"w588", en:"Onion", ta_meaning:"வெங்காயம்", ta_sound:"அனியன்",
  breakdown:[{part:"O",ta:"அ"},{part:"ni",ta:"னி"},{part:"on",ta:"யன்"}],
  rule:"on = யன்", example_en:"Cut onion.", example_ta:"வெங்காயம் வெட்டு."
},
{
  id:"w589", en:"Carrot", ta_meaning:"காரட்", ta_sound:"கேரட்",
  breakdown:[{part:"Car",ta:"கேர்"},{part:"rot",ta:"ட்"}],
  rule:"ar = ஆர்/ஏர்", example_en:"Carrot is orange.", example_ta:"காரட் ஆரஞ்சு."
},
{
  id:"w590", en:"Chicken", ta_meaning:"கோழி", ta_sound:"சிக்கன்",
  breakdown:[{part:"Chi",ta:"சி"},{part:"cken",ta:"க்கன்"}],
  rule:"ch = ச", example_en:"Chicken curry.", example_ta:"கோழி குழம்பு."
},
{
  id:"w591", en:"Fish", ta_meaning:"மீன்", ta_sound:"ஃபிஷ்",
  breakdown:[{part:"Fi",ta:"ஃபி"},{part:"sh",ta:"ஷ்"}],
  rule:"sh = ஷ", example_en:"Fish fry.", example_ta:"மீன் வறுவல்."
},
{
  id:"w592", en:"Meat", ta_meaning:"இறைச்சி", ta_sound:"மீட்",
  breakdown:[{part:"Mea",ta:"மீ"},{part:"t",ta:"ட்"}],
  rule:"ea = ஈ", example_en:"Meat is costly.", example_ta:"இறைச்சி விலை அதிகம்."
},
{
  id:"w593", en:"Money", ta_meaning:"பணம்", ta_sound:"மனி",
  breakdown:[{part:"Mo",ta:"ம"},{part:"ney",ta:"னி"}],
  rule:"ey = இ", example_en:"Save money.", example_ta:"பணம் சேமி."
},
{
  id:"w594", en:"Market", ta_meaning:"சந்தை", ta_sound:"மார்கெட்",
  breakdown:[{part:"Mar",ta:"மார்"},{part:"ket",ta:"கெட்"}],
  rule:"ar = ஆர்", example_en:"Go to market.", example_ta:"சந்தைக்கு போ."
},
{
  id:"w595", en:"Shop", ta_meaning:"கடை", ta_sound:"ஷாப்",
  breakdown:[{part:"Sh",ta:"ஷ"},{part:"op",ta:"ாப்"}],
  rule:"sh = ஷ", example_en:"Open the shop.", example_ta:"கடையை திற."
},
{
  id:"w596", en:"Price", ta_meaning:"விலை", ta_sound:"ப்ரைஸ்",
  breakdown:[{part:"Pri",ta:"ப்ரை"},{part:"ce",ta:"ஸ்"}],
  rule:"ce = ஸ", example_en:"What is the price?", example_ta:"விலை என்ன?"
},
{
  id:"w597", en:"Cheap", ta_meaning:"மலிவு", ta_sound:"சீப்",
  breakdown:[{part:"Che",ta:"சீ"},{part:"ap",ta:"ப்"}],
  rule:"ea = ஈ", example_en:"This is cheap.", example_ta:"இது மலிவு."
},
{
  id:"w598", en:"Costly", ta_meaning:"விலை அதிகம்", ta_sound:"காஸ்ட்லி",
  breakdown:[{part:"Cos",ta:"காஸ்"},{part:"tly",ta:"ட்லி"}],
  rule:"tly", example_en:"This is costly.", example_ta:"இது விலை அதிகம்."
},
{
  id:"w599", en:"Buy", ta_meaning:"வாங்கு", ta_sound:"பை",
  breakdown:[{part:"Bu",ta:"ப"},{part:"y",ta:"ை"}],
  rule:"y = ஐ",
  example_en:"Buy this.",
  example_ta:"இதை வாங்கு."
},
{
  id:"w600", en:"Sell", ta_meaning:"விற்று", ta_sound:"செல்",
  breakdown:[{part:"Se",ta:"செ"},{part:"ll",ta:"ல்"}],
  rule:"ll = ல்",
  example_en:"Sell old things.",
  example_ta:"பழைய பொருட்களை விற்று."
},
{
  id:"w601", en:"Pay", ta_meaning:"செலுத்து", ta_sound:"பே",
  breakdown:[{part:"Pa",ta:"பே"},{part:"y",ta:""}],
  rule:"ay = ஏ",
  example_en:"Pay now.",
  example_ta:"இப்போ செலுத்து."
},
{
  id:"w602", en:"Bill", ta_meaning:"பில் / கட்டணம்",
  ta_sound:"பில்",
  breakdown:[{part:"Bi",ta:"பி"},{part:"ll",ta:"ல்"}],
  rule:"ll = ல்",
  example_en:"Pay the bill.",
  example_ta:"பில் செலுத்து."
},
{
  id:"w603", en:"Change", ta_meaning:"மாற்றம் / சில்லறை",
  ta_sound:"சேஞ்ச்",
  breakdown:[{part:"Cha",ta:"சே"},{part:"nge",ta:"ஞ்ச்"}],
  rule:"nge = ஞ்ச்",
  example_en:"Give change.",
  example_ta:"சில்லறை கொடு."
},
{
  id:"w604", en:"Free", ta_meaning:"இலவசம்",
  ta_sound:"ஃப்ரீ",
  breakdown:[{part:"Fr",ta:"ஃப்ர"},{part:"ee",ta:"ீ"}],
  rule:"ee = ஈ",
  example_en:"This is free.",
  example_ta:"இது இலவசம்."
},
// ===== Fluent Pack 6 (Sentences 256–305) =====
{ id:"s256", en:"The cat is small.", ta_meaning:"பூனை சிறியது.", ta_sound:"த கேட் இஸ் ஸ்மால்." },
{ id:"s257", en:"This hat is new.", ta_meaning:"இந்த தொப்பி புதியது.", ta_sound:"திஸ் ஹேட் இஸ் நியூ." },
{ id:"s258", en:"Sit on the mat.", ta_meaning:"பாயில் உட்கார்.", ta_sound:"சிட் ஆன் த மேட்." },
{ id:"s259", en:"My bag is heavy.", ta_meaning:"என் பை கனமாக உள்ளது.", ta_sound:"மை பேக் இஸ் ஹெவி." },
{ id:"s260", en:"That man is kind.", ta_meaning:"அந்த மனிதர் நல்லவர்.", ta_sound:"தாட் மேன் இஸ் கைண்ட்." },

{ id:"s261", en:"Turn on the fan.", ta_meaning:"விசிறியை ஆன் செய்.", ta_sound:"டர்ன் ஆன் த ஃபேன்." },
{ id:"s262", en:"See the map.", ta_meaning:"வரைபடத்தை பார்.", ta_sound:"சீ த மேப்." },
{ id:"s263", en:"Go to bed.", ta_meaning:"படுக்கைக்கு போ.", ta_sound:"கோ டு பெட்." },
{ id:"s264", en:"This pen is mine.", ta_meaning:"இந்த பேனா என்னுடையது.", ta_sound:"திஸ் பென் இஸ் மைன்." },
{ id:"s265", en:"Ten rupees.", ta_meaning:"பத்து ரூபாய்.", ta_sound:"டென் ரூபீஸ்." },

{ id:"s266", en:"Get ready.", ta_meaning:"தயார் ஆகு.", ta_sound:"கெட் ரெடி." },
{ id:"s267", en:"Set the time.", ta_meaning:"நேரத்தை செட் செய்.", ta_sound:"செட் த டைம்." },
{ id:"s268", en:"Let me go.", ta_meaning:"என்னை போக விடு.", ta_sound:"லெட் மீ கோ." },
{ id:"s269", en:"Next lesson.", ta_meaning:"அடுத்த பாடம்.", ta_sound:"நெக்ஸ்ட் லெசன்." },
{ id:"s270", en:"Sit here.", ta_meaning:"இங்கே உட்கார்.", ta_sound:"சிட் ஹியர்." },

{ id:"s271", en:"I will win.", ta_meaning:"நான் ஜெயிப்பேன்.", ta_sound:"ஐ வில் வின்." },
{ id:"s272", en:"Tea is hot.", ta_meaning:"டீ சூடு.", ta_sound:"டீ இஸ் ஹாட்." },
{ id:"s273", en:"Open the box.", ta_meaning:"பெட்டியை திற.", ta_sound:"ஓபன் த பாக்ஸ்." },
{ id:"s274", en:"Dog is friendly.", ta_meaning:"நாய் நண்பன்.", ta_sound:"டாக் இஸ் ஃப்ரெண்ட்லி." },
{ id:"s275", en:"Stop now.", ta_meaning:"இப்போ நிறுத்து.", ta_sound:"ஸ்டாப் நவ்." },

{ id:"s276", en:"Don't drop it.", ta_meaning:"அதை கீழே விடாதே.", ta_sound:"டோன்ட் ட்ராப் இட்." },
{ id:"s277", en:"I am from India.", ta_meaning:"நான் இந்தியாவிலிருந்து.", ta_sound:"ஐ ஆம் ஃப்ராம் இந்தியா." },
{ id:"s278", en:"Come here.", ta_meaning:"இங்கே வா.", ta_sound:"கம் ஹியர்." },
{ id:"s279", en:"The sun is hot.", ta_meaning:"சூரியன் சூடு.", ta_sound:"த சன் இஸ் ஹாட்." },
{ id:"s280", en:"Bus is coming.", ta_meaning:"பஸ் வருகிறது.", ta_sound:"பஸ் இஸ் கமிங்." },

{ id:"s281", en:"One cup of tea.", ta_meaning:"ஒரு கப் டீ.", ta_sound:"வன் கப் ஆஃப் டீ." },
{ id:"s282", en:"Cut the paper.", ta_meaning:"காகிதத்தை வெட்டு.", ta_sound:"கட் த பேப்பர்." },
{ id:"s283", en:"This is fun.", ta_meaning:"இது வேடிக்கை.", ta_sound:"திஸ் இஸ் ஃபன்." },
{ id:"s284", en:"Run fast.", ta_meaning:"வேகமாக ஓடு.", ta_sound:"ரன் ஃபாஸ்ட்." },
{ id:"s285", en:"Lunch is ready.", ta_meaning:"மதிய உணவு தயாராக உள்ளது.", ta_sound:"லன்ச் இஸ் ரெடி." },

{ id:"s286", en:"Spell the word.", ta_meaning:"வார்த்தையை எழுத்துச் சொல்லு.", ta_sound:"ஸ்பெல் த வர்ட்." },
{ id:"s287", en:"Try again.", ta_meaning:"மீண்டும் முயற்சி செய்.", ta_sound:"ட்ரை அகெயின்." },
{ id:"s288", en:"Drive carefully.", ta_meaning:"கவனமாக ஓட்டு.", ta_sound:"ட்ரைவ் கேர் ஃபுல்லி." },
{ id:"s289", en:"Blue color.", ta_meaning:"நீல நிறம்.", ta_sound:"ப்ளூ கலர்." },
{ id:"s290", en:"Drink water.", ta_meaning:"தண்ணீர் குடி.", ta_sound:"ட்ரிங்க் வாட்டர்." },

{ id:"s291", en:"Coffee is strong.", ta_meaning:"காபி ஸ்ட்ராங்.", ta_sound:"காஃபி இஸ் ஸ்ட்ராங்." },
{ id:"s292", en:"Less sugar.", ta_meaning:"சர்க்கரை குறைவு.", ta_sound:"லெஸ் ஷுகர்." },
{ id:"s293", en:"Add salt.", ta_meaning:"உப்பு போடு.", ta_sound:"ஆட் சால்ட்." },
{ id:"s294", en:"Milk is good.", ta_meaning:"பால் நல்லது.", ta_sound:"மில்க் இஸ் குட்." },
{ id:"s295", en:"Eat fruit.", ta_meaning:"பழம் சாப்பிடு.", ta_sound:"ஈட் ஃப்ரூட்." },

{ id:"s296", en:"Apple is red.", ta_meaning:"ஆப்பிள் சிவப்பு.", ta_sound:"ஆப்பிள் இஸ் ரெட்." },
{ id:"s297", en:"Banana is yellow.", ta_meaning:"வாழைப்பழம் மஞ்சள்.", ta_sound:"பனானா இஸ் யெல்லோ." },
{ id:"s298", en:"Mango is sweet.", ta_meaning:"மாம்பழம் இனிப்பு.", ta_sound:"மேங்கோ இஸ் ஸ்வீட்." },
{ id:"s299", en:"Cut onion.", ta_meaning:"வெங்காயம் வெட்டு.", ta_sound:"கட் அனியன்." },
{ id:"s300", en:"Go to market.", ta_meaning:"சந்தைக்கு போ.", ta_sound:"கோ டு மார்கெட்." },

{ id:"s301", en:"What is the price?", ta_meaning:"விலை என்ன?", ta_sound:"வாட் இஸ் த ப்ரைஸ்?" },
{ id:"s302", en:"This is cheap.", ta_meaning:"இது மலிவு.", ta_sound:"திஸ் இஸ் சீப்." },
{ id:"s303", en:"This is costly.", ta_meaning:"இது விலை அதிகம்.", ta_sound:"திஸ் இஸ் காஸ்ட்லி." },
{ id:"s304", en:"Pay the bill.", ta_meaning:"பில் செலுத்து.", ta_sound:"பே த பில்." },
{ id:"s305", en:"Give change.", ta_meaning:"சில்லறை கொடு.", ta_sound:"கிவ் சேஞ்ச்." },
// ===== Fluent Pack 7 (Words 605–704) =====

// Common action verbs
{
  id:"w605",
  en:"Read",
  ta_meaning:"படி",
  ta_sound:"ரீட்",
  breakdown:[{part:"Rea",ta:"ரீ"},{part:"d",ta:"ட்"}],
  rule:"ea = ஈ",
  example_en:"Read this book.",
  example_ta:"இந்த புத்தகம் படி."
},
{
  id:"w606",
  en:"Write",
  ta_meaning:"எழுது",
  ta_sound:"ரைட்",
  breakdown:[{part:"Wr",ta:"(w silent)"},{part:"ite",ta:"ைட்"}],
  rule:"w silent in write",
  example_en:"Write your name.",
  example_ta:"உன் பெயரை எழுது."
},
{
  id:"w607",
  en:"Speak",
  ta_meaning:"பேசு",
  ta_sound:"ஸ்பீக்",
  breakdown:[{part:"Sp",ta:"ஸ்ப"},{part:"eak",ta:"ீக்"}],
  rule:"ea = ஈ",
  example_en:"Speak in English.",
  example_ta:"ஆங்கிலத்தில் பேசு."
},
{
  id:"w608",
  en:"Listen",
  ta_meaning:"கேள்",
  ta_sound:"லிஸன்",
  breakdown:[{part:"Lis",ta:"லிஸ்"},{part:"ten",ta:"ன்"}],
  rule:"t silent sometimes (listen)",
  example_en:"Listen carefully.",
  example_ta:"கவனமாக கேள்."
},
{
  id:"w609",
  en:"Learn",
  ta_meaning:"கற்று",
  ta_sound:"லர்ன்",
  breakdown:[{part:"Lea",ta:"ல"},{part:"rn",ta:"ர்ன்"}],
  rule:"ear = அர் (learn)",
  example_en:"Learn daily.",
  example_ta:"தினமும் கற்று."
},
{
  id:"w610",
  en:"Teach",
  ta_meaning:"கற்பி",
  ta_sound:"டீச்",
  breakdown:[{part:"Tea",ta:"டீ"},{part:"ch",ta:"ச்"}],
  rule:"ea = ஈ, ch = ச",
  example_en:"Teach me English.",
  example_ta:"எனக்கு ஆங்கிலம் கற்பி."
},
{
  id:"w611",
  en:"Study",
  ta_meaning:"படி",
  ta_sound:"ஸ்டடி",
  breakdown:[{part:"Stu",ta:"ஸ்ட"},{part:"dy",ta:"டி"}],
  rule:"y ending = இ",
  example_en:"Study now.",
  example_ta:"இப்போ படி."
},
{
  id:"w612",
  en:"Practice",
  ta_meaning:"பயிற்சி",
  ta_sound:"ப்ராக்டிஸ்",
  breakdown:[{part:"Prac",ta:"ப்ராக்"},{part:"tice",ta:"டிஸ்"}],
  rule:"ce = ஸ",
  example_en:"Practice speaking.",
  example_ta:"பேச பயிற்சி செய்."
},
{
  id:"w613",
  en:"Try",
  ta_meaning:"முயற்சி செய்",
  ta_sound:"ட்ரை",
  breakdown:[{part:"Tr",ta:"ட்ர"},{part:"y",ta:"ை"}],
  rule:"y = ஐ",
  example_en:"Try again.",
  example_ta:"மீண்டும் முயற்சி செய்."
},
{
  id:"w614",
  en:"Repeat",
  ta_meaning:"மீண்டும் சொல்",
  ta_sound:"ரிபீட்",
  breakdown:[{part:"Re",ta:"ரி"},{part:"peat",ta:"பீட்"}],
  rule:"ea = ஈ",
  example_en:"Repeat after me.",
  example_ta:"என் பின்னால் மீண்டும் சொல்."
},

// Daily use verbs
{
  id:"w615",
  en:"Open",
  ta_meaning:"திற",
  ta_sound:"ஓபன்",
  breakdown:[{part:"O",ta:"ஓ"},{part:"pen",ta:"பென்"}],
  rule:"o long sound",
  example_en:"Open the door.",
  example_ta:"கதவை திற."
},
{
  id:"w616",
  en:"Close",
  ta_meaning:"மூடு",
  ta_sound:"க்ளோஸ்",
  breakdown:[{part:"Clo",ta:"க்ளோ"},{part:"se",ta:"ஸ்"}],
  rule:"magic e (o→ஓ)",
  example_en:"Close the window.",
  example_ta:"ஜன்னலை மூடு."
},
{
  id:"w617",
  en:"Start",
  ta_meaning:"தொடங்கு",
  ta_sound:"ஸ்டார்ட்",
  breakdown:[{part:"St",ta:"ஸ்ட"},{part:"art",ta:"ார்ட்"}],
  rule:"st blend",
  example_en:"Start the class.",
  example_ta:"வகுப்பை தொடங்கு."
},
{
  id:"w618",
  en:"Stop",
  ta_meaning:"நிறுத்து",
  ta_sound:"ஸ்டாப்",
  breakdown:[{part:"St",ta:"ஸ்ட"},{part:"op",ta:"ாப்"}],
  rule:"st blend",
  example_en:"Stop here.",
  example_ta:"இங்கே நிறுத்து."
},
{
  id:"w619",
  en:"Come",
  ta_meaning:"வா",
  ta_sound:"கம்",
  breakdown:[{part:"Co",ta:"க"},{part:"me",ta:"ம்"}],
  rule:"o changes sound",
  example_en:"Come here.",
  example_ta:"இங்கே வா."
},
{
  id:"w620",
  en:"Go",
  ta_meaning:"போ",
  ta_sound:"கோ",
  breakdown:[{part:"G",ta:"க"},{part:"o",ta:"ோ"}],
  rule:"o = ஓ",
  example_en:"Go now.",
  example_ta:"இப்போ போ."
},
{
  id:"w621",
  en:"Walk",
  ta_meaning:"நட",
  ta_sound:"வாக்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"lk",ta:"க்"}],
  rule:"l silent in walk",
  example_en:"Walk slowly.",
  example_ta:"மெதுவாக நட."
},
{
  id:"w622",
  en:"Run",
  ta_meaning:"ஓடு",
  ta_sound:"ரன்",
  breakdown:[{part:"Ru",ta:"ர"},{part:"n",ta:"ன்"}],
  rule:"short u",
  example_en:"Run fast.",
  example_ta:"வேகமாக ஓடு."
},
{
  id:"w623",
  en:"Sit",
  ta_meaning:"உட்கார்",
  ta_sound:"சிட்",
  breakdown:[{part:"Si",ta:"சி"},{part:"t",ta:"ட்"}],
  rule:"short i",
  example_en:"Sit down.",
  example_ta:"உட்கார்."
},
{
  id:"w624",
  en:"Stand",
  ta_meaning:"நில்",
  ta_sound:"ஸ்டேண்ட்",
  breakdown:[{part:"Sta",ta:"ஸ்டே"},{part:"nd",ta:"ண்ட்"}],
  rule:"nd = ண்ட்",
  example_en:"Stand here.",
  example_ta:"இங்கே நில்."
},

// Polite words
{
  id:"w625",
  en:"Please",
  ta_meaning:"தயவு செய்து",
  ta_sound:"ப்ளீஸ்",
  breakdown:[{part:"Ple",ta:"ப்ளீ"},{part:"ase",ta:"ஸ்"}],
  rule:"ea/ee sound",
  example_en:"Please help me.",
  example_ta:"தயவு செய்து எனக்கு உதவி செய்."
},
{
  id:"w626",
  en:"Sorry",
  ta_meaning:"மன்னிக்கவும்",
  ta_sound:"சாரி",
  breakdown:[{part:"Sor",ta:"சா"},{part:"ry",ta:"ரி"}],
  rule:"y ending = இ",
  example_en:"Sorry, I am late.",
  example_ta:"மன்னிக்கவும், நான் தாமதம்."
},
{
  id:"w627",
  en:"Thanks",
  ta_meaning:"நன்றி",
  ta_sound:"தேங்க்ஸ்",
  breakdown:[{part:"Tha",ta:"தே"},{part:"nks",ta:"ங்க்ஸ்"}],
  rule:"th = த",
  example_en:"Thanks a lot.",
  example_ta:"மிகவும் நன்றி."
},
{
  id:"w628",
  en:"Welcome",
  ta_meaning:"வரவேற்கிறேன்",
  ta_sound:"வெல்கம்",
  breakdown:[{part:"Wel",ta:"வெல்"},{part:"come",ta:"கம்"}],
  rule:"o changes sound",
  example_en:"You are welcome.",
  example_ta:"வரவேற்கிறேன்."
},
{
  id:"w629",
  en:"Excuse",
  ta_meaning:"மன்னிக்கவும் (கவனம் பெற)",
  ta_sound:"எக்ஸ்க்யூஸ்",
  breakdown:[{part:"Ex",ta:"எக்ஸ்"},{part:"cuse",ta:"க்யூஸ்"}],
  rule:"x = க்ஸ்",
  example_en:"Excuse me.",
  example_ta:"மன்னிக்கவும்."
},
{
  id:"w630",
  en:"Yes",
  ta_meaning:"ஆம்",
  ta_sound:"யெஸ்",
  breakdown:[{part:"Ye",ta:"யெ"},{part:"s",ta:"ஸ்"}],
  rule:"short e",
  example_en:"Yes, I can.",
  example_ta:"ஆம், நான் முடியும்."
},
{
  id:"w631",
  en:"No",
  ta_meaning:"இல்லை",
  ta_sound:"நோ",
  breakdown:[{part:"N",ta:"ந"},{part:"o",ta:"ோ"}],
  rule:"o = ஓ",
  example_en:"No, I can't.",
  example_ta:"இல்லை, நான் முடியாது."
},
{
  id:"w632",
  en:"Okay",
  ta_meaning:"சரி",
  ta_sound:"ஓகே",
  breakdown:[{part:"O",ta:"ஓ"},{part:"kay",ta:"கே"}],
  rule:"ay = ஏ",
  example_en:"Okay, let's go.",
  example_ta:"சரி, போகலாம்."
},
{
  id:"w633",
  en:"Good",
  ta_meaning:"நல்ல",
  ta_sound:"குட்",
  breakdown:[{part:"Go",ta:"கு"},{part:"od",ta:"ட்"}],
  rule:"oo short sound",
  example_en:"Good job.",
  example_ta:"நல்ல வேலை."
},
{
  id:"w634",
  en:"Great",
  ta_meaning:"அருமை",
  ta_sound:"க்ரேட்",
  breakdown:[{part:"Gr",ta:"க்ர"},{part:"eat",ta:"ேட்"}],
  rule:"ea = ஏ",
  example_en:"Great work!",
  example_ta:"அருமையான வேலை!"
},

// Family + people
{
  id:"w635",
  en:"Father",
  ta_meaning:"அப்பா",
  ta_sound:"ஃபாதர்",
  breakdown:[{part:"Fa",ta:"ஃபா"},{part:"ther",ta:"தர்"}],
  rule:"th = த",
  example_en:"My father is kind.",
  example_ta:"என் அப்பா நல்லவர்."
},
{
  id:"w636",
  en:"Mother",
  ta_meaning:"அம்மா",
  ta_sound:"மதர்",
  breakdown:[{part:"Mo",ta:"ம"},{part:"ther",ta:"தர்"}],
  rule:"th = த",
  example_en:"My mother cooks.",
  example_ta:"என் அம்மா சமைப்பார்."
},
{
  id:"w637",
  en:"Brother",
  ta_meaning:"அண்ணன்/தம்பி",
  ta_sound:"ப்ரதர்",
  breakdown:[{part:"Bro",ta:"ப்ர"},{part:"ther",ta:"தர்"}],
  rule:"th = த",
  example_en:"My brother studies.",
  example_ta:"என் அண்ணன் படிக்கிறார்."
},
{
  id:"w638",
  en:"Sister",
  ta_meaning:"அக்கா/தங்கை",
  ta_sound:"சிஸ்டர்",
  breakdown:[{part:"Sis",ta:"சிஸ்"},{part:"ter",ta:"டர்"}],
  rule:"er = அர்",
  example_en:"My sister sings.",
  example_ta:"என் அக்கா பாடுவார்."
},
{
  id:"w639",
  en:"Friend",
  ta_meaning:"நண்பன்",
  ta_sound:"ஃப்ரெண்ட்",
  breakdown:[{part:"Fri",ta:"ஃப்ரி"},{part:"end",ta:"எண்ட்"}],
  rule:"end = எண்ட்",
  example_en:"He is my friend.",
  example_ta:"அவன் என் நண்பன்."
},
{
  id:"w640",
  en:"Teacher",
  ta_meaning:"ஆசிரியர்",
  ta_sound:"டீச்சர்",
  breakdown:[{part:"Tea",ta:"டீ"},{part:"cher",ta:"ச்சர்"}],
  rule:"ch = ச",
  example_en:"Teacher is good.",
  example_ta:"ஆசிரியர் நல்லவர்."
},
{
  id:"w641",
  en:"Student",
  ta_meaning:"மாணவர்",
  ta_sound:"ஸ்டூடெண்ட்",
  breakdown:[{part:"Stu",ta:"ஸ்டூ"},{part:"dent",ta:"டெண்ட்"}],
  rule:"u = யூ",
  example_en:"I am a student.",
  example_ta:"நான் ஒரு மாணவர்."
},
{
  id:"w642",
  en:"Child",
  ta_meaning:"குழந்தை",
  ta_sound:"சைல்ட்",
  breakdown:[{part:"Chi",ta:"சை"},{part:"ld",ta:"ல்ட்"}],
  rule:"i = ஐ",
  example_en:"The child is happy.",
  example_ta:"குழந்தை மகிழ்ச்சி."
},
{
  id:"w643",
  en:"Man",
  ta_meaning:"ஆண்",
  ta_sound:"மேன்",
  breakdown:[{part:"Ma",ta:"மே"},{part:"n",ta:"ன்"}],
  rule:"short a",
  example_en:"That man is tall.",
  example_ta:"அந்த மனிதர் உயரம்."
},
{
  id:"w644",
  en:"Woman",
  ta_meaning:"பெண்",
  ta_sound:"வுமன்",
  breakdown:[{part:"Wo",ta:"வு"},{part:"man",ta:"மன்"}],
  rule:"o changes",
  example_en:"That woman is kind.",
  example_ta:"அந்த பெண் நல்லவர்."
},

// Time words
{
  id:"w645",
  en:"Morning",
  ta_meaning:"காலை",
  ta_sound:"மார்னிங்",
  breakdown:[{part:"Mor",ta:"மார்"},{part:"ning",ta:"னிங்"}],
  rule:"ng = ங்",
  example_en:"Good morning.",
  example_ta:"காலை வணக்கம்."
},
{
  id:"w646",
  en:"Night",
  ta_meaning:"இரவு",
  ta_sound:"நைட்",
  breakdown:[{part:"Ni",ta:"நை"},{part:"ght",ta:"ட்"}],
  rule:"gh silent",
  example_en:"Good night.",
  example_ta:"இரவு வணக்கம்."
},
{
  id:"w647",
  en:"Today",
  ta_meaning:"இன்று",
  ta_sound:"டுடே",
  breakdown:[{part:"To",ta:"டு"},{part:"day",ta:"டே"}],
  rule:"day = டே",
  example_en:"Today is good.",
  example_ta:"இன்று நல்லது."
},
{
  id:"w648",
  en:"Tomorrow",
  ta_meaning:"நாளை",
  ta_sound:"டுமாரோ",
  breakdown:[{part:"To",ta:"டு"},{part:"mor",ta:"மா"},{part:"row",ta:"ரோ"}],
  rule:"ow = ஓ",
  example_en:"See you tomorrow.",
  example_ta:"நாளை சந்திப்போம்."
},
{
  id:"w649",
  en:"Now",
  ta_meaning:"இப்போது",
  ta_sound:"நவ்",
  breakdown:[{part:"No",ta:"ந"},{part:"w",ta:"வ்"}],
  rule:"ow = அவ்",
  example_en:"Do it now.",
  example_ta:"இப்போ செய்."
},
{
  id:"w650",
  en:"Later",
  ta_meaning:"பிறகு",
  ta_sound:"லேட்டர்",
  breakdown:[{part:"La",ta:"லே"},{part:"ter",ta:"டர்"}],
  rule:"er = அர்",
  example_en:"I will come later.",
  example_ta:"நான் பிறகு வருவேன்."
},

// Places
{
  id:"w651",
  en:"Home",
  ta_meaning:"வீடு",
  ta_sound:"ஹோம்",
  breakdown:[{part:"Ho",ta:"ஹோ"},{part:"me",ta:"ம்"}],
  rule:"magic e",
  example_en:"Go home.",
  example_ta:"வீட்டுக்கு போ."
},
{
  id:"w652",
  en:"School",
  ta_meaning:"பள்ளி",
  ta_sound:"ஸ்கூல்",
  breakdown:[{part:"Sch",ta:"ஸ்க"},{part:"ool",ta:"ூல்"}],
  rule:"oo = ஊ",
  example_en:"School is near.",
  example_ta:"பள்ளி அருகில் உள்ளது."
},
{
  id:"w653",
  en:"Shop",
  ta_meaning:"கடை",
  ta_sound:"ஷாப்",
  breakdown:[{part:"Sh",ta:"ஷ"},{part:"op",ta:"ாப்"}],
  rule:"sh = ஷ",
  example_en:"Go to the shop.",
  example_ta:"கடைக்கு போ."
},
{
  id:"w654",
  en:"Office",
  ta_meaning:"அலுவலகம்",
  ta_sound:"ஆஃபிஸ்",
  breakdown:[{part:"Of",ta:"ஆஃப்"},{part:"fice",ta:"பிஸ்"}],
  rule:"ce = ஸ",
  example_en:"He goes to office.",
  example_ta:"அவன் அலுவலகம் போகிறான்."
},
{
  id:"w655",
  en:"Hospital",
  ta_meaning:"மருத்துவமனை",
  ta_sound:"ஹாஸ்பிட்டல்",
  breakdown:[{part:"Hos",ta:"ஹாஸ்"},{part:"pi",ta:"பி"},{part:"tal",ta:"டல்"}],
  rule:"syllables",
  example_en:"Go to hospital.",
  example_ta:"மருத்துவமனைக்கு போ."
},

// Remaining 50 words (daily common)
{
  id:"w656", en:"Water", ta_meaning:"தண்ணீர்", ta_sound:"வாட்டர்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"ter",ta:"டர்"}],
  rule:"er = அர்", example_en:"Drink water.", example_ta:"தண்ணீர் குடி."
},
{
  id:"w657", en:"Food", ta_meaning:"உணவு", ta_sound:"ஃபூட்",
  breakdown:[{part:"Fo",ta:"ஃபூ"},{part:"od",ta:"ட்"}],
  rule:"oo = ஊ", example_en:"Food is ready.", example_ta:"உணவு தயாராக உள்ளது."
},
{
  id:"w658", en:"Tea", ta_meaning:"டீ", ta_sound:"டீ",
  breakdown:[{part:"T",ta:"ட"},{part:"ea",ta:"ீ"}],
  rule:"ea = ஈ", example_en:"Tea please.", example_ta:"டீ தயவு செய்து."
},
{
  id:"w659", en:"Coffee", ta_meaning:"காபி", ta_sound:"காஃபி",
  breakdown:[{part:"Cof",ta:"காஃப்"},{part:"fee",ta:"ஃபீ"}],
  rule:"ee = ஈ", example_en:"Coffee is hot.", example_ta:"காபி சூடு."
},
{
  id:"w660", en:"Rice", ta_meaning:"அரிசி", ta_sound:"ரைஸ்",
  breakdown:[{part:"Ri",ta:"ரை"},{part:"ce",ta:"ஸ்"}],
  rule:"ce = ஸ", example_en:"Rice is good.", example_ta:"அரிசி நல்லது."
},
{
  id:"w661", en:"Salt", ta_meaning:"உப்பு", ta_sound:"சால்ட்",
  breakdown:[{part:"Sa",ta:"சா"},{part:"lt",ta:"ல்ட்"}],
  rule:"lt ending", example_en:"Add salt.", example_ta:"உப்பு போடு."
},
{
  id:"w662", en:"Sugar", ta_meaning:"சர்க்கரை", ta_sound:"ஷுகர்",
  breakdown:[{part:"Su",ta:"ஷு"},{part:"gar",ta:"கர்"}],
  rule:"g soft sometimes", example_en:"Less sugar.", example_ta:"சர்க்கரை குறைவு."
},
{
  id:"w663", en:"Money", ta_meaning:"பணம்", ta_sound:"மனி",
  breakdown:[{part:"Mo",ta:"ம"},{part:"ney",ta:"னி"}],
  rule:"ey = இ", example_en:"Save money.", example_ta:"பணம் சேமி."
},
{
  id:"w664", en:"Phone", ta_meaning:"போன்", ta_sound:"ஃபோன்",
  breakdown:[{part:"Ph",ta:"ஃப"},{part:"one",ta:"ோன்"}],
  rule:"ph = ஃப", example_en:"Call me on phone.", example_ta:"போனில் கால் செய்."
},
{
  id:"w665", en:"Call", ta_meaning:"கால் செய்", ta_sound:"கால்",
  breakdown:[{part:"Ca",ta:"கா"},{part:"ll",ta:"ல்"}],
  rule:"ll = ல்", example_en:"Call now.", example_ta:"இப்போ கால் செய்."
},

{
  id:"w666", en:"Message", ta_meaning:"செய்தி", ta_sound:"மெசேஜ்",
  breakdown:[{part:"Mes",ta:"மெஸ்"},{part:"sage",ta:"ேஜ்"}],
  rule:"ge = ஜ்", example_en:"Send a message.", example_ta:"ஒரு மெசேஜ் அனுப்பு."
},
{
  id:"w667", en:"Send", ta_meaning:"அனுப்பு", ta_sound:"செண்ட்",
  breakdown:[{part:"Se",ta:"செ"},{part:"nd",ta:"ண்ட்"}],
  rule:"nd = ண்ட்", example_en:"Send it.", example_ta:"அதை அனுப்பு."
},
{
  id:"w668", en:"Receive", ta_meaning:"பெறு", ta_sound:"ரிசீவ்",
  breakdown:[{part:"Re",ta:"ரி"},{part:"ceive",ta:"சீவ்"}],
  rule:"ce = சீ", example_en:"I receive it.", example_ta:"நான் அதை பெறுகிறேன்."
},
{
  id:"w669", en:"Help", ta_meaning:"உதவி", ta_sound:"ஹெல்ப்",
  breakdown:[{part:"He",ta:"ஹெ"},{part:"lp",ta:"ல்ப்"}],
  rule:"lp ending", example_en:"Help me.", example_ta:"எனக்கு உதவி செய்."
},
{
  id:"w670", en:"Problem", ta_meaning:"பிரச்சனை", ta_sound:"ப்ராப்ளம்",
  breakdown:[{part:"Pro",ta:"ப்ரா"},{part:"blem",ta:"ப்ளம்"}],
  rule:"bl blend", example_en:"I have a problem.", example_ta:"எனக்கு ஒரு பிரச்சனை உள்ளது."
},

{
  id:"w671", en:"Easy", ta_meaning:"எளிது", ta_sound:"ஈசி",
  breakdown:[{part:"Ea",ta:"ஈ"},{part:"sy",ta:"சி"}],
  rule:"ea = ஈ", example_en:"This is easy.", example_ta:"இது எளிது."
},
{
  id:"w672", en:"Hard", ta_meaning:"கடினம்", ta_sound:"ஹார்ட்",
  breakdown:[{part:"Ha",ta:"ஹா"},{part:"rd",ta:"ர்ட்"}],
  rule:"ar = ஆர்", example_en:"This is hard.", example_ta:"இது கடினம்."
},
{
  id:"w673", en:"Fast", ta_meaning:"வேகமாக", ta_sound:"ஃபாஸ்ட்",
  breakdown:[{part:"Fa",ta:"ஃபா"},{part:"st",ta:"ஸ்ட்"}],
  rule:"st = ஸ்ட்", example_en:"Run fast.", example_ta:"வேகமாக ஓடு."
},
{
  id:"w674", en:"Slow", ta_meaning:"மெதுவாக", ta_sound:"ஸ்லோ",
  breakdown:[{part:"Slo",ta:"ஸ்லோ"}],
  rule:"ow = ஓ", example_en:"Walk slow.", example_ta:"மெதுவாக நட."
},
{
  id:"w675", en:"Again", ta_meaning:"மீண்டும்", ta_sound:"அகெயின்",
  breakdown:[{part:"A",ta:"அ"},{part:"gain",ta:"கெயின்"}],
  rule:"ai = எய்", example_en:"Try again.", example_ta:"மீண்டும் முயற்சி செய்."
},

{
  id:"w676", en:"Right", ta_meaning:"சரி / வலது", ta_sound:"ரைட்",
  breakdown:[{part:"Ri",ta:"ரை"},{part:"ght",ta:"ட்"}],
  rule:"gh silent", example_en:"You are right.", example_ta:"நீ சரி."
},
{
  id:"w677", en:"Wrong", ta_meaning:"தவறு", ta_sound:"ராங்",
  breakdown:[{part:"Wro",ta:"ரா"},{part:"ng",ta:"ங்"}],
  rule:"ng = ங்", example_en:"This is wrong.", example_ta:"இது தவறு."
},
{
  id:"w678", en:"Correct", ta_meaning:"சரி", ta_sound:"கரெக்ட்",
  breakdown:[{part:"Cor",ta:"க"},{part:"rect",ta:"ரெக்ட்"}],
  rule:"ct = க்ட்", example_en:"Correct answer.", example_ta:"சரியான பதில்."
},
{
  id:"w679", en:"Answer", ta_meaning:"பதில்", ta_sound:"ஆன்சர்",
  breakdown:[{part:"An",ta:"ஆன்"},{part:"swer",ta:"சர்"}],
  rule:"w silent in answer",
  example_en:"Give the answer.",
  example_ta:"பதில் கொடு."
},
{
  id:"w680", en:"Question", ta_meaning:"கேள்வி", ta_sound:"க்வெஸ்சன்",
  breakdown:[{part:"Ques",ta:"க்வெஸ்"},{part:"tion",ta:"சன்"}],
  rule:"tion = ஷன்/சன்",
  example_en:"Ask a question.",
  example_ta:"ஒரு கேள்வி கேள்."
},

// Final 24 words
{
  id:"w681", en:"Word", ta_meaning:"வார்த்தை", ta_sound:"வர்ட்",
  breakdown:[{part:"Wo",ta:"வ"},{part:"rd",ta:"ர்ட்"}],
  rule:"or = அர்", example_en:"Learn a word.", example_ta:"ஒரு வார்த்தை கற்று."
},
{
  id:"w682", en:"Sentence", ta_meaning:"வாக்கியம்", ta_sound:"சென்டென்ஸ்",
  breakdown:[{part:"Sen",ta:"சென்"},{part:"tence",ta:"டென்ஸ்"}],
  rule:"ce = ஸ", example_en:"Read the sentence.", example_ta:"வாக்கியத்தை படி."
},
{
  id:"w683", en:"Meaning", ta_meaning:"அர்த்தம்", ta_sound:"மீனிங்",
  breakdown:[{part:"Mea",ta:"மீ"},{part:"ning",ta:"னிங்"}],
  rule:"ea = ஈ", example_en:"What is the meaning?", example_ta:"அர்த்தம் என்ன?"
},
{
  id:"w684", en:"Sound", ta_meaning:"ஒலி", ta_sound:"சவுண்ட்",
  breakdown:[{part:"Sou",ta:"சவ்"},{part:"nd",ta:"ண்ட்"}],
  rule:"ou = அவ்", example_en:"Sound is clear.", example_ta:"ஒலி தெளிவு."
},
{
  id:"w685", en:"Voice", ta_meaning:"குரல்", ta_sound:"வாய்ஸ்",
  breakdown:[{part:"Voi",ta:"வாய்"},{part:"ce",ta:"ஸ்"}],
  rule:"oi = ஆய்", example_en:"Your voice is good.", example_ta:"உன் குரல் நல்லது."
},
{
  id:"w686", en:"Speak slowly", ta_meaning:"மெதுவாக பேசு", ta_sound:"ஸ்பீக் ஸ்லோலி",
  breakdown:[{part:"Speak",ta:"ஸ்பீக்"},{part:"slow",ta:"ஸ்லோ"}],
  rule:"phrase", example_en:"Speak slowly.", example_ta:"மெதுவாக பேசு."
},
{
  id:"w687", en:"Read daily", ta_meaning:"தினமும் படி", ta_sound:"ரீட் டெய்லி",
  breakdown:[{part:"Read",ta:"ரீட்"},{part:"daily",ta:"டெய்லி"}],
  rule:"phrase", example_en:"Read daily.", example_ta:"தினமும் படி."
},
{
  id:"w688", en:"Write clearly", ta_meaning:"தெளிவாக எழுது", ta_sound:"ரைட் கிளியர்லி",
  breakdown:[{part:"Write",ta:"ரைட்"},{part:"clearly",ta:"க்ளியர்லி"}],
  rule:"phrase", example_en:"Write clearly.", example_ta:"தெளிவாக எழுது."
},
{
  id:"w689", en:"Listen carefully", ta_meaning:"கவனமாக கேள்", ta_sound:"லிஸன் கேர் ஃபுல்லி",
  breakdown:[{part:"Listen",ta:"லிஸன்"},{part:"carefully",ta:"கேர் ஃபுல்லி"}],
  rule:"phrase", example_en:"Listen carefully.", example_ta:"கவனமாக கேள்."
},
{
  id:"w690", en:"Understand", ta_meaning:"புரிந்து கொள்", ta_sound:"அண்டர்ஸ்டேண்ட்",
  breakdown:[{part:"Un",ta:"அன்"},{part:"der",ta:"டர்"},{part:"stand",ta:"ஸ்டேண்ட்"}],
  rule:"compound", example_en:"I understand.", example_ta:"நான் புரிந்துகொண்டேன்."
},

{
  id:"w691", en:"Know", ta_meaning:"தெரியும்", ta_sound:"நோ",
  breakdown:[{part:"Kn",ta:"(k silent)"},{part:"ow",ta:"ோ"}],
  rule:"k silent in know",
  example_en:"I know this.",
  example_ta:"இது எனக்கு தெரியும்."
},
{
  id:"w692", en:"Knife", ta_meaning:"கத்தி", ta_sound:"நைஃப்",
  breakdown:[{part:"k",ta:"(silent)"},{part:"ni",ta:"நை"},{part:"fe",ta:"ஃப்"}],
  rule:"k silent",
  example_en:"This is a knife.",
  example_ta:"இது ஒரு கத்தி."
},
{
  id:"w693", en:"Honest", ta_meaning:"நேர்மையான", ta_sound:"ஆனஸ்ட்",
  breakdown:[{part:"Ho",ta:"ஆ"},{part:"nest",ta:"னஸ்ட்"}],
  rule:"h silent in honest",
  example_en:"He is honest.",
  example_ta:"அவன் நேர்மையானவன்."
},
{
  id:"w694", en:"Hour", ta_meaning:"மணி நேரம்", ta_sound:"ஆவர்",
  breakdown:[{part:"H",ta:"(silent)"},{part:"our",ta:"ஆவர்"}],
  rule:"h silent",
  example_en:"One hour.",
  example_ta:"ஒரு மணி நேரம்."
},
{
  id:"w695", en:"Light", ta_meaning:"ஒளி / லைட்", ta_sound:"லைட்",
  breakdown:[{part:"Li",ta:"லை"},{part:"ght",ta:"ட்"}],
  rule:"gh silent",
  example_en:"Turn on the light.",
  example_ta:"லைட்டை ஆன் செய்."
},
{
  id:"w696", en:"Right", ta_meaning:"சரி / வலது", ta_sound:"ரைட்",
  breakdown:[{part:"Ri",ta:"ரை"},{part:"ght",ta:"ட்"}],
  rule:"gh silent",
  example_en:"Right answer.",
  example_ta:"சரியான பதில்."
},
{
  id:"w697", en:"Night", ta_meaning:"இரவு", ta_sound:"நைட்",
  breakdown:[{part:"Ni",ta:"நை"},{part:"ght",ta:"ட்"}],
  rule:"gh silent",
  example_en:"Good night.",
  example_ta:"இரவு வணக்கம்."
},
{
  id:"w698", en:"Talk", ta_meaning:"பேசு", ta_sound:"டாக்",
  breakdown:[{part:"Ta",ta:"டா"},{part:"lk",ta:"க்"}],
  rule:"l silent",
  example_en:"Talk to me.",
  example_ta:"என்னிடம் பேசு."
},
{
  id:"w699", en:"Half", ta_meaning:"பாதி", ta_sound:"ஹாஃப்",
  breakdown:[{part:"Ha",ta:"ஹா"},{part:"lf",ta:"ஃப்"}],
  rule:"l silent",
  example_en:"Half cup.",
  example_ta:"பாதி கப்."
},
{
  id:"w700", en:"Calm", ta_meaning:"அமைதி", ta_sound:"காம்",
  breakdown:[{part:"Ca",ta:"கா"},{part:"lm",ta:"ம்"}],
  rule:"l silent",
  example_en:"Stay calm.",
  example_ta:"அமைதியாக இரு."
},
{
  id:"w701", en:"Walk", ta_meaning:"நட", ta_sound:"வாக்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"lk",ta:"க்"}],
  rule:"l silent",
  example_en:"Walk daily.",
  example_ta:"தினமும் நட."
},
{
  id:"w702", en:"Listen", ta_meaning:"கேள்", ta_sound:"லிஸன்",
  breakdown:[{part:"Lis",ta:"லிஸ்"},{part:"ten",ta:"ன்"}],
  rule:"t silent",
  example_en:"Listen to me.",
  example_ta:"என்னை கேள்."
},
{
  id:"w703", en:"Often", ta_meaning:"அடிக்கடி", ta_sound:"ஆஃபன்",
  breakdown:[{part:"Of",ta:"ஆஃப்"},{part:"ten",ta:"ன்"}],
  rule:"t silent sometimes (often)",
  example_en:"I often study.",
  example_ta:"நான் அடிக்கடி படிப்பேன்."
},
{
  id:"w704", en:"Whistle", ta_meaning:"விசில்", ta_sound:"விஸல்",
  breakdown:[{part:"Whis",ta:"விஸ்"},{part:"tle",ta:"ல்"}],
  rule:"t silent sometimes",
  example_en:"I hear a whistle.",
  example_ta:"நான் விசில் சத்தம் கேட்கிறேன்."
},
// ===== Fluent Pack 7 (Sentences 306–355) =====
{ id:"s306", en:"Read this book.", ta_meaning:"இந்த புத்தகம் படி.", ta_sound:"ரீட் திஸ் புக்." },
{ id:"s307", en:"Write your name.", ta_meaning:"உன் பெயரை எழுது.", ta_sound:"ரைட் யோர் நேம்." },
{ id:"s308", en:"Speak in English.", ta_meaning:"ஆங்கிலத்தில் பேசு.", ta_sound:"ஸ்பீக் இன் இங்கிலிஷ்." },
{ id:"s309", en:"Listen carefully.", ta_meaning:"கவனமாக கேள்.", ta_sound:"லிஸன் கேர் ஃபுல்லி." },
{ id:"s310", en:"Learn daily.", ta_meaning:"தினமும் கற்று.", ta_sound:"லர்ன் டெய்லி." },

{ id:"s311", en:"Teach me English.", ta_meaning:"எனக்கு ஆங்கிலம் கற்பி.", ta_sound:"டீச் மீ இங்கிலிஷ்." },
{ id:"s312", en:"Study now.", ta_meaning:"இப்போ படி.", ta_sound:"ஸ்டடி நவ்." },
{ id:"s313", en:"Practice speaking.", ta_meaning:"பேச பயிற்சி செய்.", ta_sound:"ப்ராக்டிஸ் ஸ்பீக்கிங்." },
{ id:"s314", en:"Repeat after me.", ta_meaning:"என் பின்னால் மீண்டும் சொல்.", ta_sound:"ரிபீட் ஆஃப்டர் மீ." },
{ id:"s315", en:"Open the door.", ta_meaning:"கதவை திற.", ta_sound:"ஓபன் த டோர்." },

{ id:"s316", en:"Close the window.", ta_meaning:"ஜன்னலை மூடு.", ta_sound:"க்ளோஸ் த விண்டோ." },
{ id:"s317", en:"Start the class.", ta_meaning:"வகுப்பை தொடங்கு.", ta_sound:"ஸ்டார்ட் த கிளாஸ்." },
{ id:"s318", en:"Stop here.", ta_meaning:"இங்கே நிறுத்து.", ta_sound:"ஸ்டாப் ஹியர்." },
{ id:"s319", en:"Come here.", ta_meaning:"இங்கே வா.", ta_sound:"கம் ஹியர்." },
{ id:"s320", en:"Go now.", ta_meaning:"இப்போ போ.", ta_sound:"கோ நவ்." },

{ id:"s321", en:"Walk slowly.", ta_meaning:"மெதுவாக நட.", ta_sound:"வாக் ஸ்லோலி." },
{ id:"s322", en:"Run fast.", ta_meaning:"வேகமாக ஓடு.", ta_sound:"ரன் ஃபாஸ்ட்." },
{ id:"s323", en:"Sit down.", ta_meaning:"உட்கார்.", ta_sound:"சிட் டவுன்." },
{ id:"s324", en:"Stand here.", ta_meaning:"இங்கே நில்.", ta_sound:"ஸ்டேண்ட் ஹியர்." },
{ id:"s325", en:"Please help me.", ta_meaning:"தயவு செய்து எனக்கு உதவி செய்.", ta_sound:"ப்ளீஸ் ஹெல்ப் மீ." },

{ id:"s326", en:"Sorry, I am late.", ta_meaning:"மன்னிக்கவும், நான் தாமதம்.", ta_sound:"சாரி, ஐ ஆம் லேட்." },
{ id:"s327", en:"Thanks a lot.", ta_meaning:"மிகவும் நன்றி.", ta_sound:"தேங்க்ஸ் அ லாட்." },
{ id:"s328", en:"You are welcome.", ta_meaning:"வரவேற்கிறேன்.", ta_sound:"யூ ஆர் வெல்கம்." },
{ id:"s329", en:"Excuse me.", ta_meaning:"மன்னிக்கவும்.", ta_sound:"எக்ஸ்க்யூஸ் மீ." },
{ id:"s330", en:"Okay, let's go.", ta_meaning:"சரி, போகலாம்.", ta_sound:"ஓகே, லெட்ஸ் கோ." },

{ id:"s331", en:"Good job.", ta_meaning:"நல்ல வேலை.", ta_sound:"குட் ஜாப்." },
{ id:"s332", en:"Great work!", ta_meaning:"அருமையான வேலை!", ta_sound:"க்ரேட் வொர்க்!" },
{ id:"s333", en:"My father is kind.", ta_meaning:"என் அப்பா நல்லவர்.", ta_sound:"மை ஃபாதர் இஸ் கைண்ட்." },
{ id:"s334", en:"My mother cooks.", ta_meaning:"என் அம்மா சமைப்பார்.", ta_sound:"மை மதர் குக்ஸ்." },
{ id:"s335", en:"My brother studies.", ta_meaning:"என் அண்ணன் படிக்கிறார்.", ta_sound:"மை ப்ரதர் ஸ்டடீஸ்." },

{ id:"s336", en:"My sister sings.", ta_meaning:"என் அக்கா பாடுவார்.", ta_sound:"மை சிஸ்டர் சிங்ஸ்." },
{ id:"s337", en:"He is my friend.", ta_meaning:"அவன் என் நண்பன்.", ta_sound:"ஹீ இஸ் மை ஃப்ரெண்ட்." },
{ id:"s338", en:"I am a student.", ta_meaning:"நான் ஒரு மாணவர்.", ta_sound:"ஐ ஆம் அ ஸ்டூடெண்ட்." },
{ id:"s339", en:"The child is happy.", ta_meaning:"குழந்தை மகிழ்ச்சி.", ta_sound:"த சைல்ட் இஸ் ஹாப்பி." },
{ id:"s340", en:"That woman is kind.", ta_meaning:"அந்த பெண் நல்லவர்.", ta_sound:"தாட் வுமன் இஸ் கைண்ட்." },

{ id:"s341", en:"Good morning.", ta_meaning:"காலை வணக்கம்.", ta_sound:"குட் மார்னிங்." },
{ id:"s342", en:"Good night.", ta_meaning:"இரவு வணக்கம்.", ta_sound:"குட் நைட்." },
{ id:"s343", en:"Do it now.", ta_meaning:"இப்போ செய்.", ta_sound:"டூ இட் நவ்." },
{ id:"s344", en:"I will come later.", ta_meaning:"நான் பிறகு வருவேன்.", ta_sound:"ஐ வில் கம் லேட்டர்." },
{ id:"s345", en:"Go to the shop.", ta_meaning:"கடைக்கு போ.", ta_sound:"கோ டு த ஷாப்." },

{ id:"s346", en:"He goes to office.", ta_meaning:"அவன் அலுவலகம் போகிறான்.", ta_sound:"ஹீ கோஸ் டு ஆஃபிஸ்." },
{ id:"s347", en:"Go to hospital.", ta_meaning:"மருத்துவமனைக்கு போ.", ta_sound:"கோ டு ஹாஸ்பிட்டல்." },
{ id:"s348", en:"Call me on phone.", ta_meaning:"போனில் கால் செய்.", ta_sound:"கால் மீ ஆன் ஃபோன்." },
{ id:"s349", en:"Send a message.", ta_meaning:"ஒரு மெசேஜ் அனுப்பு.", ta_sound:"செண்ட் அ மெசேஜ்." },
{ id:"s350", en:"I have a problem.", ta_meaning:"எனக்கு ஒரு பிரச்சனை உள்ளது.", ta_sound:"ஐ ஹேவ் அ ப்ராப்ளம்." },

{ id:"s351", en:"This is easy.", ta_meaning:"இது எளிது.", ta_sound:"திஸ் இஸ் ஈசி." },
{ id:"s352", en:"This is hard.", ta_meaning:"இது கடினம்.", ta_sound:"திஸ் இஸ் ஹார்ட்." },
{ id:"s353", en:"You are right.", ta_meaning:"நீ சரி.", ta_sound:"யூ ஆர் ரைட்." },
{ id:"s354", en:"This is wrong.", ta_meaning:"இது தவறு.", ta_sound:"திஸ் இஸ் ராங்." },
{ id:"s355", en:"Give the answer.", ta_meaning:"பதில் கொடு.", ta_sound:"கிவ் த ஆன்சர்." },
// ===== Fluent Pack 8 (Words 705–804) =====

// Basic question words (WH words)
{
  id:"w705",
  en:"What",
  ta_meaning:"என்ன",
  ta_sound:"வாட்",
  breakdown:[{part:"Wh",ta:"வ"},{part:"at",ta:"ாட்"}],
  rule:"wh = வ, t ending = ட்",
  example_en:"What is this?",
  example_ta:"இது என்ன?"
},
{
  id:"w706",
  en:"Why",
  ta_meaning:"ஏன்",
  ta_sound:"வை",
  breakdown:[{part:"Wh",ta:"வ"},{part:"y",ta:"ை"}],
  rule:"wh = வ, y = ஐ",
  example_en:"Why are you sad?",
  example_ta:"நீ ஏன் சோகமாக இருக்கிறாய்?"
},
{
  id:"w707",
  en:"Where",
  ta_meaning:"எங்கே",
  ta_sound:"வேர்",
  breakdown:[{part:"Wh",ta:"வ"},{part:"ere",ta:"ேர்"}],
  rule:"wh = வ",
  example_en:"Where is my phone?",
  example_ta:"என் போன் எங்கே?"
},
{
  id:"w708",
  en:"When",
  ta_meaning:"எப்போது",
  ta_sound:"வென்",
  breakdown:[{part:"Wh",ta:"வ"},{part:"en",ta:"ென்"}],
  rule:"wh = வ",
  example_en:"When will you come?",
  example_ta:"நீ எப்போது வருவாய்?"
},
{
  id:"w709",
  en:"Who",
  ta_meaning:"யார்",
  ta_sound:"ஹூ",
  breakdown:[{part:"Wh",ta:"ஹ"},{part:"o",ta:"ூ"}],
  rule:"who = ஹூ",
  example_en:"Who is he?",
  example_ta:"அவன் யார்?"
},
{
  id:"w710",
  en:"How",
  ta_meaning:"எப்படி",
  ta_sound:"ஹவ்",
  breakdown:[{part:"Ho",ta:"ஹ"},{part:"w",ta:"வ்"}],
  rule:"ow = அவ்",
  example_en:"How are you?",
  example_ta:"நீ எப்படி இருக்கிறாய்?"
},

// Numbers
{
  id:"w711",
  en:"One",
  ta_meaning:"ஒன்று",
  ta_sound:"வன்",
  breakdown:[{part:"O",ta:"வ"},{part:"ne",ta:"ன்"}],
  rule:"one = வன்",
  example_en:"One apple.",
  example_ta:"ஒரு ஆப்பிள்."
},
{
  id:"w712",
  en:"Two",
  ta_meaning:"இரண்டு",
  ta_sound:"டூ",
  breakdown:[{part:"Tw",ta:"ட்வ"},{part:"o",ta:"ூ"}],
  rule:"two = டூ",
  example_en:"Two books.",
  example_ta:"இரண்டு புத்தகங்கள்."
},
{
  id:"w713",
  en:"Three",
  ta_meaning:"மூன்று",
  ta_sound:"த்ரீ",
  breakdown:[{part:"Th",ta:"த்"},{part:"ree",ta:"ரீ"}],
  rule:"th sound + ee",
  example_en:"Three pens.",
  example_ta:"மூன்று பேனாக்கள்."
},
{
  id:"w714",
  en:"Four",
  ta_meaning:"நான்கு",
  ta_sound:"ஃபோர்",
  breakdown:[{part:"Fo",ta:"ஃபோ"},{part:"ur",ta:"ர்"}],
  rule:"our = ஓர்",
  example_en:"Four chairs.",
  example_ta:"நான்கு நாற்காலிகள்."
},
{
  id:"w715",
  en:"Five",
  ta_meaning:"ஐந்து",
  ta_sound:"ஃபைவ்",
  breakdown:[{part:"Fi",ta:"ஃபை"},{part:"ve",ta:"வ்"}],
  rule:"magic e",
  example_en:"Five minutes.",
  example_ta:"ஐந்து நிமிடம்."
},
{
  id:"w716",
  en:"Six",
  ta_meaning:"ஆறு",
  ta_sound:"சிக்ஸ்",
  breakdown:[{part:"Si",ta:"சி"},{part:"x",ta:"க்ஸ்"}],
  rule:"x = க்ஸ்",
  example_en:"Six cups.",
  example_ta:"ஆறு கப்புகள்."
},
{
  id:"w717",
  en:"Seven",
  ta_meaning:"ஏழு",
  ta_sound:"செவன்",
  breakdown:[{part:"Se",ta:"செ"},{part:"ven",ta:"வன்"}],
  rule:"short e",
  example_en:"Seven days.",
  example_ta:"ஏழு நாட்கள்."
},
{
  id:"w718",
  en:"Eight",
  ta_meaning:"எட்டு",
  ta_sound:"ஏட்",
  breakdown:[{part:"Ei",ta:"ஏ"},{part:"ght",ta:"ட்"}],
  rule:"gh silent",
  example_en:"Eight hours.",
  example_ta:"எட்டு மணி."
},
{
  id:"w719",
  en:"Nine",
  ta_meaning:"ஒன்பது",
  ta_sound:"நைன்",
  breakdown:[{part:"Ni",ta:"நை"},{part:"ne",ta:"ன்"}],
  rule:"magic e",
  example_en:"Nine people.",
  example_ta:"ஒன்பது பேர்."
},
{
  id:"w720",
  en:"Ten",
  ta_meaning:"பத்து",
  ta_sound:"டென்",
  breakdown:[{part:"Te",ta:"டெ"},{part:"n",ta:"ன்"}],
  rule:"short e",
  example_en:"Ten rupees.",
  example_ta:"பத்து ரூபாய்."
},

// Common adjectives
{
  id:"w721",
  en:"Small",
  ta_meaning:"சிறிய",
  ta_sound:"ஸ்மால்",
  breakdown:[{part:"Sma",ta:"ஸ்மா"},{part:"ll",ta:"ல்"}],
  rule:"ll = ல்",
  example_en:"Small bag.",
  example_ta:"சிறிய பை."
},
{
  id:"w722",
  en:"Big",
  ta_meaning:"பெரிய",
  ta_sound:"பிக்",
  breakdown:[{part:"Bi",ta:"பி"},{part:"g",ta:"க்"}],
  rule:"g ending = க்",
  example_en:"Big house.",
  example_ta:"பெரிய வீடு."
},
{
  id:"w723",
  en:"Long",
  ta_meaning:"நீளம்",
  ta_sound:"லாங்",
  breakdown:[{part:"Lo",ta:"லா"},{part:"ng",ta:"ங்"}],
  rule:"ng = ங்",
  example_en:"Long road.",
  example_ta:"நீளமான சாலை."
},
{
  id:"w724",
  en:"Short",
  ta_meaning:"குறுகிய",
  ta_sound:"ஷார்ட்",
  breakdown:[{part:"Sho",ta:"ஷா"},{part:"rt",ta:"ர்ட்"}],
  rule:"or = ஆர்",
  example_en:"Short time.",
  example_ta:"குறுகிய நேரம்."
},
{
  id:"w725",
  en:"New",
  ta_meaning:"புதிய",
  ta_sound:"நியூ",
  breakdown:[{part:"Ne",ta:"நி"},{part:"w",ta:"யூ"}],
  rule:"ew = யூ",
  example_en:"New phone.",
  example_ta:"புதிய போன்."
},
{
  id:"w726",
  en:"Old",
  ta_meaning:"பழைய",
  ta_sound:"ஓல்ட்",
  breakdown:[{part:"Ol",ta:"ஓல்"},{part:"d",ta:"ட்"}],
  rule:"old = ஓல்ட்",
  example_en:"Old book.",
  example_ta:"பழைய புத்தகம்."
},
{
  id:"w727",
  en:"Happy",
  ta_meaning:"மகிழ்ச்சி",
  ta_sound:"ஹாப்பி",
  breakdown:[{part:"Ha",ta:"ஹா"},{part:"ppy",ta:"ப்பி"}],
  rule:"double p",
  example_en:"I am happy.",
  example_ta:"நான் மகிழ்ச்சி."
},
{
  id:"w728",
  en:"Sad",
  ta_meaning:"சோகமாக",
  ta_sound:"சாட்",
  breakdown:[{part:"Sa",ta:"சா"},{part:"d",ta:"ட்"}],
  rule:"short a",
  example_en:"He is sad.",
  example_ta:"அவன் சோகமாக இருக்கிறான்."
},
{
  id:"w729",
  en:"Good",
  ta_meaning:"நல்ல",
  ta_sound:"குட்",
  breakdown:[{part:"Go",ta:"கு"},{part:"od",ta:"ட்"}],
  rule:"oo short",
  example_en:"Good boy.",
  example_ta:"நல்ல பையன்."
},
{
  id:"w730",
  en:"Bad",
  ta_meaning:"மோசமான",
  ta_sound:"பேட்",
  breakdown:[{part:"Ba",ta:"பே"},{part:"d",ta:"ட்"}],
  rule:"short a",
  example_en:"Bad habit.",
  example_ta:"மோசமான பழக்கம்."
},

// Common nouns
{
  id:"w731",
  en:"Book",
  ta_meaning:"புத்தகம்",
  ta_sound:"புக்",
  breakdown:[{part:"Bo",ta:"பு"},{part:"ok",ta:"க்"}],
  rule:"oo short",
  example_en:"This book is good.",
  example_ta:"இந்த புத்தகம் நல்லது."
},
{
  id:"w732",
  en:"Pen",
  ta_meaning:"பேனா",
  ta_sound:"பென்",
  breakdown:[{part:"Pe",ta:"பெ"},{part:"n",ta:"ன்"}],
  rule:"short e",
  example_en:"Give me a pen.",
  example_ta:"எனக்கு பேனா கொடு."
},
{
  id:"w733",
  en:"Pencil",
  ta_meaning:"பென்சில்",
  ta_sound:"பென்சில்",
  breakdown:[{part:"Pen",ta:"பென்"},{part:"cil",ta:"சில்"}],
  rule:"c = ச",
  example_en:"I have a pencil.",
  example_ta:"என்னிடம் பென்சில் உள்ளது."
},
{
  id:"w734",
  en:"Table",
  ta_meaning:"மேசை",
  ta_sound:"டேபிள்",
  breakdown:[{part:"Ta",ta:"டே"},{part:"ble",ta:"பிள்"}],
  rule:"ble = பிள்",
  example_en:"Table is clean.",
  example_ta:"மேசை சுத்தம்."
},
{
  id:"w735",
  en:"Chair",
  ta_meaning:"நாற்காலி",
  ta_sound:"சேர்",
  breakdown:[{part:"Ch",ta:"ச"},{part:"air",ta:"ேர்"}],
  rule:"air = ஏர்",
  example_en:"Sit on the chair.",
  example_ta:"நாற்காலியில் உட்கார்."
},
{
  id:"w736",
  en:"Door",
  ta_meaning:"கதவு",
  ta_sound:"டோர்",
  breakdown:[{part:"Do",ta:"டோ"},{part:"or",ta:"ர்"}],
  rule:"oo/or sound",
  example_en:"Open the door.",
  example_ta:"கதவை திற."
},
{
  id:"w737",
  en:"Window",
  ta_meaning:"ஜன்னல்",
  ta_sound:"விண்டோ",
  breakdown:[{part:"Win",ta:"வின்"},{part:"dow",ta:"டோ"}],
  rule:"ow = ஓ",
  example_en:"Close the window.",
  example_ta:"ஜன்னலை மூடு."
},
{
  id:"w738",
  en:"Room",
  ta_meaning:"அறை",
  ta_sound:"ரூம்",
  breakdown:[{part:"Ro",ta:"ரூ"},{part:"om",ta:"ம்"}],
  rule:"oo = ஊ",
  example_en:"My room is big.",
  example_ta:"என் அறை பெரியது."
},
{
  id:"w739",
  en:"House",
  ta_meaning:"வீடு",
  ta_sound:"ஹவுஸ்",
  breakdown:[{part:"Hou",ta:"ஹவ்"},{part:"se",ta:"ஸ்"}],
  rule:"ou = அவ்",
  example_en:"This house is new.",
  example_ta:"இந்த வீடு புதியது."
},
{
  id:"w740",
  en:"Road",
  ta_meaning:"சாலை",
  ta_sound:"ரோட்",
  breakdown:[{part:"Ro",ta:"ரோ"},{part:"ad",ta:"ட்"}],
  rule:"oa = ஓ",
  example_en:"The road is long.",
  example_ta:"சாலை நீளம்."
},

// More useful verbs
{
  id:"w741",
  en:"Eat",
  ta_meaning:"சாப்பிடு",
  ta_sound:"ஈட்",
  breakdown:[{part:"Ea",ta:"ஈ"},{part:"t",ta:"ட்"}],
  rule:"ea = ஈ",
  example_en:"Eat food.",
  example_ta:"உணவு சாப்பிடு."
},
{
  id:"w742",
  en:"Drink",
  ta_meaning:"குடி",
  ta_sound:"ட்ரிங்க்",
  breakdown:[{part:"Dr",ta:"ட்ர"},{part:"ink",ta:"ிங்"}],
  rule:"ng = ங்",
  example_en:"Drink water.",
  example_ta:"தண்ணீர் குடி."
},
{
  id:"w743",
  en:"Sleep",
  ta_meaning:"தூங்கு",
  ta_sound:"ஸ்லீப்",
  breakdown:[{part:"Sl",ta:"ஸ்ல"},{part:"eep",ta:"ீப்"}],
  rule:"ee = ஈ",
  example_en:"Sleep early.",
  example_ta:"சீக்கிரம் தூங்கு."
},
{
  id:"w744",
  en:"Wake",
  ta_meaning:"எழுந்து",
  ta_sound:"வேக்",
  breakdown:[{part:"Wa",ta:"வே"},{part:"ke",ta:"க்"}],
  rule:"magic e",
  example_en:"Wake up now.",
  example_ta:"இப்போ எழுந்து."
},
{
  id:"w745",
  en:"Work",
  ta_meaning:"வேலை",
  ta_sound:"வர்க்",
  breakdown:[{part:"Wo",ta:"வ"},{part:"rk",ta:"ர்க்"}],
  rule:"or = அர்",
  example_en:"I work daily.",
  example_ta:"நான் தினமும் வேலை செய்கிறேன்."
},
{
  id:"w746",
  en:"Play",
  ta_meaning:"விளையாடு",
  ta_sound:"ப்ளே",
  breakdown:[{part:"Pl",ta:"ப்ள"},{part:"ay",ta:"ே"}],
  rule:"ay = ஏ",
  example_en:"Play with me.",
  example_ta:"என்னுடன் விளையாடு."
},
{
  id:"w747",
  en:"Watch",
  ta_meaning:"பார்",
  ta_sound:"வாட்ச்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"tch",ta:"ச்"}],
  rule:"tch = ச்",
  example_en:"Watch TV.",
  example_ta:"டிவி பார்."
},
{
  id:"w748",
  en:"See",
  ta_meaning:"பார்",
  ta_sound:"ஸீ",
  breakdown:[{part:"Se",ta:"ஸீ"}],
  rule:"ee = ஈ",
  example_en:"See this.",
  example_ta:"இதை பார்."
},
{
  id:"w749",
  en:"Look",
  ta_meaning:"பார்",
  ta_sound:"லுக்",
  breakdown:[{part:"Lo",ta:"லு"},{part:"ok",ta:"க்"}],
  rule:"oo short",
  example_en:"Look here.",
  example_ta:"இங்கே பார்."
},
{
  id:"w750",
  en:"Show",
  ta_meaning:"காட்டு",
  ta_sound:"ஷோ",
  breakdown:[{part:"Sh",ta:"ஷ"},{part:"ow",ta:"ோ"}],
  rule:"ow = ஓ",
  example_en:"Show me.",
  example_ta:"எனக்கு காட்டு."
},

// Remaining 54 words (common speaking)
{
  id:"w751", en:"Need", ta_meaning:"தேவை", ta_sound:"நீட்",
  breakdown:[{part:"Ne",ta:"நீ"},{part:"ed",ta:"ட்"}],
  rule:"ee = ஈ", example_en:"I need water.", example_ta:"எனக்கு தண்ணீர் தேவை."
},
{
  id:"w752", en:"Want", ta_meaning:"வேண்டும்", ta_sound:"வாண்ட்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"nt",ta:"ண்ட்"}],
  rule:"nt = ண்ட்", example_en:"I want tea.", example_ta:"எனக்கு டீ வேண்டும்."
},
{
  id:"w753", en:"Like", ta_meaning:"பிடிக்கும்", ta_sound:"லைக்",
  breakdown:[{part:"Li",ta:"லை"},{part:"ke",ta:"க்"}],
  rule:"magic e", example_en:"I like it.", example_ta:"எனக்கு இது பிடிக்கும்."
},
{
  id:"w754", en:"Love", ta_meaning:"காதல்/மிக பிடிக்கும்", ta_sound:"லவ்",
  breakdown:[{part:"Lo",ta:"ல"},{part:"ve",ta:"வ்"}],
  rule:"o changes", example_en:"I love my family.", example_ta:"எனக்கு என் குடும்பம் பிடிக்கும்."
},
{
  id:"w755", en:"Hate", ta_meaning:"வெறுப்பு", ta_sound:"ஹேட்",
  breakdown:[{part:"Ha",ta:"ஹே"},{part:"te",ta:"ட்"}],
  rule:"magic e", example_en:"I hate noise.", example_ta:"எனக்கு சத்தம் பிடிக்காது."
},
{
  id:"w756", en:"Know", ta_meaning:"தெரியும்", ta_sound:"நோ",
  breakdown:[{part:"Kn",ta:"(k silent)"},{part:"ow",ta:"ோ"}],
  rule:"k silent", example_en:"I know you.", example_ta:"நான் உன்னை தெரியும்."
},
{
  id:"w757", en:"Think", ta_meaning:"நினை", ta_sound:"திங்க்",
  breakdown:[{part:"Th",ta:"த்"},{part:"ink",ta:"ிங்"}],
  rule:"th sound", example_en:"I think so.", example_ta:"நான் அப்படி நினைக்கிறேன்."
},
{
  id:"w758", en:"Feel", ta_meaning:"உணர்", ta_sound:"ஃபீல்",
  breakdown:[{part:"Fe",ta:"ஃபீ"},{part:"el",ta:"ல்"}],
  rule:"ee = ஈ", example_en:"I feel good.", example_ta:"நான் நல்லா உணர்கிறேன்."
},
{
  id:"w759", en:"See", ta_meaning:"பார்", ta_sound:"ஸீ",
  breakdown:[{part:"Se",ta:"ஸீ"}],
  rule:"ee = ஈ", example_en:"I see you.", example_ta:"நான் உன்னை பார்க்கிறேன்."
},
{
  id:"w760", en:"Hear", ta_meaning:"கேள்", ta_sound:"ஹியர்",
  breakdown:[{part:"Hea",ta:"ஹி"},{part:"r",ta:"ர்"}],
  rule:"ea = இய", example_en:"I hear sound.", example_ta:"நான் சத்தம் கேட்கிறேன்."
},

{
  id:"w761", en:"Help", ta_meaning:"உதவி", ta_sound:"ஹெல்ப்",
  breakdown:[{part:"He",ta:"ஹெ"},{part:"lp",ta:"ல்ப்"}],
  rule:"lp", example_en:"Help me please.", example_ta:"தயவு செய்து உதவி செய்."
},
{
  id:"w762", en:"Wait", ta_meaning:"காத்திரு", ta_sound:"வேட்",
  breakdown:[{part:"Wa",ta:"வே"},{part:"it",ta:"ட்"}],
  rule:"ai/ei sound", example_en:"Wait here.", example_ta:"இங்கே காத்திரு."
},
{
  id:"w763", en:"Come", ta_meaning:"வா", ta_sound:"கம்",
  breakdown:[{part:"Co",ta:"க"},{part:"me",ta:"ம்"}],
  rule:"o changes", example_en:"Come soon.", example_ta:"சீக்கிரம் வா."
},
{
  id:"w764", en:"Leave", ta_meaning:"விட்டு போ", ta_sound:"லீவ்",
  breakdown:[{part:"Lea",ta:"லீ"},{part:"ve",ta:"வ்"}],
  rule:"ea = ஈ", example_en:"Leave now.", example_ta:"இப்போ போ."
},
{
  id:"w765", en:"Stay", ta_meaning:"இரு", ta_sound:"ஸ்டே",
  breakdown:[{part:"St",ta:"ஸ்ட"},{part:"ay",ta:"ே"}],
  rule:"ay = ஏ", example_en:"Stay here.", example_ta:"இங்கே இரு."
},

{
  id:"w766", en:"Go out", ta_meaning:"வெளியே போ", ta_sound:"கோ அவுட்",
  breakdown:[{part:"Go",ta:"கோ"},{part:"out",ta:"அவுட்"}],
  rule:"phrase", example_en:"Go out now.", example_ta:"இப்போ வெளியே போ."
},
{
  id:"w767", en:"Come in", ta_meaning:"உள்ளே வா", ta_sound:"கம் இன்",
  breakdown:[{part:"Come",ta:"கம்"},{part:"in",ta:"இன்"}],
  rule:"phrase", example_en:"Come in please.", example_ta:"தயவு செய்து உள்ளே வா."
},
{
  id:"w768", en:"Sit down", ta_meaning:"உட்கார்", ta_sound:"சிட் டவுன்",
  breakdown:[{part:"Sit",ta:"சிட்"},{part:"down",ta:"டவுன்"}],
  rule:"phrase", example_en:"Sit down here.", example_ta:"இங்கே உட்கார்."
},
{
  id:"w769", en:"Stand up", ta_meaning:"எழுந்து நில்", ta_sound:"ஸ்டேண்ட் அப்",
  breakdown:[{part:"Stand",ta:"ஸ்டேண்ட்"},{part:"up",ta:"அப்"}],
  rule:"phrase", example_en:"Stand up now.", example_ta:"இப்போ எழுந்து நில்."
},
{
  id:"w770", en:"Calm down", ta_meaning:"அமைதியாக இரு", ta_sound:"காம் டவுன்",
  breakdown:[{part:"Calm",ta:"காம்"},{part:"down",ta:"டவுன்"}],
  rule:"phrase", example_en:"Calm down.", example_ta:"அமைதியாக இரு."
},

// Extra common words to reach 100
{
  id:"w771", en:"Time", ta_meaning:"நேரம்", ta_sound:"டைம்",
  breakdown:[{part:"Ti",ta:"டை"},{part:"me",ta:"ம்"}],
  rule:"magic e", example_en:"Time is important.", example_ta:"நேரம் முக்கியம்."
},
{
  id:"w772", en:"Day", ta_meaning:"நாள்", ta_sound:"டே",
  breakdown:[{part:"Da",ta:"டே"},{part:"y",ta:""}],
  rule:"ay = ஏ", example_en:"Good day.", example_ta:"நல்ல நாள்."
},
{
  id:"w773", en:"Week", ta_meaning:"வாரம்", ta_sound:"வீக்",
  breakdown:[{part:"We",ta:"வீ"},{part:"ek",ta:"க்"}],
  rule:"ee = ஈ", example_en:"One week.", example_ta:"ஒரு வாரம்."
},
{
  id:"w774", en:"Month", ta_meaning:"மாதம்", ta_sound:"மந்த்",
  breakdown:[{part:"Mo",ta:"ம"},{part:"nth",ta:"ந்த்"}],
  rule:"th sound", example_en:"This month.", example_ta:"இந்த மாதம்."
},
{
  id:"w775", en:"Year", ta_meaning:"ஆண்டு", ta_sound:"யியர்",
  breakdown:[{part:"Ye",ta:"யி"},{part:"ar",ta:"யர்"}],
  rule:"ea = இய", example_en:"This year.", example_ta:"இந்த ஆண்டு."
},

{
  id:"w776", en:"Name", ta_meaning:"பெயர்", ta_sound:"நேம்",
  breakdown:[{part:"Na",ta:"நே"},{part:"me",ta:"ம்"}],
  rule:"magic e", example_en:"My name is Tutu.", example_ta:"என் பெயர் டுடு."
},
{
  id:"w777", en:"Age", ta_meaning:"வயது", ta_sound:"ஏஜ்",
  breakdown:[{part:"A",ta:"ஏ"},{part:"ge",ta:"ஜ்"}],
  rule:"magic e", example_en:"My age is 20.", example_ta:"என் வயது 20."
},
{
  id:"w778", en:"Place", ta_meaning:"இடம்", ta_sound:"ப்ளேஸ்",
  breakdown:[{part:"Pla",ta:"ப்ளே"},{part:"ce",ta:"ஸ்"}],
  rule:"ce = ஸ", example_en:"Nice place.", example_ta:"நல்ல இடம்."
},
{
  id:"w779", en:"City", ta_meaning:"நகரம்", ta_sound:"சிட்டி",
  breakdown:[{part:"Ci",ta:"சி"},{part:"ty",ta:"டி"}],
  rule:"y ending = இ", example_en:"My city is big.", example_ta:"என் நகரம் பெரியது."
},
{
  id:"w780", en:"Country", ta_meaning:"நாடு", ta_sound:"கண்ட்ரி",
  breakdown:[{part:"Coun",ta:"கண்"},{part:"try",ta:"ட்ரி"}],
  rule:"ou changes", example_en:"India is my country.", example_ta:"இந்தியா என் நாடு."
},

{
  id:"w781", en:"India", ta_meaning:"இந்தியா", ta_sound:"இந்தியா",
  breakdown:[{part:"In",ta:"இன்"},{part:"dia",ta:"டியா"}],
  rule:"syllables", example_en:"I live in India.", example_ta:"நான் இந்தியாவில் வாழ்கிறேன்."
},
{
  id:"w782", en:"Tamil", ta_meaning:"தமிழ்", ta_sound:"தமிழ்",
  breakdown:[{part:"Ta",ta:"த"},{part:"mil",ta:"மில்"}],
  rule:"name", example_en:"I speak Tamil.", example_ta:"நான் தமிழ் பேசுகிறேன்."
},
{
  id:"w783", en:"English", ta_meaning:"ஆங்கிலம்", ta_sound:"இங்கிலிஷ்",
  breakdown:[{part:"En",ta:"இன்"},{part:"glish",ta:"க்லிஷ்"}],
  rule:"nglish sound", example_en:"I learn English.", example_ta:"நான் ஆங்கிலம் கற்கிறேன்."
},
{
  id:"w784", en:"Language", ta_meaning:"மொழி", ta_sound:"லேங்குவேஜ்",
  breakdown:[{part:"Lan",ta:"லேன்"},{part:"guage",ta:"க்வேஜ்"}],
  rule:"ge = ஜ்", example_en:"English is a language.", example_ta:"ஆங்கிலம் ஒரு மொழி."
},
{
  id:"w785", en:"Lesson", ta_meaning:"பாடம்", ta_sound:"லெசன்",
  breakdown:[{part:"Les",ta:"லெஸ்"},{part:"son",ta:"ன்"}],
  rule:"o changes", example_en:"Today's lesson.", example_ta:"இன்றைய பாடம்."
},

{
  id:"w786", en:"Alphabet", ta_meaning:"எழுத்துக்கள்", ta_sound:"ஆல்பபெட்",
  breakdown:[{part:"Al",ta:"ஆல்"},{part:"pha",ta:"ஃப"},{part:"bet",ta:"பெட்"}],
  rule:"ph = ஃப", example_en:"Learn alphabet.", example_ta:"எழுத்துக்கள் கற்று."
},
{
  id:"w787", en:"Letter", ta_meaning:"எழுத்து", ta_sound:"லெட்டர்",
  breakdown:[{part:"Le",ta:"லெ"},{part:"tter",ta:"ட்டர்"}],
  rule:"double t", example_en:"This letter A.", example_ta:"இந்த எழுத்து A."
},
{
  id:"w788", en:"Sound", ta_meaning:"ஒலி", ta_sound:"சவுண்ட்",
  breakdown:[{part:"Sou",ta:"சவ்"},{part:"nd",ta:"ண்ட்"}],
  rule:"ou = அவ்", example_en:"Sound is important.", example_ta:"ஒலி முக்கியம்."
},
{
  id:"w789", en:"Rule", ta_meaning:"விதி", ta_sound:"ரூல்",
  breakdown:[{part:"Ru",ta:"ரூ"},{part:"le",ta:"ல்"}],
  rule:"magic e", example_en:"Learn the rule.", example_ta:"விதியை கற்று."
},
{
  id:"w790", en:"Silent", ta_meaning:"ஒலி இல்லாமல்", ta_sound:"சைலன்ட்",
  breakdown:[{part:"Si",ta:"சை"},{part:"lent",ta:"லன்ட்"}],
  rule:"silent letters",
  example_en:"K is silent in knife.",
  example_ta:"knife-ல் K ஒலி இல்லை."
},

{
  id:"w791", en:"Speak", ta_meaning:"பேசு", ta_sound:"ஸ்பீக்",
  breakdown:[{part:"Sp",ta:"ஸ்ப"},{part:"eak",ta:"ீக்"}],
  rule:"ea = ஈ", example_en:"Speak clearly.", example_ta:"தெளிவாக பேசு."
},
{
  id:"w792", en:"Listen", ta_meaning:"கேள்", ta_sound:"லிஸன்",
  breakdown:[{part:"Lis",ta:"லிஸ்"},{part:"ten",ta:"ன்"}],
  rule:"t silent", example_en:"Listen to audio.", example_ta:"ஆடியோ கேள்."
},
{
  id:"w793", en:"Repeat", ta_meaning:"மீண்டும் சொல்", ta_sound:"ரிபீட்",
  breakdown:[{part:"Re",ta:"ரி"},{part:"peat",ta:"பீட்"}],
  rule:"ea = ஈ", example_en:"Repeat this.", example_ta:"இதை மீண்டும் சொல்."
},
{
  id:"w794", en:"Pronounce", ta_meaning:"உச்சரி", ta_sound:"ப்ரநவுன்ஸ்",
  breakdown:[{part:"Pro",ta:"ப்ர"},{part:"nounce",ta:"நவுன்ஸ்"}],
  rule:"ou = அவ்", example_en:"Pronounce correctly.", example_ta:"சரியாக உச்சரி."
},
{
  id:"w795", en:"Correctly", ta_meaning:"சரியாக", ta_sound:"கரெக்ட்லி",
  breakdown:[{part:"Cor",ta:"க"},{part:"rect",ta:"ரெக்ட்"},{part:"ly",ta:"லி"}],
  rule:"ly = லி", example_en:"Read correctly.", example_ta:"சரியாக படி."
},

{
  id:"w796", en:"Example", ta_meaning:"உதாரணம்", ta_sound:"எக்ஸாம்பிள்",
  breakdown:[{part:"Ex",ta:"எக்ஸ்"},{part:"am",ta:"ஆம்"},{part:"ple",ta:"பிள்"}],
  rule:"x = க்ஸ்", example_en:"Give an example.", example_ta:"ஒரு உதாரணம் கொடு."
},
{
  id:"w797", en:"Simple", ta_meaning:"எளிய", ta_sound:"சிம்பிள்",
  breakdown:[{part:"Sim",ta:"சிம்"},{part:"ple",ta:"பிள்"}],
  rule:"ple = பிள்", example_en:"Simple word.", example_ta:"எளிய வார்த்தை."
},
{
  id:"w798", en:"Easy", ta_meaning:"எளிது", ta_sound:"ஈசி",
  breakdown:[{part:"Ea",ta:"ஈ"},{part:"sy",ta:"சி"}],
  rule:"ea = ஈ", example_en:"English is easy.", example_ta:"ஆங்கிலம் எளிது."
},
{
  id:"w799", en:"Difficult", ta_meaning:"கடினம்", ta_sound:"டிஃபிகல்ட்",
  breakdown:[{part:"Dif",ta:"டிஃப்"},{part:"fi",ta:"பி"},{part:"cult",ta:"கல்ட்"}],
  rule:"cult = கல்ட்", example_en:"This is difficult.", example_ta:"இது கடினம்."
},
{
  id:"w800", en:"Fluent", ta_meaning:"தடையில்லாமல் பேசும்",
  ta_sound:"ஃப்ளூயன்ட்",
  breakdown:[{part:"Flu",ta:"ஃப்ளூ"},{part:"ent",ta:"என்ட்"}],
  rule:"fl blend", example_en:"Speak fluent English.", example_ta:"தடையில்லாமல் ஆங்கிலம் பேசு."
},

{
  id:"w801", en:"Understand", ta_meaning:"புரிந்து கொள்", ta_sound:"அண்டர்ஸ்டேண்ட்",
  breakdown:[{part:"Un",ta:"அன்"},{part:"der",ta:"டர்"},{part:"stand",ta:"ஸ்டேண்ட்"}],
  rule:"compound", example_en:"I understand you.", example_ta:"நான் உன்னை புரிந்துகொள்கிறேன்."
},
{
  id:"w802", en:"Explain", ta_meaning:"விளக்கு", ta_sound:"எக்ஸ்ப்ளெயின்",
  breakdown:[{part:"Ex",ta:"எக்ஸ்"},{part:"plain",ta:"ப்ளெயின்"}],
  rule:"ai = எய்", example_en:"Explain in Tamil.", example_ta:"தமிழில் விளக்கு."
},
{
  id:"w803", en:"Translate", ta_meaning:"மொழிபெயர்", ta_sound:"ட்ரான்ஸ்லேட்",
  breakdown:[{part:"Trans",ta:"ட்ரான்ஸ்"},{part:"late",ta:"லேட்"}],
  rule:"late = லேட்", example_en:"Translate this.", example_ta:"இதை மொழிபெயர்."
},
{
  id:"w804", en:"Quiz", ta_meaning:"வினாடி வினா", ta_sound:"க்விஸ்",
  breakdown:[{part:"Qu",ta:"க்வி"},{part:"z",ta:"ஸ்"}],
  rule:"qu = க்வ",
  example_en:"Take the quiz.",
  example_ta:"க்விஸ் செய்யுங்கள்."
},
// ===== Fluent Pack 8 (Sentences 356–405) =====
{ id:"s356", en:"What is this?", ta_meaning:"இது என்ன?", ta_sound:"வாட் இஸ் திஸ்?" },
{ id:"s357", en:"Why are you sad?", ta_meaning:"நீ ஏன் சோகமாக இருக்கிறாய்?", ta_sound:"வை ஆர் யூ சாட்?" },
{ id:"s358", en:"Where is my phone?", ta_meaning:"என் போன் எங்கே?", ta_sound:"வேர் இஸ் மை ஃபோன்?" },
{ id:"s359", en:"When will you come?", ta_meaning:"நீ எப்போது வருவாய்?", ta_sound:"வென் வில் யூ கம்?" },
{ id:"s360", en:"Who is he?", ta_meaning:"அவன் யார்?", ta_sound:"ஹூ இஸ் ஹீ?" },

{ id:"s361", en:"How are you?", ta_meaning:"நீ எப்படி இருக்கிறாய்?", ta_sound:"ஹவ் ஆர் யூ?" },
{ id:"s362", en:"One apple.", ta_meaning:"ஒரு ஆப்பிள்.", ta_sound:"வன் ஆப்பிள்." },
{ id:"s363", en:"Two books.", ta_meaning:"இரண்டு புத்தகங்கள்.", ta_sound:"டூ புக்க்ஸ்." },
{ id:"s364", en:"Three pens.", ta_meaning:"மூன்று பேனாக்கள்.", ta_sound:"த்ரீ பென்ஸ்." },
{ id:"s365", en:"Four chairs.", ta_meaning:"நான்கு நாற்காலிகள்.", ta_sound:"ஃபோர் சேர்ஸ்." },

{ id:"s366", en:"Five minutes.", ta_meaning:"ஐந்து நிமிடம்.", ta_sound:"ஃபைவ் மினிட்ஸ்." },
{ id:"s367", en:"Six cups.", ta_meaning:"ஆறு கப்புகள்.", ta_sound:"சிக்ஸ் கப்ஸ்." },
{ id:"s368", en:"Seven days.", ta_meaning:"ஏழு நாட்கள்.", ta_sound:"செவன் டேஸ்." },
{ id:"s369", en:"Eight hours.", ta_meaning:"எட்டு மணி.", ta_sound:"ஏட் ஆவர்ஸ்." },
{ id:"s370", en:"Nine people.", ta_meaning:"ஒன்பது பேர்.", ta_sound:"நைன் பீப்புள்." },

{ id:"s371", en:"Ten rupees.", ta_meaning:"பத்து ரூபாய்.", ta_sound:"டென் ரூபீஸ்." },
{ id:"s372", en:"Small bag.", ta_meaning:"சிறிய பை.", ta_sound:"ஸ்மால் பேக்." },
{ id:"s373", en:"Big house.", ta_meaning:"பெரிய வீடு.", ta_sound:"பிக் ஹவுஸ்." },
{ id:"s374", en:"The road is long.", ta_meaning:"சாலை நீளம்.", ta_sound:"த ரோட் இஸ் லாங்." },
{ id:"s375", en:"This phone is new.", ta_meaning:"இந்த போன் புதியது.", ta_sound:"திஸ் ஃபோன் இஸ் நியூ." },

{ id:"s376", en:"That book is old.", ta_meaning:"அந்த புத்தகம் பழையது.", ta_sound:"தாட் புக் இஸ் ஓல்ட்." },
{ id:"s377", en:"I am happy.", ta_meaning:"நான் மகிழ்ச்சி.", ta_sound:"ஐ ஆம் ஹாப்பி." },
{ id:"s378", en:"He is sad.", ta_meaning:"அவன் சோகமாக இருக்கிறான்.", ta_sound:"ஹீ இஸ் சாட்." },
{ id:"s379", en:"Good boy.", ta_meaning:"நல்ல பையன்.", ta_sound:"குட் பாய்." },
{ id:"s380", en:"Bad habit.", ta_meaning:"மோசமான பழக்கம்.", ta_sound:"பேட் ஹேபிட்." },

{ id:"s381", en:"Give me a pen.", ta_meaning:"எனக்கு பேனா கொடு.", ta_sound:"கிவ் மீ அ பென்." },
{ id:"s382", en:"Table is clean.", ta_meaning:"மேசை சுத்தம்.", ta_sound:"டேபிள் இஸ் கிளீன்." },
{ id:"s383", en:"Sit on the chair.", ta_meaning:"நாற்காலியில் உட்கார்.", ta_sound:"சிட் ஆன் த சேர்." },
{ id:"s384", en:"Open the door.", ta_meaning:"கதவை திற.", ta_sound:"ஓபன் த டோர்." },
{ id:"s385", en:"Close the window.", ta_meaning:"ஜன்னலை மூடு.", ta_sound:"க்ளோஸ் த விண்டோ." },

{ id:"s386", en:"My room is big.", ta_meaning:"என் அறை பெரியது.", ta_sound:"மை ரூம் இஸ் பிக்." },
{ id:"s387", en:"This house is new.", ta_meaning:"இந்த வீடு புதியது.", ta_sound:"திஸ் ஹவுஸ் இஸ் நியூ." },
{ id:"s388", en:"Eat food.", ta_meaning:"உணவு சாப்பிடு.", ta_sound:"ஈட் ஃபூட்." },
{ id:"s389", en:"Drink water.", ta_meaning:"தண்ணீர் குடி.", ta_sound:"ட்ரிங்க் வாட்டர்." },
{ id:"s390", en:"Sleep early.", ta_meaning:"சீக்கிரம் தூங்கு.", ta_sound:"ஸ்லீப் எர்லி." },

{ id:"s391", en:"Wake up now.", ta_meaning:"இப்போ எழுந்து.", ta_sound:"வேக் அப் நவ்." },
{ id:"s392", en:"I work daily.", ta_meaning:"நான் தினமும் வேலை செய்கிறேன்.", ta_sound:"ஐ வொர்க் டெய்லி." },
{ id:"s393", en:"Play with me.", ta_meaning:"என்னுடன் விளையாடு.", ta_sound:"ப்ளே வித் மீ." },
{ id:"s394", en:"Watch TV.", ta_meaning:"டிவி பார்.", ta_sound:"வாட்ச் டிவி." },
{ id:"s395", en:"Show me.", ta_meaning:"எனக்கு காட்டு.", ta_sound:"ஷோ மீ." },

{ id:"s396", en:"I need water.", ta_meaning:"எனக்கு தண்ணீர் தேவை.", ta_sound:"ஐ நீட் வாட்டர்." },
{ id:"s397", en:"I want tea.", ta_meaning:"எனக்கு டீ வேண்டும்.", ta_sound:"ஐ வாண்ட் டீ." },
{ id:"s398", en:"I like it.", ta_meaning:"எனக்கு இது பிடிக்கும்.", ta_sound:"ஐ லைக் இட்." },
{ id:"s399", en:"I love my family.", ta_meaning:"எனக்கு என் குடும்பம் பிடிக்கும்.", ta_sound:"ஐ லவ் மை ஃபாமிலி." },
{ id:"s400", en:"I know this.", ta_meaning:"இது எனக்கு தெரியும்.", ta_sound:"ஐ நோ திஸ்." },

{ id:"s401", en:"I think so.", ta_meaning:"நான் அப்படி நினைக்கிறேன்.", ta_sound:"ஐ திங்க் சோ." },
{ id:"s402", en:"I feel good.", ta_meaning:"நான் நல்லா உணர்கிறேன்.", ta_sound:"ஐ ஃபீல் குட்." },
{ id:"s403", en:"Wait here.", ta_meaning:"இங்கே காத்திரு.", ta_sound:"வேட் ஹியர்." },
{ id:"s404", en:"Stay here.", ta_meaning:"இங்கே இரு.", ta_sound:"ஸ்டே ஹியர்." },
{ id:"s405", en:"Take the quiz.", ta_meaning:"க்விஸ் செய்யுங்கள்.", ta_sound:"டேக் த க்விஸ்." },
// ===== Fluent Pack 9 (Words 805–904) =====

// Core grammar helper words
{
  id:"w805",
  en:"I",
  ta_meaning:"நான்",
  ta_sound:"ஐ",
  breakdown:[{part:"I",ta:"ஐ"}],
  rule:"Pronoun",
  example_en:"I am ready.",
  example_ta:"நான் தயாராக இருக்கிறேன்."
},
{
  id:"w806",
  en:"You",
  ta_meaning:"நீ / நீங்கள்",
  ta_sound:"யூ",
  breakdown:[{part:"You",ta:"யூ"}],
  rule:"Pronoun",
  example_en:"You are good.",
  example_ta:"நீ நல்லவன்."
},
{
  id:"w807",
  en:"He",
  ta_meaning:"அவன்",
  ta_sound:"ஹீ",
  breakdown:[{part:"He",ta:"ஹீ"}],
  rule:"Pronoun",
  example_en:"He is my friend.",
  example_ta:"அவன் என் நண்பன்."
},
{
  id:"w808",
  en:"She",
  ta_meaning:"அவள்",
  ta_sound:"ஷீ",
  breakdown:[{part:"She",ta:"ஷீ"}],
  rule:"Pronoun",
  example_en:"She is happy.",
  example_ta:"அவள் மகிழ்ச்சி."
},
{
  id:"w809",
  en:"We",
  ta_meaning:"நாம்",
  ta_sound:"வீ",
  breakdown:[{part:"We",ta:"வீ"}],
  rule:"Pronoun",
  example_en:"We are students.",
  example_ta:"நாம் மாணவர்கள்."
},
{
  id:"w810",
  en:"They",
  ta_meaning:"அவர்கள்",
  ta_sound:"தே",
  breakdown:[{part:"Th",ta:"த்"},{part:"ey",ta:"ே"}],
  rule:"th + ey = தே",
  example_en:"They are coming.",
  example_ta:"அவர்கள் வருகிறார்கள்."
},

// Be verbs
{
  id:"w811",
  en:"Am",
  ta_meaning:"இருக்கிறேன்",
  ta_sound:"ஆம்",
  breakdown:[{part:"Am",ta:"ஆம்"}],
  rule:"I + am",
  example_en:"I am fine.",
  example_ta:"நான் நலமாக இருக்கிறேன்."
},
{
  id:"w812",
  en:"Is",
  ta_meaning:"இருக்கிறது/இருக்கிறான்",
  ta_sound:"இஸ்",
  breakdown:[{part:"Is",ta:"இஸ்"}],
  rule:"He/She/It + is",
  example_en:"He is good.",
  example_ta:"அவன் நல்லவன்."
},
{
  id:"w813",
  en:"Are",
  ta_meaning:"இருக்கிறீர்கள்/இருக்கிறார்கள்",
  ta_sound:"ஆர்",
  breakdown:[{part:"Are",ta:"ஆர்"}],
  rule:"You/We/They + are",
  example_en:"You are smart.",
  example_ta:"நீ புத்திசாலி."
},

// Basic helping verbs
{
  id:"w814",
  en:"Do",
  ta_meaning:"செய்",
  ta_sound:"டூ",
  breakdown:[{part:"Do",ta:"டூ"}],
  rule:"Action helper",
  example_en:"Do it now.",
  example_ta:"இப்போ செய்."
},
{
  id:"w815",
  en:"Does",
  ta_meaning:"செய்கிறான்/செய்கிறாள்",
  ta_sound:"டஸ்",
  breakdown:[{part:"Do",ta:"ட"},{part:"es",ta:"ஸ்"}],
  rule:"He/She + does",
  example_en:"He does work.",
  example_ta:"அவன் வேலை செய்கிறான்."
},
{
  id:"w816",
  en:"Did",
  ta_meaning:"செய்தான்/செய்தேன்",
  ta_sound:"டிட்",
  breakdown:[{part:"Did",ta:"டிட்"}],
  rule:"Past",
  example_en:"I did it.",
  example_ta:"நான் அதை செய்தேன்."
},

// Can / Will
{
  id:"w817",
  en:"Can",
  ta_meaning:"முடியும்",
  ta_sound:"கேன்",
  breakdown:[{part:"Can",ta:"கேன்"}],
  rule:"Ability",
  example_en:"I can read.",
  example_ta:"நான் படிக்க முடியும்."
},
{
  id:"w818",
  en:"Can't",
  ta_meaning:"முடியாது",
  ta_sound:"கேன்ட்",
  breakdown:[{part:"Can",ta:"கேன்"},{part:"'t",ta:"ட்"}],
  rule:"Not able",
  example_en:"I can't swim.",
  example_ta:"நான் நீந்த முடியாது."
},
{
  id:"w819",
  en:"Will",
  ta_meaning:"செய்வேன்/வருவேன் (எதிர்காலம்)",
  ta_sound:"வில்",
  breakdown:[{part:"Will",ta:"வில்"}],
  rule:"Future",
  example_en:"I will come.",
  example_ta:"நான் வருவேன்."
},
{
  id:"w820",
  en:"Won't",
  ta_meaning:"செய்ய மாட்டேன்",
  ta_sound:"வோன்ட்",
  breakdown:[{part:"Wo",ta:"வோ"},{part:"n't",ta:"ன்ட்"}],
  rule:"Future negative",
  example_en:"I won't go.",
  example_ta:"நான் போக மாட்டேன்."
},

// Basic connectors
{
  id:"w821",
  en:"And",
  ta_meaning:"மற்றும்",
  ta_sound:"அண்ட்",
  breakdown:[{part:"And",ta:"அண்ட்"}],
  rule:"Join words",
  example_en:"Tea and coffee.",
  example_ta:"டீ மற்றும் காபி."
},
{
  id:"w822",
  en:"But",
  ta_meaning:"ஆனால்",
  ta_sound:"பட்",
  breakdown:[{part:"But",ta:"பட்"}],
  rule:"Contrast",
  example_en:"I am tired but happy.",
  example_ta:"நான் சோர்வாக இருக்கிறேன் ஆனால் மகிழ்ச்சி."
},
{
  id:"w823",
  en:"Or",
  ta_meaning:"அல்லது",
  ta_sound:"ஆர்",
  breakdown:[{part:"Or",ta:"ஆர்"}],
  rule:"Choice",
  example_en:"Tea or coffee?",
  example_ta:"டீ அல்லது காபி?"
},
{
  id:"w824",
  en:"Because",
  ta_meaning:"ஏனெனில்",
  ta_sound:"பிகாஸ்",
  breakdown:[{part:"Be",ta:"பி"},{part:"cause",ta:"காஸ்"}],
  rule:"Reason",
  example_en:"I am late because traffic.",
  example_ta:"டிராஃபிக் காரணமாக நான் தாமதம்."
},
{
  id:"w825",
  en:"So",
  ta_meaning:"அதனால்",
  ta_sound:"சோ",
  breakdown:[{part:"So",ta:"சோ"}],
  rule:"Result",
  example_en:"I was tired, so I slept.",
  example_ta:"நான் சோர்வாக இருந்தேன், அதனால் தூங்கினேன்."
},

// Prepositions
{
  id:"w826",
  en:"In",
  ta_meaning:"உள்ளே",
  ta_sound:"இன்",
  breakdown:[{part:"In",ta:"இன்"}],
  rule:"Place",
  example_en:"In the room.",
  example_ta:"அறையில்."
},
{
  id:"w827",
  en:"On",
  ta_meaning:"மேல்",
  ta_sound:"ஆன்",
  breakdown:[{part:"On",ta:"ஆன்"}],
  rule:"Place",
  example_en:"On the table.",
  example_ta:"மேசையின் மேல்."
},
{
  id:"w828",
  en:"At",
  ta_meaning:"இடத்தில்",
  ta_sound:"அட்",
  breakdown:[{part:"At",ta:"அட்"}],
  rule:"Place/time",
  example_en:"At home.",
  example_ta:"வீட்டில்."
},
{
  id:"w829",
  en:"To",
  ta_meaning:"க்கு",
  ta_sound:"டூ",
  breakdown:[{part:"To",ta:"டூ"}],
  rule:"Direction",
  example_en:"Go to school.",
  example_ta:"பள்ளிக்கு போ."
},
{
  id:"w830",
  en:"From",
  ta_meaning:"இருந்து",
  ta_sound:"ஃப்ராம்",
  breakdown:[{part:"Fr",ta:"ஃப்ர"},{part:"om",ta:"ாம்"}],
  rule:"Source",
  example_en:"From India.",
  example_ta:"இந்தியாவிலிருந்து."
},

// Articles
{
  id:"w831",
  en:"A",
  ta_meaning:"ஒரு (எ.கா: a pen)",
  ta_sound:"அ",
  breakdown:[{part:"A",ta:"அ"}],
  rule:"Article",
  example_en:"A book.",
  example_ta:"ஒரு புத்தகம்."
},
{
  id:"w832",
  en:"An",
  ta_meaning:"ஒரு (உயிரெழுத்து முன்)",
  ta_sound:"அன்",
  breakdown:[{part:"An",ta:"அன்"}],
  rule:"Before vowel sound",
  example_en:"An apple.",
  example_ta:"ஒரு ஆப்பிள்."
},
{
  id:"w833",
  en:"The",
  ta_meaning:"அந்த / அந்தக்",
  ta_sound:"த",
  breakdown:[{part:"The",ta:"த"}],
  rule:"Definite",
  example_en:"The book is here.",
  example_ta:"அந்த புத்தகம் இங்கே."
},

// Common verbs
{
  id:"w834",
  en:"Have",
  ta_meaning:"உண்டு/வைத்திருக்கிறேன்",
  ta_sound:"ஹேவ்",
  breakdown:[{part:"Ha",ta:"ஹே"},{part:"ve",ta:"வ்"}],
  rule:"magic e",
  example_en:"I have a pen.",
  example_ta:"என்னிடம் பேனா உள்ளது."
},
{
  id:"w835",
  en:"Has",
  ta_meaning:"உண்டு (he/she)",
  ta_sound:"ஹாஸ்",
  breakdown:[{part:"Ha",ta:"ஹா"},{part:"s",ta:"ஸ்"}],
  rule:"He/She + has",
  example_en:"He has a phone.",
  example_ta:"அவனிடம் போன் உள்ளது."
},
{
  id:"w836",
  en:"Had",
  ta_meaning:"இருந்தது (past)",
  ta_sound:"ஹேட்",
  breakdown:[{part:"Ha",ta:"ஹா"},{part:"d",ta:"ட்"}],
  rule:"Past",
  example_en:"I had tea.",
  example_ta:"நான் டீ குடித்தேன்."
},

// Useful phrases
{
  id:"w837",
  en:"Good morning",
  ta_meaning:"காலை வணக்கம்",
  ta_sound:"குட் மார்னிங்",
  breakdown:[{part:"Good",ta:"குட்"},{part:"morning",ta:"மார்னிங்"}],
  rule:"Greeting",
  example_en:"Good morning!",
  example_ta:"காலை வணக்கம்!"
},
{
  id:"w838",
  en:"Good night",
  ta_meaning:"இரவு வணக்கம்",
  ta_sound:"குட் நைட்",
  breakdown:[{part:"Good",ta:"குட்"},{part:"night",ta:"நைட்"}],
  rule:"Greeting",
  example_en:"Good night!",
  example_ta:"இரவு வணக்கம்!"
},
{
  id:"w839",
  en:"How are you",
  ta_meaning:"நீ எப்படி இருக்கிறாய்",
  ta_sound:"ஹவ் ஆர் யூ",
  breakdown:[{part:"How",ta:"ஹவ்"},{part:"are",ta:"ஆர்"},{part:"you",ta:"யூ"}],
  rule:"Question",
  example_en:"How are you?",
  example_ta:"நீ எப்படி இருக்கிறாய்?"
},
{
  id:"w840",
  en:"I am fine",
  ta_meaning:"நான் நன்றாக இருக்கிறேன்",
  ta_sound:"ஐ ஆம் ஃபைன்",
  breakdown:[{part:"I",ta:"ஐ"},{part:"am",ta:"ஆம்"},{part:"fine",ta:"ஃபைன்"}],
  rule:"Reply",
  example_en:"I am fine.",
  example_ta:"நான் நன்றாக இருக்கிறேன்."
},

// Silent letter rules words
{
  id:"w841",
  en:"Know",
  ta_meaning:"தெரியும்",
  ta_sound:"நோ",
  breakdown:[{part:"Kn",ta:"(k silent)"},{part:"ow",ta:"ோ"}],
  rule:"k silent",
  example_en:"I know you.",
  example_ta:"நான் உன்னை தெரியும்."
},
{
  id:"w842",
  en:"Knee",
  ta_meaning:"முட்டி",
  ta_sound:"நீ",
  breakdown:[{part:"K",ta:"(silent)"},{part:"nee",ta:"நீ"}],
  rule:"k silent",
  example_en:"My knee hurts.",
  example_ta:"என் முட்டி வலிக்கிறது."
},
{
  id:"w843",
  en:"Knife",
  ta_meaning:"கத்தி",
  ta_sound:"நைஃப்",
  breakdown:[{part:"K",ta:"(silent)"},{part:"nife",ta:"நைஃப்"}],
  rule:"k silent",
  example_en:"This is a knife.",
  example_ta:"இது ஒரு கத்தி."
},
{
  id:"w844",
  en:"Write",
  ta_meaning:"எழுது",
  ta_sound:"ரைட்",
  breakdown:[{part:"W",ta:"(silent)"},{part:"rite",ta:"ரைட்"}],
  rule:"w silent",
  example_en:"Write clearly.",
  example_ta:"தெளிவாக எழுது."
},
{
  id:"w845",
  en:"Wrong",
  ta_meaning:"தவறு",
  ta_sound:"ராங்",
  breakdown:[{part:"Wr",ta:"(w silent)"},{part:"ong",ta:"ாங்"}],
  rule:"w silent",
  example_en:"This is wrong.",
  example_ta:"இது தவறு."
},
{
  id:"w846",
  en:"Listen",
  ta_meaning:"கேள்",
  ta_sound:"லிஸன்",
  breakdown:[{part:"Lis",ta:"லிஸ்"},{part:"ten",ta:"ன்"}],
  rule:"t silent sometimes",
  example_en:"Listen to me.",
  example_ta:"என்னை கேள்."
},
{
  id:"w847",
  en:"Often",
  ta_meaning:"அடிக்கடி",
  ta_sound:"ஆஃபன்",
  breakdown:[{part:"Of",ta:"ஆஃப்"},{part:"ten",ta:"ன்"}],
  rule:"t silent sometimes",
  example_en:"I often read.",
  example_ta:"நான் அடிக்கடி படிப்பேன்."
},
{
  id:"w848",
  en:"Honest",
  ta_meaning:"நேர்மையான",
  ta_sound:"ஆனஸ்ட்",
  breakdown:[{part:"H",ta:"(silent)"},{part:"onest",ta:"ஆனஸ்ட்"}],
  rule:"h silent",
  example_en:"He is honest.",
  example_ta:"அவன் நேர்மையானவன்."
},
{
  id:"w849",
  en:"Hour",
  ta_meaning:"மணி நேரம்",
  ta_sound:"ஆவர்",
  breakdown:[{part:"H",ta:"(silent)"},{part:"our",ta:"ஆவர்"}],
  rule:"h silent",
  example_en:"One hour.",
  example_ta:"ஒரு மணி நேரம்."
},
{
  id:"w850",
  en:"Walk",
  ta_meaning:"நட",
  ta_sound:"வாக்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"lk",ta:"க்"}],
  rule:"l silent",
  example_en:"Walk daily.",
  example_ta:"தினமும் நட."
},

// Remaining 54 useful words for full control
{
  id:"w851", en:"My", ta_meaning:"என்", ta_sound:"மை",
  breakdown:[{part:"My",ta:"மை"}],
  rule:"Possessive", example_en:"My phone.", example_ta:"என் போன்."
},
{
  id:"w852", en:"Your", ta_meaning:"உன்/உங்கள்", ta_sound:"யோர்",
  breakdown:[{part:"You",ta:"யோ"},{part:"r",ta:"ர்"}],
  rule:"Possessive", example_en:"Your book.", example_ta:"உன் புத்தகம்."
},
{
  id:"w853", en:"His", ta_meaning:"அவனுடைய", ta_sound:"ஹிஸ்",
  breakdown:[{part:"His",ta:"ஹிஸ்"}],
  rule:"Possessive", example_en:"His bag.", example_ta:"அவனுடைய பை."
},
{
  id:"w854", en:"Her", ta_meaning:"அவளுடைய", ta_sound:"ஹர்",
  breakdown:[{part:"Her",ta:"ஹர்"}],
  rule:"Possessive", example_en:"Her pen.", example_ta:"அவளுடைய பேனா."
},
{
  id:"w855", en:"Our", ta_meaning:"நமது", ta_sound:"ஆவர்",
  breakdown:[{part:"Our",ta:"ஆவர்"}],
  rule:"Possessive", example_en:"Our home.", example_ta:"நமது வீடு."
},
{
  id:"w856", en:"Their", ta_meaning:"அவர்களின்", ta_sound:"தேர்",
  breakdown:[{part:"Thei",ta:"தே"},{part:"r",ta:"ர்"}],
  rule:"Possessive", example_en:"Their school.", example_ta:"அவர்களின் பள்ளி."
},

{
  id:"w857", en:"This", ta_meaning:"இது/இந்த", ta_sound:"திஸ்",
  breakdown:[{part:"Th",ta:"த்"},{part:"is",ta:"இஸ்"}],
  rule:"th sound", example_en:"This is good.", example_ta:"இது நல்லது."
},
{
  id:"w858", en:"That", ta_meaning:"அது/அந்த", ta_sound:"தாட்",
  breakdown:[{part:"Th",ta:"த்"},{part:"at",ta:"ாட்"}],
  rule:"th sound", example_en:"That is bad.", example_ta:"அது மோசம்."
},
{
  id:"w859", en:"These", ta_meaning:"இவை", ta_sound:"தீஸ்",
  breakdown:[{part:"Th",ta:"த்"},{part:"ese",ta:"ீஸ்"}],
  rule:"th sound", example_en:"These are books.", example_ta:"இவை புத்தகங்கள்."
},
{
  id:"w860", en:"Those", ta_meaning:"அவை", ta_sound:"தோஸ்",
  breakdown:[{part:"Th",ta:"த்"},{part:"ose",ta:"ோஸ்"}],
  rule:"th sound", example_en:"Those are pens.", example_ta:"அவை பேனாக்கள்."
},

{
  id:"w861", en:"Here", ta_meaning:"இங்கே", ta_sound:"ஹியர்",
  breakdown:[{part:"He",ta:"ஹி"},{part:"re",ta:"யர்"}],
  rule:"ere = இயர்", example_en:"Come here.", example_ta:"இங்கே வா."
},
{
  id:"w862", en:"There", ta_meaning:"அங்கே", ta_sound:"தேர்",
  breakdown:[{part:"The",ta:"தே"},{part:"re",ta:"ர்"}],
  rule:"there = தேர்", example_en:"Go there.", example_ta:"அங்கே போ."
},
{
  id:"w863", en:"Now", ta_meaning:"இப்போது", ta_sound:"நவ்",
  breakdown:[{part:"No",ta:"ந"},{part:"w",ta:"வ்"}],
  rule:"ow = அவ்", example_en:"Do it now.", example_ta:"இப்போ செய்."
},
{
  id:"w864", en:"Then", ta_meaning:"பிறகு", ta_sound:"தென்",
  breakdown:[{part:"Th",ta:"த்"},{part:"en",ta:"ென்"}],
  rule:"th sound", example_en:"Eat then sleep.", example_ta:"சாப்பிட்டு பிறகு தூங்கு."
},
{
  id:"w865", en:"Next", ta_meaning:"அடுத்து", ta_sound:"நெக்ஸ்ட்",
  breakdown:[{part:"Ne",ta:"நெ"},{part:"xt",ta:"க்ஸ்ட்"}],
  rule:"x = க்ஸ்", example_en:"Next lesson.", example_ta:"அடுத்த பாடம்."
},

{
  id:"w866", en:"Very", ta_meaning:"மிகவும்", ta_sound:"வெரி",
  breakdown:[{part:"Ve",ta:"வெ"},{part:"ry",ta:"ரி"}],
  rule:"y ending = இ", example_en:"Very good.", example_ta:"மிகவும் நல்லது."
},
{
  id:"w867", en:"Too", ta_meaning:"மிக அதிகம்", ta_sound:"டூ",
  breakdown:[{part:"Too",ta:"டூ"}],
  rule:"oo = ஊ", example_en:"Too hot.", example_ta:"மிகவும் சூடு."
},
{
  id:"w868", en:"Also", ta_meaning:"மேலும்", ta_sound:"ஆல்ஸோ",
  breakdown:[{part:"Al",ta:"ஆல்"},{part:"so",ta:"சோ"}],
  rule:"so = சோ", example_en:"I also come.", example_ta:"நானும் வருவேன்."
},
{
  id:"w869", en:"Only", ta_meaning:"மட்டும்", ta_sound:"ஒன்லி",
  breakdown:[{part:"On",ta:"ஒன்"},{part:"ly",ta:"லி"}],
  rule:"ly = லி", example_en:"Only one.", example_ta:"ஒன்று மட்டும்."
},
{
  id:"w870", en:"Always", ta_meaning:"எப்போதும்", ta_sound:"ஆல்வேஸ்",
  breakdown:[{part:"Al",ta:"ஆல்"},{part:"ways",ta:"வேஸ்"}],
  rule:"ways = வேஸ்", example_en:"Always smile.", example_ta:"எப்போதும் சிரி."
},

{
  id:"w871", en:"Sometimes", ta_meaning:"சில நேரம்", ta_sound:"சம்டைம்ஸ்",
  breakdown:[{part:"Some",ta:"சம்"},{part:"times",ta:"டைம்ஸ்"}],
  rule:"plural", example_en:"Sometimes I walk.", example_ta:"சில நேரம் நான் நடப்பேன்."
},
{
  id:"w872", en:"Never", ta_meaning:"எப்போதும் இல்லை", ta_sound:"நெவர்",
  breakdown:[{part:"Ne",ta:"நெ"},{part:"ver",ta:"வர்"}],
  rule:"er = அர்", example_en:"Never give up.", example_ta:"எப்போதும் விடாதே."
},
{
  id:"w873", en:"Maybe", ta_meaning:"ஒருவேளை", ta_sound:"மேபி",
  breakdown:[{part:"May",ta:"மே"},{part:"be",ta:"பி"}],
  rule:"y = ஏ", example_en:"Maybe later.", example_ta:"ஒருவேளை பிறகு."
},
{
  id:"w874", en:"Sure", ta_meaning:"நிச்சயம்", ta_sound:"ஷூர்",
  breakdown:[{part:"Su",ta:"ஷூ"},{part:"re",ta:"ர்"}],
  rule:"sure = ஷூர்", example_en:"Sure, I will come.", example_ta:"நிச்சயம், நான் வருவேன்."
},

{
  id:"w875", en:"Some", ta_meaning:"சில", ta_sound:"சம்",
  breakdown:[{part:"Some",ta:"சம்"}],
  rule:"quantity", example_en:"Some water.", example_ta:"சில தண்ணீர்."
},
{
  id:"w876", en:"Many", ta_meaning:"பல", ta_sound:"மெனி",
  breakdown:[{part:"Ma",ta:"மெ"},{part:"ny",ta:"னி"}],
  rule:"y ending = இ", example_en:"Many people.", example_ta:"பல பேர்."
},
{
  id:"w877", en:"More", ta_meaning:"மேலும்", ta_sound:"மோர்",
  breakdown:[{part:"Mo",ta:"மோ"},{part:"re",ta:"ர்"}],
  rule:"ore = ஓர்", example_en:"More time.", example_ta:"மேலும் நேரம்."
},
{
  id:"w878", en:"Less", ta_meaning:"குறைவு", ta_sound:"லெஸ்",
  breakdown:[{part:"Le",ta:"லெ"},{part:"ss",ta:"ஸ்"}],
  rule:"double s", example_en:"Less sugar.", example_ta:"சர்க்கரை குறைவு."
},
{
  id:"w879", en:"Enough", ta_meaning:"போதும்", ta_sound:"இனஃப்",
  breakdown:[{part:"E",ta:"இ"},{part:"nough",ta:"னஃப்"}],
  rule:"gh silent",
  example_en:"Enough food.",
  example_ta:"போதும் உணவு."
},

{
  id:"w880", en:"Good", ta_meaning:"நல்ல", ta_sound:"குட்",
  breakdown:[{part:"Go",ta:"கு"},{part:"od",ta:"ட்"}],
  rule:"oo short", example_en:"Good idea.", example_ta:"நல்ல யோசனை."
},
{
  id:"w881", en:"Better", ta_meaning:"மேலும் நல்ல", ta_sound:"பெட்டர்",
  breakdown:[{part:"Be",ta:"பெ"},{part:"tter",ta:"ட்டர்"}],
  rule:"double t", example_en:"Better now.", example_ta:"இப்போ மேலும் நல்லது."
},
{
  id:"w882", en:"Best", ta_meaning:"சிறந்த", ta_sound:"பெஸ்ட்",
  breakdown:[{part:"Be",ta:"பெ"},{part:"st",ta:"ஸ்ட்"}],
  rule:"st = ஸ்ட்", example_en:"Best teacher.", example_ta:"சிறந்த ஆசிரியர்."
},

{
  id:"w883", en:"Big", ta_meaning:"பெரிய", ta_sound:"பிக்",
  breakdown:[{part:"Bi",ta:"பி"},{part:"g",ta:"க்"}],
  rule:"g ending", example_en:"Big room.", example_ta:"பெரிய அறை."
},
{
  id:"w884", en:"Small", ta_meaning:"சிறிய", ta_sound:"ஸ்மால்",
  breakdown:[{part:"Sma",ta:"ஸ்மா"},{part:"ll",ta:"ல்"}],
  rule:"ll = ல்", example_en:"Small room.", example_ta:"சிறிய அறை."
},

{
  id:"w885", en:"Hot", ta_meaning:"சூடு", ta_sound:"ஹாட்",
  breakdown:[{part:"Ho",ta:"ஹா"},{part:"t",ta:"ட்"}],
  rule:"short o", example_en:"Tea is hot.", example_ta:"டீ சூடு."
},
{
  id:"w886", en:"Cold", ta_meaning:"குளிர்", ta_sound:"கோல்ட்",
  breakdown:[{part:"Co",ta:"கோ"},{part:"ld",ta:"ல்ட்"}],
  rule:"ld = ல்ட்", example_en:"Water is cold.", example_ta:"தண்ணீர் குளிர்."
},

{
  id:"w887", en:"Today", ta_meaning:"இன்று", ta_sound:"டுடே",
  breakdown:[{part:"To",ta:"டு"},{part:"day",ta:"டே"}],
  rule:"day = டே", example_en:"Today I study.", example_ta:"இன்று நான் படிப்பேன்."
},
{
  id:"w888", en:"Tomorrow", ta_meaning:"நாளை", ta_sound:"டுமாரோ",
  breakdown:[{part:"To",ta:"டு"},{part:"mor",ta:"மா"},{part:"row",ta:"ரோ"}],
  rule:"ow = ஓ", example_en:"Tomorrow I go.", example_ta:"நாளை நான் போவேன்."
},

{
  id:"w889", en:"Morning", ta_meaning:"காலை", ta_sound:"மார்னிங்",
  breakdown:[{part:"Mor",ta:"மார்"},{part:"ning",ta:"னிங்"}],
  rule:"ng = ங்", example_en:"Morning walk.", example_ta:"காலை நடை."
},
{
  id:"w890", en:"Evening", ta_meaning:"மாலை", ta_sound:"ஈவ்னிங்",
  breakdown:[{part:"Eve",ta:"ஈவ்"},{part:"ning",ta:"னிங்"}],
  rule:"ng = ங்", example_en:"Evening class.", example_ta:"மாலை வகுப்பு."
},
{
  id:"w891", en:"Night", ta_meaning:"இரவு", ta_sound:"நைட்",
  breakdown:[{part:"Ni",ta:"நை"},{part:"ght",ta:"ட்"}],
  rule:"gh silent", example_en:"Night time.", example_ta:"இரவு நேரம்."
},

// Finish up to 100 words with daily life
{
  id:"w892", en:"Water", ta_meaning:"தண்ணீர்", ta_sound:"வாட்டர்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"ter",ta:"டர்"}],
  rule:"er = அர்", example_en:"Water please.", example_ta:"தண்ணீர் தயவு செய்து."
},
{
  id:"w893", en:"Food", ta_meaning:"உணவு", ta_sound:"ஃபூட்",
  breakdown:[{part:"Fo",ta:"ஃபூ"},{part:"od",ta:"ட்"}],
  rule:"oo = ஊ", example_en:"Food is ready.", example_ta:"உணவு தயாராக உள்ளது."
},
{
  id:"w894", en:"Tea", ta_meaning:"டீ", ta_sound:"டீ",
  breakdown:[{part:"Tea",ta:"டீ"}],
  rule:"simple", example_en:"Tea is good.", example_ta:"டீ நல்லது."
},
{
  id:"w895", en:"Coffee", ta_meaning:"காபி", ta_sound:"காஃபி",
  breakdown:[{part:"Cof",ta:"காஃப்"},{part:"fee",ta:"ஃபீ"}],
  rule:"ee = ஈ", example_en:"Coffee is hot.", example_ta:"காபி சூடு."
},
{
  id:"w896", en:"Milk", ta_meaning:"பால்", ta_sound:"மில்க்",
  breakdown:[{part:"Mi",ta:"மி"},{part:"lk",ta:"ல்க்"}],
  rule:"lk = ல்க்", example_en:"Milk is healthy.", example_ta:"பால் நல்லது."
},
{
  id:"w897", en:"Rice", ta_meaning:"அரிசி", ta_sound:"ரைஸ்",
  breakdown:[{part:"Ri",ta:"ரை"},{part:"ce",ta:"ஸ்"}],
  rule:"ce = ஸ", example_en:"Rice is tasty.", example_ta:"அரிசி ருசி."
},
{
  id:"w898", en:"Shop", ta_meaning:"கடை", ta_sound:"ஷாப்",
  breakdown:[{part:"Sh",ta:"ஷ"},{part:"op",ta:"ாப்"}],
  rule:"sh = ஷ", example_en:"Go to shop.", example_ta:"கடைக்கு போ."
},
{
  id:"w899", en:"Market", ta_meaning:"சந்தை", ta_sound:"மார்கெட்",
  breakdown:[{part:"Mar",ta:"மார்"},{part:"ket",ta:"கெட்"}],
  rule:"ar = ஆர்", example_en:"Market is crowded.", example_ta:"சந்தை கூட்டம்."
},
{
  id:"w900", en:"Bus", ta_meaning:"பஸ்", ta_sound:"பஸ்",
  breakdown:[{part:"Bu",ta:"ப"},{part:"s",ta:"ஸ்"}],
  rule:"short u", example_en:"Bus is late.", example_ta:"பஸ் தாமதம்."
},
{
  id:"w901", en:"Train", ta_meaning:"ரயில்", ta_sound:"ட்ரெயின்",
  breakdown:[{part:"Tr",ta:"ட்ர"},{part:"ain",ta:"ேயின்"}],
  rule:"ai = எய்", example_en:"Train is fast.", example_ta:"ரயில் வேகம்."
},
{
  id:"w902", en:"Ticket", ta_meaning:"டிக்கெட்", ta_sound:"டிக்கெட்",
  breakdown:[{part:"Ti",ta:"டி"},{part:"cket",ta:"க்கெட்"}],
  rule:"ck = க்", example_en:"Buy a ticket.", example_ta:"டிக்கெட் வாங்கு."
},
{
  id:"w903", en:"Station", ta_meaning:"நிலையம்", ta_sound:"ஸ்டேஷன்",
  breakdown:[{part:"Sta",ta:"ஸ்டே"},{part:"tion",ta:"ஷன்"}],
  rule:"tion = ஷன்",
  example_en:"Go to station.",
  example_ta:"ஸ்டேஷனுக்கு போ."
},
{
  id:"w904", en:"Police", ta_meaning:"காவல் துறை", ta_sound:"போலீஸ்",
  breakdown:[{part:"Po",ta:"போ"},{part:"lice",ta:"லீஸ்"}],
  rule:"ce = ஸ",
  example_en:"Call the police.",
  example_ta:"போலீஸை அழை."
},
// ===== Fluent Pack 9 (Sentences 406–455) =====
{ id:"s406", en:"I am ready.", ta_meaning:"நான் தயாராக இருக்கிறேன்.", ta_sound:"ஐ ஆம் ரெடி." },
{ id:"s407", en:"You are good.", ta_meaning:"நீ நல்லவன்.", ta_sound:"யூ ஆர் குட்." },
{ id:"s408", en:"He is my friend.", ta_meaning:"அவன் என் நண்பன்.", ta_sound:"ஹீ இஸ் மை ஃப்ரெண்ட்." },
{ id:"s409", en:"She is happy.", ta_meaning:"அவள் மகிழ்ச்சி.", ta_sound:"ஷீ இஸ் ஹாப்பி." },
{ id:"s410", en:"We are students.", ta_meaning:"நாம் மாணவர்கள்.", ta_sound:"வீ ஆர் ஸ்டூடெண்ட்ஸ்." },

{ id:"s411", en:"They are coming.", ta_meaning:"அவர்கள் வருகிறார்கள்.", ta_sound:"தே ஆர் கமிங்." },
{ id:"s412", en:"I am fine.", ta_meaning:"நான் நலமாக இருக்கிறேன்.", ta_sound:"ஐ ஆம் ஃபைன்." },
{ id:"s413", en:"He is good.", ta_meaning:"அவன் நல்லவன்.", ta_sound:"ஹீ இஸ் குட்." },
{ id:"s414", en:"You are smart.", ta_meaning:"நீ புத்திசாலி.", ta_sound:"யூ ஆர் ஸ்மார்ட்." },
{ id:"s415", en:"Do it now.", ta_meaning:"இப்போ செய்.", ta_sound:"டூ இட் நவ்." },

{ id:"s416", en:"He does work.", ta_meaning:"அவன் வேலை செய்கிறான்.", ta_sound:"ஹீ டஸ் வொர்க்." },
{ id:"s417", en:"I did it.", ta_meaning:"நான் அதை செய்தேன்.", ta_sound:"ஐ டிட் இட்." },
{ id:"s418", en:"I can read.", ta_meaning:"நான் படிக்க முடியும்.", ta_sound:"ஐ கேன் ரீட்." },
{ id:"s419", en:"I can't swim.", ta_meaning:"நான் நீந்த முடியாது.", ta_sound:"ஐ கேன்ட் ஸ்விம்." },
{ id:"s420", en:"I will come.", ta_meaning:"நான் வருவேன்.", ta_sound:"ஐ வில் கம்." },

{ id:"s421", en:"I won't go.", ta_meaning:"நான் போக மாட்டேன்.", ta_sound:"ஐ வோன்ட் கோ." },
{ id:"s422", en:"Tea and coffee.", ta_meaning:"டீ மற்றும் காபி.", ta_sound:"டீ அண்ட் காஃபி." },
{ id:"s423", en:"Tea or coffee?", ta_meaning:"டீ அல்லது காபி?", ta_sound:"டீ ஆர் காஃபி?" },
{ id:"s424", en:"I was tired, so I slept.", ta_meaning:"நான் சோர்வாக இருந்தேன், அதனால் தூங்கினேன்.", ta_sound:"ஐ வாஸ் டயர்ட், சோ ஐ ஸ்லெப்ட்." },
{ id:"s425", en:"Go to school.", ta_meaning:"பள்ளிக்கு போ.", ta_sound:"கோ டு ஸ்கூல்." },

{ id:"s426", en:"From India.", ta_meaning:"இந்தியாவிலிருந்து.", ta_sound:"ஃப்ராம் இந்தியா." },
{ id:"s427", en:"A book.", ta_meaning:"ஒரு புத்தகம்.", ta_sound:"அ புக்." },
{ id:"s428", en:"An apple.", ta_meaning:"ஒரு ஆப்பிள்.", ta_sound:"அன் ஆப்பிள்." },
{ id:"s429", en:"The book is here.", ta_meaning:"அந்த புத்தகம் இங்கே.", ta_sound:"த புக் இஸ் ஹியர்." },
{ id:"s430", en:"I have a pen.", ta_meaning:"என்னிடம் பேனா உள்ளது.", ta_sound:"ஐ ஹேவ் அ பென்." },

{ id:"s431", en:"He has a phone.", ta_meaning:"அவனிடம் போன் உள்ளது.", ta_sound:"ஹீ ஹாஸ் அ ஃபோன்." },
{ id:"s432", en:"I had tea.", ta_meaning:"நான் டீ குடித்தேன்.", ta_sound:"ஐ ஹேட் டீ." },
{ id:"s433", en:"Good morning!", ta_meaning:"காலை வணக்கம்!", ta_sound:"குட் மார்னிங்!" },
{ id:"s434", en:"Good night!", ta_meaning:"இரவு வணக்கம்!", ta_sound:"குட் நைட்!" },
{ id:"s435", en:"How are you?", ta_meaning:"நீ எப்படி இருக்கிறாய்?", ta_sound:"ஹவ் ஆர் யூ?" },

{ id:"s436", en:"I am fine.", ta_meaning:"நான் நன்றாக இருக்கிறேன்.", ta_sound:"ஐ ஆம் ஃபைன்." },
{ id:"s437", en:"My phone.", ta_meaning:"என் போன்.", ta_sound:"மை ஃபோன்." },
{ id:"s438", en:"Your book.", ta_meaning:"உன் புத்தகம்.", ta_sound:"யோர் புக்." },
{ id:"s439", en:"His bag.", ta_meaning:"அவனுடைய பை.", ta_sound:"ஹிஸ் பேக்." },
{ id:"s440", en:"Her pen.", ta_meaning:"அவளுடைய பேனா.", ta_sound:"ஹர் பென்." },

{ id:"s441", en:"Our home.", ta_meaning:"நமது வீடு.", ta_sound:"ஆவர் ஹோம்." },
{ id:"s442", en:"Their school.", ta_meaning:"அவர்களின் பள்ளி.", ta_sound:"தேர் ஸ்கூல்." },
{ id:"s443", en:"This is good.", ta_meaning:"இது நல்லது.", ta_sound:"திஸ் இஸ் குட்." },
{ id:"s444", en:"That is bad.", ta_meaning:"அது மோசம்.", ta_sound:"தாட் இஸ் பேட்." },
{ id:"s445", en:"These are books.", ta_meaning:"இவை புத்தகங்கள்.", ta_sound:"தீஸ் ஆர் புக்க்ஸ்." },

{ id:"s446", en:"Those are pens.", ta_meaning:"அவை பேனாக்கள்.", ta_sound:"தோஸ் ஆர் பென்ஸ்." },
{ id:"s447", en:"Come here.", ta_meaning:"இங்கே வா.", ta_sound:"கம் ஹியர்." },
{ id:"s448", en:"Go there.", ta_meaning:"அங்கே போ.", ta_sound:"கோ தேர்." },
{ id:"s449", en:"Eat then sleep.", ta_meaning:"சாப்பிட்டு பிறகு தூங்கு.", ta_sound:"ஈட் தென் ஸ்லீப்." },
{ id:"s450", en:"Always smile.", ta_meaning:"எப்போதும் சிரி.", ta_sound:"ஆல்வேஸ் ஸ்மைல்." },

{ id:"s451", en:"Never give up.", ta_meaning:"எப்போதும் விடாதே.", ta_sound:"நெவர் கிவ் அப்." },
{ id:"s452", en:"Maybe later.", ta_meaning:"ஒருவேளை பிறகு.", ta_sound:"மேபி லேட்டர்." },
{ id:"s453", en:"Sure, I will come.", ta_meaning:"நிச்சயம், நான் வருவேன்.", ta_sound:"ஷூர், ஐ வில் கம்." },
{ id:"s454", en:"Buy a ticket.", ta_meaning:"டிக்கெட் வாங்கு.", ta_sound:"பை அ டிக்கெட்." },
{ id:"s455", en:"Go to station.", ta_meaning:"ஸ்டேஷனுக்கு போ.", ta_sound:"கோ டு ஸ்டேஷன்." },
// ===== Fluent Pack 10 (Words 905–1004) =====

// Common daily verbs
{
  id:"w905",
  en:"Start",
  ta_meaning:"தொடங்கு",
  ta_sound:"ஸ்டார்ட்",
  breakdown:[{part:"Sta",ta:"ஸ்டா"},{part:"rt",ta:"ர்ட்"}],
  rule:"st blend",
  example_en:"Start now.",
  example_ta:"இப்போ தொடங்கு."
},
{
  id:"w906",
  en:"Stop",
  ta_meaning:"நிறுத்து",
  ta_sound:"ஸ்டாப்",
  breakdown:[{part:"St",ta:"ஸ்ட"},{part:"op",ta:"ாப்"}],
  rule:"st blend",
  example_en:"Stop here.",
  example_ta:"இங்கே நிறுத்து."
},
{
  id:"w907",
  en:"Open",
  ta_meaning:"திற",
  ta_sound:"ஓபன்",
  breakdown:[{part:"O",ta:"ஓ"},{part:"pen",ta:"பென்"}],
  rule:"short e",
  example_en:"Open the door.",
  example_ta:"கதவை திற."
},
{
  id:"w908",
  en:"Close",
  ta_meaning:"மூடு",
  ta_sound:"க்ளோஸ்",
  breakdown:[{part:"Clo",ta:"க்ளோ"},{part:"se",ta:"ஸ்"}],
  rule:"magic e",
  example_en:"Close the window.",
  example_ta:"ஜன்னலை மூடு."
},
{
  id:"w909",
  en:"Turn",
  ta_meaning:"திருப்பு",
  ta_sound:"டர்ன்",
  breakdown:[{part:"Tu",ta:"ட"},{part:"rn",ta:"ர்ன்"}],
  rule:"er sound",
  example_en:"Turn left.",
  example_ta:"இடப்பக்கம் திருப்பு."
},
{
  id:"w910",
  en:"Move",
  ta_meaning:"நகரு",
  ta_sound:"மூவ்",
  breakdown:[{part:"Mo",ta:"மூ"},{part:"ve",ta:"வ்"}],
  rule:"magic e",
  example_en:"Move fast.",
  example_ta:"வேகமாக நகரு."
},
{
  id:"w911",
  en:"Run",
  ta_meaning:"ஓடு",
  ta_sound:"ரன்",
  breakdown:[{part:"Ru",ta:"ர"},{part:"n",ta:"ன்"}],
  rule:"short u",
  example_en:"Run now.",
  example_ta:"இப்போ ஓடு."
},
{
  id:"w912",
  en:"Walk",
  ta_meaning:"நட",
  ta_sound:"வாக்",
  breakdown:[{part:"Wa",ta:"வா"},{part:"lk",ta:"க்"}],
  rule:"l silent",
  example_en:"Walk slowly.",
  example_ta:"மெதுவாக நட."
},
{
  id:"w913",
  en:"Talk",
  ta_meaning:"பேசு",
  ta_sound:"டாக்",
  breakdown:[{part:"Ta",ta:"டா"},{part:"lk",ta:"க்"}],
  rule:"l silent",
  example_en:"Talk to me.",
  example_ta:"என்னுடன் பேசு."
},
{
  id:"w914",
  en:"Call",
  ta_meaning:"அழை / கால் செய்",
  ta_sound:"கால்",
  breakdown:[{part:"Ca",ta:"கா"},{part:"ll",ta:"ல்"}],
  rule:"ll = ல்",
  example_en:"Call me.",
  example_ta:"என்னை அழை."
},

// Common places
{
  id:"w915",
  en:"Home",
  ta_meaning:"வீடு",
  ta_sound:"ஹோம்",
  breakdown:[{part:"Ho",ta:"ஹோ"},{part:"me",ta:"ம்"}],
  rule:"magic e",
  example_en:"Go home.",
  example_ta:"வீட்டுக்கு போ."
},
{
  id:"w916",
  en:"Office",
  ta_meaning:"அலுவலகம்",
  ta_sound:"ஆஃபிஸ்",
  breakdown:[{part:"Of",ta:"ஆஃப்"},{part:"fice",ta:"ஃபிஸ்"}],
  rule:"ce = ஸ",
  example_en:"I go to office.",
  example_ta:"நான் ஆஃபிஸுக்கு போவேன்."
},
{
  id:"w917",
  en:"School",
  ta_meaning:"பள்ளி",
  ta_sound:"ஸ்கூல்",
  breakdown:[{part:"Sch",ta:"ஸ்க"},{part:"ool",ta:"ூல்"}],
  rule:"sch = ஸ்க",
  example_en:"School is near.",
  example_ta:"பள்ளி அருகில் உள்ளது."
},
{
  id:"w918",
  en:"College",
  ta_meaning:"கல்லூரி",
  ta_sound:"காலேஜ்",
  breakdown:[{part:"Col",ta:"கா"},{part:"lege",ta:"லேஜ்"}],
  rule:"ge = ஜ்",
  example_en:"My college is big.",
  example_ta:"என் கல்லூரி பெரியது."
},
{
  id:"w919",
  en:"Hospital",
  ta_meaning:"மருத்துவமனை",
  ta_sound:"ஹாஸ்பிடல்",
  breakdown:[{part:"Hos",ta:"ஹாஸ்"},{part:"pi",ta:"பி"},{part:"tal",ta:"டல்"}],
  rule:"stress",
  example_en:"Go to hospital.",
  example_ta:"மருத்துவமனைக்கு போ."
},
{
  id:"w920",
  en:"Bank",
  ta_meaning:"வங்கி",
  ta_sound:"பேங்க்",
  breakdown:[{part:"Ba",ta:"பே"},{part:"nk",ta:"ங்"}],
  rule:"nk = ங்",
  example_en:"Bank is open.",
  example_ta:"வங்கி திறந்துள்ளது."
},

// People
{
  id:"w921",
  en:"Man",
  ta_meaning:"ஆண்",
  ta_sound:"மேன்",
  breakdown:[{part:"Ma",ta:"ம"},{part:"n",ta:"ன்"}],
  rule:"short a",
  example_en:"He is a man.",
  example_ta:"அவன் ஒரு ஆண்."
},
{
  id:"w922",
  en:"Woman",
  ta_meaning:"பெண்",
  ta_sound:"வுமன்",
  breakdown:[{part:"Wo",ta:"வு"},{part:"man",ta:"மன்"}],
  rule:"o changes",
  example_en:"She is a woman.",
  example_ta:"அவள் ஒரு பெண்."
},
{
  id:"w923",
  en:"Boy",
  ta_meaning:"பையன்",
  ta_sound:"பாய்",
  breakdown:[{part:"Bo",ta:"ப"},{part:"y",ta:"ய்"}],
  rule:"oy = ஆய்",
  example_en:"That boy is good.",
  example_ta:"அந்த பையன் நல்லவன்."
},
{
  id:"w924",
  en:"Girl",
  ta_meaning:"பெண் குழந்தை",
  ta_sound:"கர்ல்",
  breakdown:[{part:"Gi",ta:"க"},{part:"rl",ta:"ர்ல்"}],
  rule:"ir = அர்",
  example_en:"This girl is smart.",
  example_ta:"இந்த பெண் குழந்தை புத்திசாலி."
},
{
  id:"w925",
  en:"Friend",
  ta_meaning:"நண்பன்/நண்பி",
  ta_sound:"ஃப்ரெண்ட்",
  breakdown:[{part:"Fri",ta:"ஃப்ரி"},{part:"end",ta:"எண்ட்"}],
  rule:"end = எண்ட்",
  example_en:"He is my friend.",
  example_ta:"அவன் என் நண்பன்."
},

// Common feelings
{
  id:"w926",
  en:"Hungry",
  ta_meaning:"பசிக்கிறது",
  ta_sound:"ஹங்க்ரி",
  breakdown:[{part:"Hun",ta:"ஹன்"},{part:"gry",ta:"க்ரி"}],
  rule:"gr blend",
  example_en:"I am hungry.",
  example_ta:"எனக்கு பசிக்கிறது."
},
{
  id:"w927",
  en:"Thirsty",
  ta_meaning:"தாகமாக உள்ளது",
  ta_sound:"தர்ஸ்டி",
  breakdown:[{part:"Thi",ta:"தி"},{part:"rsty",ta:"ர்ஸ்டி"}],
  rule:"rst = ர்ஸ்ட்",
  example_en:"I am thirsty.",
  example_ta:"எனக்கு தாகமாக உள்ளது."
},
{
  id:"w928",
  en:"Tired",
  ta_meaning:"சோர்வாக",
  ta_sound:"டயர்ட்",
  breakdown:[{part:"Ti",ta:"டை"},{part:"red",ta:"ர்ட்"}],
  rule:"ed ending",
  example_en:"I am tired.",
  example_ta:"நான் சோர்வாக இருக்கிறேன்."
},
{
  id:"w929",
  en:"Sleepy",
  ta_meaning:"தூக்கம் வருகிறது",
  ta_sound:"ஸ்லீப்பி",
  breakdown:[{part:"Slee",ta:"ஸ்லீ"},{part:"py",ta:"ப்பி"}],
  rule:"ee = ஈ",
  example_en:"I am sleepy.",
  example_ta:"எனக்கு தூக்கம் வருகிறது."
},
{
  id:"w930",
  en:"Angry",
  ta_meaning:"கோபம்",
  ta_sound:"ஆங்க்ரி",
  breakdown:[{part:"An",ta:"ஆன்"},{part:"gry",ta:"க்ரி"}],
  rule:"ng = ங்",
  example_en:"Don't be angry.",
  example_ta:"கோபப்படாதே."
},

// Time + routine
{
  id:"w931",
  en:"Early",
  ta_meaning:"சீக்கிரம்",
  ta_sound:"எர்லி",
  breakdown:[{part:"Ear",ta:"எர்"},{part:"ly",ta:"லி"}],
  rule:"ly = லி",
  example_en:"Wake up early.",
  example_ta:"சீக்கிரம் எழுந்து."
},
{
  id:"w932",
  en:"Late",
  ta_meaning:"தாமதம்",
  ta_sound:"லேட்",
  breakdown:[{part:"La",ta:"லே"},{part:"te",ta:"ட்"}],
  rule:"magic e",
  example_en:"Don't be late.",
  example_ta:"தாமதமாகாதே."
},
{
  id:"w933",
  en:"Fast",
  ta_meaning:"வேகமாக",
  ta_sound:"ஃபாஸ்ட்",
  breakdown:[{part:"Fa",ta:"ஃபா"},{part:"st",ta:"ஸ்ட்"}],
  rule:"st = ஸ்ட்",
  example_en:"Run fast.",
  example_ta:"வேகமாக ஓடு."
},
{
  id:"w934",
  en:"Slow",
  ta_meaning:"மெதுவாக",
  ta_sound:"ஸ்லோ",
  breakdown:[{part:"Sl",ta:"ஸ்ல"},{part:"ow",ta:"ோ"}],
  rule:"ow = ஓ",
  example_en:"Walk slow.",
  example_ta:"மெதுவாக நட."
},
{
  id:"w935",
  en:"Quick",
  ta_meaning:"சீக்கிரம்",
  ta_sound:"க்விக்",
  breakdown:[{part:"Qu",ta:"க்வி"},{part:"ck",ta:"க்"}],
  rule:"qu = க்வ, ck = க்",
  example_en:"Be quick.",
  example_ta:"சீக்கிரம் செய்."
},

// Common question phrases
{
  id:"w936",
  en:"What time",
  ta_meaning:"எத்தனை மணி",
  ta_sound:"வாட் டைம்",
  breakdown:[{part:"What",ta:"வாட்"},{part:"time",ta:"டைம்"}],
  rule:"phrase",
  example_en:"What time is it?",
  example_ta:"எத்தனை மணி?"
},
{
  id:"w937",
  en:"How much",
  ta_meaning:"எவ்வளவு",
  ta_sound:"ஹவ் மச்",
  breakdown:[{part:"How",ta:"ஹவ்"},{part:"much",ta:"மச்"}],
  rule:"ch = ச",
  example_en:"How much is this?",
  example_ta:"இது எவ்வளவு?"
},
{
  id:"w938",
  en:"How many",
  ta_meaning:"எத்தனை",
  ta_sound:"ஹவ் மெனி",
  breakdown:[{part:"How",ta:"ஹவ்"},{part:"many",ta:"மெனி"}],
  rule:"y ending = இ",
  example_en:"How many people?",
  example_ta:"எத்தனை பேர்?"
},
{
  id:"w939",
  en:"Where are you",
  ta_meaning:"நீ எங்கே இருக்கிறாய்",
  ta_sound:"வேர் ஆர் யூ",
  breakdown:[{part:"Where",ta:"வேர்"},{part:"are",ta:"ஆர்"},{part:"you",ta:"யூ"}],
  rule:"phrase",
  example_en:"Where are you now?",
  example_ta:"நீ இப்போ எங்கே இருக்கிறாய்?"
},
{
  id:"w940",
  en:"What is your name",
  ta_meaning:"உன் பெயர் என்ன",
  ta_sound:"வாட் இஸ் யோர் நேம்",
  breakdown:[{part:"What",ta:"வாட்"},{part:"is",ta:"இஸ்"},{part:"your",ta:"யோர்"},{part:"name",ta:"நேம்"}],
  rule:"question",
  example_en:"What is your name?",
  example_ta:"உன் பெயர் என்ன?"
},

// Common objects
{
  id:"w941",
  en:"Mobile",
  ta_meaning:"மொபைல்",
  ta_sound:"மொபைல்",
  breakdown:[{part:"Mo",ta:"மொ"},{part:"bile",ta:"பைல்"}],
  rule:"magic e",
  example_en:"My mobile is new.",
  example_ta:"என் மொபைல் புதியது."
},
{
  id:"w942",
  en:"Charger",
  ta_meaning:"சார்ஜர்",
  ta_sound:"சார்ஜர்",
  breakdown:[{part:"Char",ta:"சார்"},{part:"ger",ta:"ஜர்"}],
  rule:"ge = ஜ்",
  example_en:"Bring charger.",
  example_ta:"சார்ஜர் கொண்டு வா."
},
{
  id:"w943",
  en:"Battery",
  ta_meaning:"பேட்டரி",
  ta_sound:"பேட்டரி",
  breakdown:[{part:"Bat",ta:"பேட்"},{part:"tery",ta:"ரி"}],
  rule:"y ending = இ",
  example_en:"Battery is low.",
  example_ta:"பேட்டரி குறைவு."
},
{
  id:"w944",
  en:"Internet",
  ta_meaning:"இணையம்",
  ta_sound:"இன்டர்நெட்",
  breakdown:[{part:"In",ta:"இன்"},{part:"ter",ta:"டர்"},{part:"net",ta:"நெட்"}],
  rule:"compound",
  example_en:"Internet is slow.",
  example_ta:"இன்டர்நெட் மெது."
},
{
  id:"w945",
  en:"Password",
  ta_meaning:"கடவுச்சொல்",
  ta_sound:"பாஸ்வேர்ட்",
  breakdown:[{part:"Pass",ta:"பாஸ்"},{part:"word",ta:"வேர்ட்"}],
  rule:"ss = ஸ",
  example_en:"Enter password.",
  example_ta:"பாஸ்வேர்ட் உள்ளிடு."
},

// Polite words
{
  id:"w946",
  en:"Please",
  ta_meaning:"தயவு செய்து",
  ta_sound:"ப்ளீஸ்",
  breakdown:[{part:"Ple",ta:"ப்ளீ"},{part:"ase",ta:"ஸ்"}],
  rule:"ee sound",
  example_en:"Please help me.",
  example_ta:"தயவு செய்து உதவி செய்."
},
{
  id:"w947",
  en:"Sorry",
  ta_meaning:"மன்னிக்கவும்",
  ta_sound:"சாரி",
  breakdown:[{part:"Sor",ta:"சா"},{part:"ry",ta:"ரி"}],
  rule:"y ending = இ",
  example_en:"Sorry, I am late.",
  example_ta:"மன்னிக்கவும், நான் தாமதம்."
},
{
  id:"w948",
  en:"Thanks",
  ta_meaning:"நன்றி",
  ta_sound:"தேங்க்ஸ்",
  breakdown:[{part:"Tha",ta:"தே"},{part:"nks",ta:"ங்க்ஸ்"}],
  rule:"nk = ங்",
  example_en:"Thanks a lot.",
  example_ta:"மிக்க நன்றி."
},
{
  id:"w949",
  en:"Welcome",
  ta_meaning:"வரவேற்கிறேன்",
  ta_sound:"வெல்கம்",
  breakdown:[{part:"Wel",ta:"வெல்"},{part:"come",ta:"கம்"}],
  rule:"o changes",
  example_en:"You are welcome.",
  example_ta:"வரவேற்கிறேன்."
},
{
  id:"w950",
  en:"Excuse me",
  ta_meaning:"மன்னிக்கவும் (கவனம் கேட்க)",
  ta_sound:"எக்ஸ்கியூஸ் மீ",
  breakdown:[{part:"Ex",ta:"எக்ஸ்"},{part:"cuse",ta:"க்யூஸ்"},{part:"me",ta:"மீ"}],
  rule:"phrase",
  example_en:"Excuse me, sir.",
  example_ta:"மன்னிக்கவும் சார்."
},

// 54 more useful words to complete 100
{
  id:"w951", en:"Left", ta_meaning:"இடது", ta_sound:"லெஃப்ட்",
  breakdown:[{part:"Le",ta:"லெ"},{part:"ft",ta:"ஃப்ட்"}],
  rule:"ft = ஃப்ட்", example_en:"Turn left.", example_ta:"இடப்பக்கம் திருப்பு."
},
{
  id:"w952", en:"Right", ta_meaning:"வலது", ta_sound:"ரைட்",
  breakdown:[{part:"Ri",ta:"ரை"},{part:"ght",ta:"ட்"}],
  rule:"gh silent", example_en:"Turn right.", example_ta:"வலப்பக்கம் திருப்பு."
},
{
  id:"w953", en:"Up", ta_meaning:"மேல்", ta_sound:"அப்",
  breakdown:[{part:"Up",ta:"அப்"}],
  rule:"short u", example_en:"Stand up.", example_ta:"எழுந்து நில்."
},
{
  id:"w954", en:"Down", ta_meaning:"கீழே", ta_sound:"டவுன்",
  breakdown:[{part:"Do",ta:"ட"},{part:"wn",ta:"வுன்"}],
  rule:"ow = அவ்", example_en:"Sit down.", example_ta:"உட்கார்."
},
{
  id:"w955", en:"Inside", ta_meaning:"உள்ளே", ta_sound:"இன்சைட்",
  breakdown:[{part:"In",ta:"இன்"},{part:"side",ta:"சைட்"}],
  rule:"magic e", example_en:"Come inside.", example_ta:"உள்ளே வா."
},
{
  id:"w956", en:"Outside", ta_meaning:"வெளியே", ta_sound:"அவுட்சைட்",
  breakdown:[{part:"Out",ta:"அவுட்"},{part:"side",ta:"சைட்"}],
  rule:"ou = அவ்", example_en:"Go outside.", example_ta:"வெளியே போ."
},

{
  id:"w957", en:"Again", ta_meaning:"மீண்டும்", ta_sound:"அகேன்",
  breakdown:[{part:"A",ta:"அ"},{part:"gain",ta:"கேன்"}],
  rule:"ai = ஏ", example_en:"Say again.", example_ta:"மீண்டும் சொல்."
},
{
  id:"w958", en:"Same", ta_meaning:"அதே", ta_sound:"சேம்",
  breakdown:[{part:"Sa",ta:"சே"},{part:"me",ta:"ம்"}],
  rule:"magic e", example_en:"Same thing.", example_ta:"அதே விஷயம்."
},
{
  id:"w959", en:"Different", ta_meaning:"வேறு", ta_sound:"டிஃபரெண்ட்",
  breakdown:[{part:"Dif",ta:"டிஃப்"},{part:"fer",ta:"பர்"},{part:"ent",ta:"என்ட்"}],
  rule:"ent = என்ட்", example_en:"This is different.", example_ta:"இது வேறு."
},
{
  id:"w960", en:"Problem", ta_meaning:"பிரச்சனை", ta_sound:"ப்ராப்ளம்",
  breakdown:[{part:"Pro",ta:"ப்ரா"},{part:"blem",ta:"ப்ளம்"}],
  rule:"bl blend", example_en:"No problem.", example_ta:"பிரச்சனை இல்லை."
},
{
  id:"w961", en:"Solution", ta_meaning:"தீர்வு", ta_sound:"சலூஷன்",
  breakdown:[{part:"So",ta:"ச"},{part:"lu",ta:"லூ"},{part:"tion",ta:"ஷன்"}],
  rule:"tion = ஷன்", example_en:"Find solution.", example_ta:"தீர்வு கண்டுபிடி."
},

{
  id:"w962", en:"Read", ta_meaning:"படி", ta_sound:"ரீட்",
  breakdown:[{part:"Re",ta:"ரீ"},{part:"ad",ta:"ட்"}],
  rule:"ea = ஈ", example_en:"Read this.", example_ta:"இதை படி."
},
{
  id:"w963", en:"Write", ta_meaning:"எழுது", ta_sound:"ரைட்",
  breakdown:[{part:"W",ta:"(silent)"},{part:"rite",ta:"ரைட்"}],
  rule:"w silent", example_en:"Write your name.", example_ta:"உன் பெயர் எழுது."
},
{
  id:"w964", en:"Learn", ta_meaning:"கற்று", ta_sound:"லர்ன்",
  breakdown:[{part:"Le",ta:"ல"},{part:"arn",ta:"ர்ன்"}],
  rule:"ear = அர்", example_en:"Learn English.", example_ta:"ஆங்கிலம் கற்று."
},
{
  id:"w965", en:"Teach", ta_meaning:"கற்றுக்கொடு", ta_sound:"டீச்",
  breakdown:[{part:"Tea",ta:"டீ"},{part:"ch",ta:"ச்"}],
  rule:"ch = ச", example_en:"Teach me.", example_ta:"எனக்கு கற்றுக்கொடு."
},

{
  id:"w966", en:"Practice", ta_meaning:"பயிற்சி", ta_sound:"ப்ராக்டிஸ்",
  breakdown:[{part:"Prac",ta:"ப்ராக்"},{part:"tice",ta:"டிஸ்"}],
  rule:"ce = ஸ", example_en:"Practice daily.", example_ta:"தினமும் பயிற்சி செய்."
},
{
  id:"w967", en:"Improve", ta_meaning:"மேம்படுத்து", ta_sound:"இம்ப்ரூவ்",
  breakdown:[{part:"Im",ta:"இம்"},{part:"prove",ta:"ப்ரூவ்"}],
  rule:"magic e", example_en:"Improve your English.", example_ta:"உன் ஆங்கிலம் மேம்படுத்து."
},
{
  id:"w968", en:"Perfect", ta_meaning:"சரியான", ta_sound:"பர்ஃபெக்ட்",
  breakdown:[{part:"Per",ta:"பர்"},{part:"fect",ta:"ஃபெக்ட்"}],
  rule:"ct = க்ட்", example_en:"Perfect sound.", example_ta:"சரியான ஒலி."
},
{
  id:"w969", en:"Mistake", ta_meaning:"தவறு", ta_sound:"மிஸ்டேக்",
  breakdown:[{part:"Mis",ta:"மிஸ்"},{part:"take",ta:"டேக்"}],
  rule:"magic e", example_en:"Don't repeat mistake.", example_ta:"தவறை மீண்டும் செய்யாதே."
},
{
  id:"w970", en:"Correct", ta_meaning:"சரி", ta_sound:"கரெக்ட்",
  breakdown:[{part:"Cor",ta:"க"},{part:"rect",ta:"ரெக்ட்"}],
  rule:"ct = க்ட்", example_en:"This is correct.", example_ta:"இது சரி."
},

{
  id:"w971", en:"Wrong", ta_meaning:"தவறு", ta_sound:"ராங்",
  breakdown:[{part:"Wr",ta:"(w silent)"},{part:"ong",ta:"ாங்"}],
  rule:"w silent", example_en:"This is wrong.", example_ta:"இது தவறு."
},
{
  id:"w972", en:"Answer", ta_meaning:"பதில்", ta_sound:"ஆன்சர்",
  breakdown:[{part:"An",ta:"ஆன்"},{part:"swer",ta:"சர்"}],
  rule:"w silent sometimes", example_en:"Give answer.", example_ta:"பதில் கொடு."
},
{
  id:"w973", en:"Question", ta_meaning:"கேள்வி", ta_sound:"க்வெஸ்சன்",
  breakdown:[{part:"Ques",ta:"க்வெஸ்"},{part:"tion",ta:"சன்"}],
  rule:"tion = சன்", example_en:"Ask question.", example_ta:"கேள்வி கேள்."
},
{
  id:"w974", en:"Meaning", ta_meaning:"அர்த்தம்", ta_sound:"மீனிங்",
  breakdown:[{part:"Mean",ta:"மீன்"},{part:"ing",ta:"இங்"}],
  rule:"ee = ஈ", example_en:"Meaning in Tamil.", example_ta:"தமிழில் அர்த்தம்."
},
{
  id:"w975", en:"Sound rule", ta_meaning:"ஒலி விதி", ta_sound:"சவுண்ட் ரூல்",
  breakdown:[{part:"Sound",ta:"சவுண்ட்"},{part:"rule",ta:"ரூல்"}],
  rule:"phrase", example_en:"Learn sound rule.", example_ta:"ஒலி விதி கற்று."
},

// last 30 words: common daily phrases
{
  id:"w976", en:"Good", ta_meaning:"நல்ல", ta_sound:"குட்",
  breakdown:[{part:"Good",ta:"குட்"}],
  rule:"basic", example_en:"Good job.", example_ta:"நல்ல வேலை."
},
{
  id:"w977", en:"Great", ta_meaning:"அருமை", ta_sound:"க்ரேட்",
  breakdown:[{part:"Gr",ta:"க்ர"},{part:"eat",ta:"ேட்"}],
  rule:"ea = ஏ", example_en:"Great!", example_ta:"அருமை!"
},
{
  id:"w978", en:"Nice", ta_meaning:"நன்று", ta_sound:"நைஸ்",
  breakdown:[{part:"Ni",ta:"நை"},{part:"ce",ta:"ஸ்"}],
  rule:"ce = ஸ", example_en:"Nice work.", example_ta:"நன்று."
},
{
  id:"w979", en:"Okay", ta_meaning:"சரி", ta_sound:"ஓகே",
  breakdown:[{part:"O",ta:"ஓ"},{part:"kay",ta:"கே"}],
  rule:"ay = ஏ", example_en:"Okay, I will come.", example_ta:"சரி, நான் வருவேன்."
},
{
  id:"w980", en:"Yes", ta_meaning:"ஆம்", ta_sound:"யெஸ்",
  breakdown:[{part:"Ye",ta:"யெ"},{part:"s",ta:"ஸ்"}],
  rule:"short e", example_en:"Yes, I can.", example_ta:"ஆம், நான் முடியும்."
},
{
  id:"w981", en:"No", ta_meaning:"இல்லை", ta_sound:"நோ",
  breakdown:[{part:"No",ta:"நோ"}],
  rule:"long o", example_en:"No, I can't.", example_ta:"இல்லை, முடியாது."
},

{
  id:"w982", en:"Please wait", ta_meaning:"தயவு செய்து காத்திருங்கள்", ta_sound:"ப்ளீஸ் வேட்",
  breakdown:[{part:"Please",ta:"ப்ளீஸ்"},{part:"wait",ta:"வேட்"}],
  rule:"phrase", example_en:"Please wait here.", example_ta:"தயவு செய்து இங்கே காத்திருங்கள்."
},
{
  id:"w983", en:"Come soon", ta_meaning:"சீக்கிரம் வா", ta_sound:"கம் சூன்",
  breakdown:[{part:"Come",ta:"கம்"},{part:"soon",ta:"சூன்"}],
  rule:"oo = ஊ", example_en:"Come soon.", example_ta:"சீக்கிரம் வா."
},
{
  id:"w984", en:"Take care", ta_meaning:"கவனமாக இரு", ta_sound:"டேக் கேர்",
  breakdown:[{part:"Take",ta:"டேக்"},{part:"care",ta:"கேர்"}],
  rule:"magic e", example_en:"Take care!", example_ta:"கவனமாக இரு!"
},
{
  id:"w985", en:"See you", ta_meaning:"பிறகு சந்திப்போம்", ta_sound:"ஸீ யூ",
  breakdown:[{part:"See",ta:"ஸீ"},{part:"you",ta:"யூ"}],
  rule:"ee = ஈ", example_en:"See you later.", example_ta:"பிறகு சந்திப்போம்."
},
{
  id:"w986", en:"Good luck", ta_meaning:"வாழ்த்துக்கள்", ta_sound:"குட் லக்",
  breakdown:[{part:"Good",ta:"குட்"},{part:"luck",ta:"லக்"}],
  rule:"basic", example_en:"Good luck!", example_ta:"வாழ்த்துக்கள்!"
},

{
  id:"w987", en:"Congratulations", ta_meaning:"வாழ்த்துக்கள்", ta_sound:"காங்கிராடுலேஷன்ஸ்",
  breakdown:[{part:"Con",ta:"கான்"},{part:"gra",ta:"க்ரா"},{part:"tu",ta:"டு"},{part:"la",ta:"லே"},{part:"tions",ta:"ஷன்ஸ்"}],
  rule:"tions = ஷன்ஸ்",
  example_en:"Congratulations!",
  example_ta:"வாழ்த்துக்கள்!"
},
{
  id:"w988", en:"Good bye", ta_meaning:"பிரியாவிடை", ta_sound:"குட் பை",
  breakdown:[{part:"Good",ta:"குட்"},{part:"bye",ta:"பை"}],
  rule:"bye = பை", example_en:"Good bye!", example_ta:"பிரியாவிடை!"
},
{
  id:"w989", en:"Hello", ta_meaning:"வணக்கம்", ta_sound:"ஹலோ",
  breakdown:[{part:"He",ta:"ஹ"},{part:"llo",ta:"லோ"}],
  rule:"basic", example_en:"Hello!", example_ta:"வணக்கம்!"
},
{
  id:"w990", en:"Bye", ta_meaning:"போய் வருகிறேன்", ta_sound:"பை",
  breakdown:[{part:"Bye",ta:"பை"}],
  rule:"basic", example_en:"Bye!", example_ta:"போய் வருகிறேன்!"
},

// last 15 (final)
{
  id:"w991", en:"Need help", ta_meaning:"உதவி தேவை", ta_sound:"நீட் ஹெல்ப்",
  breakdown:[{part:"Need",ta:"நீட்"},{part:"help",ta:"ஹெல்ப்"}],
  rule:"phrase", example_en:"I need help.", example_ta:"எனக்கு உதவி தேவை."
},
{
  id:"w992", en:"No worry", ta_meaning:"கவலை வேண்டாம்", ta_sound:"நோ வரி",
  breakdown:[{part:"No",ta:"நோ"},{part:"worry",ta:"வரி"}],
  rule:"phrase", example_en:"No worry.", example_ta:"கவலை வேண்டாம்."
},
{
  id:"w993", en:"Good idea", ta_meaning:"நல்ல யோசனை", ta_sound:"குட் ஐடியா",
  breakdown:[{part:"Good",ta:"குட்"},{part:"idea",ta:"ஐடியா"}],
  rule:"phrase", example_en:"Good idea!", example_ta:"நல்ல யோசனை!"
},
{
  id:"w994", en:"I am learning", ta_meaning:"நான் கற்றுக்கொண்டு இருக்கிறேன்", ta_sound:"ஐ ஆம் லெர்னிங்",
  breakdown:[{part:"I",ta:"ஐ"},{part:"am",ta:"ஆம்"},{part:"learning",ta:"லெர்னிங்"}],
  rule:"present continuous",
  example_en:"I am learning English.",
  example_ta:"நான் ஆங்கிலம் கற்றுக்கொண்டு இருக்கிறேன்."
},
{
  id:"w995", en:"I can speak", ta_meaning:"நான் பேச முடியும்", ta_sound:"ஐ கேன் ஸ்பீக்",
  breakdown:[{part:"I",ta:"ஐ"},{part:"can",ta:"கேன்"},{part:"speak",ta:"ஸ்பீக்"}],
  rule:"ability",
  example_en:"I can speak English.",
  example_ta:"நான் ஆங்கிலம் பேச முடியும்."
},
{
  id:"w996", en:"I can read", ta_meaning:"நான் படிக்க முடியும்", ta_sound:"ஐ கேன் ரீட்",
  breakdown:[{part:"I",ta:"ஐ"},{part:"can",ta:"கேன்"},{part:"read",ta:"ரீட்"}],
  rule:"ability",
  example_en:"I can read English.",
  example_ta:"நான் ஆங்கிலம் படிக்க முடியும்."
},
{
  id:"w997", en:"I can write", ta_meaning:"நான் எழுத முடியும்", ta_sound:"ஐ கேன் ரைட்",
  breakdown:[{part:"I",ta:"ஐ"},{part:"can",ta:"கேன்"},{part:"write",ta:"ரைட்"}],
  rule:"ability",
  example_en:"I can write English.",
  example_ta:"நான் ஆங்கிலம் எழுத முடியும்."
},
{
  id:"w998", en:"Speak slowly", ta_meaning:"மெதுவாக பேசுங்கள்", ta_sound:"ஸ்பீக் ஸ்லோலி",
  breakdown:[{part:"Speak",ta:"ஸ்பீக்"},{part:"slowly",ta:"ஸ்லோலி"}],
  rule:"phrase",
  example_en:"Speak slowly, please.",
  example_ta:"தயவு செய்து மெதுவாக பேசுங்கள்."
},
{
  id:"w999", en:"Repeat again", ta_meaning:"மீண்டும் சொல்லுங்கள்", ta_sound:"ரிபீட் அகேன்",
  breakdown:[{part:"Repeat",ta:"ரிபீட்"},{part:"again",ta:"அகேன்"}],
  rule:"phrase",
  example_en:"Repeat again.",
  example_ta:"மீண்டும் சொல்லுங்கள்."
},
{
  id:"w1000", en:"I understand", ta_meaning:"நான் புரிந்துகொள்கிறேன்", ta_sound:"ஐ அண்டர்ஸ்டேண்ட்",
  breakdown:[{part:"I",ta:"ஐ"},{part:"understand",ta:"அண்டர்ஸ்டேண்ட்"}],
  rule:"phrase",
  example_en:"I understand you.",
  example_ta:"நான் உன்னை புரிந்துகொள்கிறேன்."
},
{
  id:"w1001", en:"I don't understand", ta_meaning:"எனக்கு புரியவில்லை", ta_sound:"ஐ டோன்ட் அண்டர்ஸ்டேண்ட்",
  breakdown:[{part:"I",ta:"ஐ"},{part:"don't",ta:"டோன்ட்"},{part:"understand",ta:"அண்டர்ஸ்டேண்ட்"}],
  rule:"negative",
  example_en:"I don't understand.",
  example_ta:"எனக்கு புரியவில்லை."
},
{
  id:"w1002", en:"Can you help me", ta_meaning:"நீங்கள் எனக்கு உதவ முடியுமா", ta_sound:"கேன் யூ ஹெல்ப் மீ",
  breakdown:[{part:"Can",ta:"கேன்"},{part:"you",ta:"யூ"},{part:"help",ta:"ஹெல்ப்"},{part:"me",ta:"மீ"}],
  rule:"question",
  example_en:"Can you help me?",
  example_ta:"நீங்கள் எனக்கு உதவ முடியுமா?"
},
{
  id:"w1003", en:"Thank you very much", ta_meaning:"மிக்க நன்றி", ta_sound:"தேங்க் யூ வெரி மச்",
  breakdown:[{part:"Thank",ta:"தேங்க்"},{part:"you",ta:"யூ"},{part:"very",ta:"வெரி"},{part:"much",ta:"மச்"}],
  rule:"phrase",
  example_en:"Thank you very much.",
  example_ta:"மிக்க நன்றி."
},
{
  id:"w1004", en:"You are welcome", ta_meaning:"வரவேற்கிறேன்", ta_sound:"யூ ஆர் வெல்கம்",
  breakdown:[{part:"You",ta:"யூ"},{part:"are",ta:"ஆர்"},{part:"welcome",ta:"வெல்கம்"}],
  rule:"reply",
  example_en:"You are welcome.",
  example_ta:"வரவேற்கிறேன்."
},
// ===== Fluent Pack 10 (Sentences 456–505) =====
{ id:"s456", en:"Start now.", ta_meaning:"இப்போ தொடங்கு.", ta_sound:"ஸ்டார்ட் நவ்." },
{ id:"s457", en:"Stop here.", ta_meaning:"இங்கே நிறுத்து.", ta_sound:"ஸ்டாப் ஹியர்." },
{ id:"s458", en:"Open the door.", ta_meaning:"கதவை திற.", ta_sound:"ஓபன் த டோர்." },
{ id:"s459", en:"Close the window.", ta_meaning:"ஜன்னலை மூடு.", ta_sound:"க்ளோஸ் த விண்டோ." },
{ id:"s460", en:"Turn left.", ta_meaning:"இடப்பக்கம் திருப்பு.", ta_sound:"டர்ன் லெஃப்ட்." },

{ id:"s461", en:"Turn right.", ta_meaning:"வலப்பக்கம் திருப்பு.", ta_sound:"டர்ன் ரைட்." },
{ id:"s462", en:"Go home.", ta_meaning:"வீட்டுக்கு போ.", ta_sound:"கோ ஹோம்." },
{ id:"s463", en:"I go to office.", ta_meaning:"நான் ஆஃபிஸுக்கு போவேன்.", ta_sound:"ஐ கோ டு ஆஃபிஸ்." },
{ id:"s464", en:"School is near.", ta_meaning:"பள்ளி அருகில் உள்ளது.", ta_sound:"ஸ்கூல் இஸ் நீர்." },
{ id:"s465", en:"Go to hospital.", ta_meaning:"மருத்துவமனைக்கு போ.", ta_sound:"கோ டு ஹாஸ்பிடல்." },

{ id:"s466", en:"Bank is open.", ta_meaning:"வங்கி திறந்துள்ளது.", ta_sound:"பேங்க் இஸ் ஓபன்." },
{ id:"s467", en:"He is my friend.", ta_meaning:"அவன் என் நண்பன்.", ta_sound:"ஹீ இஸ் மை ஃப்ரெண்ட்." },
{ id:"s468", en:"I am hungry.", ta_meaning:"எனக்கு பசிக்கிறது.", ta_sound:"ஐ ஆம் ஹங்க்ரி." },
{ id:"s469", en:"I am thirsty.", ta_meaning:"எனக்கு தாகமாக உள்ளது.", ta_sound:"ஐ ஆம் தர்ஸ்டி." },
{ id:"s470", en:"I am tired.", ta_meaning:"நான் சோர்வாக இருக்கிறேன்.", ta_sound:"ஐ ஆம் டயர்ட்." },

{ id:"s471", en:"Wake up early.", ta_meaning:"சீக்கிரம் எழுந்து.", ta_sound:"வேக் அப் எர்லி." },
{ id:"s472", en:"Don't be late.", ta_meaning:"தாமதமாகாதே.", ta_sound:"டோன்ட் பீ லேட்." },
{ id:"s473", en:"Run fast.", ta_meaning:"வேகமாக ஓடு.", ta_sound:"ரன் ஃபாஸ்ட்." },
{ id:"s474", en:"Walk slow.", ta_meaning:"மெதுவாக நட.", ta_sound:"வாக் ஸ்லோ." },
{ id:"s475", en:"Be quick.", ta_meaning:"சீக்கிரம் செய்.", ta_sound:"பீ க்விக்." },

{ id:"s476", en:"What time is it?", ta_meaning:"எத்தனை மணி?", ta_sound:"வாட் டைம் இஸ் இட்?" },
{ id:"s477", en:"How much is this?", ta_meaning:"இது எவ்வளவு?", ta_sound:"ஹவ் மச் இஸ் திஸ்?" },
{ id:"s478", en:"How many people?", ta_meaning:"எத்தனை பேர்?", ta_sound:"ஹவ் மெனி பீப்புள்?" },
{ id:"s479", en:"Where are you now?", ta_meaning:"நீ இப்போ எங்கே இருக்கிறாய்?", ta_sound:"வேர் ஆர் யூ நவ்?" },
{ id:"s480", en:"What is your name?", ta_meaning:"உன் பெயர் என்ன?", ta_sound:"வாட் இஸ் யோர் நேம்?" },

{ id:"s481", en:"My mobile is new.", ta_meaning:"என் மொபைல் புதியது.", ta_sound:"மை மொபைல் இஸ் நியூ." },
{ id:"s482", en:"Bring charger.", ta_meaning:"சார்ஜர் கொண்டு வா.", ta_sound:"ப்ரிங் சார்ஜர்." },
{ id:"s483", en:"Battery is low.", ta_meaning:"பேட்டரி குறைவு.", ta_sound:"பேட்டரி இஸ் லோ." },
{ id:"s484", en:"Internet is slow.", ta_meaning:"இன்டர்நெட் மெது.", ta_sound:"இன்டர்நெட் இஸ் ஸ்லோ." },
{ id:"s485", en:"Enter password.", ta_meaning:"பாஸ்வேர்ட் உள்ளிடு.", ta_sound:"என்டர் பாஸ்வேர்ட்." },

{ id:"s486", en:"Please help me.", ta_meaning:"தயவு செய்து உதவி செய்.", ta_sound:"ப்ளீஸ் ஹெல்ப் மீ." },
{ id:"s487", en:"Sorry, I am late.", ta_meaning:"மன்னிக்கவும், நான் தாமதம்.", ta_sound:"சாரி, ஐ ஆம் லேட்." },
{ id:"s488", en:"Thanks a lot.", ta_meaning:"மிக்க நன்றி.", ta_sound:"தேங்க்ஸ் அ லாட்." },
{ id:"s489", en:"You are welcome.", ta_meaning:"வரவேற்கிறேன்.", ta_sound:"யூ ஆர் வெல்கம்." },
{ id:"s490", en:"Excuse me, sir.", ta_meaning:"மன்னிக்கவும் சார்.", ta_sound:"எக்ஸ்கியூஸ் மீ சர்." },

{ id:"s491", en:"Come inside.", ta_meaning:"உள்ளே வா.", ta_sound:"கம் இன்சைட்." },
{ id:"s492", en:"Go outside.", ta_meaning:"வெளியே போ.", ta_sound:"கோ அவுட்சைட்." },
{ id:"s493", en:"Say again.", ta_meaning:"மீண்டும் சொல்.", ta_sound:"சே அகேன்." },
{ id:"s494", en:"This is different.", ta_meaning:"இது வேறு.", ta_sound:"திஸ் இஸ் டிஃபரெண்ட்." },
{ id:"s495", en:"No problem.", ta_meaning:"பிரச்சனை இல்லை.", ta_sound:"நோ ப்ராப்ளம்." },

{ id:"s496", en:"Read this.", ta_meaning:"இதை படி.", ta_sound:"ரீட் திஸ்." },
{ id:"s497", en:"Write your name.", ta_meaning:"உன் பெயர் எழுது.", ta_sound:"ரைட் யோர் நேம்." },
{ id:"s498", en:"Learn English.", ta_meaning:"ஆங்கிலம் கற்று.", ta_sound:"லர்ன் இங்கிலிஷ்." },
{ id:"s499", en:"Practice daily.", ta_meaning:"தினமும் பயிற்சி செய்.", ta_sound:"ப்ராக்டிஸ் டெய்லி." },
{ id:"s500", en:"Improve your English.", ta_meaning:"உன் ஆங்கிலம் மேம்படுத்து.", ta_sound:"இம்ப்ரூவ் யோர் இங்கிலிஷ்." },

{ id:"s501", en:"I can speak English.", ta_meaning:"நான் ஆங்கிலம் பேச முடியும்.", ta_sound:"ஐ கேன் ஸ்பீக் இங்கிலிஷ்." },
{ id:"s502", en:"I can read English.", ta_meaning:"நான் ஆங்கிலம் படிக்க முடியும்.", ta_sound:"ஐ கேன் ரீட் இங்கிலிஷ்." },
{ id:"s503", en:"I can write English.", ta_meaning:"நான் ஆங்கிலம் எழுத முடியும்.", ta_sound:"ஐ கேன் ரைட் இங்கிலிஷ்." },
{ id:"s504", en:"Speak slowly, please.", ta_meaning:"தயவு செய்து மெதுவாக பேசுங்கள்.", ta_sound:"ஸ்பீக் ஸ்லோலி ப்ளீஸ்." },
{ id:"s505", en:"Thank you very much.", ta_meaning:"மிக்க நன்றி.", ta_sound:"தேங்க் யூ வெரி மச்." },
