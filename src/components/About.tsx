import { CodeIcon, UserIcon, BriefcaseIcon, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useTranslations } from '../hooks/useTranslations';
import '../styles/about.css';

export function About() {
  const [isInView, setIsInView] = useState(false);
  const [isReferenceExpanded, setIsReferenceExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations();

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
      icon: <CodeIcon size={32} className="text-white" />,
      title: t.about.fullStackTitle,
      description: t.about.fullStackDesc,
      color: '#3b82f6',
    },
    {
      icon: <UserIcon size={32} className="text-white" />,
      title: t.about.teamLeaderTitle,
      description: t.about.teamLeaderDesc,
      color: '#2563eb',
    },
    {
      icon: <BriefcaseIcon size={32} className="text-white" />,
      title: t.about.problemSolverTitle,
      description: t.about.problemSolverDesc,
      color: '#1d4ed8',
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
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#00ff9d]/5 rounded-full blur-[100px]"></div>

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
            <span className="relative z-10">{t.about.title}</span>
            <span className="absolute bottom-1 left-0 h-3 w-full bg-[#00ff9d]/20 rounded-sm"></span>
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-lg mx-auto">
          {t.about.subtitle}
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {aboutCards.map((card, index) => (
            <div
              key={index}
              className={`about-card about-card-animate backdrop-blur-xl ${isInView ? 'in-view' : ''}`}
              style={{
                transitionDelay: `${index * 0.15}s`,
              }}
            >
              <div className="p-8 relative">
                <div className="icon-container mb-6 flex justify-center">
                  <div className="p-4 bg-[#00ff9d] rounded-lg shadow-lg">
                    {card.icon}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-center text-white">
                    {card.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-center leading-relaxed">
                  {card.description}
                </p>

                {/* Decorative dots */}
                <div
                  className="absolute bottom-3 left-3 flex space-x-1"
                  aria-hidden="true"
                >
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

        {/* AI Reference Section */}
        <div
          className={`mt-16 about-card about-card-animate backdrop-blur-xl ${isInView ? 'in-view' : ''}`}
          style={{ transitionDelay: '0.45s' }}
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3
                  id="ai-reference-title"
                  className="text-2xl font-bold text-white mb-2"
                >
                  {t.about.aiReferenceTitle}
                </h3>
                <p className="text-sm text-gray-400 italic">
                  {t.about.aiReferenceIntro}
                </p>
              </div>
              <button
                onClick={() => setIsReferenceExpanded(!isReferenceExpanded)}
                className="ml-4 p-2 rounded-lg bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 transition-colors flex-shrink-0"
                aria-expanded={isReferenceExpanded}
                aria-label={
                  isReferenceExpanded ? t.about.readLess : t.about.readMore
                }
              >
                <ChevronDown
                  size={24}
                  className={`text-[#00ff9d] transition-transform duration-300 ${
                    isReferenceExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isReferenceExpanded
                  ? 'max-h-[2000px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pt-4 space-y-4 text-gray-300 leading-relaxed">
                <p>{t.about.aiReferenceParagraph1}</p>
                <p>{t.about.aiReferenceParagraph2}</p>
                <p>{t.about.aiReferenceParagraph3}</p>
                <p className="italic">{t.about.aiReferenceParagraph4}</p>
              </div>
            </div>

            {!isReferenceExpanded && (
              <button
                onClick={() => setIsReferenceExpanded(true)}
                className="mt-4 text-[#00ff9d] hover:text-[#00cc7d] transition-colors text-sm font-medium"
              >
                {t.about.readMore} →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
