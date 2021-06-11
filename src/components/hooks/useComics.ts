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
const currentDate = new Date();
const comicsPerPage = config.PAGE_LIMIT;
const hash = md5(time + privateKey + publicKey);
const defaultParams = `&ts=${time}&apikey=${publicKey}&hash=${hash}`

const queryConfig = {
    keepPreviousData : true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
}
/**
 * Add zero to date
 * @param {number} n - Current day or month
 */
const addZero = (n: number) => {
    return n <= 9 ? '0' + n : n;
}

const currentDateFormatted = (addZero(currentDate.getDate()).toString() + '-' + (addZero(currentDate.getMonth()+1)).toString() + '-' + currentDate.getFullYear());

/**
 * Fetch Comics Api
 * If there is a search for character first get all characters id that match with search
 * Then do a request for comics based on list of characters
 * @param {number} page - Page number
 * @param {string} character - Character search string
 */
export const getComics = async (page: number, character?: string) => {
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
        `${config.API_URL}/comics?${defaultParams}&limit=${comicsPerPage}&offset=${offset}&orderBy=-onsaleDate&dateRange=1900-01-01%2C${currentDateFormatted}${charactersFilter}`
    );

    const isLastPage = (data.data.total - (offset + comicsPerPage)) <= comicsPerPage;

    return {
        comics: getComicsToCard(data),
        isLastPage
    }
};

/**
 * Query function to return comics from api
 * @param {number} page - Page number
 * @param {string} character - Character search string
 */
export const useComics = (page = 1, character?: string) => {
    return useQuery<TComics, Error>(
        ['comics', page + (character || '')], 
        () => getComics(page, character), 
        queryConfig
    );
}

/**
 * Return list of comics with only necessary data to be shown on list
 * @param {TComicsApiResponse} data - Api response
 */
export const getComicsToCard = (data: TComicsApiResponse): TComicsCard[] =>{
    return data?.data?.results?.map((comic: any) => {
        return {
            id: comic.id,
            image: getComicImage(comic.thumbnail),
            title: comic.title,
        };
    })
}

/**
 * Return thumbnail path with correct size and extension
 * @param {TComicsApiThumbnailResponse} thumbnail - Api response
 */
const getComicImage = (thumbnail: TComicsApiThumbnailResponse): string => {
    return `${thumbnail.path}/portrait_fantastic.${thumbnail.extension}`;
}

/**
 * Return list of characters ID's as string splitted by comma
 * @param {TComicsApiResponse} data - Api response
 */
const getCharactersIdSplitted = (data: TComicsApiResponse): string => {
    return data?.data?.results?.map((c: any) => c.id).join();
}

