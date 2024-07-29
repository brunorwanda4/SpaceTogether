
import { SchoolLogo } from './Logo';
import { cn } from '@/lib/utils';
import { Locale } from '@/i18n';
import { redirect } from 'next/navigation';
import { ISchool } from '@/types/school';
import { UserScrollTop } from '@/hooks/scrollTop';

interface props {
    lang : Locale;
    schoolUsername ?: string
    isSe ?: string,
    school : ISchool | null;
    title ?: boolean ;
}

export const SchoolNav = ({
    lang , schoolUsername , isSe , school , title
} : props) => {
    if(!school) return (redirect(`/${lang}/s`));
  return (
    <div>
        <SchoolLogo 
            lang={lang} 
            title={title}
            link
            school={school}
            schoolUsername={schoolUsername}
            isSe={isSe}
        />
  </div>
  )
}
