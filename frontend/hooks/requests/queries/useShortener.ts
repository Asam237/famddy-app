import {useQuery} from "@tanstack/react-query";
import {api} from "../../useAxios";

const shortener = async () => {
    return await api.get("/shorteners");
}

export const useFindShortener = () => {
    return useQuery({
        queryKey: ["findShortener"],
        queryFn: async () => {
            const res = await shortener();
            return res.data;
        }
    });
}