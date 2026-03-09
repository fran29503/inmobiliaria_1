import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Vision from "@/components/Vision"
import Properties from "@/components/Properties"
import Features from "@/components/Features"
import VideoSection from "@/components/VideoSection"
import About from "@/components/About"
import Testimonials from "@/components/Testimonials"
import Blog from "@/components/Blog"
import FAQ from "@/components/FAQ"
import CTA from "@/components/CTA"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Vision />
      <Properties />
      <Features />
      <VideoSection />
      <About />
      <Testimonials />
      <Blog />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}
