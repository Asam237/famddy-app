import {Box, Card, Flex} from "@radix-ui/themes";
import {cleanText} from "../../utils/helpers";
import {useFetchPreview} from "../../hooks/requests/queries/useFetchPreview";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardPreview = ({longUrl}: { longUrl: string }) => {

    const {data, isLoading} = useFetchPreview(longUrl);
    if (!data) {
        return null;
    }

    return (
        <Card className={"h-64 bg-red-400 shadow-xl"}>
            <Flex ml="3" gap="3" align="center" className={'h-2/3'}>
                <Box className={'h-1/2'}>
                    {
                        isLoading ? <Skeleton/>
                            :
                            <img
                                className="h-full w-full object-cover"
                                src={data.image}
                                alt={data.title}
                            />
                    }
                </Box>
            </Flex>
            <Box p={"3"} className={'h-1/3'}>
                <hr className={'my-4'}/>
                <p className={'text-xs'}>{cleanText(longUrl, 30)}</p>
            </Box>
        </Card>
    );
}
export default CardPreview;