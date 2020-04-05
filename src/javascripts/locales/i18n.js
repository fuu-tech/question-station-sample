import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { labelEn } from './label/en';
import { labelJa } from './label/ja';
import { modelEn } from './model/en';
import { modelJa } from './model/ja';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        model: modelEn,
        label: labelEn,
      },
      ja: {
        model: modelJa,
        label: labelJa,
      },
    },
    fallbackLng: 'ja',
    // debug: true,
    ns: ["model"],

    interpolation: {
      escapeValue: false, // not needed for react
      formatSeparator: ',',
    },

    // react-i18next special options (optional)
    react: {
      useSuspense: true, // true: wait for loaded in every translated hoc
    },
  });

export default i18n;
