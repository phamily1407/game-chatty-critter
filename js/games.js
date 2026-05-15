// ══ Dress Up Data ══
const DRESS_UP_ITEMS = {
  hat: [
    { id: 'tophat',    emoji: '🎩', name: 'Top Hat',    top: '-28%', left: '28%', size: '3rem' },
    { id: 'crown',     emoji: '👑', name: 'Crown',      top: '-22%', left: '30%', size: '2.6rem' },
    { id: 'wizard',    emoji: '🧙', name: 'Wizard Hat', top: '-32%', left: '25%', size: '3.2rem' },
    { id: 'cowboy',    emoji: '🤠', name: 'Cowboy',     top: '-26%', left: '27%', size: '3rem' },
    { id: 'halo',      emoji: '😇', name: 'Halo',       top: '-18%', left: '32%', size: '2.2rem' },
    { id: 'cap',       emoji: '🧢', name: 'Cap',        top: '-22%', left: '28%', size: '2.8rem' },
  ],
  accessory: [
    { id: 'bow',       emoji: '🎀', name: 'Big Bow',    top: '6%',  left: '62%', size: '2rem' },
    { id: 'glasses',   emoji: '🕶️', name: 'Cool Shades',top: '26%', left: '20%', size: '2.4rem' },
    { id: 'flower',    emoji: '🌸', name: 'Flower',     top: '4%',  left: '60%', size: '1.8rem' },
    { id: 'star',      emoji: '⭐', name: 'Star Pin',   top: '44%', left: '66%', size: '1.8rem' },
    { id: 'rainbow',   emoji: '🌈', name: 'Rainbow',    top: '58%', left: '12%', size: '2.2rem' },
    { id: 'heart',     emoji: '💖', name: 'Heart',      top: '44%', left: '64%', size: '1.8rem' },
  ],
  bg: [
    { id: 'none',      emoji: '⬜', name: 'Plain',     gradient: 'linear-gradient(160deg,#FFF0F8,#F4F0FF)' },
    { id: 'sunny',     emoji: '☀️', name: 'Sunny Day', gradient: 'linear-gradient(160deg,#FFFDE0,#FFE08A)' },
    { id: 'night',     emoji: '🌙', name: 'Night Sky', gradient: 'linear-gradient(160deg,#1A1040,#3A2880)' },
    { id: 'garden',    emoji: '🌺', name: 'Garden',    gradient: 'linear-gradient(160deg,#D4F8D4,#A8E8A8)' },
    { id: 'ocean',     emoji: '🌊', name: 'Ocean',     gradient: 'linear-gradient(160deg,#D0F0FF,#80C8F0)' },
    { id: 'space',     emoji: '🚀', name: 'Space',     gradient: 'linear-gradient(160deg,#0D0828,#2A0F5C)' },
  ]
};

// ══ Catch the Ball Game ══
class CatchBallGame {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.ball = { x: 0, y: 0, vx: 0, vy: 0, r: 28 };
    this.score = 0;
    this.lives = 3;
    this.speed = 1;
    this.running = false;
    this.animId = null;
    this.onEnd = null;
    this.petColor = '#F4A7B9';
  }

  init(canvas, petColor) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.petColor = petColor || '#F4A7B9';
    canvas.addEventListener('click',      (e) => this._tap(e.clientX, e.clientY));
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this._tap(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });
  }

  start() {
    this.score = 0;
    this.lives = 3;
    this.speed = 1;
    this._resetBall();
    this.running = true;
    this._loop();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.animId);
  }

  _loop() {
    if (!this.running) return;
    this._update();
    this._draw();
    this.animId = requestAnimationFrame(() => this._loop());
  }

  _update() {
    const { canvas, ball } = this;
    ball.x += ball.vx * this.speed;
    ball.y += ball.vy * this.speed;

    if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx *= -1; }
    if (ball.x + ball.r > canvas.width) { ball.x = canvas.width - ball.r; ball.vx *= -1; }
    if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy *= -1; }

    if (ball.y - ball.r > canvas.height) {
      this.lives--;
      if (this.lives <= 0) { this._gameOver(); return; }
      this._resetBall();
    }
  }

  _draw() {
    const { canvas, ctx, ball } = this;
    // Background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#FFF0F8');
    grad.addColorStop(1, '#F4F0FF');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ball glow
    const glow = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.r * 1.8);
    glow.addColorStop(0, this.petColor + 'AA');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r * 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = this.petColor;
    ctx.shadowColor = this.petColor;
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Shine
    ctx.beginPath();
    ctx.arc(ball.x - ball.r * 0.3, ball.y - ball.r * 0.3, ball.r * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fill();

    // HUD
    ctx.fillStyle = '#3D3550';
    ctx.font = 'bold 18px Nunito, sans-serif';
    ctx.fillText(`Score: ${this.score}`, 14, 32);

    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i < this.lives ? '#F4A7B9' : '#E8E0F0';
      ctx.font = '22px Nunito';
      ctx.fillText('♥', canvas.width - 34 - i * 30, 34);
    }

    // Speed level indicator
    const lvl = Math.floor(this.score / 5) + 1;
    if (lvl > 1) {
      ctx.fillStyle = '#8878AA';
      ctx.font = 'bold 13px Nunito, sans-serif';
      ctx.fillText(`Lv.${lvl}`, 14, canvas.height - 12);
    }
  }

  _tap(clientX, clientY) {
    if (!this.running) return;
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    const dx = x - this.ball.x;
    const dy = y - this.ball.y;
    if (Math.sqrt(dx * dx + dy * dy) < this.ball.r + 24) {
      this.score++;
      this.speed = 1 + Math.floor(this.score / 5) * 0.25;
      this._resetBall();
    }
  }

  _resetBall() {
    const c = this.canvas;
    this.ball.x = 60 + Math.random() * (c.width - 120);
    this.ball.y = 60;
    this.ball.vx = (Math.random() > 0.5 ? 1 : -1) * (2.5 + Math.random() * 1.5);
    this.ball.vy = 2.5 + Math.random() * 1.5;
  }

  _gameOver() {
    this.running = false;
    cancelAnimationFrame(this.animId);
    const coins = Math.max(1, this.score * 2);
    if (typeof this.onEnd === 'function') this.onEnd(this.score, coins);
  }
}

