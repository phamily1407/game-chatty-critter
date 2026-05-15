// ══ Dress Up Data ══
// Positions calibrated for 240×264px wrapper.
// Head top ≈ top:16%, eyes ≈ top:38%, body center ≈ top:72%, feet ≈ top:88%
// Center X of 240px wrapper = 120px → for a 48px emoji: left = (120-24)/240 = 40%
const DRESS_UP_ITEMS = {

  // ── 🎩 Hats (10) — sits on head, centered ──────────────────
  hat: [
    { id: 'tophat',       emoji: '🎩', name: 'Top Hat',       top: '10%', left: '37%', size: '3rem'   },
    { id: 'crown',        emoji: '👑', name: 'Crown',         top: '11%', left: '38%', size: '2.8rem' },
    { id: 'wizard',       emoji: '🪄', name: 'Wizard Hat',    top:  '6%', left: '35%', size: '3.2rem' },
    { id: 'cowboy',       emoji: '🤠', name: 'Cowboy',        top: '10%', left: '36%', size: '3rem'   },
    { id: 'halo',         emoji: '😇', name: 'Halo',          top:  '8%', left: '39%', size: '2.5rem' },
    { id: 'cap',          emoji: '🧢', name: 'Cap',           top: '12%', left: '37%', size: '2.8rem' },
    { id: 'flower-crown', emoji: '🌸', name: 'Flower Crown',  top:  '9%', left: '35%', size: '3.2rem' },
    { id: 'party-hat',    emoji: '🎉', name: 'Party Hat',     top:  '5%', left: '37%', size: '3.4rem' },
    { id: 'bunny-ears',   emoji: '🐰', name: 'Bunny Ears',    top:  '4%', left: '35%', size: '3.2rem' },
    { id: 'chef-hat',     emoji: '👨‍🍳', name: 'Chef Hat',      top:  '8%', left: '35%', size: '3rem'   },
  ],

  // ── ✨ Accessories (10) — face/body detail items ────────────
  accessory: [
    { id: 'bow',          emoji: '🎀', name: 'Big Bow',       top: '16%', left: '58%', size: '2.4rem' },
    { id: 'glasses',      emoji: '🕶️', name: 'Cool Shades',   top: '35%', left: '28%', size: '3rem'   },
    { id: 'flower-acc',   emoji: '🌺', name: 'Flower',        top: '14%', left: '56%', size: '2.2rem' },
    { id: 'star',         emoji: '⭐', name: 'Star Pin',      top: '52%', left: '62%', size: '2.2rem' },
    { id: 'rainbow-acc',  emoji: '🌈', name: 'Rainbow',       top: '62%', left: '20%', size: '2.6rem' },
    { id: 'heart',        emoji: '💖', name: 'Heart',         top: '50%', left: '60%', size: '2.2rem' },
    { id: 'monocle',      emoji: '🧐', name: 'Monocle',       top: '33%', left: '56%', size: '2.2rem' },
    { id: 'mic',          emoji: '🎤', name: 'Microphone',    top: '56%', left: '14%', size: '2.6rem' },
    { id: 'balloon',      emoji: '🎈', name: 'Balloon',       top:  '4%', left: '58%', size: '2.8rem' },
    { id: 'wand',         emoji: '🪄', name: 'Magic Wand',    top: '52%', left: '12%', size: '2.8rem' },
  ],

  // ── 🧚 Wings & Back (6) — appear behind pet (z-index: 0) ───
  wings: [
    { id: 'fairy',        emoji: '🧚', name: 'Fairy Wings',   top: '28%', left: '15%', size: '6rem',  back: true },
    { id: 'butterfly',    emoji: '🦋', name: 'Butterfly',     top: '32%', left: '18%', size: '5.5rem',back: true },
    { id: 'angel',        emoji: '👼', name: 'Angel Wings',   top: '25%', left: '12%', size: '6.5rem',back: true },
    { id: 'devil',        emoji: '😈', name: 'Devil Wings',   top: '26%', left: '14%', size: '6rem',  back: true },
    { id: 'dragon-wings', emoji: '🐲', name: 'Dragon Wings',  top: '30%', left: '10%', size: '7rem',  back: true },
    { id: 'hero-cape',    emoji: '🦸', name: 'Hero Cape',     top: '48%', left:  '8%', size: '7rem',  back: true },
  ],

  // ── 👟 Footwear (6) — bottom of pet ──────────────────────
  feet: [
    { id: 'sneakers',     emoji: '👟', name: 'Sneakers',      top: '86%', left: '28%', size: '3rem'   },
    { id: 'boots',        emoji: '🥾', name: 'Boots',         top: '86%', left: '29%', size: '3.2rem' },
    { id: 'ballet',       emoji: '🩰', name: 'Ballet',        top: '87%', left: '30%', size: '2.8rem' },
    { id: 'roller',       emoji: '🛼', name: 'Roller Skates', top: '86%', left: '27%', size: '3.2rem' },
    { id: 'flip-flops',   emoji: '🩴', name: 'Flip Flops',   top: '88%', left: '30%', size: '2.8rem' },
    { id: 'socks',        emoji: '🧦', name: 'Cozy Socks',   top: '84%', left: '28%', size: '3rem'   },
  ],

  // ── 🧣 Wraps & Body (5) — mid-body items ─────────────────
  wrap: [
    { id: 'scarf',        emoji: '🧣', name: 'Cozy Scarf',   top: '45%', left: '36%', size: '3.4rem' },
    { id: 'bow-tie',      emoji: '🎀', name: 'Bow Tie',      top: '48%', left: '40%', size: '2.6rem' },
    { id: 'lei',          emoji: '🪷', name: 'Island Lei',   top: '46%', left: '34%', size: '3.8rem' },
    { id: 'necklace',     emoji: '📿', name: 'Necklace',     top: '44%', left: '39%', size: '2.6rem' },
    { id: 'sweater',      emoji: '🧶', name: 'Knit Wrap',    top: '57%', left: '34%', size: '4.5rem' },
  ],

  // ── 🌈 Backgrounds (14) ────────────────────────────────────
  bg: [
    { id: 'none',    emoji: '⬜', name: 'Plain',          gradient: 'linear-gradient(160deg,#FFF0F8,#F4F0FF)'                    },
    { id: 'sunny',   emoji: '☀️', name: 'Sunny Day',      gradient: 'linear-gradient(160deg,#FFFDE0,#FFE08A)'                    },
    { id: 'night',   emoji: '🌙', name: 'Night Sky',      gradient: 'linear-gradient(160deg,#1A1040,#3A2880)'                    },
    { id: 'garden',  emoji: '🌷', name: 'Garden',         gradient: 'linear-gradient(160deg,#D4F8D4,#A8E8A8)'                    },
    { id: 'ocean',   emoji: '🌊', name: 'Ocean',          gradient: 'linear-gradient(160deg,#D0F0FF,#80C8F0)'                    },
    { id: 'space',   emoji: '🚀', name: 'Space',          gradient: 'linear-gradient(160deg,#0D0828,#2A0F5C)'                    },
    { id: 'autumn',  emoji: '🍂', name: 'Autumn',         gradient: 'linear-gradient(160deg,#FFD4A3,#E8A852)'                    },
    { id: 'sunset',  emoji: '🌅', name: 'Sunset',         gradient: 'linear-gradient(160deg,#FF7E5F,#FEB462)'                    },
    { id: 'rainbow', emoji: '🌈', name: 'Rainbow',        gradient: 'linear-gradient(135deg,#FFB3C6,#FFD4A3,#FFFF9A,#C3F7C3,#A3D8FF,#D4A8F0)' },
    { id: 'snow',    emoji: '❄️', name: 'Snowy',          gradient: 'linear-gradient(160deg,#E8F4FF,#FFFFFF)'                    },
    { id: 'sakura',  emoji: '🌸', name: 'Cherry Blossom', gradient: 'linear-gradient(160deg,#FFD6E8,#FFB3D9)'                    },
    { id: 'volcano', emoji: '🌋', name: 'Volcano',        gradient: 'linear-gradient(160deg,#4A0000,#8B1A1A)'                    },
    { id: 'beach',   emoji: '🏖️', name: 'Beach',          gradient: 'linear-gradient(180deg,#87CEEB 0%,#87CEEB 45%,#F4D03F 45%,#F5CBA7 100%)' },
    { id: 'clouds',  emoji: '☁️', name: 'Cloud Kingdom',  gradient: 'linear-gradient(160deg,#C8E6F5,#F0F8FF)'                    },
  ],
};

