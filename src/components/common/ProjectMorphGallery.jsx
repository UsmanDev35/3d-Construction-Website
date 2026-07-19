import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import aboutImage from '../../assets/images/about-blueprint-reality.png'
import heroImage from '../../assets/images/architectural-hero.png'
import towerImage from '../../assets/images/commercial-tower.png'
import interiorImage from '../../assets/images/luxury-interior.png'
import villaImage from '../../assets/images/portfolio-villa.png'
import officeImage from '../../assets/images/portfolio-office.png'

const projects = [
  { image: aboutImage, title: 'Blueprint clarity', detail: 'Transform plans and drawings into a shared spatial reference before the project moves further.' },
  { image: heroImage, title: 'Exterior vision', detail: 'Test scale, architectural character, landscaping, and first impressions in a polished exterior story.' },
  { image: towerImage, title: 'Commercial context', detail: 'Help investors, tenants, and project teams understand the building’s presence and potential.' },
  { image: interiorImage, title: 'Interior experience', detail: 'Show materials, lighting, circulation, and atmosphere in the spaces people will actually use.' },
  { image: villaImage, title: 'Residential lifestyle', detail: 'Present the emotional value of a future home before buyers or stakeholders step onto site.' },
  { image: officeImage, title: 'Presentation ready', detail: 'Package the visual story for approvals, launches, investor conversations, and marketing.' },
]

export default function ProjectMorphGallery() {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef(null)
  const [phase, setPhase] = useState(0)
  const [selected, setSelected] = useState(null)
  const [width, setWidth] = useState(700)
  const currentPhase = reducedMotion ? 2 : phase
  const positions = useMemo(() => {
    const compact = width < 640
    const radiusX = compact ? 138 : 315
    const radiusY = compact ? 128 : 178
    const frames = 12
    return projects.map((_, index) => {
      const startingAngle = index * (Math.PI * 2 / projects.length) - Math.PI / 2
      return Array.from({ length: frames + 1 }, (_, frame) => {
        const angle = startingAngle + frame * (Math.PI * 2 / frames)
        return { x: Math.cos(angle) * radiusX, y: Math.sin(angle) * radiusY }
      })
    })
  }, [width])

  useEffect(() => {
    if (!containerRef.current) return undefined
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (reducedMotion) return undefined
    const line = setTimeout(() => setPhase(1), 500)
    const circle = setTimeout(() => setPhase(2), 1500)
    return () => { clearTimeout(line); clearTimeout(circle) }
  }, [reducedMotion])
  useEffect(() => {
    if (!selected) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selected])

  return <section aria-label="A continuously moving visual journey from blueprint to built environment" className="relative mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-[#f8fcfd] py-10 shadow-xl shadow-ink/5 sm:py-14"><div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20" /><div ref={containerRef} className="relative mx-auto flex min-h-[410px] max-w-5xl items-center justify-center overflow-hidden px-4 sm:min-h-[510px]"><div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-48 -translate-x-1/2 -translate-y-1/2 text-center sm:w-72"><motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: currentPhase === 2 ? 1 : 0, y: currentPhase === 2 ? 0 : 10 }} className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">One shared vision</motion.p><motion.h3 initial={{ opacity: 0 }} animate={{ opacity: currentPhase === 2 ? 1 : 0 }} transition={{ delay: .15 }} className="mt-3 text-2xl font-extrabold leading-tight tracking-[-.04em] text-ink sm:text-3xl">From plan to a place people can experience.</motion.h3></div>{projects.map((project, index) => { const lineX = (index - (projects.length - 1) / 2) * (width < 640 ? 45 : 95); const frames = positions[index]; const isCircle = currentPhase === 2; const target = currentPhase === 0 ? { x: 0, y: 0, opacity: 0, scale: .5 } : currentPhase === 1 ? { x: lineX, y: 0, opacity: 1, scale: .78 } : { x: frames.map((point) => point.x), y: frames.map((point) => point.y), opacity: 1, scale: 1 }; return <motion.button key={project.title} type="button" onClick={() => setSelected(project)} animate={target} transition={isCircle && !reducedMotion ? { x: { duration: 22, ease: 'linear', repeat: Infinity }, y: { duration: 22, ease: 'linear', repeat: Infinity }, opacity: { duration: .45 }, scale: { duration: .45 } } : { type: 'spring', stiffness: 65, damping: 17 }} className="group absolute left-1/2 top-1/2 h-20 w-14 -translate-x-1/2 -translate-y-1/2 overflow-visible outline-none focus-visible:z-20 focus-visible:ring-4 focus-visible:ring-brand/40 sm:h-32 sm:w-20"><span className="relative block h-full w-full overflow-hidden rounded-xl border border-white/90 bg-white shadow-xl transition duration-300 group-hover:scale-110 group-hover:shadow-2xl"><img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" /><span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" /><span className="absolute inset-x-1 bottom-2 text-center text-[7px] font-extrabold uppercase tracking-[.08em] text-white sm:text-[9px]">{project.title}</span></span></motion.button> })}</div><p className="relative px-6 text-center text-xs font-semibold tracking-[.08em] text-slate-500">SELECT A PROJECT CARD TO VIEW ITS VISUALIZATION STORY</p><AnimatePresence>{selected && <motion.div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null) }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-ink/55 p-4 backdrop-blur-md"><motion.article role="dialog" aria-modal="true" aria-labelledby="gallery-detail-title" initial={{ opacity: 0, scale: .9, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .96, y: 12 }} transition={{ type: 'spring', stiffness: 220, damping: 22 }} className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl sm:grid-cols-[.9fr_1.1fr]"><button type="button" onClick={() => setSelected(null)} aria-label="Close project details" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-ink/75 text-white transition hover:bg-brand"><X size={18} /></button><img src={selected.image} alt={selected.title} className="h-56 w-full object-cover sm:h-full" /><div className="p-7 sm:p-10"><p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">Visualization story</p><h3 id="gallery-detail-title" className="mt-3 text-3xl font-extrabold tracking-[-.045em] text-ink">{selected.title}</h3><p className="mt-5 text-sm leading-7 text-slate-600">{selected.detail}</p><a href="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-brand transition hover:text-ink">Discuss your project <ArrowUpRight size={16} /></a></div></motion.article></motion.div>}</AnimatePresence></section>
}
