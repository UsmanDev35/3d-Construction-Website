import logo from '../../assets/Logo/logo-transparent.png'

export default function BrandMark({ light = false }) {
  return <span className={`inline-flex items-center ${light ? 'rounded-lg bg-white p-2 shadow-lg shadow-black/15' : ''}`}><img src={logo} alt="BluePrint & Beyond 3D LLC" className="h-14 w-auto max-w-[190px] object-contain object-left sm:h-16 sm:max-w-[220px]" /></span>
}
