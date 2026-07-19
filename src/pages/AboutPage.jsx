import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Eye, FileCheck2, Presentation, ScanLine } from 'lucide-react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import aboutImage from '../assets/images/about-blueprint-reality.png'

const statements = ['Transforming Blueprints Into Reality', 'Building Confidence Before Construction', 'Visualize Every Detail Before You Build', 'Where Vision Meets Visualization']
const benefits = [[ScanLine, 'Photorealistic 3D Models'], [Eye, 'Interactive Walkthroughs'], [FileCheck2, 'Architectural Visualization'], [Presentation, 'Investor Presentations'], [Check, 'Marketing Visuals'], [Check, 'Faster Project Approvals']]
const figures = [['8–12%', 'Average Cost Savings'], ['25–40%', 'Fewer Late Design Changes'], ['100%', 'Project Clarity'], ['50M+', 'Development Value Supported']]

export default function AboutPage() {
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    if (reducedMotion) return undefined
    const phrase = statements[index]
    const isComplete = typed.length === phrase.length
    const timer = setTimeout(() => {
      if (!deleting && !isComplete) setTyped((value) => value + phrase.charAt(value.length))
      else if (!deleting) setDeleting(true)
      else if (typed.length > 0) setTyped((value) => value.slice(0, -1))
      else { setDeleting(false); setIndex((value) => (value + 1) % statements.length) }
    }, isComplete && !deleting ? 1900 : deleting ? 30 : 52)
    return () => clearTimeout(timer)
  }, [deleting, index, reducedMotion, typed])

  return <section className="relative overflow-hidden py-20 lg:py-28"><div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20" /><Container className="relative"><div className="grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
    <motion.div initial={reducedMotion ? false : { opacity: 0, x: -24 }} animate={reducedMotion ? {} : { opacity: 1, x: 0 }} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}>
      <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">About BluePrint & Beyond</p>
      <h1 className="mt-4 min-h-[110px] text-4xl font-extrabold leading-[1.08] tracking-[-.055em] text-ink sm:min-h-[104px] sm:text-5xl"><span aria-label={statements[index]} className="font-['Playfair_Display'] font-semibold italic text-brand"><span aria-hidden="true">{reducedMotion ? statements[0] : typed}</span></span><span aria-hidden="true" className="typing-cursor ml-1 inline-block h-[.82em] w-[3px] rounded-full bg-brand align-[-.08em]" /></h1>
      <p className="mt-6 max-w-xl text-[15px] leading-7 text-slate-600">At BluePrint & Beyond 3D LLC, we help architects, developers, builders, and investors visualize every aspect of a project before construction begins. By transforming traditional plans into photorealistic 3D models, cinematic renderings, and immersive walkthroughs, we make complex ideas easier to understand, improve collaboration across teams, reduce costly design revisions, and support faster, more confident decision-making throughout the development process.</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">{benefits.map(([Icon, label], benefitIndex) => <motion.li key={label} initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={reducedMotion ? {} : { opacity: 1, y: 0 }} transition={{ delay: .25 + benefitIndex * .06, duration: .35 }} className="flex items-center gap-2.5 text-sm font-bold text-ink"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"><Icon size={14} strokeWidth={2.5} /></span>{label}</motion.li>)}</ul>
      <Button to="/contact" className="group mt-9">Learn More <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" /></Button>
    </motion.div>
    <motion.div initial={reducedMotion ? false : { opacity: 0, rotateY: -4, y: 22 }} animate={reducedMotion ? {} : { opacity: 1, rotateY: 0, y: 0 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }} className="relative [perspective:1200px]"><div className="absolute -inset-5 rounded-[2rem] bg-brand/10 blur-2xl" /><div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white p-2 shadow-2xl shadow-ink/15"><div className="relative overflow-hidden rounded-xl"><img src={aboutImage} alt="Technical blueprint transforming through a teal 3D wireframe into a completed modern villa" className="image-drift aspect-[16/10] w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-tr from-ink/25 via-transparent to-white/10" /><div className="absolute bottom-4 left-4 rounded-lg border border-white/30 bg-ink/80 px-3 py-2.5 text-white backdrop-blur"><p className="text-[9px] font-extrabold uppercase tracking-[.15em] text-brand">Visual sequence</p><p className="mt-1 text-xs font-bold">Blueprint → Wireframe → Reality</p></div><div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/50 bg-white/85 px-3 py-1.5 text-[10px] font-extrabold tracking-[.12em] text-ink backdrop-blur"><span className="live-pulse h-2 w-2 rounded-full bg-brand" />3D IN PROGRESS</div></div></div></motion.div>
  </div><div className="mt-12 grid overflow-hidden rounded-xl border border-cyan-100 bg-white/80 shadow-lg shadow-ink/5 sm:grid-cols-2 lg:grid-cols-4">{figures.map(([value, label], figureIndex) => <motion.div key={label} initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={reducedMotion ? {} : { opacity: 1, y: 0 }} transition={{ delay: .35 + figureIndex * .07, duration: .4 }} className="border-b border-cyan-100 p-6 text-center last:border-b-0 sm:[&:nth-child(2)]:border-l lg:border-b-0 lg:border-l lg:first:border-l-0"><p className="text-2xl font-extrabold text-brand">{value}</p><p className="mt-1 text-[11px] font-bold text-slate-600">{label}</p></motion.div>)}</div></Container></section>
}
