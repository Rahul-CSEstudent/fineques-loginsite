'use client'

import Image from 'next/image'
import Login from "@/components/login"
import { useUser } from "@auth0/nextjs-auth0/client"

export default function Home() {
  const { user , error, isLoading } = useUser();
  return ( 

    <a href="/api/auth/login">Login</a>
  )
}



