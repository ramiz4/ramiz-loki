import { SiGithub, SiStackoverflow } from '@icons-pack/react-simple-icons';
import { LinkedinIcon } from 'lucide-react';

import { useTranslations } from '../hooks/useTranslations';
import '../styles/header.css';
import { scrollToSection } from '../utils/navigationUtils';

import { AnimatedBackground } from './AnimatedBackground';
import { ScrollIndicator } from './ScrollIndicator';

export function Header() {
  const t = useTranslations();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000"
      id="header"
    >
      {/* Using the extracted AnimatedBackground component */}
      <AnimatedBackground imagePath="./hero-bg.png" />

      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
          <div className="text-center">
            <p className="text-[#00ff9d] text-sm uppercase mb-6 tracking-wider font-medium animate-fade-in-up">
              {t.header.welcome}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in-up animation-delay-200">
              <span className="text-white">I'm </span>
              <span className="text-[#00ff9d]">{t.header.name}</span>
            </h1>
            <div className="h-0.5 w-16 mx-auto bg-[#00ff9d] mb-6 animate-fade-in-up animation-delay-300"></div>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              {t.header.title}
            </p>
            <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in-up animation-delay-500">
              <a
                href="https://www.linkedin.com/in/ramiz-loki/"
                className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-[#00ff9d] transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my LinkedIn profile"
              >
                <LinkedinIcon
                  size={20}
                  className="text-gray-300 hover:text-[#00ff9d] transition-colors"
                />
              </a>
              <a
                href="https://github.com/ramiz4"
                className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-[#00ff9d] transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my GitHub profile"
              >
                <SiGithub
                  size={20}
                  className="text-gray-300 hover:text-[#00ff9d] transition-colors"
                />
              </a>
              <a
                href="https://stackoverflow.com/users/3466032/ramiz4"
                className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-[#00ff9d] transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my Stack Overflow profile"
              >
                <SiStackoverflow
                  size={20}
                  className="text-gray-300 hover:text-[#00ff9d] transition-colors"
                />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
              <a
                href="#contact"
                onClick={e => scrollToSection(e, 'contact')}
                className="px-8 py-3 bg-[#00ff9d] text-white rounded-md font-medium hover:bg-[#00cc7a] transition-all duration-300 shadow-lg"
              >
                {t.header.contactMe}
              </a>
              <a
                href="#skills"
                onClick={e => scrollToSection(e, 'skills')}
                className="px-8 py-3 border border-white/20 text-gray-200 rounded-md font-medium hover:bg-white/5 transition-all duration-300"
              >
                {t.header.viewSkills}
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-12">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
