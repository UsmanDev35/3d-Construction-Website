import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import Container from '../common/Container'
import Button from '../common/Button'
import BrandMark from '../common/BrandMark'
import { NAV_ITEMS } from '../../utils/constants'

export default function Header() {
  const [open, setOpen] = useState(false)
  const linkStyle = 'group relative py-2 transition hover:text-brand after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100'
  const hint = <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-[9px] font-bold text-white opacity-0 shadow-lg transition duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100">Explore</span>
  const links = NAV_ITEMS.map((item) => item.to.includes('#')
    ? <a key={item.to} onClick={() => setOpen(false)} href={item.to} className={linkStyle}>{hint}{item.label}</a>
    : <NavLink key={item.to} onClick={() => setOpen(false)} to={item.to} className={({ isActive }) => `${linkStyle} ${isActive ? 'text-brand after:scale-x-100' : ''}`}>{hint}{item.label}</NavLink>)
  return <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl"><Container className="flex h-[76px] items-center justify-between gap-6">
    <NavLink to="/" aria-label="BluePrint & Beyond home"><BrandMark /></NavLink>
    <nav aria-label="Main navigation" className="hidden items-center gap-6 text-[11px] font-extrabold text-ink xl:flex">{links}</nav>
    <Button to="/contact" className="hidden px-4 py-2.5 text-[11px] lg:inline-flex">Book a Consultation <ArrowUpRight size={14} /></Button>
    <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 xl:hidden">{open ? <X size={19} /> : <Menu size={19} />}</button>
  </Container>{open && <div className="border-t border-slate-200 bg-white xl:hidden"><Container className="flex flex-col gap-5 py-6 text-sm font-bold">{links}<Button to="/contact" className="w-full">Book a Consultation</Button></Container></div>}</header>
}
