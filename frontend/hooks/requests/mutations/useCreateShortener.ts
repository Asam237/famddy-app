import {api} from "../../useAxios";
import {ShortenerUserInput} from "../../../typings";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useAuth} from "../../useAuth";
import {mutations, queries} from "../../../utils/consts";

const createShortener = async (data: ShortenerUserInput) => {
    const res = await api.post("/shorteners/of/user", data);
    return res.data;
}

export const useCreateShortener = () => {
    const queryClient = useQueryClient();
    const {uid} = useAuth();
    return useMutation({
        mutationKey: [mutations.shortenerUser],
        mutationFn: async (input: ShortenerUserInput) => {
            return await createShortener({
                longUrl: input.longUrl,
                user: uid
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([queries.shortenerOfUser])
        }
    })
}