import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { courses, LEVELS, FORMATS } from '../data/courses'
import CourseCard from '../components/CourseCard'

export default function Courses() {
  const [params, setParams] = useSearchParams()
  const level = params.get('level') ?? 'all'
  const format = params.get('format') ?? 'all'

  const setFilter = (key, value) => {
    if (value === 'all') params.delete(key)
    else params.set(key, value)
    setParams(params, { replace: true })
  }

  const visible = useMemo(() => {
    let list = courses
    if (level !== 'all') list = list.filter((c) => c.level === level)
    if (format !== 'all') list = list.filter((c) => c.format === format)
    return list
  }, [level, format])

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 md:py-20">
      <header className="mb-12 max-w-2xl">
        <p className="exif text-selenium-400 mb-4">AUTUMN TERM · SEPTEMBER TO DECEMBER</p>
        <h1 className="font-display text-5xl md:text-6xl text-paper-50 mb-5">Courses</h1>
        <p className="text-silver-400 leading-relaxed">
          Six courses, none of them larger than eleven people. Foundation runs three times
          a term; the darkroom and large format courses run once and fill early.
        </p>
      </header>

      <div className="rule-hair pt-6 mb-10 space-y-5">
        <FilterRow
          label="Level"
          options={LEVELS}
          active={level}
          onSelect={(v) => setFilter('level', v)}
        />
        <FilterRow
          label="Where"
          options={FORMATS}
          active={format}
          onSelect={(v) => setFilter('format', v)}
        />
      </div>

      <p className="exif mb-6">
        {visible.length} {visible.length === 1 ? 'COURSE' : 'COURSES'}
      </p>

      {visible.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="font-display text-2xl text-paper-50 mb-3">
            Nothing at that combination
          </p>
          <p className="text-silver-500">
            Not every level runs in every space — the darkroom courses are all advanced.
          </p>
        </div>
      )}
    </div>
  )
}

function FilterRow({ label, options, active, onSelect }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="exif w-16 shrink-0">{label}</span>
      <Chip active={active === 'all'} onClick={() => onSelect('all')}>
        Any
      </Chip>
      {options.map((option) => (
        <Chip
          key={option.id}
          active={active === option.id}
          onClick={() => onSelect(option.id)}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 text-sm border transition-all duration-300 ${
        active
          ? 'bg-paper-50 text-ink-950 border-paper-50'
          : 'bg-transparent text-paper-100/75 border-ink-600 hover:border-selenium-400 hover:text-selenium-400'
      }`}
    >
      {children}
    </button>
  )
}
