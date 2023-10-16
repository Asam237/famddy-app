import {FaBars, FaTimes} from "react-icons/fa";
import Link from "next/link";
import {navs} from "../../utils/consts";
import {useState} from "react";

const HeaderPrimary = () => {
    const [nav, setNav] = useState(false);

    return (
        <header className={'border-b bg-white z-10 sticky left-0 top-0'}>
            <div className="container mx-auto py-4">
                <div className="flex justify-between items-center">
                    <div className={'flex items-center'}>
                        <Link href={"/"}>
                            <h4 className={'ml-4 text-2xl font-[700] text-gray-700 cursor-pointer hover:underline underline-offset-4'}>Famddy</h4>
                        </Link>
                    </div>
                    <div className={"hidden xl:flex justify-center items-center space-x-4"}>
                        <ul className={"flex space-x-4"}>
                            {navs.map((item) => {
                                return (
                                    <li key={item.path} className={"text-sm text-gray-700"}>
                                        <Link href={item.path}>{item.name}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <Link
                            href={"/signin"}
                            className={'bg-violet-100 border-2 rounded-full px-4 py-1 text-violet-700 font-semibold text-sm'}>
                            Sign in
                        </Link>
                    </div>
                    <FaBars onClick={() => setNav(!nav)} size={26} className={`text-gray-700 ${nav ? 'hidden': 'flex xl:hidden'}`}/>
                    <FaTimes
                        size={30}
                        className={`${!nav ? 'hidden': 'flex'}`}
                        onClick={() => setNav(!nav)}
                    />
                </div>
            </div>

            {
                nav == true && (
                    <div className={'container mx-auto'}>
                        <ul className={"flex space-y-4 flex-col justify-center items-end mb-4"}>
                            {navs.map((item) => {
                                return (
                                    <li key={item.path} className={"text-sm text-gray-700"}>
                                        <Link href={item.path}>{item.name}</Link>
                                    </li>
                                );
                            })}
                            <Link
                                href={"/signin"}
                                className={'bg-violet-100 border-2 rounded-full px-4 py-1 text-violet-700 font-semibold text-sm'}>
                                Sign in
                            </Link>
                        </ul>
                    </div>
                )
            }
        </header>
    );
};

export default HeaderPrimary;

