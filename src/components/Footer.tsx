import { SiGithub, SiStackoverflow } from '@icons-pack/react-simple-icons';
import { LinkedinIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

import { useTranslations } from '../hooks/useTranslations';

export function Footer() {
  const t = useTranslations();

  return (
    <footer
      className="relative bg-[#1a1a1a] py-16 px-4 overflow-hidden"
      id="footer"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#001a11] to-[#1a1a1a] z-0"></div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 grid-lines-overlay opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in-up">
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-lg border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Ramiz{' '}
              <span className="text-[#00ff9d] relative">
                Loki
                <span className="absolute -inset-1 bg-[#00ff9d20] blur-xl"></span>
              </span>
            </h3>
            <p className="text-gray-300 mb-6">{t.footer.tagline}</p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/ramiz-loki/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-transparent border border-[#00ff9d]/20 rounded-full hover:bg-[#00ff9d]/10 transition-all duration-300 group hover:scale-110"
                aria-label="Visit my LinkedIn profile"
              >
                <LinkedinIcon size={20} className="text-[#00ff9d]" />
              </a>
              <a
                href="https://github.com/ramiz4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-transparent border border-[#00ff9d]/20 rounded-full hover:bg-[#00ff9d]/10 transition-all duration-300 group hover:scale-110"
                aria-label="Visit my GitHub profile"
              >
                <SiGithub size={20} className="text-[#00ff9d]" />
              </a>
              <a
                href="https://stackoverflow.com/users/3466032/ramiz4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-transparent border border-[#00ff9d]/20 rounded-full hover:bg-[#00ff9d]/10 transition-all duration-300 group hover:scale-110"
                aria-label="Visit my Stack Overflow profile"
              >
                <SiStackoverflow size={20} className="text-[#00ff9d]" />
              </a>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-lg border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-white">
              {t.footer.contactInfo}{' '}
              <span className="text-[#00ff9d] relative">
                <span className="absolute -inset-1 bg-[#00ff9d20] blur-xl"></span>
              </span>
            </h3>
            <div className="space-y-6">
              <div className="flex items-center contact-info-item">
                <div className="p-3 bg-[#00ff9d]/10 rounded-full mr-4 border border-[#00ff9d]/20">
                  <MailIcon size={20} className="text-[#00ff9d]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{t.footer.email}</p>
                  <a
                    href="mailto:me@ramizloki.com"
                    className="text-white hover:text-[#00ff9d] transition-colors"
                  >
                    me@ramizloki.com
                  </a>
                </div>
              </div>
              <div className="flex items-center contact-info-item">
                <div className="p-3 bg-[#00ff9d]/10 rounded-full mr-4 border border-[#00ff9d]/20">
                  <PhoneIcon size={20} className="text-[#00ff9d]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{t.footer.phone}</p>
                  <a
                    href="tel:+41764418288"
                    className="text-white hover:text-[#00ff9d] transition-colors"
                  >
                    +41 76 441 8288
                  </a>
                </div>
              </div>
              <div className="flex items-center contact-info-item">
                <div className="p-3 bg-[#00ff9d]/10 rounded-full mr-4 border border-[#00ff9d]/20">
                  <MapPinIcon size={20} className="text-[#00ff9d]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{t.footer.location}</p>
                  <p className="text-white">Wettingen, Switzerland</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mx-auto bg-gradient-to-r from-transparent via-[#00ff9d]/30 to-transparent my-12"></div>

        {/* Copyright and back to top */}
        <div className="flex flex-col md:flex-row justify-between items-center animate-fade-in-up animation-delay-200">
          <p className="text-gray-400 font-mono">
            © {new Date().getFullYear()} Ramiz Loki.{' '}
            {t.footer.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
