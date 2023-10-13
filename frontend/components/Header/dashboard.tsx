import {useMe} from "../../hooks/requests/queries/useMe";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";
import DropDown from "../DropDown";

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
                            <Link href={"/"}>
                                <h4 className={'ml-4 text-2xl font-[700] text-gray-700 cursor-pointer hover:underline hover:underline-offset-4'}>Famddy</h4>
                            </Link>
                        </div>
                        <div className={'flex justify-center items-center space-x-4'}>
                            <DropDown name={data?.user?.full_name}/>
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

