import DashboardLayout from "../layout/dashboard";
import DialogComponent from "../../components/Dialog";
import {useShortenerOfuser} from "../../hooks/requests/queries/useShortenerOfUser";
import 'react-loading-skeleton/dist/skeleton.css';
import Image from "next/image";
import {Text} from "@radix-ui/themes"
import {EmptyBox} from "../../utils/images";
import CardComponent from "../../components/Card";
import {CardComponentType} from "../../typings";

const Dashboard = () => {

    const {data} = useShortenerOfuser();

    return (
        <DashboardLayout>
            <div className={"py-8"}>
                <div className="container mx-auto">
                    <div
                        className={
                            "flex flex-col xl:flex-row xl:justify-between items-center space-y-4 xl:space-y-0 py-4"
                        }
                    >
                        <h4 className={"text-center text-3xl font-semibold"}>
                            All <span className={"bg-violet-700 text-white px-2 py-1"}>links</span> are saved.
                        </h4>
                        <DialogComponent title={"Add new link"}
                                         description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
                                         label={"link"}/>
                    </div>
                    <hr/>
                    {
                        data?.shorteners.length == 0 &&
                        <div className={'w-full'}>
                            <div className={'container mx-auto'}>
                                <div className="flex justify-center items-center my-10 flex-col space-y-4">
                                    <Image src={EmptyBox} alt={"image"} className={'h-48 w-auto'}/>
                                    <Text color="gray" size="6">Empty link</Text>
                                </div>
                            </div>
                        </div>
                    }
                    <div
                        className={"my-10 grid gap-x-4 gap-y-6 grid-cols-1"}
                    >
                        {
                            data?.shorteners.map((item: CardComponentType) => {
                                return (
                                    <CardComponent key={item._id} _id={item._id} longUrl={item.longUrl}
                                                   updated_at={item.updated_at}
                                                   shortUrl={item.shortUrl}/>)
                            })
                        }
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;