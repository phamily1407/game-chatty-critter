// ══ Chatty Critter — Main Game Logic v1.2 ══

// ── State ──
let state = {};
let decayInterval   = null;
let catchBallGame   = null;
let memoryMatchGame = null;
let dressUpController = null;

// ── Constants ──
const COLOUR_OPTIONS = [
  { label: 'Original', deg: 0,    swatch: null        },
  { label: 'Ocean',    deg: 180,  swatch: '#A8D4EC'   },
  { label: 'Forest',   deg: 120,  swatch: '#A8E8C0'   },
  { label: 'Mystic',   deg: 240,  swatch: '#C8A8E8'   },
  { label: 'Ember',    deg: -40,  swatch: '#F4C080'   },
  { label: 'Teal',     deg: 150,  swatch: '#80D8D0'   },
  { label: 'Blossom',  deg: 300,  swatch: '#F4A8D0'   },
  { label: 'Sunny',    deg: 60,   swatch: '#F0E080'   },
];
const HUE_ROTATIONS = COLOUR_OPTIONS.map(c => c.deg);

const SPECIES = [
  { id: 'cat',        label: 'Cat',        emoji: '🐱', trait: 'Clever & Mysterious' },
  { id: 'puppy',      label: 'Puppy',      emoji: '🐶', trait: 'Bouncy & Loyal'      },
  { id: 'dragon',     label: 'Dragon',     emoji: '🐉', trait: 'Brave & Dramatic'    },
  { id: 'bunny',      label: 'Bunny',      emoji: '🐰', trait: 'Shy but Sweet'       },
  { id: 'cloud-puff', label: 'Cloud Puff', emoji: '☁️', trait: 'Dreamy & Magical'    },
  { id: 'fox',        label: 'Fox',        emoji: '🦊', trait: 'Sly & Clever'        },
  { id: 'penguin',    label: 'Penguin',    emoji: '🐧', trait: 'Cool & Quirky'       },
  { id: 'panda',      label: 'Panda',      emoji: '🐼', trait: 'Chill & Cuddly'      },
  { id: 'rabbit',     label: 'Rabbit',     emoji: '🐇', trait: 'Quick & Curious'     },
  { id: 'kangaroo',   label: 'Kangaroo',   emoji: '🦘', trait: 'Bouncy & Bold'       },
  { id: 'parrot',     label: 'Parrot',     emoji: '🦜', trait: 'Chatty & Bright'     },
];

const PERSONALITIES = [
  { id: 'funny',  label: 'Funny',  emoji: '😄', desc: 'Makes jokes & puns'   },
  { id: 'brave',  label: 'Brave',  emoji: '⚔️', desc: 'Bold adventurer'      },
  { id: 'sleepy', label: 'Sleepy', emoji: '😴', desc: 'Cozy & dreamy'        },
  { id: 'grumpy', label: 'Grumpy', emoji: '😤', desc: 'Blunt but kind'       },
  { id: 'hyper',  label: 'Hyper',  emoji: '🌀', desc: 'Non-stop energy'      },
];

const FOOD_ITEMS = {
  apple:    { label: 'Apple',         emoji: '🍎', price: 0,  hunger: 20, happiness: 5,  energy: 5,  affection: 1  },
  fish:     { label: 'Fish',          emoji: '🐟', price: 0,  hunger: 30, happiness: 8,  energy: 8,  affection: 1  },
  cake:     { label: 'Cake',          emoji: '🍰', price: 15, hunger: 25, happiness: 15, energy: 5,  affection: 3  },
  sushi:    { label: 'Sushi',         emoji: '🍣', price: 20, hunger: 35, happiness: 10, energy: 10, affection: 2  },
  smoothie: { label: 'Smoothie',      emoji: '🥤', price: 25, hunger: 20, happiness: 10, energy: 25, affection: 2  },
  mystery:  { label: 'Mystery Snack', emoji: '🌮', price: 25, hunger: 25, happiness: 20, energy: 20, affection: 4  }, // M1 fix: price 25 (was 30), hunger 25 (was 20)
  donut:    { label: 'Rainbow Donut', emoji: '🍩', price: 35, hunger: 30, happiness: 25, energy: 10, affection: 5  }, // M6 new
  croissant:{ label: 'Magic Croissant',emoji: '🥐', price: 40, hunger: 28, happiness: 15, energy: 30, affection: 5 }, // M6 new
};

const XP_PER_LEVEL  = [0, 100, 200, 350, 500, 700, 1000, 1400, 2000];
const LEVEL_NAMES   = ['', 'Tiny Cub', 'Cozy Cub', 'Adventure Pal', 'Star Buddy',
                        'Super Friend', 'Bright Spirit', 'Legendary Floof', 'Cosmic Legend', 'Eternal Sparkle'];

// M2: rewards unlocked per level
const LEVEL_REWARDS = {
  3:  { coins: 30,  msg: '🍰 Cake is now in the Shop!'         },
  5:  { coins: 50,  msg: '🌙 New Starry background unlocked!'   },
  8:  { coins: 80,  msg: '🚀 Space background unlocked!'         },
  10: { coins: 100, msg: '⭐ Star Pin permanently unlocked!'     },
};

