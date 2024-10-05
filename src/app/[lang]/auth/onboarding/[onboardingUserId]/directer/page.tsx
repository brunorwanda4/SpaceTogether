import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Metadata } from 'next'
import React from 'react'

export const metadata : Metadata = {
  title: "onboarding-directer"
}

const OnboardingDirecter = () => {
  return (
    <div>
      <Dialog>
        <Dialog>
            hello bruno
        </Dialog>
        <DialogContent>
            Hello directer
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default OnboardingDirecter
