import { auth} from '@/auth'
import { LanguagesProps } from '@/types/pages';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata:Metadata = {
  title : "Schools"
}

const SchoolPage =async ({
  params : {lang}, 
} : LanguagesProps) => {
  const user = await auth();

  if(!user) {
    redirect(`/${lang}`)
  }

  return (
    <div>
      hello for school user role :{user?.user.role}
    </div>
  )
}

export default SchoolPage
