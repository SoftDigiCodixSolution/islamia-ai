import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const links = [
    { to: '/', label: '🏠 Home' },
    { to: '/quran', label: '📖 Quran' },
    { to: '/learn', label: '🎓 Learn' },
    { to: '/knowledge', label: '📚 Knowledge' },
    { to: '/ai', label: '🤖 AI Chat' },
    { to: '/login', label: '👤 Login' },
  ]

  return (
    <nav style={{
      background: '#0a2e1a',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.3)'
    }}>
      <Link to="/" style={{
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1.3rem',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🕌 Islamia<span style={{ color: '#4ade80' }}>.AI</span>
      </Link>

      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: location.pathname === link.to ? '#4ade80' : 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: location.pathname === link.to ? '600' : '400',
              background: location.pathname === link.to
                ? 'rgba(74,222,128,0.1)'
                : 'transparent',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >{link.label}</Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar