import {api} from "../../useAxios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {EditShortenerInput} from "../../../components/EditShortener";
import {queries} from "../../../utils/consts";
import {toast} from "react-toastify";


const editShortener = async (id: string, longUrl: string) => {
    const res = await api.patch(`/shorteners/${id}`, {longUrl});
    return res.data;
}

export const useEditShortener = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["shortenerUser"],
        mutationFn: async (input: EditShortenerInput) => {
            await editShortener(id, input.longUrl);
        },
        onSuccess: () => {
            queryClient.invalidateQueries([queries.shortenerOfUser])
            toast.success("Link changed with success");
        }
    })
}
