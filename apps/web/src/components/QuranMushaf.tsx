import { useState, useEffect } from 'react'

interface Props {
  surahNumber: number
  translation: string
  theme: 'light' | 'dark' | 'sepia' | 'green'
  fontSize: number
}

const themes = {
  light: { bg: '#FEFEF9', paper: '#FFFEF5', text: '#1a0a00', border: '#C4A96B', accent: '#8B6914', shadow: 'rgba(139,105,20,0.15)' },
  dark: { bg: '#0d0d0d', paper: '#1a1a0d', text: '#F5E6C8', border: '#4a3810', accent: '#D4A017', shadow: 'rgba(0,0,0,0.5)' },
  sepia: { bg: '#F0E6D0', paper: '#FDF6E3', text: '#2C1810', border: '#A0845C', accent: '#6B4226', shadow: 'rgba(107,66,38,0.2)' },
  green: { bg: '#E8F5E9', paper: '#F1F8E9', text: '#1B3A1F', border: '#81C784', accent: '#2E7D32', shadow: 'rgba(46,125,50,0.15)' },
}

const tajweedColors = {
  ghunna: '#22c55e',
  madd: '#3b82f6',
  qalqalah: '#f59e0b',
  idghaam: '#8b5cf6',
  ikhfaa: '#06b6d4',
  iqlaab: '#ef4444',
  waqf: '#64748b',
}