// Category config — tab label, icon, outfit key
const DRESSUP_CATEGORIES = [
  { key: 'hat',       label: 'Hats',       icon: '🎩', outfitKey: 'hat'       },
  { key: 'accessory', label: 'Extras',     icon: '✨', outfitKey: 'accessory' },
  { key: 'wings',     label: 'Wings',      icon: '🧚', outfitKey: 'wings'     },
  { key: 'feet',      label: 'Footwear',   icon: '👟', outfitKey: 'feet'      },
  { key: 'wrap',      label: 'Wraps',      icon: '🧣', outfitKey: 'wrap'      },
  { key: 'bg',        label: 'Background', icon: '🌈', outfitKey: 'bgId'      },
];

// ══ Dress Up ══
function initDressUp(containerId, _petImgEl, currentOutfit, onSave) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  // Normalise outfit — include all slots
  let outfit = {
    hat:       currentOutfit.hat       || null,
    accessory: currentOutfit.accessory || null,
    wings:     currentOutfit.wings     || null,
    feet:      currentOutfit.feet      || null,
    wrap:      currentOutfit.wrap      || null,
    bgId:      currentOutfit.bgId      || 'none',
  };
  let activeCategory = 'hat';

  // ── Apply outfit to all overlay spans ──────────────────────
  function applyOverlay(spanId, items, currentId) {
    const span = document.getElementById(spanId);
    if (!span) return;
    const item = items.find(i => i.id === currentId);
    if (item) {
      Object.assign(span.style, {
        display: 'block', top: item.top, left: item.left, fontSize: item.size,
        zIndex: item.back ? '0' : '3',
      });
      span.textContent = item.emoji;
    } else {
      span.style.display = 'none';
    }
  }

  function applyOutfit() {
    applyOverlay('dressup-hat',       DRESS_UP_ITEMS.hat,       outfit.hat);
    applyOverlay('dressup-accessory', DRESS_UP_ITEMS.accessory, outfit.accessory);
    applyOverlay('dressup-wings',     DRESS_UP_ITEMS.wings,     outfit.wings);
    applyOverlay('dressup-feet',      DRESS_UP_ITEMS.feet,      outfit.feet);
    applyOverlay('dressup-wrap',      DRESS_UP_ITEMS.wrap,      outfit.wrap);

    // Background
    const wrapper = document.getElementById('dressup-pet-wrapper');
    if (wrapper) {
      const bg = DRESS_UP_ITEMS.bg.find(i => i.id === outfit.bgId) || DRESS_UP_ITEMS.bg[0];
      wrapper.style.background = bg.gradient;
    }
  }

  // ── Render controls ────────────────────────────────────────
  function render() {
    container.innerHTML = '';

    // Scrollable tab row
    const tabRow = document.createElement('div');
    tabRow.className = 'dressup-tabs';
    DRESSUP_CATEGORIES.forEach(cat => {
      const tab = document.createElement('button');
      tab.className = 'dressup-tab' + (cat.key === activeCategory ? ' active' : '');
      tab.innerHTML = `<span>${cat.icon}</span><span>${cat.label}</span>`;
      tab.onclick = () => { activeCategory = cat.key; render(); };
      tabRow.appendChild(tab);
    });
    container.appendChild(tabRow);

    // Item grid
    const catCfg = DRESSUP_CATEGORIES.find(c => c.key === activeCategory);
    const items  = DRESS_UP_ITEMS[activeCategory] || [];
    const outfitKey = catCfg.outfitKey;

    const grid = document.createElement('div');
    grid.className = 'dressup-grid';
    items.forEach(item => {
      const isEquipped = outfit[outfitKey] === item.id;
      const btn = document.createElement('button');
      btn.className = 'dressup-item' + (isEquipped ? ' equipped' : '');
      btn.title = item.name;
      btn.innerHTML = `<span class="item-emoji">${item.emoji}</span><span class="item-name">${item.name}</span>`;
      btn.onclick = () => {
        outfit[outfitKey] = isEquipped
          ? (activeCategory === 'bg' ? 'none' : null)
          : item.id;
        applyOutfit();
        render();
      };
      grid.appendChild(btn);
    });
    container.appendChild(grid);

    // Bottom action row
    const actions = document.createElement('div');
    actions.className = 'dressup-actions';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-primary dressup-save';
    saveBtn.textContent = '💾 Save Look!';
    saveBtn.onclick = () => { if (typeof onSave === 'function') onSave({ ...outfit }); };

    const clearBtn = document.createElement('button');
    clearBtn.className = 'dressup-clear-btn';
    clearBtn.textContent = '🗑️ Clear All';
    clearBtn.onclick = () => {
      outfit = { hat: null, accessory: null, wings: null, feet: null, wrap: null, bgId: 'none' };
      applyOutfit();
      render();
    };

    actions.appendChild(saveBtn);
    actions.appendChild(clearBtn);
    container.appendChild(actions);
  }

  applyOutfit();
  render();
  return { getOutfit: () => ({ ...outfit }), applyOutfit };
}


