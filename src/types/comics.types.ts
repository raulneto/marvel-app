export type TComicsCard = {
    id: string;
    image: string;
    title: string;
}

export type TComics = {
    comics: TComicsCard[];
    isLastPage: boolean;
}

export type TComicsApiResponse = {
    data: TComicsApiDataResponse;
}

export type TComicsApiDataResponse = {
    offset: number;
    total: number;
    results: TComicsApiResultResponse[];
}

export type TComicsApiResultResponse = {
    id: number;
    thumbnail: TComicsApiThumbnailResponse;
    title: string;
}

export type TComicsApiThumbnailResponse = {
    extension: string;
    path: number;
}

