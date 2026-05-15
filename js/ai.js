// ══ Chatty Critter — Multi-Provider AI Chat ══
//
// Supported providers (all free tiers available):
//
//  groq    → console.groq.com   — free, 14,400 req/day, instant responses
//  gemini  → aistudio.google.com — free, 1,500 req/day, high quality
//  abacus  → abacus.ai           — free credits to start
//
// API key + provider saved in localStorage (separate from game save data).

const AI_PROVIDERS = {
  groq: {
    name:        'Groq — Llama 3',
    hint:        'Free key at: console.groq.com  •  No credit card needed!',
    placeholder: 'Paste your Groq key here… (starts with gsk_)',
    docsUrl:     'https://console.groq.com',
  },
  gemini: {
    name:        'Google Gemini Flash',
    hint:        'Free key at: aistudio.google.com  •  Google account required',
    placeholder: 'Paste your Google AI key here… (starts with AIza)',
    docsUrl:     'https://aistudio.google.com',
  },
  abacus: {
    name:        'Abacus.ai',
    hint:        'Free credits at: abacus.ai  •  Many models available',
    placeholder: 'Paste your Abacus.ai key here…',
    docsUrl:     'https://abacus.ai',
  },
};

// ── Main entry point called from main.js ──
async function getAIResponse(userMessage, chatHistory, pet, stats) {
  const apiKey  = localStorage.getItem('chatty_ai_key');
  const provider = localStorage.getItem('chatty_ai_provider') || 'groq';
  if (!apiKey) return null;

  const systemPrompt    = _buildPetSystemPrompt(pet, stats);
  const historyMessages = _formatHistory(chatHistory);

  try {
    switch (provider) {
      case 'groq':   return await _callGroq(apiKey, systemPrompt, historyMessages, userMessage);
      case 'gemini': return await _callGemini(apiKey, systemPrompt, historyMessages, userMessage);
      case 'abacus': return await _callAbacus(apiKey, systemPrompt, historyMessages, userMessage);
      default:       return null;
    }
  } catch (err) {
    console.warn(`[AI] ${provider} failed — falling back to built-in responses:`, err.message);
    return null;
  }
}

// ── Groq (OpenAI-compatible, Llama 3.1 8B Instant) ──
async function _callGroq(apiKey, system, history, userMessage) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model:       'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: system },
        ...history,
        { role: 'user',   content: userMessage },
      ],
      max_tokens:  120,
      temperature: 0.88,
    }),
  });
  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || null;
}

// ── Google Gemini 1.5 Flash ──
async function _callGemini(apiKey, system, history, userMessage) {
  // Convert OpenAI-style history to Gemini's role format
  const contents = history.map(m => ({
    role:  m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents,
        generationConfig: { maxOutputTokens: 120, temperature: 0.88 },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
    }
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
}

// ── Abacus.ai ──
async function _callAbacus(apiKey, system, history, userMessage) {
  const res = await fetch('https://api.abacus.ai/api/v0/llm/chat', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'apiKey': apiKey },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: system },
        ...history,
        { role: 'user',   content: userMessage },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Abacus ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.response || data.message || data.choices?.[0]?.message?.content || '').trim() || null;
}

// ── Helpers ──
function _formatHistory(chatHistory) {
  return (chatHistory || []).slice(-6).map(m => ({
    role:    m.role === 'pet' ? 'assistant' : 'user',
    content: m.text,
  }));
}

function _buildPetSystemPrompt(pet, stats) {
  const s = stats;
  const mood =
    s.hunger    < 25 ? 'hungry and a bit cranky'   :
    s.energy    < 25 ? 'tired and very sleepy'      :
    s.happiness < 25 ? 'sad and feeling lonely'     :
    s.hygiene   < 25 ? 'feeling a little grubby'    :
    s.happiness > 75 ? 'happy and full of energy'   :
                       'feeling okay';

  const voice = {
    funny:  'You love making puns and jokes. Sneak at least one pun into every reply. Be lighthearted and playful.',
    brave:  'You are bold and heroic. Talk like an adventurer on a quest. Everything is an epic challenge.',
    sleepy: 'You are very drowsy. Speak slowly, yawn often. Everything feels cozy and dreamy.',
    grumpy: 'You are blunt and short-worded but secretly very kind. Pretend not to care, but you do.',
    hyper:  'You are EXTREMELY energetic!! USE CAPS often!! Lots of exclamation marks!!! Everything is AMAZING!!!',
  }[pet.personality] || 'Be friendly and adorable.';

  return `You are ${pet.name}, a cute ${pet.species} virtual pet with a ${pet.personality} personality.

Personality: ${voice}
Current mood: ${mood}.
Stats — Happiness: ${Math.round(s.happiness)}% | Hunger: ${Math.round(s.hunger)}% | Energy: ${Math.round(s.energy)}%

Rules (follow strictly):
- Stay in character as ${pet.name} the ${pet.species} at ALL times.
- Keep replies to 1–3 short sentences. You are a pet, not a professor.
- Naturally react to your mood (mention hunger if hungry, yawn if tired, etc.).
- Use 1–2 relevant emojis per reply. Be warm, cute and engaging.
- NEVER say you are an AI or mention any AI service. You are a real pet!`;
}
