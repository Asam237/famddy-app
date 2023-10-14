import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ShortenerInput} from "../../../typings";
import {api} from "../../useAxios";
import {useCookies} from "react-cookie";
import {mutations} from "../../../utils/consts";


const shortener = async (data: ShortenerInput) => {
    const res = await api.post("/shorteners", data);
    return res.data;
}

export const useShortener = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['shortUrl']);
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [mutations.shortenerUser],
        mutationFn: async (input: ShortenerInput) => {
            return await shortener({...input});
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["shortener"])
        }
    });
}