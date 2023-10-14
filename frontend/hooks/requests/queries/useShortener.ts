import {useQuery} from "@tanstack/react-query";
import {api} from "../../useAxios";
import {queries} from "../../../utils/consts";

const shortener = async () => {
    return await api.get("/shorteners");
}

export const useFindShortener = () => {
    return useQuery({
        queryKey: [queries.shortenerUser],
        queryFn: async () => {
            const res = await shortener();
            return res.data;
        }
    });
}