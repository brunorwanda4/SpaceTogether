import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  className ?: string
}

export const SPLine = ({className} : Props) => {
  return (
    <div className={cn( " divider mt-0 mb-0 " , className)}/>
  )
}
