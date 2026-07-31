import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Kayıt sepeti. Bir kursa yalnızca bir kez ve tek bir başlangıç tarihiyle
 * kaydolunur — adet kavramı yok, o yüzden ürün sepetinden farklı davranır.
 */
export const useEnrolment = create()(
  persist(
    (set, get) => ({
      places: [], // { slug, startDate }
      lastBooking: null,

      addPlace: (slug, startDate) =>
        set((state) => {
          const existing = state.places.find((p) => p.slug === slug)
          if (existing) {
            // Aynı kurs zaten seçiliyse yalnızca tarihi güncelle
            return {
              places: state.places.map((p) =>
                p.slug === slug ? { ...p, startDate } : p,
              ),
            }
          }
          return { places: [...state.places, { slug, startDate }] }
        }),

      removePlace: (slug) =>
        set((state) => ({ places: state.places.filter((p) => p.slug !== slug) })),

      setStartDate: (slug, startDate) =>
        set((state) => ({
          places: state.places.map((p) => (p.slug === slug ? { ...p, startDate } : p)),
        })),

      isHeld: (slug) => get().places.some((p) => p.slug === slug),

      clear: () => set({ places: [] }),

      confirm: (details, totals) =>
        set({ places: [], lastBooking: { details, totals, ref: makeRef() } }),
    }),
    { name: 'aperture-enrolment' },
  ),
)

const makeRef = () => 'AP' + Math.random().toString(36).slice(2, 7).toUpperCase()

/** %10 erken kayıt indirimi iki ve üzeri kursta uygulanır. */
export function buildBooking(places, courses) {
  const lines = places
    .map((place) => {
      const course = courses.find((c) => c.slug === place.slug)
      return course ? { ...course, startDate: place.startDate } : null
    })
    .filter(Boolean)

  const subtotal = lines.reduce((sum, l) => sum + l.price, 0)
  const discount = lines.length >= 2 ? Math.round(subtotal * 0.1) : 0

  return { lines, subtotal, discount, total: subtotal - discount }
}