// M5: words the pet can remember from chat
const MEMORY_TRIGGERS = [
  'pizza','burger','sushi','cake','cookie','ice cream','chocolate','noodles',
  'school','homework','teacher','exam','class','study',
  'friend','sister','brother','mom','dad','family','pet',
  'rain','sunny','cold','hot','snow','windy','storm',
  'happy','sad','excited','scared','bored','tired','angry',
  'game','movie','book','music','dance','sing','draw','paint','sport','swim','run',
  'birthday','party','holiday','christmas','halloween','summer',
  'cat','dog','fish','bird','hamster','rabbit',
];

// ══ Init ══
document.addEventListener('DOMContentLoaded', () => {
  const saved = loadGame();
  if (saved && saved.pet) {
    state = saved;
    applyStatDecay();
    showGame();
    checkDailyStreak();
  } else {
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    showCreateScreen();
  }
  _updateSoundBtn();
});

// ══ Screen routing ══
function showCreateScreen() {
  hide('game-container');
  show('create-screen');
  goCreateStep(1);
}

function showGame() {
  hide('create-screen');
  show('game-container');
  navigate('home');
  updateUI();
  startDecay();
}

function navigate(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  el(screenId + '-screen').classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.nav-btn[data-screen="${screenId}"]`)?.classList.add('active');

  if (screenId === 'chat')    { updateChatHeader(); renderChatHistory(); }
  if (screenId === 'shop')    renderShop();
  if (screenId === 'profile') renderProfile();
}

// ══ Create Pet Wizard ══
const creation = { step: 1, species: null, personality: null, name: '', colorIndex: 0 };

function goCreateStep(step) {
  creation.step = step;
  document.querySelectorAll('.create-step').forEach(s => s.classList.remove('active'));
  el('create-step-' + step).classList.add('active');
  el('create-back').style.visibility = step === 1 ? 'hidden' : 'visible';

  const nextBtn = el('create-next');
  if (step === 5) {
    nextBtn.textContent = '🐾 Start Playing!';
    nextBtn.onclick = finishCreation;
  } else {
    nextBtn.textContent = 'Next →';
    nextBtn.onclick = () => goCreateStep(step + 1);
  }
  updateCreateNextBtn();
  if (step === 4) {
    const cp = el('color-preview-img');
    if (cp && creation.species) { cp.src = `assets/pets/${creation.species}.svg`; applyPetHue(cp, creation.colorIndex); }
    renderColorPicker();
  }
  if (step === 5) renderPetPreview();
}

function updateCreateNextBtn() {
  const btn = el('create-next');
  const disabled =
    (creation.step === 1 && !creation.species) ||
    (creation.step === 2 && !creation.personality) ||
    (creation.step === 3 && !creation.name.trim());
  btn.disabled = disabled;
}

function selectSpecies(id) {
  creation.species = id;
  document.querySelectorAll('.species-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`.species-card[data-id="${id}"]`)?.classList.add('selected');
  updateCreateNextBtn();
}

function selectPersonality(id) {
  creation.personality = id;
  document.querySelectorAll('.personality-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`.personality-card[data-id="${id}"]`)?.classList.add('selected');
  updateCreateNextBtn();
}

function renderColorPicker() {
  const wrap    = el('color-picker');
  const preview = el('color-preview-img');
  wrap.innerHTML = '';
  COLOUR_OPTIONS.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'color-dot' + (i === creation.colorIndex ? ' selected' : '');
    btn.title     = opt.label;
    btn.style.background = opt.swatch || 'linear-gradient(135deg,#F9D0DC,#FFE0C8,#C8F0E0)';
    if (!opt.swatch) btn.style.border = '3px solid #3D3550';
    btn.onclick = () => {
      creation.colorIndex = i;
      document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
      btn.classList.add('selected');
      if (preview) applyPetHue(preview, i);
      const lbl = el('color-label');
      if (lbl) lbl.textContent = opt.label;
    };
    wrap.appendChild(btn);
  });
  const lbl = el('color-label');
  if (lbl) lbl.textContent = COLOUR_OPTIONS[creation.colorIndex].label;
}

function renderPetPreview() {
  const s = SPECIES.find(s => s.id === creation.species);
  const p = PERSONALITIES.find(p => p.id === creation.personality);
  el('preview-pet-img').src = `assets/pets/${creation.species}.svg`;
  applyPetHue(el('preview-pet-img'), creation.colorIndex);
  el('preview-name').textContent    = creation.name.trim() || 'Your Pet';
  el('preview-species').textContent = `${s?.emoji || ''} ${s?.label || ''} · ${p?.emoji || ''} ${p?.label || ''} personality`;
}

function finishCreation() {
  state.pet = {
    name: creation.name.trim(), species: creation.species,
    personality: creation.personality, colorIndex: creation.colorIndex,
    createdAt: Date.now(),
  };
  state.stats      = { happiness: 80, hunger: 75, energy: 90, hygiene: 85, affection: 70 };
  state.coins      = 50;
  state.xp         = 0;
  state.level      = 1;
  state.streak     = { count: 1, lastLogin: todayKey() };
  state.chatHistory = [];
  state.outfit      = { hat: null, accessory: null, bgId: 'none' };
  state.inventory   = { apple: 3, fish: 1, cake: 0, sushi: 0, smoothie: 0, mystery: 0, donut: 0, croissant: 0 };
  state.petMemories = [];
  state.dailyDeal   = { date: null, itemId: null, salePrice: 0, purchased: 0 };
  state.friendsSince = todayKey();
  state.bondDays    = 0;
  state.lastHighAffection = null;
  state.lastUpdate  = Date.now();
  saveGame(state);
  showGame();
}

// ══ Stats & Decay ══
function applyStatDecay() {
  if (!state.lastUpdate) return;
  const elapsed = Math.min((Date.now() - state.lastUpdate) / 60000, 180);
  const s = state.stats;
  s.hunger    = Math.max(10, s.hunger    - elapsed * 1.5);
  s.happiness = Math.max(10, s.happiness - elapsed * 0.8);
  s.energy    = Math.max(10, s.energy    - elapsed * 0.6);
  s.hygiene   = Math.max(10, s.hygiene   - elapsed * 0.4);
  s.affection = Math.max(10, s.affection - elapsed * 1.0);
}

function startDecay() {
  clearInterval(decayInterval);
  decayInterval = setInterval(() => {
    const s = state.stats;
    s.hunger    = Math.max(0, s.hunger    - 1.5);
    s.happiness = Math.max(0, s.happiness - 0.8);
    s.energy    = Math.max(0, s.energy    - 0.6);
    s.hygiene   = Math.max(0, s.hygiene   - 0.4);
    s.affection = Math.max(0, s.affection - 1.0);

    updateStatBars();
    updateNavDot();        // M1
    updateMoodExpression(); // M3
    _checkUnpromptedMessage();
    saveGame(state);
  }, 60000);
}

// M1: unprompted pet message when stat hits critical
function _checkUnpromptedMessage() {
  const s = state.stats;
  if (s.hunger < 15 && Math.random() < 0.3) {
    _petNotification(`Psst… I'm really hungry… 🍎`);
  } else if (s.affection < 15 && Math.random() < 0.3) {
    _petNotification(`I miss you… can we chat? 💖`);
  } else if (s.energy < 15 && Math.random() < 0.2) {
    _petNotification(`So tired… need rest… 💤`);
  }
}

