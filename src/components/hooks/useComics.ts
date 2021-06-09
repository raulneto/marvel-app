import { useQuery } from "react-query";
import axios from "axios";
import md5 from "md5";
import config from "../../app.config.json"

const publicKey = config.MARVEL_PUBLIC_KEY;
const privateKey = config.MARVEL_PRIVATE_KEY;
const time = Date.now();
const hash = md5(time + privateKey + publicKey);

const comicsPerPage = config.PAGE_LIMIT;

const getComics = async (page: number) => {
    const offset = (page - 1) * comicsPerPage
    const { data } = await axios.get(
        `${config.API_URL}/comics?limit=${comicsPerPage}&offset=${offset}&dateRange=1900-01-01%2C2020-06-09&orderBy=-onsaleDate&ts=${time}&apikey=${publicKey}&hash=${hash}`
    );

    const isLastPage = (data.data.total - (offset + comicsPerPage)) <= comicsPerPage;
    
    return {
        comics: getComicsToCard(data),
        isLastPage
    }
};

export function useComics(page = 1) {
    return useQuery<any, Error>(
        ['comics', page], 
        () => getComics(page), { 
            keepPreviousData : true,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        }
    );
}

export function getComicsToCard(data: any) {
    return data?.data?.results?.map((comic: any) => {
        return {
            title: comic.title,
            image: getComicImage(comic.thumbnail)
        };
    })
}

function getComicImage(thumbnail: any) {
    return `${thumbnail.path}/portrait_fantastic.${thumbnail.extension}`;
}