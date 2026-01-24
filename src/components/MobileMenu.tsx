import { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';

import { useTranslations } from '../hooks/useTranslations';
import { scrollToSection } from '../utils/navigationUtils';

import { LanguageSwitcher } from './LanguageSwitcher';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export function MobileMenu({ isMenuOpen, setIsMenuOpen }: MobileMenuProps) {
  const location = useLocation();
  const t = useTranslations();

  return (
    <div
      className="md:hidden bg-white/5 backdrop-blur-xl border-b border-white/10"
      role="navigation"
      aria-label="Mobile navigation menu"
      data-testid="mobile-menu"
    >
      <div className="px-2 pt-2 pb-3 space-y-1">
        {[
          { key: 'about', label: t.nav.about },
          { key: 'skills', label: t.nav.skills },
          { key: 'experience', label: t.nav.experience },
          { key: 'education', label: t.nav.education },
          { key: 'contact', label: t.nav.contact },
        ].map(item => (
          <a
            key={item.key}
            href={`#${item.key}`}
            onClick={e =>
              scrollToSection(e, item.key, isMenuOpen, setIsMenuOpen)
            }
            className={`block px-3 py-2 hover:bg-[#00ff9d]/5 rounded-lg transition-all duration-300 ${
              location.hash === `#${item.key}`
                ? 'text-[#00ff9d]'
                : 'text-gray-300 hover:text-[#00ff9d]'
            }`}
          >
            {item.label}
          </a>
        ))}
        <div className="px-3 py-2">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
