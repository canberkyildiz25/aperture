import { Link } from 'react-router-dom'
import { formatPrice, findMentor, LEVELS } from '../data/courses'
import { useEnrolment } from '../store/enrolment'

export default function CourseCard({ course }) {
  const held = useEnrolment((s) => s.places.some((p) => p.slug === course.slug))
  const mentor = findMentor(course.mentor)
  const level = LEVELS.find((l) => l.id === course.level)
  const nearlyFull = course.seats <= 3

  return (
    <Link to={`/courses/${course.slug}`} className="frame block p-6 group">
      <div className="flex items-start justify-between gap-4 mb-5">
        <span className="exif">{course.code}</span>
        <div className="flex flex-wrap gap-1.5 justify-end">
          {held && <span className="chip text-selenium-400">Place held</span>}
          {nearlyFull && !held && (
            <span className="chip text-safelight-500">{course.seats} places left</span>
          )}
        </div>
      </div>

      <h3 className="font-display text-2xl text-paper-50 mb-2.5 transition-colors group-hover:text-selenium-400">
        {course.title}
      </h3>

      <p className="text-sm text-silver-400 line-clamp-2 leading-snug mb-6">
        {course.short}
      </p>

      <dl className="grid grid-cols-2 gap-y-3 mb-6 text-sm">
        <div>
          <dt className="exif mb-0.5">Level</dt>
          <dd className="text-paper-100">{level?.label}</dd>
        </div>
        <div>
          <dt className="exif mb-0.5">Length</dt>
          <dd className="text-paper-100 font-mono">{course.weeks} weeks</dd>
        </div>
        <div>
          <dt className="exif mb-0.5">Tutor</dt>
          <dd className="text-paper-100">{mentor?.name}</dd>
        </div>
        <div>
          <dt className="exif mb-0.5">Fee</dt>
          <dd className="text-paper-100 font-mono">{formatPrice(course.price)}</dd>
        </div>
      </dl>

      <span className="rule-hair pt-4 block text-sm text-selenium-400">
        Course outline →
      </span>
    </Link>
  )
}
