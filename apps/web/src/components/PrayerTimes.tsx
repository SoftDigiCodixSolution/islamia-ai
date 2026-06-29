import { useState, useEffect } from 'react'

interface Props {
  onBack: () => void
}

interface PrayerTime {
  name: string
  time: string
  icon: string
  arabic: string
}

interface Coordinates {
  lat: number
  lng: number
  city: string
}

function PrayerTimes({ onBack }: Props) {
  const [prayers, setPrayers] = useState<PrayerTime[]>([])
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState<Coordinates | null>(null)
  const [error, setError] = useState('')
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  const [nextPrayer, setNextPrayer] = useState('')

  const fetchPrayerTimes = async (lat: number, lng: number, city: string) => {
    setLoading(true)
    setError('')
    try {
      const today = new Date()
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
      const res = await fetch(
        `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=2`
      )
      const data = await res.json()
      const timings = data.data.timings

      const prayerList: PrayerTime[] = [
        { name: 'Fajr', arabic: 'الفجر', time: timings.Fajr, icon: '🌙' },
        { name: 'Sunrise', arabic: 'الشروق', time: timings.Sunrise, icon: '🌅' },
        { name: 'Dhuhr', arabic: 'الظهر', time: timings.Dhuhr, icon: '☀️' },
        { name: 'Asr', arabic: 'العصر', time: timings.Asr, icon: '🌤️' },
        { name: 'Maghrib', arabic: 'المغرب', time: timings.Maghrib, icon: '🌇' },
        { name: 'Isha', arabic: 'العشاء', time: timings.Isha, icon: '🌃' },
      ]

      setPrayers(prayerList)
      setLocation({ lat, lng, city })
      findNextPrayer(prayerList)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch prayer times. Please try again.')
      setLoading(false)
    }
  }

  const findNextPrayer = (prayerList: PrayerTime[]) => {
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()

    for (const prayer of prayerList) {
      if (prayer.name === 'Sunrise') continue
      const [hours, minutes] = prayer.time.split(':').map(Number)
      const prayerMinutes = hours * 60 + minutes
      if (prayerMinutes > currentTime) {
        setNextPrayer(prayer.name)
        return
      }
    }
    setNextPrayer('Fajr')
  }

  const getLocation = () => {
    setLoading(true)
    setError('')
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      setLoading(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
          const data = await res.json()
          const city = data.address.city || data.address.town || data.address.village || 'Your Location'
          fetchPrayerTimes(latitude, longitude, city)
        } catch {
          fetchPrayerTimes(latitude, longitude, 'Your Location')
        }
      },
      () => {
        setError('Unable to get your location. Please allow location access.')
        setLoading(false)
      }
    )
  }

  const cities = [
    { name: 'Makkah', lat: 21.3891, lng: 39.8579 },
    { name: 'Madinah', lat: 24.5247, lng: 39.5692 },
    { name: 'Karachi', lat: 24.8607, lng: 67.0011 },
    { name: 'Lahore', lat: 31.5497, lng: 74.3436 },
    { name: 'Islamabad', lat: 33.6844, lng: 73.0479 },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
  ]

  const convertTo12Hour = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const hours12 = hours % 12 || 12
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`
  }

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
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>🕐 Prayer Times</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>{date}</p>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>

        {/* Location Button */}
        {!location && !loading && (
          <div style={{
            background: '#fff', borderRadius: '20px', padding: '3rem 2rem',
            textAlign: 'center', border: '1px solid #e8e8e8',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)', marginBottom: '2rem'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📍</div>
            <h3 style={{ color: '#0a2e1a', margin: '0 0 0.5rem' }}>Get Prayer Times</h3>
            <p style={{ color: '#666', margin: '0 0 2rem', fontSize: '0.95rem' }}>
              Allow location access for accurate prayer times
            </p>
            <button
              onClick={getLocation}
              style={{
                background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
                color: '#fff', border: 'none',
                padding: '0.9rem 2.5rem', borderRadius: '12px',
                fontSize: '1rem', fontWeight: '600', cursor: 'pointer',
                display: 'block', margin: '0 auto 1rem'
              }}
            >📍 Use My Location</button>
          </div>
        )}

        {/* Quick Cities */}
        {!location && (
          <div>
            <h3 style={{ color: '#0a2e1a', marginBottom: '1rem' }}>
              Or select a city:
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '0.8rem'
            }}>
              {cities.map(city => (
                <button
                  key={city.name}
                  onClick={() => fetchPrayerTimes(city.lat, city.lng, city.name)}
                  style={{
                    background: '#fff', border: '1px solid #e8e8e8',
                    borderRadius: '12px', padding: '0.8rem',
                    cursor: 'pointer', fontSize: '0.9rem',
                    color: '#0a2e1a', fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.borderColor = '#1a472a'
                    e.currentTarget.style.background = '#e8f5e9'
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.borderColor = '#e8e8e8'
                    e.currentTarget.style.background = '#fff'
                  }}
                >🌍 {city.name}</button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🕌</div>
            <p style={{ color: '#1a472a', fontSize: '1.1rem' }}>Fetching prayer times...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: '#fce4ec', border: '1px solid #f48fb1',
            borderRadius: '12px', padding: '1rem', marginBottom: '1rem',
            color: '#c62828', textAlign: 'center'
          }}>{error}</div>
        )}

        {/* Prayer Times */}
        {location && prayers.length > 0 && (
          <div>
            {/* Location Card */}
            <div style={{
              background: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
              borderRadius: '20px', padding: '1.5rem 2rem',
              color: '#fff', marginBottom: '1.5rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexWrap: 'wrap', gap: '1rem',
              boxShadow: '0 8px 24px rgba(26,71,42,0.3)'
            }}>
              <div>
                <p style={{ margin: 0, opacity: 0.7, fontSize: '0.85rem' }}>Prayer times for</p>
                <h2 style={{ margin: 0, fontSize: '1.8rem' }}>📍 {location.city}</h2>
                <p style={{ margin: '0.3rem 0 0', opacity: 0.7, fontSize: '0.85rem' }}>{date}</p>
              </div>
              {nextPrayer && (
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, opacity: 0.7, fontSize: '0.85rem' }}>Next prayer</p>
                  <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700', color: '#4ade80' }}>
                    {nextPrayer}
                  </p>
                </div>
              )}
            </div>

            {/* Change Location */}
            <button
              onClick={() => { setLocation(null); setPrayers([]) }}
              style={{
                background: 'transparent', border: '1px solid #1a472a',
                color: '#1a472a', padding: '0.5rem 1.2rem',
                borderRadius: '8px', cursor: 'pointer',
                fontSize: '0.85rem', marginBottom: '1.5rem'
              }}
            >🔄 Change Location</button>

            {/* Prayer Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {prayers.map((prayer, i) => (
                <div key={i} style={{
                  background: nextPrayer === prayer.name ? 'linear-gradient(135deg, #1a472a, #2d6a4f)' : '#fff',
                  borderRadius: '14px', padding: '1.2rem 1.5rem',
                  border: nextPrayer === prayer.name ? 'none' : '1px solid #e8e8e8',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: nextPrayer === prayer.name
                    ? '0 8px 24px rgba(26,71,42,0.3)'
                    : '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.8rem' }}>{prayer.icon}</span>
                    <div>
                      <p style={{
                        margin: 0, fontWeight: '600', fontSize: '1rem',
                        color: nextPrayer === prayer.name ? '#fff' : '#0a2e1a'
                      }}>{prayer.name}</p>
                      <p style={{
                        margin: 0, fontSize: '0.85rem',
                        color: nextPrayer === prayer.name ? 'rgba(255,255,255,0.7)' : '#888',
                        fontFamily: 'serif'
                      }}>{prayer.arabic}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{
                      margin: 0, fontSize: '1.3rem', fontWeight: '700',
                      color: nextPrayer === prayer.name ? '#4ade80' : '#1a472a'
                    }}>{convertTo12Hour(prayer.time)}</p>
                    {nextPrayer === prayer.name && (
                      <span style={{
                        fontSize: '0.75rem', background: 'rgba(74,222,128,0.2)',
                        color: '#4ade80', padding: '0.2rem 0.6rem',
                        borderRadius: '10px'
                      }}>Next Prayer</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PrayerTimes