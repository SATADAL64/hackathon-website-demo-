import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      {!isTouchDevice && <CustomCursor />}
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
