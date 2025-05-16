import { SiGithub, SiStackoverflow } from '@icons-pack/react-simple-icons';
import { LinkedinIcon } from 'lucide-react';

import '../styles/header.css';
import { scrollToSection } from '../utils/navigationUtils';
import { AnimatedBackground } from './AnimatedBackground';
import { ScrollIndicator } from './ScrollIndicator';

export function Header() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000"
      id="header"    >
      {/* Using the extracted AnimatedBackground component */}
      <AnimatedBackground imagePath="./hero-bg.png" />

      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
          <div className="text-center">
            <p className="text-[#00ff9d] font-mono mb-6 tracking-[0.2em] animate-fade-in-up">
              WELCOME TO MY PORTFOLIO
            </p>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 font-mono tracking-tight animate-fade-in-up animation-delay-200">
              <span className="text-white">I'm </span>
              <span className="text-[#00ff9d] relative inline-block">
                Ramiz
                <span className="absolute -inset-1 bg-[#00ff9d20] blur-xl"></span>
              </span>
            </h1>
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#00ff9d] to-transparent mb-6 animate-fade-in-up animation-delay-300"></div>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-mono animate-fade-in-up animation-delay-400">
              Senior Full-Stack Software Engineer crafting elegant solutions to
              complex problems
            </p>
            <div className="flex items-center justify-center gap-6 mb-12 animate-fade-in-up animation-delay-500">
              <a
                href="https://www.linkedin.com/in/ramiz-loki/"
                className="p-4 bg-transparent border border-[#00ff9d]/20 rounded-full hover:bg-[#00ff9d]/10 transition-all duration-300 group hover:scale-110"
                target="_blank"
              >
                <LinkedinIcon
                  size={20}
                  className="text-[#00ff9d] transition-transform"
                />
              </a>
              <a
                href="https://github.com/ramiz4"
                className="p-4 bg-transparent border border-[#00ff9d]/20 rounded-full hover:bg-[#00ff9d]/10 transition-all duration-300 group hover:scale-110"
                target="_blank"
              >
                <SiGithub
                  size={20}
                  className="text-[#00ff9d] transition-transform"
                />
              </a>
              <a
                href="https://stackoverflow.com/users/3466032/ramiz4"
                className="p-4 bg-transparent border border-[#00ff9d]/20 rounded-full hover:bg-[#00ff9d]/10 transition-all duration-300 group hover:scale-110"
                target="_blank"
              >
                <SiStackoverflow
                  size={20}
                  className="text-[#00ff9d] transition-transform"
                />
              </a>
            </div>            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
              <a
                href="#contact"
                onClick={e => scrollToSection(e, 'contact')}
                className="px-8 py-3 bg-[#00ff9d] text-gray-900 rounded-full font-mono hover:bg-[#00cc7a] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,157,0.3)]"
              >
                Contact Me
              </a>
              <a
                href="#skills"
                onClick={e => scrollToSection(e, 'skills')}
                className="px-8 py-3 border border-[#00ff9d] text-[#00ff9d] rounded-full font-mono hover:bg-[#00ff9d]/10 transition-all duration-300 hover:scale-105"
              >
                View My Skills
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
