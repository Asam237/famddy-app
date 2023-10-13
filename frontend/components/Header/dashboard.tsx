import {FaUser} from "react-icons/fa";
import {useMe} from "../../hooks/requests/queries/useMe";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";

const HeaderDashboard = () => {
        const {data} = useMe();
        const router = useRouter();
        const [location, setLocation] = useState("");
        const toHome = () => {
            router.push("/");
        }
        useEffect(() => {
            setLocation(window.location.pathname);
        }, []);
        return (
            <header className={'border-b shadow-sm bg-white z-10 sticky left-0 top-0'}>
                <div className="container mx-auto py-4">
                    <div className="flex justify-between items-center">
                        <div className={'flex items-center'}>
                            <h4 className={'ml-4 text-2xl font-[900] text-gray-700 font-[Arial]'}>Famddy</h4>
                        </div>
                        <div className={'flex justify-center items-center space-x-4'}>
                            <div className={'flex justify-center'}>
                                <FaUser size={20} className={'text-gray-700 mr-2'}/>
                                <h1 className={'text-gray-700 text-lg font-semibold'}>{data?.user?.full_name}</h1>
                            </div>
                            <div className={`${location === "/" ? 'flex' : 'hidden'}`}>
                                <Link href={"/dashboard"}>
                                    <button
                                        className={'bg-violet-700 rounded-md text-center text-white px-4 py-2'}>Dashboard
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
;

export default HeaderDashboard;

