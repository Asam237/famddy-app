import DashboardLayout from "../layout/dashboard";
import {Flex, TextField} from "@radix-ui/themes";
import {FaSearch} from "react-icons/fa";
import {ShortenerInput} from "../../typings";
import CardPreview from "../../components/CardPreview";
import {useFindShortener} from "../../hooks/requests/queries/useShortener";

const Dashboard = () => {

    const {data, isLoading} = useFindShortener();

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
                        {
                            data?.shorteners?.map((item: ShortenerInput) => {
                                return (
                                    <CardPreview key={item.longUrl} longUrl={item.longUrl}/>
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