# Chatty Critter 🐾

A mobile-friendly web game where you adopt a cute AI-powered virtual pet, give it a personality, and chat with it every day!

**Made by:** Hanalulu Studio  
**Status:** All 8 Milestones Complete 🎉  
**Play it:** Open `index.html` in any browser — works on phone, tablet, and desktop!

---

## How to Play

1. Double-click `index.html` to open the game in your browser
2. Create your pet — choose a species, personality, name, and color
3. Chat with it, feed it, give it a bath, and play mini-games
4. Earn coins, level up, and keep your daily streak going!

---

## What's In the Game

### 5 Pet Species
| Pet | Personality Vibe |
|-----|-----------------|
| 🐱 Cat | Clever & Mysterious |
| 🐶 Puppy | Bouncy & Loyal |
| 🐉 Dragon | Brave & Dramatic |
| 🐰 Bunny | Shy but Sweet |
| ☁️ Cloud Puff | Dreamy & Magical |

### 5 Personalities
Each pet can be **Funny**, **Brave**, **Sleepy**, **Grumpy**, or **Hyper** — with 120+ unique hand-written responses that match its mood and what you say!

### Pet Care Stats
Your pet has 5 stats that slowly go down over time:

| Stat | Icon | How to fill it |
|------|------|----------------|
| Happiness | 😊 | Chat, play games |
| Hunger | 🍎 | Feed it food |
| Energy | ⚡ | Let it rest |
| Hygiene | 🛁 | Give it a bath |
| Affection | 💖 | Say nice things |

### Mini-Games
- **🎾 Catch the Ball** — Tap the bouncing ball before it hits the ground. Gets faster! Earn 2 coins per catch.
- **👗 Dress Up** — Pick hats, accessories, and backgrounds for your pet. Saves automatically!
- **🃏 Memory Match** — Coming soon!

### Shop & Progression
- Earn 🪙 coins by playing games and logging in daily
- Buy treats in the Shop (Cake, Sushi, Smoothie, Mystery Snack)
- Gain XP from chatting, feeding, and playing
- Level up through 9 names: **Tiny Cub → Cozy Cub → Adventure Pal → Star Buddy → Super Friend → Bright Spirit → Legendary Floof → Cosmic Legend → Eternal Sparkle**
- Daily login streak gives bonus coins every day 🔥

---

## Project Structure

```
Game-Chatty-Critter/
├── index.html            ← The complete game (open this!)
├── style-guide.html      ← Colors, fonts, and pet art preview
├── GAME_SPEC.md          ← Full game design document
├── PROJECT_PLAN.md       ← 8 milestones with task checklists
├── assets/
│   ├── pets/             ← SVG artwork for all 5 pet species
│   ├── food/             ← (future food item images)
│   ├── items/            ← (future shop item images)
│   ├── icons/            ← (future UI icons)
│   └── sounds/           ← (future sound effects)
├── css/
│   └── style.css         ← All game styles (mobile-first)
└── js/
    ├── storage.js        ← Save & load game data
    ├── chat.js           ← Pet personality & response engine
    ├── games.js          ← Catch the Ball + Dress Up logic
    └── main.js           ← Core game logic & UI
```

---

## Milestone Progress

- [x] Milestone 1 — Design & Setup *(pet sketches, colors, fonts, folder structure)*
- [x] Milestone 2 — App Shell *(all 5 screens, bottom nav, mobile layout)*
- [x] Milestone 3 — Pet Creation *(5-step wizard: species → personality → name → color → preview)*
- [x] Milestone 4 — AI Chat *(personality engine, 120+ responses, mood awareness, species quirks)*
- [x] Milestone 5 — Pet Care & Stats *(5 stat bars, real-time decay, feeding, bath)*
- [x] Milestone 6 — Mini-Games *(Catch the Ball canvas game, Dress Up with items & backgrounds)*
- [x] Milestone 7 — Shop & Progression *(shop, XP/levels, 9 level names, daily streak)*
- [x] Milestone 8 — Polish & Launch *(animations, toasts, save/load, coin rewards, responsive design)*

---

## Tools Used

| Tool | Purpose |
|------|---------|
| HTML + CSS + JavaScript | The whole game — no frameworks needed! |
| Google Fonts (Nunito) | Friendly rounded font |
| Canvas API | Catch the Ball mini-game |
| localStorage | Save your pet between visits |
| SVG | Original pet artwork |

---

## What's Next (Version 2 Ideas)

- 🔊 Sound effects and background music
- ☁️ Real Claude AI responses (plug in an API key)
- 🌍 Visit other players' pets
- 🎂 Birthday and holiday events
- 🃏 Memory Match mini-game
- 📱 Install as an app on your phone (PWA)

---

*Made with love by Hanalulu Studio 🌺*  
*Created by a 9-year-old game designer with big dreams!*
