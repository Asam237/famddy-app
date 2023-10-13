import {FaBars} from "react-icons/fa";
import Link from "next/link";
import {navs} from "../../utils/consts";

const HeaderPrimary = () => {
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
                            {navs.map((item, index) => {
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
                    <FaBars size={26} className={'text-gray-700 flex xl:hidden'}/>
                </div>
            </div>
        </header>
    );
};

export default HeaderPrimary;

