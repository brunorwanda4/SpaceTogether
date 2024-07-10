import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  className ?: string
}

export const SPLine = ({className} : Props) => {
  return (
    <div className={cn( "h-1 w-full bg-base-100 mt-2" , className)}/>
  )
}
