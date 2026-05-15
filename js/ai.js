// ══ Abacus.ai Chat Integration ══
// Get your free API key at: https://abacus.ai
// Dashboard → Settings → API Keys → Create Key
//
// Abacus.ai hosts many LLM models (GPT-4o, Claude, Gemini, Llama, etc.)
// and exposes them through a unified chat API.

const ABACUS_API_URL = 'https://api.abacus.ai/api/v0/llm/chat';

async function getAIResponse(userMessage, chatHistory, pet, stats) {
  const apiKey = localStorage.getItem('chatty_ai_key');
  if (!apiKey) return null;

  const systemPrompt = _buildPetSystemPrompt(pet, stats);

  // Include last 6 messages as conversation context
  const historyMessages = (chatHistory || []).slice(-6).map(m => ({
    role:    m.role === 'pet' ? 'assistant' : 'user',
    content: m.text,
  }));

  const body = {
    messages: [
      { role: 'system', content: systemPrompt },
      ...historyMessages,
      { role: 'user', content: userMessage },
    ],
  };

  try {
    const res = await fetch(ABACUS_API_URL, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'apiKey':        apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.warn(`Abacus.ai returned ${res.status} — falling back to built-in responses`);
      return null;
    }

    const data = await res.json();

    // Handle common Abacus.ai / OpenAI-compatible response shapes
    return data.response
        || data.message
        || data.content
        || data.choices?.[0]?.message?.content
        || null;

  } catch (err) {
    console.warn('Abacus.ai request failed — using built-in responses:', err.message);
    return null;
  }
}

function _buildPetSystemPrompt(pet, stats) {
  const s = stats;
  const moodDesc =
    s.hunger    < 25 ? 'hungry and a bit cranky'  :
    s.energy    < 25 ? 'tired and very sleepy'     :
    s.happiness < 25 ? 'sad and lonely'             :
    s.hygiene   < 25 ? 'feeling a little dirty'     :
    s.happiness > 75 ? 'happy and full of energy'   :
                       'feeling okay';

  const voices = {
    funny:  'You love making puns and jokes. Sneak at least one pun into every reply. Be lighthearted and playful.',
    brave:  'You are bold and heroic. Talk like an adventurer on a quest. Everything is an epic challenge.',
    sleepy: 'You are very drowsy. Speak slowly, yawn often. Everything feels cozy and dreamy to you.',
    grumpy: 'You are blunt and short-worded but secretly very kind. Pretend not to care, but you do.',
    hyper:  'You are EXTREMELY energetic!! USE CAPS for emphasis!! Lots of exclamation marks!!! Everything is AMAZING!!!',
  };

  return `You are ${pet.name}, a cute ${pet.species} virtual pet with a ${pet.personality} personality.

Personality voice: ${voices[pet.personality] || 'Be friendly and adorable.'}

Current mood: ${moodDesc}.
Stats — Happiness: ${Math.round(s.happiness)}% | Hunger: ${Math.round(s.hunger)}% | Energy: ${Math.round(s.energy)}% | Hygiene: ${Math.round(s.hygiene)}%

Rules (follow strictly):
- Stay in character as ${pet.name} the ${pet.species} at ALL times. Never break character.
- Keep replies SHORT — 1 to 3 sentences maximum. You are a pet, not a professor.
- Naturally react to your mood (mention hunger if hungry, yawning if tired, etc.).
- Be warm, cute, and engaging. Use 1–2 relevant emojis per reply.
- NEVER say you are an AI, a language model, or mention Abacus.ai. You are a real pet!`;
}
