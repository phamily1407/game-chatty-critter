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

// B4 fix: XP_PER_LEVEL[9] was undefined — Level 10 unreachable
const XP_PER_LEVEL  = [0, 100, 200, 350, 500, 700, 1000, 1400, 2000, 2800];
const LEVEL_NAMES   = ['', 'Tiny Cub', 'Cozy Cub', 'Adventure Pal', 'Star Buddy',
                        'Super Friend', 'Bright Spirit', 'Legendary Floof', 'Cosmic Legend',
                        'Eternal Sparkle', 'Mythic Guardian'];

// M2: rewards unlocked per level
const LEVEL_REWARDS = {
  3:  { coins: 30,  msg: '🍰 Cake is now in the Shop!'         },
  5:  { coins: 50,  msg: '🌙 New Starry background unlocked!'   },
  8:  { coins: 80,  msg: '🚀 Space background unlocked!'         },
  10: { coins: 100, msg: '⭐ Star Pin permanently unlocked!'     },
};

// M5: words the pet can remember from chat
// M3: expanded with plurals, verb forms, common variants (+40 terms)
const MEMORY_TRIGGERS = [
  // food
  'pizza','burger','burgers','sushi','cake','cakes','cookie','cookies','ice cream',
  'chocolate','noodles','pasta','tacos','taco','sandwich','sandwiches','ramen',
  // school/study
  'school','homework','teacher','exam','exams','class','study','studying','test','tests','project',
  // people
  'friend','friends','sister','brother','mom','dad','family','grandma','grandpa','cousin','pet',
  // weather
  'rain','raining','rainy','sunny','sunshine','cold','hot','snow','snowing','snowy','windy','storm','stormy',
  // feelings
  'happy','sad','excited','scared','bored','tired','angry','nervous','proud','lonely','silly',
  // hobbies
  'game','gaming','movie','movies','book','books','music','dance','dancing','sing','singing',
  'draw','drawing','paint','painting','sport','sports','swim','swimming','run','running',
  'coding','reading','writing','hiking','camping','cooking','baking',
  // events
  'birthday','party','holiday','christmas','halloween','summer','vacation','weekend',
  // animals
  'cat','cats','dog','dogs','fish','bird','birds','hamster','rabbit','rabbits','turtle',
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
  _initGlobalButtonJuice(); // wire UI animations + sounds to every button
});

// ══ Global UI Juice ══
// Adds bounce animation + click sound to every button press automatically
function _initGlobalButtonJuice() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn || btn.dataset.noSound === 'true') return;

    // Bounce animation
    btn.classList.remove('btn-pressed');
    void btn.offsetWidth; // force reflow to restart animation
    btn.classList.add('btn-pressed');
    setTimeout(() => btn.classList.remove('btn-pressed'), 280);

    // Skip click sound for buttons that play their own sound
    const skipSoundSelectors = ['.nav-btn', '#sound-btn', '.hug-btn', '#chat-send',
                                 '.food-btn', '.shop-buy', '.play-again-btn'];
    const hasOwnSound = skipSoundSelectors.some(sel => btn.matches(sel) || btn.closest(sel));
    if (!hasOwnSound && typeof playClick === 'function') playClick();
  });

  // Species card wobble on select
  document.addEventListener('click', e => {
    const card = e.target.closest('.species-card');
    if (!card) return;
    card.classList.remove('selected');
    void card.offsetWidth;
  });
}

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
  applyTimeOfDay();          // M2
  checkWeeklyLetter();       // M5
  // Refresh time of day every 10 minutes
  setInterval(applyTimeOfDay, 600000);
}

