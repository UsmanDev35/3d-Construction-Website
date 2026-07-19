import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import RouteErrorBoundary from '../components/common/RouteErrorBoundary'
import ScrollToTop from './ScrollToTop'

const HomePage = lazy(() => import('../pages/HomePage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const ServicesPage = lazy(() => import('../pages/ServicesPage'))
const PortfolioPage = lazy(() => import('../pages/PortfolioPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const TestimonialsPage = lazy(() => import('../pages/TestimonialsPage'))
const NotFound = lazy(() => import('../pages/NotFound'))

export default function AppRoutes() {
  return <BrowserRouter><ScrollToTop /><RouteErrorBoundary><Routes><Route element={<Layout />}><Route index element={<HomePage />} /><Route path="about" element={<AboutPage />} /><Route path="services" element={<ServicesPage />} /><Route path="portfolio" element={<PortfolioPage />} /><Route path="testimonials" element={<TestimonialsPage />} /><Route path="contact" element={<ContactPage />} /><Route path="*" element={<NotFound />} /></Route></Routes></RouteErrorBoundary></BrowserRouter>
}
