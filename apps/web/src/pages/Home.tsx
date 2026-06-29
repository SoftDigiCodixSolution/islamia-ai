function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a472a 0%, #2d5a27 50%, #1a472a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        🕌 Islamia.AI
      </h1>
      <p style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#90EE90' }}>
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
      </p>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '600px', lineHeight: '1.8' }}>
        Your complete Islamic platform — Quran, Learning, AI-powered knowledge
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="/quran" style={{
          background: '#fff',
          color: '#1a472a',
          padding: '0.8rem 2rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>📖 Read Quran</a>
        <a href="/learn" style={{
          background: 'transparent',
          color: '#fff',
          padding: '0.8rem 2rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          border: '2px solid #fff'
        }}>🎓 Start Learning</a>
      </div>
    </div>
  )
}

export default Home