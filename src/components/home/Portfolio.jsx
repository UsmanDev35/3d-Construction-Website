import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import Container from '../common/Container'
import Button from '../common/Button'
import SectionTitle from '../common/SectionTitle'
import Reveal from '../common/Reveal'
import heroImage from '../../assets/images/architectural-hero.png'
import towerImage from '../../assets/images/commercial-tower.png'
import interiorImage from '../../assets/images/luxury-interior.png'

const projects = [
  { title: 'Luxury Residential Villa', service: 'Exterior & Interior Visualization', image: heroImage, span: 'sm:col-span-2 sm:row-span-2', summary: 'A photorealistic villa story that makes architectural scale, light, materials, and lifestyle instantly understandable.' },
  { title: 'Commercial Tower', service: '3D Modeling & Walkthrough', image: towerImage, span: '', summary: 'A clear commercial visualization designed to support stakeholder review and confident investor presentations.' },
  { title: 'Skyline Penthouse', service: 'Interior Visualization', image: interiorImage, span: '', summary: 'An interior rendering study focused on atmosphere, premium finishes, and the view from every key space.' },
  { title: 'Modern Apartment Development', service: 'Exterior & Amenities', image: heroImage, span: 'sm:col-span-2', summary: 'A marketing-ready apartment story that communicates amenities, community experience, and future value.' },
]

function ProjectModal({ project, onClose }) {
  const closeButton = useRef(null)
  useEffect(() => { closeButton.current?.focus(); const closeOnEscape = (event) => { if (event.key === 'Escape') onClose() }; window.addEventListener('keydown', closeOnEscape); return () => window.removeEventListener('keydown', closeOnEscape) }, [onClose])
  return <motion.div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-ink/60 p-4 backdrop-blur-md"><motion.section role="dialog" aria-modal="true" aria-labelledby="home-project-title" initial={{ opacity: 0, scale: .92, y: 22 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .96, y: 14 }} transition={{ type: 'spring', stiffness: 220, damping: 22 }} className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl sm:grid-cols-2"><button ref={closeButton} type="button" onClick={onClose} aria-label="Close project details" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-ink/75 text-white transition hover:bg-brand focus-visible:ring-2 focus-visible:ring-brand"><X size={18} /></button><img src={project.image} alt={project.title} className="h-60 w-full object-cover sm:h-full" /><div className="p-7 sm:p-9"><p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">Selected project</p><h2 id="home-project-title" className="mt-3 text-3xl font-extrabold tracking-[-.045em] text-ink">{project.title}</h2><p className="mt-3 text-sm font-bold text-brand">{project.service}</p><p className="mt-5 text-sm leading-7 text-slate-600">{project.summary}</p><Button to="/contact" className="mt-7">Discuss a Similar Project <ArrowRight size={16} /></Button></div></motion.section></motion.div>
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null)
  return <section id="portfolio" className="py-16 lg:py-24"><Container><div className="grid gap-10 lg:grid-cols-[.68fr_1.32fr]"><Reveal><div><SectionTitle eyebrow="Our portfolio" title="Recent Visualization Projects" description="Explore how we help developers, architects, and investors turn ideas into successful realities." /><Button to="/portfolio" className="mt-8">View Full Portfolio <ArrowRight size={16} /></Button></div></Reveal><div className="grid auto-rows-[170px] gap-4 sm:grid-cols-3">{projects.map((project, index) => <Reveal key={project.title} delay={index * .08} className={project.span}><article className="group relative h-full overflow-hidden rounded-xl bg-slate-200"><img loading="lazy" src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent transition group-hover:from-ink/90" /><div className="absolute inset-x-5 bottom-5 translate-y-2 transition duration-300 group-hover:translate-y-0"><p className="text-sm font-extrabold text-white">{project.title}</p><p className="mt-1 text-xs text-white/75">{project.service}</p><button type="button" onClick={() => setSelectedProject(project)} className="mt-3 inline-flex min-h-8 items-center gap-1 text-xs font-bold text-brand opacity-0 outline-none transition group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-brand">View Project <ArrowRight size={13} /></button></div></article></Reveal>)}</div></div></Container><AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence></section>
}
