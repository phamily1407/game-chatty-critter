// ══ App State ══
let state = {};
let decayInterval = null;
let catchBallGame = null;
let dressUpController = null;

// 8 colour options: label, hue-rotate degrees, preview swatch hex
const COLOUR_OPTIONS = [
  { label: 'Original', deg: 0,    swatch: null },
  { label: 'Ocean',    deg: 180,  swatch: '#A8D4EC' },
  { label: 'Forest',   deg: 120,  swatch: '#A8E8C0' },
  { label: 'Mystic',   deg: 240,  swatch: '#C8A8E8' },
  { label: 'Ember',    deg: -40,  swatch: '#F4C080' },
  { label: 'Teal',     deg: 150,  swatch: '#80D8D0' },
  { label: 'Blossom',  deg: 300,  swatch: '#F4A8D0' },
  { label: 'Sunny',    deg: 60,   swatch: '#F0E080' },
];
const HUE_ROTATIONS = COLOUR_OPTIONS.map(c => c.deg);

const SPECIES = [
  { id: 'cat',        label: 'Cat',        emoji: '🐱', trait: 'Clever & Mysterious' },
  { id: 'puppy',      label: 'Puppy',      emoji: '🐶', trait: 'Bouncy & Loyal' },
  { id: 'dragon',     label: 'Dragon',     emoji: '🐉', trait: 'Brave & Dramatic' },
  { id: 'bunny',      label: 'Bunny',      emoji: '🐰', trait: 'Shy but Sweet' },
  { id: 'cloud-puff', label: 'Cloud Puff', emoji: '☁️', trait: 'Dreamy & Magical' },
  { id: 'fox',        label: 'Fox',        emoji: '🦊', trait: 'Sly & Clever' },
  { id: 'penguin',    label: 'Penguin',    emoji: '🐧', trait: 'Cool & Quirky' },
  { id: 'panda',      label: 'Panda',      emoji: '🐼', trait: 'Chill & Cuddly' },
  { id: 'rabbit',     label: 'Rabbit',     emoji: '🐇', trait: 'Quick & Curious' },
  { id: 'kangaroo',   label: 'Kangaroo',   emoji: '🦘', trait: 'Bouncy & Bold' },
  { id: 'parrot',     label: 'Parrot',     emoji: '🦜', trait: 'Chatty & Bright' },
];

const PERSONALITIES = [
  { id: 'funny',  label: 'Funny',   emoji: '😄', desc: 'Makes jokes & puns' },
  { id: 'brave',  label: 'Brave',   emoji: '⚔️', desc: 'Bold adventurer' },
  { id: 'sleepy', label: 'Sleepy',  emoji: '😴', desc: 'Cozy & dreamy' },
  { id: 'grumpy', label: 'Grumpy',  emoji: '😤', desc: 'Blunt but kind' },
  { id: 'hyper',  label: 'Hyper',   emoji: '🌀', desc: 'Non-stop energy' },
];

const FOOD_ITEMS = {
  apple:    { label: 'Apple',          emoji: '🍎', price: 0,  hunger: 20, happiness: 5,  energy: 5  },
  fish:     { label: 'Fish',           emoji: '🐟', price: 0,  hunger: 30, happiness: 8,  energy: 8  },
  cake:     { label: 'Cake',           emoji: '🍰', price: 15, hunger: 25, happiness: 15, energy: 5  },
  sushi:    { label: 'Sushi',          emoji: '🍣', price: 20, hunger: 35, happiness: 10, energy: 10 },
  smoothie: { label: 'Smoothie',       emoji: '🥤', price: 25, hunger: 20, happiness: 10, energy: 25 },
  mystery:  { label: 'Mystery Snack',  emoji: '🌮', price: 30, hunger: 20, happiness: 20, energy: 20 },
};

const XP_PER_LEVEL = [0, 100, 200, 350, 500, 700, 1000, 1400, 2000];
const LEVEL_NAMES  = ['', 'Tiny Cub', 'Cozy Cub', 'Adventure Pal', 'Star Buddy', 'Super Friend',
                       'Bright Spirit', 'Legendary Floof', 'Cosmic Legend', 'Eternal Sparkle'];

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
});

