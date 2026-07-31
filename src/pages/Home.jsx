import { Link } from 'react-router-dom'
import { courses, mentors, formatPrice } from '../data/courses'
import CourseCard from '../components/CourseCard'
import ExposureSimulator from '../components/ExposureSimulator'

export default function Home() {
  const featured = courses.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 md:pt-24 pb-20">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div className="animate-develop">
              <p className="exif text-selenium-400 mb-6">
                BERMONDSEY · SINCE 2014 · 11 TO A GROUP
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] text-paper-50 mb-7">
                Anyone can
                <br />
                take a photograph.
                <br />
                <span className="text-selenium-400">Learn to see one.</span>
              </h1>

              <p className="text-lg text-silver-400 max-w-md mb-9 leading-relaxed">
                Eight-week courses in composition, light and printing — taught in groups
                of eleven by photographers who still work for a living.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/courses" className="btn-print">
                  See the autumn term
                </Link>
                <a href="#simulator" className="btn-outline">
                  Try the exposure triangle
                </a>
              </div>

              <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
                {[
                  ['11', 'to a group'],
                  ['6', 'days the darkroom runs'],
                  ['2014', 'teaching since'],
                ].map(([figure, label]) => (
                  <div key={label}>
                    <p className="font-display text-3xl text-paper-50 leading-none">
                      {figure}
                    </p>
                    <p className="exif mt-2 leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              {/* Kontakt baskı düzeni — dört eğitmen negatif karesi gibi */}
              <div className="grid grid-cols-2 gap-2">
                {mentors.map((mentor, i) => (
                  <div
                    key={mentor.id}
                    className="frame overflow-hidden animate-develop"
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-44 object-cover object-top grayscale contrast-110 transition-all duration-700 hover:grayscale-0"
                    />
                    <p className="exif px-2.5 py-2 border-t border-ink-700">
                      {mentor.name.split(' ')[0]} · {mentor.years}Y
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExposureSimulator />

      {/* Kurslar */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="exif text-selenium-400 mb-4">AUTUMN TERM</p>
              <h2 className="font-display text-4xl md:text-5xl text-paper-50">
                Where most people start
              </h2>
            </div>
            <Link
              to="/courses"
              className="hidden sm:block text-sm text-paper-100/75 hover:text-selenium-400 transition-colors shrink-0"
            >
              All six courses →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Okul hakkında */}
      <section className="py-20 md:py-24 border-t border-ink-800">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="exif text-selenium-400 mb-4">THE SCHOOL</p>
            <h2 className="font-display text-4xl md:text-5xl text-paper-50 mb-6">
              A print works with the roof still leaking
            </h2>
            <div className="space-y-4 text-silver-400 leading-relaxed">
              <p>
                We took over a disused print works on Tanner Street in 2014 and put a
                darkroom where the presses had been. Six enlargers, two studios, and a
                kitchen that everyone ends up in.
              </p>
              <p>
                Groups are capped at eleven because that is how many people one tutor can
                actually look at properly in three hours. Every course ends with your work
                on the wall, which is a harder deadline than any essay.
              </p>
            </div>

            <Link to="/tutors" className="btn-outline mt-8">
              Meet the tutors
            </Link>
          </div>

          <div className="frame p-8">
            <p className="exif mb-6">WHAT A TERM COSTS</p>
            <dl className="space-y-4">
              {courses.slice(0, 4).map((course) => (
                <div key={course.slug} className="flex justify-between gap-4 text-sm">
                  <dt className="text-paper-100">{course.title}</dt>
                  <dd className="font-mono text-silver-400 shrink-0">
                    {formatPrice(course.price)}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="rule-hair mt-6 pt-4 text-xs text-silver-500 leading-relaxed">
              Ten per cent off when you take two courses in the same term. Materials are
              included on every course except large format, where sheet film is at cost.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
