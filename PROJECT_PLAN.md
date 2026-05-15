# Chatty Critter — Project Plan
**Version:** 1.0  
**Date:** 2026-05-14  
**Studio:** Hanalulu Studio  
**Goal:** Launch a fun, working mobile web game that anyone can play in their browser!

---

## Big Picture Timeline

```
Month 1       Month 2       Month 3       Month 4
│             │             │             │
▼             ▼             ▼             ▼
🏗️ Build      🐾 Pet &      🎮 Games &    🚀 Polish &
Foundation    Chat          Shop          Launch!
(M1 + M2)    (M3 + M4)    (M5 + M6)    (M7 + M8)
```

---

## Milestone 1 — Project Setup & Design
**Goal:** Get everything ready before writing a single line of game code.  
**Target:** End of Week 2

### Tasks
- [ ] Draw sketches of each pet species (cat, puppy, dragon, bunny, Cloud Puff)
- [ ] Pick the color palette (pastels: mint, lavender, peach, sky blue)
- [ ] Choose fonts (rounded + friendly — look at Google Fonts)
- [ ] Set up the project folder structure
- [ ] Set up a code editor (VS Code recommended)
- [ ] Create a GitHub repository to save the project safely
- [ ] Get a Claude API key from Anthropic

### Deliverables
- [ ] Sketch sheet of all 5 pets
- [ ] Color + font style guide (1 page)
- [ ] Empty project repo on GitHub

---

## Milestone 2 — App Shell (The Empty Game Frame)
**Goal:** A working web page that looks like the game, even with no features yet.  
**Target:** End of Week 4

### Tasks
- [ ] Build the HTML structure for all 5 screens (Home, Chat, Games, Shop, Profile)
- [ ] Build the bottom navigation bar
- [ ] Make it mobile-friendly (works on 375px phone screen)
- [ ] Add placeholder pet image in the center of the Home screen
- [ ] Add placeholder stat bars (just visuals, not working yet)
- [ ] Apply the color palette and fonts from Milestone 1

### Deliverables
- [ ] App opens in a phone browser and looks like a real game
- [ ] You can tap the bottom nav to switch between screens
- [ ] No broken layouts on phone, tablet, or desktop

---

## Milestone 3 — Pet Creation Flow
**Goal:** Players can build and name their very own pet.  
**Target:** End of Week 6

### Tasks
- [ ] Build the "Create Your Pet" screen step by step:
  - [ ] Step 1: Pick a species (5 choices with cute icons)
  - [ ] Step 2: Pick a personality (5 choices)
  - [ ] Step 3: Type a name
  - [ ] Step 4: Pick a color
- [ ] Show a preview of the pet as the player builds it
- [ ] Save the pet data to browser localStorage
- [ ] On return visits, load the saved pet automatically (skip creation)
- [ ] Add a "Start Over" option in the Profile screen

### Deliverables
- [ ] Full pet creation flow works start to finish
- [ ] Pet data is saved and loaded correctly
- [ ] Returning player sees their pet, not the creation screen

---

## Milestone 4 — AI Chat System
**Goal:** The pet talks back! Using real AI powered by Claude.  
**Target:** End of Week 8

### Tasks
- [ ] Connect to the Claude API
- [ ] Write the system prompt that gives the pet its personality and species
- [ ] Build the chat UI:
  - [ ] Scrollable chat log
  - [ ] Text input at the bottom
  - [ ] Send button
  - [ ] Pet's replies shown in a speech bubble
- [ ] Include pet's current mood/stats in every AI request
- [ ] Keep last 10 messages as conversation history
- [ ] Add special trigger phrases (e.g., "Let's play" opens games)
- [ ] Handle API errors gracefully (show a cute "Oops!" message)

### Deliverables
- [ ] Player can type a message and the pet replies in its personality
- [ ] Brave dragon talks differently from a sleepy bunny
- [ ] Chat history scrolls correctly on mobile
- [ ] Game does not crash if the AI is slow or unavailable

---

## Milestone 5 — Pet Care & Stats
**Goal:** The pet needs love! Stats go up and down, mood changes.  
**Target:** End of Week 10

### Tasks
- [ ] Build the 5 stat bars: Happiness, Hunger, Energy, Hygiene, Affection
- [ ] Make stats decrease slowly over real time (use a timer)
- [ ] Build the Feeding menu:
  - [ ] 4–6 food options with names and icons
  - [ ] Feeding fills the Hunger bar
  - [ ] Pet reacts with a comment
- [ ] Connect stat levels to the pet's mood
- [ ] Change the pet's expression/animation based on mood:
  - [ ] Happy → sparkle effect
  - [ ] Hungry → droopy eyes
  - [ ] Tired → yawning
  - [ ] Sad → droopy tail
- [ ] Save stats to localStorage so they persist between visits

### Deliverables
- [ ] All 5 stats visible and updating in real time
- [ ] Feeding works and fills the Hunger bar
- [ ] Pet looks visually different when sad vs. happy
- [ ] Stats are saved when you close and reopen the game

---

## Milestone 6 — Mini-Games
**Goal:** Fun side games that earn coins and keep the pet happy.  
**Target:** End of Week 12

