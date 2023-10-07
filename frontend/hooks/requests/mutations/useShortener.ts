import {useMutation, useQueryClient} from "@tanstack/react-query";
import {shortenerLink} from "../../useAxios";
import {ShortenerInput} from "../../../typings";

export const useShortener = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["shortener"],
        mutationFn: async (data: ShortenerInput) => {
            await shortenerLink({...data})
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["shortener"])
        }
    });
}