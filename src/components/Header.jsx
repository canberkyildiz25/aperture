import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEnrolment } from '../store/enrolment'

const NAV = [
  { to: '/courses', label: 'Courses' },
  { to: '/tutors', label: 'Tutors' },
  { to: '/darkroom', label: 'The darkroom' },
]

export default function Header() {
  const held = useEnrolment((s) => s.places.length)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-40 bg-ink-950/95 backdrop-blur-sm border-b border-ink-800">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-6">
          <Link to="/" className="shrink-0">
            <span className="font-display text-2xl md:text-[1.7rem] text-paper-50 block leading-none">
              APERTURE
            </span>
            <span className="exif text-[0.55rem]">SCHOOL OF PHOTOGRAPHY · LONDON</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm transition-colors duration-300 ${
                    isActive ? 'text-selenium-400' : 'text-paper-100/75 hover:text-paper-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/enrol"
              className="flex items-center gap-2 px-3.5 py-2 border border-ink-600 text-paper-100 text-sm transition-colors duration-300 hover:border-selenium-400 hover:text-selenium-400"
            >
              <span className="hidden sm:inline">Places held</span>
              <span className="font-mono text-xs">{held}</span>
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2 text-paper-100"
              aria-label="Menu"
              aria-expanded={open}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden pb-4 flex flex-col border-t border-ink-800 pt-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`py-2 text-sm ${
                  pathname === item.to ? 'text-selenium-400' : 'text-paper-100/80'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
