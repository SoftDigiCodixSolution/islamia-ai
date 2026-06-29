import { useState, useEffect, useRef } from 'react'

interface Props {
  paraNumber: number
  translation: string
}

interface Ayah {
  number: number
  numberInSurah: number
  text: string
  translation: string
  surahName: string
  surahNumber: number
}

const qaris = [
  { name: 'Mishary Alafasy', code: 'Alafasy_128kbps' },
  { name: 'Abdurrahman Al-Sudais', code: 'Sudais_128kbps' },
  { name: 'Saud Al-Shuraim', code: 'Shuraym_128kbps' },
  { name: 'Mohamed Al-Minshawi', code: 'Minshawi_Murattal_128kbps' },
  { name: 'Abu Bakr Al-Shatri', code: 'Abu_Bakr_Ash-Shaatree_128kbps' },
]

function ParaReader({ paraNumber, translation }: Props) {
  const [ayahs, setAyahs] = useState<Ayah[]>([])
  const [loading, setLoading] = useState(true)
  const [fontSize, setFontSize] = useState(28)
  const [selectedQari, setSelectedQari] = useState(qaris[0])
  const [playingAyah, setPlayingAyah] = useState<number | null>(null)
  const [playMode, setPlayMode] = useState<'single' | 'continuous'>('single')
  // Removed: const [showTranslationAudio, setShowTranslationAudio] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/juz/${paraNumber}/quran-uthmani`).then(r => r.json()),
      fetch(`https://api.alquran.cloud/v1/juz/${paraNumber}/${translation}`).then(r => r.json())
    ]).then(([arabic, translated]) => {
      const combined = arabic.data.ayahs.map((ayah: any, i: number) => ({
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        text: ayah.text,
        translation: translated.data.ayahs[i]?.text || '',
        surahName: ayah.surah.englishName,
        surahNumber: ayah.surah.number
      }))
      setAyahs(combined)
      setLoading(false)
    })
  }, [paraNumber, translation])

  const getAudioUrl = (ayah: Ayah) => {
    const surahPadded = String(ayah.surahNumber).padStart(3, '0')
    const ayahPadded = String(ayah.numberInSurah).padStart(3, '0')
    return `https://everyayah.com/data/${selectedQari.code}/${surahPadded}${ayahPadded}.mp3`
  }

  const playAyah = (ayah: Ayah) => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setPlayingAyah(ayah.number)
    const audio = new Audio(getAudioUrl(ayah))
    audioRef.current = audio
    audio.play()
    audio.onended = () => {
      if (playMode === 'continuous') {
        const currentIndex = ayahs.findIndex(a => a.number === ayah.number)
        if (currentIndex < ayahs.length - 1) {
          playAyah(ayahs[currentIndex + 1])
        } else {
          setPlayingAyah(null)
        }
      } else {
        setPlayingAyah(null)
      }
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setPlayingAyah(null)
  }

  const playAll = () => {
    setPlayMode('continuous')
    if (ayahs.length > 0) playAyah(ayahs[0])
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
      <p style={{ color: '#1a472a', fontSize: '1.1rem' }}>Loading Para {paraNumber}...</p>
    </div>
  )

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* Para Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
        borderRadius: '16px', padding: '1.5rem 2rem',
        color: '#fff', marginBottom: '1.5rem',
        boxShadow: '0 8px 24px rgba(26,71,42,0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ margin: '0 0 0.3rem', fontSize: '1.6rem' }}>Para {paraNumber}</h2>
            <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>
              {ayahs.length} Ayahs
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={playingAyah ? stopAudio : playAll}
              style={{
                background: '#4ade80', color: '#0a2e1a',
                border: 'none', padding: '0.6rem 1.2rem',
                borderRadius: '8px', cursor: 'pointer',
                fontWeight: '700', fontSize: '0.9rem'
              }}
            >{playingAyah ? '⏹ Stop' : '▶️ Play All'}</button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        background: '#fff', borderRadius: '12px', padding: '1rem 1.5rem',
        marginBottom: '1.5rem', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        {/* Font Size */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>Font:</span>
          <button onClick={() => setFontSize(f => Math.max(18, f - 2))} style={{
            width: '28px', height: '28px', borderRadius: '50%',
            border: '1px solid #ddd', background: '#f5f5f5', cursor: 'pointer'
          }}>−</button>
          <span style={{ fontWeight: 'bold', color: '#1a472a', fontSize: '0.85rem' }}>{fontSize}px</span>
          <button onClick={() => setFontSize(f => Math.min(48, f + 2))} style={{
            width: '28px', height: '28px', borderRadius: '50%',
            border: '1px solid #ddd', background: '#f5f5f5', cursor: 'pointer'
          }}>+</button>
        </div>

        {/* Qari */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>🎙️ Qari:</span>
          <select
            value={selectedQari.code}
            onChange={e => setSelectedQari(qaris.find(q => q.code === e.target.value) || qaris[0])}
            style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.85rem' }}
          >
            {qaris.map(q => <option key={q.code} value={q.code}>{q.name}</option>)}
          </select>
        </div>

        {/* Play Mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>Mode:</span>
          {(['single', 'continuous'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setPlayMode(mode)}
              style={{
                padding: '0.3rem 0.8rem', borderRadius: '20px',
                border: '1px solid',
                borderColor: playMode === mode ? '#1a472a' : '#ddd',
                background: playMode === mode ? '#1a472a' : 'transparent',
                color: playMode === mode ? '#fff' : '#666',
                cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500'
              }}
            >{mode === 'single' ? '🔂 Single' : '▶️ Continuous'}</button>
          ))}
        </div>
      </div>

      {/* Ayahs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {ayahs.map((ayah) => (   // removed unused 'i'
          <div key={ayah.number} style={{
            background: '#fff', borderRadius: '14px', padding: '1.5rem',
            border: playingAyah === ayah.number ? '2px solid #4ade80' : '1px solid #e8e8e8',
            transition: 'all 0.2s',
            boxShadow: playingAyah === ayah.number
              ? '0 8px 24px rgba(74,222,128,0.2)'
              : '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            {/* Ayah Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
                  color: '#fff', width: '34px', height: '34px',
                  borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 'bold'
                }}>{ayah.numberInSurah}</span>
                <span style={{
                  fontSize: '0.8rem', color: '#888',
                  background: '#f5f5f5', padding: '0.2rem 0.6rem',
                  borderRadius: '10px'
                }}>{ayah.surahName}</span>
              </div>
              <button
                onClick={() => playingAyah === ayah.number ? stopAudio() : playAyah(ayah)}
                style={{
                  background: playingAyah === ayah.number ? '#4ade80' : '#e8f5e9',
                  border: 'none', borderRadius: '8px',
                  padding: '0.4rem 0.9rem', cursor: 'pointer',
                  color: playingAyah === ayah.number ? '#0a2e1a' : '#1a472a',
                  fontSize: '0.85rem', fontWeight: '600',
                  transition: 'all 0.2s'
                }}
              >{playingAyah === ayah.number ? '⏹ Stop' : '🎵 Listen'}</button>
            </div>

            {/* Arabic */}
            <p style={{
              fontSize: `${fontSize}px`, textAlign: 'right',
              lineHeight: '2.2', color: '#1a1a1a',
              fontFamily: 'serif', margin: '0 0 1rem',
              direction: 'rtl', borderBottom: '1px solid #f0f0f0',
              paddingBottom: '1rem'
            }}>{ayah.text}</p>

            {/* Translation */}
            <p style={{
              fontSize: '0.95rem', color: '#555',
              lineHeight: '1.7', margin: 0
            }}>{ayah.translation}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ParaReader