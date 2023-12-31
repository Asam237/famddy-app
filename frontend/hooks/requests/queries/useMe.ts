import {useQuery} from "@tanstack/react-query";
import {useAuth} from "../../useAuth";
import {me} from "../../useAxios";
import {queries} from "../../../utils/consts";

export const useMe = () => {
    const {uid} = useAuth();
    return useQuery({
        queryKey: [queries.userMe],
        queryFn: async () => {
            const res = await me(uid);
            return res.data;
        }
    });
}