import { ChooseTheme } from "@/components/theme/chooseTheme";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl"
import { LanguagesProps } from "@/types/pages";

const Home = ({params : {locale}} : LanguagesProps) =>{
  const t = useTranslations("indexPage")
  return (
    <div className="">
      <div className=" grid place-content-center h-screen">
        <div>
          <Link href={`/${locale}/auth/login`} className=" btn">
             {t('getStart')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
