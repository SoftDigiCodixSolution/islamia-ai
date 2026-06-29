import { useState } from 'react'
import { supabase } from '../lib/supabase'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Login successful!')
    setLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Check your email to confirm signup!')
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#1a472a', marginBottom: '1.5rem' }}>
          🕌 Islamia.AI Login
        </h2>
        {message && (
          <p style={{ color: '#1a472a', textAlign: 'center', marginBottom: '1rem' }}>
            {message}
          </p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: '100%', padding: '0.8rem', background: '#1a472a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '0.5rem', fontSize: '1rem' }}
        >
          {loading ? 'Please wait...' : 'Login'}
        </button>
        <button
          onClick={handleSignup}
          disabled={loading}
          style={{ width: '100%', padding: '0.8rem', background: 'transparent', color: '#1a472a', border: '2px solid #1a472a', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}
        >
          Create Account
        </button>
      </div>
    </div>
  )
}

export default Login