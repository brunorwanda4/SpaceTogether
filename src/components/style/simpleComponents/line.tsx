import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  className ?: string
}

export const SPLine = ({className} : Props) => {
  return (
    <div className={cn( " divider" , className)}/>
  )
}
