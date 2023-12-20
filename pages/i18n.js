import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { getCookie } from '../utils/RegExp';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        interpolation: { escapeValue: false },
        supportedLngs: ['en', 'es', 'fr'],
        lng: getCookie('i18next'),
        fallbackLng:'en',
        detection: {
            order: ['cookie', 'sessionStorage', 'htmlTag'],
            caches: ['cookie'],
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
    });

export default i18n;
