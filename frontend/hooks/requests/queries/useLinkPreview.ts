import {useQuery} from "@tanstack/react-query";
import {fetchLinkPreview} from "../../useAxios";

export const useLinkPreview = (link: string) => {
    return useQuery({
        queryKey: ["preview"],
        queryFn: async () => {
            const res = await fetchLinkPreview(link);
            return res.data;
        }
    })
}