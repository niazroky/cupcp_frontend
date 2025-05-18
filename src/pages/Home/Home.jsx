import React from 'react'
import Hero from '../../components/CupcpHome/Hero'
import About from '../../components/CupcpHome/About'
import Cards from '../../components/CupcpHome/Cards'


const Home = () => {
    return (
        // Outer container that ensures the entire app spans the full height of the screen with a primary background color
        <div className="min-h-screen bg-primary">

          {/* Main content area where primary sections (Hero, About, Cards) are rendered */}
          <main>
            {/* Hero component for the landing page introduction */}
            <Hero />
    
            {/* About section to describe the organization or project */}
            <About />
    
            {/* Cards section that displays mission, vision, and values in card layout */}
            <Cards />
          </main>
        </div>
      );
}

export default Home