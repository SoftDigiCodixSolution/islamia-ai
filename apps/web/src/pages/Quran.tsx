import { useState } from 'react'
import SurahList from '../components/SurahList'
import SurahReader from '../components/SurahReader'

function Quran() {
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null)
  const [translation, setTranslation] = useState('en.asad')

  const translations = [
    { id: 'en.asad', name: 'English - Asad' },
    { id: 'en.pickthall', name: 'English - Pickthall' },
    { id: 'ur.jalandhry', name: 'Urdu - Jalandhry' },
    { id: 'ur.maududi', name: 'Urdu - Maududi' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
      {/* Header */}
      <div style={{
        background: '#1a472a',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {selectedSurah && (
            <button onClick={() => setSelectedSurah(null)} style={{
              background: 'transparent',
              border: '1px solid #fff',
              color: '#fff',
              padding: '0.4rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>← Back</button>
          )}
          <h2 style={{ color: '#fff', margin: 0 }}>📖 القرآن الكريم</h2>
        </div>
        <select
          value={translation}
          onChange={e => setTranslation(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.9rem'
          }}
        >
          {translations.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        {selectedSurah ? (
          <SurahReader surahNumber={selectedSurah} translation={translation} />
        ) : (
          <SurahList onSelectSurah={setSelectedSurah} />
        )}
      </div>
    </div>
  )
}

export default Quran