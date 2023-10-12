import {Box, Card, Flex} from "@radix-ui/themes";
import {cleanText} from "../../utils/helpers";
import {useFetchPreview} from "../../hooks/requests/queries/useFetchPreview";
import {AiOutlineLink} from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import Link from "next/link";


const CardPreview = ({longUrl}: { longUrl: string }) => {

    const {data, isLoading} = useFetchPreview(longUrl);
    if (!data) {
        return (
            <>
                <Skeleton className="mb-2 h-52 w-full bg-slate-200 dark:bg-slate-800"/>
            </>
        )
    }

    return (
        <Card className={"h-64 bg-red-400 shadow-xl"}>
            <Flex ml="3" gap="3" align="center" className={'h-2/3'}>
                <img
                    className="h-full w-full object-cover"
                    src={data?.image}
                    alt={data?.title}
                />
            </Flex>
            <Box p={"3"} className={'h-1/3'}>
                <hr className={'my-4'}/>
                <div className={'flex justify-between items-center'}>
                    <p className={'text-xs'}>{cleanText(longUrl, 30)}</p>
                    <Link href={longUrl} target={'_blank'}>
                        <AiOutlineLink className={'text-red-800 cursor-pointer'}/>
                    </Link>
                </div>
            </Box>
        </Card>
    );
}
export default CardPreview;