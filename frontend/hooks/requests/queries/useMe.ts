import {useQuery} from "@tanstack/react-query";
import {useAuth} from "../../useAuth";
import {me} from "../../useAxios";

export const useMe = () => {
    const {uid} = useAuth();
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await me(uid);
            return res.data;
        }
    });
}