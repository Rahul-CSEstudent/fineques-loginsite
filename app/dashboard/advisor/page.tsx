'use client';

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import {useEffect} from "react";
import { pb } from "@/components/config/pocketbase";

const Dashboard: React.FC = () => {

    const router = useRouter();

    useEffect(()=>{
      if (!pb.authStore.isValid){
        router.push("/")
      }
    }, [])

    return (
      <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        title="ADVICER - DAILY REPORT"
        style={{ width: '100%', height: '100%' }}
        src="https://app.powerbi.com/view?r=eyJrIjoiYjYxMGZjZDMtNzJiNi00MjY0LTgyOTAtYThlOTkzYWRmYmYxIiwidCI6ImQyYzk2N2U2LTRmYzctNDUyYy05ZTc5LWY3OGM2OGNjZjkxNSJ9"
        allowFullScreen
      ></iframe>
    </div>
    )
  };
  
  export default Dashboard;