import AppLayout from "./layout/app";
import {FaArrowRight, FaChrome, FaCopy, FaLink, FaSave} from "react-icons/fa";
import {TextField} from "@radix-ui/themes";
import Image from "next/image";
import {UrlPic} from "../utils/images";
import {useState} from "react";
import {api} from "../hooks/useAxios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import {cleanText} from "../utils/helpers";

export default function Index() {
    const [shortener, setShortener] = useState("");
    const [printValue, setPrintValue] = useState("");
    const [copyText, setCopyText] = useState("copy");

    const handlerShortener = async (e: any) => {
        e.preventDefault();
        await api.post("/shortener", {longUrl: shortener}).then((res) => {
            setPrintValue(res.data?.shortener?.shortUrl);
        })
    }

    const copyToClipboard = () => {
        const copyText: any = window.document.getElementById("myInput");
        copyText?.select();
        copyText?.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(copyText?.value);
        toast.success("Copy to clipboard");
        setCopyText("copied");
    };

    return (
        <AppLayout>
            <main className={"py-10 xl:py-20 bg-gradient-to-r from-gray-50 to-violet-5 px-4 xl:px-0"}>
                <div className={'flex justify-center items-center'}>
                    <p className={'text-gray-700 bg-violet-100 text-sm border-2 px-6 py-1 flex items-center justify-center rounded-full border-violet-200 text-center'}>
                        Support
                        Famddy today by sponsoring
                        <FaArrowRight className={'mx-2 text-violet-900'} size={11}/>
                    </p>
                </div>
                <div className={'pt-10 xl:pt-20'}>
                    <div className="container mx-auto">
                        <h2 className={'text-center text-3xl xl:text-4xl font-bold text-gray-700'}>A free tool to
                            shorten URLs</h2>
                        <p className={'text-center py-2 text-base text-gray-700'}>Famddy is a free URL shortening tool.
                            Create short and memorable links in seconds.</p>
                    </div>
                    <form
                        className={'pt-7 max-w-3xl mx-auto w-full flex space-y-4 xl:space-y-0 xl:space-x-4 flex-col xl:flex-row justify-center items-center'}
                        onSubmit={handlerShortener}>
                        <TextField.Root size="3" className={'w-full xl:w-3/4'}>
                            <TextField.Slot>
                                <FaLink/>
                            </TextField.Slot>
                            <TextField.Input onChange={(e) => setShortener(e.target.value)}
                                             placeholder="Enter link here..."/>
                        </TextField.Root>
                        <button type="submit"
                                className={'bg-violet-700 rounded-md text-center text-white px-4 py-2'}>Shorten
                            URL
                        </button>
                    </form>
                    {printValue.length > 5 &&
                        <div className={'container mx-auto xl:max-w-4xl'}>
                            <div
                                className={"flex justify-center items-center px-4 py-6 my-4 rounded-md xl:my-8 bg-violet-100 flex-col"}>
                                <input
                                    className={`text-gray-700 text-sm font-semibold flex items-center`}
                                    id="myInput"
                                    value={cleanText(printValue, 26)}
                                    placeholder={printValue}
                                    disabled
                                />
                                <div className={'mt-4 flex flex-row justify-center items-center space-x-5'}>
                                    <FaCopy onClick={copyToClipboard}
                                            size={24}
                                            className={'cursor-pointer text-gray-700 hover:text-violet-700'}/>
                                    <Link href={printValue}>
                                        <FaChrome size={24}
                                                  className={'cursor-pointer text-gray-700 hover:text-violet-700'}/>
                                    </Link>
                                    <Link href={"/signin"}>
                                        <FaSave size={24}
                                                className={'cursor-pointer text-gray-700 hover:text-violet-700'}/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    }
                    <p className={'text-center pt-6 text-sm text-gray-700'}>By clicking Shorten URL, you agree to
                        Famddy&apos;s Terms of Use, Privacy Policy and Cookie Policy</p>
                </div>
                <div className={'pt-10 xl:pt-20'}>
                    <div className="container mx-auto">
                        <div className="grid gap-y-4 xl:gap-y-0 xl:gap-x-4 grid-cols-1 xl:grid-cols-2 xl:h-72">
                            <div>
                                <h4 className={'text-center xl:text-start text-xl xl:text-2xl font-bold text-gray-700'}>A
                                    fast and
                                    URL shortener that is quick and easy
                                </h4>
                                <p className={'text-center xl:text-start pt-6 text-base leading-8 text-gray-700'}>
                                    A free URL shortener that can transform long and ugly links into nice, memorable,
                                    and trackable short URLs.
                                    Use it to shorten links for any social media platform, blog, SMS, email, ads, or
                                    pretty much anywhere else you want to share them. Twitter, Facebook, YouTube,
                                    Instagram, WhatsApp, emails, SMS, videos. </p>
                            </div>
                            <div className={'h-full bg-violet-200 rounded-lg flex justify-end items-center'}>
                                <Image className={'h-full object-cover w-auto'} src={UrlPic} alt="pic"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'pt-10 xl:pt-28'}>
                    <div className="container mx-auto">
                        <div className="flex justify-center items-center flex-col">
                            <h4 className={'text-3xl xl:text-4xl font-bold text-gray-700 flex justify-center items-center text-center'}>
                                What are the opinions of Famddy customers?
                            </h4>
                            <div className={"bg-violet-200 p-10 rounded-xl mt-6 xl:mt-10"}>
                                <blockquote className="text-xl font-semibold text-gray-900 dark:text-white">
                                    <svg className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                                        <path
                                            d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                                    </svg>
                                    <p className={'text-gray-700'}>
                                        The more I utilize Famddy, the more valuable it is to me. It saves me time by
                                        saving all of my information, and it gives me insight into which links are most
                                        popular and have the most clicks.
                                    </p>
                                    <p className={'mt-4 xl:mt-6 text-gray-600 text-sm font-normal'}>Abba Sali – Software
                                        Developer</p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'pt-10 xl:pt-28'}>
                    <div className="container mx-auto">
                        <div className="flex justify-center items-center flex-col">
                            <h4 className={'text-3xl xl:text-4xl font-bold text-gray-700 flex justify-center items-center text-center'}>
                                Get Started now <FaArrowRight size={22}
                                                              className={'text-gray-700 ml-2 hidden xl:flex'}/>
                            </h4>
                            <p className={'text-center py-2 text-base text-gray-700'}>
                                Try Famddy out and observe for yourself
                            </p>
                            <div className={'pt-6 grid grid-cols-1 xl:grid-cols-2 gap-y-4 xl:gap-x-6'}>
                                <button
                                    className={'bg-violet-700 border-2 rounded-full px-6 py-2 text-white font-semibold text-base'}>
                                    Get Started for free
                                </button>
                                <button
                                    className={'bg-gray-100 border rounded-full px-6 py-2 text-gray-700 font-semibold text-base border-violet-200'}>
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'pt-10 xl:pt-28'}>
                    <div className="container mx-auto border-t border-b py-8">
                        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center items-center">
                            <div>
                                <h4 className={"text-sm font-semibold text-center xl:text-start"}>Subscribe to our
                                    newsletter</h4>
                                <p className={"text-sm font-medium text-gray-600 pt-2 text-center xl:text-start"}>The
                                    latest news, articles, and
                                    resources, sent to your inbox weekly.</p>
                            </div>
                            <div
                                className={"flex flex-col xl:flex-row space-y-2 xl:space-y-0 xl:space-x-2 items-center"}>
                                <TextField.Root>
                                    <TextField.Input placeholder="Your email"/>
                                </TextField.Root>
                                <div className={'bg-violet-700 rounded-md text-center text-white px-4 py-1'}>Join in!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <ToastContainer/>
        </AppLayout>
    );
}

