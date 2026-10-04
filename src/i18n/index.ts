import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import vi from './locales/vi';

export const resources = {
  en: { translation: en },
  vi: { translation: vi },
} as const;

type Language = keyof typeof resources;

const deviceLanguage = Intl.DateTimeFormat()
  .resolvedOptions()
  .locale.split('-')[0];

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage in resources ? (deviceLanguage as Language) : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