// ══ Screen Routing ══
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
  const btn = document.querySelector(`.nav-btn[data-screen="${screenId}"]`);
  if (btn) btn.classList.add('active');

  if (screenId === 'chat')    renderChatHistory();
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
  const wrap = el('color-picker');
  wrap.innerHTML = '';
  const preview = el('color-preview-img');

  COLOUR_OPTIONS.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'color-dot' + (i === creation.colorIndex ? ' selected' : '');
    btn.title = opt.label;

    if (opt.swatch) {
      btn.style.background = opt.swatch;
    } else {
      // "Original" swatch: use a mini version of the pet image as a background
      btn.style.background = 'linear-gradient(135deg,#F9D0DC,#FFE0C8,#C8F0E0)';
      btn.style.border = '3px solid #3D3550';
    }

    btn.onclick = () => {
      creation.colorIndex = i;
      document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
      btn.classList.add('selected');
      // Immediately update the preview image
      if (preview) applyPetHue(preview, i);
      // Update label
      const lbl = el('color-label');
      if (lbl) lbl.textContent = opt.label;
    };
    wrap.appendChild(btn);
  });

  // Show label for current selection
  const lbl = el('color-label');
  if (lbl) lbl.textContent = COLOUR_OPTIONS[creation.colorIndex].label;
}

function renderPetPreview() {
  const s = SPECIES.find(s => s.id === creation.species);
  const p = PERSONALITIES.find(p => p.id === creation.personality);
  el('preview-pet-img').src = `assets/pets/${creation.species}.svg`;
  applyPetHue(el('preview-pet-img'), creation.colorIndex);
  el('preview-name').textContent = creation.name.trim() || 'Your Pet';
  el('preview-species').textContent = `${s?.emoji || ''} ${s?.label || ''} · ${p?.emoji || ''} ${p?.label || ''} personality`;
}

function finishCreation() {
  state.pet = {
    name: creation.name.trim(),
    species: creation.species,
    personality: creation.personality,
    colorIndex: creation.colorIndex,
    createdAt: Date.now()
  };
  state.stats = { happiness: 80, hunger: 75, energy: 90, hygiene: 85, affection: 70 };
  state.coins = 50;
  state.xp = 0;
  state.level = 1;
  state.streak = { count: 1, lastLogin: todayKey() };
  state.chatHistory = [];
  state.outfit = { hat: null, accessory: null, bgId: 'none' };
  state.inventory = { apple: 3, fish: 1, cake: 0, sushi: 0, smoothie: 0, mystery: 0 };
  state.lastUpdate = Date.now();
  saveGame(state);
  showGame();
}

// ══ Stats & Decay ══
function applyStatDecay() {
  if (!state.lastUpdate) return;
  const elapsed = (Date.now() - state.lastUpdate) / 1000 / 60; // minutes
  const cap = Math.min(elapsed, 180); // max 3 hours of decay
  const s = state.stats;
  s.hunger    = Math.max(10, s.hunger    - cap * 1.5);
  s.happiness = Math.max(10, s.happiness - cap * 0.8);
  s.energy    = Math.max(10, s.energy    - cap * 0.6);
  s.hygiene   = Math.max(10, s.hygiene   - cap * 0.4);
  s.affection = Math.max(10, s.affection - cap * 1.0);
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
    saveGame(state);
  }, 60000); // every real minute
}

function getMoodLabel() {
  const s = state.stats;
  if (s.hunger < 20) return { icon: '😢', text: 'Very hungry...' };
  if (s.energy < 20) return { icon: '😴', text: 'So tired...' };
  if (s.happiness < 20) return { icon: '😔', text: 'Feeling a bit sad' };
  if (s.hygiene < 20) return { icon: '🛁', text: 'Needs a bath!' };
  const avg = (s.happiness + s.hunger + s.energy + s.affection) / 4;
  if (avg > 75) return { icon: '✨', text: 'Feeling amazing!' };
  if (avg > 55) return { icon: '😊', text: 'Doing great!' };
  if (avg > 35) return { icon: '🙂', text: 'Feeling okay' };
  return { icon: '😕', text: 'Could use some love' };
}

// ══ Home Screen ══
function updateUI() {
  updateHomeScreen();
  updateCoinDisplay();
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
}

