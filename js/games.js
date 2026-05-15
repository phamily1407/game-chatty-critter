// ══ Dress Up Data ══
const DRESS_UP_ITEMS = {
  hat: [
    { id: 'tophat',    emoji: '🎩', name: 'Top Hat',    top: '8%',  left: '28%', size: '2.8rem' },
    { id: 'crown',     emoji: '👑', name: 'Crown',      top: '9%',  left: '30%', size: '2.5rem' },
    { id: 'wizard',    emoji: '🪄', name: 'Wizard Hat', top: '5%',  left: '25%', size: '3rem'   },
    { id: 'cowboy',    emoji: '🤠', name: 'Cowboy',     top: '8%',  left: '27%', size: '2.8rem' },
    { id: 'halo',      emoji: '😇', name: 'Halo',       top: '10%', left: '32%', size: '2.2rem' },
    { id: 'cap',       emoji: '🧢', name: 'Cap',        top: '10%', left: '28%', size: '2.6rem' },
  ],
  accessory: [
    { id: 'bow',       emoji: '🎀', name: 'Big Bow',    top: '14%', left: '62%', size: '2rem'   },
    { id: 'glasses',   emoji: '🕶️', name: 'Cool Shades',top: '30%', left: '22%', size: '2.4rem' },
    { id: 'flower',    emoji: '🌸', name: 'Flower',     top: '12%', left: '60%', size: '1.8rem' },
    { id: 'star',      emoji: '⭐', name: 'Star Pin',   top: '50%', left: '65%', size: '1.8rem' },
    { id: 'rainbow',   emoji: '🌈', name: 'Rainbow',    top: '60%', left: '10%', size: '2.2rem' },
    { id: 'heart',     emoji: '💖', name: 'Heart',      top: '48%', left: '63%', size: '1.8rem' },
  ],
  bg: [
    { id: 'none',   emoji: '⬜', name: 'Plain',    gradient: 'linear-gradient(160deg,#FFF0F8,#F4F0FF)'  },
    { id: 'sunny',  emoji: '☀️', name: 'Sunny Day', gradient: 'linear-gradient(160deg,#FFFDE0,#FFE08A)'  },
    { id: 'night',  emoji: '🌙', name: 'Night Sky', gradient: 'linear-gradient(160deg,#1A1040,#3A2880)'  },
    { id: 'garden', emoji: '🌺', name: 'Garden',    gradient: 'linear-gradient(160deg,#D4F8D4,#A8E8A8)'  },
    { id: 'ocean',  emoji: '🌊', name: 'Ocean',     gradient: 'linear-gradient(160deg,#D0F0FF,#80C8F0)'  },
    { id: 'space',  emoji: '🚀', name: 'Space',     gradient: 'linear-gradient(160deg,#0D0828,#2A0F5C)'  },
  ]
};

// ══ Dress Up ══
function initDressUp(containerId, _petImgEl, currentOutfit, onSave) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  let outfit = {
    hat:       currentOutfit.hat       || null,
    accessory: currentOutfit.accessory || null,
    bgId:      currentOutfit.bgId      || 'none',
  };
  let activeCategory = 'hat';

  function getOverlayEls() {
    return {
      hatEl:     document.getElementById('dressup-hat'),
      accEl:     document.getElementById('dressup-accessory'),
      wrapperEl: document.getElementById('dressup-pet-wrapper'),
    };
  }

  function applyOutfit() {
    const { hatEl, accEl, wrapperEl } = getOverlayEls();

    // Hat
    if (hatEl) {
      const item = DRESS_UP_ITEMS.hat.find(i => i.id === outfit.hat);
      if (item) {
        Object.assign(hatEl.style, {
          display: 'block', top: item.top, left: item.left, fontSize: item.size
        });
        hatEl.textContent = item.emoji;
      } else {
        hatEl.style.display = 'none';
      }
    }

    // Accessory
    if (accEl) {
      const item = DRESS_UP_ITEMS.accessory.find(i => i.id === outfit.accessory);
      if (item) {
        Object.assign(accEl.style, {
          display: 'block', top: item.top, left: item.left, fontSize: item.size
        });
        accEl.textContent = item.emoji;
      } else {
        accEl.style.display = 'none';
      }
    }

    // Background
    if (wrapperEl) {
      const bgItem = DRESS_UP_ITEMS.bg.find(i => i.id === outfit.bgId) || DRESS_UP_ITEMS.bg[0];
      wrapperEl.style.background = bgItem.gradient;
    }
  }

  function render() {
    container.innerHTML = '';

    // Category tabs
    const tabs = document.createElement('div');
    tabs.className = 'dressup-tabs';
    [['hat','🎩 Hats'], ['accessory','✨ Extras'], ['bg','🌈 Backgrounds']].forEach(([cat, label]) => {
      const tab = document.createElement('button');
      tab.className = 'dressup-tab' + (cat === activeCategory ? ' active' : '');
      tab.textContent = label;
      tab.onclick = () => { activeCategory = cat; render(); };
      tabs.appendChild(tab);
    });
    container.appendChild(tabs);

    // Item grid
    const grid = document.createElement('div');
    grid.className = 'dressup-grid';
    DRESS_UP_ITEMS[activeCategory].forEach(item => {
      const key = activeCategory === 'bg' ? 'bgId' : activeCategory;
      const isEquipped = outfit[key] === item.id;
      const btn = document.createElement('button');
      btn.className = 'dressup-item' + (isEquipped ? ' equipped' : '');
      btn.innerHTML = `<span class="item-emoji">${item.emoji}</span><span class="item-name">${item.name}</span>`;
      btn.onclick = () => {
        // Toggle off if already equipped; 'none' is always the unequip value for bg
        if (isEquipped) {
          outfit[key] = activeCategory === 'bg' ? 'none' : null;
        } else {
          outfit[key] = item.id;
        }
        applyOutfit();
        render();
      };
      grid.appendChild(btn);
    });
    container.appendChild(grid);

    // Action buttons
    const btns = document.createElement('div');
    btns.style.cssText = 'display:flex;gap:10px;margin-top:8px;';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-primary dressup-save';
    saveBtn.style.flex = '1';
    saveBtn.textContent = '💾 Save Look!';
    saveBtn.onclick = () => {
      if (typeof onSave === 'function') onSave({ ...outfit });
    };

    const clearBtn = document.createElement('button');
    clearBtn.style.cssText = 'flex:1;padding:10px;border-radius:50px;font-family:var(--font);font-size:14px;font-weight:800;color:var(--mauve);background:var(--mauve-ll);border:none;cursor:pointer;';
    clearBtn.textContent = '🗑️ Clear All';
    clearBtn.onclick = () => {
      outfit = { hat: null, accessory: null, bgId: 'none' };
      applyOutfit();
      render();
    };

    btns.appendChild(saveBtn);
    btns.appendChild(clearBtn);
    container.appendChild(btns);
  }

  // Init: apply current outfit then render controls
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

    // Spawn bomb ball from level 5
    if (this.level >= 5 && this.balls.every(b => b.type !== 'bomb') && this._frameCount % 400 === 0) {
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
    const newLevel = Math.max(1, Math.floor(this.score / 5) + 1);
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
