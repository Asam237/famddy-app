import DashboardLayout from "../layout/dashboard";
import CardPreview from "../../components/CardPreview";
import {useFindShortener} from "../../hooks/requests/queries/useShortener";
import {useState} from "react";
import 'react-loading-skeleton/dist/skeleton.css';
import DialogComponent from "../../components/Dialog";

const Dashboard = () => {

    const {data, isLoading} = useFindShortener();
    const [filteredList, setFilteredList] = useState(data?.shorteners);
    const linkType: any = [];

    const filterBySearch = (e: any) => {
        const query = e.target.value;
        let updateList = [data?.shorteners];
        updateList.filter((item: any) => {
            return item.longUrl?.toLowerCase().indexOf(query.toLowerCase()) != -1
        });
        setFilteredList(updateList);
    }
    filteredList?.forEach((i: any) => {
        linkType.push(i.longUrl)
    })

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
                        {/*<TextField.Root>*/}
                        {/*    <TextField.Slot>*/}
                        {/*        <FaSearch size={14}/>*/}
                        {/*    </TextField.Slot>*/}
                        {/*    <TextField.Input onChange={filterBySearch} placeholder="Search the link..."/>*/}
                        {/*</TextField.Root>*/}
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