import { useState, useEffect } from 'react'
import AudioPlayer from './AudioPlayer'

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

function SurahReader({ surahNumber, translation }: Props) {
  const [ayahs, setAyahs] = useState<Ayah[]>([])
  const [surahInfo, setSurahInfo] = useState<SurahInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAyah, setSelectedAyah] = useState<number | null>(null)
  const [fontSize, setFontSize] = useState(28)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`).then(r => r.json()),
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${translation}`).then(r => r.json())
    ]).then(([arabic, translated]) => {
      setSurahInfo(arabic.data)
      const combined = arabic.data.ayahs.map((ayah: any, i: number) => ({
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        text: ayah.text,
        translation: translated.data.ayahs[i].text
      }))
      setAyahs(combined)
      setLoading(false)
    })
  }, [surahNumber, translation])

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
      <p style={{ color: '#1a472a', fontSize: '1.1rem' }}>Loading Surah...</p>
    </div>
  )

  return (
    <div>
      {/* Surah Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
        borderRadius: '16px',
        padding: '2rem',
        textAlign: 'center',
        color: '#fff',
        marginBottom: '1.5rem',
        boxShadow: '0 8px 24px rgba(26,71,42,0.3)'
      }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem', fontFamily: 'serif' }}>
          {surahInfo?.name}
        </h1>
        <h2 style={{ fontSize: '1.3rem', margin: '0 0 0.3rem', fontWeight: '400' }}>
          {surahInfo?.englishName}
        </h2>
        <p style={{ margin: '0 0 1rem', opacity: 0.8, fontSize: '0.9rem' }}>
          {surahInfo?.englishNameTranslation} • {surahInfo?.numberOfAyahs} Ayahs • {surahInfo?.revelationType}
        </p>
        <p style={{ fontSize: '1.4rem', margin: '0', fontFamily: 'serif', opacity: 0.9 }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
      </div>

      {/* Controls */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '1rem 1.5rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.9rem', color: '#666' }}>Arabic Font Size:</span>
          <button onClick={() => setFontSize(f => Math.max(18, f - 2))} style={{
            width: '32px', height: '32px', borderRadius: '50%',
            border: '1px solid #ddd', background: '#f5f5f5',
            cursor: 'pointer', fontSize: '1rem'
          }}>−</button>
          <span style={{ fontWeight: 'bold', color: '#1a472a' }}>{fontSize}px</span>
          <button onClick={() => setFontSize(f => Math.min(48, f + 2))} style={{
            width: '32px', height: '32px', borderRadius: '50%',
            border: '1px solid #ddd', background: '#f5f5f5',
            cursor: 'pointer', fontSize: '1rem'
          }}>+</button>
        </div>
        <span style={{ fontSize: '0.85rem', color: '#888' }}>
          Click any ayah to listen 🎵
        </span>
      </div>

      {/* Audio Player */}
      {selectedAyah && (
        <AudioPlayer
          surahNumber={surahNumber}
          ayahNumber={selectedAyah}
          onClose={() => setSelectedAyah(null)}
        />
      )}

      {/* Ayahs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {ayahs.map(ayah => (
          <div
            key={ayah.numberInSurah}
            onClick={() => setSelectedAyah(ayah.numberInSurah)}
            style={{
              background: '#fff',
              borderRadius: '14px',
              padding: '1.5rem',
              cursor: 'pointer',
              border: selectedAyah === ayah.numberInSurah
                ? '2px solid #1a472a'
                : '1px solid #e8e8e8',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
            onMouseOver={e => {
              if (selectedAyah !== ayah.numberInSurah) {
                e.currentTarget.style.borderColor = '#2d6a4f'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,71,42,0.1)'
              }
            }}
            onMouseOut={e => {
              if (selectedAyah !== ayah.numberInSurah) {
                e.currentTarget.style.borderColor = '#e8e8e8'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
              }
            }}
          >
            {/* Ayah Number Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{
                background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
                color: '#fff',
                width: '36px', height: '36px',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 'bold'
              }}>{ayah.numberInSurah}</span>
              <span style={{ fontSize: '0.8rem', color: '#888' }}>🎵 Tap to listen</span>
            </div>

            {/* Arabic Text */}
            <p style={{
              fontSize: `${fontSize}px`,
              textAlign: 'right',
              lineHeight: '2',
              color: '#1a1a1a',
              fontFamily: 'serif',
              margin: '0 0 1rem',
              direction: 'rtl'
            }}>{ayah.text}</p>

            {/* Divider */}
            <div style={{ height: '1px', background: '#f0f0f0', margin: '1rem 0' }} />

            {/* Translation */}
            <p style={{
              fontSize: '0.95rem',
              color: '#555',
              lineHeight: '1.7',
              margin: 0
            }}>{ayah.translation}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SurahReader