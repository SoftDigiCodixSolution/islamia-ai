import { useState, useEffect, useRef } from 'react'

interface Props {
  surahNumber: number
  translation: string
  theme: 'light' | 'dark' | 'sepia' | 'green'
  fontSize: number
}

const themes = {
  light: { bg: '#FEFEF9', paper: '#FFFEF5', text: '#1a0a00', border: '#C4A96B', accent: '#8B6914', shadow: 'rgba(139,105,20,0.15)', subtext: '#555' },
  dark: { bg: '#0d0d0d', paper: '#1a1a0d', text: '#F5E6C8', border: '#4a3810', accent: '#D4A017', shadow: 'rgba(0,0,0,0.5)', subtext: '#aaa' },
  sepia: { bg: '#F0E6D0', paper: '#FDF6E3', text: '#2C1810', border: '#A0845C', accent: '#6B4226', shadow: 'rgba(107,66,38,0.2)', subtext: '#7a5c44' },
  green: { bg: '#E8F5E9', paper: '#F1F8E9', text: '#1B3A1F', border: '#81C784', accent: '#2E7D32', shadow: 'rgba(46,125,50,0.15)', subtext: '#4a7a4e' },
}

const qaris = [
  { name: 'Mishary Alafasy', code: 'Alafasy_128kbps', country: '🇰🇼' },
  { name: 'Abdurrahman Al-Sudais', code: 'Sudais_128kbps', country: '🇸🇦' },
  { name: 'Saud Al-Shuraim', code: 'Shuraym_128kbps', country: '🇸🇦' },
  { name: 'Maher Al-Muaiqly', code: 'Maher_AlMuaiqly_128kbps', country: '🇸🇦' },
  { name: 'Abu Bakr Al-Shatri', code: 'Abu_Bakr_Ash-Shaatree_128kbps', country: '🇸🇦' },
  { name: 'Hani Ar-Rifai', code: 'Hani_Rifai_128kbps', country: '🇸🇦' },
  { name: 'Yasser Al-Dosari', code: 'Yasser_Ad-Dussary_128kbps', country: '🇸🇦' },
]

function applyTajweedColors(text: string, enabled: boolean) {
  if (!enabled) return <span className="quran-text">{text}</span>

  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => {
        let color = 'inherit'
        if (/[من]ّ/.test(word)) color = '#22c55e'
        else if (/[اويى]/.test(word) && word.length > 3) color = '#3b82f6'
        else if (/[قطبجد]ْ/.test(word)) color = '#f59e0b'
        else if (/الل/.test(word)) color = '#8b5cf6'
        else if (/[صضطظ]/.test(word)) color = '#ef4444'

        return (
          <span key={i} className="quran-text" style={{ color, marginLeft: '4px' }}>
            {word}
          </span>
        )
      })}
    </>
  )
}

