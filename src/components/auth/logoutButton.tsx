"use client";
import { logout } from '@/server/logout'
import React from 'react'

export const LogoutButton = () => {
  return (
    <button className=' btn btn-error' onClick={() => logout()}>
    Logout
  </button>
  )
}
