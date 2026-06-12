import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import CafeMap from './components/CafeMap'
import CommunityImpact from './components/CommunityImpact'
import About from './components/About'
import FAQ from './components/FAQ'
import Closing from './components/Closing'
import Footer from './components/Footer'

export default function App() {
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
