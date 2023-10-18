import DashboardLayout from "../layout/dashboard";
import DialogComponent from "../../components/Dialog";
import {useShortenerOfuser} from "../../hooks/requests/queries/useShortenerOfUser";
import 'react-loading-skeleton/dist/skeleton.css';
import CardComponent from "../../components/Card";

const Dashboard = () => {

    const {data, isLoading, isError} = useShortenerOfuser();

    console.log("DATA ||||||==>", data);

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
                            Tous les <span className={"bg-violet-700 text-white px-2 py-1"}>liens</span> sauvegardes.
                        </h4>
                        <DialogComponent title={"Add a link"}
                                         description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
                                         label={"link"}/>
                    </div>
                    <hr/>
                    <div
                        className={
                            "my-10 grid gap-x-4 gap-y-6 grid-cols-1"
                        }
                    >
                        {
                            data?.shorteners.map((item: any) => {
                                return (
                                    // <CardPreview key={item._id} longUrl={item.longUrl}/>
                                    <CardComponent key={item._id} longUrl={item.longUrl} date={item.updated_at}
                                                   shortUrl={item.shortUrl}/>
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