import { ArrowUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    // Initial check
    toggleVisibility();

    // Clean up event listener
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top with smooth animation
  const scrollToTop = () => {
    // Clear hash from URL without a page refresh
    history.replaceState(
      null,
      document.title,
      window.location.pathname + window.location.search,
    );

    // Use the same fancy animation as in the Navbar component
    const startPosition = window.pageYOffset;
    const duration = 800; // milliseconds
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function (ease-out-cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, startPosition * (1 - easeOutCubic));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-6 bottom-6 z-50 p-3 rounded-full bg-[#00ff9d] shadow-lg hover:bg-[#00cc7d] transition-all duration-300 hover:scale-110 focus:outline-none ${
        isVisible
          ? 'opacity-100 transform translate-y-0'
          : 'opacity-0 transform translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon size={24} className="text-gray-900" />

      {/* Animated circle effect on hover */}
      <div className="absolute inset-0 rounded-full hover:animate-ping bg-[#00ff9d]/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

      {/* Ring pulse animation */}
      <div
        className="absolute inset-0 rounded-full animate-ping bg-[#00ff9d]/30 opacity-75"
        style={{ animationDuration: '3s' }}
      ></div>
    </button>
  );
}
