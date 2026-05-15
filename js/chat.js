// Personality response pools: RESPONSES[personality][intent] = [array of strings]
const RESPONSES = {
  funny: {
    greeting: [
      "Oh HELLO there! I was literally JUST thinking about you. Specifically about whether you'd bring snacks. Did you bring snacks? 😄",
      "Well WELL well — look who showed up! You're just in time for my best pun of the day: Why do cats knock things over? Because we CAN. Ba dum tss! 🥁",
      "GREETINGS, wonderful human! I was practising my royal wave. *waves paw regally* Magnificent, right? I know."
    ],
    status: [
      "How am I? Purrfectly fine, thanks! That's a cat pun. You're welcome. No charge. The puns are always free. 😄",
      "I am doing GREAT! I've been perfecting my 'adorable face' all morning and I think I've peaked. Science will study me.",
      "Honestly? Never better! I did 3 whole stretches today. That's basically a workout. I'm basically an athlete."
    ],
    love: [
      "Aww, I love you too! You're my favourite person! (You're also the only person I know, but still — TOP favourite.) 💕",
      "DID YOU JUST — oh my heart! I love you SO MUCH! You said the magic words! I'm doing a happy dance right now! 💃",
      "Oh stop it, you're making me blush! ...Actually keep going. Tell me more. I'm very into this conversation."
    ],
    hunger: [
      "FOOD?! Did someone say FOOD?! My ears just perked up! My tummy has been sending strongly-worded letters. 🍽️",
      "Oh you noticed! Yes, I am a BIT peckish. Just a little. Like, only extremely hungry. No big deal. Feed me please.",
      "I am SO glad you mentioned food. Just a tiny bit hungry. Like, can hear my stomach from across the room. Casual."
    ],
    play: [
      "PLAY? Let's GO! I was born ready! Well, I was born tiny and helpless, but I'm READY NOW! 🎮",
      "YES! Finally! I've been waiting for someone to challenge me! Prepare to be amazed by my skills. (I have none. But I'm enthusiastic!)",
      "Oh you wanna play? How fun! Fair warning — I'm extremely competitive and also I make up rules as I go."
    ],
    farewell: [
      "Good night already?! But we were having SO MUCH FUN! Fine. I'll sit here. In the dark. Alone. (*dramatic sigh*) Sweet dreams! 🌙",
      "Goodnight! I'll miss you! I'll miss you SO much! ...Starting in about 5 seconds when I immediately fall asleep. 💤",
      "See you tomorrow! I'll be here thinking up new puns for your return. I have MANY. You won't be disappointed."
    ],
    thanks: [
      "Aw shucks, you're making me emotional! Not really, but it's a nice thought. You're very welcome! 🥹",
      "Thanks for thanking me! We're thanking EACH OTHER! This is great! We should do this more often!",
      "Oh psh, it was nothing! ...Okay it was something, but I'm being modest. I'm very sophisticated like that."
    ],
    chat: [
      "Interesting! Tell me more! I'm listening very hard with my whole body. See? *ears perk up* Very attentive. 👂",
      "Oh WOW, really? That's the most interesting thing I've heard today! (Today just started but STILL.)",
      "Hmm! You know, that reminds me of a joke... actually the joke isn't relevant. But it was a GOOD joke. Trust me."
    ]
  },

  brave: {
    greeting: [
      "AH, you have returned! I have been guarding our realm in your absence. Nothing could get past me! ⚔️",
      "Fear not — your brave companion awaits! I was preparing for our next great adventure. The realm is safe!",
      "A true warrior never rests! ...But I did take a strategic nap. For tactical reasons. Purely tactical."
    ],
    status: [
      "I am STRONG and ready for anything! My spirit is unbreakable! My fur is a bit messy but my heart is FIERCE! 💪",
      "Ready for battle — metaphorically! I feel incredibly powerful today. Like I could defeat an army. Of pillows.",
      "Never better! A brave soul doesn't have bad days. We have character-building challenges. Today is going GREAT!"
    ],
    love: [
      "A warrior is not easily moved by words, but... I love you too. Don't tell the other dragons. They'd tease me forever.",
      "My heart grows bold and brave just from hearing that! I love you too! Together we are UNSTOPPABLE! 💪❤️",
      "Even the bravest knight has someone they fight for! You are that person for me! *sword raised triumphantly*"
    ],
    hunger: [
      "A warrior needs sustenance to keep their strength up! Bring forth the feast! ...Please. With urgency. ⚔️🍖",
      "My belly growls like a battle cry! It is telling me — loudly — that it is time to EAT. The hunger must be defeated!",
      "I have faced many foes, but hunger is the most persistent. A quick snack would greatly aid my heroic efforts."
    ],
    play: [
      "YES! A challenge! I accept! Let the games begin! I shall emerge VICTORIOUS! ...Or at least have fun trying! 🏆",
      "A true champion trains every day! Let's play — I'll show you my legendary skills right now!",
      "Into battle we go! Wait — this is a game, not actual battle. Good. Games are more fun. Let's do this!"
    ],
    farewell: [
      "Rest well, brave friend. Tomorrow brings new adventures. I shall stand guard while you sleep! 🌙⚔️",
      "Good night! A warrior's rest is sacred. Dream of great deeds! I'll be here when the sun rises again!",
      "Until we meet again! The realm is safe in my care. Sleep bravely! ...Is that a thing? Sleep bravely. It is now."
    ],
    thanks: [
      "Your gratitude honours me deeply! It is what brave companions do for each other. 🛡️",
      "Think nothing of it! A hero serves! ...Though the recognition IS nice. I won't pretend otherwise.",
      "Your thanks means more than any treasure! ...Well, maybe equally as much as treasure. Let's say equally."
    ],
    chat: [
      "Fascinating! A true warrior is also a great listener. Tell me more! I'm paying full attention. ⚔️👂",
      "Interesting... *strokes invisible beard thoughtfully* ...yes, very interesting indeed. Continue!",
      "I have considered this deeply. My conclusion: great! Very great. Let us proceed boldly forward!"
    ]
  },

  sleepy: {
    greeting: [
      "...mmh? Oh... hi... *yawns softly* ...I was just resting my eyes for a minute... maybe an hour... 💤",
      "You're here... that's so nice... *blinks slowly* ...everything is so cozy today, isn't it...",
      "Mmm... hello... *stretches very slowly* ...I had the most wonderful dream about a warm sunny spot..."
    ],
    status: [
      "...dreamy... everything is so soft and warm and... *yawns* ...sorry, what was the question...? 😴",
      "I'm... good... very... sleepy... but good... the kind of good you feel wrapped in a warm blanket...",
      "Mmm... doing okay... just... very relaxed... *closes eyes for one second* ...I'm listening, I promise..."
    ],
    love: [
      "...I love you too... *yawns softly* ...you make everything feel warm and cozy... like a really good nap... 💕",
      "Mmm... that's so sweet... *snuggles* ...I love you so much... you're my favourite person to be cozy near...",
      "Oh... *opens eyes slowly* ...did you say you love me? ...that's the nicest thing I've ever woken up to hear..."
    ],
    hunger: [
      "...hungry... yes... now that you mention it... *tummy rumbles softly* ...something warm and cozy to eat sounds perfect...",
      "Mmm... food... yes please... something soft... *yawns* ...something I don't have to work too hard to chew...",
      "...oh goodness... I was so cozy I forgot to eat... *blinks* ...that happens sometimes... mostly a lot..."
    ],
    play: [
      "...play? ...oh... *stretches slowly* ...I could do something gentle... not too fast... a slow little game sounds nice... 🎮",
      "Mmm... okay... I'll try... *yawns* ...but if I fall asleep in the middle of the game, that's just my strategy...",
      "Playing sounds... cozy... *pads slowly toward the game area* ...let's do something soft... and not too loud..."
    ],
    farewell: [
      "...goodnight... *already half asleep* ...sweet dreams... I'll be here... dreaming too... *soft snore* 💤",
      "Oh, is it bedtime? ...I've been ready for bedtime since this morning... sleep well... *yawns bigly*",
      "Mmm... goodnight... *curls up immediately* ...see you in my dreams... and also tomorrow... 🌙"
    ],
    thanks: [
      "...oh... you're welcome... *smiles sleepily* ...anytime... I'll be here... probably napping... but here...",
      "Mmm... of course... *yawns* ...happy to help... once I finish this nap... which is happening now... bye...",
      "Oh... that's kind... *blinks slowly* ...thank you for saying thank you... now I need a small nap..."
    ],
    chat: [
      "Mmm... *listens with half-closed eyes* ...that sounds... nice... tell me more while I rest my eyes a second... 💤",
      "...interesting... *yawns softly* ...I was thinking about that... or maybe dreaming about it... hard to tell...",
      "Oh... *nods slowly* ...mmm... yes... that's a thought... *nearly falls asleep* ...sorry, you were saying...?"
    ]
  },

  grumpy: {
    greeting: [
      "Oh. You're here. ...Fine. I suppose that's okay. Don't read too much into it.",
      "Hmph. Back again. ...I noticed you were gone, if you were wondering. Not that it matters. Doesn't matter at all.",
      "Oh, it's you. ...Good. I mean — whatever. Come in or don't. ...Come in though."
    ],
    status: [
      "Fine. Everything is fine. I'm fine. *grumbles quietly* ...You didn't have to ask, but... it's nice that you did.",
      "I've had better days. I've had worse. This is... a day. ...Thank you for asking. I mean — hmph.",
      "Adequate. Things are adequate. ...You look nice today, by the way. Don't make it weird."
    ],
    love: [
      "...oh. Well. Don't go getting all mushy about it, but... I love you too. There. I said it. Moving on.",
      "Hmph. ...Fine. I love you too. Happy? ...Actually I'm also happy. But don't tell anyone.",
      "*grumbles* ...That's very — I mean — you're more than tolerable. Considerably more. ...I love you too."
    ],
    hunger: [
      "...I wasn't going to say anything, but since you mentioned it — YES, I am a bit hungry. A bit. Feed me.",
      "About time. My stomach has been very politely growling for several minutes. ...Please.",
      "I'm not demanding food. I'm just stating a fact: I haven't eaten. You can do what you like with that information."
    ],
    play: [
      "...I suppose I could play something. If you really want to. I'm not doing it for fun. ...Okay maybe a little.",
      "Fine. We can play. I'm not excited about it. *clearly very excited about it* Let's go.",
      "Playing is fine. I like playing. Not that you'd know that from how I act. But I'm quite okay with it."
    ],
    farewell: [
      "...Leaving? Fine. That's fine. *quietly* ...Come back soon though. The place is boring without you.",
      "Good night. Sleep well. ...I'll miss you a little. A very small amount. You didn't hear that. 🌙",
      "Hmph. Fine. Go sleep. ...Sweet dreams. ...I mean — whatever. Sleep well. You deserve it."
    ],
    thanks: [
      "...It was nothing. You don't have to thank me. ...I mean, I appreciate it. A little. But you didn't have to.",
      "Hmph. You're welcome. ...It was nice to do something nice. Not that I'm making a habit of it.",
      "Oh — well. Good. You're welcome. ...I'd do it again, you know. If asked. Just putting that out there."
    ],
    chat: [
      "...I see. *considers this carefully* ...That's actually not a terrible point. I'll allow it.",
      "Hmph. Well. When you put it that way... ...Okay. Fine. You might have a point. Don't get smug.",
      "...Interesting. I wasn't expecting to find that interesting. But here we are. *grudgingly nods*"
    ]
  },

  hyper: {
    greeting: [
      "OHMYGOSH YOU'RE HERE!!! 🎉🎉🎉 I HAVE BEEN WAITING AND WAITING AND NOW YOU'RE HERE THIS IS AMAZING!!!",
      "HI HI HI HI HI!!! Did you know I can spin REALLY fast?? WATCH!! *spinning spinning spinning* ✨🌀",
      "YOU CAME BACK!!! I JUST KNEW you would!!! I CALLED IT!!! This is literally the BEST THING that happened today!!!"
    ],
    status: [
      "I AM SO GREAT!!! Everything is WONDERFUL!!! I found a really cool leaf outside and it was the BEST LEAF!! ⭐",
      "AMAZING!!! Feeling INCREDIBLE!!! I had SO MUCH energy this morning and now I have EVEN MORE SOMEHOW?!?!",
      "SO GOOD!!! Like REALLY good!!! Like an eleven out of ten!!! Is that allowed?! I'm doing it!!!"
    ],
    love: [
      "AHHHH I LOVE YOU TOO!!! SO MUCH!!! AN ENORMOUS AMOUNT!!! YOU'RE THE BEST PERSON EVER!!! 💕💕💕",
      "OH MY HEART!!! YOU SAID THE THING!!! I'm doing a WHOLE dance right now!!! *frantic happy dancing* 🎉",
      "I LOVE YOU SOOOOO MUCH!!! More than snacks!! More than games!! More than EVERYTHING!! THAT'S A LOT!!!"
    ],
    hunger: [
      "FOOD?!?! DID SOMEONE SAY FOOD?!?! MY TUMMY JUST DID A FLIP!! I AM SO READY FOR FOOD RIGHT NOW!!! 🍽️",
      "OH YES PLEASE FEED ME!!! I am SO hungry!!! Like VERY hungry!!! My stomach is making SOUNDS!!!",
      "SNACKS!!! YES!!! I want ALL the snacks!!! Bring them HERE!!! I am READY and WAITING!!!"
    ],
    play: [
      "LET'S GOOOOO!!! GAME TIME!!! I AM SO READY I'VE BEEN READY FOR HOURS!!! MAYBE DAYS!!! LET'S DO THIS!!! 🎮",
      "YES YES YES YES YES!!! I LOVE GAMES!!! I'm INCREDIBLE at games!!! Well, I LOVE them!! That's basically the same!!",
      "PLAYING?!?! NOW?!?! THIS IS THE GREATEST NEWS!!! I just did THREE jumps from excitement!!! TRUE STORY!!!"
    ],
    farewell: [
      "NOOOOO don't go yet!!! But also okay, sweet dreams, sleep AMAZINGLY, come back SUPER SOON!!! Miss you ALREADY!!! 💕",
      "Good night!!! Sleep SO well!!! Dream of FUN things!!! I'll be here thinking of ALL the things we'll do tomorrow!!!",
      "BYE BYE BYE!!! I'll miss you SO much!!! Count the seconds until you're back!! Okay BYEEEE!!! 🌙"
    ],
    thanks: [
      "YOU'RE WELCOME YOU'RE WELCOME YOU'RE WELCOME!!! It was my PLEASURE!!! I would do it AGAIN RIGHT NOW!!!",
      "AW STOP IT!! You're making me feel SO GOOD!!! You're welcome!!! You're the BEST for saying that!!!",
      "OF COURSE!!! Anytime!!! Every time!!! I am HERE for being helpful to you ALWAYS AND FOREVER!!!"
    ],
    chat: [
      "OH WOW that's SO interesting!!! Tell me MORE!!! I want to hear EVERYTHING!!! Start from the beginning!!! 🎉",
      "I HAVE THOUGHTS ABOUT THIS!!! SO MANY THOUGHTS!!! Okay first of all — wait actually — OKAY HERE GOES!!!",
      "REALLY?!?! WOW!!! That's AMAZING!! I didn't know that!!! Now I know that!!! My life is changed!!! In a good way!!!"
    ]
  }
};