function QuranMushaf({ surahNumber, translation, theme, fontSize }: Props) {
  const [ayahs, setAyahs] = useState<any[]>([])
  const [translationAyahs, setTranslationAyahs] = useState<any[]>([])
  const [surahInfo, setSurahInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [linesPerPage, setLinesPerPage] = useState(15)
  const [showTranslation, setShowTranslation] = useState(true)
  const [showTajweedColors, setShowTajweedColors] = useState(false)
  const [mushafStyle, setMushafStyle] = useState<'colored' | 'blackwhite' | 'indopak'>('colored')
  const [viewStyle, setViewStyle] = useState<'single' | 'double'>('single')

  const t = themes[theme]

  useEffect(() => {
    setLoading(true)
    setCurrentPage(1)
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`).then(r => r.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${translation}`).then(r => r.json())
    ]).then(([arabic, translated]) => {
      setSurahInfo(arabic.data)
      setAyahs(arabic.data.ayahs)
      setTranslationAyahs(translated.data.ayahs)
      setLoading(false)
    })
  }, [surahNumber, translation])

  const totalPages = Math.ceil(ayahs.length / linesPerPage)
  const startIdx = (currentPage - 1) * linesPerPage
  const pageAyahs = ayahs.slice(startIdx, startIdx + linesPerPage)
  const pageTranslations = translationAyahs.slice(startIdx, startIdx + linesPerPage)

  const getArabicTextStyle = () => {
    if (mushafStyle === 'indopak') return { fontFamily: 'serif', letterSpacing: '3px' }
    if (mushafStyle === 'blackwhite') return { fontFamily: 'serif' }
    return { fontFamily: 'serif' }
  }

  if (loading) return (
    <div style={{
      textAlign: 'center', padding: '4rem',
      background: t.bg, borderRadius: '16px', minHeight: '400px'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📖</div>
      <p style={{ color: t.accent, fontSize: '1.1rem' }}>Loading Mushaf...</p>
    </div>
  )

  return (
    <div style={{ background: t.bg, borderRadius: '16px', overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${t.accent}, ${t.accent}cc)`,
        padding: '1.5rem 2rem', color: '#fff', textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 0.3rem', fontSize: '1.8rem', fontFamily: 'serif' }}>
          {surahInfo?.name}
        </h2>
        <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>
          {surahInfo?.englishName} • {surahInfo?.numberOfAyahs} Ayahs
        </p>
      </div>

      {/* Controls */}
      <div style={{
        background: t.paper, borderBottom: `1px solid ${t.border}`,
        padding: '0.8rem 1.5rem', display: 'flex',
        flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: t.accent, fontWeight: '600' }}>Lines/Page:</span>
          {[10, 13, 15, 16, 18, 20].map(n => (
            <button key={n} onClick={() => { setLinesPerPage(n); setCurrentPage(1) }} style={{
              width: '32px', height: '28px', borderRadius: '6px',
              border: `1px solid ${linesPerPage === n ? t.accent : t.border}`,
              background: linesPerPage === n ? t.accent : 'transparent',
              color: linesPerPage === n ? '#fff' : t.text,
              cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600'
            }}>{n}</button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: t.accent, fontWeight: '600' }}>Style:</span>
          {[
            { id: 'colored', label: '🌈 Color' },
            { id: 'blackwhite', label: '⬛ B&W' },
            { id: 'indopak', label: '🕌 Indo-Pak' },
          ].map(s => (
            <button key={s.id} onClick={() => setMushafStyle(s.id as any)} style={{
              padding: '0.3rem 0.7rem', borderRadius: '6px',
              border: `1px solid ${mushafStyle === s.id ? t.accent : t.border}`,
              background: mushafStyle === s.id ? t.accent : 'transparent',
              color: mushafStyle === s.id ? '#fff' : t.text,
              cursor: 'pointer', fontSize: '0.75rem'
            }}>{s.label}</button>
          ))}
        </div>

        <button onClick={() => setViewStyle(viewStyle === 'single' ? 'double' : 'single')} style={{
          padding: '0.3rem 0.7rem', borderRadius: '6px',
          border: `1px solid ${t.border}`,
          background: 'transparent', color: t.text,
          cursor: 'pointer', fontSize: '0.75rem'
        }}>{viewStyle === 'single' ? '📄 Single Page' : '📖 Double Page'}</button>

        <button onClick={() => setShowTajweedColors(!showTajweedColors)} style={{
          padding: '0.3rem 0.7rem', borderRadius: '6px',
          border: `1px solid ${showTajweedColors ? t.accent : t.border}`,
          background: showTajweedColors ? t.accent : 'transparent',
          color: showTajweedColors ? '#fff' : t.text,
          cursor: 'pointer', fontSize: '0.75rem'
        }}>🎨 Tajweed Guide</button>

        <button onClick={() => setShowTranslation(!showTranslation)} style={{
          padding: '0.3rem 0.7rem', borderRadius: '6px',
          border: `1px solid ${showTranslation ? t.accent : t.border}`,
          background: showTranslation ? t.accent : 'transparent',
          color: showTranslation ? '#fff' : t.text,
          cursor: 'pointer', fontSize: '0.75rem'
        }}>📝 Translation</button>
      </div>

      {/* Tajweed Guide */}
      {showTajweedColors && (
        <div style={{
          background: t.paper, padding: '1rem 1.5rem',
          borderBottom: `1px solid ${t.border}`,
          display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.8rem', color: t.text, fontWeight: '600' }}>Tajweed Colors:</span>
          {Object.entries(tajweedColors).map(([rule, color]) => (
            <div key={rule} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: color }} />
              <span style={{ fontSize: '0.75rem', color: t.text, textTransform: 'capitalize' }}>{rule}</span>
            </div>
          ))}
        </div>
      )}

      {/* Mushaf Page */}
      <div style={{
        padding: '2rem',
        display: viewStyle === 'double' ? 'grid' : 'block',
        gridTemplateColumns: viewStyle === 'double' ? '1fr 1fr' : undefined,
        gap: viewStyle === 'double' ? '1rem' : undefined
      }}>
        <div style={{
          background: t.paper, borderRadius: '8px',
          border: `2px solid ${t.border}`,
          padding: '2.5rem 2rem',
          boxShadow: `0 8px 32px ${t.shadow}`,
          minHeight: '600px', position: 'relative'
        }}>
          {/* Top ornament */}
          <div style={{
            textAlign: 'center', marginBottom: '1.5rem',
            borderBottom: `2px solid ${t.border}`, paddingBottom: '1rem'
          }}>
            <span style={{ color: t.accent, fontSize: '1.2rem', fontFamily: 'serif' }}>﷽</span>
          </div>

          {/* Surah name box */}
          {currentPage === 1 && (
            <div style={{
              textAlign: 'center', marginBottom: '1.5rem',
              padding: '0.8rem', border: `2px solid ${t.accent}`, borderRadius: '4px'
            }}>
              <p style={{ fontSize: `${fontSize + 4}px`, fontFamily: 'serif', color: t.accent, margin: 0, letterSpacing: '4px' }}>
                {surahInfo?.name}
              </p>
              <p style={{ fontSize: '0.8rem', color: t.text, opacity: 0.7, margin: '0.3rem 0 0' }}>
                {surahInfo?.englishName} — {surahInfo?.numberOfAyahs} Ayahs
              </p>
            </div>
          )}

          {/* Arabic text */}
          <div style={{ direction: 'rtl', textAlign: 'justify', lineHeight: '3.2', ...getArabicTextStyle() }}>
            {pageAyahs.map((ayah) => (
              <span key={ayah.numberInSurah}>
                <span style={{
                  fontSize: `${fontSize}px`,
                  color: mushafStyle === 'blackwhite'
                    ? '#1a1a1a'
                    : mushafStyle === 'colored'
                      ? (ayah.numberInSurah % 3 === 0 ? '#1a472a' : ayah.numberInSurah % 3 === 1 ? '#1a1a1a' : '#2c1810')
                      : t.text,
                }}>
                  {ayah.text}
                </span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '26px', height: '26px', margin: '0 4px', verticalAlign: 'middle',
                  fontSize: '0.65rem', color: t.accent, fontFamily: 'serif',
                  border: `1px solid ${t.accent}`, borderRadius: '50%'
                }}>{ayah.numberInSurah}</span>
                {' '}
              </span>
            ))}
          </div>

          {/* Page number */}
          <div style={{
            textAlign: 'center', marginTop: '1.5rem',
            borderTop: `1px solid ${t.border}`, paddingTop: '0.8rem',
            fontSize: '0.8rem', color: t.accent, fontFamily: 'serif'
          }}>
            ۝ Page {currentPage} of {totalPages} ۝
          </div>
        </div>

        {/* Double page second side */}
        {viewStyle === 'double' && (
          <div style={{
            background: t.paper, borderRadius: '8px',
            border: `2px solid ${t.border}`, padding: '2.5rem 2rem',
            boxShadow: `0 8px 32px ${t.shadow}`, minHeight: '600px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <p style={{ color: t.accent, opacity: 0.4, fontFamily: 'serif', fontSize: '1.2rem' }}>
              {currentPage < totalPages ? '← Next Page' : 'End of Surah'}
            </p>
          </div>
        )}
      </div>

      {/* Translation */}
      {showTranslation && pageTranslations.length > 0 && (
        <div style={{ padding: '0 2rem 1.5rem' }}>
          <div style={{
            background: t.paper, borderRadius: '12px',
            padding: '1.5rem', border: `1px solid ${t.border}`
          }}>
            <h4 style={{ color: t.accent, margin: '0 0 1rem', fontSize: '0.9rem' }}>
              📝 Translation — Page {currentPage}
            </h4>
            {pageTranslations.map((ayah, index) => (
              <div key={ayah.numberInSurah} style={{
                display: 'flex', gap: '0.8rem', marginBottom: '0.8rem',
                paddingBottom: '0.8rem',
                borderBottom: index < pageTranslations.length - 1 ? `1px solid ${t.border}` : 'none'
              }}>
                <span style={{
                  background: t.accent, color: '#fff',
                  width: '24px', height: '24px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 'bold', flexShrink: 0, marginTop: '2px'
                }}>{ayah.numberInSurah}</span>
                <p style={{ margin: 0, fontSize: '0.9rem', color: t.text, lineHeight: '1.6' }}>
                  {ayah.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{
        padding: '1rem 2rem 2rem',
        display: 'flex', justifyContent: 'center',
        alignItems: 'center', gap: '1rem', flexWrap: 'wrap'
      }}>
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} style={{
          padding: '0.5rem 1rem', borderRadius: '8px',
          border: `1px solid ${t.border}`, background: 'transparent',
          color: t.text, cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.4 : 1, fontSize: '0.85rem'
        }}>⏮ First</button>

        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{
          padding: '0.5rem 1.2rem', borderRadius: '8px',
          border: `1px solid ${t.border}`,
          background: currentPage === 1 ? 'transparent' : t.accent,
          color: currentPage === 1 ? t.text : '#fff',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.4 : 1, fontSize: '0.9rem'
        }}>← Prev</button>

        <span style={{ fontSize: '0.9rem', color: t.text, fontWeight: '600' }}>
          {currentPage} / {totalPages}
        </span>

        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{
          padding: '0.5rem 1.2rem', borderRadius: '8px',
          border: `1px solid ${t.border}`,
          background: currentPage === totalPages ? 'transparent' : t.accent,
          color: currentPage === totalPages ? t.text : '#fff',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.4 : 1, fontSize: '0.9rem'
        }}>Next →</button>

        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} style={{
          padding: '0.5rem 1rem', borderRadius: '8px',
          border: `1px solid ${t.border}`, background: 'transparent',
          color: t.text, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.4 : 1, fontSize: '0.85rem'
        }}>Last ⏭</button>
      </div>
    </div>
  )
}

export default QuranMushaf