import { useEffect } from 'react';
import { HashRouter, useLocation } from 'react-router-dom';

import { About } from './components/About';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Languages } from './components/Languages';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { Skills } from './components/Skills';

// Scroll to view handler
function ScrollToSection() {
  const { hash } = useLocation();

  useEffect(() => {
    // Only try to scroll if there's a hash
    if (hash) {
      // Remove the # from the hash to get the id of the element to scroll to
      const id = hash.replace('#', '');
      const element = document.getElementById(id);

      if (element) {
        // Wait a bit for the page to fully render before scrolling
        setTimeout(() => {
          const navHeight = document.querySelector('nav')?.offsetHeight || 0;
          const yOffset = -navHeight; // Adjust for navbar height
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    } else {
      // If no hash, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return null;
}

function MainContent() {
  return (
    <div className="bg-[#1a1a1a] text-gray-100 min-h-screen">
      <Navbar />
      <Header />
      <main>
        <About />
        <Skills />
        <Experience />
        <Education />
        <Languages />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <ScrollToSection />
    </div>
  );
}

export function App() {
  return (
    <HashRouter>
      <MainContent />
    </HashRouter>
  );
}
