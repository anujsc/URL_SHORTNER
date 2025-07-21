
import axiosInstance from "../utils/axiosInstance"

export const createShortUrl = async (url,slug) =>{
    console.log(url, slug)
    const {data} = await axiosInstance.post("/api",{url,slug})
    console.log(data)
    return data.shortUrl
}