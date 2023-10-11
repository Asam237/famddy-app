// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";
import {api} from "../../hooks/useAxios";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const fetchPost = await api.get("https://jsonplaceholder.typicode.com/posts");
    const data = fetchPost.data;

    res.status(200).json(data);
}