function _petNotification(msg) {
  showToast(`💬 ${state.pet?.name}: "${msg}"`);
  if (typeof playWarning === 'function') playWarning();
}

function getMoodLabel() {
  const s = state.stats;
  if (s.hunger    < 20) return { icon: '😢', text: 'Very hungry...' };
  if (s.energy    < 20) return { icon: '😴', text: 'So tired...' };
  if (s.happiness < 20) return { icon: '😔', text: 'Feeling sad' };
  if (s.hygiene   < 20) return { icon: '🛁', text: 'Needs a bath!' };
  if (s.affection < 20) return { icon: '🥺', text: 'Needs some love' };
  const avg = (s.happiness + s.hunger + s.energy + s.affection) / 4;
  if (avg > 80) return { icon: '✨', text: 'Feeling amazing!' };
  if (avg > 60) return { icon: '😊', text: 'Doing great!' };
  if (avg > 40) return { icon: '🙂', text: 'Feeling okay' };
  return { icon: '😕', text: 'Could use some love' };
}

// ══ UI Update ══
function updateUI() {
  updateHomeScreen();
  updateCoinDisplay();
  updateNavDot();
}

function updateHomeScreen() {
  if (!state.pet) return;
  const petImg = el('home-pet-img');
  if (petImg) {
    petImg.src = `assets/pets/${state.pet.species}.svg`;
    applyPetHue(petImg, state.pet.colorIndex);
    applyOutfitToHome();
  }
  const nameEl = el('home-pet-name');
  if (nameEl) nameEl.textContent = state.pet.name;

  const mood = getMoodLabel();
  const moodEl = el('home-mood');
  if (moodEl) moodEl.innerHTML = `${mood.icon} <span>${mood.text}</span>`;

  const lvlEl = el('home-level');
  if (lvlEl) lvlEl.textContent = `Lv.${state.level} ${LEVEL_NAMES[state.level] || ''}`;

  updateStatBars();
  updateMoodExpression(); // M3
}

// M1: stat bars change colour green → yellow → red
function updateStatBars() {
  const s = state.stats;
  ['happiness','hunger','energy','hygiene','affection'].forEach(key => {
    const fill = document.querySelector(`.stat-fill[data-stat="${key}"]`);
    if (!fill) return;
    const val = Math.round(s[key]);
    fill.style.width = val + '%';
    fill.dataset.level = val <= 30 ? 'low' : val <= 60 ? 'mid' : 'high';
  });
}

function updateCoinDisplay() {
  document.querySelectorAll('.coin-count').forEach(el => { el.textContent = state.coins; });
}

// M1: notification dot on Home nav
function updateNavDot() {
  const s    = state.stats;
  const urgent = Object.values(s).some(v => v < 25);
  const homeBtn = document.querySelector('.nav-btn[data-screen="home"]');
  if (!homeBtn) return;
  let dot = homeBtn.querySelector('.nav-dot');
  if (!dot) { dot = document.createElement('span'); dot.className = 'nav-dot'; homeBtn.appendChild(dot); }
  dot.style.display = urgent ? 'block' : 'none';
}

