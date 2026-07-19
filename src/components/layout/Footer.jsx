import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '../common/Container'
import BrandMark from '../common/BrandMark'

export default function Footer() {
  return (
    <footer className="bg-[#031c2e] py-14 text-slate-300">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div><BrandMark light /><p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">We help real estate professionals visualize what is possible—before construction begins.</p></div>
          <div><h3 className="text-sm font-bold text-white">Quick Links</h3><nav aria-label="Footer navigation" className="mt-4 grid gap-2 text-sm"><Link to="/services">Services</Link><Link to="/portfolio">Portfolio</Link><Link to="/#testimonials">Testimonials</Link><Link to="/about">About Us</Link></nav></div>
          <div><h3 className="text-sm font-bold text-white">Our Services</h3><div className="mt-4 grid gap-2 text-sm"><span>3D Modelling</span><span>Photorealistic Rendering</span><span>Virtual Walkthroughs</span></div></div>
          <div><h3 className="text-sm font-bold text-white">Start a conversation</h3><p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">Tell us about your next development and receive a tailored visualization plan.</p><Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand transition hover:text-white">Book a consultation <ArrowRight size={15} /></Link></div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} BluePrint & Beyond 3D LLC. All rights reserved.</p><p>Privacy Policy · Terms & Conditions</p></div>
      </Container>
    </footer>
  )
}
