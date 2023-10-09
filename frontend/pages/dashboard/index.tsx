import DashboardLayout from "../layout/dashboard";
import {Box, Card, Flex, TextField} from "@radix-ui/themes";
import {FaSearch} from "react-icons/fa";
import {useShortener} from "../../hooks/requests/queries/useShortener";
import {ShortenerInput} from "../../typings";
import {cleanText} from "../../utils/helpers";

const Dashboard = () => {

    const {data} = useShortener();


    return (
        <DashboardLayout>
            <div className={"py-8"}>
                <div className="container mx-auto">
                    <div
                        className={
                            "flex flex-col xl:flex-row xl:justify-between items-center space-y-4 xl:space-y-0"
                        }
                    >
                        <h4 className={"text-center text-3xl font-semibold"}>
                            Tous les <span className={"bg-violet-700 text-white px-2 py-1"}>liens</span> sauvegardes.
                        </h4>
                        <Flex direction="column" gap="3" style={{maxWidth: 400}}>
                            <TextField.Root size="3">
                                <TextField.Slot>
                                    <FaSearch size={16} color="gray"/>
                                </TextField.Slot>
                                <TextField.Input placeholder="Rechercher un profile ..."/>
                            </TextField.Root>
                        </Flex>
                    </div>


                    <div
                        className={
                            "my-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        }
                    >
                        {/*<img*/}
                        {/*    className="h-full w-full object-cover"*/}
                        {/*    src={preview?.image}*/}
                        {/*    alt={preview?.title}*/}
                        {/*/>*/}
                        {
                            data?.shorteners?.map((item: ShortenerInput, index: number) => {
                                return (<Card key={index} className={"h-64 bg-red-400 shadow-xl"}>
                                        <Flex ml="3" gap="3" align="center" className={'h-2/3'}>
                                            <Box className={'h-1/2'}>
                                                {/*<img*/}
                                                {/*    className="h-full w-full object-cover"*/}
                                                {/*    src={preview?.image}*/}
                                                {/*    alt={preview?.title}*/}
                                                {/*/>*/}
                                            </Box>
                                        </Flex>
                                        <Box p={"3"} className={'h-1/3'}>
                                            <hr className={'my-4'}/>
                                            <p className={'text-xs'}>{cleanText(item.longUrl, 100)}</p>
                                        </Box>
                                    </Card>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;