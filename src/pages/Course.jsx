import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  findCourse,
  findMentor,
  formatPrice,
  LEVELS,
  FORMATS,
  START_DATES,
  courses,
} from '../data/courses'
import { useEnrolment } from '../store/enrolment'
import CourseCard from '../components/CourseCard'

export default function Course() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const course = findCourse(slug)
  const addPlace = useEnrolment((s) => s.addPlace)
  const held = useEnrolment((s) => s.places.some((p) => p.slug === slug))
  const [startDate, setStartDate] = useState(START_DATES[0].id)

  if (!course) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 text-center">
        <h1 className="font-display text-4xl text-paper-50 mb-5">
          That course is not running
        </h1>
        <Link to="/courses" className="btn-print">All courses</Link>
      </div>
    )
  }

  const mentor = findMentor(course.mentor)
  const level = LEVELS.find((l) => l.id === course.level)
  const format = FORMATS.find((f) => f.id === course.format)
  const related = courses.filter((c) => c.slug !== course.slug).slice(0, 3)

  const hold = () => {
    addPlace(course.slug, startDate)
    navigate('/enrol')
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-16">
      <nav className="exif mb-8 flex items-center gap-2">
        <Link to="/courses" className="hover:text-selenium-400 transition-colors">
          COURSES
        </Link>
        <span>/</span>
        <span className="text-paper-100">{course.code}</span>
      </nav>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-start">
        <div>
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="chip text-selenium-400">{level?.label}</span>
            <span className="chip text-silver-500">{format?.label}</span>
            {course.seats <= 3 && (
              <span className="chip text-safelight-500">{course.seats} places left</span>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-6xl text-paper-50 mb-5">
            {course.title}
          </h1>

          <p className="text-lg text-silver-400 leading-relaxed mb-10">
            {course.description}
          </p>

          <section className="mb-10">
            <h2 className="exif text-selenium-400 mb-5">WHAT YOU COVER</h2>
            <ol className="space-y-0">
              {course.syllabus.map((item, i) => (
                <li
                  key={item}
                  className="rule-hair py-4 flex gap-5 first:border-t-0 first:pt-0"
                >
                  <span className="font-mono text-xs text-selenium-400 pt-1 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-paper-100">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          {mentor && (
            <section className="frame p-6 flex gap-5 items-start">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-20 h-20 object-cover object-top grayscale shrink-0"
              />
              <div>
                <p className="exif mb-1.5">TAUGHT BY</p>
                <h3 className="font-display text-xl text-paper-50 mb-1">{mentor.name}</h3>
                <p className="text-xs text-selenium-400 mb-3 font-mono">
                  {mentor.years} YEARS · {mentor.shoots.toUpperCase()}
                </p>
                <p className="text-sm text-silver-400 leading-relaxed">{mentor.bio}</p>
              </div>
            </section>
          )}
        </div>

        {/* Kayıt kutusu */}
        <aside className="frame p-6 lg:sticky lg:top-28">
          <p className="exif mb-1">{course.code}</p>
          <p className="font-mono text-3xl text-paper-50 mb-6">
            {formatPrice(course.price)}
          </p>

          <dl className="space-y-3.5 text-sm mb-7">
            <Row label="LENGTH" value={`${course.weeks} weeks`} />
            <Row label="WHEN" value={course.hours} />
            <Row label="GROUP" value="11 places" />
            <Row label="KIT" value={course.kit} />
          </dl>

          <div className="rule-hair pt-5 mb-5">
            <label className="exif block mb-3">STARTING</label>
            <div className="space-y-2">
              {START_DATES.map((date) => (
                <label
                  key={date.id}
                  className={`flex items-center gap-3 px-3.5 py-2.5 border text-sm transition-colors ${
                    startDate === date.id
                      ? 'border-selenium-400 text-paper-50'
                      : 'border-ink-600 text-paper-100/70 hover:border-ink-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="start"
                    value={date.id}
                    checked={startDate === date.id}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="accent-selenium-500"
                  />
                  {date.label}
                </label>
              ))}
            </div>
          </div>

          <button onClick={hold} className="btn-print w-full">
            {held ? 'Update your place' : 'Hold a place'}
          </button>
          <p className="exif mt-4 text-center leading-relaxed">
            NOTHING TO PAY UNTIL THE TERM STARTS
          </p>
        </aside>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-3xl text-paper-50 mb-8">Also running</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <CourseCard key={item.slug} course={item} />
          ))}
        </div>
      </section>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div>
      <dt className="exif mb-0.5">{label}</dt>
      <dd className="text-paper-100">{value}</dd>
    </div>
  )
}
