import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{
      background: '#1a472a',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
        🕌 Islamia.AI
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link to="/quran" style={{ color: '#fff', textDecoration: 'none' }}>Quran</Link>
        <Link to="/learn" style={{ color: '#fff', textDecoration: 'none' }}>Learn</Link>
        <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
      </div>
    </nav>
  )
}

export default Navbar