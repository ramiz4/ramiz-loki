import { SiGithub, SiStackoverflow } from '@icons-pack/react-simple-icons';
import { LinkedinIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

export function Footer() {
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
          <div className="bg-[#2a2a2a] p-8 rounded-lg border border-[#00ff9d]/20 shadow-[0_0_30px_rgba(0,255,157,0.1)]">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Ramiz{' '}
              <span className="text-[#00ff9d] relative">
                Loki
                <span className="absolute -inset-1 bg-[#00ff9d20] blur-xl"></span>
              </span>
            </h3>
            <p className="text-gray-300 mb-6">
              Senior Full-Stack Software Engineer with extensive experience in
              web development and team leadership.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-3 bg-transparent border border-[#00ff9d]/20 rounded-full hover:bg-[#00ff9d]/10 transition-all duration-300 group hover:scale-110"
              >
                <LinkedinIcon size={20} className="text-[#00ff9d]" />
              </a>
              <a
                href="#"
                className="p-3 bg-transparent border border-[#00ff9d]/20 rounded-full hover:bg-[#00ff9d]/10 transition-all duration-300 group hover:scale-110"
              >
                <SiGithub size={20} className="text-[#00ff9d]" />
              </a>
              <a
                href="#"
                className="p-3 bg-transparent border border-[#00ff9d]/20 rounded-full hover:bg-[#00ff9d]/10 transition-all duration-300 group hover:scale-110"
              >
                <SiStackoverflow size={20} className="text-[#00ff9d]" />
              </a>
            </div>
          </div>
          <div className="bg-[#2a2a2a] p-8 rounded-lg border border-[#00ff9d]/20 shadow-[0_0_30px_rgba(0,255,157,0.1)]">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Contact{' '}
              <span className="text-[#00ff9d] relative">
                Info
                <span className="absolute -inset-1 bg-[#00ff9d20] blur-xl"></span>
              </span>
            </h3>
            <div className="space-y-6">
              <div className="flex items-center contact-info-item">
                <div className="p-3 bg-[#00ff9d]/10 rounded-full mr-4 border border-[#00ff9d]/20">
                  <MailIcon size={20} className="text-[#00ff9d]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
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
                  <p className="text-sm text-gray-400">Phone</p>
                  <span className="text-white">+41 76 441 8288</span>
                </div>
              </div>
              <div className="flex items-center contact-info-item">
                <div className="p-3 bg-[#00ff9d]/10 rounded-full mr-4 border border-[#00ff9d]/20">
                  <MapPinIcon size={20} className="text-[#00ff9d]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
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
            © {new Date().getFullYear()} Ramiz Loki. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
