/**
 * APERTURE ders programı.
 * Fiyatlar sterlin, süreler hafta. `seats` kalan kontenjan.
 */

export const LEVELS = [
  { id: 'foundation', label: 'Foundation' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
]

export const FORMATS = [
  { id: 'studio', label: 'In the studio' },
  { id: 'field', label: 'On location' },
  { id: 'darkroom', label: 'In the darkroom' },
]

export const mentors = [
  {
    id: 'emilia',
    name: 'Emilia Smith',
    role: 'Head of foundation',
    years: 14,
    image: '/img/emilia-mentor.png',
    shoots: 'Documentary, editorial',
    bio: 'Fourteen years photographing for the broadsheets, most of it on assignment abroad. Teaches the foundation course because she thinks the first eight weeks decide whether someone keeps going.',
  },
  {
    id: 'alex',
    name: 'Alex Lebedev',
    role: 'Darkroom lead',
    years: 21,
    image: '/img/alex-mentor.png',
    shoots: 'Black and white, large format',
    bio: 'Prints for three London galleries and has not owned a digital camera since 2009. Runs the darkroom courses, and will make you re-print a frame until the blacks hold detail.',
  },
  {
    id: 'mia',
    name: 'Mia Dubrovska',
    role: 'Portrait tutor',
    years: 11,
    image: '/img/mia-mentor.png',
    shoots: 'Portraiture, studio lighting',
    bio: 'Studio portraitist who works mostly with one light and a reflector. Her sessions are about getting a person to relax, which she argues is ninety per cent of a portrait.',
  },
  {
    id: 'eliot',
    name: 'Eliot Kovalev',
    role: 'Landscape tutor',
    years: 17,
    image: '/img/eliot-mentor.png',
    shoots: 'Landscape, long exposure',
    bio: 'Spends most of the year in the Cairngorms and the Hebrides. Teaches the location courses, which run at dawn because that is when the light is worth photographing.',
  },
]

export const courses = [
  {
    slug: 'seeing-the-frame',
    code: 'AP-101',
    title: 'Seeing the Frame',
    level: 'foundation',
    format: 'studio',
    weeks: 8,
    hours: '3 hrs weekly, Tuesday evenings',
    price: 420,
    seats: 4,
    mentor: 'emilia',
    kit: 'Any camera with manual mode. We lend bodies if you have none.',
    short: 'The eight weeks that decide whether you keep going.',
    description:
      'Everything the exposure triangle does, and why it matters before you touch anything else. You will shoot every week and we will look at the results together — which is the uncomfortable, useful part.',
    syllabus: [
      'Aperture, shutter, ISO — and what you trade for what',
      'Reading light before you raise the camera',
      'Composition beyond the rule of thirds',
      'Focal length and how it changes a face',
      'Editing your own work down to six frames',
    ],
  },
  {
    slug: 'available-light-portraits',
    code: 'AP-210',
    title: 'Available Light Portraits',
    level: 'intermediate',
    format: 'studio',
    weeks: 6,
    hours: '3 hrs weekly, Thursday evenings',
    price: 380,
    seats: 2,
    mentor: 'mia',
    kit: 'A lens faster than f/2.8 helps but is not required.',
    short: 'One window, one reflector, one person who trusts you.',
    description:
      'Studio lighting is a solved problem; a face is not. Six weeks on working with the light already in a room, and on the far harder skill of getting someone to stop performing for the lens.',
    syllabus: [
      'Finding the light in a room you did not choose',
      'One reflector and where to stand it',
      'Directing without making it feel like direction',
      'Focal length, distance and flattery',
      'Working through a sitting that is not going well',
    ],
  },
  {
    slug: 'dawn-landscape',
    code: 'AP-230',
    title: 'Dawn Landscape',
    level: 'intermediate',
    format: 'field',
    weeks: 4,
    hours: '5 hrs weekly, Saturday mornings',
    price: 460,
    seats: 6,
    mentor: 'eliot',
    kit: 'Tripod essential. Filters provided.',
    short: 'Four Saturdays that start before the light does.',
    description:
      'We meet in the dark and walk out to the location, which is the only way to be set up when the light arrives. Long exposure, filtration, and the patience the whole thing depends on.',
    syllabus: [
      'Reading a forecast for light, not weather',
      'Neutral density and graduated filters',
      'Long exposure past thirty seconds',
      'Foreground: the thing most landscapes are missing',
      'Coming home with two frames instead of two hundred',
    ],
  },
  {
    slug: 'the-darkroom',
    code: 'AP-310',
    title: 'The Darkroom',
    level: 'advanced',
    format: 'darkroom',
    weeks: 10,
    hours: '4 hrs weekly, Monday evenings',
    price: 690,
    seats: 3,
    mentor: 'alex',
    kit: 'A film camera. Chemistry, paper and enlarger time included.',
    short: 'Developing, printing, and re-printing until the blacks hold.',
    description:
      'Ten weeks of wet printing on fibre paper. You will develop your own negatives, learn to dodge and burn with your hands, and print the same frame enough times to understand what a print actually is.',
    syllabus: [
      'Developing film — time, temperature, agitation',
      'Contact sheets and reading a negative',
      'Test strips and the first honest print',
      'Dodging and burning by hand',
      'Selenium toning and archival washing',
      'Editing a body of work for a wall',
    ],
  },
  {
    slug: 'street-and-consent',
    code: 'AP-240',
    title: 'Street and Consent',
    level: 'intermediate',
    format: 'field',
    weeks: 6,
    hours: '4 hrs weekly, Sunday afternoons',
    price: 400,
    seats: 5,
    mentor: 'emilia',
    kit: 'One camera, one lens. No zooms on this course.',
    short: 'Photographing strangers, and the ethics of it.',
    description:
      'Six weeks working in public with a single focal length. As much about when not to press the shutter as when to — we spend a full session on consent, the law, and what you owe the person in the frame.',
    syllabus: [
      'Working a scene instead of taking one frame',
      'Zone focusing and shooting without the viewfinder',
      'The law, and where courtesy goes further than the law',
      'Asking — and what changes when you do',
      'Sequencing a set that holds together',
    ],
  },
  {
    slug: 'large-format',
    code: 'AP-330',
    title: 'Large Format',
    level: 'advanced',
    format: 'field',
    weeks: 8,
    hours: '5 hrs weekly, Saturday mornings',
    price: 780,
    seats: 2,
    mentor: 'alex',
    kit: 'Cameras and film holders provided. Sheet film at cost.',
    short: 'Five by four, under a dark cloth, twelve frames a day.',
    description:
      'A camera that forces you to slow down to the point of discomfort. Movements, focusing on ground glass upside down, and the arithmetic of bellows extension. Twelve sheets is a productive day.',
    syllabus: [
      'Setting up and focusing on ground glass',
      'Rise, fall, tilt and swing — and what each fixes',
      'Bellows extension and reciprocity',
      'Loading holders in a changing bag',
      'Developing sheet film in trays',
    ],
  },
]

export const findCourse = (slug) => courses.find((c) => c.slug === slug)
export const findMentor = (id) => mentors.find((m) => m.id === id)

export const formatPrice = (value) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value)

/** Sonbahar dönemi başlangıçları — kayıt akışında seçilir. */
export const START_DATES = [
  { id: 'sep-15', label: '15 September' },
  { id: 'oct-13', label: '13 October' },
  { id: 'nov-10', label: '10 November' },
]
