import {
  BracesIcon,
  CodeIcon,
  DatabaseIcon,
  ServerIcon,
  WrenchIcon,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
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

  const categories = [
    {
      id: 'all',
      name: 'All',
      icon: CodeIcon,
    },
    {
      id: 'frontend',
      name: 'Frontend',
      icon: BracesIcon,
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: ServerIcon,
    },
    {
      id: 'database',
      name: 'Database',
      icon: DatabaseIcon,
    },
    {
      id: 'tools',
      name: 'Tools',
      icon: WrenchIcon,
    },
  ];

  const skills = [
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      category: 'frontend',
      level: 90,
      color: '#F7DF1E',
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      category: 'frontend',
      level: 85,
      color: '#3178C6',
    },
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      category: 'frontend',
      level: 88,
      color: '#61DAFB',
    },
    {
      name: 'Angular',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      category: 'frontend',
      level: 80,
      color: '#DD0031',
    },
    {
      name: 'HTML5',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      category: 'frontend',
      level: 95,
      color: '#E34F26',
    },
    {
      name: 'CSS3',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      category: 'frontend',
      level: 92,
      color: '#1572B6',
    },
    {
      name: 'Node.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      category: 'backend',
      level: 87,
      color: '#339933',
    },
    {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      category: 'backend',
      level: 78,
      color: '#3776AB',
    },
    {
      name: 'PHP',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      category: 'backend',
      level: 75,
      color: '#777BB4',
    },
    {
      name: 'MongoDB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      category: 'database',
      level: 82,
      color: '#47A248',
    },
    {
      name: 'PostgreSQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      category: 'database',
      level: 79,
      color: '#336791',
    },
    {
      name: 'Git',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      category: 'tools',
      level: 88,
      color: '#F05032',
    },
  ];

  const filteredSkills = skills.filter(
    skill => activeCategory === 'all' || skill.category === activeCategory,
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#2a2a2a] to-[#1d1d1d] min-h-screen"
      id="skills"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00ff9d]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00ff9d]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-4 text-center">
          <span className="relative inline-block">
            <span className="relative z-10">Skills & Expertise</span>
            <span className="absolute bottom-1 left-0 h-3 w-full bg-[#00ff9d]/20 rounded-sm"></span>
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-14 max-w-lg mx-auto">
          My technical toolkit that I've built and refined over the years of
          development journey
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative overflow-hidden flex items-center px-6 py-3 rounded-full font-medium text-sm transition-all duration-500
                  ${
                    activeCategory === category.id
                      ? 'bg-[#00ff9d] text-gray-900 shadow-[0_0_15px_rgba(0,255,157,0.4)]'
                      : 'bg-[#222222] text-gray-300 hover:bg-[#2a2a2a]'
                  }`}
              >
                <Icon
                  size={16}
                  className={`mr-2 transition-transform duration-300 ${activeCategory === category.id ? 'rotate-0' : 'rotate-0'}`}
                />
                {category.name}
                {activeCategory === category.id && (
                  <span className="absolute inset-0 bg-white opacity-20 animate-pulse-subtle"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="group bg-[#222222] p-6 rounded-xl shadow-lg border border-gray-800 backdrop-blur-sm"
              style={{
                transition: 'all 0.4s cubic-bezier(0.1, 0.7, 0.1, 1)',
                animationDelay: `${index * 0.1}s`,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <div className="flex flex-col items-center space-y-4">
                {/* Icon with animated ring */}
                <div className="relative h-20 w-20 flex items-center justify-center mb-2">
                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#00ff9d]/30 transition-all duration-500"></div>
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(${skill.color}40 0%, transparent ${skill.level}%, transparent 100%)`,
                      transform: 'rotate(-90deg)',
                      opacity: 0.7,
                      transition: 'all 1s ease-out',
                    }}
                  ></div>
                  <div className="absolute inset-2 bg-[#2a2a2a] rounded-full flex items-center justify-center group-hover:scale-95 transition-all duration-500">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-10 h-10 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Skill name */}
                <span className="text-base font-medium text-gray-200 group-hover:text-[#00ff9d] transition-colors duration-300">
                  {skill.name}
                </span>

                {/* Skill level */}
                <div className="w-full bg-gray-700/30 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: isInView ? `${skill.level}%` : '0%',
                      backgroundColor: skill.color,
                      transition:
                        'width 1s cubic-bezier(0.1, 0.7, 0.1, 1) 0.2s',
                      boxShadow: `0 0 10px ${skill.color}40`,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
