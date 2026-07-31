import { Link, Navigate } from 'react-router-dom'
import { formatPrice } from '../data/courses'
import { useEnrolment } from '../store/enrolment'

export default function Enrolled() {
  const lastBooking = useEnrolment((s) => s.lastBooking)

  if (!lastBooking) return <Navigate to="/courses" replace />

  const { details, totals, ref } = lastBooking

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 md:py-24">
      <div className="frame p-8 md:p-12 animate-develop">
        <p className="exif text-selenium-400 mb-5">PLACE CONFIRMED</p>

        <h1 className="font-display text-4xl md:text-5xl text-paper-50 mb-5">
          We’ll see you on Tanner Street
        </h1>

        <p className="text-silver-400 leading-relaxed mb-9">
          Joining instructions are on their way to{' '}
          <span className="text-paper-50">{details.email}</span>, including what to bring
          and where the door actually is — it is easy to walk past.
        </p>

        <dl className="rule-hair pt-6 space-y-4 text-sm">
          <Row label="REFERENCE" value={<span className="font-mono">{ref}</span>} />
          <Row label="NAME" value={details.name} />
          <Row
            label="COURSES"
            value={`${totals.count} ${totals.count === 1 ? 'course' : 'courses'}`}
          />
          {totals.discount > 0 && (
            <Row
              label="DISCOUNT"
              value={<span className="text-selenium-400">−{formatPrice(totals.discount)}</span>}
            />
          )}
          <Row
            label="DUE AT START"
            value={
              <span className="font-mono text-lg text-paper-50">
                {formatPrice(totals.total)}
              </span>
            }
          />
        </dl>

        <div className="flex flex-wrap gap-3 mt-10">
          <Link to="/courses" className="btn-print">Add another course</Link>
          <Link to="/tutors" className="btn-outline">Meet your tutor</Link>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-6">
      <dt className="exif sm:w-36 shrink-0 mb-1 sm:mb-0">{label}</dt>
      <dd className="text-paper-100">{value}</dd>
    </div>
  )
}
