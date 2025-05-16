import { MenuIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '../utils/navigationUtils';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [location.hash, isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#001a11]/80 backdrop-blur-md border-b border-[#00ff9d]/10' : 'bg-transparent'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">            <a
            href="#"
            onClick={e => scrollToSection(e, '', isMenuOpen, setIsMenuOpen)}
            className="cursor-pointer"
          >
            <span className="text-[#00ff9d] font-bold text-2xl tracking-tight">
              RL
            </span>
          </a>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {['About', 'Skills', 'Experience', 'Education', 'Contact'].map(
                item => (
                  <a
                    key={item} href={`#${item.toLowerCase()}`}
                    onClick={e => scrollToSection(e, item.toLowerCase(), isMenuOpen, setIsMenuOpen)}
                    className={`text-sm tracking-wider transition-colors duration-300 ${location.hash === `#${item.toLowerCase()}`
                        ? 'text-[#00ff9d]'
                        : 'text-gray-300 hover:text-[#00ff9d]'
                      }`}
                  >
                    {item.toUpperCase()}
                  </a>
                ),
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-[#00ff9d] transition-colors duration-300"
            >
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <MobileMenu />
      )}
    </nav>
  );
}
