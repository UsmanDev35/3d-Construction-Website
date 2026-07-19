import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import aboutImage from '../../assets/images/about-blueprint-reality.png'
import heroImage from '../../assets/images/architectural-hero.png'
import towerImage from '../../assets/images/commercial-tower.png'
import interiorImage from '../../assets/images/luxury-interior.png'
import villaImage from '../../assets/images/portfolio-villa.png'
import officeImage from '../../assets/images/portfolio-office.png'
import apartmentImage from '../../assets/images/portfolio-apartment.png'
import hotelImage from '../../assets/images/portfolio-hotel.png'

const projects = [
  [aboutImage, 'Blueprint'], [heroImage, 'Exterior'], [towerImage, 'Commercial'], [interiorImage, 'Interior'],
  [villaImage, 'Villa'], [officeImage, 'Office'], [apartmentImage, 'Apartment'], [hotelImage, 'Hospitality'],
]

export default function ProjectMorphGallery() {
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState(0)
  const [active, setActive] = useState(null)
  const currentPhase = reducedMotion ? 2 : phase
  const positions = useMemo(() => projects.map((_, index) => {
    const angle = (index / projects.length) * Math.PI * 2 - Math.PI / 2
    return { orbitX: Math.cos(angle) * 210, orbitY: Math.sin(angle) * 130, rotation: angle * (180 / Math.PI) + 90 }
  }), [])
  useEffect(() => {
    if (reducedMotion) return undefined
    const line = setTimeout(() => setPhase(1), 600)
    const orbit = setTimeout(() => setPhase(2), 1800)
    return () => { clearTimeout(line); clearTimeout(orbit) }
  }, [reducedMotion])

  return <section aria-label="A visual journey from blueprint to built environment" className="relative mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-[#f8fcfd] py-12 shadow-xl shadow-ink/5 sm:py-16"><div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20" /><div className="relative mx-auto flex min-h-[390px] max-w-5xl items-center justify-center overflow-hidden px-4 sm:min-h-[440px]"><motion.div animate={currentPhase === 2 && !reducedMotion ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 38, ease: 'linear', repeat: Infinity }} className="relative h-[330px] w-[min(92vw,700px)]"><div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-52 -translate-x-1/2 -translate-y-1/2 text-center sm:w-64"><motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: currentPhase === 2 ? 1 : 0, y: currentPhase === 2 ? 0 : 10 }} className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">One shared vision</motion.p><motion.h3 initial={{ opacity: 0 }} animate={{ opacity: currentPhase === 2 ? 1 : 0 }} transition={{ delay: .15 }} className="mt-3 text-2xl font-extrabold leading-tight tracking-[-.04em] text-ink sm:text-3xl">From plan to a place people can experience.</motion.h3></div>{projects.map(([image, label], index) => { const position = positions[index]; const scatterX = ((index * 97) % 420) - 210; const scatterY = ((index * 59) % 250) - 125; const lineX = (index - (projects.length - 1) / 2) * 78; const target = currentPhase === 0 ? { x: scatterX, y: scatterY, rotate: index % 2 ? -20 : 20, scale: .72, opacity: 0 } : currentPhase === 1 ? { x: lineX, y: 0, rotate: 0, scale: .85, opacity: 1 } : { x: position.orbitX, y: position.orbitY, rotate: position.rotation, scale: 1, opacity: 1 }; return <motion.button key={label} type="button" onClick={() => setActive(active === index ? null : index)} animate={target} transition={{ type: 'spring', stiffness: 55, damping: 16 }} className="group absolute left-1/2 top-1/2 h-24 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer [transform-style:preserve-3d] focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 sm:h-32 sm:w-20"><motion.span animate={{ rotateY: active === index ? 180 : 0 }} transition={{ type: 'spring', stiffness: 240, damping: 18 }} className="relative block h-full w-full [transform-style:preserve-3d]"><span className="absolute inset-0 overflow-hidden rounded-xl border border-white/80 bg-white shadow-xl [backface-visibility:hidden]"><img src={image} alt={`${label} project visualization`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" /></span><span className="absolute inset-0 grid place-items-center rounded-xl border border-brand/30 bg-ink p-2 text-center text-[9px] font-extrabold uppercase tracking-[.12em] text-brand [backface-visibility:hidden] [transform:rotateY(180deg)]">{label}<br /><span className="mt-1 block text-[8px] text-white">Explore</span></span></motion.span></motion.button> })}</motion.div></div><p className="relative px-6 text-center text-xs font-semibold tracking-[.08em] text-slate-500">SELECT A CARD TO REVEAL ITS PLACE IN THE PROJECT STORY</p></section>
}
