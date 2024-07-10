/**
 * pages params for languages english and kinyarwanda
 * @type {string ,}
 */

export interface LanguagesProps {
    params : {locale: string}
    children ?: React.ReactNode
}

/**
 * pages link for languages english and kinyarwanda
 * @type {string}
 */
export interface LangPageProps {
    lang : string;
}