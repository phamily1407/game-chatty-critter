const SAVE_KEY = 'chatty_critter_v1';

const DEFAULT_STATE = {
  pet:      null,
  stats:    { happiness: 80, hunger: 75, energy: 90, hygiene: 85, affection: 70 },
  coins:    50,
  xp:       0,
  level:    1,
  streak:   { count: 0, lastLogin: null },
  chatHistory: [],
  outfit:   { hat: null, accessory: null, wings: null, feet: null, wrap: null, bgId: 'none' },
  // M1 fix: mystery: 0 added; shopUnlocked removed (was unused)
  inventory: { apple: 3, fish: 1, cake: 0, sushi: 0, smoothie: 0, mystery: 0, donut: 0, croissant: 0 },
  // M5: chat topic memories
  petMemories: [],
  // M6: daily deal tracking
  dailyDeal: { date: null, itemId: null, salePrice: 0, purchased: 0 },
  // daily challenges
  dailyChallenges: { date: null, challenges: [] },
  // achievement system
  achievements: {},        // { achievementId: true }
  lifetimeStats: {
    chatCount: 0, catchCount: 0, mmCount: 0,
    shopCount: 0, hugCount: 0, totalCoinsEarned: 0, outfitItemCount: 0,
  },
  // M2: bond/affection tracking
  friendsSince:      null,
  lastHighAffection: null,
  bondDays:          0,
  lastUpdate: null,
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