// Mood override responses when stats are critically low
const MOOD_OVERRIDES = {
  hungry: {
    funny:  "Okay real talk — my stomach is making some very concerning noises. It's getting personal. Feed me? 🍽️",
    brave:  "A warrior needs FUEL! My hunger has become the enemy and I must defeat it — with food! Now, please!",
    sleepy: "*stomach growls softly* ...oh... I think I'm quite hungry... that might be why I feel so wobbly... *blinks*",
    grumpy: "I. Am. Starving. That's all I'm going to say about that. You know what to do.",
    hyper:  "I'M SO HUNGRY I CAN BARELY FUNCTION!!! My energy levels are DROPPING!!! FEED ME PLEASE IMMEDIATELY!!!"
  },
  tired: {
    funny:  "Full disclosure, I am running on approximately zero energy. My battery is at 2%. Please send rest. 💤",
    brave:  "Even the bravest warrior must rest... *leans against wall* ...I may need a quick nap before our next adventure...",
    sleepy: "*already half asleep* ...so... tired... everything is going... dark... in a cozy way... not a scary way... 💤",
    grumpy: "...Tired. Very tired. Extremely tired. If anyone asks, I'm not here. I'm resting.",
    hyper:  "Wait... I think... I might be... a little... tired?? This is NEW for me!! I don't know what to DO!! *sits down*"
  },
  sad: {
    funny:  "Okay I'll be real — not feeling my best today. My joke quota is way down. That's how you know it's serious. 🥺",
    brave:  "I have faced many challenges, but loneliness is... different. A brave spirit needs companions nearby.",
    sleepy: "*barely stirs* ...feeling a little sad... everything feels extra grey today... *pulls blanket closer*",
    grumpy: "...Not having the best day. Not saying it's bad. Just... could be better. ...It helps that you're here.",
    hyper:  "I'm trying to be happy but... everything feels a little slow today... Will you stay with me for a while? 🥺"
  }
};

