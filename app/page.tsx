'use client';

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import {useEffect} from "react";

import ChoiceList from "@/components/choose"

export default function Home() {

  
  const {user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(()=>{
    if (!user){
      router.push('/api/auth/login')
    }
  }, [user])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
   <div><ChoiceList/></div>
  )
}