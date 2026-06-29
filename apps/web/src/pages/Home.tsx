function Home() {
  const features = [
    { icon: '📖', title: 'Quran Reader', desc: 'Read with Arabic text, translations in 10+ languages and tafseer' },
    { icon: '🎵', title: 'Audio Recitation', desc: 'Listen to 15+ world-renowned Qaris with verse-by-verse playback' },
    { icon: '🧠', title: 'Hifz Program', desc: 'Memorize Quran with AI-powered spaced repetition system' },
    { icon: '📚', title: 'Quranic Qaida', desc: 'Learn Arabic from scratch with interactive lessons' },
    { icon: '🤲', title: 'Duas & Adhkar', desc: 'Daily supplications, morning/evening adhkar and more' },
    { icon: '🕌', title: 'Islamic Knowledge', desc: 'Hadith, Fiqh, Islamic history and scholarly articles' },
    { icon: '🕐', title: 'Prayer Times', desc: 'Accurate prayer times based on your GPS location' },
    { icon: '🤖', title: 'AI Assistant', desc: 'Ask any Islamic question and get scholarly answers instantly' },
  ]

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(160deg, #0a2e1a 0%, #1a472a 40%, #2d6a4f 100%)',
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '400px', height: '400px', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.05)'
        }} />
        <div style={{
          position: 'absolute', bottom: '-150px', left: '-150px',
          width: '500px', height: '500px', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.05)'
        }} />

        {/* Badge */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '30px',
          padding: '0.4rem 1.2rem',
          color: '#90EE90',
          fontSize: '0.85rem',
          marginBottom: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          ✨ The Complete Islamic Platform
        </div>

        {/* Arabic Bismillah */}
        <p style={{
          fontSize: '2rem',
          color: '#a8d5b5',
          marginBottom: '1rem',
          fontFamily: 'serif',
          letterSpacing: '2px'
        }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        {/* Main Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          color: '#ffffff',
          margin: '0 0 1rem',
          fontWeight: '700',
          lineHeight: '1.1',
          letterSpacing: '-1px'
        }}>
          Islamia<span style={{ color: '#4ade80' }}>.AI</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '600px',
          lineHeight: '1.7',
          marginBottom: '2.5rem'
        }}>
          Your all-in-one Islamic companion — Quran, Hadith, Learning,
          Prayer Times and AI-powered Islamic knowledge
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/quran" style={{
            background: '#4ade80',
            color: '#0a2e1a',
            padding: '0.9rem 2.2rem',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1rem',
            transition: 'all 0.2s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>📖 Read Quran</a>
          <a href="/learn" style={{
            background: 'transparent',
            color: '#ffffff',
            padding: '0.9rem 2.2rem',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem',
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>🎓 Start Learning</a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '3rem',
          marginTop: '4rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {[
            { num: '114', label: 'Surahs' },
            { num: '6,236', label: 'Ayahs' },
            { num: '15+', label: 'Qaris' },
            { num: '10+', label: 'Translations' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#4ade80' }}>{s.num}</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div style={{ background: '#f8faf9', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.2rem',
            color: '#0a2e1a',
            marginBottom: '0.5rem',
            fontWeight: '700'
          }}>Everything you need</h2>
          <p style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: '3rem',
            fontSize: '1.1rem'
          }}>One platform for your complete Islamic journey</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '1.8rem',
                border: '1px solid #e8f0eb',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(26,71,42,0.12)'
                  e.currentTarget.style.borderColor = '#4ade80'
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = '#e8f0eb'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ color: '#0a2e1a', margin: '0 0 0.5rem', fontSize: '1.1rem' }}>{f.title}</h3>
                <p style={{ color: '#666', margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: '#0a2e1a',
        padding: '2rem',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '0.9rem'
      }}>
        <p style={{ margin: 0 }}>
          🕌 Islamia.AI — Spreading the light of Islam through technology
        </p>
      </div>
    </div>
  )
}

export default Home