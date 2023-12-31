import {LoginUserInput} from "../../../typings";
import {loginUser} from "../../useAxios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useAuth} from "../../useAuth";
import {mutations} from "../../../utils/consts";

export const useLoginUser = () => {
    const queryClient = useQueryClient();
    const {saveToken} = useAuth();
    return useMutation({
        mutationKey: [mutations.userInfo],
        mutationFn: async (data: LoginUserInput) => {
            const res = await loginUser({...data});
            saveToken(res?.data?.user._id, res?.data?.user.auth_token);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["user"])
        }
    })
}