import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Box, Building2, Check, Clapperboard, Layers3, X } from 'lucide-react'
import Button from '../common/Button'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import heroImage from '../../assets/images/architectural-hero.png'
import towerImage from '../../assets/images/commercial-tower.png'
import interiorImage from '../../assets/images/luxury-interior.png'

const services = [
  {
    icon: Box,
    title: '3D Modeling',
    copy: 'Accurate and detailed 3D models that bring your architectural plans to life.',
    image: heroImage,
    detail: 'We translate technical drawings and early concepts into an accurate digital model your entire team can understand before construction begins.',
    benefits: ['Clear structural understanding', 'Earlier design coordination', 'Fewer interpretation gaps'],
  },
  {
    icon: Layers3,
    title: 'Rendering',
    copy: 'High-quality photorealistic renders that showcase your project beautifully.',
    image: towerImage,
    detail: 'Our photorealistic renders combine light, materials, landscape, and environmental detail to make the future project feel tangible.',
    benefits: ['Investor-ready presentation', 'Material and lighting testing', 'Stronger buyer confidence'],
  },
  {
    icon: Clapperboard,
    title: 'Walkthroughs',
    copy: 'Immersive 3D walkthroughs that help stakeholders experience the space.',
    image: interiorImage,
    detail: 'Cinematic virtual walkthroughs bring each room and route to life, making complex spaces easy to experience from any perspective.',
    benefits: ['Shared project clarity', 'Faster approvals', 'Powerful sales storytelling'],
  },
  {
    icon: Building2,
    title: 'Virtual Testing',
    copy: 'Test materials, layouts, lighting, and ideas before investing in physical mock-ups.',
    image: heroImage,
    detail: 'Explore design choices virtually before they become expensive physical decisions, from finish selections to spatial layout.',
    benefits: ['Lower mock-up costs', 'Confident design choices', 'Reduced late revisions'],
  },
]

function ServiceCard({ service, index, onOpen }) {
  const reducedMotion = useReducedMotion()
  const { icon: Icon, title, copy, image } = service
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [2, -2]), { damping: 24, stiffness: 150 })
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-2, 2]), { damping: 24, stiffness: 150 })
  const imageX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5, 5]), { damping: 24, stiffness: 150 })
  const imageY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-5, 5]), { damping: 24, stiffness: 150 })

  function move(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.article
      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-[#fbfdfe] shadow-sm transition-colors duration-300 hover:border-brand/70 hover:shadow-2xl hover:shadow-brand/15"
      initial={reducedMotion ? false : { opacity: 0, y: 60, scale: 0.9, rotate: 3, filter: 'blur(12px)' }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
      whileHover={reducedMotion ? {} : { y: -10 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={reducedMotion ? {} : { rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={reducedMotion ? undefined : move}
      onMouseLeave={() => { pointerX.set(0); pointerY.set(0) }}
    >
      <button type="button" aria-label={`Open ${title} presentation`} onClick={() => onOpen(service)} className="absolute inset-0 z-20 rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/50" />
      <div className="relative h-44 overflow-hidden">
        <motion.img loading="lazy" src={image} alt={`${title} architectural visualization`} className="h-full w-full scale-105 object-cover transition duration-700 group-hover:scale-[1.08]" style={reducedMotion ? {} : { x: imageX, y: imageY }} />
        <div className="blueprint-grid absolute inset-0 bg-brand/25 opacity-0 mix-blend-multiply transition duration-500 group-hover:opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 grid h-11 w-11 place-items-center rounded-lg border border-white/20 bg-brand/90 text-white shadow-lg shadow-brand/20 backdrop-blur transition duration-300 group-hover:rotate-[20deg] group-hover:shadow-brand/70"><Icon size={21} /></div>
        <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-ink/65 px-2.5 py-1 text-[9px] font-extrabold tracking-[.12em] text-white opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">VIEW EXPERIENCE</span>
      </div>
      <div className="relative p-6">
        <h3 className="text-lg font-extrabold text-ink">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
        <p className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.12em] text-brand">Explore service <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></p>
        <span className="absolute bottom-0 left-0 h-1 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
      </div>
    </motion.article>
  )
}

function ServicePresentation({ service, onClose }) {
  const closeButton = useRef(null)

  useEffect(() => {
    closeButton.current?.focus()
    function handleKeyDown(event) { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/45 p-4 backdrop-blur-md sm:p-6"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-presentation-title"
        className="relative max-h-[90dvh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/70 bg-white shadow-2xl shadow-ink/30"
        initial={{ opacity: 0, scale: 0.9, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 18 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <button ref={closeButton} type="button" onClick={onClose} className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-ink/70 text-white shadow-lg backdrop-blur transition hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2" aria-label="Close service details"><X size={19} /></button>
        <div className="grid lg:grid-cols-[.92fr_1.08fr]">
          <div className="relative min-h-72 overflow-hidden lg:min-h-[540px]">
            <img src={service.image} alt={`${service.title} visualization`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <div className="blueprint-grid absolute inset-0 opacity-35" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">BluePrint & Beyond 3D</p>
              <p className="mt-2 text-2xl font-extrabold leading-tight">Designed to make the next decision clearer.</p>
            </div>
          </div>
          <div className="p-7 sm:p-10">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-xs font-extrabold uppercase tracking-[.18em] text-brand">Service overview</motion.p>
            <motion.h2 id="service-presentation-title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }} className="mt-3 text-4xl font-extrabold tracking-[-.05em] text-ink sm:text-5xl">{service.title}<span className="text-brand">.</span></motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="mt-5 max-w-xl text-sm leading-7 text-slate-600">{service.detail}</motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.27 }} className="mt-7 grid gap-5 border-y border-slate-100 py-6 sm:grid-cols-2">
              <div><h3 className="text-sm font-extrabold text-ink">Key benefits</h3><ul className="mt-3 space-y-2.5">{service.benefits.map((benefit) => <li key={benefit} className="flex gap-2 text-sm text-slate-600"><Check size={16} className="mt-0.5 shrink-0 text-brand" />{benefit}</li>)}</ul></div>
              <dl className="space-y-3 text-xs"><div><dt className="font-extrabold uppercase tracking-[.13em] text-slate-400">Software</dt><dd className="mt-1 font-semibold leading-5 text-ink">3ds Max · Corona Renderer · Lumion · Unreal Engine</dd></div><div><dt className="font-extrabold uppercase tracking-[.13em] text-slate-400">Typical timeline</dt><dd className="mt-1 font-semibold text-ink">2–4 weeks</dd></div></dl>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} className="mt-7 flex flex-wrap gap-3"><Button to="/contact">Book Consultation <ArrowRight size={16} /></Button><button type="button" onClick={onClose} className="rounded-md border border-slate-200 px-5 py-3 text-sm font-bold text-ink transition hover:border-brand hover:text-brand">Close details</button></motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}

export default function Services() {
  const [selected, setSelected] = useState(null)
  return (
    <section id="services" className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-15" />
      <div className="stage-scan pointer-events-none absolute left-[10%] top-20 h-20 w-[55%] opacity-30" />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionTitle eyebrow="What we do" title={<>3D Visualization Solutions<br />That Drive Better Decisions</>} />
          <p className="max-w-md text-sm leading-6 text-slate-600">We transform concepts into realistic 3D experiences that help you plan better, communicate clearly, and build successfully.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} onOpen={setSelected} />)}
        </div>
      </Container>
      <AnimatePresence>{selected && <ServicePresentation service={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  )
}
