import { useState } from 'react'
import SurahList from '../components/SurahList'
import SurahReader from '../components/SurahReader'
import ParaReader from '../components/ParaReader'
import QuranMushaf from '../components/QuranMushaf'

type ReadingMode = 'surah' | 'para' | 'mushaf'
type Theme = 'light' | 'dark' | 'sepia' | 'green'

function Quran() {
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null)
  const [selectedPara, setSelectedPara] = useState<number | null>(null)
  const [translation, setTranslation] = useState('en.asad')
  const [readingMode, setReadingMode] = useState<ReadingMode>('surah')
  const [theme, setTheme] = useState<Theme>('light')
  const [fontSize, setFontSize] = useState(28)
  const [showSettings, setShowSettings] = useState(false)

  const translations = [
    { id: 'en.asad', name: '🇬🇧 English - Asad' },
    { id: 'en.pickthall', name: '🇬🇧 English - Pickthall' },
    { id: 'en.sahih', name: '🇬🇧 English - Sahih Int.' },
    { id: 'ur.jalandhry', name: '🇵🇰 Urdu - Jalandhry' },
    { id: 'ur.maududi', name: '🇵🇰 Urdu - Maududi' },
    { id: 'ur.ahmedali', name: '🇵🇰 Urdu - Ahmed Ali' },
    { id: 'fr.hamidullah', name: '🇫🇷 French - Hamidullah' },
    { id: 'tr.ates', name: '🇹🇷 Turkish - Ates' },
    { id: 'de.bubenheim', name: '🇩🇪 German - Bubenheim' },
    { id: 'id.indonesian', name: '🇮🇩 Indonesian' },
  ]

  const themes = {
    light: { bg: '#f9f9f9', nav: '#0a2e1a', label: '☀️ Light' },
    dark: { bg: '#1a1a2e', nav: '#0d1b2a', label: '🌙 Dark' },
    sepia: { bg: '#F4ECD8', nav: '#5C3317', label: '📜 Sepia' },
    green: { bg: '#e8f5e9', nav: '#1b5e20', label: '🌿 Green' },
  }

  const paras = Array.from({ length: 30 }, (_, i) => ({
    number: i + 1,
    arabic: ['الم', 'سَيَقُولُ', 'تِلْكَ الرُّسُلُ', 'لَنْ تَنَالُوا', 'وَالْمُحْصَنَاتُ',
      'لَا يُحِبُّ اللَّهُ', 'وَإِذَا سَمِعُوا', 'وَلَوْ أَنَّنَا', 'قَالَ الْمَلَأُ',
      'وَاعْلَمُوا', 'يَعْتَذِرُونَ', 'وَمَا مِنْ دَابَّةٍ', 'وَمَا أُبَرِّئُ',
      'رُبَمَا', 'سُبْحَانَ الَّذِي', 'قَالَ أَلَمْ', 'اقْتَرَبَ', 'قَدْ أَفْلَحَ',
      'وَقَالَ الَّذِينَ', 'أَمَّنْ خَلَقَ', 'اتْلُ مَا أُوحِيَ', 'وَمَنْ يَقْنُتْ',
      'وَمَا لِيَ', 'فَمَنْ أَظْلَمُ', 'إِلَيْهِ يُرَدُّ', 'حم', 'قَالَ فَمَا خَطْبُكُمْ',
      'قَدْ سَمِعَ اللَّهُ', 'تَبَارَكَ الَّذِي', 'عَمَّ'][i]
  }))

  const navBg = themes[theme].nav

  return (
    <div style={{ minHeight: '100vh', background: themes[theme].bg, fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{
        background: navBg, padding: '1rem 2rem',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
        position: 'sticky', top: '64px', zIndex: 50
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
          <h2 style={{ color: '#fff', margin: 0, fontSize: '1.2rem' }}>📖 القرآن الكريم</h2>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <select value={translation} onChange={e => setTranslation(e.target.value)} style={{
            padding: '0.4rem 0.8rem', borderRadius: '8px',
            border: 'none', fontSize: '0.8rem', cursor: 'pointer'
          }}>
            {translations.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>

          <button onClick={() => setShowSettings(!showSettings)} style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff', padding: '0.4rem 0.9rem',
            borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem'
          }}>⚙️ Settings</button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div style={{
          background: '#fff', borderBottom: '1px solid #e8e8e8',
          padding: '1rem 2rem', display: 'flex',
          gap: '2rem', flexWrap: 'wrap', alignItems: 'center'
        }}>
          {/* Theme */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#666' }}>Theme:</span>
            {(Object.keys(themes) as Theme[]).map(t => (
              <button key={t} onClick={() => setTheme(t)} style={{
                padding: '0.3rem 0.8rem', borderRadius: '20px',
                border: '1px solid',
                borderColor: theme === t ? '#1a472a' : '#ddd',
                background: theme === t ? '#1a472a' : 'transparent',
                color: theme === t ? '#fff' : '#555',
                cursor: 'pointer', fontSize: '0.8rem'
              }}>{themes[t].label}</button>
            ))}
          </div>

          {/* Font Size */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#666' }}>Arabic Size:</span>
            <button onClick={() => setFontSize(f => Math.max(18, f - 2))} style={{
              width: '28px', height: '28px', borderRadius: '50%',
              border: '1px solid #ddd', background: '#f5f5f5', cursor: 'pointer'
            }}>−</button>
            <span style={{ fontWeight: 'bold', color: '#1a472a', fontSize: '0.85rem', minWidth: '40px', textAlign: 'center' }}>{fontSize}px</span>
            <button onClick={() => setFontSize(f => Math.min(52, f + 2))} style={{
              width: '28px', height: '28px', borderRadius: '50%',
              border: '1px solid #ddd', background: '#f5f5f5', cursor: 'pointer'
            }}>+</button>
          </div>
        </div>
      )}

      {/* Reading Mode Tabs */}
      {!selectedSurah && !selectedPara && (
        <div style={{
          background: '#fff', borderBottom: '1px solid #e8e8e8',
          padding: '0 2rem', display: 'flex', gap: 0
        }}>
          {[
            { id: 'surah', label: '📖 Surah' },
            { id: 'para', label: '📑 Para (Juz)' },
            { id: 'mushaf', label: '🕌 Mushaf View' },
          ].map(mode => (
            <button key={mode.id} onClick={() => setReadingMode(mode.id as ReadingMode)} style={{
              padding: '1rem 1.5rem', border: 'none',
              background: 'transparent', cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: readingMode === mode.id ? '600' : '400',
              color: readingMode === mode.id ? '#1a472a' : '#888',
              borderBottom: readingMode === mode.id ? '3px solid #1a472a' : '3px solid transparent'
            }}>{mode.label}</button>
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        {selectedSurah ? (
          readingMode === 'mushaf' ? (
            <QuranMushaf
              surahNumber={selectedSurah}
              translation={translation}
              theme={theme}
              fontSize={fontSize}
              showTajweed={false}
            />
          ) : (
            <SurahReader surahNumber={selectedSurah} translation={translation} />
          )
        ) : selectedPara ? (
          <ParaReader paraNumber={selectedPara} translation={translation} />
        ) : readingMode === 'surah' ? (
          <SurahList onSelectSurah={(num) => { setSelectedSurah(num) }} />
        ) : readingMode === 'mushaf' ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🕌</div>
            <h3 style={{ color: '#1a472a' }}>Select a Surah to read in Mushaf view</h3>
            <button onClick={() => setReadingMode('surah')} style={{
              background: '#1a472a', color: '#fff', border: 'none',
              padding: '0.8rem 2rem', borderRadius: '10px',
              cursor: 'pointer', fontSize: '1rem', marginTop: '1rem'
            }}>Browse Surahs →</button>
          </div>
        ) : (
          <div>
            <h3 style={{ color: '#0a2e1a', marginBottom: '1.5rem' }}>Select a Para (Juz)</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '1rem'
            }}>
              {paras.map(para => (
                <div key={para.number} onClick={() => setSelectedPara(para.number)} style={{
                  background: '#fff', borderRadius: '14px',
                  padding: '1.2rem', textAlign: 'center',
                  border: '1px solid #e8e8e8', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                  onMouseOver={e => {
                    e.currentTarget.style.borderColor = '#1a472a'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.borderColor = '#e8e8e8'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{
                    background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
                    color: '#fff', width: '44px', height: '44px',
                    borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 0.8rem', fontWeight: 'bold'
                  }}>{para.number}</div>
                  <p style={{ margin: '0 0 0.3rem', fontWeight: '600', color: '#0a2e1a', fontSize: '0.85rem' }}>
                    Para {para.number}
                  </p>
                  <p style={{ margin: 0, fontFamily: 'serif', color: '#1a472a', fontSize: '1rem' }}>
                    {para.arabic}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Quran