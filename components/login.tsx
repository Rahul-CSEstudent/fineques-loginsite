"use client";
import React, { useState } from 'react';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';
import { pb } from "@/components/config/pocketbase";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    pb.collection("users").authWithPassword(email, password).then((authData)=>{
      console.log("from auth page", authData.record);
      toast({
        variant: "default",
        title: "Logged in successfully"
      })
      router.refresh();
    }).catch((err)=>{
      console.log("from auth page", err);
      toast({
        variant: "destructive",
        title: "Cannot log in",
        description: "kindly, check your mail id and password"
      })
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img src="./finequslogo.png" alt="logo"></img>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white rounded-lg py-2 font-semibold hover:bg-indigo-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        <span></span>
      </div>
    </div>
  );
};

export default Login;
