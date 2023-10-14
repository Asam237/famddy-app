import {registerUser} from "../../useAxios";
import {CreateUserInput} from "../../../typings";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {mutations} from "../../../utils/consts";

export const useRegisterUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [mutations.createUser],
        mutationFn: async (data: CreateUserInput) => {
            await registerUser({...data});
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["create"])
        }
    })
}