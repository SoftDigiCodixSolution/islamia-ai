import { useState } from 'react'

interface Props {
  surahNumber: number
  ayahNumber: number
  onClose: () => void
}

const qaris = [
  { id: 'ar.alafasy', name: 'Mishary Alafasy', code: 'Alafasy_128kbps' },
  { id: 'ar.abdurrahmaansudais', name: 'Abdurrahman Al-Sudais', code: 'Sudais_128kbps' },
  { id: 'ar.hudhaify', name: 'Ali Al-Hudhaify', code: 'Hudhaify_128kbps' },
  { id: 'ar.minshawi', name: 'Mohamed Siddiq Al-Minshawi', code: 'Minshawi_Murattal_128kbps' },
  { id: 'ar.saoodashureim', name: 'Saud Al-Shuraim', code: 'Shuraym_128kbps' },
]

function AudioPlayer({ surahNumber, ayahNumber, onClose }: Props) {
  const [selectedQari, setSelectedQari] = useState(qaris[0])
  const [, setIsPlaying] = useState(false)

  const surahPadded = String(surahNumber).padStart(3, '0')
  const ayahPadded = String(ayahNumber).padStart(3, '0')
  const audioUrl = `https://everyayah.com/data/${selectedQari.code}/${surahPadded}${ayahPadded}.mp3`

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      color: '#fff',
      boxShadow: '0 8px 24px rgba(26,71,42,0.3)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1rem' }}>
          🎵 Ayah {ayahNumber} — Playing
        </h3>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: '#fff',
          width: '30px', height: '30px',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '1rem'
        }}>✕</button>
      </div>

      {/* Qari Selection */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', opacity: 0.8 }}>Select Qari:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {qaris.map(qari => (
            <button
              key={qari.id}
              onClick={() => {
                setSelectedQari(qari)
                setIsPlaying(false)
              }}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.4)',
                background: selectedQari.id === qari.id
                  ? 'rgba(255,255,255,0.3)'
                  : 'transparent',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: selectedQari.id === qari.id ? 'bold' : 'normal',
                transition: 'all 0.2s'
              }}
            >{qari.name}</button>
          ))}
        </div>
      </div>

      {/* Audio Element */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <span style={{ fontSize: '1.5rem' }}>🎙️</span>
        <div style={{ flex: 1 }}>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', opacity: 0.8 }}>
            {selectedQari.name}
          </p>
          <audio
            key={audioUrl}
            controls
            autoPlay
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            style={{ width: '100%', height: '36px' }}
            src={audioUrl}
          />
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer