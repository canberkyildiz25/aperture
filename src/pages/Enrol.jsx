import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { courses, formatPrice, findMentor, START_DATES } from '../data/courses'
import { useEnrolment, buildBooking } from '../store/enrolment'

export default function Enrol() {
  const navigate = useNavigate()
  const places = useEnrolment((s) => s.places)
  const removePlace = useEnrolment((s) => s.removePlace)
  const setStartDate = useEnrolment((s) => s.setStartDate)
  const confirm = useEnrolment((s) => s.confirm)

  const { lines, subtotal, discount, total } = buildBooking(places, courses)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'none',
  })

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    confirm(form, { subtotal, discount, total, count: lines.length })
    navigate('/enrolled')
  }

  if (lines.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 text-center">
        <p className="exif text-selenium-400 mb-4">NO PLACES HELD</p>
        <h1 className="font-display text-4xl md:text-5xl text-paper-50 mb-5">
          You haven’t held a place yet
        </h1>
        <p className="text-silver-400 mb-8 max-w-sm mx-auto">
          Places are held without payment — you settle when the term starts.
        </p>
        <Link to="/courses" className="btn-print">Look at the courses</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-16">
      <p className="exif text-selenium-400 mb-4">ENROLMENT</p>
      <h1 className="font-display text-5xl md:text-6xl text-paper-50 mb-12">
        Your places
      </h1>

      <form onSubmit={submit} className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
        <div>
          {/* Tutulan yerler */}
          <div className="mb-12">
            {lines.map((line) => {
              const mentor = findMentor(line.mentor)
              return (
                <div key={line.slug} className="rule-hair py-5 first:border-t-0 first:pt-0">
                  <div className="flex justify-between gap-4 mb-3">
                    <div>
                      <p className="exif mb-1">{line.code}</p>
                      <Link
                        to={`/courses/${line.slug}`}
                        className="font-display text-2xl text-paper-50 hover:text-selenium-400 transition-colors block leading-tight"
                      >
                        {line.title}
                      </Link>
                      <p className="text-sm text-silver-500 mt-1">
                        {line.weeks} weeks · {mentor?.name}
                      </p>
                    </div>
                    <p className="font-mono text-lg text-paper-50 shrink-0">
                      {formatPrice(line.price)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <label className="exif" htmlFor={`start-${line.slug}`}>
                      STARTS
                    </label>
                    <select
                      id={`start-${line.slug}`}
                      value={line.startDate}
                      onChange={(e) => setStartDate(line.slug, e.target.value)}
                      className="bg-ink-800 border border-ink-600 px-3 py-1.5 text-sm text-paper-100"
                    >
                      {START_DATES.map((date) => (
                        <option key={date.id} value={date.id}>
                          {date.label}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => removePlace(line.slug)}
                      className="text-sm text-silver-500 hover:text-safelight-500 transition-colors ml-auto"
                    >
                      Release place
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Kişi bilgileri */}
          <fieldset className="mb-8">
            <legend className="exif text-selenium-400 mb-5">WHO IS COMING</legend>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" id="name" value={form.name} onChange={update('name')} required />
              <Field label="Email" id="email" type="email" value={form.email} onChange={update('email')} required />
              <Field label="Phone" id="phone" type="tel" value={form.phone} onChange={update('phone')} />
            </div>
          </fieldset>

          <fieldset>
            <legend className="exif text-selenium-400 mb-5">
              HOW MUCH HAVE YOU SHOT BEFORE
            </legend>
            <div className="space-y-2">
              {[
                ['none', 'Never used a camera in manual'],
                ['some', 'I shoot, but I don’t always know why it worked'],
                ['confident', 'Comfortable — I want a specific skill'],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className={`flex items-center gap-3 px-4 py-3 border text-sm transition-colors ${
                    form.experience === value
                      ? 'border-selenium-400 text-paper-50'
                      : 'border-ink-700 text-paper-100/70'
                  }`}
                >
                  <input
                    type="radio"
                    name="experience"
                    value={value}
                    checked={form.experience === value}
                    onChange={update('experience')}
                    className="accent-selenium-500"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="frame p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl text-paper-50 mb-6">Summary</h2>

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-silver-400">
                {lines.length} {lines.length === 1 ? 'course' : 'courses'}
              </dt>
              <dd className="font-mono">{formatPrice(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-selenium-400">
                <dt>Two-course discount</dt>
                <dd className="font-mono">−{formatPrice(discount)}</dd>
              </div>
            )}
          </dl>

          {discount === 0 && lines.length === 1 && (
            <p className="mt-4 text-xs text-silver-500 border border-ink-700 px-3 py-2.5 leading-relaxed">
              Add a second course this term and ten per cent comes off both.
            </p>
          )}

          <div className="rule-hair mt-5 pt-4 flex justify-between items-baseline">
            <span className="font-display text-xl text-paper-50">Total</span>
            <span className="font-mono text-2xl text-paper-50">{formatPrice(total)}</span>
          </div>

          <button type="submit" className="btn-print w-full mt-6">
            Confirm enrolment
          </button>
          <Link
            to="/courses"
            className="block text-center text-sm text-silver-500 hover:text-selenium-400 transition-colors mt-4"
          >
            Add another course
          </Link>
        </aside>
      </form>
    </div>
  )
}

function Field({ label, id, type = 'text', value, onChange, required }) {
  return (
    <div>
      <label htmlFor={id} className="exif block mb-1.5">
        {label.toUpperCase()}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 bg-ink-800 border border-ink-600 text-sm text-paper-50 focus:border-selenium-400 focus:outline-none transition-colors"
      />
    </div>
  )
}
