import { GlobeIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import '../styles/languages.css';

export function Languages() {
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

  const languages = [
    {
      name: 'German',
      level: 'First Language',
      proficiency: 100,
      icon: '🇩🇪',
      color: '#00E5FF',
    },
    {
      name: 'English',
      level: 'Fluent Knowledge',
      proficiency: 75,
      icon: '🇬🇧',
      color: '#00FF9D',
    },
    {
      name: 'Albanian',
      level: 'Native Language',
      proficiency: 100,
      icon: '🇦🇱',
      color: '#8C43FF',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#1d1d1d] to-[#0f0f0f]"
      id="languages"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#00ff9d]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#8C43FF]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-3 text-center">
          <span className="relative inline-block">
            <span className="relative z-10">Languages</span>
            <span className="absolute bottom-1 left-0 h-3 w-full bg-[#00ff9d]/20 rounded-sm"></span>
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-lg mx-auto">
          My linguistic proficiency across different languages
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {languages.map((language, index) => (
            <div
              key={index}
              className={`language-card language-card-animate ${isInView ? 'in-view' : ''}`}
              style={{
                transitionDelay: `${index * 0.15}s`,
              }}
            >
              <div className="p-6 relative">
                <span
                  className="absolute top-4 right-4 text-4xl language-icon"
                  aria-hidden="true"
                >
                  {language.icon}
                </span>

                <div className="mb-8">
                  <h3
                    className="text-2xl font-bold mb-2 flex items-center"
                    style={{ color: language.color }}
                  >
                    <GlobeIcon
                      size={24}
                      style={{ color: language.color }}
                      className="mr-3"
                    />
                    {language.name}
                  </h3>
                  <div
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: `${language.color}15`,
                      color: language.color,
                    }}
                  >
                    {language.level}
                  </div>
                </div>

                <div className="relative">
                  <div
                    className="w-full language-progress-bg"
                    style={{ backgroundColor: `${language.color}10` }}
                  >
                    <div
                      className={`language-progress-bar ${isInView ? 'in-view' : ''}`}
                      style={
                        {
                          '--progress-width': `${language.proficiency}%`,
                          background: `linear-gradient(90deg, ${language.color}20 0%, ${language.color}40 100%)`,
                          boxShadow: `0 0 20px ${language.color}20`,
                        } as React.CSSProperties
                      }
                    >
                      <span className="font-bold text-sm text-white">
                        {language.proficiency}%
                      </span>

                      {/* Animated shine effect */}
                      <div className="absolute top-0 left-0 w-full h-full shine-effect"></div>
                    </div>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute bottom-3 left-3 flex space-x-1">
                  <div
                    className="language-decoration-dot"
                    style={{ backgroundColor: language.color }}
                  ></div>
                  <div
                    className="language-decoration-dot"
                    style={{ backgroundColor: language.color, opacity: 0.6 }}
                  ></div>
                  <div
                    className="language-decoration-dot"
                    style={{ backgroundColor: language.color, opacity: 0.3 }}
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
