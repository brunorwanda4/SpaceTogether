import { ChooseTheme } from "@/components/theme/chooseTheme";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl"
import { LanguagesProps } from "@/types/pages";
import { getDictionary } from "@/lib/dictionary";

const Home = async ({params : {lang}} : LanguagesProps) =>{
  const { indexPage } = await getDictionary(lang)
  return (
    <div className="">
      <div className=" grid place-content-center h-screen">
        <div>
          <Link href={`/${lang}/auth/login`} className=" btn">
             {indexPage.getStart}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
