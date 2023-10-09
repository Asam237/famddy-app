import {useQuery} from "@tanstack/react-query";
import {findShortenerLink} from "../../useAxios";

export const useShortener = () => {
    return useQuery({
        queryKey: ["findShortener"],
        queryFn: async () => {
            const res = await findShortenerLink();
            return res.data;
        }
    });
}