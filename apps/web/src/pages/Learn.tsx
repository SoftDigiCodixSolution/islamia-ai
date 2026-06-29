function Learn() {
  const courses = [
    { title: 'Quranic Qaida', description: 'Learn the basics of Arabic letters and pronunciation', icon: '📚', level: 'Beginner' },
    { title: 'Tajweed Rules', description: 'Master the rules of Quran recitation', icon: '🎵', level: 'Intermediate' },
    { title: 'Hifz Program', description: 'Memorize the Holy Quran step by step', icon: '🧠', level: 'Advanced' },
    { title: 'Arabic Language', description: 'Learn Quranic Arabic from scratch', icon: '✍️', level: 'Beginner' },
    { title: 'Islamic Studies', description: 'Comprehensive Islamic knowledge', icon: '☪️', level: 'All Levels' },
    { title: 'Duas & Adhkar', description: 'Learn daily supplications and remembrance', icon: '🤲', level: 'Beginner' },
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#1a472a', textAlign: 'center', marginBottom: '0.5rem' }}>
        🎓 Learn Islam
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
        Start your Islamic learning journey today
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1.5rem'
      }}>
        {courses.map((course, index) => (
          <div key={index} style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '1.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = '#1a472a'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = '#e0e0e0'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{course.icon}</div>
            <h3 style={{ color: '#1a472a', margin: '0 0 0.5rem' }}>{course.title}</h3>
            <p style={{ color: '#666', margin: '0 0 1rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
              {course.description}
            </p>
            <span style={{
              background: '#e8f5e9',
              color: '#1a472a',
              padding: '0.3rem 0.8rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>{course.level}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Learn