import { Logo, SchoolLogo } from './Logo';
import { cn } from '@/lib/utils';
import { auth } from '@/auth';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n';
import { getUserByEmail } from '@/data/getUserData';

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
    <nav className={cn(`fixed flex justify-between z-50 w-full h-12 lg:px-2 md:px-2 py-1 shadow-md items-center backdrop-blur-md`)}>
        <div>
            <SchoolLogo 
             lang={lang} 
             title 
             link
             schoolUsername={schoolUsername}
             isSe={isSe}
            />
        </div>
    </nav>
  )
}
