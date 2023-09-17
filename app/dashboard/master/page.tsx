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
        title="Master daily report"
        style={{ width: '100%', height: '100%' }}
        src="https://app.powerbi.com/reportEmbed?reportId=ae359a0e-529d-42c3-b5f3-de474f0efef0&autoAuth=true&ctid=d2c967e6-4fc7-452c-9e79-f78c68ccf915"
        allowFullScreen
      ></iframe>
    </div>
    )
  };
  
  export default Dashboard;