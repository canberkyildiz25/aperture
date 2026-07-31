import { useMemo, useState } from 'react'

/**
 * İmza öğe: pozlama üçgeni.
 *
 * Üç ayarın da görüntüye ne yaptığını aynı anda gösterir:
 *   diyafram  → arka plan bulanıklığı ve bokeh dairelerinin çapı
 *   enstantane → hareket bulanıklığı
 *   ISO        → gren
 * Üçü birlikte pozlamayı belirler; toplam sapma ekranda karşılık buluyor.
 *
 * Sahne fotoğraf değil, CSS katmanları: arkadaki ışık noktaları gerçek
 * diyafram davranışına göre büyüyüp yumuşuyor, ön plandaki özne net kalıyor.
 */

const APERTURES = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16]
const SHUTTERS = [1000, 500, 250, 125, 60, 30, 15, 8]
const ISOS = [100, 200, 400, 800, 1600, 3200, 6400]

// Doğru pozlanmış kabul edilen referans: f/5.6 · 1/125 · ISO 400
const BASE = { aperture: 4, shutter: 3, iso: 2 }

const BOKEH = [
  { x: 12, y: 22, size: 1.0 },
  { x: 28, y: 12, size: 0.7 },
  { x: 44, y: 30, size: 1.3 },
  { x: 62, y: 16, size: 0.9 },
  { x: 78, y: 34, size: 1.1 },
  { x: 88, y: 20, size: 0.75 },
  { x: 20, y: 48, size: 0.85 },
  { x: 54, y: 52, size: 1.15 },
  { x: 72, y: 60, size: 0.8 },
  { x: 36, y: 68, size: 1.0 },
]

