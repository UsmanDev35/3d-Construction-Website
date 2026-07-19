import { ArrowRight, Box, Clapperboard, Compass, Image, Lightbulb, MonitorPlay } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import aboutImage from '../assets/images/about-blueprint-reality.png'
import heroImage from '../assets/images/architectural-hero.png'
import towerImage from '../assets/images/commercial-tower.png'
import interiorImage from '../assets/images/luxury-interior.png'
import serviceImageOne from '../assets/images/service1image (1).png'
import serviceImageTwo from '../assets/images/service1image (2).png'

const services = [
  [Box, '01', 'Architectural 3D Modelling', 'We convert technical drawings, CAD files, and architectural plans into highly accurate three-dimensional digital models that allow teams to understand every structural detail before construction begins.', aboutImage],
  [Lightbulb, '02', 'Photorealistic Rendering', 'Our high-end rendering process creates realistic images with refined lighting, materials, reflections, landscaping, and environmental detail—long before the project is built.', heroImage],
  [Image, '03', 'Interior & Exterior Visualization', 'Experience every interior and exterior space before construction. We reveal layouts, materials, furniture, natural lighting, and landscaping with exceptional realism.', interiorImage],
  [Clapperboard, '04', 'Virtual Walkthroughs', 'Cinematic walkthrough animations help clients, investors, and stakeholders understand every space before it is built, speeding approvals and building buyer confidence.', serviceImageOne],
  [MonitorPlay, '05', 'Real Estate Marketing Visuals', 'Premium visual assets for websites, social media, investor presentations, and property launches that help developers generate stronger buyer engagement before completion.', serviceImageTwo],
  [Compass, '06', 'Design Review & Visualization Consulting', 'We work alongside project teams to identify design issues early through realistic visualisation, reducing costly revisions and minimizing construction risk.', towerImage],
]

function ServiceCard({ service, index }) {
  const reducedMotion = useReducedMotion()
  const [Icon, number, title, description, image] = service
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-.5, .5], [1.5, -1.5]), { damping: 24, stiffness: 150 })
  const rotateY = useSpring(useTransform(pointerX, [-.5, .5], [-1.5, 1.5]), { damping: 24, stiffness: 150 })
  const trackPointer = (event) => { const rect = event.currentTarget.getBoundingClientRect(); pointerX.set((event.clientX - rect.left) / rect.width - .5); pointerY.set((event.clientY - rect.top) / rect.height - .5) }
  const resetPointer = () => { pointerX.set(0); pointerY.set(0) }
  return <motion.article onMouseMove={reducedMotion ? undefined : trackPointer} onMouseLeave={resetPointer} style={reducedMotion ? {} : { rotateX, rotateY, transformPerspective: 1000 }} initial={reducedMotion ? false : { opacity: 0, y: 60, scale: .9 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .12 }} transition={{ delay: index * .12, duration: .65, ease: [0.22, 1, 0.36, 1] }} className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-lg shadow-ink/[.07] backdrop-blur transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand/15">
    <div className="relative aspect-[16/9] overflow-hidden"><img loading="lazy" src={image} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><img loading="lazy" src={aboutImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen transition duration-700 group-hover:scale-105 group-hover:opacity-0" /><div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" /><div className="absolute bottom-4 left-5 flex items-center gap-2 text-white"><span className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 bg-brand/85 backdrop-blur"><Icon size={18} /></span><span className="text-[10px] font-extrabold tracking-[.16em]">SERVICE {number}</span></div><div className="absolute right-4 top-4 rounded-full border border-white/30 bg-ink/60 px-2.5 py-1 text-[9px] font-extrabold tracking-[.12em] text-white opacity-0 backdrop-blur transition group-hover:opacity-100">BLUEPRINT → REALITY</div></div>
    <div className="relative p-7"><span className="absolute left-0 top-7 h-8 w-0.5 bg-brand transition-all duration-300 group-hover:h-14" /><h2 className="text-xl font-extrabold tracking-[-.035em] text-ink">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p><a href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-brand outline-none transition hover:text-ink focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">Explore More <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" /></a></div>
  </motion.article>
}

export default function ServicesPage() {
  const reducedMotion = useReducedMotion()
  const heading = "Visualizing Tomorrow's Buildings Before They Exist".split(' ')
  return <div className="relative overflow-hidden"><div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20" /><section className="relative py-20 text-center lg:py-28"><Container><motion.p initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={reducedMotion ? {} : { opacity: 1, y: 0 }} className="text-xs font-extrabold uppercase tracking-[.18em] text-brand">Architectural visualization services</motion.p><h1 className="mx-auto mt-5 max-w-5xl text-4xl font-extrabold leading-[1.08] tracking-[-.055em] text-ink sm:text-6xl">{heading.map((word, index) => <motion.span key={`${word}-${index}`} initial={reducedMotion ? false : { opacity: 0, y: 22 }} animate={reducedMotion ? {} : { opacity: 1, y: 0 }} transition={{ delay: .12 + index * .07, duration: .45 }} className="mr-[.24em] inline-block last:mr-0">{word}</motion.span>)}</h1><motion.p initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={reducedMotion ? {} : { opacity: 1, y: 0 }} transition={{ delay: .55, duration: .55 }} className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600">We transform architectural concepts into immersive 3D experiences that improve planning, reduce risk, and help developers, architects, builders, and investors make confident decisions before construction begins.</motion.p></Container></section>
    <section className="relative pb-20 lg:pb-28"><Container><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{services.map((service, index) => <ServiceCard key={service[2]} service={service} index={index} />)}</div></Container></section>
    <section className="relative border-y border-cyan-100 bg-ink py-20 text-center text-white"><div className="blueprint-grid absolute inset-0 opacity-20" /><Container className="relative"><motion.p initial={reducedMotion ? false : { opacity: 0, y: 14 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">Start with clarity</motion.p><motion.h2 initial={reducedMotion ? false : { opacity: 0, y: 18 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .08 }} className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-[-.05em] sm:text-5xl">Ready To Bring Your Vision To Life?</motion.h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300">Whether you’re planning a luxury residence, commercial development, or large-scale real estate project, our visualization solutions help you move forward with confidence before construction begins.</p><Button to="/contact" className="mt-8 shadow-brand/30">Book Your Consultation <ArrowRight size={16} /></Button></Container></section>
  </div>
}
