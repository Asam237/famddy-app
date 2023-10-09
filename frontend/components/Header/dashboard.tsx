import {FaMagic, FaUser} from "react-icons/fa";
import {useMe} from "../../hooks/requests/queries/useMe";
import {useRouter} from "next/router";

const DashboardHeader = () => {
        const {data} = useMe();
        const router = useRouter();
        const toHome = () => {
           router.push("/");
        }
        return (
            <header className={'border-b shadow-sm bg-white z-10 sticky left-0 top-0'}>
                <div className="container mx-auto py-4">
                    <div className="flex justify-between items-center">
                        <div className={'flex items-center'}>
                            <FaMagic size={25} className={'text-violet-700'}/>
                            <h4 onClick={toHome} className={'ml-4 text-2xl font-extrabold text-gray-700 cursor-pointer'}>Famddy</h4>
                        </div>
                        <div className={'flex justify-center items-center'}>
                            <FaUser size={20} className={'text-gray-700 mr-2'} />
                            <h1 className={'text-gray-700 text-lg font-semibold'}>{data?.user?.full_name}</h1>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
;

export default DashboardHeader;