// ══ Catch the Ball — Enhanced ══
class CatchBallGame {
  constructor() {
    this.canvas  = null;
    this.ctx     = null;
    this.balls   = [];
    this.powerUp = null;       // active power-up object on screen
    this.activePower = null;   // currently buffed power name
    this.activePowerTimer = 0;
    this.particles = [];
    this.popTexts  = [];       // floating score/combo text
    this.score    = 0;
    this.lives    = 3;
    this.combo    = 0;
    this.level    = 1;
    this.running  = false;
    this.animId   = null;
    this.onEnd    = null;
    this.petColor = '#F4A7B9';
    this._lastPowerSpawn = 0;
    this._frameCount = 0;
  }

  init(canvas, petColor) {
    this.canvas   = canvas;
    this.ctx      = canvas.getContext('2d');
    this.petColor = petColor || '#F4A7B9';
    canvas.addEventListener('click',      e => this._tap(e.clientX, e.clientY));
    canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      this._tap(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });
  }

  start() {
    this.score  = 0; this.lives = 3; this.combo = 0;
    this.level  = 1; this.balls = []; this.particles = [];
    this.popTexts = []; this.powerUp = null; this.activePower = null;
    this._frameCount = 0; this._lastPowerSpawn = 0;
    this._spawnBall();
    this.running = true;
    this._loop();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.animId);
  }

  _baseSpeed() { return 1 + (this.level - 1) * 0.28; }

  _spawnBall(type = 'normal') {
    const c = this.canvas;
    const r = type === 'power' ? 22 : 28;
    const spd = this._baseSpeed();
    this.balls.push({
      x:    r + Math.random() * (c.width  - r * 2),
      y:    r,
      vx:   (Math.random() > 0.5 ? 1 : -1) * (2.5 + Math.random() * 1.5) * spd,
      vy:   (2.5 + Math.random() * 1.5) * spd,
      r,
      type, // normal | golden | bomb | power
      age:  0,
    });
  }

  _loop() {
    if (!this.running) return;
    this._frameCount++;
    this._update();
    this._draw();
    this.animId = requestAnimationFrame(() => this._loop());
  }

  _update() {
    const c = this.canvas;

    // Spawn power-up ball every ~10 seconds
    if (this._frameCount - this._lastPowerSpawn > 600 && this.balls.every(b => b.type !== 'power')) {
      this._lastPowerSpawn = this._frameCount;
      this._spawnBall('power');
    }

    // Spawn golden ball every 8 score
    if (this.score > 0 && this.score % 8 === 0 && this.balls.every(b => b.type !== 'golden') && this._frameCount % 10 === 0) {
      this._spawnBall('golden');
    }

    // Spawn bomb ball from level 6 (W1 balance fix)
    if (this.level >= 6 && this.balls.every(b => b.type !== 'bomb') && this._frameCount % 400 === 0) {
      this._spawnBall('bomb');
    }

    // Add second ball at level 8
    const maxBalls = this.level >= 12 ? 3 : this.level >= 8 ? 2 : 1;
    const normalBalls = this.balls.filter(b => b.type === 'normal').length;
    if (normalBalls < maxBalls) this._spawnBall('normal');

    // Update balls
    const slowFactor = this.activePower === 'slow' ? 0.45 : 1;
    this.balls = this.balls.filter(ball => {
      ball.x += ball.vx * slowFactor;
      ball.y += ball.vy * slowFactor;
      ball.age++;

      if (ball.x - ball.r < 0)    { ball.x = ball.r;           ball.vx *= -1; }
      if (ball.x + ball.r > c.width) { ball.x = c.width - ball.r; ball.vx *= -1; }
      if (ball.y - ball.r < 0)    { ball.y = ball.r;           ball.vy *= -1; }

      if (ball.y - ball.r > c.height) {
        if (ball.type !== 'power') {  // power-up balls just disappear silently
          this.lives--;
          this.combo = 0;
          this._shakeScreen();
          if (this.lives <= 0) { this._gameOver(); return false; }
        }
        return false;
      }
      return true;
    });

    // Active power timer
    if (this.activePower && this._frameCount > this.activePowerTimer) {
      this.activePower = null;
    }

    // Particles
    this.particles = this.particles.filter(p => {
      p.x += p.vx; p.y += p.vy; p.alpha -= 0.04; p.r -= 0.15;
      return p.alpha > 0 && p.r > 0;
    });

    // Pop texts
    this.popTexts = this.popTexts.filter(t => {
      t.y -= 1.5; t.alpha -= 0.025;
      return t.alpha > 0;
    });

    // Level up every 5 catches
    // W1 fix: level every 8 catches (was 5) — less punishing for casual players
    const newLevel = Math.max(1, Math.floor(this.score / 8) + 1);
    if (newLevel > this.level) {
      this.level = newLevel;
      this._addPopText(`LEVEL ${this.level}! 🎉`, c.width / 2, c.height / 2, '#FFD700', 28);
    }
  }

  _draw() {
    const { canvas: c, ctx } = this;
    ctx.clearRect(0, 0, c.width, c.height);

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, 0, c.height);
    bg.addColorStop(0, '#FFF0F8'); bg.addColorStop(1, '#F0EEF8');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height);

    // Level stripe at top
    const lvlGrad = ctx.createLinearGradient(0, 0, c.width, 0);
    lvlGrad.addColorStop(0, this.petColor + '44');
    lvlGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = lvlGrad;
    ctx.fillRect(0, 0, c.width, 44);

    // Draw balls
    this.balls.forEach(ball => {
      const ballColor = {
        normal: this.petColor,
        golden: '#FFD700',
        bomb:   '#FF4444',
        power:  '#A8F0D8',
      }[ball.type] || this.petColor;

      // Glow
      const glow = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.r * 2);
      glow.addColorStop(0, ballColor + '55'); glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r * 2, 0, Math.PI * 2); ctx.fill();

      // Ball
      ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fillStyle = ballColor;
      ctx.shadowColor = ballColor; ctx.shadowBlur = 14;
      ctx.fill(); ctx.shadowBlur = 0;

      // Shine
      ctx.beginPath(); ctx.arc(ball.x - ball.r * 0.3, ball.y - ball.r * 0.3, ball.r * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.fill();

      // Label emoji on special balls
      if (ball.type !== 'normal') {
        ctx.font = `${ball.r * 0.9}px Nunito`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        const labels = { golden:'⭐', bomb:'💣', power:'⚡' };
        ctx.fillText(labels[ball.type] || '', ball.x, ball.y);
      }
    });

    // Particles
    this.particles.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2,'0');
      ctx.fill();
    });

    // Pop texts
    ctx.textAlign = 'center';
    this.popTexts.forEach(t => {
      ctx.globalAlpha = t.alpha;
      ctx.font = `bold ${t.size}px Nunito, sans-serif`;
      ctx.fillStyle = t.color;
      ctx.strokeStyle = 'white'; ctx.lineWidth = 3;
      ctx.strokeText(t.text, t.x, t.y);
      ctx.fillText(t.text, t.x, t.y);
    });
    ctx.globalAlpha = 1;

    // HUD
    ctx.textAlign = 'left';
    ctx.fillStyle = '#3D3550';
    ctx.font = 'bold 18px Nunito, sans-serif';
    ctx.fillText(`Score: ${this.score}`, 14, 28);

    // Combo
    if (this.combo >= 3) {
      const mult = this._comboMult();
      ctx.fillStyle = '#FFD700';
      ctx.font = `bold 15px Nunito, sans-serif`;
      ctx.fillText(`🔥 COMBO x${mult}`, 14, 46);
    }

    // Lives
    ctx.font = '22px Nunito';
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i < this.lives ? '#F4A7B9' : '#DDD0E8';
      ctx.fillText('♥', c.width - 38 - i * 30, 30);
    }

    // Level & power badge
    ctx.textAlign = 'right';
    ctx.fillStyle = '#8878AA';
    ctx.font = 'bold 13px Nunito, sans-serif';
    ctx.fillText(`Lv.${this.level}`, c.width - 10, c.height - 12);

    if (this.activePower === 'slow') {
      ctx.fillStyle = '#A8F0D8';
      ctx.font = 'bold 13px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⏱️ SLOW', c.width / 2, c.height - 12);
    }
    if (this.activePower === 'star') {
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 13px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⭐ 3x POINTS', c.width / 2, c.height - 12);
    }
    ctx.textAlign = 'left';
  }

  _tap(clientX, clientY) {
    if (!this.running) return;
    const rect = this.canvas.getBoundingClientRect();
    const sx = this.canvas.width  / rect.width;
    const sy = this.canvas.height / rect.height;
    const x  = (clientX - rect.left) * sx;
    const y  = (clientY - rect.top)  * sy;

    let caught = false;
    this.balls = this.balls.filter(ball => {
      const d = Math.hypot(x - ball.x, y - ball.y);
      if (d > ball.r + 24) return true; // miss

      // BOMB — lose a life
      if (ball.type === 'bomb') {
        this.lives--;
        this._shakeScreen();
        this._addPopText('💣 OUCH!', ball.x, ball.y - 20, '#FF4444', 22);
        this.combo = 0;
        if (this.lives <= 0) this._gameOver();
        this._spawnParticles(ball.x, ball.y, '#FF4444');
        return false;
      }

      // POWER-UP
      if (ball.type === 'power') {
        const powers = ['slow', 'star', 'life'];
        const p = powers[Math.floor(Math.random() * powers.length)];
        if (p === 'life') {
          this.lives = Math.min(5, this.lives + 1);
          this._addPopText('❤️ +1 Life!', ball.x, ball.y - 20, '#F4A7B9', 22);
        } else if (p === 'slow') {
          this.activePower = 'slow';
          this.activePowerTimer = this._frameCount + 300;
          this._addPopText('⏱️ SLOW!', ball.x, ball.y - 20, '#A8F0D8', 22);
        } else {
          this.activePower = 'star';
          this.activePowerTimer = this._frameCount + 480;
          this._addPopText('⭐ 3x POINTS!', ball.x, ball.y - 20, '#FFD700', 22);
        }
        this._spawnParticles(ball.x, ball.y, '#A8F0D8');
        return false;
      }

      // NORMAL or GOLDEN
      this.combo++;
      const mult  = this.activePower === 'star' ? 3 : this._comboMult();
      const pts   = (ball.type === 'golden' ? 3 : 1) * mult;
      this.score += pts;
      caught = true;

      const label = pts > 1 ? `+${pts} 🌟` : `+${pts}`;
      this._addPopText(label, ball.x, ball.y - 20, ball.type === 'golden' ? '#FFD700' : this.petColor, 20);
      if (this.combo === 3) this._addPopText('🔥 COMBO!',   this.canvas.width/2, 80, '#FF9900', 26);
      if (this.combo === 5) this._addPopText('🔥🔥 HOT!',   this.canvas.width/2, 80, '#FF6600', 28);
      if (this.combo === 10) this._addPopText('🌟 UNSTOPPABLE!', this.canvas.width/2, 80, '#FFD700', 30);

      this._spawnParticles(ball.x, ball.y, ball.type === 'golden' ? '#FFD700' : this.petColor);
      return false;
    });

    if (!caught && !this.balls.some(b => Math.hypot(x - b.x, y - b.y) <= b.r + 24)) {
      // Missed tap — small penaltycombo reset only if off by a lot
    }
  }

  _comboMult() {
    if (this.combo >= 10) return 5;
    if (this.combo >= 5)  return 3;
    if (this.combo >= 3)  return 2;
    return 1;
  }

  _spawnParticles(x, y, color) {
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      const spd   = 2 + Math.random() * 3;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        r:  4 + Math.random() * 4,
        alpha: 1,
        color: color.replace('#',''),
      });
    }
  }

  _addPopText(text, x, y, color, size = 20) {
    this.popTexts.push({ text, x, y, color, size, alpha: 1 });
  }

  _shakeScreen() {
    const c = this.canvas;
    let t = 0;
    const shake = () => {
      c.style.transform = `translate(${(Math.random()-0.5)*8}px,${(Math.random()-0.5)*6}px)`;
      if (++t < 8) requestAnimationFrame(shake);
      else c.style.transform = '';
    };
    shake();
  }

  _gameOver() {
    this.running = false;
    cancelAnimationFrame(this.animId);
    const coins = Math.max(1, this.score * 2);
    if (typeof this.onEnd === 'function') this.onEnd(this.score, coins);
  }
}


