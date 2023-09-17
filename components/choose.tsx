"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Home, MSquare, LineChart, ChevronRight } from "lucide-react";
import { IChoice, choices } from "@/components/config/choice";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { pb } from "./config/pocketbase";
import { useToast } from "@/components/ui/use-toast"

interface ChoiceCardProps {
    title: string,
    url: string,
    content: string,
    icon: JSX.Element,
}
export function ChoiceCard(props: ChoiceCardProps) {

    const router = useRouter();
    
    return (
        <Card onClick={() => router.push(props.url)} className="md:max-w-xs cursor-pointer group">
            <CardHeader className="flex gap-3 items-center flex-row">
                <span>{props.icon}</span>
                <span className="text-lg font-bold">{props.title}</span>
            </CardHeader>
            <CardContent className="text-slate-600 text-justify line-clamp-3">
                {props.content}
            </CardContent>
            <CardFooter className="flex justify-end">
                <div className="group-hover:translate-x-2 transition-transform">
                    <ChevronRight />
                </div>
            </CardFooter>
        </Card>
    )
}

export default function ChoiceList() {

    const { toast } = useToast();
    const router = useRouter();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    const requestPasswordChange = async () => {
        if(pb.authStore.model){
            console.log(pb.authStore.model.email)
            pb.collection("users").requestPasswordReset(pb.authStore.model.email).catch((err)=>{
                console.log("error requesting password reset ", err )
                toast({
                    variant: "destructive",
                    title: "Oops!",
                    description: "cannot reset password. kindly try again later"
                  })
            }).then((value)=>{
                if (value){
                    toast({
                        title: "Sent the password reset link to your mail address",
                    })
                }else{
                    toast({
                        variant: "destructive",
                        title: "Oops! Can't send mail",
                        description: "This is on us. Please contact the support team"
                    })
                }
            })
        }
    }

    const signout = async () => {
        pb.authStore.clear()
        router.refresh();
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex flex-wrap gap-4 justify-center items-center">
                <button 
                    className="absolute top-0 right-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={requestPasswordChange}
                >
                    Reset Password
                </button>

                <button 
                    className="absolute bottom-0 right-0 m-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={signout}
                >
                    Sign Out
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
                    <ChoiceCard
                        title={choices[0].title}
                        url={choices[0].page}
                        content="To view the general analytics of all the channels in the dashboard"
                        icon={<Home size={30} />}
                    />
                    <ChoiceCard
                        title={choices[1].title}
                        url={choices[1].page}
                        content="To view the content for advisor daily report in the dashboard"
                        icon={<LineChart size={30} />}
                    />
                    {/* <ChoiceCard
                        title={choices[2].title}
                        url={choices[2].page}
                        content="To view the master report containing all the data"
                        icon={<MSquare size={30} />}
                    /> */}
                </div>
            </div>
        </div>
    )
}