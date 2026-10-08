import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Timeline from '../sections/Timeline'
import Tracks from '../sections/Tracks'
import Challenges from '../sections/Challenges'
import Prizes from '../sections/Prizes'
import Judges from '../sections/Judges'
import Sponsors from '../sections/Sponsors'
import FAQ from '../sections/FAQ'
import Registration from '../sections/Registration'
import Footer from '../sections/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Tracks />
        <Challenges />
        <Prizes />
        <Judges />
        <Sponsors />
        <FAQ />
        <Registration />
      </main>
      <Footer />
    </>
  )
}