// M3: mood expression emoji overlay above pet
function updateMoodExpression() {
  const expr = el('mood-expression');
  if (!expr) return;
  const s = state.stats;
  const allHigh = Object.values(s).every(v => v > 80);

  if (allHigh) {
    expr.textContent = '🌈'; expr.className = 'mood-expression mood-amazing';
  } else if (s.hunger < 20) {
    expr.textContent = '🍽️'; expr.className = 'mood-expression mood-hungry';
  } else if (s.energy < 20) {
    expr.textContent = '💤'; expr.className = 'mood-expression mood-tired';
  } else if (s.happiness < 20) {
    expr.textContent = '🌧️'; expr.className = 'mood-expression mood-sad';
  } else if (s.affection < 20) {
    expr.textContent = '🥺'; expr.className = 'mood-expression mood-lonely';
  } else {
    expr.textContent = ''; expr.className = 'mood-expression';
  }
}

function applyOutfitToHome() {
  const hatEl    = el('home-hat');
  const accEl    = el('home-accessory');
  const wrapper  = document.querySelector('.home-pet-wrapper');
  if (hatEl) {
    const item = DRESS_UP_ITEMS.hat.find(i => i.id === state.outfit.hat);
    if (item) {
      Object.assign(hatEl.style, { display:'block', top:item.top, left:item.left, fontSize:item.size });
      hatEl.textContent = item.emoji;
    } else { hatEl.style.display = 'none'; }
  }
  if (accEl) {
    const item = DRESS_UP_ITEMS.accessory.find(i => i.id === state.outfit.accessory);
    if (item) {
      Object.assign(accEl.style, { display:'block', top:item.top, left:item.left, fontSize:item.size });
      accEl.textContent = item.emoji;
    } else { accEl.style.display = 'none'; }
  }
  if (wrapper && state.outfit.bgId) {
    const bgItem = DRESS_UP_ITEMS.bg.find(i => i.id === state.outfit.bgId);
    wrapper.style.background = bgItem ? bgItem.gradient : '';
  }
}

// ══ Feeding ══
function openFeedModal() {
  const grid = el('feed-grid');
  grid.innerHTML = '';
  Object.entries(FOOD_ITEMS).forEach(([id, food]) => {
    const count  = state.inventory[id] || 0;
    const canBuy = food.price > 0 && state.coins >= food.price;
    if (!count && !canBuy) return;
    const btn = document.createElement('button');
    btn.className = 'food-btn';
    btn.innerHTML = `
      <span class="food-emoji">${food.emoji}</span>
      <span class="food-label">${food.label}</span>
      <span class="food-count">${count > 0 ? `×${count}` : `${food.price}🪙`}</span>`;
    btn.onclick = () => feedPet(id);
    grid.appendChild(btn);
  });
  el('feed-modal').classList.add('open');
}

function feedPet(foodId) {
  const food  = FOOD_ITEMS[foodId];
  if (!food) return;
  const count = state.inventory[foodId] || 0;
  if      (count > 0)                               state.inventory[foodId]--;
  else if (food.price > 0 && state.coins >= food.price) state.coins -= food.price;
  else return;

  const s = state.stats;
  s.hunger    = Math.min(100, s.hunger    + food.hunger);
  s.happiness = Math.min(100, s.happiness + food.happiness);
  s.energy    = Math.min(100, s.energy    + food.energy);
  s.affection = Math.min(100, s.affection + (food.affection || 2)); // M1+M2 fix

  awardXP(5);
  closeModal('feed-modal');
  triggerFeedAnimation(food.emoji);
  if (typeof playFeed === 'function') playFeed();
  updateUI();
  showToast(`${state.pet.name} loved the ${food.label}! ${food.emoji}`);
  saveGame(state);
}

// ══ Bath ══
function bathPet() {
  state.stats.hygiene   = Math.min(100, state.stats.hygiene   + 40);
  state.stats.happiness = Math.min(100, state.stats.happiness + 5);
  state.stats.affection = Math.min(100, state.stats.affection + 3); // M2
  awardXP(3);
  triggerBathAnimation();
  if (typeof playBath === 'function') playBath();
  updateUI();
  showToast(`${state.pet.name} had a nice bath! 🛁✨`);
  saveGame(state);
}

// ══ Feed & Bath animations ══
function triggerFeedAnimation(emoji) {
  const wrapper = document.querySelector('.home-pet-wrapper');
  const petImg  = el('home-pet-img');
  if (!wrapper) return;
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const f = document.createElement('span');
      f.className = 'anim-float'; f.textContent = emoji;
      f.style.left = (25 + Math.random() * 50) + '%';
      f.style.bottom = '10%';
      wrapper.appendChild(f);
      setTimeout(() => f.remove(), 1100);
    }, i * 180);
  }
  if (petImg) { petImg.classList.add('pet-happy-anim'); setTimeout(() => petImg.classList.remove('pet-happy-anim'), 700); }
  document.querySelectorAll('.stat-fill').forEach(f => { f.classList.add('stat-pulse'); setTimeout(() => f.classList.remove('stat-pulse'), 600); });
}

