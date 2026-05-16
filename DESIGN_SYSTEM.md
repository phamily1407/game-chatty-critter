# Chatty Critter — Pet & Dress-Up Design System
**Version:** 1.0 · v1.2.6  
**Studio:** Hanalulu Studio

---

## The Problem We Solved

All 11 pet SVGs previously had different head positions, eye heights, and body proportions. Dress-up accessories were positioned using a complex per-pet delta table — fragile, hard to maintain, and still produced misaligned results for Bunny, Rabbit, and Cloud-Puff.

**Root cause:** No anatomical standard existed when pets were first designed. Each artist placed features at arbitrary coordinates.

---

## The Standard Anatomical Grid

All pets MUST conform to this coordinate system (SVG viewBox `0 0 200 220`):

```
y=0   ┌─────────────────────────────────┐
      │         ↕ EAR ZONE              │  Ears / horns / antennae may extend
      │         (species-specific)      │  freely ABOVE y=36 — no constraints
y=36  ├─────────────────────────────────┤  ← HEAD TOP (head circle top edge)
      │                                 │
      │   HEAD ZONE  — center (100,88)  │  ← HEAD CENTER must be cx=100, cy=88
      │                                 │     Head radius: 50–54px
      │   Eyes:  (76,84) and (124,84)   │  ← EYES must be at cy≈84, cx=76/124
      │   Nose:  (100, 102)             │  ← NOSE at cy≈100–104
      │   Mouth: y ≈ 108–116            │
      │                                 │
y=140 ├─────────────────────────────────┤
      │   WRAP ZONE — neck (100, 118)   │  Scarves, necklaces, bow ties
y=128 ├─────────────────────────────────┤
      │                                 │
      │   BODY ZONE — center (100,162)  │  Clothing, body accessories
      │   Left side:  (50, 155)         │  Mic, wand go here
      │   Right side: (150, 155)        │  Star, heart badges go here
      │                                 │
y=188 ├─────────────────────────────────┤
      │   FEET ZONE — y ≈ 195–205       │  Shoes, boots, socks
y=220 └─────────────────────────────────┘

BACK LAYER (wings, capes): z-index 0, appears behind pet, body-zone height
```

### Key Anchor Coordinates (SVG units)

| Anchor | SVG (x, y) | Display at 240×264 (x%, y%) |
|--------|------------|------------------------------|
| Head center | (100, 88) | (50%, 40.7%) |
| Head top | (100, 36) | (50%, 16.4%) |
| Hat mount | (100, 28) | (50%, 12.7%) |
| Left eye | (76, 84) | (38.4%, 38.2%) |
| Right eye | (124, 84) | (61.6%, 38.2%) |
| Glasses center | (100, 84) | (50%, 38.2%) |
| Nose | (100, 102) | (50%, 46.4%) |
| Neck / wrap | (100, 118) | (50%, 53.6%) |
| Body center | (100, 162) | (50%, 73.6%) |
| Left body side | (48, 155) | (24.4%, 70.5%) |
| Right body side | (152, 155) | (75.6%, 70.5%) |
| Left foot | (76, 200) | (38.4%, 90.9%) |
| Right foot | (124, 200) | (61.6%, 90.9%) |

---

## Universal Dress-Up Slot System

With all pets sharing the standard grid, dress-up items use **fixed slots** (no per-pet deltas needed). Display wrapper = **240×264px**.

### Hat Slot
Hat emoji sits *above* head top (head top = 16.4%). Hat at `top: 8–10%` leaves a natural gap.

| Size | Emoji px | top | left |
|------|----------|-----|------|
| Small (2.5rem) | ~40px | 10% | 39% |
| Medium (3rem) | ~48px | 8% | 38% |
| Large (3.4rem) | ~54px | 6% | 37% |

### Glasses/Eye Slot
Eyes at 38.2% from top. Glasses sit just above eye center.

`top: 33–35%, left: 25–30%` (varies by emoji width)

### Ear-Right Slot (bow, flower, balloon)
Upper-right of head, roughly at ear level.

`top: 12–16%, left: 56–62%`

### Back Slot (wings, capes)
Behind pet at z-index:0, mid-body height.

