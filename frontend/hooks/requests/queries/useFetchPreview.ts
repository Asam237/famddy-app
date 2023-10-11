import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const fetchLinkPreview = async (url: string) => {
    let res = await axios.get(`/api/link-preview?url=${url}`);
    return res.data;
};

export const useFetchPreview = (url: string) => {
    return useQuery({
        queryKey: ["previewData"],
        queryFn: () => {
            return fetchLinkPreview(url);
        }
    })
}