import { useState } from 'react'

interface Props {
  onBack: () => void
}

const surahs = [
  { number: 1, name: 'Al-Fatiha', arabic: 'الفاتحة', ayahs: 7, juz: 1 },
  { number: 2, name: 'Al-Baqarah', arabic: 'البقرة', ayahs: 286, juz: 1 },
  { number: 3, name: 'Ali Imran', arabic: 'آل عمران', ayahs: 200, juz: 3 },
  { number: 4, name: 'An-Nisa', arabic: 'النساء', ayahs: 176, juz: 4 },
  { number: 5, name: 'Al-Maidah', arabic: 'المائدة', ayahs: 120, juz: 6 },
  { number: 112, name: 'Al-Ikhlas', arabic: 'الإخلاص', ayahs: 4, juz: 30 },
  { number: 113, name: 'Al-Falaq', arabic: 'الفلق', ayahs: 5, juz: 30 },
  { number: 114, name: 'An-Nas', arabic: 'الناس', ayahs: 6, juz: 30 },
  { number: 110, name: 'An-Nasr', arabic: 'النصر', ayahs: 3, juz: 30 },
  { number: 111, name: 'Al-Masad', arabic: 'المسد', ayahs: 5, juz: 30 },
  { number: 108, name: 'Al-Kawthar', arabic: 'الكوثر', ayahs: 3, juz: 30 },
  { number: 109, name: 'Al-Kafirun', arabic: 'الكافرون', ayahs: 6, juz: 30 },
]

function HifzTracker({ onBack }: Props) {
  const [memorized, setMemorized] = useState<number[]>([])
  const [inProgress, setInProgress] = useState<number[]>([])

  const toggleMemorized = (num: number) => {
    if (memorized.includes(num)) {
      setMemorized(memorized.filter(n => n !== num))
    } else {
      setMemorized([...memorized, num])
      setInProgress(inProgress.filter(n => n !== num))
    }
  }

  const toggleInProgress = (num: number) => {
    if (inProgress.includes(num)) {
      setInProgress(inProgress.filter(n => n !== num))
    } else {
      setInProgress([...inProgress, num])
      setMemorized(memorized.filter(n => n !== num))
    }
  }

  const totalAyahs = 6236
  const memorizedAyahs = surahs
    .filter(s => memorized.includes(s.number))
    .reduce((sum, s) => sum + s.ayahs, 0)
  const progress = Math.round((memorizedAyahs / totalAyahs) * 100)

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f8faf9' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #0a2e1a, #1a472a)',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        color: '#fff'
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}>← Back</button>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>🧠 Hifz Tracker</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>
            Track your Quran memorization progress
          </p>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>

        {/* Progress Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
          borderRadius: '20px',
          padding: '2rem',
          color: '#fff',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(26,71,42,0.3)'
        }}>
          <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.2rem' }}>
            📊 Your Progress
          </h3>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[
              { label: 'Surahs Memorized', value: memorized.length },
              { label: 'Ayahs Memorized', value: memorizedAyahs },
              { label: 'In Progress', value: inProgress.length },
              { label: 'Overall Progress', value: `${progress}%` },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#4ade80' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', height: '12px' }}>
            <div style={{
              background: '#4ade80',
              height: '100%',
              borderRadius: '10px',
              width: `${progress}%`,
              transition: 'width 0.5s ease'
            }} />
          </div>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', opacity: 0.7 }}>
            {memorizedAyahs} of {totalAyahs} ayahs memorized
          </p>
        </div>

        {/* Surah List */}
        <h3 style={{ color: '#0a2e1a', marginBottom: '1rem' }}>
          Track your Surahs
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {surahs.map(surah => {
            const isMemorized = memorized.includes(surah.number)
            const isProgress = inProgress.includes(surah.number)

            return (
              <div key={surah.number} style={{
                background: '#fff',
                borderRadius: '14px',
                padding: '1.2rem 1.5rem',
                border: isMemorized
                  ? '1px solid #4ade80'
                  : isProgress
                    ? '1px solid #fb923c'
                    : '1px solid #e8e8e8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                transition: 'all 0.2s',
                background: isMemorized
                  ? '#f0fdf4'
                  : isProgress
                    ? '#fff7ed'
                    : '#fff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    background: isMemorized ? '#4ade80' : isProgress ? '#fb923c' : '#e8e8e8',
                    color: isMemorized || isProgress ? '#fff' : '#666',
                    width: '38px', height: '38px',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0
                  }}>{surah.number}</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: '600', color: '#0a2e1a' }}>
                      {surah.name}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>
                      {surah.ayahs} ayahs • Juz {surah.juz}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    fontSize: '1.2rem',
                    color: '#1a472a',
                    fontFamily: 'serif'
                  }}>{surah.arabic}</span>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => toggleInProgress(surah.number)}
                      style={{
                        padding: '0.4rem 0.9rem',
                        borderRadius: '8px',
                        border: '1px solid #fb923c',
                        background: isProgress ? '#fb923c' : 'transparent',
                        color: isProgress ? '#fff' : '#fb923c',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        transition: 'all 0.2s'
                      }}
                    >📝 Learning</button>
                    <button
                      onClick={() => toggleMemorized(surah.number)}
                      style={{
                        padding: '0.4rem 0.9rem',
                        borderRadius: '8px',
                        border: '1px solid #4ade80',
                        background: isMemorized ? '#4ade80' : 'transparent',
                        color: isMemorized ? '#fff' : '#1a472a',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        transition: 'all 0.2s'
                      }}
                    >✅ Memorized</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HifzTracker