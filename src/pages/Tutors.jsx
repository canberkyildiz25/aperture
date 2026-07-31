import { Link } from 'react-router-dom'
import { mentors, courses } from '../data/courses'

export default function Tutors() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 md:py-20">
      <header className="mb-14 max-w-2xl">
        <p className="exif text-selenium-400 mb-4">WHO TEACHES</p>
        <h1 className="font-display text-5xl md:text-6xl text-paper-50 mb-5">Tutors</h1>
        <p className="text-silver-400 leading-relaxed">
          Everyone here still works. That matters more than it sounds — a tutor who has
          not been on a job in five years teaches the version of photography that existed
          five years ago.
        </p>
      </header>

      <div className="space-y-14">
        {mentors.map((mentor, i) => {
          const teaches = courses.filter((c) => c.mentor === mentor.id)
          return (
            <article
              key={mentor.id}
              className={`grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-start ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="frame overflow-hidden">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-72 object-cover object-top grayscale contrast-110 transition-all duration-700 hover:grayscale-0"
                />
                <div className="px-4 py-3 border-t border-ink-700 flex justify-between">
                  <span className="exif">{mentor.years}Y</span>
                  <span className="exif">{mentor.role}</span>
                </div>
              </div>

              <div>
                <h2 className="font-display text-3xl md:text-4xl text-paper-50 mb-2">
                  {mentor.name}
                </h2>
                <p className="font-mono text-xs text-selenium-400 mb-5 tracking-widest uppercase">
                  {mentor.shoots}
                </p>

                <p className="text-silver-400 leading-relaxed mb-7 max-w-xl">
                  {mentor.bio}
                </p>

                {teaches.length > 0 && (
                  <div className="rule-hair pt-5">
                    <p className="exif mb-3">TEACHES</p>
                    <div className="flex flex-wrap gap-2">
                      {teaches.map((course) => (
                        <Link
                          key={course.slug}
                          to={`/courses/${course.slug}`}
                          className="px-3.5 py-2 border border-ink-600 text-sm text-paper-100 transition-all duration-300 hover:border-selenium-400 hover:text-selenium-400"
                        >
                          {course.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
