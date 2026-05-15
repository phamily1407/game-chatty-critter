# Chatty Critter — Game Specification
**Version:** 1.0  
**Date:** 2026-05-14  
**Creator:** Ben (age 9!)  
**Studio:** Hanalulu Studio

---

## 1. What Is Chatty Critter?

Chatty Critter is a mobile-friendly web game where players adopt a virtual pet, give it a personality, and talk to it using a chat window. The AI brings the pet to life — it responds in character, reacts to how well it's being cared for, and grows over time.

**Tagline:** *"Your pet, your personality, your story."*

---

## 2. Who Is It For?

- Kids aged 6 and up
- Anyone who loves cute animals and imaginative play
- Players who enjoy chat-style games and light mini-games
- Works on phones, tablets, and desktop browsers — no download needed

---

## 3. Core Gameplay Loop

```
1. Create your pet  →  2. Chat with it  →  3. Feed & play  →  4. Keep it happy  →  back to 2
```

Every session the player:
- Opens a chat with their pet
- Talks to it (the AI responds in the pet's voice and personality)
- Takes care of it (feeding, playing, resting)
- Watches stats like Happiness, Hunger, and Energy change
- Unlocks new items, outfits, and mini-games over time

---

## 4. Pet Creation

### 4.1 Choose a Species
| Species | Vibe |
|---------|------|
| Cat | Clever and mysterious |
| Puppy | Bouncy and loyal |
| Dragon | Brave and a little dramatic |
| Bunny | Shy but sweet |
| Cloud Puff | Dreamy and magical (new & original!) |

### 4.2 Choose a Personality
| Personality | How It Talks |
|-------------|--------------|
| Funny | Makes jokes, loves puns |
| Brave | Adventurous, not scared of anything |
| Sleepy | Slow, yawns a lot, loves naps |
| Grumpy (but loveable) | Short answers, secretly kind |
| Hyper | ALL CAPS, lots of exclamation marks!!! |

### 4.3 Give It a Name
Players type any name they want.

### 4.4 Pick Colors & Look
Simple color picker for fur/scales/body. A few hairstyle or accessory choices to start.

---

## 5. The Chat System

The heart of the game. Players type messages and the pet AI replies.

### 5.1 How It Works
- Player types a message in a chat box at the bottom of the screen
- The pet's reply appears in a speech bubble above the pet
- The chat log scrolls up like a real messaging app
- The pet uses its personality voice in every reply

### 5.2 Example Chat (Funny Cat named "Mochi")
> **You:** Hey Mochi, how are you?  
> **Mochi:** Purrfectly fine, thank you! ...That's a cat pun. You're welcome. 🐱

> **You:** Are you hungry?  
> **Mochi:** Is a fish delicious? YES. Yes I am. Feed me NOW please and thank you.

### 5.3 What the Pet Knows
- Its own name and species
- Its personality
- Its current mood (happy, hungry, tired, etc.)
- Recent things the player said
- Time of day (sleepy pet yawns more at night)

### 5.4 Special Trigger Phrases
| Player Says | Pet Does |
|-------------|----------|
| "I love you" | Pet does a happy dance animation |
| "Let's play" | Opens mini-game menu |
| "Good night" | Pet yawns and goes to sleep mode |
| "Feed" or "I have food" | Opens feeding menu |

---

## 6. Pet Care System

### 6.1 Stats (shown as cute icon bars)
| Stat | Icon | Goes down when... |
|------|------|--------------------|
| Happiness | 😊 | Not talked to, bored |
| Hunger | 🍎 | Time passes |
| Energy | ⚡ | Playing mini-games |
| Hygiene | 🛁 | Time passes, playing in mud |
| Affection | 💖 | Not getting compliments or attention |

### 6.2 Feeding
- Player opens food menu
- Picks a food (fish, kibble, cake, mystery berry, etc.)
- Pet reacts with animation and a comment based on personality
- Fills Hunger bar

### 6.3 Playing
- Opens mini-game selector
- Fills Happiness and reduces Energy

### 6.4 Bathing / Grooming
- Simple tap-to-scrub mini-game
- Fills Hygiene bar
- Pet has funny reactions to baths

### 6.5 Mood States
The pet's appearance and chat tone changes based on stats:
- **Very Happy:** Sparkles, bouncy, extra talkative
- **Hungry:** Droopy eyes, mentions food constantly
- **Tired:** Slow replies, yawning emoji
- **Sad:** Droopy tail, shorter replies, asks for attention
- **Sick:** Sniffling, needs medicine item

---

## 7. Mini-Games

### 7.1 Catch the Ball
- A ball bounces across the screen
- Player taps it before it hits the ground
- Each catch earns coins and fills Happiness
- Gets faster each round

### 7.2 Dress Up
- Pick outfits, hats, accessories for your pet
- Saved looks can be named and kept
- Special seasonal outfits (holiday, birthday, space explorer)

### 7.3 Memory Match (Bonus Game)
- Flip cute illustrated cards to find matching pairs
- Earns extra coins and an XP boost for the pet

### 7.4 More to come in updates!

---

## 8. Progression & Rewards

### 8.1 Coins
- Earned by chatting, playing mini-games, and daily logins
- Spent in the Shop

### 8.2 The Shop
| Category | Examples |
|----------|---------|
| Food | Fancy treats, seasonal snacks |
| Outfits | Space suit, princess dress, ninja gear |
| Room Decor | New backgrounds for the pet's home |
| Accessories | Hats, glasses, bow ties |

### 8.3 Pet Level
- Pet gains XP from interactions
- Leveling up unlocks new dialogue, reactions, and accessories
- Each level has a cute name (Cozy Cub → Adventure Pal → Legendary Floof)

### 8.4 Daily Streak
- Log in every day for bonus coins and a surprise gift
- Streak shown on the main screen with a fire emoji

---

## 9. Screens & Navigation

```
┌─────────────────────────────┐
│        HOME SCREEN          │
│  [Your pet, animated]       │
│  [Stat bars along bottom]   │
│  [Chat button — big + cute] │
└─────────────────────────────┘
         ↓
┌─────────────────────────────┐
│         CHAT SCREEN         │
│  Chat log (scrollable)      │
│  Pet speech bubble at top   │
│  Type here... [Send]        │
└─────────────────────────────┘
```

**Main navigation tabs (bottom bar):**
- 🏠 Home
- 💬 Chat
- 🎮 Games
- 🛍️ Shop
- 👤 Profile

---

## 10. Art Style

- **Overall feel:** Soft, rounded, pastel colors — like a plush toy came to life
- **Animation style:** Bouncy, squash-and-stretch cartoon motion
- **UI style:** Rounded corners, large touch targets, bubbly fonts
- **Color palette:** Warm pastels (mint, lavender, peach, sky blue)
- **Reference feel:** Mix of Tamagotchi + Animal Crossing + cute sticker art

---

## 11. Sound Design

| Moment | Sound |
|--------|-------|
| Pet is happy | Soft chime, happy squeak |
| Pet is hungry | Little stomach growl sound |
| Feeding | Nom nom sound effect |
| Mini-game win | Cheerful jingle |
| Leveling up | Big triumphant fanfare |
| Night mode | Soft lullaby loop |

All sounds should be gentle and not startling — great for playing with the volume up.

---

## 12. Technical Notes (for the developer)

| Item | Choice |
|------|--------|
| Platform | Mobile-first web app (works in browser) |
| AI chat | Claude API (Anthropic) — pet personality prompt |
| Frontend | HTML + CSS + JavaScript (or React for components) |
| Animations | CSS animations or a lightweight library like GSAP |
| Storage | Browser localStorage for save data (to start) |
| Fonts | Google Fonts — something rounded and friendly |

### Pet AI Prompt Strategy
Each chat message to the AI includes:
1. A system prompt defining the pet's species, name, and personality
2. The pet's current mood/stats as context
3. The conversation history (last 10 messages)
4. Instructions to keep replies short (1–3 sentences), cute, and in-character

---

## 13. Out of Scope (Version 1)

These ideas are great but saved for a later version:
- Multiplayer / visiting other players' pets
- Pet vs. Pet battles
- Voice input/output
- Account login / cloud saves
- Pet trading

---

## 14. Success Criteria

The game is working well when:
- [ ] A player can create a pet and have it respond in its personality within 30 seconds
- [ ] The chat feels fun and surprising, not repetitive
- [ ] All stat bars work and the pet's mood visibly changes
- [ ] At least 2 mini-games are playable
- [ ] The whole game looks great on a phone screen (375px wide)
- [ ] A new player can figure out how to play without any instructions

---

## 15. Glossary

| Word | Meaning |
|------|---------|
| Critter | A cute little creature (your pet!) |
| Stats | Numbers that show how your pet is feeling |
| XP | Experience Points — how your pet grows |
| Mini-game | A small, quick, fun game within the app |
| Personality | The way your pet acts and talks |

---

*Made with love by Hanalulu Studio. 🌺*
