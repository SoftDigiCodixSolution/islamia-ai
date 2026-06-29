import { useState } from 'react'
import HadithViewer from '../components/HadithViewer'
import DuaLibrary from '../components/DuaLibrary'
import PrayerTimes from '../components/PrayerTimes'

function Knowledge() {
  const [activeTab, setActiveTab] = useState('home')

  const sections = [
    { id: 'hadith', icon: '📜', title: 'Hadith Collections', desc: 'Sahih Bukhari, Muslim, Abu Dawud and more', color: '#e8f5e9', border: '#4ade80' },
    { id: 'duas', icon: '🤲', title: 'Dua Library', desc: 'Daily duas, morning/evening adhkar', color: '#e3f2fd', border: '#60a5fa' },
    { id: 'prayer', icon: '🕐', title: 'Prayer Times', desc: 'Accurate prayer times for your location', color: '#fff3e0', border: '#fb923c' },
    { id: 'sites', icon: '🌐', title: 'Islamic Sites', desc: 'Best Islamic websites and resources', color: '#f3e5f5', border: '#c084fc' },
  ]

  if (activeTab === 'hadith') return <HadithViewer onBack={() => setActiveTab('home')} />
  if (activeTab === 'duas') return <DuaLibrary onBack={() => setActiveTab('home')} />
  if (activeTab === 'prayer') return <PrayerTimes onBack={() => setActiveTab('home')} />

  if (activeTab === 'sites') return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f8faf9' }}>
      <div style={{
        background: 'linear-gradient(160deg, #0a2e1a, #1a472a)',
        padding: '1.5rem 2rem',
        display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff'
      }}>
        <button onClick={() => setActiveTab('home')} style={{
          background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer'
        }}>← Back</button>
        <h2 style={{ margin: 0 }}>🌐 Islamic Sites Directory</h2>
      </div>
      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        {[
          { name: 'Quran.com', url: 'https://quran.com', desc: 'Read and listen to the Holy Quran online', icon: '📖' },
          { name: 'Sunnah.com', url: 'https://sunnah.com', desc: 'Complete Hadith collections online', icon: '📜' },
          { name: 'IslamQA', url: 'https://islamqa.info', desc: 'Fatawa and Islamic Q&A by scholars', icon: '❓' },
          { name: 'Muslim Pro', url: 'https://muslimpro.com', desc: 'Prayer times, Quran and Qibla', icon: '🕌' },
          { name: 'SeekersGuidance', url: 'https://seekersguidance.org', desc: 'Free Islamic courses and answers', icon: '🎓' },
          { name: 'Islam21c', url: 'https://islam21c.com', desc: 'Contemporary Islamic articles', icon: '✍️' },
          { name: 'Productivemuslim', url: 'https://productivemuslim.com', desc: 'Islamic productivity and lifestyle', icon: '⚡' },
          { name: 'Al-Islam.org', url: 'https://al-islam.org', desc: 'Comprehensive Islamic library', icon: '📚' },
        ].map((site, i) => (
          <a key={i} href={site.url} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            background: '#fff', borderRadius: '14px', padding: '1.2rem 1.5rem',
            marginBottom: '0.8rem', border: '1px solid #e8e8e8',
            textDecoration: 'none', transition: 'all 0.2s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = '#4ade80'
              e.currentTarget.style.transform = 'translateX(4px)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = '#e8e8e8'
              e.currentTarget.style.transform = 'translateX(0)'
            }}
          >
            <span style={{ fontSize: '2rem' }}>{site.icon}</span>
            <div>
              <p style={{ margin: 0, fontWeight: '600', color: '#0a2e1a', fontSize: '1rem' }}>{site.name}</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>{site.desc}</p>
            </div>
            <span style={{ marginLeft: 'auto', color: '#4ade80', fontSize: '1.2rem' }}>→</span>
          </a>
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f8faf9' }}>
      <div style={{
        background: 'linear-gradient(160deg, #0a2e1a, #1a472a)',
        padding: '3rem 2rem', textAlign: 'center', color: '#fff'
      }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem', fontWeight: '700' }}>
          📚 Islamic Knowledge Hub
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '1.1rem' }}>
          Hadith, Duas, Prayer Times and Islamic Resources
        </p>
      </div>

      <div style={{ padding: '2.5rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.5rem'
        }}>
          {sections.map(section => (
            <div
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              style={{
                background: '#fff', borderRadius: '16px', padding: '2rem',
                border: '1px solid #e8e8e8', cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = section.border
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = '#e8e8e8'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{
                width: '56px', height: '56px', background: section.color,
                borderRadius: '14px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.8rem', marginBottom: '1rem'
              }}>{section.icon}</div>
              <h3 style={{ color: '#0a2e1a', margin: '0 0 0.5rem' }}>{section.title}</h3>
              <p style={{ color: '#666', margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
                {section.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Knowledge