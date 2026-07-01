import { useState, useEffect } from 'react'

interface Props {
  surahNumber: number
  translation: string
  theme: 'light' | 'dark' | 'sepia' | 'green'
  fontSize: number
}

interface Ayah {
  numberInSurah: number
  text: string
  translation: string
}

function QuranMushaf({ surahNumber, translation, theme, fontSize }: Props) {
  const [ayahs, setAyahs] = useState<Ayah[]>([])
  const [loading, setLoading] = useState(true)
  const [surahInfo, setSurahInfo] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'mushaf' | 'line' | 'page'>('mushaf')

  const themes = {
    light: { bg: '#FAFAF7', text: '#1a1a1a', card: '#fff', border: '#e8e0d0', accent: '#1a472a' },
    dark: { bg: '#1a1a2e', text: '#e8e8e8', card: '#16213e', border: '#2d4a7a', accent: '#4ade80' },
    sepia: { bg: '#F4ECD8', text: '#2C1810', card: '#FDF6E3', border: '#C4A882', accent: '#8B4513' },
    green: { bg: '#e8f5e9', text: '#1b5e20', card: '#fff', border: '#a5d6a7', accent: '#2e7d32' },
  }

  const t = themes[theme]

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`).then(r => r.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${translation}`).then(r => r.json())
    ]).then(([arabic, translated]) => {
      setSurahInfo(arabic.data)
      const combined = arabic.data.ayahs.map((ayah: any, i: number) => ({
        numberInSurah: ayah.numberInSurah,
        text: ayah.text,
        translation: translated.data.ayahs[i]?.text || ''
      }))
      setAyahs(combined)
      setLoading(false)
    })
  }, [surahNumber, translation])

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem', background: t.bg, minHeight: '400px', borderRadius: '16px' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
      <p style={{ color: t.accent }}>Loading Surah...</p>
    </div>
  )

  return (
    <div style={{ background: t.bg, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>

      {/* Surah Header */}
      <div style={{
        background: `linear-gradient(135deg, ${t.accent}, ${t.accent}dd)`,
        padding: '2rem', textAlign: 'center', color: '#fff'
      }}>
        <p style={{ margin: '0 0 0.5rem', opacity: 0.8, fontSize: '0.85rem', letterSpacing: '3px' }}>
          سورة
        </p>
        <h1 style={{ fontSize: '3rem', margin: '0 0 0.3rem', fontFamily: 'serif' }}>
          {surahInfo?.name}
        </h1>
        <p style={{ margin: '0 0 1rem', opacity: 0.8 }}>
          {surahInfo?.englishName} • {surahInfo?.numberOfAyahs} Ayahs • {surahInfo?.revelationType}
        </p>
        <p style={{ fontSize: '1.6rem', fontFamily: 'serif', margin: 0, letterSpacing: '3px' }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
      </div>

      {/* View Mode Tabs */}
      <div style={{
        background: t.card, borderBottom: `1px solid ${t.border}`,
        display: 'flex', gap: 0, padding: '0 1rem'
      }}>
        {[
          { id: 'mushaf', label: '📖 Mushaf' },
          { id: 'line', label: '📄 Line by Line' },
          { id: 'page', label: '📑 Page View' },
        ].map(mode => (
          <button key={mode.id} onClick={() => setViewMode(mode.id as any)} style={{
            padding: '0.8rem 1.2rem', border: 'none',
            background: 'transparent', cursor: 'pointer',
            fontSize: '0.85rem', color: viewMode === mode.id ? t.accent : '#888',
            borderBottom: viewMode === mode.id ? `3px solid ${t.accent}` : '3px solid transparent',
            fontWeight: viewMode === mode.id ? '600' : '400'
          }}>{mode.label}</button>
        ))}
      </div>

      {/* Mushaf View */}
      {viewMode === 'mushaf' && (
        <div style={{ padding: '2rem' }}>
          <div style={{
            background: t.card, borderRadius: '12px',
            padding: '2rem', border: `1px solid ${t.border}`,
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
          }}>
            <p style={{
              fontSize: `${fontSize}px`,
              lineHeight: '2.5',
              textAlign: 'justify',
              direction: 'rtl',
              color: t.text,
              fontFamily: 'serif',
              margin: 0,
              wordSpacing: '8px'
            }}>
              {ayahs.map(ayah => (
                <span key={ayah.numberInSurah}>
                  {ayah.text}
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px', height: '28px',
                    background: t.accent,
                    color: '#fff',
                    borderRadius: '50%',
                    fontSize: '0.65rem',
                    margin: '0 4px',
                    verticalAlign: 'middle',
                    fontFamily: 'sans-serif'
                  }}>{ayah.numberInSurah}</span>
                  {' '}
                </span>
              ))}
            </p>
          </div>
        </div>
      )}

      {/* Line by Line View */}
      {viewMode === 'line' && (
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {ayahs.map(ayah => (
            <div key={ayah.numberInSurah} style={{
              background: t.card, borderRadius: '12px',
              padding: '1.2rem 1.5rem', border: `1px solid ${t.border}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{
                  background: t.accent, color: '#fff',
                  width: '32px', height: '32px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 'bold'
                }}>{ayah.numberInSurah}</span>
              </div>
              <p style={{
                fontSize: `${fontSize}px`, textAlign: 'right',
                direction: 'rtl', color: t.text, fontFamily: 'serif',
                lineHeight: '2.2', margin: '0 0 0.8rem'
              }}>{ayah.text}</p>
              <p style={{ fontSize: '0.9rem', color: t.text, opacity: 0.7, margin: 0, lineHeight: '1.6' }}>
                {ayah.translation}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Page View */}
      {viewMode === 'page' && (
        <div style={{ padding: '2rem' }}>
          <div style={{
            background: t.card, maxWidth: '600px', margin: '0 auto',
            borderRadius: '4px', padding: '3rem 2.5rem',
            border: `2px solid ${t.border}`,
            boxShadow: '4px 4px 0 rgba(0,0,0,0.05), -4px 4px 0 rgba(0,0,0,0.05)',
            minHeight: '800px'
          }}>
            <p style={{
              fontSize: `${fontSize + 2}px`, lineHeight: '3',
              textAlign: 'center', direction: 'rtl',
              color: t.text, fontFamily: 'serif',
              margin: 0, wordSpacing: '12px'
            }}>
              {ayahs.slice(0, 15).map(ayah => (
                <span key={ayah.numberInSurah}>
                  {ayah.text}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center',
                    justifyContent: 'center', width: '24px', height: '24px',
                    color: t.accent, fontSize: '0.7rem',
                    margin: '0 3px', verticalAlign: 'middle',
                    fontFamily: 'sans-serif'
                  }}>۝{ayah.numberInSurah}</span>
                </span>
              ))}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuranMushaf