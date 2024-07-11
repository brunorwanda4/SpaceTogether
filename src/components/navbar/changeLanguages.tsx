"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { i18n, Locale } from '@/i18n';
import { cn } from '@/lib/utils';
import { LangPageProps } from '@/types/pages';
import { Languages } from 'lucide-react';

interface Props {
  title: string
  chooseLang: string
  lang: Locale;
  TSave : string
  TCancel : string
}

export const ChangeLanguages = ({ title,TSave, TCancel, chooseLang, lang }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<Locale>(lang);

  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const handleSave = () => {
    router.push(redirectedPathName(selectedLang));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className=' w-full'>
      <div className=' flex justify-between w-full'>
          <div className=' flex gap-1 items-center'>
              <Languages size={18}/>
              <span className=''>{title}</span>
          </div>
          <span className=''>{lang === "en" ? "English" : "Kinyarwanda"}</span>
      </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{chooseLang}</AlertDialogTitle>
          <div className="flex flex-col gap-2 justify-start items-start">
            {i18n.locales.map(locale => (
              <label key={locale} className="label cursor-pointer justify-start gap-2">
                <input
                  type="radio"
                  name="language"
                  className={cn("radio size-5", selectedLang === locale && "checkbox-neutral checked:bg-neutral-content")}
                  checked={selectedLang === locale}
                  onChange={() => setSelectedLang(locale)}
                />
                <span className="label-text">
                  {locale === 'en' ? 'English' : 'Kinyarwanda'}
                </span>
              </label>
            ))}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=' capitalize'>{TCancel}</AlertDialogCancel>
          <AlertDialogAction className={cn("capitalize")} onClick={handleSave}>{TSave}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
