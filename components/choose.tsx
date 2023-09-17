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
    const [showModal, setShowModal] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    const handlePasswordChange = async () => {

    }
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex flex-wrap gap-4 justify-center items-center">
                <button 
                    className="absolute top-0 right-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowModal(true)}
                >
                    Change Password
                </button>
                {showModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                Change Password
                                            </h3>
                                            <div className="mt-2">
                                                <input 
                                                    type="email" 
                                                    placeholder="Email" 
                                                    value={email} 
                                                    onChange={(e) => setEmail(e.target.value)} 
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                                <input 
                                                    type="password" 
                                                    placeholder="Current Password" 
                                                    value={currentPassword} 
                                                    onChange={(e) => setCurrentPassword(e.target.value)} 
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                                />
                                                <input 
                                                    type="password" 
                                                    placeholder="New Password" 
                                                    value={newPassword} 
                                                    onChange={(e) => setNewPassword(e.target.value)} 
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button 
                                        type="button" 
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={handlePasswordChange}
                                    >
                                        Save
                                    </button>
                                    <button 
                                        type="button" 
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                    <ChoiceCard
                        title={choices[2].title}
                        url={choices[2].page}
                        content="To view the master report containing all the data"
                        icon={<MSquare size={30} />}
                    />
                </div>
            </div>
        </div>
    )
}