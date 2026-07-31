import { Link } from 'react-router-dom'

const COLUMNS = [
  {
    heading: 'Study',
    links: [
      { label: 'All courses', to: '/courses' },
      { label: 'Foundation', to: '/courses?level=foundation' },
      { label: 'The darkroom', to: '/darkroom' },
    ],
  },
  {
    heading: 'School',
    links: [
      { label: 'Our tutors', to: '/tutors' },
      { label: 'Exposure simulator', to: '/#simulator' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-800">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl text-paper-50 mb-3">APERTURE</p>
            <p className="text-silver-500 text-sm max-w-xs leading-relaxed">
              A photography school in a converted print works in Bermondsey. Small
              groups, working photographers, and a darkroom that runs six days a week.
            </p>
            <p className="exif mt-6">AUTUMN TERM OPENS 15 SEPTEMBER</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="exif mb-4 text-selenium-400">{col.heading}</p>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-paper-100/70 transition-colors duration-300 hover:text-selenium-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Film şeridi kenarı */}
        <div className="sprocket h-3.5 my-10 opacity-40" />

        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <p className="exif">© 2026 APERTURE SCHOOL LTD</p>
          <p className="exif">UNIT 4, TANNER STREET, SE1</p>
        </div>
      </div>
    </footer>
  )
}
