'use client';

import dynamic from 'next/dynamic'

const Login = dynamic(() => import('@/components/login'), { ssr: false })
const ChoiceList = dynamic(() => import('@/components/choose'), { ssr: false })
import { pb } from "@/components/config/pocketbase";

export default function Home() {

  if (pb.authStore.isValid){
    return <ChoiceList/>
  }

  return <Login />
}