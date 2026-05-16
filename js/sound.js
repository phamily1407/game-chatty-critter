// ══ Chatty Critter — Sound Engine (Web Audio API) ══
// Generates all sounds in code — no audio files needed!

let _ctx = null;

function _audio() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  return _ctx;
}

function isSoundEnabled() {
  return localStorage.getItem('chatty_sound') !== 'off';
}

function toggleSound() {
  const next = isSoundEnabled() ? 'off' : 'on';
  localStorage.setItem('chatty_sound', next);
  _updateSoundBtn();
  return next === 'on';
}

function _updateSoundBtn() {
  const btn = document.getElementById('sound-btn');
  if (btn) btn.textContent = isSoundEnabled() ? '🔊' : '🔇';
}

// Resume context on first user interaction (browser policy)
document.addEventListener('click', () => { if (_ctx && _ctx.state === 'suspended') _ctx.resume(); }, { once: false });

// ── Primitive: single tone ──
function _tone(freq, dur, type = 'sine', vol = 0.22, delay = 0) {
  if (!isSoundEnabled()) return;
  const ctx = _audio();
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
  gain.gain.setValueAtTime(0,   ctx.currentTime + delay);
  gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + delay + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + dur);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + dur + 0.05);
}

// ── Game sounds ──

// Chat bubble appears
function playChat() {
  _tone(1047, 0.12, 'sine', 0.18);
}

// Feed pet
function playFeed() {
  _tone(330, 0.1, 'triangle', 0.28);
  _tone(440, 0.14, 'triangle', 0.22, 0.09);
}

// Bath
function playBath() {
  [523, 587, 659, 698, 784].forEach((f, i) => _tone(f, 0.16, 'sine', 0.14, i * 0.055));
}

// Catch the ball
function playCatch() {
  _tone(784, 0.08, 'sine', 0.28);
  _tone(1047, 0.12, 'sine', 0.22, 0.07);
}

// Miss / bomb in catch game
function playMiss() {
  _tone(220, 0.18, 'sawtooth', 0.22);
  _tone(180, 0.25, 'sawtooth', 0.18, 0.1);
}

// Combo in catch game
function playCombo() {
  [440, 554, 659, 880].forEach((f, i) => _tone(f, 0.1, 'sine', 0.2, i * 0.055));
}

// Power-up collected
function playPowerUp() {
  [660, 784, 880, 1047].forEach((f, i) => _tone(f, 0.14, 'sine', 0.22, i * 0.065));
}

// Memory match — card flip
function playFlip() {
  _tone(440, 0.08, 'square', 0.1);
}

// Memory match — pair matched!
function playMatch() {
  _tone(784, 0.14, 'sine', 0.25);
  _tone(1047, 0.22, 'sine', 0.2, 0.1);
}

// Memory match — wrong pair
function playWrong() {
  _tone(280, 0.2, 'sawtooth', 0.18);
}

// Level-up fanfare — C E G C ascending
function playLevelUp() {
  [523, 659, 784, 1047, 1319].forEach((f, i) => _tone(f, 0.22, 'sine', 0.28, i * 0.13));
}

// Daily streak bonus
function playStreak() {
  [523, 784, 1047].forEach((f, i) => _tone(f, 0.2, 'sine', 0.25, i * 0.1));
}

// Buy item in shop
function playBuy() {
  _tone(880, 0.08, 'sine', 0.2);
  _tone(1047, 0.14, 'sine', 0.18, 0.07);
}

// Stat warning (low stat)
function playWarning() {
  _tone(330, 0.12, 'triangle', 0.18);
  _tone(280, 0.18, 'triangle', 0.15, 0.14);
}

// ── UI Interaction Sounds ──

// Generic button tap (light, non-intrusive)
function playClick() {
  _tone(700, 0.06, 'sine', 0.09);
}

