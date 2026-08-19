import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import CafeMap from './components/CafeMap'
import CommunityImpact from './components/CommunityImpact'
import About from './components/About'
import FAQ from './components/FAQ'
import Closing from './components/Closing'
import Footer from './components/Footer'
import CareGuide from './pages/CareGuide'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CafeNFCLanding from './pages/CafeNFCLanding'

function Landing() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const scroll = () => document.getElementById(id)?.scrollIntoView()
    // Wait a tick so the section is mounted after route change
    requestAnimationFrame(scroll)
  }, [location.pathname, location.hash])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <CafeMap />
        <CommunityImpact />
        <About />
        <FAQ />
        <Closing />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/cuidado" element={<CareGuide />} />
      <Route path="/privacidad" element={<PrivacyPolicy />} />
      <Route path="/r/:slug" element={<CafeNFCLanding />} />
    </Routes>
  )
}
