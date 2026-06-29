interface Props {
  onBack: () => void
}

function QaidaLesson({ onBack }: Props) {
  const letters = [
    { arabic: 'ا', name: 'Alif', sound: 'a' },
    { arabic: 'ب', name: 'Ba', sound: 'b' },
    { arabic: 'ت', name: 'Ta', sound: 't' },
    { arabic: 'ث', name: 'Tha', sound: 'th' },
    { arabic: 'ج', name: 'Jim', sound: 'j' },
    { arabic: 'ح', name: 'Ha', sound: 'h' },
    { arabic: 'خ', name: 'Kha', sound: 'kh' },
    { arabic: 'د', name: 'Dal', sound: 'd' },
    { arabic: 'ذ', name: 'Dhal', sound: 'dh' },
    { arabic: 'ر', name: 'Ra', sound: 'r' },
    { arabic: 'ز', name: 'Zay', sound: 'z' },
    { arabic: 'س', name: 'Sin', sound: 's' },
    { arabic: 'ش', name: 'Shin', sound: 'sh' },
    { arabic: 'ص', name: 'Sad', sound: 'ṣ' },
    { arabic: 'ض', name: 'Dad', sound: 'ḍ' },
    { arabic: 'ط', name: 'Ta', sound: 'ṭ' },
    { arabic: 'ظ', name: 'Dha', sound: 'ẓ' },
    { arabic: 'ع', name: 'Ain', sound: 'ʿ' },
    { arabic: 'غ', name: 'Ghain', sound: 'gh' },
    { arabic: 'ف', name: 'Fa', sound: 'f' },
    { arabic: 'ق', name: 'Qaf', sound: 'q' },
    { arabic: 'ك', name: 'Kaf', sound: 'k' },
    { arabic: 'ل', name: 'Lam', sound: 'l' },
    { arabic: 'م', name: 'Mim', sound: 'm' },
    { arabic: 'ن', name: 'Nun', sound: 'n' },
    { arabic: 'ه', name: 'Ha', sound: 'h' },
    { arabic: 'و', name: 'Waw', sound: 'w' },
    { arabic: 'ي', name: 'Ya', sound: 'y' },
  ]

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f8faf9' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #0a2e1a, #1a472a)',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        color: '#fff'
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}>← Back</button>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>📚 Quranic Qaida</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>Learn all 28 Arabic letters</p>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>

        {/* Intro Card */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #e8f0eb',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h3 style={{ color: '#1a472a', margin: '0 0 0.5rem' }}>
            🌟 Welcome to Quranic Qaida
          </h3>
          <p style={{ color: '#666', margin: 0, lineHeight: '1.6' }}>
            The Arabic alphabet has 28 letters. Each letter has a unique shape and sound.
            Click on any letter to learn more about it. Practice daily for best results!
          </p>
        </div>

        {/* Letters Grid */}
        <h3 style={{ color: '#0a2e1a', marginBottom: '1rem' }}>
          Arabic Alphabet — الحروف الهجائية
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '1rem'
        }}>
          {letters.map((letter, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: '14px',
                padding: '1.2rem',
                textAlign: 'center',
                border: '1px solid #e8e8e8',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = '#4ade80'
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(26,71,42,0.12)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = '#e8e8e8'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{
                fontSize: '2.8rem',
                color: '#1a472a',
                fontFamily: 'serif',
                lineHeight: '1.2',
                marginBottom: '0.5rem'
              }}>{letter.arabic}</div>
              <div style={{ fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                {letter.name}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#888',
                marginTop: '0.2rem'
              }}>/{letter.sound}/</div>
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.7rem',
                background: '#e8f5e9',
                color: '#1a472a',
                padding: '0.2rem 0.5rem',
                borderRadius: '20px',
                display: 'inline-block'
              }}>#{i + 1}</div>
            </div>
          ))}
        </div>

        {/* Harakat Section */}
        <h3 style={{ color: '#0a2e1a', marginTop: '2.5rem', marginBottom: '1rem' }}>
          Harakat — Short Vowels — الحركات
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { symbol: 'بَ', name: 'Fatha', sound: 'a', example: 'ba' },
            { symbol: 'بِ', name: 'Kasra', sound: 'i', example: 'bi' },
            { symbol: 'بُ', name: 'Damma', sound: 'u', example: 'bu' },
            { symbol: 'بْ', name: 'Sukoon', sound: 'silent', example: 'b' },
            { symbol: 'بّ', name: 'Shadda', sound: 'double', example: 'bb' },
            { symbol: 'بً', name: 'Tanween', sound: 'an/in/un', example: 'ban' },
          ].map((h, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '1.2rem',
              border: '1px solid #e8e8e8',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                fontSize: '2.2rem',
                color: '#1a472a',
                fontFamily: 'serif',
                minWidth: '40px',
                textAlign: 'center'
              }}>{h.symbol}</div>
              <div>
                <div style={{ fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>{h.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>Sound: /{h.sound}/</div>
                <div style={{ fontSize: '0.8rem', color: '#1a472a' }}>e.g. "{h.example}"</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QaidaLesson