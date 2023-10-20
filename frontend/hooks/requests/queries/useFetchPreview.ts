import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const fetchLinkPreview = async (url: string) => {
    let fullUrl = "/api/link-preview?url=" + url;
    let res = await axios.get(fullUrl);
    return res.data;
};

export const useFetchPreview = (url: string) => {
    return useQuery({
        queryKey: ["fetchPreview", { url }],
        queryFn: async () => {
            return await fetchLinkPreview(url);
        }
    })
}