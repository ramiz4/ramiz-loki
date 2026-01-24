import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

export function useTranslations() {
  const { language } = useLanguage();
  return translations[language];
}
