import {api} from "../../useAxios";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "../../useAuth";
import {queries} from "../../../utils/consts";

const shortenerOfUser = (id: string) => {
    return api.get(`shorteners/of/${id}`);
}

export const useShortenerOfuser = () => {
    const {uid} = useAuth();
    return useQuery({
        queryKey: [queries.shortenerOfUser],
        queryFn: async () => {
            const res = await shortenerOfUser(uid)
            return res.data;
        }
    });
}
