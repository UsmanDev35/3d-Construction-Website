import { ClipboardList, FileImage, PenTool, Send, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '../common/Container'

const steps = [
  [ClipboardList, 'Consultation', 'We understand your vision, goals, audience, and development requirements.'],
  [FileImage, 'Receive Plans', 'Share your drawings, CAD files, references, or early concepts with our team.'],
  [Sparkles, '3D Creation', 'We build the model, materials, lighting, and visual story around your project.'],
  [PenTool, 'Review & Refine', 'You review the experience with us and we refine the details that matter.'],
  [Send, 'Final Delivery', 'Receive polished visuals ready for approvals, marketing, and confident decisions.'],
]

export default function Process() {
  const reducedMotion = useReducedMotion()
  return (
    <section id="process" aria-labelledby="process-title" className="relative overflow-hidden bg-[#032741] py-20 text-white lg:py-28">
      <div className="blueprint-grid absolute inset-0 opacity-20" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[.78fr_2.22fr] lg:gap-16">
          <div><p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">Our process</p><h2 id="process-title" className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-[-.05em] sm:text-5xl">Simple Process,<br />Powerful Results</h2><p className="mt-5 max-w-xs text-sm leading-7 text-slate-300">A clear, collaborative path from your first plan to a presentation-ready visualization.</p></div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map(([Icon, title, text], index) => <motion.li key={title} initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .09, duration: .5 }} className="group relative rounded-2xl border border-white/10 bg-white/[.04] p-5 transition duration-300 hover:-translate-y-2 hover:border-brand/60 hover:bg-white/[.08] hover:shadow-xl hover:shadow-brand/10"><span className="grid h-14 w-14 place-items-center rounded-2xl border border-brand/70 bg-brand/10 text-brand transition duration-300 group-hover:rotate-6 group-hover:bg-brand group-hover:text-white"><Icon size={26} /></span><h3 className="mt-6 text-base font-extrabold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{text}</p><span className="absolute bottom-0 left-5 h-0.5 w-10 bg-brand transition-all duration-300 group-hover:w-[calc(100%-2.5rem)]" /></motion.li>)}
          </ol>
        </div>
      </Container>
    </section>
  )
}
