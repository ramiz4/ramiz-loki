import { GlobeIcon } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-gray-300 hover:text-[#00ff9d]"
      aria-label={`Switch to ${language === 'en' ? 'German' : 'English'}`}
    >
      <GlobeIcon size={16} />
      <span className="text-sm font-medium">
        {language === 'en' ? 'DE' : 'EN'}
      </span>
    </button>
  );
}