function triggerBathAnimation() {
  const wrapper = document.querySelector('.home-pet-wrapper');
  const petImg  = el('home-pet-img');
  if (!wrapper) return;
  ['💧','🫧','✨','💦'].forEach((b, i) => {
    setTimeout(() => {
      const s = document.createElement('span');
      s.className = 'anim-bubble'; s.textContent = b;
      s.style.left   = (10 + Math.random() * 80) + '%';
      s.style.bottom = (5  + Math.random() * 20) + '%';
      wrapper.appendChild(s);
      setTimeout(() => s.remove(), 1400);
    }, i * 130);
  });
  if (petImg) { petImg.classList.add('pet-spin-anim'); setTimeout(() => petImg.classList.remove('pet-spin-anim'), 900); }
}

// ══ Chat ══
function updateChatHeader() {
  if (!state.pet) return;
  const img = el('chat-header-img');
  if (img) { img.src = `assets/pets/${state.pet.species}.svg`; applyPetHue(img, state.pet.colorIndex); }
  const n = el('chat-header-name'); if (n) n.textContent = state.pet.name;
  const m = el('chat-header-mood'); if (m) { const mood = getMoodLabel(); m.textContent = mood.icon + ' ' + mood.text; }
  updateMemoryBadge();
}

function renderChatHistory() {
  const log = el('chat-log');
  log.innerHTML = '';
  if (state.chatHistory.length === 0) {
    const intro = document.createElement('div');
    intro.className = 'chat-intro';
    intro.innerHTML = `<span class="chat-bubble pet-bubble">Hi! I'm ${state.pet.name}! Say something to me! 👋</span>`;
    log.appendChild(intro);
    return;
  }
  state.chatHistory.forEach(msg => addChatBubble(msg.role, msg.text, false));
  log.scrollTop = log.scrollHeight;
}

async function handleChatSend() {
  const input = el('chat-input');
  const text  = input.value.trim();
  if (!text) return;
  input.value = '';

  state.chatHistory.push({ role: 'player', text });
  addChatBubble('player', text);
  state.stats.affection = Math.min(100, state.stats.affection + 3);
  state.stats.happiness = Math.min(100, state.stats.happiness + 2);

  // M5: extract memory topic
  const memoryTopic = extractMemory(text);
  if (memoryTopic) addPetMemory(memoryTopic);

  const typingId = 'typing-' + Date.now();
  addTypingIndicator(typingId);

  let response;
  try { response = await getAIResponse(text, state.chatHistory, state.pet, state.stats); }
  catch(e) { response = null; }

  // M5: 25% chance to recall a memory in built-in responses
  if (!response && Math.random() < 0.25) {
    const mem = getRandomMemory();
    if (mem) {
      const recalls = [
        `Oh, you mentioned ${mem.topic} before! Tell me more about it! 💭`,
        `Hey, remember when you talked about ${mem.topic}? I've been thinking about that! ✨`,
        `I still remember you said something about ${mem.topic}! 🐾`,
      ];
      response = recalls[Math.floor(Math.random() * recalls.length)];
    }
  }

  if (!response) {
    await new Promise(r => setTimeout(r, 500 + Math.random() * 400));
    response = getChatResponse(text, state.pet, state.stats);
  }

  removeTypingIndicator(typingId);
  state.chatHistory.push({ role: 'pet', text: response });
  addChatBubble('pet', response);
  if (state.chatHistory.length > 40) state.chatHistory = state.chatHistory.slice(-40);

  if (typeof playChat === 'function') playChat();
  awardXP(2);
  updateStatBars();
  updateMemoryBadge();
  saveGame(state);
}

function addChatBubble(role, text, scroll = true) {
  const log    = el('chat-log');
  const row    = document.createElement('div');
  row.className = 'chat-row ' + (role === 'pet' ? 'pet-row' : 'player-row');
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble ' + (role === 'pet' ? 'pet-bubble' : 'player-bubble');
  bubble.textContent = text;
  row.appendChild(bubble);
  log.appendChild(row);
  if (scroll) log.scrollTop = log.scrollHeight;
}

function addTypingIndicator(id) {
  const log = el('chat-log');
  const row = document.createElement('div');
  row.className = 'chat-row pet-row'; row.id = id;
  row.innerHTML = '<div class="chat-bubble pet-bubble typing-bubble"><span></span><span></span><span></span></div>';
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
}
function removeTypingIndicator(id) { document.getElementById(id)?.remove(); }

// M5: Pet memory
function extractMemory(msg) {
  const lower = msg.toLowerCase();
  return MEMORY_TRIGGERS.find(t => lower.includes(t)) || null;
}
function addPetMemory(topic) {
  if (!state.petMemories) state.petMemories = [];
  const ex = state.petMemories.find(m => m.topic === topic);
  if (ex) { ex.date = Date.now(); return; }
  state.petMemories.unshift({ topic, date: Date.now() });
  if (state.petMemories.length > 5) state.petMemories.pop();
}
function getRandomMemory() {
  if (!state.petMemories?.length) return null;
  const week   = 7 * 24 * 60 * 60 * 1000;
  const recent = state.petMemories.filter(m => Date.now() - m.date < week);
  return recent.length ? recent[Math.floor(Math.random() * recent.length)] : null;
}
function updateMemoryBadge() {
  const badge = el('memory-badge');
  if (badge) badge.style.display = (state.petMemories?.length > 0) ? 'block' : 'none';
}

