import { Locale } from "../i18n";

/**
 * pages params for languages english and kinyarwanda
 * @type {Locale ,}
 */


export interface LanguagesProps {
    params : {lang: Locale}
    children ?: React.ReactNode
}

/**
 * pages link for languages english and kinyarwanda
 * @type {Locale}
 */
export interface LangPageProps {
    lang : Locale;
}