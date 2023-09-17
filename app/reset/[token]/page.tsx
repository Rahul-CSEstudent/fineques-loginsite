"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { pb } from "@/components/config/pocketbase";


export default function Page({ params }: { params: { token: string } }){
    const [password, setPassword] = useState<string>("");
    const [retypePassword, setRetypePassword] = useState<string>("");

  
    const { toast } = useToast()
    const router = useRouter()
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      pb.collection("users").confirmPasswordReset(
        params.token,
        password,
        retypePassword
      ).then(()=>{
        console.log("password change successfull");
        toast({
            variant: "default",
            title: "Password reset successfull"
        })
      }).catch((err)=>{
        console.log("error updating the password", err)
        toast({
            variant: "destructive",
            title: "Oops! something went wrong",
            description: "Kindly, check if your passwords match"
        })
      })
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img src="/finequslogo.png" alt="logo"></img>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Retype Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white rounded-lg py-2 font-semibold hover:bg-indigo-600 transition duration-300"
            >
              Reset Password
            </button>
          </div>
        </form>
        <span></span>
      </div>
    </div>
    )
}