import { useState, useEffect } from 'react'

interface Surah {
  number: number
  name: string
  englishName: string
  numberOfAyahs: number
}

function Quran() {
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => {
        setSurahs(data.data)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#1a472a', textAlign: 'center', marginBottom: '2rem' }}>
        📖 القرآن الكريم
      </h1>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading Surahs...</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {surahs.map(surah => (
            <div key={surah.number} style={{
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              padding: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
              onMouseOver={e => (e.currentTarget.style.borderColor = '#1a472a')}
              onMouseOut={e => (e.currentTarget.style.borderColor = '#e0e0e0')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{
                  background: '#1a472a',
                  color: '#fff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>{surah.number}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#1a472a' }}>
                    {surah.englishName}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>
                    {surah.numberOfAyahs} Ayahs
                  </p>
                </div>
              </div>
              <p style={{ margin: '0.5rem 0 0', textAlign: 'right', fontSize: '1.2rem', color: '#1a472a' }}>
                {surah.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Quran