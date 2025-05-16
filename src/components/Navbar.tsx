import { MenuIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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

  // Handle clicking on navigation links
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();

    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }

    // Update URL hash without page reload
    window.location.hash = sectionId;

    // Element scrolling is handled by the ScrollToSection component in App.tsx
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#001a11]/80 backdrop-blur-md border-b border-[#00ff9d]/10' : 'bg-transparent'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a
              href="#"
              onClick={e => scrollToSection(e, '')}
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
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={e => scrollToSection(e, item.toLowerCase())}
                    className={`text-sm tracking-wider transition-colors duration-300 ${
                      location.hash === `#${item.toLowerCase()}`
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
        <div className="md:hidden bg-[#001a11]/95 backdrop-blur-md border-b border-[#00ff9d]/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['About', 'Skills', 'Experience', 'Education', 'Contact'].map(
              item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={e => scrollToSection(e, item.toLowerCase())}
                  className={`block px-3 py-2 hover:bg-[#00ff9d]/5 rounded-lg transition-all duration-300 ${
                    location.hash === `#${item.toLowerCase()}`
                      ? 'text-[#00ff9d]'
                      : 'text-gray-300 hover:text-[#00ff9d]'
                  }`}
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
