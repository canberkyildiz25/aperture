import { Link } from 'react-router-dom'
import { courses } from '../data/courses'

const STEPS = [
  {
    stage: 'Develop',
    time: '9 min 30',
    body: 'Film into the tank in complete darkness, then developer at twenty degrees. Agitate for the first thirty seconds and then five seconds every minute — inconsistently and you get streaks.',
  },
  {
    stage: 'Contact',
    time: '8 sec',
    body: 'The whole roll printed at once on a single sheet. You learn more from a contact sheet than from any single frame, because it shows you how you worked towards the picture.',
  },
  {
    stage: 'Test strip',
    time: '2 – 20 sec',
    body: 'A strip of paper exposed in bands to find the time that holds both the highlights and the shadows. Nobody gets it first time and nobody should try to.',
  },
  {
    stage: 'Print',
    time: 'as long as it takes',
    body: 'Dodging and burning with your hands under the enlarger. The same frame, printed six times, is how you find out what the picture is actually about.',
  },
  {
    stage: 'Tone and wash',
    time: '60 min',
    body: 'Selenium for the shift in the blacks and for archival life, then an hour in the wash. Skip the wash and the print yellows within a decade.',
  },
]

export default function Darkroom() {
  const darkroomCourse = courses.find((c) => c.format === 'darkroom')

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 md:py-20">
      <header className="mb-14 max-w-2xl">
        <p className="exif text-selenium-400 mb-4">SIX ENLARGERS · OPEN SIX DAYS</p>
        <h1 className="font-display text-5xl md:text-6xl text-paper-50 mb-5">
          The darkroom
        </h1>
        <p className="text-silver-400 leading-relaxed">
          Where the print works used to keep its presses. Six enlargers, three sinks and a
          drying cabinet that takes twenty fibre prints. Students on any course can book
          it; the advanced course lives in it.
        </p>
      </header>

      {/* Süreç — gerçek bir sıra olduğu için numaralandırma bilgi taşıyor */}
      <div className="mb-16">
        {STEPS.map((step, i) => (
          <div key={step.stage} className="rule-hair py-7 first:border-t-0 first:pt-0">
            <div className="grid md:grid-cols-[3rem_1fr_9rem] gap-4 md:gap-8 items-baseline">
              <span className="font-mono text-sm text-selenium-400">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="font-display text-2xl text-paper-50 mb-2">{step.stage}</h2>
                <p className="text-silver-400 leading-relaxed max-w-xl">{step.body}</p>
              </div>
              <span className="exif md:text-right">{step.time}</span>
            </div>
          </div>
        ))}
      </div>

      {darkroomCourse && (
        <div className="frame p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="exif mb-2">{darkroomCourse.code}</p>
            <h2 className="font-display text-3xl text-paper-50 mb-2">
              {darkroomCourse.title}
            </h2>
            <p className="text-silver-400 max-w-md">{darkroomCourse.short}</p>
          </div>
          <Link to={`/courses/${darkroomCourse.slug}`} className="btn-print shrink-0">
            See the course
          </Link>
        </div>
      )}
    </div>
  )
}
