import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Footer from './components/Footer';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="App">
      {/* Shared Sticky Header Navbar */}
      <Navbar showAdmin={showAdmin} setShowAdmin={setShowAdmin} />
      
      <main className="main-content">
        {showAdmin ? (
          // Admin Dashboard View
          <Admin />
        ) : (
          // Main Interactive Portfolio View
          <>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </>
        )}
      </main>

    
      <Footer />

      <style>{`
        .App {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-primary);
        }
        .main-content {
          flex-grow: 1;
        }
      `}</style>
    </div>
  );
}

export default App;