// ══ Memory Match Game ══
const MM_EMOJIS = ['🐱','🐶','🐉','🐰','☁️','🦊','🐧','🐼','🐇','🦘','🦜','🌸'];

// B3 fix: hard mode 24 cards needs 6 cols (4 rows), not 4 cols (6 rows overflows mobile)
const MM_DIFFICULTIES = {
  easy:   { pairs: 4,  cols: 4, label: 'Easy',   coinPer: 3,  xpPer: 2  },
  normal: { pairs: 8,  cols: 4, label: 'Normal',  coinPer: 5,  xpPer: 4  },
  hard:   { pairs: 12, cols: 6, label: 'Hard',    coinPer: 8,  xpPer: 6  },
};

class MemoryMatchGame {
  constructor() {
    this.cards      = [];
    this.flipped    = [];   // indices of face-up unmatched cards (max 2)
    this.matched    = new Set();
    this.moves      = 0;
    this.score      = 0;
    this.locked     = false;
    this.difficulty = 'normal';
    this.container  = null;
    this.startTime  = null;
    this.onEnd      = null;
  }

  init(containerId, difficulty = 'normal') {
    this.container  = document.getElementById(containerId);
    this.difficulty = MM_DIFFICULTIES[difficulty] ? difficulty : 'normal';
  }

