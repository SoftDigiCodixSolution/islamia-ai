import { useState } from 'react'

interface Props {
  onBack: () => void
}

const hadiths = [
  {
    text: "Actions are judged by intentions, and every person will get the reward according to what he has intended.",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
    source: "Sahih Bukhari",
    book: "Book 1, Hadith 1",
    narrator: "Umar ibn al-Khattab (RA)"
  },
  {
    text: "The best among you are those who have the best manners and character.",
    arabic: "إِنَّ مِنْ خِيَارِكُمْ أَحْسَنَكُمْ أَخْلاَقًا",
    source: "Sahih Bukhari",
    book: "Book 73, Hadith 56",
    narrator: "Abdullah ibn Amr (RA)"
  },
  {
    text: "None of you truly believes until he loves for his brother what he loves for himself.",
    arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    source: "Sahih Bukhari",
    book: "Book 2, Hadith 13",
    narrator: "Anas ibn Malik (RA)"
  },
  {
    text: "The strong man is not the one who wrestles, but the strong man is the one who controls himself in a fit of rage.",
    arabic: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ",
    source: "Sahih Bukhari",
    book: "Book 73, Hadith 135",
    narrator: "Abu Hurairah (RA)"
  },
  {
    text: "Whoever believes in Allah and the Last Day should speak good or keep silent.",
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    source: "Sahih Bukhari",
    book: "Book 73, Hadith 158",
    narrator: "Abu Hurairah (RA)"
  },
  {
    text: "Make things easy and do not make them difficult, cheer people up and do not drive them away.",
    arabic: "يَسِّرُوا وَلاَ تُعَسِّرُوا وَبَشِّرُوا وَلاَ تُنَفِّرُوا",
    source: "Sahih Bukhari",
    book: "Book 3, Hadith 69",
    narrator: "Anas ibn Malik (RA)"
  },
  {
    text: "The best of people are those who are most beneficial to people.",
    arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
    source: "Al-Mu'jam Al-Awsat",
    book: "Hadith 6026",
    narrator: "Jabir ibn Abdullah (RA)"
  },
  {
    text: "Seek knowledge from the cradle to the grave.",
    arabic: "اطْلُبُوا الْعِلْمَ مِنَ الْمَهْدِ إِلَى اللَّحْدِ",
    source: "Various Sources",
    book: "Islamic Tradition",
    narrator: "Prophet Muhammad ﷺ"
  },
]

const collections = [
  { id: 'bukhari', name: 'Sahih Bukhari', icon: '📗', count: '7,563' },
  { id: 'muslim', name: 'Sahih Muslim', icon: '📘', count: '7,500' },
  { id: 'tirmidhi', name: 'Jami At-Tirmidhi', icon: '📙', count: '3,956' },
  { id: 'abudawud', name: 'Sunan Abu Dawud', icon: '📕', count: '5,274' },
  { id: 'nasai', name: 'Sunan An-Nasai', icon: '📒', count: '5,758' },
  { id: 'ibnmajah', name: 'Sunan Ibn Majah', icon: '📔', count: '4,341' },
]

function HadithViewer({ onBack }: Props) {
  const [search, setSearch] = useState('')
  const [selectedCollection, setSelectedCollection] = useState('all')

  const filtered = hadiths.filter(h =>
    h.text.toLowerCase().includes(search.toLowerCase()) ||
    h.narrator.toLowerCase().includes(search.toLowerCase())
  )

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
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>📜 Hadith Collections</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>
            Authentic Hadith from major collections
          </p>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>

        {/* Collections */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '0.8rem', marginBottom: '2rem'
        }}>
          {collections.map(col => (
            <div
              key={col.id}
              onClick={() => setSelectedCollection(col.id)}
              style={{
                background: selectedCollection === col.id ? '#1a472a' : '#fff',
                borderRadius: '12px', padding: '1rem',
                border: selectedCollection === col.id ? '1px solid #4ade80' : '1px solid #e8e8e8',
                cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>{col.icon}</div>
              <div style={{
                fontSize: '0.75rem', fontWeight: '600',
                color: selectedCollection === col.id ? '#fff' : '#333'
              }}>{col.name}</div>
              <div style={{
                fontSize: '0.7rem',
                color: selectedCollection === col.id ? '#4ade80' : '#888'
              }}>{col.count} hadiths</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <span style={{
            position: 'absolute', left: '1rem', top: '50%',
            transform: 'translateY(-50%)', fontSize: '1.1rem'
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search hadiths..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '0.9rem 1rem 0.9rem 3rem',
              borderRadius: '12px', border: '2px solid #e0e0e0',
              fontSize: '1rem', boxSizing: 'border-box', outline: 'none'
            }}
            onFocus={e => e.target.style.borderColor = '#1a472a'}
            onBlur={e => e.target.style.borderColor = '#e0e0e0'}
          />
        </div>

        {/* Hadiths */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map((hadith, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: '16px', padding: '1.5rem',
              border: '1px solid #e8e8e8',
              borderLeft: '4px solid #1a472a',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.2s'
            }}
              onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'}
              onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'}
            >
              {/* Arabic */}
              <p style={{
                fontSize: '1.4rem', textAlign: 'right', direction: 'rtl',
                fontFamily: 'serif', color: '#1a472a', lineHeight: '2',
                margin: '0 0 1rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem'
              }}>{hadith.arabic}</p>

              {/* English */}
              <p style={{
                fontSize: '1rem', color: '#333', lineHeight: '1.7',
                margin: '0 0 1rem', fontStyle: 'italic'
              }}>"{hadith.text}"</p>

              {/* Meta */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{
                  background: '#e8f5e9', color: '#1a472a',
                  padding: '0.3rem 0.8rem', borderRadius: '20px',
                  fontSize: '0.8rem', fontWeight: '600'
                }}>📗 {hadith.source}</span>
                <span style={{
                  background: '#f5f5f5', color: '#555',
                  padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem'
                }}>📌 {hadith.book}</span>
                <span style={{
                  background: '#f5f5f5', color: '#555',
                  padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem'
                }}>👤 {hadith.narrator}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HadithViewer