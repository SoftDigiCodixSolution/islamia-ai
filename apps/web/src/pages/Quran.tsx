import { useState } from 'react'
import SurahList from '../components/SurahList'
import SurahReader from '../components/SurahReader'
import ParaReader from '../components/ParaReader'

type ReadingMode = 'surah' | 'para' | 'continuous'

function Quran() {
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null)
  const [selectedPara, setSelectedPara] = useState<number | null>(null)
  const [translation, setTranslation] = useState('en.asad')
  const [readingMode, setReadingMode] = useState<ReadingMode>('surah')

  const translations = [
    { id: 'en.asad', name: 'English - Asad' },
    { id: 'en.pickthall', name: 'English - Pickthall' },
    { id: 'en.sahih', name: 'English - Sahih' },
    { id: 'ur.jalandhry', name: 'Urdu - Jalandhry' },
    { id: 'ur.maududi', name: 'Urdu - Maududi' },
    { id: 'ur.ahmedali', name: 'Urdu - Ahmed Ali' },
  ]

  const paras = Array.from({ length: 30 }, (_, i) => ({
    number: i + 1,
    name: `Para ${i + 1}`,
    arabic: getParaName(i + 1)
  }))

  function getParaName(num: number) {
    const names = [
      'الم', 'سَيَقُولُ', 'تِلْكَ الرُّسُلُ', 'لَنْ تَنَالُوا', 'وَالْمُحْصَنَاتُ',
      'لَا يُحِبُّ اللَّهُ', 'وَإِذَا سَمِعُوا', 'وَلَوْ أَنَّنَا', 'قَالَ الْمَلَأُ',
      'وَاعْلَمُوا', 'يَعْتَذِرُونَ', 'وَمَا مِنْ دَابَّةٍ', 'وَمَا أُبَرِّئُ',
      'رُبَمَا', 'سُبْحَانَ الَّذِي', 'قَالَ أَلَمْ', 'اقْتَرَبَ', 'قَدْ أَفْلَحَ',
      'وَقَالَ الَّذِينَ', 'أَمَّنْ خَلَقَ', 'اتْلُ مَا أُوحِيَ', 'وَمَنْ يَقْنُتْ',
      'وَمَا لِيَ', 'فَمَنْ أَظْلَمُ', 'إِلَيْهِ يُرَدُّ', 'حم', 'قَالَ فَمَا خَطْبُكُمْ',
      'قَدْ سَمِعَ اللَّهُ', 'تَبَارَكَ الَّذِي', 'عَمَّ'
    ]
    return names[num - 1] || `Para ${num}`
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9', fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #0a2e1a, #1a472a)',
        padding: '1rem 2rem',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {(selectedSurah || selectedPara) && (
            <button onClick={() => { setSelectedSurah(null); setSelectedPara(null) }} style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff', padding: '0.4rem 1rem',
              borderRadius: '8px', cursor: 'pointer'
            }}>← Back</button>
          )}
          <h2 style={{ color: '#fff', margin: 0, fontSize: '1.3rem' }}>📖 القرآن الكريم</h2>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            value={translation}
            onChange={e => setTranslation(e.target.value)}
            style={{
              padding: '0.5rem 1rem', borderRadius: '8px',
              border: 'none', fontSize: '0.85rem', cursor: 'pointer'
            }}
          >
            {translations.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reading Mode Tabs */}
      {!selectedSurah && !selectedPara && (
        <div style={{
          background: '#fff', borderBottom: '1px solid #e8e8e8',
          padding: '0 2rem', display: 'flex', gap: '0'
        }}>
          {[
            { id: 'surah', label: '📖 Surah' },
            { id: 'para', label: '📑 Para (Juz)' },
            { id: 'continuous', label: '▶️ Continuous' },
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => setReadingMode(mode.id as ReadingMode)}
              style={{
                padding: '1rem 1.5rem', border: 'none',
                background: 'transparent', cursor: 'pointer',
                fontSize: '0.9rem', fontWeight: readingMode === mode.id ? '600' : '400',
                color: readingMode === mode.id ? '#1a472a' : '#888',
                borderBottom: readingMode === mode.id ? '3px solid #1a472a' : '3px solid transparent',
                transition: 'all 0.2s'
              }}
            >{mode.label}</button>
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        {selectedSurah ? (
          <SurahReader
            surahNumber={selectedSurah}
            translation={translation}
          />
        ) : selectedPara ? (
          <ParaReader
            paraNumber={selectedPara}
            translation={translation}
          />
        ) : readingMode === 'surah' ? (
          <SurahList onSelectSurah={setSelectedSurah} />
        ) : readingMode === 'para' ? (
          <div>
            <h3 style={{ color: '#0a2e1a', marginBottom: '1.5rem' }}>
              Select a Para (Juz)
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '1rem'
            }}>
              {paras.map(para => (
                <div
                  key={para.number}
                  onClick={() => setSelectedPara(para.number)}
                  style={{
                    background: '#fff', borderRadius: '14px',
                    padding: '1.2rem', textAlign: 'center',
                    border: '1px solid #e8e8e8', cursor: 'pointer',
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
                  <div style={{
                    background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
                    color: '#fff', width: '44px', height: '44px',
                    borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 0.8rem', fontWeight: 'bold'
                  }}>{para.number}</div>
                  <p style={{ margin: '0 0 0.3rem', fontWeight: '600', color: '#0a2e1a', fontSize: '0.9rem' }}>
                    Para {para.number}
                  </p>
                  <p style={{ margin: 0, fontFamily: 'serif', color: '#1a472a', fontSize: '1.1rem' }}>
                    {para.arabic}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <SurahList onSelectSurah={setSelectedSurah} />
        )}
      </div>
    </div>
  )
}

export default Quran