import {Card, Text} from "@radix-ui/themes";
import {FaClock, FaCopy, FaEllipsisV} from "react-icons/fa";
import {useFetchPreview} from "../../hooks/requests/queries/useFetchPreview";
import Skeleton from "react-loading-skeleton";
import {joined} from "../../utils/current-date";
import {CardComponentType} from "../../typings";


const CardComponent = ({longUrl, date, _id, shortUrl}: CardComponentType) => {

    const {data} = useFetchPreview(longUrl);

    if (!data) {
        return (
            <>
                <Skeleton className="mb-2 h-52 w-full bg-slate-200 dark:bg-slate-800"/>
            </>
        )
    }

    return (
        <Card key={_id} asChild className={"w-full"}>
            <div>
                <div className={"flex flex-col lg:flex-row lg:justify-between p-4"}>
                    <div className={'flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4'}>
                        <img
                            className="h-40 w-40 object-cover rounded-xl"
                            src={data?.image}
                            alt={data?.title}
                        />
                        <div className={"flex flex-col space-y-2"}>
                            <div>
                                <Text as="div" size="4" weight="bold">
                                    {data?.title}
                                </Text>
                                <Text as="div" color="blue" size="2" className={"pt-2 font-semibold"}>
                                    {data?.url}
                                </Text>
                                <Text as="div" color="gray" size="2" className={"pt-1 font-semibold"}>
                                    {shortUrl}
                                </Text>
                            </div>
                            <div className={"flex items-center space-x-2"}>
                                <FaClock color={"gray"}/>
                                <p className={'text-gray-500 text-xs'}>
                                    {joined(date!!)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={'mt-4 lg:mt-0'}>
                        <div className={'flex items-center space-x-2'}>
                            <div
                                className={"flex space-x-2 items-center border rounded-md w-20 justify-center px-3 bg-gray-200 py-2"}>
                                <FaCopy color={"gray"} size={14}/>
                                <p className={"text-sm font-medium"}>Copy</p>
                            </div>
                            <div className={'hidden lg:flex'}>
                                <FaEllipsisV/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CardComponent;