const SAVE_KEY = 'chatty_critter_v1';

const DEFAULT_STATE = {
  pet: null,
  stats: { happiness: 80, hunger: 75, energy: 90, hygiene: 85, affection: 70 },
  coins: 50,
  xp: 0,
  level: 1,
  streak: { count: 0, lastLogin: null },
  chatHistory: [],
  outfit: { hat: null, accessory: null, bgId: 'none' },
  inventory: { apple: 3, fish: 1, cake: 0, sushi: 0, smoothie: 0 },
  shopUnlocked: {},
  lastUpdate: null
};

function saveGame(state) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...state, lastUpdate: Date.now() }));
  } catch(e) {
    console.warn('Save failed:', e);
  }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...saved };
  } catch(e) {
    return null;
  }
}

function clearGame() {
  localStorage.removeItem(SAVE_KEY);
}
