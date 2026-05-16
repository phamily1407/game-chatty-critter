// ══ Chatty Critter — Regression Test Suite ══
// Run via tests/regression.html in any browser.
// All tests are pure-logic and do not require DOM.

const T = {
  pass: 0, fail: 0, skip: 0,
  log: [],

  ok(condition, name, detail) {
    if (condition) {
      this.pass++;
      this.log.push({ status: 'pass', name });
    } else {
      this.fail++;
      this.log.push({ status: 'fail', name, detail: detail || 'assertion failed' });
    }
  },

  eq(actual, expected, name) {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    this.ok(ok, name, `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  },

  includes(arr, value, name) {
    this.ok(Array.isArray(arr) && arr.includes(value), name,
      `array does not include ${JSON.stringify(value)}`);
  },

  noThrow(fn, name) {
    try { fn(); this.pass++; this.log.push({ status: 'pass', name }); }
    catch(e) { this.fail++; this.log.push({ status: 'fail', name, detail: e.message }); }
  },

  throws(fn, name) {
    try { fn(); this.fail++; this.log.push({ status: 'fail', name, detail: 'expected throw but none occurred' }); }
    catch(e) { this.pass++; this.log.push({ status: 'pass', name }); }
  },

  section(title) {
    this.log.push({ status: 'section', name: title });
  },

  summary() {
    return { pass: this.pass, fail: this.fail, total: this.pass + this.fail + this.skip };
  }
};

// ══════════════════════════════════════════
// SECTION 1 — Date & Time utilities
// ══════════════════════════════════════════
T.section('Date & Time');

(function() {
  // todayKey must be defined in scope (from main.js or inline mock below)
  function localTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  const key = (typeof todayKey === 'function') ? todayKey() : localTodayKey();
  T.ok(/^\d{4}-\d{2}-\d{2}$/.test(key),     'todayKey() returns YYYY-MM-DD format');
  T.eq(key, localTodayKey(),                  'todayKey() matches local date (not UTC)');
})();

(function() {
  if (typeof getTimePeriod !== 'function') { T.ok(false, 'getTimePeriod() exists'); return; }
  const valid = ['dawn','morning','afternoon','evening','night'];
  const period = getTimePeriod();
  T.includes(valid, period, 'getTimePeriod() returns a valid period');
  T.ok(typeof period === 'string', 'getTimePeriod() returns a string');
})();

// ══════════════════════════════════════════
// SECTION 2 — DEFAULT_STATE completeness
// ══════════════════════════════════════════
T.section('DEFAULT_STATE');

(function() {
  if (typeof DEFAULT_STATE === 'undefined') { T.ok(false, 'DEFAULT_STATE is defined'); return; }

  const required = [
    'pet','stats','coins','xp','level','streak','chatHistory',
    'outfit','inventory','petMemories','dailyDeal','dailyChallenges',
    'friendsSince','achievements','lifetimeStats','lastLetter'
  ];
  required.forEach(field =>
    T.ok(field in DEFAULT_STATE, `DEFAULT_STATE.${field} exists`)
  );

  const outfitSlots = ['hat','accessory','wings','feet','wrap','bgId'];
  outfitSlots.forEach(s =>
    T.ok(s in DEFAULT_STATE.outfit, `DEFAULT_STATE.outfit.${s} exists`)
  );

  const foodItems = ['apple','fish','cake','sushi','smoothie','mystery','donut','croissant'];
  foodItems.forEach(item =>
    T.ok(item in DEFAULT_STATE.inventory, `DEFAULT_STATE.inventory.${item} exists`)
  );

  const lifeKeys = ['chatCount','catchCount','mmCount','shopCount','hugCount','totalCoinsEarned','outfitItemCount','trickCount','bubbleCount'];
  lifeKeys.forEach(k =>
    T.ok(k in DEFAULT_STATE.lifetimeStats, `DEFAULT_STATE.lifetimeStats.${k} exists`)
  );
})();

// ══════════════════════════════════════════
// SECTION 3 — Chat system
// ══════════════════════════════════════════
T.section('Chat System');

(function() {
  if (typeof getChatResponse !== 'function') { T.ok(false, 'getChatResponse() is defined'); return; }

  const personalities = ['funny','brave','sleepy','grumpy','hyper'];
  const messages = [
    'Hi there!', 'How are you?', 'I love you', 'feed',
    "Let's play", 'Good night', 'Thank you', 'What do you think?'
  ];
  const mockStats = { happiness: 80, hunger: 75, energy: 90, hygiene: 85, affection: 70 };

  personalities.forEach(p => {
    const mockPet = { name: 'Test', species: 'cat', personality: p };
    messages.forEach(msg => {
      const resp = getChatResponse(msg, mockPet, mockStats);
      T.ok(typeof resp === 'string' && resp.length > 0,
        `getChatResponse: ${p} + "${msg.slice(0,15)}" returns non-empty string`);
    });
  });
})();

(function() {
  if (typeof getMood !== 'function') { T.ok(false, 'getMood() is defined'); return; }
  T.eq(getMood({ happiness:80, hunger:20, energy:80, hygiene:80, affection:80 }), 'hungry', 'getMood: hunger<25 → hungry');
  T.eq(getMood({ happiness:80, hunger:80, energy:20, hygiene:80, affection:80 }), 'tired',  'getMood: energy<25 → tired');
  T.eq(getMood({ happiness:20, hunger:80, energy:80, hygiene:80, affection:80 }), 'sad',    'getMood: happiness<25 → sad');
  T.eq(getMood({ happiness:80, hunger:80, energy:80, hygiene:80, affection:80 }), 'normal', 'getMood: all good → normal');
})();

(function() {
  if (typeof RESPONSES === 'undefined') { T.ok(false, 'RESPONSES is defined'); return; }
  const personalities = ['funny','brave','sleepy','grumpy','hyper'];
  const intents = ['greeting','status','love','hunger','play','farewell','thanks','chat'];
  personalities.forEach(p => {
    T.ok(typeof RESPONSES[p] === 'object', `RESPONSES.${p} exists`);
    intents.forEach(intent =>
      T.ok(Array.isArray(RESPONSES[p]?.[intent]) && RESPONSES[p][intent].length >= 3,
        `RESPONSES.${p}.${intent} has ≥3 entries`)
    );
  });
})();

// ══════════════════════════════════════════
// SECTION 4 — Memory system
// ══════════════════════════════════════════
T.section('Memory System');

(function() {
  if (typeof extractMemory !== 'function') { T.ok(false, 'extractMemory() is defined'); return; }
  T.eq(extractMemory('I love pizza'),        'pizza',  'extractMemory finds "pizza"');
  T.eq(extractMemory('going to school'),     'school', 'extractMemory finds "school"');
  T.eq(extractMemory('cookies are tasty'),   'cookies','extractMemory finds plural "cookies"');
  T.eq(extractMemory('I am studying hard'),  'studying','extractMemory finds verb form "studying"');
  T.eq(extractMemory('nothing relevant xyz'), null,    'extractMemory returns null for unknown');
})();

// ══════════════════════════════════════════
// SECTION 5 — Level progression
// ══════════════════════════════════════════
T.section('Level Progression');

(function() {
  if (typeof XP_PER_LEVEL === 'undefined') { T.ok(false, 'XP_PER_LEVEL is defined'); return; }
  if (typeof LEVEL_NAMES  === 'undefined') { T.ok(false, 'LEVEL_NAMES is defined');  return; }

  T.ok(XP_PER_LEVEL.length >= 10,      'XP_PER_LEVEL has entries for 10 levels');
  T.ok(LEVEL_NAMES.length  >= 10,      'LEVEL_NAMES has at least 10 entries');
  T.ok(LEVEL_NAMES[0] === '',           'LEVEL_NAMES[0] is empty (level 0 unused)');

  for (let i = 1; i <= 9; i++) {
    T.ok(typeof XP_PER_LEVEL[i] === 'number' && XP_PER_LEVEL[i] > 0,
      `XP_PER_LEVEL[${i}] is a positive number`);
    T.ok(typeof LEVEL_NAMES[i] === 'string' && LEVEL_NAMES[i].length > 0,
      `LEVEL_NAMES[${i}] is a non-empty string`);
  }

  // XP should be strictly increasing
  for (let i = 2; i < XP_PER_LEVEL.length; i++) {
    T.ok(XP_PER_LEVEL[i] > XP_PER_LEVEL[i-1],
      `XP_PER_LEVEL is increasing at index ${i}`);
  }
})();

// ══════════════════════════════════════════
// SECTION 6 — Dress-Up system
// ══════════════════════════════════════════
T.section('Dress-Up System');

(function() {
  if (typeof DRESS_UP_ITEMS === 'undefined') { T.ok(false, 'DRESS_UP_ITEMS is defined'); return; }

  const requiredCats = ['hat','accessory','wings','feet','wrap','bg'];
  requiredCats.forEach(cat => {
    T.ok(Array.isArray(DRESS_UP_ITEMS[cat]) && DRESS_UP_ITEMS[cat].length >= 5,
      `DRESS_UP_ITEMS.${cat} has ≥5 items`);
  });

  // Every item must have id, emoji, name
  requiredCats.filter(c => c !== 'bg').forEach(cat => {
    DRESS_UP_ITEMS[cat].forEach(item => {
      T.ok(item.id && item.emoji && item.name && item.top && item.left && item.size,
        `DRESS_UP_ITEMS.${cat}[${item.id}] has all required fields`);
    });
  });

  // bg items need gradient
  DRESS_UP_ITEMS.bg.forEach(item =>
    T.ok(item.id && item.emoji && item.name && item.gradient,
      `DRESS_UP_ITEMS.bg[${item.id}] has gradient`)
  );

  // Duplicate ID check
  requiredCats.forEach(cat => {
    const ids = DRESS_UP_ITEMS[cat].map(i => i.id);
    T.eq(new Set(ids).size, ids.length, `DRESS_UP_ITEMS.${cat} has no duplicate IDs`);
  });
})();

(function() {
  if (typeof PET_ANCHORS === 'undefined') { T.ok(false, 'PET_ANCHORS is defined'); return; }
  if (typeof SPECIES === 'undefined')     { T.ok(false, 'SPECIES is defined'); return; }

  SPECIES.forEach(s => {
    T.ok(PET_ANCHORS[s.id] !== undefined, `PET_ANCHORS has entry for species: ${s.id}`);
    if (PET_ANCHORS[s.id]) {
      ['h','g','fa','ba','f','w','wi'].forEach(key =>
        T.ok(typeof PET_ANCHORS[s.id][key] === 'number',
          `PET_ANCHORS.${s.id}.${key} is a number`)
      );
    }
  });
})();

(function() {
  if (typeof getAdjustedTop !== 'function') { T.ok(false, 'getAdjustedTop() is defined'); return; }

  // Hat on bunny should be LOWER than hat on cat (bunny has tall ears → positive delta)
  const hatItem = DRESS_UP_ITEMS.hat[0]; // top hat
  const catTop    = parseFloat(getAdjustedTop(hatItem, 'hat', 'cat'));
  const bunnyTop  = parseFloat(getAdjustedTop(hatItem, 'hat', 'bunny'));
  const dragonTop = parseFloat(getAdjustedTop(hatItem, 'hat', 'dragon'));

  T.ok(bunnyTop  > catTop,   'Bunny hat positioned LOWER than cat (head between tall ears)');
  T.ok(dragonTop < catTop,   'Dragon hat positioned HIGHER than cat (above spines)');

  // Cloud-puff glasses should be MUCH lower than cat glasses
  const glasses = DRESS_UP_ITEMS.accessory.find(i => i.id === 'glasses');
  const catGlasses   = parseFloat(getAdjustedTop(glasses, 'accessory', 'cat'));
  const cloudGlasses = parseFloat(getAdjustedTop(glasses, 'accessory', 'cloud-puff'));
  T.ok(cloudGlasses - catGlasses >= 15, 'Cloud-puff glasses at least 15% lower than cat (eyes at 54.5%)');
})();

// ══════════════════════════════════════════
// SECTION 7 — Memory Match
// ══════════════════════════════════════════
T.section('Memory Match');

(function() {
  if (typeof MM_DIFFICULTIES === 'undefined') { T.ok(false, 'MM_DIFFICULTIES is defined'); return; }

  T.eq(MM_DIFFICULTIES.hard.cols, 6, 'Hard mode uses 6 columns (24 cards ÷ 6 = 4 rows, fits mobile)');
  T.eq(MM_DIFFICULTIES.easy.cols, 4, 'Easy mode uses 4 columns');

  Object.entries(MM_DIFFICULTIES).forEach(([name, cfg]) => {
    T.ok((cfg.pairs * 2) % cfg.cols === 0,
      `${name}: ${cfg.pairs * 2} cards divisible by ${cfg.cols} columns`);
  });
})();

// ══════════════════════════════════════════
// SECTION 8 — Challenges & Achievements
// ══════════════════════════════════════════
T.section('Challenges & Achievements');

(function() {
  if (typeof CHALLENGE_POOL === 'undefined') { T.ok(false, 'CHALLENGE_POOL is defined'); return; }

  const ids = CHALLENGE_POOL.map(c => c.id);
  T.eq(new Set(ids).size, ids.length, 'CHALLENGE_POOL has no duplicate IDs');

  CHALLENGE_POOL.forEach(c =>
    T.ok(c.id && c.text && c.target > 0 && c.reward > 0 && c.key,
      `Challenge "${c.id}" has all required fields`)
  );
})();

(function() {
  if (typeof ACHIEVEMENTS === 'undefined') { T.ok(false, 'ACHIEVEMENTS is defined'); return; }
  if (typeof DEFAULT_STATE === 'undefined') return;

  const validLifetimeKeys = [
    ...Object.keys(DEFAULT_STATE.lifetimeStats),
    'streakDays' // virtual key from state.streak.count
  ];

  ACHIEVEMENTS.forEach(a => {
    T.ok(a.id && a.icon && a.title && a.desc && a.target > 0,
      `Achievement "${a.id}" has all required fields`);
    T.ok(validLifetimeKeys.includes(a.key),
      `Achievement "${a.id}" uses valid key: ${a.key}`);
  });

  // No duplicate achievement IDs
  const ids = ACHIEVEMENTS.map(a => a.id);
  T.eq(new Set(ids).size, ids.length, 'ACHIEVEMENTS has no duplicate IDs');
})();

// ══════════════════════════════════════════
// SECTION 9 — Species & Food data
// ══════════════════════════════════════════
T.section('Species & Food Data');

(function() {
  if (typeof SPECIES === 'undefined') { T.ok(false, 'SPECIES is defined'); return; }

  T.ok(SPECIES.length === 11, `SPECIES has 11 entries (got ${SPECIES.length})`);
  SPECIES.forEach(s =>
    T.ok(s.id && s.label && s.emoji && s.trait && /^[a-z-]+$/.test(s.id),
      `Species "${s.id}" has valid fields`)
  );

  const ids = SPECIES.map(s => s.id);
  T.eq(new Set(ids).size, ids.length, 'SPECIES has no duplicate IDs');
})();

(function() {
  if (typeof FOOD_ITEMS === 'undefined') { T.ok(false, 'FOOD_ITEMS is defined'); return; }

  Object.entries(FOOD_ITEMS).forEach(([id, food]) => {
    T.ok(food.label && food.emoji, `Food "${id}" has label and emoji`);
    T.ok(food.price >= 0,          `Food "${id}" price ≥ 0`);
    T.ok(food.hunger    >= 0 &&
         food.happiness >= 0 &&
         food.energy    >= 0 &&
         food.affection >= 0,      `Food "${id}" all stat boosts ≥ 0`);
  });

  // Free foods must exist
  T.ok(FOOD_ITEMS.apple?.price === 0, 'Apple is free');
  T.ok(FOOD_ITEMS.fish?.price  === 0, 'Fish is free');
})();

// ══════════════════════════════════════════
// SECTION 10 — AI provider config
// ══════════════════════════════════════════
T.section('AI Provider Config');

(function() {
  if (typeof AI_PROVIDERS === 'undefined') { T.ok(false, 'AI_PROVIDERS is defined'); return; }

  const required = ['groq','gemini','abacus'];
  required.forEach(p => {
    T.ok(AI_PROVIDERS[p] !== undefined, `AI_PROVIDERS.${p} exists`);
    T.ok(AI_PROVIDERS[p]?.hint?.length > 0,        `AI_PROVIDERS.${p}.hint is non-empty`);
    T.ok(AI_PROVIDERS[p]?.placeholder?.length > 0, `AI_PROVIDERS.${p}.placeholder is non-empty`);
  });
})();

// ══════════════════════════════════════════
// SECTION 11 — Sound functions exist
// ══════════════════════════════════════════
T.section('Sound Functions');

(function() {
  const soundFns = [
    'playClick','playNavTap','playModalOpen','playModalClose',
    'playCoinGain','playStatFill','playError','playHug','playTap',
    'playFeed','playBath','playCatch','playMiss','playCombo',
    'playFlip','playMatch','playWrong','playLevelUp','playStreak',
    'playBuy','playWarning','playAchievement','playChallengeDone',
    'playTrick','playBubblePop','playBubbleMiss','playLetterOpen',
    'isSoundEnabled','toggleSound'
  ];
  soundFns.forEach(fn =>
    T.ok(typeof window[fn] === 'function', `${fn}() is defined`)
  );
})();

// ══════════════════════════════════════════
// SECTION 12 — Catch Ball configuration
// ══════════════════════════════════════════
T.section('Catch Ball');

(function() {
  if (typeof CatchBallGame === 'undefined') { T.ok(false, 'CatchBallGame class is defined'); return; }

  const game = new CatchBallGame();
  T.ok(typeof game.onScore === 'undefined' || game.onScore === null,
    'CatchBallGame.onScore starts null/undefined');
  T.ok(typeof game.onEnd  === 'undefined' || game.onEnd  === null,
    'CatchBallGame.onEnd starts null/undefined');
  T.ok(game.maxMiss === undefined || typeof game.maxMiss === 'number',
    'CatchBallGame: maxMiss is number or undefined');
})();

// ══════════════════════════════════════════
// RENDER RESULTS
// ══════════════════════════════════════════
window.runTests = function() {
  const summary = T.summary();
  const container = document.getElementById('test-output');
  if (!container) return summary;

  let html = `<div class="summary ${summary.fail > 0 ? 'has-fails' : 'all-pass'}">
    <strong>${summary.fail === 0 ? '✅ All ' + summary.pass + ' tests passed!' : '❌ ' + summary.fail + ' test(s) failed'}</strong>
    <span>${summary.pass} passed · ${summary.fail} failed · ${summary.total} total</span>
  </div>`;

  T.log.forEach(entry => {
    if (entry.status === 'section') {
      html += `<div class="section-header">── ${entry.name} ──</div>`;
    } else {
      const icon = entry.status === 'pass' ? '✅' : '❌';
      html += `<div class="test-row ${entry.status}">
        <span class="icon">${icon}</span>
        <span class="name">${entry.name}</span>
        ${entry.detail ? `<span class="detail">${entry.detail}</span>` : ''}
      </div>`;
    }
  });

  container.innerHTML = html;
  return summary;
};
