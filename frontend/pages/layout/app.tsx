import Head from "next/head";
import Header from "../../components/Header";
import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa";
import Link from "next/link";

const AppLayout = ({children}: any) => {
    const links = [
        {
            path: "",
            icon: <FaTwitter size={24} className={'text-gray-500 hover:text-blue-700'}/>
        },
        {
            path: "",
            icon: <FaLinkedin size={24} className={'text-gray-500 hover:text-blue-700'}/>
        },
        {
            path: "",
            icon: <FaFacebook size={24} className={'text-gray-500 hover:text-blue-700'}/>
        },
        {
            path: "",
            icon: <FaInstagram size={24} className={'text-gray-500 hover:text-orange-700'}/>
        },
    ];
    return (
        <>
            <Head>
                <title>Free URL Shortener</title>
                <meta name="description" content=""/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            {children}
            <footer className={'border-t'}>
                <div className="container mx-auto py-4">
                    <div className="flex items-center justify-between">
                        <p className={'text-center py-2 text-base text-gray-500'}>© {new Date().getFullYear()} Famddy.
                            All rights reserved.</p>
                        <div className={'flex space-x-5'}>
                            {
                                links.map((item, index) => {
                                    return (
                                        <Link key={index} href={item.path}>{item.icon}</Link>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default AppLayout;