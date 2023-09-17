'use client';

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import {useEffect} from "react";
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('@/components/login'), { ssr: false })
const ChoiceList = dynamic(() => import('@/components/choose'), { ssr: false })
import { pb } from "@/components/config/pocketbase";

export default function Home() {

  console.log("pocketbase url", process.env.POCKETBASE_URL)

  const router = useRouter()

  useEffect(()=>{
    console.log(pb.authStore.model);
    window.ondblclick = ()=>{
      pb.authStore.clear();
      router.refresh();
    }
  }, []);

  if (pb.authStore.isValid){
    return <ChoiceList/>
  }

  return <Login />
}