// ══ Mini-Games ══
function openCatchBall() {
  el('catchball-overlay').classList.add('open');
  const canvas = el('catch-canvas');
  canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
  catchBallGame = new CatchBallGame();
  const petColors = ['#F4A7B9','#A8D4EC','#93D6BC','#C8A8E8','#A8D8EC','#F09020','#1C1830','#F0EEE8','#EDE8E0','#D4A860','#28B038'];
  const si = SPECIES.findIndex(s => s.id === state.pet.species);
  catchBallGame.init(canvas, petColors[si] || '#F4A7B9');
  catchBallGame.onEnd = (score, coins) => {
    state.coins += coins;
    state.stats.happiness = Math.min(100, state.stats.happiness + Math.min(score * 2, 30));
    state.stats.energy    = Math.max(0,   state.stats.energy    - 10);
    awardXP(score + 5);
    updateUI(); saveGame(state);
    el('gameover-score').textContent = score;
    el('gameover-coins').textContent = coins;
    el('gameover-overlay').classList.add('open');
  };
  catchBallGame.start();
}

function restartCatchBall() {
  el('gameover-overlay').classList.remove('open');
  if (catchBallGame) {
    catchBallGame.score = 0; catchBallGame.lives = 3; catchBallGame.combo = 0;
    catchBallGame.level = 1; catchBallGame.balls = []; catchBallGame.speed = 1;
    catchBallGame._frameCount = 0; catchBallGame._lastPowerSpawn = 0;
    catchBallGame._spawnBall(); catchBallGame.running = true; catchBallGame._loop();
  }
}

function closeCatchBall() {
  if (catchBallGame) { catchBallGame.stop(); catchBallGame = null; }
  el('catchball-overlay').classList.remove('open');
  el('gameover-overlay').classList.remove('open');
}

function openDressUp() {
  el('dressup-overlay').classList.add('open');
  const petImg = el('dressup-pet-img');
  petImg.src = `assets/pets/${state.pet.species}.svg`;
  applyPetHue(petImg, state.pet.colorIndex);
  dressUpController = initDressUp('dressup-controls', petImg, { ...state.outfit }, (newOutfit) => {
    state.outfit = { ...newOutfit };
    state.stats.affection = Math.min(100, state.stats.affection + 4); // M2
    updateHomeScreen();
    saveGame(state);
    showToast('Outfit saved! Looking fabulous! ✨');
  });
}
function closeDressUp() { el('dressup-overlay').classList.remove('open'); dressUpController = null; }

// M4: Memory Match
let _mmDifficulty = 'normal';
function openMemoryMatch(difficulty = 'normal') {
  _mmDifficulty = difficulty;
  el('memorymatch-overlay').classList.add('open');
  memoryMatchGame = new MemoryMatchGame();
  memoryMatchGame.init('mm-board', difficulty);
  memoryMatchGame.onEnd = (score, coins, xp, moves, elapsed) => {
    state.coins += coins;
    state.stats.happiness = Math.min(100, state.stats.happiness + 15);
    awardXP(xp);
    updateUI(); saveGame(state);
    el('mm-result-score').textContent  = score;
    el('mm-result-coins').textContent  = coins;
    el('mm-result-moves').textContent  = moves;
    el('mm-result-time').textContent   = elapsed + 's';
    el('mm-result-overlay').classList.add('open');
    if (typeof playLevelUp === 'function') playLevelUp();
  };
  memoryMatchGame.start();
}
function closeMemoryMatch() {
  el('memorymatch-overlay').classList.remove('open');
  el('mm-result-overlay').classList.remove('open');
  memoryMatchGame = null;
}
function restartMemoryMatch() {
  el('mm-result-overlay').classList.remove('open');
  if (memoryMatchGame) memoryMatchGame.start();
}
function changeMmDifficulty(d) {
  el('mm-result-overlay').classList.remove('open');
  openMemoryMatch(d);
}

// ══ Shop ══
const SHOP_ITEMS = {
  cake:     { ...FOOD_ITEMS.cake,      id: 'cake'      },
  sushi:    { ...FOOD_ITEMS.sushi,     id: 'sushi'     },
  smoothie: { ...FOOD_ITEMS.smoothie,  id: 'smoothie'  },
  mystery:  { ...FOOD_ITEMS.mystery,   id: 'mystery'   },
  donut:    { ...FOOD_ITEMS.donut,     id: 'donut'     }, // M6
  croissant:{ ...FOOD_ITEMS.croissant, id: 'croissant' }, // M6
};

// M6: daily deal
function _computeDailyDeal() {
  const today = todayKey();
  if (state.dailyDeal?.date === today) return state.dailyDeal;
  const items = Object.keys(SHOP_ITEMS).filter(id => SHOP_ITEMS[id].price > 0);
  const seed  = today.replace(/-/g,'').split('').reduce((a,b) => a + +b, 0);
  const itemId = items[seed % items.length];
  state.dailyDeal = {
    date: today, itemId,
    salePrice:  Math.round(FOOD_ITEMS[itemId].price * 0.6),
    purchased:  0,
  };
  saveGame(state);
  return state.dailyDeal;
}

