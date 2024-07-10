"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { i18n, Locale } from '@/i18n';
import { cn } from '@/lib/utils';
import { LangPageProps } from '@/types/pages';

interface Props {
  children: React.ReactNode;
  choose: React.ReactNode;
  lang: Locale;
}

export const ChangeLanguages = ({ children, choose, lang }: Props) => {
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
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {choose}
          </AlertDialogTitle>
          <div className="flex flex-col gap-2 justify-start items-start">
            {i18n.locales.map(locale => (
              <label key={locale} className="label cursor-pointer justify-start gap-2">
                <input
                  type="radio"
                  name="language"
                  className={cn("radio size-5", selectedLang === locale && "checked:bg-accent checkbox-accent")}
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
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className={cn(!selectedLang && "bg-blue")} onClick={handleSave}>
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
