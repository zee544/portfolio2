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
import Certifications from './components/Certifications';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="App">
     
      <Navbar showAdmin={showAdmin} setShowAdmin={setShowAdmin} />
      
      <main className="main-content">
        {showAdmin ? (
     
          <Admin />
        ) : (
        
          <>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certifications />
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
