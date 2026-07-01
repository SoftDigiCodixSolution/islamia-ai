import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
config()

import chatRouter from './routes/chat.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: '*',
  credentials: true
}))

app.use(express.json())
app.use('/api/chat', chatRouter)

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Islamia.AI Server Running',
    hasKey: !!process.env.ANTHROPIC_API_KEY
  })
})

app.listen(PORT, () => {
  console.log(`🕌 Islamia.AI Server running on port ${PORT}`)
})

export default app