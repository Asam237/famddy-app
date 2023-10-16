import DashboardLayout from "../layout/dashboard";
import CardPreview from "../../components/CardPreview";
import DialogComponent from "../../components/Dialog";
import {useShortenerOfuser} from "../../hooks/requests/queries/useShortenerOfUser";
import 'react-loading-skeleton/dist/skeleton.css';
import {useRouter} from "next/router";
import {useEffect} from "react";
import Spinner from "../../components/Spinner";

const Dashboard = () => {
    const {data, isLoading} = useShortenerOfuser();
    const {push} = useRouter();

    // useEffect(() => {
    //     if (typeof data === "undefined") {
    //         push("/home")
    //     }
    // }, []);

    if (isLoading) {
        return <Spinner />
    }

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
                            "my-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        }
                    >
                        {
                            data?.shorteners.map((item: any) => {
                                return (
                                    <CardPreview key={item._id} longUrl={item.longUrl}/>
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