### Tasks
#### Mini-Game 1: Catch the Ball
- [ ] Ball bounces across screen
- [ ] Tap the ball to catch it
- [ ] Speed increases each round
- [ ] Earn coins and fill Happiness on each catch
- [ ] Game over screen with score + coin reward

#### Mini-Game 2: Dress Up
- [ ] Display the pet on a dress-up screen
- [ ] Outfit categories: tops, hats, accessories
- [ ] Start with 6+ items (more unlocked in Shop)
- [ ] Save the current outfit to localStorage

#### Coin System
- [ ] Coins earned from mini-games and daily login
- [ ] Coin total shown on the nav bar
- [ ] Coin count saved to localStorage

### Deliverables
- [ ] Both mini-games fully playable
- [ ] Coins are awarded and saved correctly
- [ ] Dress-up outfit is visible on the Home screen pet

---

## Milestone 7 — Shop & Progression
**Goal:** Something to work toward! Spend coins, level up, unlock things.  
**Target:** End of Week 14

### Tasks
#### Shop
- [ ] Build the Shop screen with categories (Food, Outfits, Decor)
- [ ] Show price in coins for each item
- [ ] Lock/unlock items based on coin balance
- [ ] Purchased items appear in the relevant menus

#### Pet Levels & XP
- [ ] Pet earns XP from chatting, feeding, and playing
- [ ] XP bar shown on Home screen
- [ ] Level-up animation and fanfare when XP fills up
- [ ] Level names: Cozy Cub → Adventure Pal → Super Friend → Legendary Floof

#### Daily Login Streak
- [ ] Detect if the player logged in today
- [ ] Show streak count with a fire emoji 🔥
- [ ] Award bonus coins for each day of the streak

### Deliverables
- [ ] Shop works end to end: browse → buy → item appears in game
- [ ] Pet levels up correctly with visible XP progress
- [ ] Daily streak tracked and rewarded

---

## Milestone 8 — Polish, Testing & Launch
**Goal:** Make it sparkle, fix the bugs, share it with the world!  
**Target:** End of Week 16

### Tasks
#### Sounds
- [ ] Add sound effects: happy squeak, nom nom, win jingle, level-up fanfare
- [ ] Add a soft background music loop
- [ ] Add a mute/unmute button

#### Animations
- [ ] Smooth bounce animation on the pet (idle loop)
- [ ] Happy dance animation triggered by "I love you"
- [ ] Sleep animation for night mode / tired state

#### Bug Fixes & Testing
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on tablet
- [ ] Fix any layout or tap-target issues
- [ ] Make sure no stats break after 24+ hours
- [ ] Check that localStorage saves work on all devices

#### Launch
- [ ] Deploy to a free hosting service (Netlify or GitHub Pages)
- [ ] Get a shareable link
- [ ] Share with friends and family to play! 🎉

### Deliverables
- [ ] Game is live at a real URL
- [ ] Works on iPhone and Android
- [ ] All sounds and animations in place
- [ ] At least 3 friends have tested it

---

## Summary Table

| # | Milestone | What Gets Built | Target |
|---|-----------|-----------------|--------|
| 1 | Setup & Design | Sketches, colors, fonts, GitHub repo | Week 2 |
| 2 | App Shell | All screens, navigation, mobile layout | Week 4 |
| 3 | Pet Creation | Species, personality, name, colors, save/load | Week 6 |
| 4 | AI Chat | Claude API, chat UI, personality prompts | Week 8 |
| 5 | Pet Care & Stats | Stat bars, feeding, moods, animations | Week 10 |
| 6 | Mini-Games | Catch the Ball, Dress Up, coin system | Week 12 |
| 7 | Shop & Progression | Shop, XP/levels, daily streak | Week 14 |
| 8 | Polish & Launch | Sounds, animations, testing, live URL | Week 16 |

---

## What You Need (Tools & Accounts)

| Tool | What It's For | Cost |
|------|---------------|------|
| VS Code | Writing the code | Free |
| GitHub | Saving the project safely | Free |
| Netlify | Putting the game online | Free |
| Claude API | Making the pet talk with AI | Pay per use (small) |
| Google Fonts | Pretty fonts | Free |
| Figma (optional) | Drawing screens before coding | Free |

---

## Risks & How to Handle Them

| Risk | How to Handle It |
|------|-----------------|
| AI chat costs too much | Limit to 20 messages per day per player |
| Game is too slow on phone | Keep images small, test early |
| Too many features at once | Finish each milestone fully before moving on |
| Saving data gets lost | Add an "export save" backup button in Profile |

---

## Version 2 Ideas (After Launch!)

Once Version 1 is live, here are fun things to add next:
- 🌍 Visit other players' pets
- 🎤 Voice input — talk to your pet out loud
- ☁️ Cloud saves with a real account login
- 🥊 Pet vs. Pet mini-game battles
- 🎂 Birthday events and seasonal holidays
- 🤝 Pet trading with friends

---

*Made with love by Hanalulu Studio. 🌺  
One milestone at a time — you've got this!*
