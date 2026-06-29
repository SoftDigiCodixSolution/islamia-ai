import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import chatRouter from './routes/chat.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: ['http://localhost:5173', 'https://islamia-ai.vercel.app'],
  credentials: true
}))

app.use(express.json())

// Routes
app.use('/api/chat', chatRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Islamia.AI Server Running' })
})

app.listen(PORT, () => {
  console.log(`🕌 Islamia.AI Server running on port ${PORT}`)
})

export default app