function updateStatBars() {
  const s = state.stats;
  ['happiness','hunger','energy','hygiene','affection'].forEach(key => {
    const fill = document.querySelector(`.stat-fill[data-stat="${key}"]`);
    if (fill) fill.style.width = Math.round(s[key]) + '%';
  });
}

function updateCoinDisplay() {
  document.querySelectorAll('.coin-count').forEach(el => {
    el.textContent = state.coins;
  });
}

function applyOutfitToHome() {
  const hatEl = el('home-hat');
  const accEl = el('home-accessory');
  const wrapper = document.querySelector('.home-pet-wrapper');

  if (hatEl) {
    if (state.outfit.hat) {
      const item = DRESS_UP_ITEMS.hat.find(i => i.id === state.outfit.hat);
      hatEl.textContent = item?.emoji || '';
      hatEl.style.top = item?.top || '0';
      hatEl.style.left = item?.left || '0';
      hatEl.style.fontSize = item?.size || '2rem';
      hatEl.style.display = 'block';
    } else { hatEl.style.display = 'none'; }
  }

  if (accEl) {
    if (state.outfit.accessory) {
      const item = DRESS_UP_ITEMS.accessory.find(i => i.id === state.outfit.accessory);
      accEl.textContent = item?.emoji || '';
      accEl.style.top = item?.top || '0';
      accEl.style.left = item?.left || '0';
      accEl.style.fontSize = item?.size || '2rem';
      accEl.style.display = 'block';
    } else { accEl.style.display = 'none'; }
  }

  if (wrapper && state.outfit.bgId) {
    const bgItem = DRESS_UP_ITEMS.bg.find(i => i.id === state.outfit.bgId);
    wrapper.style.background = bgItem ? bgItem.gradient : '';
  }
}

// ══ Feeding ══
function openFeedModal() {
  const modal = el('feed-modal');
  const grid = el('feed-grid');
  grid.innerHTML = '';
  Object.entries(FOOD_ITEMS).forEach(([id, food]) => {
    const count = state.inventory[id] || 0;
    const canBuy = food.price > 0 && state.coins >= food.price;
    const hasStock = count > 0;
    if (!hasStock && !canBuy) return;

    const btn = document.createElement('button');
    btn.className = 'food-btn';
    btn.innerHTML = `
      <span class="food-emoji">${food.emoji}</span>
      <span class="food-label">${food.label}</span>
      <span class="food-count">${count > 0 ? `×${count}` : `${food.price}🪙`}</span>
    `;
    btn.onclick = () => feedPet(id);
    grid.appendChild(btn);
  });
  modal.classList.add('open');
}

function feedPet(foodId) {
  const food = FOOD_ITEMS[foodId];
  if (!food) return;
  const count = state.inventory[foodId] || 0;

  if (count > 0) {
    state.inventory[foodId]--;
  } else if (food.price > 0 && state.coins >= food.price) {
    state.coins -= food.price;
  } else { return; }

  const s = state.stats;
  s.hunger    = Math.min(100, s.hunger    + food.hunger);
  s.happiness = Math.min(100, s.happiness + food.happiness);
  s.energy    = Math.min(100, s.energy    + food.energy);

  awardXP(5);
  closeModal('feed-modal');
  triggerFeedAnimation(food.emoji);
  updateUI();
  showToast(`${state.pet.name} loved the ${food.label}! ${food.emoji}`);
  saveGame(state);
}

// ══ Bath ══
function bathPet() {
  state.stats.hygiene   = Math.min(100, state.stats.hygiene + 40);
  state.stats.happiness = Math.min(100, state.stats.happiness + 5);
  awardXP(3);
  triggerBathAnimation();
  updateUI();
  showToast(`${state.pet.name} had a nice bath! 🛁✨`);
  saveGame(state);
}

