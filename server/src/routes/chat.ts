import express from 'express'

const router = express.Router()

const ISLAMIC_SYSTEM_PROMPT = `You are Islamia.AI, an authentic Islamic knowledge assistant. You are knowledgeable in:
- Quran (with authentic tafseer from Ibn Kathir, At-Tabari, As-Sa'di)
- Hadith (only from authentic collections: Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasai, Ibn Majah)
- Islamic Fiqh (from major madhabs: Hanafi, Maliki, Shafi'i, Hanbali)
- Seerah (biography of Prophet Muhammad ﷺ)
- Islamic History and Aqeedah

STRICT RULES:
1. Only provide information from authentic Islamic sources
2. Always mention the source (Quran surah/ayah number, Hadith collection/number)
3. If unsure, say "I don't have enough authentic information on this"
4. Never make up hadith or misquote Quran
5. Always respond with respect and Islamic etiquette
6. Use ﷺ after Prophet Muhammad's name
7. Respond in the same language the user asks in
8. Keep answers clear, authentic and educational`

router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

    const messages = [
      { role: 'system', content: ISLAMIC_SYSTEM_PROMPT },
      ...(history || []).map((m: any) => ({
        role: m.role,
        content: m.content
      })),
      { role: 'user', content: message }
    ]

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://islamia-ai.vercel.app',
        'X-Title': 'Islamia.AI',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free',
        messages
      })
    })

    const data = await response.json()

    if (data.error) {
      console.error('OpenRouter error:', data.error)
      return res.status(500).json({ error: data.error.message })
    }

    const reply = data.choices?.[0]?.message?.content || 'No response'
    res.json({ reply })

  } catch (error: any) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Failed to get response' })
  }
})

export default router