// Navigation tab switch (two-note chime)
function playNavTap() {
  _tone(523, 0.06, 'sine', 0.11);
  _tone(784, 0.09, 'sine', 0.09, 0.05);
}

// Sheet / modal opens (ascending trio)
function playModalOpen() {
  _tone(392, 0.07, 'sine', 0.13);
  _tone(523, 0.09, 'sine', 0.11, 0.06);
  _tone(659, 0.11, 'sine', 0.09, 0.12);
}

// Sheet / modal closes (descending)
function playModalClose() {
  _tone(659, 0.06, 'sine', 0.11);
  _tone(392, 0.09, 'sine', 0.09, 0.06);
}

// Coins gained — louder and richer for bigger amounts
function playCoinGain(amount) {
  if (!isSoundEnabled()) return;
  if ((amount || 0) >= 50) {
    [523, 659, 784, 1047].forEach((f, i) => _tone(f, 0.16, 'sine', 0.22, i * 0.07));
  } else if ((amount || 0) >= 15) {
    [659, 784, 1047].forEach((f, i) => _tone(f, 0.13, 'sine', 0.19, i * 0.07));
  } else {
    _tone(880, 0.08, 'sine', 0.16);
    _tone(1047, 0.10, 'sine', 0.14, 0.07);
  }
}

// Stat bar fills up (soft rising chime)
function playStatFill() {
  _tone(660, 0.07, 'sine', 0.13);
  _tone(880, 0.09, 'sine', 0.10, 0.06);
}

// Can't afford / error (soft low buzz)
function playError() {
  _tone(200, 0.11, 'sawtooth', 0.13);
  _tone(165, 0.14, 'sawtooth', 0.10, 0.07);
}

// Hug the pet (warm full-chord swell)
function playHug() {
  [392, 523, 659, 784, 1047].forEach((f, i) => _tone(f, 0.22, 'sine', 0.16, i * 0.08));
}

// Pet tap reaction (quick playful ping)
function playTap() {
  _tone(880,  0.06, 'triangle', 0.14);
  _tone(1175, 0.08, 'triangle', 0.10, 0.06);
}

// Achievement unlocked (triumphant 4-note)
function playAchievement() {
  [523, 784, 1047, 1319].forEach((f, i) => _tone(f, 0.18, 'sine', 0.24, i * 0.10));
}

// Challenge completed (bright success)
function playChallengeDone() {
  [784, 1047, 1319, 1047, 1319].forEach((f, i) => _tone(f, 0.12, 'sine', 0.2, i * 0.08));
}

// Daily challenge tick (soft confirmation)
function playTick() {
  _tone(660, 0.06, 'sine', 0.12);
}

// Shop item purchased (register-style)
function playPurchase() {
  _tone(784, 0.07, 'sine', 0.18);
  _tone(1047, 0.10, 'sine', 0.16, 0.06);
  _tone(1319, 0.13, 'sine', 0.13, 0.12);
}

// Pet trick (triple-tap) — whimsical ascending run
function playTrick() {
  [523, 659, 784, 1047, 1319, 1047].forEach((f, i) => _tone(f, 0.12, 'sine', 0.2, i * 0.07));
}

// Bubble pop — soft airy pop
function playBubblePop(golden = false) {
  if (golden) {
    _tone(1047, 0.08, 'sine', 0.24);
    _tone(1319, 0.12, 'sine', 0.2, 0.06);
    _tone(1568, 0.15, 'sine', 0.16, 0.12);
  } else {
    _tone(880, 0.07, 'sine', 0.16);
  }
}

// Bubble miss — soft descending
function playBubbleMiss() {
  _tone(330, 0.12, 'triangle', 0.14);
  _tone(247, 0.15, 'triangle', 0.11, 0.08);
}

// Weekly letter open — gentle rustling
function playLetterOpen() {
  [330, 392, 440, 523].forEach((f, i) => _tone(f, 0.15, 'sine', 0.14, i * 0.08));
}
