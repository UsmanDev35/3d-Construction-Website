import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { BadgeDollarSign, ClipboardCheck, Glasses, TrendingUp } from 'lucide-react'
import Container from '../common/Container'
const stats = [[BadgeDollarSign, 12, '%', 'Save on Overall', 'Development Costs'], [ClipboardCheck, 40, '%', 'Reduce Late-Stage', 'Design Changes'], [Glasses, null, '', 'Lower Costs', 'Through Virtual Testing'], [TrendingUp, null, '', 'Faster Sales', 'With Immersive Walkthroughs']]
function AnimatedNumber({ end, suffix }) {
  const node = useRef(null)
  const visible = useInView(node, { once: true, amount: .6 })
  const reducedMotion = useReducedMotion()
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!visible) return undefined
    if (reducedMotion) return undefined
    const start = performance.now()
    let frame
    const tick = (now) => { const progress = Math.min((now - start) / 1400, 1); setValue(Math.round(end * (1 - (1 - progress) ** 3))); if (progress < 1) frame = requestAnimationFrame(tick) }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [end, reducedMotion, visible])
  return <span ref={node}>{reducedMotion ? end : value}{suffix}</span>
}
export default function Stats() { return <section className="relative z-20 -mt-2 pb-16"><Container><div className="grid overflow-hidden rounded-xl border border-cyan-100 bg-white shadow-[0_12px_30px_rgba(6,34,56,.08)] sm:grid-cols-2 lg:grid-cols-4">{stats.map(([Icon, number, unit, title, note]) => <div key={title} className="flex gap-4 border-b border-cyan-100 p-6 last:border-b-0 sm:[&:nth-child(2)]:border-l lg:border-b-0 lg:border-l lg:first:border-l-0"><Icon className="mt-1 shrink-0 text-brand" size={31} strokeWidth={1.7} /><div><p className="text-xl font-extrabold text-brand">{number ? <AnimatedNumber end={number} suffix={unit} /> : title}</p><p className="mt-1 text-[11px] font-extrabold text-ink">{number ? <>{title}<br />{note}</> : note}</p></div></div>)}</div></Container></section> }
