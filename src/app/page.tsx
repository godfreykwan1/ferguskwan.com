import Nav         from '@/components/sections/Nav'
import HeroElegant from '@/components/sections/HeroElegant'
import About        from '@/components/sections/About'
import Services     from '@/components/sections/Services'
import Listen       from '@/components/sections/Listen'
import Contact      from '@/components/sections/Contact'
import Footer       from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroElegant variant="b5" />
      <About />
      <Services />
      <Listen />
      <Contact />
      <Footer />
    </main>
  )
}