// ══ Dress Up UI ══
function initDressUp(containerId, petImgEl, currentOutfit, onSave) {
  const container = document.getElementById(containerId);
  let outfit = { ...currentOutfit };
  let activeCategory = 'hat';

  function render() {
    container.innerHTML = '';

    // Category tabs
    const tabs = document.createElement('div');
    tabs.className = 'dressup-tabs';
    ['hat', 'accessory', 'bg'].forEach(cat => {
      const tab = document.createElement('button');
      tab.className = 'dressup-tab' + (cat === activeCategory ? ' active' : '');
      tab.textContent = cat === 'hat' ? '🎩 Hats' : cat === 'accessory' ? '✨ Extras' : '🌈 Background';
      tab.onclick = () => { activeCategory = cat; render(); };
      tabs.appendChild(tab);
    });
    container.appendChild(tabs);

    // Items
    const grid = document.createElement('div');
    grid.className = 'dressup-grid';
    DRESS_UP_ITEMS[activeCategory].forEach(item => {
      const btn = document.createElement('button');
      const equipped = outfit[activeCategory === 'bg' ? 'bgId' : activeCategory] === item.id;
      btn.className = 'dressup-item' + (equipped ? ' equipped' : '');
      btn.innerHTML = `<span class="item-emoji">${item.emoji}</span><span class="item-name">${item.name}</span>`;
      btn.onclick = () => {
        const key = activeCategory === 'bg' ? 'bgId' : activeCategory;
        outfit[key] = equipped ? (activeCategory === 'bg' ? 'none' : null) : item.id;
        applyOutfit();
        render();
      };
      grid.appendChild(btn);
    });
    container.appendChild(grid);

    // Save button
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-primary dressup-save';
    saveBtn.textContent = '💾 Save This Look!';
    saveBtn.onclick = () => { if (typeof onSave === 'function') onSave({ ...outfit }); };
    container.appendChild(saveBtn);
  }

  function applyOutfit() {
    // Hat overlay
    const hatOverlay = document.getElementById('outfit-hat');
    const accOverlay = document.getElementById('outfit-accessory');
    const petWrapper = petImgEl.closest('.dressup-pet-wrapper');

    if (hatOverlay && outfit.hat) {
      const item = DRESS_UP_ITEMS.hat.find(i => i.id === outfit.hat);
      if (item) {
        hatOverlay.textContent = item.emoji;
        hatOverlay.style.display = 'block';
        hatOverlay.style.top = item.top;
        hatOverlay.style.left = item.left;
        hatOverlay.style.fontSize = item.size;
      }
    } else if (hatOverlay) {
      hatOverlay.style.display = 'none';
    }

    if (accOverlay && outfit.accessory) {
      const item = DRESS_UP_ITEMS.accessory.find(i => i.id === outfit.accessory);
      if (item) {
        accOverlay.textContent = item.emoji;
        accOverlay.style.display = 'block';
        accOverlay.style.top = item.top;
        accOverlay.style.left = item.left;
        accOverlay.style.fontSize = item.size;
      }
    } else if (accOverlay) {
      accOverlay.style.display = 'none';
    }

    if (petWrapper && outfit.bgId) {
      const bgItem = DRESS_UP_ITEMS.bg.find(i => i.id === outfit.bgId);
      petWrapper.style.background = bgItem ? bgItem.gradient : '';
    }
  }

  render();
  applyOutfit();

  return { getOutfit: () => ({ ...outfit }), applyOutfit };
}
