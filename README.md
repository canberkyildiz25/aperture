# APERTURE

A photography school in a converted print works: six courses, four tutors, and a
darkroom that runs six days a week.

Built as a working enrolment platform rather than a brochure — a filterable course
catalogue, course pages with syllabus and tutor, places held per start date, and a
confirmation that issues a real reference.

## The exposure simulator

The piece the site is built around. Three dials — aperture, shutter, ISO — and the
image responds the way a camera would:

- **Aperture** blurs the background and swells the bokeh discs. At f/1.4 the
  background is gone; at f/16 everything is sharp.
- **Shutter** smears the subject once it drops below a hand-holdable speed.
- **ISO** lifts grain across the frame.

All three feed one exposure reading. Every step on one dial is a step you owe
another, and the meter tells you when you have overdrawn — which is the entire
content of week one, given away for free.

The scene is not a photograph. The background is CSS light sources that actually
grow and soften with the aperture, so the bokeh behaves rather than being faked
with a blur filter over a stock image.

## Stack

- React 19 + Vite
- React Router 7
- Zustand with `persist` for held places
- Tailwind CSS 4, tokens declared in `@theme`

Typography is Young Serif for display, Instrument Sans for body, and JetBrains Mono
for the technical values. The palette is a silver-gelatin tonal range with selenium
toning as the accent rather than a single bright colour.

## Running it

```bash
npm install
npm run dev
```

## Notes

- No payment step. Places are held without a card; the copy says fees are due when
  term starts, which is how most part-time schools run.
- Course data lives in `src/data/courses.js` — level, format, syllabus, tutor and
  remaining seats. The filters and the tutor pages all read from it.
- Two courses in one term take ten per cent off both, applied in `buildBooking`.
