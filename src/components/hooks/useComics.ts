import { useQuery } from "react-query";
import axios from "axios";
import md5 from "md5";
import config from "../../app.config.json"
import { 
    TComics,
    TComicsApiResponse,
    TComicsApiThumbnailResponse,
    TComicsCard,
} from '../../types/comics.types';

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
    return useQuery<TComics, Error>(
        ['comics', page + (character || '')], 
        () => getComics(page, character), 
        queryConfig
    );
}

export const getComicsToCard = (data: TComicsApiResponse): TComicsCard[] =>{
    return data?.data?.results?.map((comic: any) => {
        return {
            id: comic.id,
            image: getComicImage(comic.thumbnail),
            title: comic.title,
        };
    })
}

const getComicImage = (thumbnail: TComicsApiThumbnailResponse): string => {
    return `${thumbnail.path}/portrait_fantastic.${thumbnail.extension}`;
}

const getCharactersIdSplitted = (data: TComicsApiResponse): string => {
    return data?.data?.results?.map((c: any) => c.id).join();
}