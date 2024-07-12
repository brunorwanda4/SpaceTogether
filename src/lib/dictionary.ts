import 'server-only';
import type { Locale } from '../i18n';

const dictionaries = {
  en: () => import('../../locale/en.json').then(module => module.default),
  kiny: () => import('../../locale/kiny.json').then(module => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!(locale in dictionaries)) {
    throw new Error(`Locale ${locale} is not supported`);
  }
  try {
    return await dictionaries[locale]();
  } catch (error) {
    console.error('Error in getDictionary:', error);
    throw new Error(`Failed to load dictionary for locale ${locale}`);
  }
};
