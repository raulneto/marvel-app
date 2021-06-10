import { useQuery } from "react-query";
import axios from "axios";
import md5 from "md5";
import config from "../../app.config.json"

const publicKey = config.MARVEL_PUBLIC_KEY;
const privateKey = config.MARVEL_PRIVATE_KEY;
const time = Date.now();
const hash = md5(time + privateKey + publicKey);

const comicsPerPage = config.PAGE_LIMIT;

const defaultParams = `&ts=${time}&apikey=${publicKey}&hash=${hash}`

const queryConfig = {
    keepPreviousData : true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
}

const getComics = async (page: number, character?: string) => {
    const offset = (page - 1) * comicsPerPage;
    let charactersFilter = '';

    if (character) {
        const { data: charactersList } = await axios.get(
            `${config.API_URL}/characters?${defaultParams}&limit=10&nameStartsWith=${character}`
        );

        const charactersSplited = getCharactersIdSplitted(charactersList);

        charactersFilter = charactersSplited ? `&characters=${charactersSplited}` : '';
    }

    const { data } = await axios.get(
        `${config.API_URL}/comics?${defaultParams}&limit=${comicsPerPage}&offset=${offset}&orderBy=-onsaleDate&dateRange=1900-01-01%2C2020-06-09${charactersFilter}`
    );

    const isLastPage = (data.data.total - (offset + comicsPerPage)) <= comicsPerPage;

    return {
        comics: getComicsToCard(data),
        isLastPage
    }
};


export function useComics(page = 1, character?: string) {
    return useQuery<any, Error>(
        ['comics', page + (character || '')], 
        () => getComics(page, character), 
        queryConfig
    );
}



// @TODO Change to const and returned type
export function getComicsToCard(data: any) {
    return data?.data?.results?.map((comic: any) => {
        return {
            title: comic.title,
            image: getComicImage(comic.thumbnail)
        };
    })
}

// @TODO Change to const and returned type
function getComicImage(thumbnail: any) {
    return `${thumbnail.path}/portrait_fantastic.${thumbnail.extension}`;
}

// @TODO Change to const and returned type
function getCharactersIdSplitted(data: any) {
    return data?.data?.results?.map((c: any) => c.id).join();
}