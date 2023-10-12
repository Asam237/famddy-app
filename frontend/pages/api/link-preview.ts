import axios from "axios"
import {CheerioAPI, load} from "cheerio"

export default async function handler(req: any, res: any): Promise<void> {
    try {
        const {url} = req.query
        const {data} = await axios.get(url)
        const $: CheerioAPI = load(data)

        const getMetaTag = (name: any) => {
            return (
                $(`meta[name=${name}]`).attr("content") ||
                $(`meta[property="twitter:${name}"]`).attr("content") ||
                $(`meta[property="og:${name}"]`).attr("content")
            )
        }

        const preview = {
            url,
            title: $("title").first().text(),
            favicon:
                $('link[rel="shortcut icon"]').attr("href") ||
                $('link[rel="alternate icon"]').attr("href"),
            description: getMetaTag("description"),
            image: getMetaTag("image"),
            author: getMetaTag("author"),
        }
        res.status(200).json(preview)
    } catch (error) {
        res
            .status(500)
            .json(
                "Something went wrong, please check your internet connection and also the URL you provided"
            )
    }
}