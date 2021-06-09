import * as React from "react";
import './list.component.scss';
import config from "../../app.config.json"
import { CardComponent, CardPlaceHolder } from "../card/card.component";
import { getComicsToCard, useComics } from "../hooks/useComics";

export const ListComponent: React.FC = () =>  {
    const [page, setPage] = React.useState(1);
    const { isLoading, isFetching, isError, data, error, isPreviousData } = useComics(page);
    
    if (isError) {
        return <div>Error: {error?.message}</div>
    }

    console.log(new Array(config.PAGE_LIMIT));

    return (
        <React.Fragment>
            <div className="comics-list">
                {isFetching || isLoading ? (
                    Array.from({ length: config.PAGE_LIMIT }).map(() => <CardPlaceHolder />)
                ) : (
                    data.comics?.map((card: any) => <CardComponent image={card.image} isFavourite title={card.title} />)
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
