import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ShortenerInput} from "../../../typings";
import {api} from "../../useAxios";
import {useCookies} from "react-cookie";


const shortener = async (data: ShortenerInput) => {
    const res = await api.post("/shorteners", data);
    return res.data;
}

export const useShortener = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['shortUrl']);
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["shortener"],
        mutationFn: async (input: ShortenerInput) => {
            const value = await shortener({...input});
            return value;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["shortener"])
        }
    });
}