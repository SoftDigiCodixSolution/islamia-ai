interface Props {
  onBack: () => void
}

function TajweedGuide({ onBack }: Props) {
  const rules = [
    {
      name: 'Izhaar',
      arabic: 'إظهار',
      color: '#e8f5e9',
      border: '#4ade80',
      desc: 'Clear pronunciation of noon sakinah or tanween when followed by throat letters',
      letters: ['ء', 'ه', 'ع', 'ح', 'غ', 'خ'],
      example: 'مِنْ أَهْلِ'
    },
    {
      name: 'Idghaam',
      arabic: 'إدغام',
      color: '#e3f2fd',
      border: '#60a5fa',
      desc: 'Merging of noon sakinah or tanween into the following letter',
      letters: ['ي', 'ر', 'م', 'ل', 'و', 'ن'],
      example: 'مِنْ رَبِّهِمْ'
    },
    {
      name: 'Iqlaab',
      arabic: 'إقلاب',
      color: '#fce4ec',
      border: '#f472b6',
      desc: 'Changing noon sakinah or tanween into meem when followed by ba',
      letters: ['ب'],
      example: 'أَنْبِئْهُمْ'
    },
    {
      name: 'Ikhfaa',
      arabic: 'إخفاء',
      color: '#fff3e0',
      border: '#fb923c',
      desc: 'Hiding noon sakinah or tanween partially when followed by 15 letters',
      letters: ['ت', 'ث', 'ج', 'د', 'ذ', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ف', 'ق', 'ك'],
      example: 'مَنْ كَانَ'
    },
    {
      name: 'Madd',
      arabic: 'مد',
      color: '#f3e5f5',
      border: '#c084fc',
      desc: 'Elongation of vowel sounds — natural (2 beats) or extended (4-6 beats)',
      letters: ['ا', 'و', 'ي'],
      example: 'قَالَ، يَقُولُ'
    },
    {
      name: 'Qalqalah',
      arabic: 'قلقلة',
      color: '#e0f7fa',
      border: '#22d3ee',
      desc: 'Echoing sound produced when letters have sukoon',
      letters: ['ق', 'ط', 'ب', 'ج', 'د'],
      example: 'قُلْ أَعُوذُ'
    },
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
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>🎵 Tajweed Rules</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>
            Master the rules of Quran recitation
          </p>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>

        {/* Intro */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #e8f0eb'
        }}>
          <h3 style={{ color: '#1a472a', margin: '0 0 0.5rem' }}>
            📖 What is Tajweed?
          </h3>
          <p style={{ color: '#666', margin: 0, lineHeight: '1.7' }}>
            Tajweed (تجويد) means to improve or to make better. It refers to the rules
            governing how the Quran should be recited. Learning Tajweed ensures you
            recite the Quran exactly as Prophet Muhammad ﷺ recited it.
          </p>
        </div>

        {/* Rules */}
        <h3 style={{ color: '#0a2e1a', marginBottom: '1rem' }}>
          Core Tajweed Rules
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {rules.map((rule, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '1.5rem',
              border: `1px solid #e8e8e8`,
              borderLeft: `4px solid ${rule.border}`,
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.2rem', color: '#0a2e1a', fontSize: '1.1rem' }}>
                    {rule.name}
                  </h3>
                  <span style={{ fontSize: '1.3rem', color: '#1a472a', fontFamily: 'serif' }}>
                    {rule.arabic}
                  </span>
                </div>
                <div style={{
                  background: rule.color,
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  color: '#333',
                  fontWeight: '600'
                }}>Rule {i + 1}</div>
              </div>

              <p style={{ color: '#555', margin: '0 0 1rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {rule.desc}
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#888', marginRight: '0.5rem' }}>Letters:</span>
                  {rule.letters.map((l, j) => (
                    <span key={j} style={{
                      display: 'inline-block',
                      background: rule.color,
                      color: '#333',
                      width: '32px', height: '32px',
                      borderRadius: '50%',
                      textAlign: 'center',
                      lineHeight: '32px',
                      fontSize: '1rem',
                      fontFamily: 'serif',
                      margin: '0 2px'
                    }}>{l}</span>
                  ))}
                </div>
                <div style={{
                  background: '#f8faf9',
                  padding: '0.4rem 1rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'serif',
                  color: '#1a472a',
                  direction: 'rtl'
                }}>
                  {rule.example}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TajweedGuide