// ══ Animations ══
function triggerFeedAnimation(emoji) {
  const wrapper = document.querySelector('.home-pet-wrapper');
  const petImg  = el('home-pet-img');
  if (!wrapper) return;

  // Floating food emoji
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const float = document.createElement('span');
      float.className = 'anim-float';
      float.textContent = emoji;
      float.style.left  = (30 + Math.random() * 40) + '%';
      float.style.bottom = '10%';
      wrapper.appendChild(float);
      setTimeout(() => float.remove(), 1100);
    }, i * 180);
  }
  // Pet happy bounce
  if (petImg) {
    petImg.classList.add('pet-happy-anim');
    setTimeout(() => petImg.classList.remove('pet-happy-anim'), 700);
  }
  // Flash stat bars green
  document.querySelectorAll('.stat-fill').forEach(f => {
    f.classList.add('stat-pulse');
    setTimeout(() => f.classList.remove('stat-pulse'), 600);
  });
}

function triggerBathAnimation() {
  const wrapper = document.querySelector('.home-pet-wrapper');
  const petImg  = el('home-pet-img');
  if (!wrapper) return;

  const bubbles = ['💧','🫧','✨','💦'];
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const b = document.createElement('span');
      b.className = 'anim-bubble';
      b.textContent = bubbles[i % bubbles.length];
      b.style.left   = (10 + Math.random() * 80) + '%';
      b.style.bottom = (5  + Math.random() * 20) + '%';
      wrapper.appendChild(b);
      setTimeout(() => b.remove(), 1400);
    }, i * 120);
  }
  if (petImg) {
    petImg.classList.add('pet-spin-anim');
    setTimeout(() => petImg.classList.remove('pet-spin-anim'), 900);
  }
}

// ══ Chat ══
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
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  state.chatHistory.push({ role: 'player', text });
  addChatBubble('player', text);

  state.stats.affection = Math.min(100, state.stats.affection + 3);
  state.stats.happiness = Math.min(100, state.stats.happiness + 2);

  // Show typing indicator
  const typingId = 'typing-' + Date.now();
  addTypingIndicator(typingId);

  let response;
  try {
    // Try Abacus.ai first; falls back to template if no key or error
    response = await getAIResponse(text, state.chatHistory, state.pet, state.stats);
  } catch(e) { response = null; }

  if (!response) {
    await new Promise(r => setTimeout(r, 500 + Math.random() * 400));
    response = getChatResponse(text, state.pet, state.stats);
  }

  removeTypingIndicator(typingId);
  state.chatHistory.push({ role: 'pet', text: response });
  addChatBubble('pet', response);
  if (state.chatHistory.length > 40) state.chatHistory = state.chatHistory.slice(-40);
  awardXP(2);
  updateStatBars();
  saveGame(state);
}

function addTypingIndicator(id) {
  const log = el('chat-log');
  const row = document.createElement('div');
  row.className = 'chat-row pet-row';
  row.id = id;
  row.innerHTML = '<div class="chat-bubble pet-bubble typing-bubble"><span></span><span></span><span></span></div>';
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
}

function removeTypingIndicator(id) {
  document.getElementById(id)?.remove();
}

// ── AI Provider settings ──
function onProviderChange() {
  const provider = el('ai-provider-select')?.value || 'groq';
  const info = (typeof AI_PROVIDERS !== 'undefined' && AI_PROVIDERS[provider]) || {};

  const hintEl = el('api-provider-hint');
  if (hintEl) hintEl.textContent = info.hint || '';

  const input = el('api-key-input');
  if (input) input.placeholder = info.placeholder || 'Paste your API key here…';
}

function saveApiKey() {
  const key      = el('api-key-input')?.value?.trim();
  const provider = el('ai-provider-select')?.value || 'groq';
  if (!key) { showToast('Please paste your API key first!'); return; }
  localStorage.setItem('chatty_ai_key',      key);
  localStorage.setItem('chatty_ai_provider', provider);
  updateApiStatus();
  const names = { groq: 'Groq (Llama 3)', gemini: 'Gemini Flash', abacus: 'Abacus.ai' };
  showToast(`${names[provider] || 'AI'} connected! Your pet is now smarter 🤖✨`);
}

function clearApiKey() {
  localStorage.removeItem('chatty_ai_key');
  localStorage.removeItem('chatty_ai_provider');
  if (el('api-key-input'))       el('api-key-input').value = '';
  if (el('ai-provider-select'))  el('ai-provider-select').value = 'groq';
  onProviderChange();
  updateApiStatus();
  showToast('API key removed. Using built-in responses.');
}