function renderShop() {
  const grid = el('shop-grid');
  grid.innerHTML = '';

  // M6: daily deal banner
  const deal = _computeDailyDeal();
  if (deal.itemId && deal.purchased < 3) {
    const dealItem = FOOD_ITEMS[deal.itemId];
    const banner   = document.createElement('div');
    banner.className = 'daily-deal-banner';
    banner.innerHTML = `
      <div class="deal-label">⚡ Daily Deal — 40% OFF!</div>
      <div class="deal-content">
        <span class="deal-emoji">${dealItem.emoji}</span>
        <span class="deal-name">${dealItem.label}</span>
        <span class="deal-price"><s>${dealItem.price}</s> → <strong>${deal.salePrice} 🪙</strong></span>
        <span class="deal-stock">${3 - deal.purchased} left today</span>
      </div>
      <button class="shop-buy ${state.coins >= deal.salePrice ? '' : 'disabled'}"
              onclick="buyDailyDeal()">Buy Deal</button>`;
    grid.appendChild(banner);
  }

  // Regular items
  Object.entries(SHOP_ITEMS).forEach(([id, item]) => {
    const card = document.createElement('div');
    card.className = 'shop-card';
    const canAfford = state.coins >= item.price;
    card.innerHTML = `
      <div class="shop-emoji">${item.emoji}</div>
      <div class="shop-name">${item.label}</div>
      <div class="shop-desc">+${item.hunger} 🍎 +${item.happiness} 😊 +${item.energy} ⚡ +${item.affection} 💖</div>
      <button class="shop-buy ${canAfford ? '' : 'disabled'}" onclick="buyItem('${id}')">
        ${item.price} 🪙
      </button>`;
    grid.appendChild(card);
  });
}

function buyItem(id) {
  const item = SHOP_ITEMS[id];
  if (!item || state.coins < item.price) { showToast('Not enough coins! 🪙'); return; }
  state.coins -= item.price;
  state.inventory[id] = (state.inventory[id] || 0) + 1;
  if (typeof playBuy === 'function') playBuy();
  updateCoinDisplay(); renderShop();
  showToast(`Bought ${item.label}! ${item.emoji}`);
  saveGame(state);
}

function buyDailyDeal() {
  const deal = state.dailyDeal;
  if (!deal?.itemId || deal.purchased >= 3) return;
  if (state.coins < deal.salePrice) { showToast('Not enough coins! 🪙'); return; }
  state.coins -= deal.salePrice;
  state.inventory[deal.itemId] = (state.inventory[deal.itemId] || 0) + 1;
  deal.purchased++;
  if (typeof playBuy === 'function') playBuy();
  updateCoinDisplay(); renderShop();
  showToast(`Daily deal bought! ${FOOD_ITEMS[deal.itemId].emoji} 🎉`);
  saveGame(state);
}

// ══ Profile ══
function renderProfile() {
  if (!state.pet) return;
  el('profile-name').textContent = state.pet.name;
  const s = SPECIES.find(s => s.id === state.pet.species);
  const p = PERSONALITIES.find(p => p.id === state.pet.personality);
  el('profile-species').textContent = `${s?.emoji} ${s?.label} · ${p?.emoji} ${p?.label}`;
  el('profile-level').textContent   = `Level ${state.level} — ${LEVEL_NAMES[state.level] || 'Champion'}`;

  const xpNeeded = XP_PER_LEVEL[state.level] || 9999;
  el('profile-xp-fill').style.width  = Math.min(100, Math.round(state.xp / xpNeeded * 100)) + '%';
  el('profile-xp-label').textContent = `${state.xp} / ${xpNeeded} XP`;
  el('profile-streak').textContent   = `🔥 ${state.streak.count} day streak`;
  el('profile-coins').textContent    = `🪙 ${state.coins} coins`;

  // M2: bond days
  const bondEl = el('profile-bond');
  if (bondEl && state.friendsSince) {
    const days = Math.floor((Date.now() - new Date(state.friendsSince).getTime()) / 86400000);
    bondEl.textContent = `💕 Friends for ${days} day${days !== 1 ? 's' : ''}`;
  }

  // M5: memories badge
  const memEl = el('profile-memories');
  if (memEl) memEl.textContent = state.petMemories?.length
    ? `💭 ${state.petMemories.length} memor${state.petMemories.length > 1 ? 'ies' : 'y'} shared`
    : '💭 No memories yet — keep chatting!';

  const petImg = el('profile-pet-img');
  if (petImg) { petImg.src = `assets/pets/${state.pet.species}.svg`; applyPetHue(petImg, state.pet.colorIndex); }

  const keyInput = el('api-key-input');
  if (keyInput) keyInput.value = localStorage.getItem('chatty_ai_key') || '';
  const provSel = el('ai-provider-select');
  if (provSel) provSel.value = localStorage.getItem('chatty_ai_provider') || 'groq';
  onProviderChange();
  updateApiStatus();
}

function confirmReset() {
  if (confirm(`Start over? This will erase ${state.pet.name} and all progress.`)) {
    clearGame(); location.reload();
  }
}

// ══ Progression ══
function awardXP(amount) {
  state.xp += amount;
  const needed = XP_PER_LEVEL[state.level] || 9999;
  if (state.xp >= needed && state.level < LEVEL_NAMES.length - 1) {
    state.level++;
    state.xp = 0;
    showLevelUp(state.level); // M2: ceremony
    updateUI();
  }
}