function QuranMushaf({ surahNumber, translation, theme, fontSize }: Props) {
  const [ayahs, setAyahs] = useState<any[]>([])
  const [translationAyahs, setTranslationAyahs] = useState<any[]>([])
  const [surahInfo, setSurahInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [linesPerPage, setLinesPerPage] = useState(15)
  const [showTranslation, setShowTranslation] = useState(true)
  const [mushafStyle, setMushafStyle] = useState<'uthmani' | 'colored' | 'blackwhite'>('uthmani')
  const [readMode, setReadMode] = useState<'mushaf' | 'ayah' | 'page'>('mushaf')
  const [currentAyah, setCurrentAyah] = useState(0)
  const [playingAyah, setPlayingAyah] = useState<number | null>(null)
  const [selectedQari, setSelectedQari] = useState(qaris[0])
  const [playMode, setPlayMode] = useState<'single' | 'continuous'>('continuous')
  const [showQariSelect, setShowQariSelect] = useState(false)
  const [selectedTranslation, setSelectedTranslation] = useState(translation)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const bismillahRef = useRef<HTMLAudioElement | null>(null)

  const t = themes[theme]

  const translations = [
    { id: 'en.asad', name: '🇬🇧 English - Asad' },
    { id: 'en.pickthall', name: '🇬🇧 English - Pickthall' },
    { id: 'en.sahih', name: '🇬🇧 English - Sahih' },
    { id: 'ur.jalandhry', name: '🇵🇰 Urdu - Jalandhry' },
    { id: 'ur.maududi', name: '🇵🇰 Urdu - Maududi' },
    { id: 'fr.hamidullah', name: '🇫🇷 French' },
    { id: 'tr.ates', name: '🇹🇷 Turkish' },
    { id: 'de.bubenheim', name: '🇩🇪 German' },
    { id: 'id.indonesian', name: '🇮🇩 Indonesian' },
  ]

  // Common Mushaf line counts: 15 (standard), 16 (Medina), 18 (Kuwait), 19 (Turkey), 20 (Indo-Pak)
  const lineOptions = [15, 16, 18, 19, 20]

  useEffect(() => {
    setLoading(true)
    setCurrentPage(1)
    setCurrentAyah(0)
    stopAudio()
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`).then(r => r.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${selectedTranslation}`).then(r => r.json())
    ]).then(([arabic, translated]) => {
      setSurahInfo(arabic.data)
      setAyahs(arabic.data.ayahs)
      setTranslationAyahs(translated.data.ayahs)
      setLoading(false)
    })
  }, [surahNumber, selectedTranslation])

  const totalPages = Math.ceil(ayahs.length / linesPerPage)
  const startIdx = (currentPage - 1) * linesPerPage
  const pageAyahs = ayahs.slice(startIdx, startIdx + linesPerPage)
  const pageTranslations = translationAyahs.slice(startIdx, startIdx + linesPerPage)

  const getAudioUrl = (ayahNum: number) => {
    const s = String(surahNumber).padStart(3, '0')
    const a = String(ayahNum).padStart(3, '0')
    return `https://everyayah.com/data/${selectedQari.code}/${s}${a}.mp3`
  }

  const getBismillahUrl = () => {
    return `https://everyayah.com/data/${selectedQari.code}/001001.mp3`
  }

  const stopAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    if (bismillahRef.current) { bismillahRef.current.pause(); bismillahRef.current = null }
    setPlayingAyah(null)
  }

  const playAyahAudio = (ayahNum: number) => {
    stopAudio()
    setPlayingAyah(ayahNum)
    const audio = new Audio(getAudioUrl(ayahNum))
    audioRef.current = audio
    audio.play()
    audio.onended = () => {
      if (playMode === 'continuous') {
        const nextAyah = ayahNum + 1
        if (nextAyah <= ayahs.length) {
          playAyahAudio(nextAyah)
        } else {
          setPlayingAyah(null)
        }
      } else {
        setPlayingAyah(null)
      }
    }
  }

  const playSurahFromStart = () => {
    const bismillah = new Audio(getBismillahUrl())
    bismillahRef.current = bismillah
    bismillah.play()
    bismillah.onended = () => {
      playAyahAudio(1)
    }
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem', background: t.bg, borderRadius: '16px', minHeight: '400px' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📖</div>
      <p style={{ color: t.accent, fontSize: '1.1rem' }}>Loading Mushaf...</p>
    </div>
  )

  return (
    <div style={{ background: t.bg, borderRadius: '16px', overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>

      {/* Surah Header */}
      <div style={{
        background: `linear-gradient(135deg, ${t.accent}ee, ${t.accent}99)`,
        padding: '1.5rem 2rem', color: '#fff', textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 0.2rem', opacity: 0.8, fontSize: '0.8rem', letterSpacing: '3px' }}>
          {surahInfo?.revelationType?.toUpperCase()} • {surahInfo?.numberOfAyahs} AYAHS
        </p>
        <h1 className="quran-text" style={{ fontSize: '2.5rem', margin: '0 0 0.2rem', letterSpacing: '4px' }}>
          {surahInfo?.name}
        </h1>
        <p style={{ margin: '0 0 1rem', opacity: 0.85, fontSize: '1rem' }}>
          {surahInfo?.englishName} — {surahInfo?.englishNameTranslation}
        </p>
        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={playingAyah || bismillahRef.current ? stopAudio : playSurahFromStart} style={{
            background: '#4ade80', color: '#0a2e1a', border: 'none',
            padding: '0.6rem 1.5rem', borderRadius: '8px',
            cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem'
          }}>{playingAyah ? '⏹ Stop' : '▶️ Play Surah'}</button>
          <button onClick={() => setShowQariSelect(!showQariSelect)} style={{
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '8px',
            cursor: 'pointer', fontSize: '0.85rem'
          }}>🎙️ {selectedQari.country} {selectedQari.name}</button>
        </div>
      </div>

      {/* Qari Selection */}
      {showQariSelect && (
        <div style={{
          background: t.paper, borderBottom: `1px solid ${t.border}`,
          padding: '1rem 1.5rem'
        }}>
          <p style={{ margin: '0 0 0.8rem', fontSize: '0.85rem', color: t.accent, fontWeight: '600' }}>
            Select Qari:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {qaris.map(q => (
              <button key={q.code} onClick={() => { stopAudio(); setSelectedQari(q); setShowQariSelect(false) }} style={{
                padding: '0.4rem 0.9rem', borderRadius: '8px',
                border: `1px solid ${selectedQari.code === q.code ? t.accent : t.border}`,
                background: selectedQari.code === q.code ? t.accent : 'transparent',
                color: selectedQari.code === q.code ? '#fff' : t.text,
                cursor: 'pointer', fontSize: '0.8rem'
              }}>{q.country} {q.name}</button>
            ))}
          </div>
        </div>
      )}

      {/* Controls Bar */}
      <div style={{
        background: t.paper, borderBottom: `1px solid ${t.border}`,
        padding: '0.8rem 1.5rem', display: 'flex',
        flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center'
      }}>

        {/* Read Mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.8rem', color: t.accent, fontWeight: '600' }}>Read:</span>
          {[
            { id: 'mushaf', label: '📖 Mushaf' },
            { id: 'ayah', label: '🔢 Ayah by Ayah' },
            { id: 'page', label: '📄 Page View' },
          ].map(m => (
            <button key={m.id} onClick={() => setReadMode(m.id as any)} style={{
              padding: '0.3rem 0.6rem', borderRadius: '6px',
              border: `1px solid ${readMode === m.id ? t.accent : t.border}`,
              background: readMode === m.id ? t.accent : 'transparent',
              color: readMode === m.id ? '#fff' : t.text,
              cursor: 'pointer', fontSize: '0.75rem'
            }}>{m.label}</button>
          ))}
        </div>

        {/* Lines per page - expanded with more options */}
        {(readMode === 'mushaf' || readMode === 'page') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: t.accent, fontWeight: '600' }}>Lines:</span>
            {lineOptions.map(n => (
              <button key={n} onClick={() => { setLinesPerPage(n); setCurrentPage(1) }} style={{
                padding: '0.3rem 0.6rem',
                borderRadius: '6px',
                border: `1px solid ${linesPerPage === n ? t.accent : t.border}`,
                background: linesPerPage === n ? t.accent : 'transparent',
                color: linesPerPage === n ? '#fff' : t.text,
                cursor: 'pointer', fontSize: '0.72rem', fontWeight: '600',
                minWidth: '32px'
              }}>{n}</button>
            ))}
          </div>
        )}

        {/* Style - Uthmani, Tajweed, Black & White */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.8rem', color: t.accent, fontWeight: '600' }}>Style:</span>
          {[
            { id: 'uthmani', label: '🕌 Uthmani' },
            { id: 'colored', label: '🌈 Tajweed' },
            { id: 'blackwhite', label: '⬛ B&W' },
          ].map(s => (
            <button key={s.id} onClick={() => setMushafStyle(s.id as any)} style={{
              padding: '0.3rem 0.6rem', borderRadius: '6px',
              border: `1px solid ${mushafStyle === s.id ? t.accent : t.border}`,
              background: mushafStyle === s.id ? t.accent : 'transparent',
              color: mushafStyle === s.id ? '#fff' : t.text,
              cursor: 'pointer', fontSize: '0.75rem'
            }}>{s.label}</button>
          ))}
        </div>

        {/* Play Mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.8rem', color: t.accent, fontWeight: '600' }}>Audio:</span>
          {[
            { id: 'single', label: '🔂 Single' },
            { id: 'continuous', label: '▶️ Continuous' },
          ].map(m => (
            <button key={m.id} onClick={() => setPlayMode(m.id as any)} style={{
              padding: '0.3rem 0.6rem', borderRadius: '6px',
              border: `1px solid ${playMode === m.id ? t.accent : t.border}`,
              background: playMode === m.id ? t.accent : 'transparent',
              color: playMode === m.id ? '#fff' : t.text,
              cursor: 'pointer', fontSize: '0.75rem'
            }}>{m.label}</button>
          ))}
        </div>

        {/* Translation */}
        <select value={selectedTranslation} onChange={e => setSelectedTranslation(e.target.value)} style={{
          padding: '0.3rem 0.6rem', borderRadius: '6px',
          border: `1px solid ${t.border}`, background: t.paper,
          color: t.text, fontSize: '0.75rem', cursor: 'pointer'
        }}>
          {translations.map(tr => <option key={tr.id} value={tr.id}>{tr.name}</option>)}
        </select>

        <button onClick={() => setShowTranslation(!showTranslation)} style={{
          padding: '0.3rem 0.6rem', borderRadius: '6px',
          border: `1px solid ${showTranslation ? t.accent : t.border}`,
          background: showTranslation ? t.accent : 'transparent',
          color: showTranslation ? '#fff' : t.text,
          cursor: 'pointer', fontSize: '0.75rem'
        }}>📝 Translation</button>
      </div>

      {/* Tajweed Color Guide - only when colored mode is selected */}
      {mushafStyle === 'colored' && (
        <div style={{
          background: t.paper, padding: '0.6rem 1.5rem',
          borderBottom: `1px solid ${t.border}`,
          display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.75rem', color: t.accent, fontWeight: '600' }}>Tajweed:</span>
          {[
            { color: '#22c55e', label: 'Ghunna (م ن)' },
            { color: '#3b82f6', label: 'Madd' },
            { color: '#f59e0b', label: 'Qalqalah' },
            { color: '#8b5cf6', label: 'Laam Jalalah' },
            { color: '#ef4444', label: 'Tafkheem' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }} />
              <span style={{ fontSize: '0.72rem', color: t.text }}>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Now Playing Bar */}
      {playingAyah && (
        <div style={{
          background: `linear-gradient(135deg, ${t.accent}, ${t.accent}88)`,
          padding: '0.8rem 1.5rem', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ fontSize: '1.2rem' }}>🎵</span>
            <div>
              <p style={{ margin: 0, fontWeight: '600', fontSize: '0.85rem' }}>
                Playing Ayah {playingAyah} • {selectedQari.name}
              </p>
              <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8 }}>
                {playMode === 'continuous' ? 'Continuous mode' : 'Single ayah'}
              </p>
            </div>
          </div>
          <button onClick={stopAudio} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none',
            color: '#fff', padding: '0.3rem 0.8rem',
            borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem'
          }}>⏹ Stop</button>
        </div>
      )}

      {/* BISMILLAH */}
      <div style={{
        background: t.paper, padding: '1.5rem',
        textAlign: 'center', borderBottom: `2px solid ${t.border}`
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '1rem',
          background: `linear-gradient(135deg, ${t.accent}22, ${t.accent}11)`,
          border: `2px solid ${t.accent}`,
          borderRadius: '12px', padding: '1rem 2rem'
        }}>
          <button onClick={() => {
            const audio = new Audio(getBismillahUrl())
            audio.play()
          }} style={{
            background: t.accent, color: '#fff', border: 'none',
            width: '32px', height: '32px', borderRadius: '50%',
            cursor: 'pointer', fontSize: '0.8rem'
          }}>▶</button>
          <p className="quran-text" style={{
            fontSize: `${fontSize + 4}px`, color: t.accent,
            margin: 0, letterSpacing: '3px', direction: 'rtl'
          }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <button onClick={() => {
            const audio = new Audio(getBismillahUrl())
            audio.play()
          }} style={{
            background: t.accent, color: '#fff', border: 'none',
            width: '32px', height: '32px', borderRadius: '50%',
            cursor: 'pointer', fontSize: '0.8rem'
          }}>▶</button>
        </div>
        {showTranslation && (
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: t.subtext, fontStyle: 'italic' }}>
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        )}
      </div>

      {/* AYAH BY AYAH MODE */}
      {readMode === 'ayah' && (
        <div style={{ padding: '2rem' }}>
          <div style={{
            background: t.paper, borderRadius: '16px',
            border: `2px solid ${t.accent}`, padding: '2rem',
            boxShadow: `0 8px 32px ${t.shadow}`, textAlign: 'center'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <button onClick={() => setCurrentAyah(Math.max(0, currentAyah - 1))} disabled={currentAyah === 0} style={{
                padding: '0.5rem 1.2rem', borderRadius: '8px',
                border: `1px solid ${t.border}`, background: t.accent,
                color: '#fff', cursor: 'pointer', fontSize: '0.9rem',
                opacity: currentAyah === 0 ? 0.4 : 1
              }}>← Prev</button>
              <span style={{ color: t.accent, fontWeight: '700', fontSize: '1rem' }}>
                Ayah {currentAyah + 1} / {ayahs.length}
              </span>
              <button onClick={() => setCurrentAyah(Math.min(ayahs.length - 1, currentAyah + 1))} disabled={currentAyah === ayahs.length - 1} style={{
                padding: '0.5rem 1.2rem', borderRadius: '8px',
                border: `1px solid ${t.border}`, background: t.accent,
                color: '#fff', cursor: 'pointer', fontSize: '0.9rem',
                opacity: currentAyah === ayahs.length - 1 ? 0.4 : 1
              }}>Next →</button>
            </div>

            {ayahs[currentAyah] && (
              <>
                <div style={{
                  fontSize: `${fontSize + 8}px`, direction: 'rtl',
                  lineHeight: '2.5', color: t.text, marginBottom: '1.5rem',
                  padding: '1.5rem', background: `${t.accent}11`,
                  borderRadius: '12px'
                }}>
                  {mushafStyle === 'colored'
                    ? applyTajweedColors(ayahs[currentAyah].text, true)
                    : <span className="quran-text" style={{ 
                        color: mushafStyle === 'blackwhite' ? '#000' : t.text 
                      }}>
                      {ayahs[currentAyah].text}
                    </span>
                  }
                </div>

                <button onClick={() => playingAyah === currentAyah + 1 ? stopAudio() : playAyahAudio(currentAyah + 1)} style={{
                  background: playingAyah === currentAyah + 1 ? '#ef4444' : t.accent,
                  color: '#fff', border: 'none',
                  padding: '0.7rem 2rem', borderRadius: '10px',
                  cursor: 'pointer', fontWeight: '700',
                  fontSize: '0.95rem', marginBottom: '1rem'
                }}>{playingAyah === currentAyah + 1 ? '⏹ Stop' : '🎵 Listen'}</button>

                {showTranslation && translationAyahs[currentAyah] && (
                  <div style={{
                    marginTop: '1rem', padding: '1rem',
                    background: `${t.accent}11`, borderRadius: '10px',
                    borderLeft: `4px solid ${t.accent}`
                  }}>
                    <p style={{ margin: 0, fontSize: '1rem', color: t.text, lineHeight: '1.7' }}>
                      {translationAyahs[currentAyah].text}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* MUSHAF / PAGE MODE */}
      {(readMode === 'mushaf' || readMode === 'page') && (
        <>
          <div style={{ padding: '2rem' }}>
            <div style={{
              background: t.paper, borderRadius: '8px',
              border: `2px solid ${t.border}`, padding: '2.5rem 2rem',
              boxShadow: `0 8px 32px ${t.shadow}`, minHeight: '500px'
            }}>
              {/* Arabic text block */}
              <div style={{
                direction: 'rtl', textAlign: 'justify',
                lineHeight: readMode === 'page' ? '3.5' : '3',
                fontSize: `${fontSize}px`
              }}>
                {pageAyahs.map((ayah) => (
                  <span key={ayah.numberInSurah}
                    onClick={() => playAyahAudio(ayah.numberInSurah)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span style={{
                      background: playingAyah === ayah.numberInSurah ? `${t.accent}33` : 'transparent',
                      borderRadius: '4px', padding: '2px 4px',
                      transition: 'background 0.3s'
                    }}>
                      {mushafStyle === 'colored'
                        ? applyTajweedColors(ayah.text, true)
                        : <span className="quran-text" style={{
                          color: mushafStyle === 'blackwhite' ? '#1a1a1a' : t.text
                        }}>{ayah.text}</span>
                      }
                    </span>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center',
                      justifyContent: 'center', width: '26px', height: '26px',
                      margin: '0 4px', verticalAlign: 'middle',
                      fontSize: '0.65rem', color: t.accent,
                      border: `1px solid ${t.accent}`, borderRadius: '50%',
                      fontFamily: 'sans-serif'
                    }}>{ayah.numberInSurah}</span>
                    {' '}
                  </span>
                ))}
              </div>

              <div style={{
                textAlign: 'center', marginTop: '1.5rem',
                borderTop: `1px solid ${t.border}`, paddingTop: '0.8rem',
                fontSize: '0.8rem', color: t.accent
              }}>
                Page {currentPage} of {totalPages} • {linesPerPage} lines
              </div>
            </div>
          </div>

          {/* Translation for page */}
          {showTranslation && pageTranslations.length > 0 && (
            <div style={{ padding: '0 2rem 1.5rem' }}>
              <div style={{
                background: t.paper, borderRadius: '12px',
                padding: '1.5rem', border: `1px solid ${t.border}`
              }}>
                <h4 style={{ color: t.accent, margin: '0 0 1rem', fontSize: '0.85rem' }}>
                  📝 Translation
                </h4>
                {pageTranslations.map((ayah, index) => (
                  <div key={ayah.numberInSurah} style={{
                    display: 'flex', gap: '0.8rem', marginBottom: '0.8rem',
                    paddingBottom: '0.8rem',
                    borderBottom: index < pageTranslations.length - 1 ? `1px solid ${t.border}` : 'none'
                  }}>
                    <span style={{
                      background: t.accent, color: '#fff',
                      width: '22px', height: '22px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', fontWeight: 'bold', flexShrink: 0, marginTop: '2px'
                    }}>{ayah.numberInSurah}</span>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: t.text, lineHeight: '1.6' }}>
                      {ayah.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Page Navigation */}
          <div style={{
            padding: '1rem 2rem 2rem',
            display: 'flex', justifyContent: 'center',
            alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap'
          }}>
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} style={{
              padding: '0.5rem 1rem', borderRadius: '8px',
              border: `1px solid ${t.border}`, background: 'transparent',
              color: t.text, cursor: 'pointer', opacity: currentPage === 1 ? 0.4 : 1
            }}>⏮</button>
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{
              padding: '0.5rem 1.2rem', borderRadius: '8px',
              border: `1px solid ${t.border}`,
              background: currentPage === 1 ? 'transparent' : t.accent,
              color: currentPage === 1 ? t.text : '#fff',
              cursor: 'pointer', opacity: currentPage === 1 ? 0.4 : 1
            }}>← Prev</button>

            <span style={{ color: t.text, fontWeight: '600', fontSize: '0.9rem' }}>
              {currentPage} / {totalPages}
            </span>

            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{
              padding: '0.5rem 1.2rem', borderRadius: '8px',
              border: `1px solid ${t.border}`,
              background: currentPage === totalPages ? 'transparent' : t.accent,
              color: currentPage === totalPages ? t.text : '#fff',
              cursor: 'pointer', opacity: currentPage === totalPages ? 0.4 : 1
            }}>Next →</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} style={{
              padding: '0.5rem 1rem', borderRadius: '8px',
              border: `1px solid ${t.border}`, background: 'transparent',
              color: t.text, cursor: 'pointer', opacity: currentPage === totalPages ? 0.4 : 1
            }}>⏭</button>
          </div>
        </>
      )}
    </div>
  )
}

export default QuranMushaf