function updateApiStatus() {
  const statusEl = el('api-status');
  if (!statusEl) return;
  const hasKey   = !!localStorage.getItem('chatty_ai_key');
  const provider = localStorage.getItem('chatty_ai_provider') || 'groq';
  const names    = { groq: 'Groq (Llama 3)', gemini: 'Gemini Flash', abacus: 'Abacus.ai' };
  statusEl.textContent = hasKey
    ? `🟢 Connected via ${names[provider] || provider} — real AI active`
    : '⚪ Not connected — using built-in responses';
  statusEl.style.color = hasKey ? '#5CB89A' : '#BBAACC';
}

function addChatBubble(role, text, scroll = true) {
  const log = el('chat-log');
  const row = document.createElement('div');
  row.className = 'chat-row ' + (role === 'pet' ? 'pet-row' : 'player-row');
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble ' + (role === 'pet' ? 'pet-bubble' : 'player-bubble');
  bubble.textContent = text;
  row.appendChild(bubble);
  log.appendChild(row);
  if (scroll) log.scrollTop = log.scrollHeight;
}

// ══ Mini-Games ══
function openCatchBall() {
  const overlay = el('catchball-overlay');
  overlay.classList.add('open');
  const canvas = el('catch-canvas');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  catchBallGame = new CatchBallGame();
  const petColors = ['#F4A7B9','#A8D4EC','#93D6BC','#C8A8E8','#A8D8EC'];
  const speciesIndex = SPECIES.findIndex(s => s.id === state.pet.species);
  catchBallGame.init(canvas, petColors[speciesIndex] || '#F4A7B9');
  catchBallGame.onEnd = (score, coins) => {
    state.coins += coins;
    state.stats.happiness = Math.min(100, state.stats.happiness + Math.min(score * 2, 30));
    state.stats.energy    = Math.max(0, state.stats.energy - 10);
    awardXP(score + 5);
    updateUI();
    saveGame(state);
    showGameOver(score, coins);
  };
  catchBallGame.start();
}

function showGameOver(score, coins) {
  const over = el('gameover-overlay');
  el('gameover-score').textContent = score;
  el('gameover-coins').textContent = coins;
  over.classList.add('open');
}

function closeCatchBall() {
  if (catchBallGame) { catchBallGame.stop(); catchBallGame = null; }
  el('catchball-overlay').classList.remove('open');
  el('gameover-overlay').classList.remove('open');
}

function openDressUp() {
  const overlay = el('dressup-overlay');
  overlay.classList.add('open');
  const petImg = el('dressup-pet-img');
  petImg.src = `assets/pets/${state.pet.species}.svg`;
  applyPetHue(petImg, state.pet.colorIndex);

  dressUpController = initDressUp(
    'dressup-controls',
    petImg,
    { ...state.outfit },
    (newOutfit) => {
      state.outfit = { ...newOutfit };
      updateHomeScreen();
      saveGame(state);
      showToast('Outfit saved! Looking great! ✨');
    }
  );
}

function closeDressUp() {
  el('dressup-overlay').classList.remove('open');
  dressUpController = null;
}

// ══ Memory Match ══
function openMemoryMatch() {
  showToast('Memory Match coming soon! 🃏');
}

// ══ Shop ══
const SHOP_ITEMS = {
  cake:     { ...FOOD_ITEMS.cake,     id: 'cake',    category: 'food',   qty: 1 },
  sushi:    { ...FOOD_ITEMS.sushi,    id: 'sushi',   category: 'food',   qty: 1 },
  smoothie: { ...FOOD_ITEMS.smoothie, id: 'smoothie',category: 'food',   qty: 1 },
  mystery:  { ...FOOD_ITEMS.mystery,  id: 'mystery', category: 'food',   qty: 1 },
};

function renderShop() {
  const grid = el('shop-grid');
  grid.innerHTML = '';
  Object.entries(SHOP_ITEMS).forEach(([id, item]) => {
    const card = document.createElement('div');
    card.className = 'shop-card';
    const canAfford = state.coins >= item.price;
    card.innerHTML = `
      <div class="shop-emoji">${item.emoji}</div>
      <div class="shop-name">${item.label}</div>
      <div class="shop-desc">+${item.hunger} 🍎 +${item.happiness} 😊 +${item.energy} ⚡</div>
      <button class="shop-buy ${canAfford ? '' : 'disabled'}" onclick="buyItem('${id}')">
        ${item.price} 🪙
      </button>
    `;
    grid.appendChild(card);
  });
}

