import { useState } from 'react'
import QaidaLesson from '../components/QaidaLesson'
import HifzTracker from '../components/HifzTracker'
import TajweedGuide from '../components/TajweedGuide'

function Learn() {
  const [activeTab, setActiveTab] = useState('home')

  const courses = [
    { id: 'qaida', icon: '📚', title: 'Quranic Qaida', desc: 'Learn Arabic letters and pronunciation from scratch', level: 'Beginner', lessons: 30, color: '#e8f5e9', border: '#4ade80' },
    { id: 'tajweed', icon: '🎵', title: 'Tajweed Rules', desc: 'Master the rules of proper Quran recitation', level: 'Intermediate', lessons: 20, color: '#e3f2fd', border: '#60a5fa' },
    { id: 'hifz', icon: '🧠', title: 'Hifz Program', desc: 'Memorize the Holy Quran step by step with tracking', level: 'Advanced', lessons: 114, color: '#fce4ec', border: '#f472b6' },
    { id: 'arabic', icon: '✍️', title: 'Arabic Writing', desc: 'Learn to write Arabic letters beautifully', level: 'Beginner', lessons: 15, color: '#fff3e0', border: '#fb923c' },
    { id: 'islamic', icon: '☪️', title: 'Islamic Studies', desc: 'Aqeedah, Fiqh, Seerah and Islamic history', level: 'All Levels', lessons: 50, color: '#f3e5f5', border: '#c084fc' },
    { id: 'duas', icon: '🤲', title: 'Duas & Adhkar', desc: 'Learn essential daily supplications', level: 'Beginner', lessons: 25, color: '#e0f7fa', border: '#22d3ee' },
  ]

  if (activeTab === 'qaida') return <QaidaLesson onBack={() => setActiveTab('home')} />
  if (activeTab === 'tajweed') return <TajweedGuide onBack={() => setActiveTab('home')} />
  if (activeTab === 'hifz') return <HifzTracker onBack={() => setActiveTab('home')} />

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f8faf9' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #0a2e1a 0%, #1a472a 100%)',
        padding: '3rem 2rem',
        textAlign: 'center',
        color: '#fff'
      }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem', fontWeight: '700' }}>
          🎓 Islamic Learning Center
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '1.1rem' }}>
          Start your journey to learn Quran and Islam
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{
        background: '#fff',
        padding: '1.5rem 2rem',
        borderBottom: '1px solid #e8f0eb',
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {[
          { label: 'Courses Available', value: '6' },
          { label: 'Total Lessons', value: '254' },
          { label: 'Languages', value: '5' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a472a' }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Courses Grid */}
      <div style={{ padding: '2.5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ color: '#0a2e1a', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
          Choose your course
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {courses.map(course => (
            <div
              key={course.id}
              onClick={() => setActiveTab(course.id)}
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '1.8rem',
                border: `1px solid #e8e8e8`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'
                e.currentTarget.style.borderColor = course.border
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
                e.currentTarget.style.borderColor = '#e8e8e8'
              }}
            >
              <div style={{
                width: '56px', height: '56px',
                background: course.color,
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.8rem', marginBottom: '1.2rem'
              }}>{course.icon}</div>
              <h3 style={{ color: '#0a2e1a', margin: '0 0 0.5rem', fontSize: '1.15rem' }}>
                {course.title}
              </h3>
              <p style={{ color: '#666', margin: '0 0 1.2rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {course.desc}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  background: course.color,
                  color: '#333',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>{course.level}</span>
                <span style={{ fontSize: '0.85rem', color: '#888' }}>
                  {course.lessons} lessons →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Learn