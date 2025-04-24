// Importing necessary React components for the app
import React from "react"; // Import React library to use JSX
import Navbar from "./components/CupcpHome/Navbar"; // Navbar component for the navigation bar at the top of the page
import Hero from "./components/CupcpHome/Hero"; // Hero component that showcases the main introductory section of the app
import About from "./components/CupcpHome/About"; // About component providing information about the organization or platform
import Cards from "./components/CupcpHome/Cards"; // Cards component to display different information in card-style layouts
import Footer from "./components/CupcpHome/Footer"; // Footer component containing site information and links at the bottom

// Main App component that structures and renders the entire webpage
function App() {
  return (
    // Outer container that ensures the entire app spans the full height of the screen with a primary background color
    <div className="min-h-screen bg-primary">
      {/* Navbar section for navigation links */}
      <Navbar />

      {/* Main content area where primary sections (Hero, About, Cards) are rendered */}
      <main>
        {/* Hero component for the landing page introduction */}
        <Hero />

        {/* About section to describe the organization or project */}
        <About />

        {/* Cards section that displays mission, vision, and values in card layout */}
        <Cards />
      </main>

      {/* Footer section for contact information, quick links, and social media */}
      <Footer />
    </div>
  );
}

export default App; // Exporting the App component to be used in the main entry point
