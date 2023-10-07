import {registerUser} from "../../useAxios";
import {CreateUserInput} from "../../../typings";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useRegisterUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["user"],
        mutationFn: async (data: CreateUserInput) => {
            await registerUser({...data});
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["user"])
        }
    })
}