export default function ExposureSimulator() {
  const [ap, setAp] = useState(BASE.aperture)
  const [sh, setSh] = useState(BASE.shutter)
  const [iso, setIso] = useState(BASE.iso)

  const aperture = APERTURES[ap]
  const shutter = SHUTTERS[sh]
  const isoValue = ISOS[iso]

  // Her kademe bir "stop". Referanstan sapmaların toplamı pozlamayı verir.
  const stops = useMemo(() => {
    const fromAperture = BASE.aperture - ap // küçük f = daha çok ışık
    const fromShutter = BASE.shutter - sh // yavaş perde = daha çok ışık
    const fromIso = iso - BASE.iso // yüksek ISO = daha çok ışık
    return fromAperture + fromShutter + fromIso
  }, [ap, sh, iso])

  // Görsel karşılıklar
  const backgroundBlur = Math.max(0, (7 - ap) * 2.4) // f/1.4 → ~13px, f/16 → 0
  const bokehScale = Math.max(0.35, (8 - ap) / 4.5)
  const motionBlur = Math.max(0, (sh - 3) * 1.5) // yavaş perde → yatay bulanıklık
  const grain = Math.min(0.5, iso * 0.075) // ISO 6400 → belirgin gren
  const brightness = 1 + stops * 0.17
  const contrast = 1 - Math.min(0.35, Math.abs(stops) * 0.05)

  const verdict =
    stops > 1.5 ? 'over' : stops < -1.5 ? 'under' : 'ok'

  const reset = () => {
    setAp(BASE.aperture)
    setSh(BASE.shutter)
    setIso(BASE.iso)
  }

  return (
    <section className="py-20 md:py-28 bg-ink-900 border-y border-ink-700" id="simulator">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="exif text-selenium-400 mb-4">BEFORE YOU BOOK</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              Move the triangle
            </h2>
            <p className="text-silver-400 leading-relaxed">
              Three settings, one exposure. Change any of them and the other two have to
              give something back. This is the whole of week one — you may as well find
              out now whether it interests you.
            </p>
          </div>

          <button onClick={reset} className="btn-outline shrink-0 !py-2.5 !px-5 !text-xs">
            Reset to f/5.6 · 1/125 · 400
          </button>
        </div>

        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-12 items-start">
          {/* Vizör */}
          <div>
            <div
              className="relative aspect-[4/3] overflow-hidden bg-ink-950 border border-ink-700"
              style={{ filter: `brightness(${brightness}) contrast(${contrast})` }}
            >
              {/* Arka plan: ışık noktaları — diyaframla büyüyüp yumuşuyor */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{ filter: `blur(${backgroundBlur}px)` }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(160deg, #1B1B2E 0%, #2A2036 45%, #3A2338 100%)',
                  }}
                />
                {BOKEH.map((light, i) => (
                  <span
                    key={i}
                    className="absolute rounded-full transition-all duration-500"
                    style={{
                      left: `${light.x}%`,
                      top: `${light.y}%`,
                      width: `${light.size * bokehScale * 4.5}rem`,
                      height: `${light.size * bokehScale * 4.5}rem`,
                      transform: 'translate(-50%, -50%)',
                      background: `radial-gradient(circle, rgba(255,214,170,${
                        0.5 / Math.max(1, bokehScale)
                      }) 0%, rgba(255,190,140,${0.2 / Math.max(1, bokehScale)}) 55%, transparent 70%)`,
                    }}
                  />
                ))}
              </div>

              {/* Özne: odakta kalır, yalnızca perde hızından etkilenir */}
              <img
                src="/img/hero-img.png"
                alt="A photographer holding a film camera"
                className="absolute bottom-0 left-1/2 h-[92%] w-auto object-contain transition-all duration-500"
                style={{
                  transform: 'translateX(-50%)',
                  filter: motionBlur > 0 ? `blur(${motionBlur * 0.35}px)` : 'none',
                }}
              />

              {/* Gren — ISO yükseldikçe */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-500"
                style={{
                  opacity: grain,
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />

              {/* Vizör künyesi */}
              <div className="absolute top-0 inset-x-0 flex justify-between p-3 font-mono text-[0.65rem] tracking-widest text-paper-50/80 pointer-events-none">
                <span>f/{aperture}</span>
                <span>1/{shutter}</span>
                <span>ISO {isoValue}</span>
              </div>

              {/* Pozlama cetveli */}
              <div className="absolute bottom-0 inset-x-0 p-3 pointer-events-none">
                <div className="flex items-center justify-center gap-1">
                  {[-3, -2, -1, 0, 1, 2, 3].map((mark) => {
                    const active = Math.round(stops) === mark
                    return (
                      <span
                        key={mark}
                        className={`h-2.5 transition-all duration-300 ${
                          mark === 0 ? 'w-px h-3.5' : 'w-px'
                        } ${
                          active
                            ? verdict === 'ok'
                              ? 'bg-paper-50'
                              : 'bg-safelight-500'
                            : 'bg-paper-50/30'
                        }`}
                      />
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Okuma */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="exif">
                {stops > 0 ? '+' : ''}
                {stops.toFixed(0)} STOP{Math.abs(stops) === 1 ? '' : 'S'}
              </p>
              <p
                className={`text-sm ${
                  verdict === 'ok' ? 'text-silver-400' : 'text-safelight-500'
                }`}
              >
                {verdict === 'ok' && 'Correctly exposed'}
                {verdict === 'over' && 'Overexposed — the highlights are gone'}
                {verdict === 'under' && 'Underexposed — nothing in the shadows'}
              </p>
            </div>
          </div>

          {/* Denetimler */}
          <div className="space-y-8">
            <Dial
              label="Aperture"
              value={`f/${aperture}`}
              hint={
                ap <= 2
                  ? 'Wide open — the background falls away'
                  : ap >= 6
                    ? 'Stopped down — everything sharp front to back'
                    : 'A working middle'
              }
              min={0}
              max={APERTURES.length - 1}
              current={ap}
              onChange={setAp}
              scale={APERTURES.map((a) => `f/${a}`)}
            />

            <Dial
              label="Shutter"
              value={`1/${shutter}`}
              hint={
                sh <= 1
                  ? 'Fast enough to freeze movement'
                  : sh >= 5
                    ? 'Slow — anything moving will smear'
                    : 'Safe for a steady hand'
              }
              min={0}
              max={SHUTTERS.length - 1}
              current={sh}
              onChange={setSh}
              scale={SHUTTERS.map((s) => `1/${s}`)}
            />

            <Dial
              label="ISO"
              value={String(isoValue)}
              hint={
                iso <= 1
                  ? 'Clean, but you need light'
                  : iso >= 4
                    ? 'Grain you can see — sometimes worth it'
                    : 'Comfortable indoors'
              }
              min={0}
              max={ISOS.length - 1}
              current={iso}
              onChange={setIso}
              scale={ISOS.map(String)}
            />

            <div className="rule-hair pt-6">
              <p className="text-sm text-silver-500 leading-relaxed">
                Every step you take on one dial costs you a step on another. That trade
                is the entire craft, and it is what the first course spends eight weeks
                making automatic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Dial({ label, value, hint, min, max, current, onChange, scale }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label htmlFor={`dial-${label}`} className="exif">
          {label}
        </label>
        <span className="font-mono text-2xl text-paper-50">{value}</span>
      </div>

      <input
        id={`dial-${label}`}
        type="range"
        min={min}
        max={max}
        step={1}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="dial"
        aria-valuetext={value}
      />

      <div className="flex justify-between mt-2">
        {scale.map((mark, i) => (
          <span
            key={mark}
            className={`font-mono text-[0.6rem] transition-colors ${
              i === current ? 'text-selenium-400' : 'text-ink-600'
            }`}
          >
            {i === 0 || i === scale.length - 1 || i === current ? mark : '·'}
          </span>
        ))}
      </div>

      <p className="text-xs text-silver-500 mt-2.5">{hint}</p>
    </div>
  )
}
