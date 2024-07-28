import { Logo, SchoolLogo } from './Logo';
import { cn } from '@/lib/utils';
import { auth } from '@/auth';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n';
import { getUserByEmail } from '@/data/getUserData';
import SchoolNavClient from './schoolNavClient';

interface props {
    lang : Locale;
    schoolUsername ?: string
    isSe ?: string
}

export const SchoolNav = async ({
    lang , schoolUsername , isSe
} : props) => {
    const user = (await auth())?.user;
    const {nav , page} = await getDictionary(lang);
    const getUser = await getUserByEmail(user?.email);

    if(!getUser) {
        throw Error (`Could not find user ${user?.email}`)
    }
  return (
    <SchoolNavClient>
        <div>
            <SchoolLogo 
             lang={lang} 
             title 
             link
             schoolUsername={schoolUsername}
             isSe={isSe}
            />
        </div>
    </SchoolNavClient>
  )
}
