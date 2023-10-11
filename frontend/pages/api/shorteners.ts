import {NextApiRequest, NextApiResponse} from "next";
import {generate} from "shortid";

const BASE_URL = "http://localhost/"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const longUrl = req.body.longUrl;
        if (longUrl == null) {
            return res.status(400).send("INVALID PARAMS");
        }
        let createdShortener = {
            shortUrl: BASE_URL + generate()
        }
        return res.status(200).send(createdShortener);
    }
}