function buyItem(id) {
  const item = SHOP_ITEMS[id];
  if (!item || state.coins < item.price) {
    showToast('Not enough coins! 🪙');
    return;
  }
  state.coins -= item.price;
  state.inventory[id] = (state.inventory[id] || 0) + 1;
  updateCoinDisplay();
  renderShop();
  showToast(`Bought ${item.label}! ${item.emoji} It's in your food bag!`);
  saveGame(state);
}

// ══ Profile ══
function renderProfile() {
  if (!state.pet) return;
  el('profile-name').textContent = state.pet.name;
  const s = SPECIES.find(s => s.id === state.pet.species);
  const p = PERSONALITIES.find(p => p.id === state.pet.personality);
  el('profile-species').textContent = `${s?.emoji} ${s?.label} · ${p?.emoji} ${p?.label}`;
  el('profile-level').textContent = `Level ${state.level} — ${LEVEL_NAMES[state.level] || 'Champion'}`;

  const xpNeeded = XP_PER_LEVEL[state.level] || 9999;
  const xpPercent = Math.min(100, Math.round((state.xp / xpNeeded) * 100));
  el('profile-xp-fill').style.width = xpPercent + '%';
  el('profile-xp-label').textContent = `${state.xp} / ${xpNeeded} XP`;

  el('profile-streak').textContent = `🔥 ${state.streak.count} day streak`;
  el('profile-coins').textContent = `🪙 ${state.coins} coins`;

  const petImg = el('profile-pet-img');
  if (petImg) {
    petImg.src = `assets/pets/${state.pet.species}.svg`;
    applyPetHue(petImg, state.pet.colorIndex);
  }

  // Restore saved AI settings
  const keyInput = el('api-key-input');
  if (keyInput) keyInput.value = localStorage.getItem('chatty_ai_key') || '';
  const provSel = el('ai-provider-select');
  if (provSel) provSel.value = localStorage.getItem('chatty_ai_provider') || 'groq';
  onProviderChange();
  updateApiStatus();
}

function confirmReset() {
  if (confirm(`Start over? This will erase ${state.pet.name} and all your progress.`)) {
    clearGame();
    location.reload();
  }
}

// ══ Progression ══
function awardXP(amount) {
  state.xp += amount;
  const needed = XP_PER_LEVEL[state.level] || 9999;
  if (state.xp >= needed && state.level < LEVEL_NAMES.length - 1) {
    state.level++;
    state.xp = 0;
    showToast(`🎉 ${state.pet.name} levelled up! Now a ${LEVEL_NAMES[state.level]}!`);
    state.coins += 20;
    updateUI();
  }
}

// ══ Daily Streak ══
function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function checkDailyStreak() {
  const today = todayKey();
  if (!state.streak) state.streak = { count: 0, lastLogin: null };
  if (state.streak.lastLogin === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = yesterday.toISOString().slice(0, 10);

  if (state.streak.lastLogin === yKey) {
    state.streak.count++;
  } else {
    state.streak.count = 1;
  }
  state.streak.lastLogin = today;

  const bonus = Math.min(state.streak.count * 5, 50);
  state.coins += bonus;
  saveGame(state);

  setTimeout(() => {
    showToast(`🔥 Day ${state.streak.count} streak! +${bonus} coins bonus!`);
    updateCoinDisplay();
  }, 1200);
}

// ══ Helpers ══
function el(id) { return document.getElementById(id); }
function show(id) { el(id).style.display = ''; }
function hide(id) { el(id).style.display = 'none'; }

function applyPetHue(imgEl, colorIndex) {
  const deg = HUE_ROTATIONS[colorIndex || 0];
  imgEl.style.filter = deg === 0 ? 'none' : `hue-rotate(${deg}deg)`;
}

function closeModal(id) {
  el(id).classList.remove('open');
}

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}
