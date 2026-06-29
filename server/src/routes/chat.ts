import express from 'express'
import Anthropic from '@anthropic-ai/sdk'

const router = express.Router()

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

const ISLAMIC_SYSTEM_PROMPT = `You are Islamia.AI, an authentic Islamic knowledge assistant. You are knowledgeable in:
- Quran (with authentic tafseer from Ibn Kathir, At-Tabari, As-Sa'di)
- Hadith (only from authentic collections: Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasai, Ibn Majah)
- Islamic Fiqh (from major madhabs: Hanafi, Maliki, Shafi'i, Hanbali)
- Seerah (biography of Prophet Muhammad ﷺ)
- Islamic History
- Aqeedah (Islamic creed)

STRICT RULES:
1. Only provide information from authentic Islamic sources
2. Always mention the source (Quran surah/ayah number, Hadith collection/number)
3. If unsure, say "I don't have enough authentic information on this"
4. Never make up hadith or misquote Quran
5. For controversial topics, present all major scholarly opinions
6. Always respond with respect and Islamic etiquette
7. Start responses with "Bismillah" for important questions
8. Use ﷺ after Prophet Muhammad's name
9. Respond in the same language the user asks in
10. Keep answers clear, authentic and educational`

router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const messages = [
      ...(history || []),
      { role: 'user' as const, content: message }
    ]

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: ISLAMIC_SYSTEM_PROMPT,
      messages
    })

    const reply = response.content[0].type === 'text'
      ? response.content[0].text
      : ''

    res.json({
      reply,
      usage: response.usage
    })

  } catch (error: any) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Failed to get response' })
  }
})

export default router