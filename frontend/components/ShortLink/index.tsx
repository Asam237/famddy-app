import {AlertDialog, TextField} from "@radix-ui/themes";
import {FaChrome, FaCopy, FaLink, FaQrcode, FaSave} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import {cleanText} from "../../utils/helpers";
import Link from "next/link";
import {useShortener} from "../../hooks/requests/mutations/useShortener";
import {SubmitHandler, useForm} from "react-hook-form";
import {ShortenerInput} from "../../typings";
import {useAuth} from "../../hooks/useAuth";
import {toast} from "react-toastify";
import {useQRCode} from "next-qrcode";
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'next-share';

const ShortLink = () => {
    const {data, mutate: createShortener, isLoading} = useShortener();
    const {handleSubmit, formState: {errors}, register} = useForm<ShortenerInput>();
    const {Image} = useQRCode();
    const handlerShortener: SubmitHandler<ShortenerInput> = (data: ShortenerInput) => {
        createShortener({...data});
    }
    const {uid} = useAuth();
    const copyToClipboard = () => {
        const copyText: any = window.document.getElementById("myInput");
        copyText?.select();
        copyText?.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText?.value);
        toast.success("Copy to clipboard");
    };

    return (
        <>
            <form
                className={'pt-7 max-w-3xl mx-auto w-full flex space-y-4 xl:space-y-0 xl:space-x-4 flex-col xl:flex-row justify-center items-center'}
                onSubmit={handleSubmit(handlerShortener)}>
                <TextField.Root size="3" className={'w-full xl:w-3/4'}>
                    <TextField.Slot>
                        <FaLink/>
                    </TextField.Slot>
                    <TextField.Input pattern="https?://.*" {...register("longUrl")}
                                     placeholder="Enter link here..." required
                                     title="Enter a link starting with http or https"/>
                </TextField.Root>
                <button type="submit"
                        className={'bg-violet-700 rounded-md text-center text-white px-4 py-2'}>Shorten
                    URL
                </button>
            </form>
            {
                isLoading &&
                <div className={'container mx-auto xl:max-w-4xl mt-8'}>
                    <Skeleton className="mb-2 h-10 w-10 mx-auto bg-slate-200 dark:bg-slate-800"/>
                </div>
            }
            {data?.shortener?.shortUrl.length > 5 &&
                <div className={'container mx-auto xl:max-w-4xl'}>
                    <div
                        className={"flex justify-center items-center px-4 py-6 my-4 rounded-md xl:my-8 bg-violet-100 flex-col"}>
                        <input
                            className={`text-gray-700 text-sm font-semibold flex items-center`}
                            value={cleanText(data?.shortener?.shortUrl, 20)}
                            placeholder={cleanText(data?.shortener?.shortUrl, 10)}
                            disabled
                        />
                        <input
                            className={`text-gray-700 text-sm font-semibold items-center hidden`}
                            id="myInput"
                            value={data?.shortener?.shortUrl}
                            placeholder={data?.shortener?.shortUrl}
                            disabled
                        />
                        <div className={'mt-4 flex flex-row justify-center items-center space-x-5'}>
                            <AlertDialog.Root>
                                <AlertDialog.Trigger>
                                    <FaQrcode
                                        size={24}
                                        className={'cursor-pointer text-gray-700 hover:text-violet-700'}/>
                                </AlertDialog.Trigger>
                                <AlertDialog.Content style={{maxWidth: 450}}>
                                    <AlertDialog.Title>QR Code</AlertDialog.Title>
                                    <AlertDialog.Description size="2">
                                        <div className={'flex justify-center items-center'}>
                                            <Image
                                                text={data?.shortener?.longUrl}
                                                options={{
                                                    type: 'image/jpeg',
                                                    quality: 0.3,
                                                    errorCorrectionLevel: 'M',
                                                    margin: 3,
                                                    scale: 4,
                                                    width: 300,
                                                    color: {
                                                        dark: '#000000',
                                                        light: '#ffffff',
                                                    },
                                                }}
                                            />
                                        </div>
                                    </AlertDialog.Description>
                                    <div className={'flex items-center justify-center space-x-3 py-2'}>
                                        <LinkedinShareButton
                                            url={data?.shortener?.shortUrl}>
                                            <LinkedinIcon size={32} round/>
                                        </LinkedinShareButton>
                                        <TwitterShareButton
                                            url={data?.shortener?.shortUrl}>
                                            <TwitterIcon size={32} round/>
                                        </TwitterShareButton>
                                        <FacebookShareButton
                                            url={data?.shortener?.shortUrl}>
                                            <FacebookIcon size={32} round/>
                                        </FacebookShareButton>
                                        <TelegramShareButton
                                            url={data?.shortener?.shortUrl}>
                                            <TelegramIcon size={32} round/>
                                        </TelegramShareButton>
                                        <WhatsappShareButton
                                            url={data?.shortener?.shortUrl}>
                                            <WhatsappIcon size={32} round/>
                                        </WhatsappShareButton>
                                    </div>
                                </AlertDialog.Content>
                            </AlertDialog.Root>
                            <FaCopy
                                size={24}
                                onClick={() => copyToClipboard()}
                                className={'cursor-pointer text-gray-700 hover:text-violet-700'}/>
                            <Link href={data?.shortener?.shortUrl}>
                                <FaChrome size={24}
                                          className={'cursor-pointer text-gray-700 hover:text-violet-700'}/>
                            </Link>
                            <Link href={"/sign_in"}>
                                <FaSave size={24}
                                        className={'cursor-pointer text-gray-700 hover:text-violet-700'}/>
                            </Link>
                        </div>
                    </div>
                </div>
            }
            <p className={'text-center pt-6 text-sm text-gray-700'}>By clicking Shorten URL, you agree to
                Famdy&apos;s Terms of Use, Privacy Policy and Cookie Policy</p>
        </>
    )
}
export default ShortLink;
