"use client";
import { Logo } from '@/components/navbar/Logo';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { BeatLoader } from 'react-spinners';

interface props {
  isOpen: boolean;
  userId : String;
}

const DialogOnboardingDirecterSchool = ({
  isOpen, userId
} : props) => {
  const [isPending , startTransition] = useTransition();
  const [open, setOpen] = useState(isOpen);
  const router = useRouter();
  const theme = useTheme();

  const handelNoSchool = () => {
    startTransition(() => {
      router.push(`/auth/onboarding/${userId}/directer/add`)
    })
  }

  const className = {
    content : " w-full max-lg:w-96"
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent data-theme={theme} className={cn(className.content)}>
       <div className=' flex justify-center'><Logo title /></div>
        <DialogHeader className={""}>
          <DialogTitle>
            Has your school been created in our <span className=' text-info'>space-together</span>
            </DialogTitle>
            <DialogDescription>
              Please confirm whether your school has already been set up in our system. 
              This will help us guide you through the next steps.
            </DialogDescription>
        </DialogHeader>
        <div className=' mt-2 flex gap-2  justify-end'>
          <button onClick={handelNoSchool} data-tip="Create new school in our application" className={cn("btn tooltip font-medium btn-warning flex gap-2" , isPending && " btn-disabled ")}><span>No</span> {isPending && <span className=' loading loading-spinner text-lg size-4'/>}</button>
          <button className={cn("btn btn-info flex gap-2" , isPending && " btn-disabled ")}>Yes</button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogOnboardingDirecterSchool
