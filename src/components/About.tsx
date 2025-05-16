import { CodeIcon, UserIcon, BriefcaseIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import '../styles/about.css';

export function About() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 },
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const aboutCards = [
    {
      icon: <CodeIcon size={32} className="text-[#1a1a1a]" />,
      title: 'Full-Stack Developer',
      description:
        'Experienced in building responsive web applications using modern frameworks and technologies.',
      color: '#00ff9d',
    },
    {
      icon: <UserIcon size={32} className="text-[#1a1a1a]" />,
      title: 'Team Leader',
      description:
        'Transformed delivery frameworks to an agile and iterative methodology as a team thought leader.',
      color: '#00E5FF',
    },
    {
      icon: <BriefcaseIcon size={32} className="text-[#1a1a1a]" />,
      title: 'Problem Solver',
      description:
        'Passionate about following best practices and participating in code reviews to ensure high-quality code.',
      color: '#8C43FF',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#1d1d1d] to-[#0f0f0f] min-h-screen"
      id="about"
    >
      {/* Animated background elements - keeping this as requested */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#00ff9d]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#8C43FF]/5 rounded-full blur-[100px]"></div>

        {/* Keeping the particle effects as requested */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-3 text-center">
          <span className="relative inline-block">
            <span className="relative z-10">About Me</span>
            <span className="absolute bottom-1 left-0 h-3 w-full bg-[#00ff9d]/20 rounded-sm"></span>
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-lg mx-auto">
          My experience, expertise and passion
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {aboutCards.map((card, index) => (
            <div
              key={index}
              className={`about-card about-card-animate ${isInView ? 'in-view' : ''}`}
              style={{
                transitionDelay: `${index * 0.15}s`,
              }}
            >
              <div className="p-8 relative">
                <div className="icon-container mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-[#00ff9d] to-[#00cc7d] rounded-2xl shadow-lg shadow-green-500/20">
                    {card.icon}
                  </div>
                  <div className="absolute -z-10 animate-pulse-slow opacity-50 p-4 bg-[#00ff9d] rounded-2xl blur-md"></div>
                </div>

                <div className="mb-4">
                  <h3
                    className="text-2xl font-bold text-center"
                    style={{ color: card.color }}
                  >
                    {card.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-center leading-relaxed">
                  {card.description}
                </p>

                {/* Decorative dots */}
                <div className="absolute bottom-3 left-3 flex space-x-1">
                  <div
                    className="about-decoration-dot"
                    style={{ backgroundColor: card.color }}
                  ></div>
                  <div
                    className="about-decoration-dot"
                    style={{ backgroundColor: card.color, opacity: 0.6 }}
                  ></div>
                  <div
                    className="about-decoration-dot"
                    style={{ backgroundColor: card.color, opacity: 0.3 }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
