import { cn } from '@/lib/utils';
import React from 'react'

interface Props {
    children: React.ReactNode;
    className ?: string; 
}

export const AuthSeverDiv = ({children ,className} : Props) => {
  return (
    <div className={cn(className)}>
        {children}
    </div>
  )
}
