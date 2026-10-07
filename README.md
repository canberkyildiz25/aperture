# APERTURE

A photography school in a converted print works: six courses, four tutors, and a darkroom that runs six days a week.

**Live:** https://aperture-school.netlify.app/

It is built as a working enrolment platform, not a brochure: a filterable course catalogue, course pages with syllabus and tutor, places held per start date, and a confirmation that issues a reference. The school, its tutors and its fees are invented for the project.

## The exposure simulator

The piece the site is built around. Three dials (aperture, shutter, ISO) and the image responds the way a camera would:

- **Aperture** blurs the background and swells the bokeh discs. At f/1.4 the background is gone; at f/16 everything is sharp.
- **Shutter** smears the subject once it drops below a speed you can hold by hand.
- **ISO** lifts grain across the frame.

All three feed one exposure reading. Every step on one dial is a step you owe another, and the meter tells you when you have overdrawn. That is the whole content of week one, given away for free.

The scene is not a photograph. The background is CSS light sources that really grow and soften with the aperture, so the bokeh behaves and is not faked with a blur filter over a stock image.

## What else it does

- **Courses**: six of them, filtered by level and format.
- **A course page**: syllabus week by week, the tutor, the start dates and the places left on each.
- **Enrolment**: pick a start date, hold a place, get a reference. Two courses in one term take ten per cent off both.
- **Tutors** and **the darkroom**: who teaches, and when the room is open.

## Stack

- React 19 and Vite
- React Router 7
- Zustand with `persist` for held places
- Tailwind CSS 4, with the tokens declared in `@theme`

The type is Young Serif for display, Instrument Sans for body and JetBrains Mono for the technical values. The palette is a silver-gelatin tonal range, with selenium toning as the accent in place of one bright colour.

## Running it

Node 22.

```bash
npm install
npm run dev        # the address Vite prints, usually http://localhost:5173
npm run build      # the production build, into dist/
npm run preview    # serve that build locally
```

There are no environment variables and no server.

## Layout of the code

```
src/
  App.jsx                           routes
  pages/                            Home, Courses, Course, Enrol, Enrolled, Tutors, Darkroom
  components/ExposureSimulator.jsx  the three dials and the scene they drive
  components/                       Header, Footer, CourseCard
  data/courses.js                   level, format, syllabus, tutor and seats for each course
  store/enrolment.js                held places and the discount, kept in the browser
  styles.css                        Tailwind, the tokens and the few global rules
netlify.toml                        the build, and the fallback a single-page app needs
```

## Notes

- There is no payment step. Places are held without a card; the copy says fees are due when term starts, which is how most part-time schools run.
- The discount for two courses in one term is applied in `buildBooking`, in the store.

## Deploying

A static site. The live copy is on Netlify, built with `npm run build` and published from `dist`.

## Author

[Canberk Yıldız](https://canberkyildiz.netlify.app)
