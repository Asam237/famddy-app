import {api} from "../../useAxios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {mutations, queries} from "../../../utils/consts";

const deleteShortener = async (id: string) => {
    return await api.delete(`/shorteners/${id}`);
}

export const useDeleteShortener = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [mutations.shortenerUser],
        mutationFn: async (id: string) => {
            return await deleteShortener(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries([queries.shortenerOfUser])
        }
    });
}