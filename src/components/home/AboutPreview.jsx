import { ArrowRight } from 'lucide-react'
import Button from '../common/Button'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import aboutImage from '../../assets/images/about-blueprint-reality.png'

export default function AboutPreview() {
  return <section id="about" className="py-16 lg:py-24"><Container><div className="grid items-center gap-10 lg:grid-cols-2"><div><SectionTitle eyebrow="About BluePrint & Beyond" title={<>From an idea on paper to a <span className="font-['Playfair_Display'] font-semibold italic text-brand">space you can experience.</span></>} description="We give real estate teams a clear, immersive way to understand, align, and refine a project before construction starts." /><Button to="/about" className="group mt-8">Discover our approach <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Button></div><div className="relative overflow-hidden rounded-2xl border border-cyan-100 bg-white p-2 shadow-xl shadow-ink/10"><img loading="lazy" src={aboutImage} alt="Blueprint transitioning into a photorealistic contemporary villa" className="aspect-[16/9] w-full rounded-xl object-cover" /></div></div></Container></section>
}