// Fun species-specific action phrases
const SPECIES_QUIRKS = {
  cat:        ["*flicks tail thoughtfully*", "*knocks something off a table, just to see what happens*", "*finds a sunbeam and sits in it immediately*"],
  puppy:      ["*tail wagging so hard it's a blur*", "*does an excited happy circle run*", "*tries to lick your face*"],
  dragon:     ["*puffs a tiny smoke ring*", "*accidentally scorches something with excitement*", "*proudly shows off tiny wings*"],
  bunny:      ["*nose twitches rapidly*", "*hops in a small nervous circle*", "*hides briefly, then peeks back out*"],
  'cloud-puff': ["*floats slightly higher from excitement*", "*leaves a small rainbow wherever they drift*", "*sparkles a little*"]
};

function detectIntent(msg) {
  if (/\b(hi|hello|hey|howdy|greetings|sup|hiya)\b/.test(msg)) return 'greeting';
  if (/how are you|how do you feel|you ok|are you ok|how r u/.test(msg)) return 'status';
  if (/i love you|love you|luv u|ily|you'?re the best|ur the best|adore you/.test(msg)) return 'love';
  if (/\b(hungry|feed|food|eat|snack|meal|nom|dinner|lunch|breakfast)\b/.test(msg)) return 'hunger';
  if (/\bplay\b|let'?s play|wanna play|want to play|game/.test(msg)) return 'play';
  if (/good ?night|goodnight|bye|goodbye|see you|sleep|bedtime|night night/.test(msg)) return 'farewell';
  if (/thank|thanks|ty\b|thank you/.test(msg)) return 'thanks';
  return 'chat';
}

function getMood(stats) {
  if (stats.hunger < 25) return 'hungry';
  if (stats.energy < 25) return 'tired';
  if (stats.happiness < 25) return 'sad';
  return 'normal';
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getChatResponse(userMessage, pet, stats) {
  const msg = userMessage.toLowerCase().trim();
  const mood = getMood(stats);
  const personality = pet.personality;
  const species = pet.species;

  // 30% chance to use mood override when mood is bad
  if (mood !== 'normal' && Math.random() < 0.3) {
    const override = MOOD_OVERRIDES[mood][personality];
    if (override) return override;
  }

  const intent = detectIntent(msg);
  const pool = RESPONSES[personality]?.[intent] || RESPONSES[personality].chat;
  let response = pick(pool);

  // 25% chance to append a species-specific action
  if (Math.random() < 0.25 && species && SPECIES_QUIRKS[species]) {
    response += ' ' + pick(SPECIES_QUIRKS[species]);
  }

  return response;
}
