import { useState } from 'react'

interface Props {
  onBack: () => void
}

const duas = [
  {
    title: 'Before Eating',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillah',
    translation: 'In the name of Allah',
    category: 'Daily',
    reference: 'Abu Dawud 3767'
  },
  {
    title: 'After Eating',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ',
    transliteration: 'Alhamdulillahilladhi at\'amani hadha wa razaqanihi',
    translation: 'Praise be to Allah who fed me this and provided it for me',
    category: 'Daily',
    reference: 'Abu Dawud 4023'
  },
  {
    title: 'Before Sleeping',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allahumma amutu wa ahya',
    translation: 'In Your name, O Allah, I die and I live',
    category: 'Morning/Evening',
    reference: 'Bukhari 6324'
  },
  {
    title: 'Upon Waking Up',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdulillahilladhi ahyana ba\'da ma amatana wa ilayhin-nushur',
    translation: 'Praise be to Allah who gave us life after death and to Him is the resurrection',
    category: 'Morning/Evening',
    reference: 'Bukhari 6312'
  },
  {
    title: 'Entering the Mosque',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: 'Allahumma iftah li abwaba rahmatik',
    translation: 'O Allah, open for me the gates of Your mercy',
    category: 'Mosque',
    reference: 'Muslim 713'
  },
  {
    title: 'Leaving the Mosque',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    transliteration: 'Allahumma inni as\'aluka min fadlik',
    translation: 'O Allah, I ask You from Your bounty',
    category: 'Mosque',
    reference: 'Muslim 713'
  },
  {
    title: 'When Leaving Home',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Bismillahi tawakkaltu alallahi wa la hawla wa la quwwata illa billah',
    translation: 'In the name of Allah, I put my trust in Allah, and there is no power except with Allah',
    category: 'Travel',
    reference: 'Abu Dawud 5095'
  },
  {
    title: 'Dua for Anxiety',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
    transliteration: 'Allahumma inni a\'udhu bika minal hammi wal hazan',
    translation: 'O Allah, I seek refuge in You from worry and grief',
    category: 'Protection',
    reference: 'Bukhari 6369'
  },
  {
    title: 'Dua for Knowledge',
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi zidni ilma',
    translation: 'My Lord, increase me in knowledge',
    category: 'Knowledge',
    reference: 'Quran 20:114'
  },
  {
    title: 'Dua for Parents',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbi irhamhuma kama rabbayani saghira',
    translation: 'My Lord, have mercy on them as they raised me when I was young',
    category: 'Family',
    reference: 'Quran 17:24'
  },
]

const categories = ['All', 'Daily', 'Morning/Evening', 'Mosque', 'Travel', 'Protection', 'Knowledge', 'Family']

function DuaLibrary({ onBack }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedDua, setExpandedDua] = useState<number | null>(null)

  const filtered = selectedCategory === 'All'
    ? duas
    : duas.filter(d => d.category === selectedCategory)

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f8faf9' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #0a2e1a, #1a472a)',
        padding: '1.5rem 2rem',
        display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff'
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff', padding: '0.5rem 1rem',
          borderRadius: '8px', cursor: 'pointer'
        }}>← Back</button>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>🤲 Dua Library</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>
            Daily supplications with references
          </p>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>

        {/* Categories */}
        <div style={{
          display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.5rem 1.2rem',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: selectedCategory === cat ? '#1a472a' : '#e0e0e0',
                background: selectedCategory === cat ? '#1a472a' : '#fff',
                color: selectedCategory === cat ? '#fff' : '#555',
                cursor: 'pointer', fontSize: '0.85rem',
                fontWeight: selectedCategory === cat ? '600' : '400',
                transition: 'all 0.2s'
              }}
            >{cat}</button>
          ))}
        </div>

        {/* Duas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map((dua, i) => (
            <div
              key={i}
              onClick={() => setExpandedDua(expandedDua === i ? null : i)}
              style={{
                background: '#fff', borderRadius: '16px', padding: '1.5rem',
                border: expandedDua === i ? '1px solid #1a472a' : '1px solid #e8e8e8',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: expandedDua === i ? '0 8px 24px rgba(26,71,42,0.1)' : '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span style={{
                    background: '#e8f5e9', color: '#1a472a',
                    width: '40px', height: '40px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>🤲</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: '600', color: '#0a2e1a' }}>{dua.title}</p>
                    <span style={{
                      fontSize: '0.75rem', background: '#f0f4f0',
                      color: '#555', padding: '0.2rem 0.6rem', borderRadius: '10px'
                    }}>{dua.category}</span>
                  </div>
                </div>
                <span style={{ color: '#888', fontSize: '1.2rem' }}>
                  {expandedDua === i ? '▲' : '▼'}
                </span>
              </div>

              {expandedDua === i && (
                <div style={{ marginTop: '1.2rem', borderTop: '1px solid #f0f0f0', paddingTop: '1.2rem' }}>
                  <p style={{
                    fontSize: '1.6rem', textAlign: 'right', direction: 'rtl',
                    fontFamily: 'serif', color: '#1a472a', lineHeight: '2.2',
                    margin: '0 0 1rem'
                  }}>{dua.arabic}</p>
                  <p style={{ color: '#555', margin: '0 0 0.5rem', fontStyle: 'italic', fontSize: '0.95rem' }}>
                    {dua.transliteration}
                  </p>
                  <p style={{ color: '#333', margin: '0 0 1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {dua.translation}
                  </p>
                  <span style={{
                    background: '#e8f5e9', color: '#1a472a',
                    padding: '0.3rem 0.8rem', borderRadius: '20px',
                    fontSize: '0.8rem', fontWeight: '600'
                  }}>📖 {dua.reference}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DuaLibrary