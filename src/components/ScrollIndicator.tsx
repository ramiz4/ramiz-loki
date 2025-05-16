import { useEffect, useState } from 'react';

export function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far the user has scrolled through the page
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
      {/* Vertical Progress Bar */}
      <div
        className="h-36 w-1 bg-gray-800 rounded-full relative mx-auto mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#00ff9d] to-[#00E5FF] rounded-full transition-all duration-300"
          style={{ height: `${scrollProgress}%` }}
        ></div>

        {/* Glow effect on hover */}
        <div
          className={`absolute left-0 w-full rounded-full transition-all duration-300 ${isHovered ? 'blur-md opacity-50' : 'blur-none opacity-0'}`}
          style={{
            height: `${scrollProgress}%`,
            bottom: 0,
            background: 'linear-gradient(to top, #00ff9d, #00E5FF)',
          }}
        ></div>

        {/* Dot indicator */}
        <div
          className="absolute left-1/2 w-3 h-3 bg-[#00ff9d] rounded-full transform -translate-x-1/2 shadow-md transition-all duration-200 hover:scale-150"
          style={{
            bottom: `${scrollProgress}%`,
            transform: `translateY(50%) translateX(-50%) ${isHovered ? 'scale(1.5)' : 'scale(1)'}`,
          }}
        >
          <div
            className={`absolute inset-0 bg-[#00ff9d] rounded-full animate-ping ${isHovered ? 'opacity-30' : 'opacity-0'}`}
          ></div>
        </div>
      </div>

      {/* Scroll down text */}
      <div
        className={`text-xs font-light tracking-widest text-gray-400 transition-all duration-500 transform ${isHovered ? 'opacity-100 scale-100' : 'opacity-60 scale-95'}`}
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        SCROLL TO EXPLORE
      </div>
    </div>
  );
}