  start() {
    this.cards   = [];
    this.flipped = [];
    this.matched = new Set();
    this.moves   = 0;
    this.score   = 0;
    this.locked  = false;
    this.startTime = Date.now();
    this._build();
  }

  _build() {
    const cfg    = MM_DIFFICULTIES[this.difficulty];
    const emojis = MM_EMOJIS.slice(0, cfg.pairs);
    this.cards   = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji }));
    this._render();
  }

  _render() {
    if (!this.container) return;
    const cfg = MM_DIFFICULTIES[this.difficulty];
    this.container.innerHTML = '';

    // Info bar
    const bar = document.createElement('div');
    bar.className = 'mm-bar';
    bar.innerHTML = `
      <span>🎯 Moves: <strong>${this.moves}</strong></span>
      <span>✅ Pairs: <strong>${this.matched.size / 2}</strong> / ${cfg.pairs}</span>
      <span>⭐ Score: <strong>${this.score}</strong></span>`;
    this.container.appendChild(bar);

    // Grid
    const grid = document.createElement('div');
    grid.className = 'mm-grid';
    grid.style.gridTemplateColumns = `repeat(${cfg.cols}, 1fr)`;

    this.cards.forEach((card, i) => {
      const isFlipped  = this.flipped.includes(i);
      const isMatched  = this.matched.has(i);
      const btn        = document.createElement('button');
      btn.className    = 'mm-card' + (isFlipped || isMatched ? ' mm-flipped' : '') + (isMatched ? ' mm-matched' : '');
      btn.setAttribute('aria-label', isFlipped || isMatched ? card.emoji : 'hidden card');
      btn.innerHTML    = `
        <div class="mm-inner">
          <div class="mm-back">🐾</div>
          <div class="mm-front">${card.emoji}</div>
        </div>`;
      btn.onclick = () => this._tap(i);
      grid.appendChild(btn);
    });
    this.container.appendChild(grid);
  }

  _tap(i) {
    if (this.locked)           return;
    if (this.matched.has(i))   return;
    if (this.flipped.includes(i)) return;
    if (this.flipped.length >= 2) return;

    if (typeof playFlip === 'function') playFlip();
    this.flipped.push(i);
    this._render();

    if (this.flipped.length === 2) {
      this.moves++;
      this.locked = true;
      setTimeout(() => this._check(), 900);
    }
  }

  _check() {
    const [a, b] = this.flipped;
    if (this.cards[a].emoji === this.cards[b].emoji) {
      this.matched.add(a);
      this.matched.add(b);
      const cfg = MM_DIFFICULTIES[this.difficulty];
      this.score += cfg.coinPer;
      if (typeof playMatch === 'function') playMatch();
    } else {
      if (typeof playWrong === 'function') playWrong();
    }
    this.flipped = [];
    this.locked  = false;
    this._render();

    if (this.matched.size === this.cards.length) {
      setTimeout(() => this._complete(), 400);
    }
  }

  _complete() {
    const cfg     = MM_DIFFICULTIES[this.difficulty];
    const elapsed = Math.round((Date.now() - this.startTime) / 1000);
    const coins   = this.score;
    const xp      = cfg.pairs * cfg.xpPer;
    if (typeof this.onEnd === 'function') this.onEnd(this.score, coins, xp, this.moves, elapsed);
  }
}
