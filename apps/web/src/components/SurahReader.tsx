import { useState, useEffect, useRef } from 'react'

interface Ayah {
  number: number
  numberInSurah: number
  text: string
  translation: string
}

interface SurahInfo {
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

interface Props {
  surahNumber: number
  translation: string
}

const qaris = [
  { name: 'Mishary Rashid Alafasy', code: 'Alafasy_128kbps', country: '🇰🇼' },
  { name: 'Abdurrahman Al-Sudais', code: 'Sudais_128kbps', country: '🇸🇦' },
  { name: 'Saud Al-Shuraim', code: 'Shuraym_128kbps', country: '🇸🇦' },
  { name: 'Mohamed Al-Minshawi', code: 'Minshawi_Murattal_128kbps', country: '🇪🇬' },
  { name: 'Abu Bakr Al-Shatri', code: 'Abu_Bakr_Ash-Shaatree_128kbps', country: '🇸🇦' },
  { name: 'Maher Al-Muaiqly', code: 'Maher_AlMuaiqly_128kbps', country: '🇸🇦' },
  { name: 'Hani Ar-Rifai', code: 'Hani_Rifai_128kbps', country: '🇸🇦' },
  { name: 'Yasser Al-Dosari', code: 'Yasser_Ad-Dussary_128kbps', country: '🇸🇦' },
  { name: 'Khalid Al-Qahtani', code: 'Khalid_Abdulkaafi_128kbps', country: '🇸🇦' },
  { name: 'Abdullah Basfar', code: 'Abdullah_Basfar_128kbps', country: '🇸🇦' },
  { name: 'Salah Bukhatir', code: 'Salah_AbdulKarim_128kbps', country: '🇸🇦' },
  { name: 'Ibrahim Al-Akhdar', code: 'Ibrahim_Akhdar_128kbps', country: '🇸🇦' },
]

function SurahReader({ surahNumber, translation }: Props) {
  const [ayahs, setAyahs] = useState<Ayah[]>([])
  const [surahInfo, setSurahInfo] = useState<SurahInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [fontSize, setFontSize] = useState(28)
  const [selectedQari, setSelectedQari] = useState(qaris[0])
  const [playingAyah, setPlayingAyah] = useState<number | null>(null)
  const [playMode, setPlayMode] = useState<'single' | 'surah'>('single')
  const [showArabicOnly, setShowArabicOnly] = useState(false)
  const [highlightedAyah, setHighlightedAyah] = useState<number | null>(null)
  const [showQariList, setShowQariList] = useState(false)
  const [repeatAyah, setRepeatAyah] = useState(false)
  const [playingBismillah, setPlayingBismillah] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setLoading(true)
    stopAudio()
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`).then(r => r.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${translation}`).then(r => r.json())
    ]).then(([arabic, translated]) => {
      setSurahInfo(arabic.data)
      const combined = arabic.data.ayahs.map((ayah: any, i: number) => ({
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        text: ayah.numberInSurah === 1
          ? ayah.text
            .replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, '')
            .replace(/^بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\s*/, '')
            .trim()
          : ayah.text,
        translation: translated.data.ayahs[i]?.text || ''
      }))
      setAyahs(combined)
      setLoading(false)
    })
  }, [surahNumber, translation])

  const getAudioUrl = (ayah: Ayah) => {
    const surahPadded = String(surahNumber).padStart(3, '0')
    const ayahPadded = String(ayah.numberInSurah).padStart(3, '0')
    return `https://everyayah.com/data/${selectedQari.code}/${surahPadded}${ayahPadded}.mp3`
  }

  const getBismillahUrl = () => {
    return `https://everyayah.com/data/${selectedQari.code}/001001.mp3`
  }

  const playAyah = (ayah: Ayah) => {
    stopAudio()
    setPlayingAyah(ayah.numberInSurah)
    setHighlightedAyah(ayah.numberInSurah)
    const audio = new Audio(getAudioUrl(ayah))
    audioRef.current = audio
    audio.play()
    audio.onended = () => {
      if (repeatAyah) {
        playAyah(ayah)
      } else if (playMode === 'surah') {
        const currentIndex = ayahs.findIndex(a => a.numberInSurah === ayah.numberInSurah)
        if (currentIndex < ayahs.length - 1) {
          playAyah(ayahs[currentIndex + 1])
        } else {
          setPlayingAyah(null)
          setHighlightedAyah(null)
        }
      } else {
        setPlayingAyah(null)
      }
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
    }
    setPlayingAyah(null)
    setHighlightedAyah(null)
    setPlayingBismillah(false)
  }

  const playBismillah = () => {
    stopAudio()
    setPlayingBismillah(true)
    const bismillah = new Audio(getBismillahUrl())
    audioRef.current = bismillah
    bismillah.play()
    bismillah.onended = () => {
      setPlayingBismillah(false)
    }
  }

  const playSurah = () => {
    setPlayMode('surah')
    stopAudio()
    setPlayingBismillah(true)
    const bismillah = new Audio(getBismillahUrl())
    audioRef.current = bismillah
    bismillah.play()
    bismillah.onended = () => {
      setPlayingBismillah(false)
      if (ayahs.length > 0) playAyah(ayahs[0])
    }
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
      <p style={{ color: '#1a472a', fontSize: '1.1rem' }}>Loading Surah...</p>
    </div>
  )

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* Surah Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0a2e1a, #1a472a, #2d6a4f)',
        borderRadius: '20px', padding: '2rem',
        textAlign: 'center', color: '#fff',
        marginBottom: '1.5rem',
        boxShadow: '0 8px 32px rgba(10,46,26,0.4)'
      }}>
        <p style={{ margin: '0 0 0.3rem', opacity: 0.7, fontSize: '0.8rem', letterSpacing: '3px' }}>
          {surahInfo?.revelationType?.toUpperCase()} • {surahInfo?.numberOfAyahs} AYAHS
        </p>
        <h1 style={{ fontSize: '3rem', margin: '0 0 0.3rem', fontFamily: 'Amiri Quran, serif', letterSpacing: '4px' }}>
          {surahInfo?.name}
        </h1>
        <h2 style={{ fontSize: '1.2rem', margin: '0 0 0.2rem', fontWeight: '400', opacity: 0.9 }}>
          {surahInfo?.englishName}
        </h2>
        <p style={{ margin: '0 0 1.5rem', opacity: 0.6, fontSize: '0.85rem' }}>
          {surahInfo?.englishNameTranslation}
        </p>
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={playingAyah || playingBismillah ? stopAudio : playSurah}
            style={{
              background: '#4ade80', color: '#0a2e1a', border: 'none',
              padding: '0.7rem 1.8rem', borderRadius: '10px',
              cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem'
            }}>
            {playingAyah || playingBismillah ? '⏹ Stop' : '▶️ Play Full Surah'}
          </button>
          <button onClick={() => setShowQariList(!showQariList)} style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff', padding: '0.7rem 1.5rem',
            borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem'
          }}>🎙️ {selectedQari.country} {selectedQari.name}</button>
        </div>
      </div>

      {/* Qari Selection */}
      {showQariList && (
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '1.5rem',
          marginBottom: '1.5rem', border: '1px solid #e8e8e8',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ margin: '0 0 1rem', color: '#0a2e1a', fontSize: '1rem' }}>
            🎙️ Select Qari
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '0.6rem'
          }}>
            {qaris.map(qari => (
              <button key={qari.code} onClick={() => {
                stopAudio()
                setSelectedQari(qari)
                setShowQariList(false)
              }} style={{
                padding: '0.6rem 1rem', borderRadius: '8px',
                border: '1px solid',
                borderColor: selectedQari.code === qari.code ? '#1a472a' : '#e0e0e0',
                background: selectedQari.code === qari.code ? '#1a472a' : '#fff',
                color: selectedQari.code === qari.code ? '#fff' : '#333',
                cursor: 'pointer', fontSize: '0.85rem',
                textAlign: 'left', transition: 'all 0.2s'
              }}>
                {qari.country} {qari.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controls Bar */}
      <div style={{
        background: '#fff', borderRadius: '14px', padding: '1rem 1.5rem',
        marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center'
      }}>
        {/* Font Size */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#666' }}>Size:</span>
          <button onClick={() => setFontSize(f => Math.max(18, f - 2))} style={{
            width: '26px', height: '26px', borderRadius: '50%',
            border: '1px solid #ddd', background: '#f5f5f5', cursor: 'pointer', fontSize: '0.9rem'
          }}>−</button>
          <span style={{ fontWeight: 'bold', color: '#1a472a', fontSize: '0.85rem', minWidth: '35px', textAlign: 'center' }}>{fontSize}</span>
          <button onClick={() => setFontSize(f => Math.min(52, f + 2))} style={{
            width: '26px', height: '26px', borderRadius: '50%',
            border: '1px solid #ddd', background: '#f5f5f5', cursor: 'pointer', fontSize: '0.9rem'
          }}>+</button>
        </div>

        {/* Play Mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {[
            { id: 'single', label: '🔂 Single' },
            { id: 'surah', label: '📖 Full Surah' },
          ].map(mode => (
            <button key={mode.id} onClick={() => { stopAudio(); setPlayMode(mode.id as any) }} style={{
              padding: '0.3rem 0.8rem', borderRadius: '20px', border: '1px solid',
              borderColor: playMode === mode.id ? '#1a472a' : '#ddd',
              background: playMode === mode.id ? '#1a472a' : 'transparent',
              color: playMode === mode.id ? '#fff' : '#666',
              cursor: 'pointer', fontSize: '0.8rem'
            }}>{mode.label}</button>
          ))}
        </div>

        {/* Repeat */}
        <button onClick={() => setRepeatAyah(!repeatAyah)} style={{
          padding: '0.3rem 0.8rem', borderRadius: '20px', border: '1px solid',
          borderColor: repeatAyah ? '#1a472a' : '#ddd',
          background: repeatAyah ? '#1a472a' : 'transparent',
          color: repeatAyah ? '#fff' : '#666',
          cursor: 'pointer', fontSize: '0.8rem'
        }}>🔁 Repeat</button>

        {/* Arabic Only */}
        <button onClick={() => setShowArabicOnly(!showArabicOnly)} style={{
          padding: '0.3rem 0.8rem', borderRadius: '20px', border: '1px solid',
          borderColor: showArabicOnly ? '#1a472a' : '#ddd',
          background: showArabicOnly ? '#1a472a' : 'transparent',
          color: showArabicOnly ? '#fff' : '#666',
          cursor: 'pointer', fontSize: '0.8rem'
        }}>🔤 Arabic Only</button>
      </div>

      {/* Now Playing */}
      {(playingAyah || playingBismillah) && (
        <div style={{
          background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
          borderRadius: '12px', padding: '1rem 1.5rem',
          marginBottom: '1rem', color: '#fff',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🎵</span>
            <div>
              <p style={{ margin: 0, fontWeight: '600', fontSize: '0.9rem' }}>
                {playingBismillah ? 'Playing Bismillah...' : `Now Playing — Ayah ${playingAyah}`}
              </p>
              <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
                {selectedQari.country} {selectedQari.name} • {playMode === 'surah' ? 'Full Surah' : repeatAyah ? 'Repeating' : 'Single'}
              </p>
            </div>
          </div>
          <button onClick={stopAudio} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none',
            color: '#fff', padding: '0.4rem 1rem',
            borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem'
          }}>⏹ Stop</button>
        </div>
      )}

      {/* Bismillah */}
      <div style={{
        background: 'linear-gradient(135deg, #1a472a11, #2d6a4f11)',
        borderRadius: '14px', padding: '1.5rem',
        textAlign: 'center', border: '2px solid #1a472a33',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={playingBismillah ? stopAudio : playBismillah}
            style={{
              background: playingBismillah ? '#ef4444' : '#1a472a',
              color: '#fff', border: 'none',
              width: '36px', height: '36px', borderRadius: '50%',
              cursor: 'pointer', fontSize: '0.9rem', flexShrink: 0
            }}>
            {playingBismillah ? '⏹' : '▶'}
          </button>
          <p style={{
            fontSize: `${fontSize + 4}px`,
            fontFamily: 'Amiri Quran, Amiri, serif',
            color: '#1a472a', margin: 0, direction: 'rtl',
            letterSpacing: '3px'
          }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </div>
        {!showArabicOnly && (
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        )}
      </div>

      {/* Ayahs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {ayahs.map(ayah => (
          <div
            key={ayah.numberInSurah}
            style={{
              background: highlightedAyah === ayah.numberInSurah ? '#f0fdf4' : '#fff',
              borderRadius: '16px', padding: '1.5rem',
              border: highlightedAyah === ayah.numberInSurah ? '2px solid #4ade80' : '1px solid #e8e8e8',
              transition: 'all 0.3s',
              boxShadow: highlightedAyah === ayah.numberInSurah
                ? '0 8px 24px rgba(74,222,128,0.2)'
                : '0 2px 8px rgba(0,0,0,0.04)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{
                background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
                color: '#fff', width: '36px', height: '36px',
                borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 'bold'
              }}>{ayah.numberInSurah}</span>

              <button onClick={() => {
                setPlayMode('single')
                playingAyah === ayah.numberInSurah ? stopAudio() : playAyah(ayah)
              }} style={{
                background: playingAyah === ayah.numberInSurah ? '#4ade80' : '#e8f5e9',
                border: 'none', borderRadius: '8px',
                padding: '0.4rem 1rem', cursor: 'pointer',
                color: playingAyah === ayah.numberInSurah ? '#0a2e1a' : '#1a472a',
                fontSize: '0.85rem', fontWeight: '600'
              }}>
                {playingAyah === ayah.numberInSurah ? '⏹ Stop' : '🎵 Listen'}
              </button>
            </div>

            <p style={{
              fontSize: `${fontSize}px`, textAlign: 'right',
              lineHeight: '2.2', color: '#1a1a1a',
              fontFamily: 'Amiri Quran, Amiri, serif',
              margin: '0 0 1rem', direction: 'rtl',
              borderBottom: showArabicOnly ? 'none' : '1px solid #f0f0f0',
              paddingBottom: '1rem'
            }}>{ayah.text}</p>

            {!showArabicOnly && (
              <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.7', margin: 0 }}>
                {ayah.translation}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SurahReader