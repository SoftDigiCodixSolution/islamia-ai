import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Quran from './pages/Quran'
import Learn from './pages/Learn'
import Login from './pages/Login'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quran" element={<Quran />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App