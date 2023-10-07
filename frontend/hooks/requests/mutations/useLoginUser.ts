import {LoginUserInput} from "../../../typings";
import {loginUser} from "../../useAxios";
import {useQueryClient, useMutation} from "@tanstack/react-query";

export const useLoginUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["user"],
        mutationFn: async (data: LoginUserInput) => {
            await loginUser({...data});
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["user"])
        }
    })
}