import * as React from "react";
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './list.component.scss';
import config from "../../app.config.json"
import { CardComponent, CardPlaceHolder } from "../card/card.component";
import { useComics } from "../hooks/useComics";
import { TComicsCard } from "../../types/comics.types";

const List: React.FC<RouteComponentProps> = (props) =>  {
    const [favourites, setFavourites] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(1);
    const [character, setCharacter] = React.useState('');

    const { 
        isLoading, 
        isFetching, 
        isError, 
        data, 
        error, 
    } = useComics(page, character);

    /**
     * Verify if exists a search for character then set on state
     */
    React.useEffect(() => {
        const query = new URLSearchParams(props.location.search).get('character') || '';
        setCharacter(query);
        setPage(1);
    }, [props.location.search]);

    /**
     * Verify if exists favourites on localStorage then set on state
     */
    React.useEffect(() => {
        const favouritesFromStorage = localStorage.getItem('favourites');

        if (favouritesFromStorage) {
            setFavourites(JSON.parse(favouritesFromStorage));
        }
    }, []);

     /**
     * Set favourit comic to state and localStorage
     */
    const setFavouriteComic = (id: string, isFavourite: boolean) => {
        const newFavourites = isFavourite ? 
            favourites.filter((f) => f !== id) : 
            favourites.concat(id);

        localStorage.setItem('favourites', JSON.stringify(newFavourites));
        setFavourites(newFavourites);
    }

    if (isError) {
        return <div>Error: {error?.message}</div>
    }

    return (
        <React.Fragment>
            <div className="comics-list">
                {isFetching || isLoading || !data ? (
                    Array.from({ length: config.PAGE_LIMIT }).map((_, i) => <CardPlaceHolder key={i}/>)
                ) : (
                    data.comics?.map((card: TComicsCard) => {
                        const cardId = card.id;
                        const isFavourite = favourites.find((id) => id === cardId);
                        return (
                            <CardComponent
                                key={cardId}
                                id={cardId}
                                image={card.image} 
                                isFavourite={!!isFavourite}
                                setFavouriteComic={setFavouriteComic} 
                                title={card.title} 
                            />
                        );
                    })
                )}
            </div>
            <div className="pagination">
                <button
                    className="button"
                    disabled={isFetching || page <= 1}
                    onClick={() => setPage((p) => p - 1)}       
                >
                    Previous Page
                </button>
                <button
                    className="button"
                    disabled={isFetching || data?.isLastPage}
                    onClick={() => setPage((old) => old + 1)}
                >
                    Next Page
                </button>
            </div>
        </React.Fragment>
    )
}

export const ListComponent = withRouter(List);