`top: 25–35%, left: 5–15%, font-size: 6–7rem`

### Wrap Slot (scarf, bow-tie, necklace, lei)
Below chin, above body.

`top: 43–50%, left: 34–42%`

### Body-Left Slot (mic, wand, rainbow)
Left side of body.

`top: 52–62%, left: 10–20%`

### Body-Right Slot (star, heart, badge)
Right side of body.

`top: 48–55%, left: 60–66%`

### Feet Slot
At foot level.

`top: 84–89%, left: 27–31%`

---

## Per-Pet Allowances (Ears & Special Features)

Ears and species-specific features are **exempt** from the standard — they can extend freely above y=36. Only the **head circle center** and **eye positions** are constrained.

| Pet | Special feature | Allowance |
|-----|----------------|-----------|
| Bunny | Very tall upright ears | Ears extend to y≈0; hat sits between ears at head level |
| Rabbit | Floppy angled ears | Ears angle outward; hat sits at head level |
| Dragon | Spines/horns | Spines at y≈24; hat ABOVE spines |
| Kangaroo | Tall thin ears + elongated snout | Ears to y≈3; snout to y≈117 |
| Penguin | Flipper wings on sides | Wide body; hat centered on round head |
| Panda | Round black ear circles | Ear tops at y≈21; hat above ears |
| Fox | Triangular pointed ears | Ear tips at y≈14; hat above tips |
| Parrot | Curved beak | Beak y≈101–118; glasses sit above beak |
| Cloud-Puff | Fully cloud-shaped | Head cloud centered at y=88; eyes at y=84 |

### Residual Per-Pet Deltas (after standardization)

After SVG redesign, only tiny corrections remain:

| Pet | Hat Δ | Glasses Δ | Feet Δ | Reason |
|-----|-------|-----------|--------|--------|
| cat | 0 | 0 | 0 | Baseline |
| puppy | +1 | -1 | 0 | Floppy side ears add slight width |
| dragon | -4 | +3 | 0 | Hat above spines (y≈24); eyes at 85 |
| bunny | **0** | **0** | **+4** | **Fixed by SVG redesign** |
| cloud-puff | **0** | **0** | **+3** | **Fixed by SVG redesign** |
| fox | -3 | 0 | 0 | Hat above pointed ear tips (y≈14) |
| penguin | 0 | -2 | +4 | Eyes at cy=80; orange feet low |
| panda | -2 | 0 | 0 | Hat above round ear circles (y≈21) |
| rabbit | **0** | **+2** | **+4** | **Fixed by SVG redesign** |
| kangaroo | -1 | +1 | +4 | Ears to y=3; big low feet |
| parrot | 0 | -1 | 0 | Slight beak adjustment |

---

## Adding a New Pet — Checklist

When creating a new pet SVG (`assets/pets/new-pet.svg`):

- [ ] ViewBox: `0 0 200 220`
- [ ] Head circle/shape: `cx="100" cy="88"`, radius 50–54
- [ ] Eyes: `cy="84"` (±2 acceptable), `cx="76"` (left) and `cx="124"` (right)
- [ ] Body: `cx="100" cy="162"` (±4 acceptable)
- [ ] Feet: `y≈198–204`
- [ ] Ears/special features: free to extend in any direction
- [ ] Add entry to `PET_ANCHORS` in `js/games.js` with appropriate deltas
- [ ] Add to `SPECIES` array in `js/main.js`
- [ ] Add colour to `PET_BALL_COLORS` in `openCatchBall()`
- [ ] Test in dress-up with: hat, glasses, bow, wings, scarf, sneakers

---

## Files

| File | Purpose |
|------|---------|
| `assets/pets/*.svg` | Pet artwork — must conform to this standard |
| `js/games.js` `PET_ANCHORS` | Residual per-pet deltas |
| `js/games.js` `getAdjustedTop()` | Applies delta to base item position |
| `js/games.js` `DRESS_UP_ITEMS` | Item positions use standard slot values |
| `js/main.js` `applyOutfitToHome()` | Renders outfit on home screen |

---

*Hanalulu Studio Design System · May 2026*
