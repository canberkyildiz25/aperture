import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Course from './pages/Course'
import Enrol from './pages/Enrol'
import Enrolled from './pages/Enrolled'
import Tutors from './pages/Tutors'
import Darkroom from './pages/Darkroom'
import './styles.css'

/** Rota değişince başa sar; ankraj varsa ona kaydır. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<Course />} />
            <Route path="/enrol" element={<Enrol />} />
            <Route path="/enrolled" element={<Enrolled />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/darkroom" element={<Darkroom />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