// M2: Level-up ceremony
function showLevelUp(level) {
  el('levelup-num').textContent  = `Level ${level}`;
  el('levelup-name-txt').textContent = LEVEL_NAMES[level] || 'Champion!';
  const reward = LEVEL_REWARDS[level];
  const rewardEl = el('levelup-reward');
  if (reward) {
    state.coins += reward.coins;
    rewardEl.textContent = `+${reward.coins} 🪙  •  ${reward.msg}`;
  } else {
    state.coins += 20;
    rewardEl.textContent = '+20 🪙 bonus coins!';
  }
  el('levelup-overlay').classList.add('open');
  runConfetti();
  if (typeof playLevelUp === 'function') playLevelUp();
  updateCoinDisplay();
  saveGame(state);
}

function closeLevelUp() { el('levelup-overlay').classList.remove('open'); }

function runConfetti() {
  const canvas = el('confetti-canvas');
  if (!canvas) return;
  canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
  const ctx    = canvas.getContext('2d');
  const colors = ['#F4A7B9','#C8A8E8','#93D6BC','#FFD700','#A8D4EC','#F09020','#80E8C0'];
  const parts  = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width, y: -20,
    vx: (Math.random() - 0.5) * 5, vy: 2 + Math.random() * 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 6 + Math.random() * 8, rot: Math.random() * 360, vrot: (Math.random() - 0.5) * 10,
    rect: Math.random() > 0.5,
  }));
  let frame = 0;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.rot += p.vrot;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      if (p.rect) ctx.fillRect(-p.size/2, -p.size/4, p.size, p.size/2);
      else { ctx.beginPath(); ctx.arc(0, 0, p.size/2, 0, Math.PI*2); ctx.fill(); }
      ctx.restore();
    });
    if (++frame < 160) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  draw();
}

// ══ Daily Streak ══
function todayKey() { return new Date().toISOString().slice(0, 10); }

function checkDailyStreak() {
  const today = todayKey();
  if (!state.streak) state.streak = { count: 0, lastLogin: null };
  if (state.streak.lastLogin === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = yesterday.toISOString().slice(0, 10);
  state.streak.count = state.streak.lastLogin === yKey ? state.streak.count + 1 : 1;
  state.streak.lastLogin = today;

  const bonus = Math.min(state.streak.count * 5, 50);
  state.coins += bonus;
  saveGame(state);
  setTimeout(() => {
    showToast(`🔥 Day ${state.streak.count} streak! +${bonus} coins!`);
    if (typeof playStreak === 'function') playStreak();
    updateCoinDisplay();
  }, 1200);
}

// ══ AI provider settings ══
function onProviderChange() {
  const provider = el('ai-provider-select')?.value || 'groq';
  const info = (typeof AI_PROVIDERS !== 'undefined' && AI_PROVIDERS[provider]) || {};
  const hintEl = el('api-provider-hint'); if (hintEl) hintEl.textContent = info.hint || '';
  const input  = el('api-key-input'); if (input) input.placeholder = info.placeholder || 'Paste your API key…';
}

function saveApiKey() {
  const key      = el('api-key-input')?.value?.trim();
  const provider = el('ai-provider-select')?.value || 'groq';
  if (!key) { showToast('Please paste your API key first!'); return; }
  localStorage.setItem('chatty_ai_key', key);
  localStorage.setItem('chatty_ai_provider', provider);
  updateApiStatus();
  const names = { groq: 'Groq', gemini: 'Gemini Flash', abacus: 'Abacus.ai' };
  showToast(`${names[provider] || 'AI'} connected! 🤖✨`);
}

function clearApiKey() {
  localStorage.removeItem('chatty_ai_key'); localStorage.removeItem('chatty_ai_provider');
  if (el('api-key-input'))      el('api-key-input').value = '';
  if (el('ai-provider-select')) el('ai-provider-select').value = 'groq';
  onProviderChange(); updateApiStatus();
  showToast('API key removed.');
}

function updateApiStatus() {
  const statusEl = el('api-status'); if (!statusEl) return;
  const hasKey   = !!localStorage.getItem('chatty_ai_key');
  const provider = localStorage.getItem('chatty_ai_provider') || 'groq';
  const names    = { groq: 'Groq (Llama 3)', gemini: 'Gemini Flash', abacus: 'Abacus.ai' };
  statusEl.textContent = hasKey
    ? `🟢 Connected via ${names[provider] || provider}`
    : '⚪ Not connected — using built-in responses';
  statusEl.style.color = hasKey ? '#5CB89A' : '#BBAACC';
}

// ══ Helpers ══
function el(id)    { return document.getElementById(id); }
function show(id)  { el(id).style.display = ''; }
function hide(id)  { el(id).style.display = 'none'; }

function applyPetHue(imgEl, colorIndex) {
  const deg = HUE_ROTATIONS[colorIndex || 0];
  imgEl.style.filter = deg === 0 ? 'none' : `hue-rotate(${deg}deg)`;
}

function closeModal(id) { el(id).classList.remove('open'); }

function showToast(message) {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = message;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2800);
}
