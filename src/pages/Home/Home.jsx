import React from 'react'
import Hero from '../../components/CupcpHome/Hero'
import About from '../../components/CupcpHome/About'
import Cards from '../../components/CupcpHome/Cards'

const Home = () => {
  return (
    <div>
        <main>
        {/* Hero component for the landing page introduction */}
        <Hero />

        {/* About section to describe the organization or project */}
        <About />

        {/* Cards section that displays mission, vision, and values in card layout */}
        <Cards />
      </main>
    </div>
  )
}

export default Home