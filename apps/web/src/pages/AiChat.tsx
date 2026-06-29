import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const suggestedQuestions = [
  'What are the 5 pillars of Islam?',
  'What does the Quran say about patience?',
  'What is the significance of Surah Al-Fatiha?',
  'How many times is prayer mentioned in the Quran?',
  'What is the ruling on fasting in Ramadan?',
  'Tell me about the life of Prophet Muhammad ﷺ',
  'What are the conditions of a valid prayer?',
  'What does Islam say about kindness to parents?',
]

function AiChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMessage: Message = { role: 'user', content: text }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setError('')

    try {
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      }))

      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history })
      })

      const data = await res.json()

      if (data.error) {
        setError(data.error)
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.reply
        }])
      }
    } catch (err) {
      setError('Failed to connect to server. Please try again.')
    }

    setLoading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      height: 'calc(100vh - 64px)',
      display: 'flex', flexDirection: 'column',
      background: '#f8faf9'
    }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #0a2e1a, #1a472a)',
        padding: '1rem 2rem',
        color: '#fff',
        display: 'flex', alignItems: 'center', gap: '1rem'
      }}>
        <div style={{
          width: '42px', height: '42px',
          background: 'rgba(74,222,128,0.2)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', border: '1px solid rgba(74,222,128,0.4)'
        }}>🤖</div>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Islamia.AI Assistant</h2>
          <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>
            Powered by authentic Islamic knowledge
          </p>
        </div>
        <div style={{
          marginLeft: 'auto',
          background: 'rgba(74,222,128,0.2)',
          border: '1px solid rgba(74,222,128,0.4)',
          borderRadius: '20px', padding: '0.3rem 0.8rem',
          fontSize: '0.75rem', color: '#4ade80'
        }}>● Online</div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '1.5rem', display: 'flex',
        flexDirection: 'column', gap: '1rem'
      }}>

        {/* Welcome */}
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🕌</div>
            <h3 style={{ color: '#0a2e1a', margin: '0 0 0.5rem', fontSize: '1.3rem' }}>
              As-salamu alaykum!
            </h3>
            <p style={{ color: '#666', margin: '0 0 2rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Ask me anything about Islam — Quran, Hadith, Fiqh, Islamic history and more.
              All answers are based on authentic Islamic sources.
            </p>

            {/* Suggested Questions */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '0.8rem', textAlign: 'left'
            }}>
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  style={{
                    background: '#fff', border: '1px solid #e8e8e8',
                    borderRadius: '12px', padding: '0.8rem 1rem',
                    cursor: 'pointer', textAlign: 'left',
                    fontSize: '0.85rem', color: '#333',
                    lineHeight: '1.4', transition: 'all 0.2s'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.borderColor = '#1a472a'
                    e.currentTarget.style.background = '#e8f5e9'
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.borderColor = '#e8e8e8'
                    e.currentTarget.style.background = '#fff'
                  }}
                >💬 {q}</button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            gap: '0.8rem', alignItems: 'flex-start'
          }}>
            {msg.role === 'assistant' && (
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1rem',
                flexShrink: 0
              }}>🕌</div>
            )}

            <div style={{
              maxWidth: '75%',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, #1a472a, #2d6a4f)'
                : '#fff',
              color: msg.role === 'user' ? '#fff' : '#333',
              borderRadius: msg.role === 'user'
                ? '18px 18px 4px 18px'
                : '18px 18px 18px 4px',
              padding: '1rem 1.2rem',
              fontSize: '0.95rem', lineHeight: '1.7',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: msg.role === 'assistant' ? '1px solid #e8e8e8' : 'none',
              whiteSpace: 'pre-wrap'
            }}>
              {msg.content}
            </div>

            {msg.role === 'user' && (
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: '#e8f5e9', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', flexShrink: 0
              }}>👤</div>
            )}
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '1rem'
            }}>🕌</div>
            <div style={{
              background: '#fff', borderRadius: '18px 18px 18px 4px',
              padding: '1rem 1.2rem', border: '1px solid #e8e8e8',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '8px', height: '8px',
                    borderRadius: '50%', background: '#1a472a',
                    animation: `bounce 1s infinite ${i * 0.2}s`
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: '#fce4ec', border: '1px solid #f48fb1',
            borderRadius: '12px', padding: '1rem',
            color: '#c62828', fontSize: '0.9rem', textAlign: 'center'
          }}>{error}</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        background: '#fff', borderTop: '1px solid #e8e8e8',
        padding: '1rem 1.5rem'
      }}>
        <form onSubmit={handleSubmit} style={{
          display: 'flex', gap: '0.8rem', alignItems: 'flex-end',
          maxWidth: '900px', margin: '0 auto'
        }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage(input)
              }
            }}
            placeholder="Ask any Islamic question... (Press Enter to send)"
            rows={2}
            style={{
              flex: 1, padding: '0.8rem 1rem',
              borderRadius: '12px', border: '1px solid #e0e0e0',
              fontSize: '0.95rem', resize: 'none',
              outline: 'none', fontFamily: 'system-ui, sans-serif',
              lineHeight: '1.5'
            }}
            onFocus={e => e.target.style.borderColor = '#1a472a'}
            onBlur={e => e.target.style.borderColor = '#e0e0e0'}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{
              background: loading || !input.trim()
                ? '#ccc'
                : 'linear-gradient(135deg, #1a472a, #2d6a4f)',
              color: '#fff', border: 'none',
              borderRadius: '12px', padding: '0.8rem 1.5rem',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              fontSize: '1rem', fontWeight: '600',
              transition: 'all 0.2s', whiteSpace: 'nowrap'
            }}
          >
            {loading ? '...' : '➤ Send'}
          </button>
        </form>
        <p style={{
          textAlign: 'center', fontSize: '0.75rem',
          color: '#aaa', margin: '0.5rem 0 0'
        }}>
          All answers are based on authentic Quran and Hadith sources
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}

export default AiChat