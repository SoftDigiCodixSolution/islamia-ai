import { useState, useEffect } from 'react'

interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

interface Props {
  onSelectSurah: (number: number) => void
}

function SurahList({ onSelectSurah }: Props) {
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => {
        setSurahs(data.data)
        setLoading(false)
      })
  }, [])

  const filtered = surahs.filter(s =>
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.name.includes(search) ||
    s.number.toString().includes(search)
  )

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
      <p style={{ color: '#1a472a', fontSize: '1.1rem' }}>Loading Surahs...</p>
    </div>
  )

  return (
    <div>
      {/* Search */}
      <div style={{ marginBottom: '2rem', position: 'relative' }}>
        <span style={{
          position: 'absolute', left: '1rem', top: '50%',
          transform: 'translateY(-50%)', fontSize: '1.2rem'
        }}>🔍</span>
        <input
          type="text"
          placeholder="Search Surah by name or number..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '0.9rem 1rem 0.9rem 3rem',
            borderRadius: '12px',
            border: '2px solid #e0e0e0',
            fontSize: '1rem',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={e => e.target.style.borderColor = '#1a472a'}
          onBlur={e => e.target.style.borderColor = '#e0e0e0'}
        />
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {[
          { label: 'Total Surahs', value: '114', icon: '📚' },
          { label: 'Total Ayahs', value: '6,236', icon: '✨' },
          { label: 'Years Revealed', value: '23', icon: '🌙' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: '#fff',
            border: '1px solid #e8e8e8',
            borderRadius: '12px',
            padding: '1rem',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: '1.5rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1a472a' }}>{stat.value}</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Surah Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1rem'
      }}>
        {filtered.map(surah => (
          <div
            key={surah.number}
            onClick={() => onSelectSurah(surah.number)}
            style={{
              background: '#fff',
              border: '1px solid #e8e8e8',
              borderRadius: '14px',
              padding: '1.2rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = '#1a472a'
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(26,71,42,0.15)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = '#e8e8e8'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{
                  background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
                  color: '#fff',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>{surah.number}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: '600', color: '#222', fontSize: '0.95rem' }}>
                    {surah.englishName}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>
                    {surah.englishNameTranslation}
                  </p>
                </div>
              </div>
              <span style={{
                background: surah.revelationType === 'Meccan' ? '#e8f5e9' : '#e3f2fd',
                color: surah.revelationType === 'Meccan' ? '#1a472a' : '#1565c0',
                fontSize: '0.65rem',
                padding: '0.2rem 0.5rem',
                borderRadius: '20px',
                fontWeight: '600'
              }}>{surah.revelationType}</span>
            </div>
            <div style={{
              marginTop: '0.8rem',
              paddingTop: '0.8rem',
              borderTop: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.8rem', color: '#888' }}>
                {surah.numberOfAyahs} Ayahs
              </span>
              <span style={{ fontSize: '1.3rem', color: '#1a472a', fontWeight: 'bold' }}>
                {surah.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SurahList