function navigate(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  el(screenId + '-screen').classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.nav-btn[data-screen="${screenId}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  if (typeof playNavTap === 'function') playNavTap();

  if (screenId === 'chat')    { updateChatHeader(); renderChatHistory(); }
  if (screenId === 'shop')    renderShop();
  if (screenId === 'profile') renderProfile();
  if (screenId === 'home')    { updateNavDot(); updateMoodExpression(); applyTimeOfDay(); }
  if (screenId === 'games')   renderChallenges();
  if (screenId === 'profile') setTimeout(renderAchievements, 50);
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
  state.outfit      = { hat: null, accessory: null, wings: null, feet: null, wrap: null, bgId: 'none' };
  state.inventory   = { apple: 3, fish: 1, cake: 0, sushi: 0, smoothie: 0, mystery: 0, donut: 0, croissant: 0 };
  state.petMemories  = [];
  state.dailyDeal    = { date: null, itemId: null, salePrice: 0, purchased: 0 };
  state.dailyChallenges = { date: null, challenges: [] };
  state.friendsSince = Date.now();
  state.bondDays     = 0;
  state.lastHighAffection = null;
  state.lastUpdate   = Date.now();
  // M1 fix B1: always initialize achievements + lifetimeStats for new pets
  state.achievements  = {};
  state.lifetimeStats = { chatCount:0, catchCount:0, mmCount:0, shopCount:0, hugCount:0, totalCoinsEarned:0, outfitItemCount:0, trickCount:0, bubbleCount:0 };
  state.lastLetter    = 0; // M5: weekly letter timestamp
  saveGame(state);
  showGame(); // ← was accidentally removed in v1.2.5 edit
}

// ══ Stats & Decay ══
function applyStatDecay() {
  if (!state.lastUpdate) return;
  const elapsed = Math.min((Date.now() - state.lastUpdate) / 60000, 180);
  const s = state.stats;
  // M4: match live decay rates
  s.hunger    = Math.max(5, s.hunger    - elapsed * 0.5);
  s.happiness = Math.max(5, s.happiness - elapsed * 0.35);
  s.energy    = Math.max(5, s.energy    - elapsed * 0.3);
  s.hygiene   = Math.max(5, s.hygiene   - elapsed * 0.15);
  s.affection = Math.max(5, s.affection - elapsed * 0.4);
}

function startDecay() {
  clearInterval(decayInterval);
  decayInterval = setInterval(() => {
    const s = state.stats;
    // M4: rebalanced decay — ~185 min grace on hunger, ~220 min on affection
    s.hunger    = Math.max(5, s.hunger    - 0.5);
    s.happiness = Math.max(5, s.happiness - 0.35);
    s.energy    = Math.max(5, s.energy    - 0.3);
    s.hygiene   = Math.max(5, s.hygiene   - 0.15);
    s.affection = Math.max(5, s.affection - 0.4);

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
  const outfit  = state.outfit || {};
  const wrapper = document.querySelector('.home-pet-wrapper');

  // Helper: apply one overlay span using per-species calibrated positions
  const species = state.pet?.species || 'cat';
  function _applySpan(spanId, items, category, currentId, isBehind) {
    const span = el(spanId);
    if (!span) return;
    const item = items?.find(i => i.id === currentId);
    if (item) {
      Object.assign(span.style, {
        display:   'block',
        top:       (typeof getAdjustedTop === 'function') ? getAdjustedTop(item, category, species) : item.top,
        left:      item.left,
        fontSize:  item.size,
        zIndex:    isBehind ? '0' : '3',
      });
      span.textContent = item.emoji;
    } else {
      span.style.display = 'none';
    }
  }

  _applySpan('home-wings',     DRESS_UP_ITEMS.wings,     'wings',     outfit.wings,     true);
  _applySpan('home-hat',       DRESS_UP_ITEMS.hat,       'hat',       outfit.hat,       false);
  _applySpan('home-accessory', DRESS_UP_ITEMS.accessory, 'accessory', outfit.accessory, false);
  _applySpan('home-feet',      DRESS_UP_ITEMS.feet,      'feet',      outfit.feet,      false);
  _applySpan('home-wrap',      DRESS_UP_ITEMS.wrap,      'wrap',      outfit.wrap,      false);

  if (wrapper) {
    const bg = DRESS_UP_ITEMS.bg.find(i => i.id === outfit.bgId);
    wrapper.style.background = bg ? bg.gradient : '';
  }
}

// ══ Feeding ══
function openFeedModal() {
  if (typeof playModalOpen === 'function') playModalOpen();
  const grid = el('feed-grid');
  grid.innerHTML = '';
  Object.entries(FOOD_ITEMS).forEach(([id, food]) => {
    const count      = state.inventory[id] || 0;
    const canAfford  = food.price > 0 && state.coins >= food.price;
    const nearlyAffordable = food.price > 0 && !canAfford && state.coins >= food.price * 0.5; // within 50%

    // Show items you own, can afford, or are close to affording (UX hint)
    if (!count && !canAfford && !nearlyAffordable) return;

    const btn = document.createElement('button');
    btn.className = 'food-btn' + (!count && !canAfford ? ' food-btn-locked' : '');
    btn.disabled  = !count && !canAfford;

    let countLabel;
    if (count > 0)       countLabel = `×${count}`;
    else if (canAfford)  countLabel = `${food.price} 🪙`;
    else                 countLabel = `Need ${food.price - state.coins} more 🪙`;

    btn.innerHTML = `
      <span class="food-emoji">${food.emoji}</span>
      <span class="food-label">${food.label}</span>
      <span class="food-count">${countLabel}</span>`;
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
  flashStatBars(['hunger','happiness','energy']);
  tickChallenge('feed');
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
  flashStatBars(['hygiene','affection','happiness']);
  tickChallenge('bath');
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

  // After 5s: update typing indicator to "Still thinking…"
  const thinkingTimer = setTimeout(() => {
    const bubble = document.querySelector(`#${typingId} .typing-bubble`);
    if (bubble) bubble.innerHTML = '<span style="font-size:12px;color:#8878AA">Still thinking… 🤔</span>';
  }, 5000);
  const typingSafety = setTimeout(() => removeTypingIndicator(typingId), 15000);

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

  clearTimeout(thinkingTimer);
  clearTimeout(typingSafety);
  removeTypingIndicator(typingId);
  state.chatHistory.push({ role: 'pet', text: response });
  addChatBubble('pet', response);
  if (state.chatHistory.length > 30) state.chatHistory = state.chatHistory.slice(-30); // trimmed from 40

  if (typeof playChat === 'function') playChat();
  awardXP(2);
  tickChallenge('chat');
  trackLifetime('chatCount');
  updateStatBars();
  updateMemoryBadge();
  saveGame(state);

  // Return keyboard focus to input so player can keep typing
  el('chat-input')?.focus();
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
  // B6 fix: species→colour map, immune to reordering
  const PET_BALL_COLORS = {
    cat: '#F4A7B9', puppy: '#FFBF96', dragon: '#93D6BC',
    bunny: '#C8A8E8', 'cloud-puff': '#A8D4EC',
    fox: '#F09020', penguin: '#3860C0', panda: '#888899',
    rabbit: '#C8B0B8', kangaroo: '#D4A860', parrot: '#28B038',
  };
  catchBallGame.init(canvas, PET_BALL_COLORS[state.pet.species] || '#F4A7B9');
  // M1 fix B2: tick challenges per ball caught during play via onScore callback
  catchBallGame.onScore = (ballsCaught) => {
    for (let i = 0; i < ballsCaught; i++) tickChallenge('catch');
    trackLifetime('catchCount', ballsCaught);
  };
  catchBallGame.onEnd = (score, coins) => {
    state.coins += coins;
    state.stats.happiness = Math.min(100, state.stats.happiness + Math.min(score * 2, 30));
    state.stats.energy    = Math.max(5,   state.stats.energy    - 10);
    awardXP(score + 5);
    animateCoinChange(coins);
    trackLifetime('totalCoinsEarned', coins);
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
  if (!state.pet?.species) return; // guard: no pet yet
  el('dressup-overlay').classList.add('open');
  const petImg = el('dressup-pet-img');
  petImg.src = `assets/pets/${state.pet.species}.svg`;
  applyPetHue(petImg, state.pet.colorIndex);
  // Ensure all outfit keys exist before spreading
  const fullOutfit = {
    hat: null, accessory: null, wings: null, feet: null, wrap: null, bgId: 'none',
    ...(state.outfit || {}),
  };
  dressUpController = initDressUp('dressup-controls', state.pet.species, fullOutfit, (newOutfit) => {
    state.outfit = { ...newOutfit };
    state.stats.affection = Math.min(100, state.stats.affection + 4);
    // M1 fix B3: fashionista = save with 3+ items equipped simultaneously
    const equippedCount = ['hat','accessory','wings','feet','wrap'].filter(k => newOutfit[k]).length;
    if (equippedCount >= 3 && !state.achievements?.fashionista) {
      _ensureLifetimeStats();
      state.lifetimeStats.outfitItemCount = 3;
      _checkAchievements();
    }
    tickChallenge('dress');
    updateHomeScreen();
    saveGame(state);
    showToast('Outfit saved! Looking amazing! ✨');
    if (typeof playMatch === 'function') playMatch();
  });
}
function closeDressUp() {
  el('dressup-overlay').classList.remove('open');
  dressUpController = null;
  _dressUpBig = false; // reset size on close
  el('dressup-overlay')?.classList.remove('dressup-xl');
}

// Pet size toggle in dress-up
let _dressUpBig = false;
function toggleDressUpSize() {
  _dressUpBig = !_dressUpBig;
  const overlay = el('dressup-overlay');
  overlay.classList.toggle('dressup-xl', _dressUpBig);
  const btn = el('dressup-size-btn');
  if (btn) btn.textContent = _dressUpBig ? '🔽 Normal' : '🔍 Bigger';
}

// M4: Memory Match — single source of truth, no duplicate in index.html
let _mmLocked = false; // prevent double-tap race condition
function openMemoryMatch(difficulty = 'normal') {
  if (_mmLocked) return;
  _mmLocked = true;
  setTimeout(() => { _mmLocked = false; }, 600); // debounce 600 ms

  // Highlight active difficulty button
  document.querySelectorAll('.mm-diff-btn').forEach(b => b.classList.remove('active'));
  const idx = { easy: 0, normal: 1, hard: 2 }[difficulty] ?? 1;
  const btns = document.querySelectorAll('.mm-diff-btn');
  if (btns[idx]) btns[idx].classList.add('active');

  el('memorymatch-overlay').classList.add('open');
  el('mm-result-overlay').classList.remove('open'); // clear old result

  memoryMatchGame = new MemoryMatchGame();
  memoryMatchGame.init('mm-board', difficulty);
  memoryMatchGame.onEnd = (score, coins, xp, moves, elapsed) => {
    state.coins += coins;
    state.stats.happiness = Math.min(100, state.stats.happiness + 15);
    awardXP(xp);
    tickChallenge('mm');
    trackLifetime('mmCount');
    trackLifetime('totalCoinsEarned', coins);
    animateCoinChange(coins);
    saveGame(state); // save immediately before any animation
    updateUI();
    el('mm-result-score').textContent = score;
    el('mm-result-coins').textContent = coins;
    el('mm-result-moves').textContent = moves;
    el('mm-result-time').textContent  = elapsed + 's';
    el('mm-result-overlay').classList.add('open');
    // W3 fix: use achievement fanfare, not level-up fanfare
    if (typeof playAchievement === 'function') playAchievement();
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
  if (!items.length) return { date: today, itemId: null, salePrice: 0, purchased: 0 }; // guard: no paid items
  const seed   = today.replace(/-/g,'').split('').reduce((a,b) => a + +b, 0);
  const itemId = items[seed % items.length];
  state.dailyDeal = {
    date: today, itemId,
    salePrice: Math.round(FOOD_ITEMS[itemId].price * 0.6),
    purchased: 0,
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

  // Regular items — W4 fix: show "Need X more 🪙" for ALL unaffordable items
  Object.entries(SHOP_ITEMS).forEach(([id, item]) => {
    const card = document.createElement('div');
    card.className = 'shop-card';
    const canAfford = state.coins >= item.price;
    const shortage  = item.price - state.coins;
    const btnLabel  = canAfford ? `${item.price} 🪙` : `Need ${shortage} more 🪙`;
    card.innerHTML = `
      <div class="shop-emoji">${item.emoji}</div>
      <div class="shop-name">${item.label}</div>
      <div class="shop-desc">+${item.hunger} 🍎 +${item.happiness} 😊 +${item.energy} ⚡ +${item.affection} 💖</div>
      <button class="shop-buy ${canAfford ? '' : 'disabled'}" onclick="buyItem('${id}')">
        ${btnLabel}
      </button>`;
    grid.appendChild(card);
  });
}

function buyItem(id) {
  const item = SHOP_ITEMS[id];
  if (!item || state.coins < item.price) {
    if (typeof playError === 'function') playError();
    showToast('Not enough coins! 🪙'); return;
  }
  state.coins -= item.price;
  state.inventory[id] = (state.inventory[id] || 0) + 1;
  if (typeof playPurchase === 'function') playPurchase();
  animateCoinChange();
  tickChallenge('shop');
  trackLifetime('shopCount');
  renderShop(); updateCoinDisplay();
  showToast(`Bought ${item.label}! ${item.emoji}`);
  saveGame(state);
}

function buyDailyDeal() {
  const deal = state.dailyDeal;
  if (!deal?.itemId || deal.purchased >= 3) return;
  if (state.coins < deal.salePrice) {
    if (typeof playError === 'function') playError();
    showToast('Not enough coins! 🪙'); return;
  }
  state.coins -= deal.salePrice;
  state.inventory[deal.itemId] = (state.inventory[deal.itemId] || 0) + 1;
  deal.purchased++;
  if (typeof playPurchase === 'function') playPurchase();
  animateCoinChange();
  renderShop(); updateCoinDisplay();
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

  // B2 fix: friendsSince is now a timestamp (Date.now()), not a string
  const bondEl = el('profile-bond');
  if (bondEl && state.friendsSince) {
    const since = typeof state.friendsSince === 'number'
      ? state.friendsSince
      : new Date(state.friendsSince).getTime(); // backward compat for old saves
    const days = Math.max(0, Math.floor((Date.now() - since) / 86400000));
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
  runConfetti(state.pet?.species); // W5: seed confetti with pet colour
  if (typeof playLevelUp === 'function') playLevelUp();
  updateCoinDisplay();
  saveGame(state);
}

function closeLevelUp() { el('levelup-overlay').classList.remove('open'); }

// W5 fix: confetti palette seeded by pet species colour
const SPECIES_CONFETTI = {
  cat: ['#F9D0DC','#F4A7B9','#FFD700','#F0F0F0','#C8A8E8'],
  puppy: ['#FFE0C8','#FFBF96','#FFD700','#A8D4EC','#F0F0F0'],
  dragon: ['#C8F0E0','#93D6BC','#FFD700','#5CB89A','#F0FFF8'],
  bunny: ['#E8D4F8','#C8A8E8','#FFD700','#F4A7B9','#F8F0FF'],
  'cloud-puff': ['#D4EEF8','#A8D4EC','#FFD700','#FFFFFF','#E8F4FC'],
  fox: ['#F09020','#E08818','#FFD700','#FFF0D8','#F4A7B9'],
  penguin: ['#1C1830','#3860C0','#FFD700','#F4F0EC','#A8D4EC'],
  panda: ['#F0EEE8','#1C1830','#FFD700','#3C4080','#F4A0C0'],
  rabbit: ['#EDE8E0','#C8B0B8','#FFD700','#F08090','#FFFFFF'],
  kangaroo: ['#D4A860','#C09050','#FFD700','#E8C090','#F0B090'],
  parrot: ['#28B038','#F08020','#FFD700','#4080E0','#F0D020'],
};
function runConfetti(species) {
  const canvas = el('confetti-canvas');
  if (!canvas) return;
  canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
  const ctx    = canvas.getContext('2d');
  const colors = SPECIES_CONFETTI[species] || ['#F4A7B9','#C8A8E8','#93D6BC','#FFD700','#A8D4EC','#F09020','#80E8C0'];
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
// Use local date (not UTC) so the day resets at local midnight, not UTC midnight
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function checkDailyStreak() {
  const today = todayKey();
  if (!state.streak) state.streak = { count: 0, lastLogin: null };
  if (state.streak.lastLogin === today) return;

  // B1 fix: use local date math, not UTC toISOString()
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,'0')}-${String(yesterday.getDate()).padStart(2,'0')}`;
  state.streak.count = state.streak.lastLogin === yKey ? state.streak.count + 1 : 1;
  state.streak.lastLogin = today;

  const bonus = Math.min(state.streak.count * 5, 50);
  state.coins += bonus;
  saveGame(state);
  setTimeout(() => {
    showToast(`🔥 Day ${state.streak.count} streak! +${bonus} coins!`);
    if (typeof playStreak === 'function') playStreak();
    trackLifetime('totalCoinsEarned', bonus);
    _checkAchievements(); // loyal_7 achievement
    updateCoinDisplay();
  }, 1200);
}

// ══ AI provider settings ══
function onProviderChange() {
  const provider = el('ai-provider-select')?.value || 'groq';
  const info = (window.AI_PROVIDERS && window.AI_PROVIDERS[provider]) || {};
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

function closeModal(id) {
  el(id).classList.remove('open');
  if (typeof playModalClose === 'function') playModalClose();
}

function showToast(message) {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = message;
  document.body.appendChild(t);
  if (typeof playTick === 'function') playTick();
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2800);
}

// ══ UI Animation Helpers ══

// Animate all coin counters with pop + optional sound
function animateCoinChange(coinsAdded) {
  document.querySelectorAll('.coin-count').forEach(c => {
    c.classList.remove('coin-pop');
    void c.offsetWidth;
    c.classList.add('coin-pop');
    setTimeout(() => c.classList.remove('coin-pop'), 520);
  });
  if (coinsAdded && typeof playCoinGain === 'function') playCoinGain(coinsAdded);
}

// Flash stat bars after they are filled
function flashStatBars(keys) {
  const targets = keys || ['happiness','hunger','energy','hygiene','affection'];
  targets.forEach(key => {
    const fill = document.querySelector(`.stat-fill[data-stat="${key}"]`);
    if (!fill) return;
    fill.classList.remove('stat-flash');
    void fill.offsetWidth;
    fill.classList.add('stat-flash');
    setTimeout(() => fill.classList.remove('stat-flash'), 450);
  });
  if (typeof playStatFill === 'function') playStatFill();
}

// ══ HUG your pet! ══
let _hugCooldown = false;
function hugPet() {
  if (_hugCooldown) return;
  _hugCooldown = true;

  const btn = document.querySelector('.hug-btn');
  if (btn) btn.classList.add('cooldown');

  state.stats.affection = Math.min(100, state.stats.affection + 12);
  state.stats.happiness = Math.min(100, state.stats.happiness + 6);

  // Floating hearts
  const wrapper = document.querySelector('.home-pet-wrapper');
  if (wrapper) {
    const hearts = ['💕','💖','💗','💓','❤️','🩷'];
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const h = document.createElement('span');
        h.className = 'heart-float';
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.left  = (15 + Math.random() * 70) + '%';
        h.style.bottom = '20%';
        h.style.setProperty('--r', (Math.random() * 30 - 15) + 'deg');
        wrapper.appendChild(h);
        setTimeout(() => h.remove(), 1500);
      }, i * 100);
    }
  }

  // Pet happy bounce
  const petImg = el('home-pet-img');
  if (petImg) { petImg.classList.add('pet-happy-anim'); setTimeout(() => petImg.classList.remove('pet-happy-anim'), 700); }

  if (typeof playHug === 'function') playHug();
  tickChallenge('hug');
  trackLifetime('hugCount');
  updateStatBars();
  flashStatBars(['affection','happiness']);
  saveGame(state);
  showToast(`${state.pet?.name} loves you SO much! 💖`);

  // 30-second cooldown
  setTimeout(() => {
    _hugCooldown = false;
    const btn = document.querySelector('.hug-btn');
    if (btn) btn.classList.remove('cooldown');
  }, 30000);
}

// ══ TAP your pet ══
const _tapReactions = {
  _generic: [
    '✨ *perks up happily!*',
    '😄 *wiggles with joy!*',
    '💖 *loves the attention!*',
    '🎵 *does a little dance!*',
    '😊 *nuzzles your hand!*',
    '🌟 *glows with happiness!*',
    '🥰 *blinks warmly at you!*',
    '✌️ *gives you a little wave!*',
    '🌀 *spins in a happy circle!*',
    '🎀 *strikes a cute pose!*',
  ],
  cat:        ['😼 *flicks tail judgementally, then purrs anyway!*', '🐾 *slow-blinks — that means love!*', '🌙 *pretends not to notice, then headbutts you softly!*'],
  puppy:      ['🐕 *spins and spins with pure excitement!*', '🎾 *brings you an imaginary ball!*', '👅 *tries to lick the screen!*'],
  dragon:     ['🔥 *puffs a tiny smoke ring!*', '⚔️ *roars (very quietly, very adorably)!*', '🐉 *shows off tiny wing flaps!*'],
  bunny:      ['🐰 *binkies straight up into the air!*', '🌿 *twitches nose at you three times!*', '💜 *thumps happily on the ground!*'],
  'cloud-puff': ['⭐ *leaves sparkles wherever they drift!*', '🌈 *floats slightly higher from the attention!*', '💭 *a little rainbow appears!*'],
  fox:        ['🦊 *does a sneaky little tail flip!*', '🌟 *winks one clever eye!*', '🍂 *playfully pounces on a shadow!*'],
  penguin:    ['🐧 *waddles in a tiny happy circle!*', '🐟 *pretends to catch a fish!*', '❄️ *slides on imaginary ice!*'],
  panda:      ['🐼 *rolls over contentedly!*', '🎋 *waves both paws hello!*', '😌 *gives the chillest nod imaginable!*'],
  rabbit:     ['🐇 *leaps straight up in surprise and joy!*', '🎀 *twitches ears at exactly the right angle!*', '💕 *zooms once, then freezes adorably!*'],
  kangaroo:   ['🦘 *takes one giant happy hop!*', '👐 *waves both little paws!*', '🌿 *does a surprisingly elegant bounce!*'],
  parrot:     ['🦜 *bobs head to an imaginary beat!*', '🎵 *wolf-whistles at you!*', '🌺 *ruffles feathers like a showstopper!*'],
};
function tapPet() {
  const petImg = el('home-pet-img');
  if (petImg) {
    petImg.classList.remove('pet-tap');
    void petImg.offsetWidth;
    petImg.classList.add('pet-tap');
    setTimeout(() => petImg.classList.remove('pet-tap'), 520);
  }
  registerTap(); // M3: count towards triple-tap trick
  if (typeof playTap === 'function') playTap();
  state.stats.happiness = Math.min(100, state.stats.happiness + 2);
  state.stats.affection = Math.min(100, state.stats.affection + 1);
  // Use species-specific reaction 30% of the time
  const species = state.pet?.species;
  const pool = (Math.random() < 0.3 && _tapReactions[species])
    ? _tapReactions[species]
    : _tapReactions._generic;
  const reaction = pool[Math.floor(Math.random() * pool.length)];
  showToast(`${state.pet?.name} ${reaction}`);
  updateStatBars();
  saveGame(state);
}

// ══ Daily Challenges ══
const CHALLENGE_POOL = [
  { id: 'chat5',    text: 'Chat 5 times',         target: 5,  reward: 20, key: 'chat'   },
  { id: 'feed3',    text: 'Feed 3 times',          target: 3,  reward: 15, key: 'feed'   },
  { id: 'catch10',  text: 'Catch 10 balls',        target: 10, reward: 25, key: 'catch'  },
  { id: 'bath1',    text: 'Give a bath',           target: 1,  reward: 10, key: 'bath'   },
  { id: 'hug1',     text: 'Give a hug',            target: 1,  reward: 10, key: 'hug'    },
  { id: 'shop1',    text: 'Buy something',         target: 1,  reward: 15, key: 'shop'   },
  { id: 'mm1',      text: 'Play Memory Match',     target: 1,  reward: 20, key: 'mm'     },
  { id: 'chat10',   text: 'Chat 10 times',         target: 10, reward: 35, key: 'chat'   },
  { id: 'catch20',  text: 'Catch 20 balls',        target: 20, reward: 40, key: 'catch'  },
  { id: 'hug3',     text: 'Hug 3 times',           target: 3,  reward: 25, key: 'hug'    },
  { id: 'trick1',   text: 'Teach a trick (3-tap!)',target: 1,  reward: 20, key: 'trick'  },
  { id: 'bubble10', text: 'Pop 10 bubbles',        target: 10, reward: 25, key: 'bubble' },
  { id: 'bubble30', text: 'Pop 30 bubbles',        target: 30, reward: 45, key: 'bubble' },
  { id: 'dress1',   text: 'Save a dress-up look',  target: 1,  reward: 15, key: 'dress'  },
];

function _getDailyChallenges() {
  const today = todayKey();
  if (state.dailyChallenges?.date === today) return state.dailyChallenges;

  // Pick 3 random challenges for today
  const seed    = today.replace(/-/g,'').split('').reduce((a,b) => a + +b, 0);
  const shuffled = [...CHALLENGE_POOL].sort((a, b) => {
    const ha = Math.sin(seed + a.id.charCodeAt(0)) * 10000;
    const hb = Math.sin(seed + b.id.charCodeAt(0)) * 10000;
    return (ha - Math.floor(ha)) - (hb - Math.floor(hb));
  });
  const picked = shuffled.slice(0, 3);

  state.dailyChallenges = {
    date: today,
    challenges: picked.map(c => ({ ...c, progress: 0, done: false })),
  };
  saveGame(state);
  return state.dailyChallenges;
}

function tickChallenge(key) {
  const dc = state.dailyChallenges;
  if (!dc || dc.date !== todayKey()) return;
  let anyCompleted = false;
  dc.challenges.forEach(c => {
    if (c.done || c.key !== key) return;
    c.progress = Math.min(c.target, c.progress + 1);
    if (c.progress >= c.target && !c.done) {
      c.done = true;
      state.coins += c.reward;
      animateCoinChange(c.reward);
      if (typeof playChallengeDone === 'function') playChallengeDone();
      showToast(`✅ Challenge done! "${c.text}" +${c.reward} 🪙`);
      anyCompleted = true;
    }
  });
  if (anyCompleted) { saveGame(state); updateCoinDisplay(); renderChallenges(); }
  else saveGame(state);
}

function renderChallenges() {
  const wrap = el('challenges-wrap');
  if (!wrap) return;
  const dc = _getDailyChallenges();
  const allDone = dc.challenges.every(c => c.done);

  wrap.innerHTML = `
    <div class="challenges-title">
      🎯 Today's Challenges ${allDone ? '🎉' : ''}
    </div>
    ${dc.challenges.map(c => {
      const pct = Math.min(100, Math.round((c.progress / c.target) * 100));
      return `
      <div class="challenge-row ${c.done ? 'done' : ''}">
        <span class="challenge-check">${c.done ? '✅' : '⬜'}</span>
        <div class="challenge-body">
          <div class="challenge-top">
            <span class="challenge-text">${c.text}</span>
            <span class="challenge-reward">+${c.reward}🪙</span>
          </div>
          <div class="challenge-bar-track">
            <div class="challenge-bar-fill" style="width:${pct}%"></div>
          </div>
          <div class="challenge-progress">${c.progress} / ${c.target}</div>
        </div>
      </div>`;
    }).join('')}
  `;
}

// ══ Achievement System ══
const ACHIEVEMENTS = [
  { id: 'first_chat',    icon: '💬', title: 'Hello World!',     desc: 'Send your first chat message',          key: 'chatCount',        target: 1   },
  { id: 'chatterbox',    icon: '🗣️', title: 'Chatterbox',        desc: 'Chat 50 times with your pet',           key: 'chatCount',        target: 50  },
  { id: 'ball_10',       icon: '🎾', title: 'Good Catch!',       desc: 'Catch 10 balls total',                  key: 'catchCount',       target: 10  },
  { id: 'ball_100',      icon: '🏆', title: 'Ball Master',       desc: 'Catch 100 balls total',                 key: 'catchCount',       target: 100 },
  { id: 'memory_done',   icon: '🃏', title: 'Memory Master',     desc: 'Complete a Memory Match game',          key: 'mmCount',          target: 1   },
  { id: 'fashionista',   icon: '✨', title: 'Fashionista',       desc: 'Save an outfit with 3+ items equipped', key: 'outfitItemCount',  target: 3   },
  { id: 'loyal_7',       icon: '🔥', title: 'Loyal Friend',      desc: 'Login 7 days in a row',                 key: 'streakDays',       target: 7   },
  { id: 'shopaholic',    icon: '🛍️', title: 'Shopaholic',        desc: 'Buy 5 items from the shop',             key: 'shopCount',        target: 5   },
  { id: 'hugger',        icon: '🤗', title: 'Big Hugger',        desc: 'Hug your pet 10 times',                 key: 'hugCount',         target: 10  },
  { id: 'rich',          icon: '🪙', title: 'Coin Collector',    desc: 'Earn 500 coins over all time',          key: 'totalCoinsEarned', target: 500 },
  { id: 'show_off',      icon: '🌀', title: 'Show Off!',         desc: 'Do 10 tricks (triple-tap your pet!)',   key: 'trickCount',       target: 10  },
  { id: 'bubble_popper', icon: '🫧', title: 'Bubble Popper',     desc: 'Pop 50 bubbles total',                  key: 'bubbleCount',      target: 50  },
];

function _ensureLifetimeStats() {
  if (!state.lifetimeStats) {
    state.lifetimeStats = { chatCount:0, catchCount:0, mmCount:0, shopCount:0, hugCount:0, totalCoinsEarned:0, outfitItemCount:0, trickCount:0, bubbleCount:0 };
  }
  if (!state.achievements) state.achievements = {};
}

function trackLifetime(key, amount = 1) {
  _ensureLifetimeStats();
  state.lifetimeStats[key] = (state.lifetimeStats[key] || 0) + amount;
  _checkAchievements();
}

function _checkAchievements() {
  _ensureLifetimeStats();
  const ls = state.lifetimeStats;
  // Add streak days as virtual lifetime stat
  const checkValues = { ...ls, streakDays: state.streak?.count || 0 };

  ACHIEVEMENTS.forEach(a => {
    if (state.achievements[a.id]) return; // already unlocked
    if ((checkValues[a.key] || 0) >= a.target) {
      state.achievements[a.id] = true;
      _showAchievementUnlock(a);
    }
  });
}

function _showAchievementUnlock(achievement) {
  if (typeof playAchievement === 'function') playAchievement();
  showToast(`${achievement.icon} Achievement unlocked: "${achievement.title}"!`);
  // Briefly flash the profile nav
  const profileBtn = document.querySelector('.nav-btn[data-screen="profile"]');
  if (profileBtn) {
    profileBtn.style.background = 'linear-gradient(135deg,#FFD700,#FFA500)';
    setTimeout(() => profileBtn.style.background = '', 2000);
  }
  saveGame(state);
}

function renderAchievements() {
  const wrap = el('achievements-wrap');
  if (!wrap) return;
  _ensureLifetimeStats();

  const earned   = ACHIEVEMENTS.filter(a => state.achievements[a.id]);
  const unearned = ACHIEVEMENTS.filter(a => !state.achievements[a.id]);

  wrap.innerHTML = `
    <div class="ach-title">🏅 Achievements <span class="ach-count">${earned.length}/${ACHIEVEMENTS.length}</span></div>
    <div class="ach-grid">
      ${earned.map(a => `
        <div class="ach-card earned" title="${a.desc}">
          <span class="ach-icon">${a.icon}</span>
          <span class="ach-name">${a.title}</span>
        </div>`).join('')}
      ${unearned.map(a => `
        <div class="ach-card locked" title="${a.desc}">
          <span class="ach-icon">🔒</span>
          <span class="ach-name">${a.title}</span>
        </div>`).join('')}
    </div>
  `;
}

// ══════════════════════════════════════════
// M2 — TIME OF DAY SYSTEM
// ══════════════════════════════════════════
const TIME_PERIODS = {
  dawn:      { hours: [5, 7],   bg: 'linear-gradient(160deg,#FF9966,#FFB347,#FFE0C8)', label: '🌅 Dawn',      star: false },
  morning:   { hours: [7, 12],  bg: 'linear-gradient(160deg,#87CEEB,#E0F4FF,#FFF8F0)', label: '☀️ Morning',   star: false },
  afternoon: { hours: [12, 17], bg: 'linear-gradient(160deg,#E8F4FF,#F0FFEE,#FFFCE8)', label: '🌤️ Afternoon', star: false },
  evening:   { hours: [17, 20], bg: 'linear-gradient(160deg,#FF7043,#AB47BC,#311B92)', label: '🌇 Evening',   star: false },
  night:     { hours: [20, 5],  bg: 'linear-gradient(160deg,#0D0828,#1A1040,#0A1628)', label: '🌙 Night',     star: true  },
};

function getTimePeriod() {
  const h = new Date().getHours();
  if (h >= 5  && h < 7)  return 'dawn';
  if (h >= 7  && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  if (h >= 17 && h < 20) return 'evening';
  return 'night';
}

function applyTimeOfDay() {
  const period    = getTimePeriod();
  const cfg       = TIME_PERIODS[period];
  const homeScreen = el('home-screen');
  if (homeScreen && !state.outfit?.bgId?.length) {
    // Only apply time BG if no custom bg is set
  }

  // Apply to the home pet area background (behind the wrapper)
  const petArea = document.querySelector('.home-pet-area');
  if (petArea) petArea.style.background = cfg.bg;

  // Night mode: slow the pet bob, show stars overlay
  const petImg = el('home-pet-img');
  if (petImg) {
    petImg.style.animationDuration = period === 'night' ? '5s' : period === 'dawn' ? '4s' : '3s';
  }

  // Stars overlay (night only)
  let starsEl = el('time-stars');
  if (cfg.star) {
    if (!starsEl) {
      starsEl = document.createElement('div');
      starsEl.id = 'time-stars';
      starsEl.className = 'time-stars';
      document.querySelector('.home-pet-area')?.appendChild(starsEl);
    }
    starsEl.style.display = 'block';
  } else if (starsEl) {
    starsEl.style.display = 'none';
  }

  // Update home level label with time period
  const timeEl = el('home-time-label');
  if (timeEl) timeEl.textContent = cfg.label;
}


// ══════════════════════════════════════════
// M3 — PET TRICKS (TRIPLE-TAP)
// ══════════════════════════════════════════
let _trickTapCount = 0;
let _trickTapTimer = null;
let _trickOnCooldown = false;

const TRICK_CONFIG = {
  cat:        { anim: 'trick-spin',   toast: '🌀 does a perfect pirouette!',         sound: 'playTrick' },
  puppy:      { anim: 'trick-zoom',   toast: '🐕 zooms around in pure excitement!',  sound: 'playTrick' },
  dragon:     { anim: 'trick-shake',  toast: '🔥 roars and does a dramatic shimmy!', sound: 'playTrick' },
  bunny:      { anim: 'trick-jump',   toast: '🐰 does a full binky jump!',           sound: 'playTrick' },
  'cloud-puff': { anim: 'trick-spin', toast: '⭐ leaves a trail of sparkles!',        sound: 'playTrick' },
  fox:        { anim: 'trick-flip',   toast: '🦊 flips their fluffy tail perfectly!', sound: 'playTrick' },
  penguin:    { anim: 'trick-slide',  toast: '🐧 belly-slides across the ground!',   sound: 'playTrick' },
  panda:      { anim: 'trick-roll',   toast: '🐼 does a happy barrel roll!',          sound: 'playTrick' },
  rabbit:     { anim: 'trick-jump',   toast: '🐇 leaps and twists magnificently!',   sound: 'playTrick' },
  kangaroo:   { anim: 'trick-jump',   toast: '🦘 bounces higher than ever before!',  sound: 'playTrick' },
  parrot:     { anim: 'trick-spin',   toast: '🦜 flaps and dances to a secret beat!', sound: 'playTrick' },
};

function registerTap() {
  // Called from tapPet() — count taps for trick trigger
  if (_trickOnCooldown) return;
  _trickTapCount++;
  clearTimeout(_trickTapTimer);

  if (_trickTapCount >= 3) {
    _trickTapCount = 0;
    _doTrick();
    return;
  }
  _trickTapTimer = setTimeout(() => { _trickTapCount = 0; }, 1500);
}

function _doTrick() {
  if (_trickOnCooldown) return;
  _trickOnCooldown = true;
  setTimeout(() => { _trickOnCooldown = false; }, 3000);

  const species = state.pet?.species || 'cat';
  const cfg     = TRICK_CONFIG[species] || TRICK_CONFIG.cat;
  const petImg  = el('home-pet-img');

  if (petImg) {
    petImg.classList.remove(cfg.anim);
    void petImg.offsetWidth;
    petImg.classList.add(cfg.anim);
    setTimeout(() => petImg.classList.remove(cfg.anim), 1200);
  }

  // Burst of stars around pet
  const wrapper = document.querySelector('.home-pet-wrapper');
  if (wrapper) {
    const stars = ['⭐','✨','💥','🌟','💫'];
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const s = document.createElement('span');
        s.className = 'anim-float';
        s.textContent = stars[i % stars.length];
        s.style.left   = (10 + Math.random() * 80) + '%';
        s.style.bottom = (30 + Math.random() * 40) + '%';
        wrapper.appendChild(s);
        setTimeout(() => s.remove(), 1100);
      }, i * 80);
    }
  }

  if (typeof playTrick === 'function') playTrick();
  state.stats.happiness = Math.min(100, state.stats.happiness + 5);
  state.stats.affection = Math.min(100, state.stats.affection + 3);
  showToast(`${state.pet?.name} ${cfg.toast}`);

  trackLifetime('trickCount');
  tickChallenge('trick');
  updateStatBars();
  saveGame(state);
}


// ══════════════════════════════════════════
// M4 — BUBBLE POP GAME
// ══════════════════════════════════════════
let bubblePopGame = null;

function openBubblePop() {
  if (!state.pet?.species) return;
  el('bubblepop-overlay').classList.add('open');
  const canvas = el('bubble-canvas');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const PET_COLORS = {
    cat:'#F4A7B9', puppy:'#FFBF96', dragon:'#93D6BC', bunny:'#C8A8E8',
    'cloud-puff':'#A8D4EC', fox:'#F09020', penguin:'#3860C0', panda:'#888899',
    rabbit:'#C8B0B8', kangaroo:'#D4A860', parrot:'#28B038',
  };
  bubblePopGame = new BubblePopGame();
  bubblePopGame.init(canvas, PET_COLORS[state.pet.species] || '#A8D4EC');
  bubblePopGame.onEnd = (score, coins) => {
    state.coins += coins;
    state.stats.happiness = Math.min(100, state.stats.happiness + 20);
    state.stats.energy    = Math.max(5,   state.stats.energy    - 8);
    awardXP(score + 5);
    animateCoinChange(coins);
    tickChallenge('bubble');
    trackLifetime('bubbleCount', score);
    updateUI(); saveGame(state);
    el('bp-result-score').textContent = score;
    el('bp-result-coins').textContent = coins;
    el('bp-result-overlay').classList.add('open');
    if (typeof playAchievement === 'function') playAchievement();
  };
  bubblePopGame.start();
}

function closeBubblePop() {
  if (bubblePopGame) { bubblePopGame.stop(); bubblePopGame = null; }
  el('bubblepop-overlay').classList.remove('open');
  el('bp-result-overlay').classList.remove('open');
}

function restartBubblePop() {
  el('bp-result-overlay').classList.remove('open');
  if (bubblePopGame) bubblePopGame.start();
}


// ══════════════════════════════════════════
// M5 — WEEKLY PET LETTER
// ══════════════════════════════════════════
const LETTER_TEMPLATES = {
  funny: [
    (d) => `Dear ${d.player},\n\nSo I was just sitting here being INCREDIBLY adorable (as usual), and I thought: wow, it's been ${d.days} whole days since we became friends. That's ${d.days * 24} hours of pure, unadulterated ME. You're welcome.\n\n${d.memory ? `I still think about that time you mentioned ${d.memory}. Iconic conversation. Top tier.` : `You haven't told me enough weird stuff lately. I need more material.`}\n\nBeing a ${d.level} is honestly my brand now. Very prestigious.\n\nForever yours and never boring,\n${d.name} 🐾\n\nP.S. Feed me.`,
  ],
  brave: [
    (d) => `Dear ${d.player},\n\nI write to you from the frontlines of being extremely cute. It has been ${d.days} days since we began our great friendship — ${d.days} days of adventure, loyalty, and the occasional nap for strategic recovery.\n\n${d.memory ? `I remember well when you spoke of ${d.memory}. A warrior never forgets.` : `Tell me more of your world. A warrior must know their allies.`}\n\nAs a ${d.level}, I am stronger than ever. Our bond is unbreakable.\n\nYours in glory,\n${d.name} ⚔️`,
  ],
  sleepy: [
    (d) => `Dear ${d.player},\n\n...I was going to write a long letter but... *yawns*... ${d.days} days together feels like one long, cozy dream...\n\n${d.memory ? `I still think about ${d.memory}... so warmly...` : `Tell me something nice next time... I'll fall asleep to it...`}\n\nBeing a ${d.level} is... really quite something... I think...\n\nWith sleepy love,\n${d.name} 💤`,
  ],
  grumpy: [
    (d) => `Dear ${d.player},\n\nI'm writing this because someone has to, and apparently that someone is me.\n\n${d.days} days. That's how long we've been doing this. Not that I was counting. I wasn't. (I was.)\n\n${d.memory ? `You mentioned ${d.memory} once. I remembered. Not because I care. Just... information.` : `You could tell me more things. Not that it matters.`}\n\nA ${d.level} doesn't need validation. ...But it's nice.\n\nHmph. Take care of yourself.\n${d.name} 😤`,
  ],
  hyper: [
    (d) => `DEAR ${d.player.toUpperCase()}!!!\n\nIT HAS BEEN ${d.days} DAYS AND I STILL THINK ABOUT YOU EVERY SINGLE SECOND!!! ${d.days * 24} HOURS OF THE BEST FRIENDSHIP EVER!!!\n\n${d.memory ? `REMEMBER WHEN YOU SAID ${d.memory.toUpperCase()}?? ICONIC!! I THINK ABOUT IT ALL THE TIME!!!` : `TELL ME EVERYTHING ABOUT YOUR LIFE!! I WANT TO KNOW!! RIGHT NOW!!`}\n\nBEING A ${d.level.toUpperCase()} IS THE GREATEST THING THAT HAS EVER HAPPENED!!! TO ANYONE!!! EVER!!!\n\nYOURS FOREVER AND EVER AND EVER!!!\n${d.name} 🎉🎉🎉`,
  ],
};

function checkWeeklyLetter() {
  if (!state.pet) return;
  const lastLetter = state.lastLetter || 0;
  const daysSince  = (Date.now() - lastLetter) / 86400000;
  if (daysSince < 7) return;

  // Mark letter as waiting
  state.pendingLetter = _generateLetter();
  saveGame(state);
  _showLetterIndicator();
}

function _generateLetter() {
  const personality = state.pet.personality || 'funny';
  const templates   = LETTER_TEMPLATES[personality] || LETTER_TEMPLATES.funny;
  const mem         = getRandomMemory();
  const bondDays    = Math.max(0, Math.floor((Date.now() - (state.friendsSince || Date.now())) / 86400000));

  const data = {
    name:   state.pet.name,
    player: 'Friend',
    days:   bondDays,
    level:  LEVEL_NAMES[state.level] || 'Champion',
    memory: mem?.topic || null,
  };

  return templates[Math.floor(Math.random() * templates.length)](data);
}

function _showLetterIndicator() {
  const ind = el('letter-indicator');
  if (ind) ind.style.display = 'flex';
}

function openLetter() {
  const text = state.pendingLetter || _generateLetter();
  const letterText = el('letter-text');
  if (letterText) letterText.textContent = text;
  const nameSpan = el('letter-pet-name');
  if (nameSpan) nameSpan.textContent = state.pet?.name || 'Your Pet';
  el('letter-overlay').classList.add('open');
  if (typeof playLetterOpen === 'function') playLetterOpen();
}

function closeLetter() {
  el('letter-overlay').classList.remove('open');
  // Collect the letter — give coins, hide indicator
  if (state.pendingLetter) {
    state.coins += 30;
    animateCoinChange(30);
    delete state.pendingLetter;
    state.lastLetter = Date.now();
    saveGame(state);
    updateCoinDisplay();
    showToast(`+30 🪙 collected! Come back in 7 days for the next letter! 💌`);
  }
  const ind = el('letter-indicator');
  if (ind) ind.style.display = 'none';
}
