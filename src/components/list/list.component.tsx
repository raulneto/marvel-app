import * as React from "react";
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './list.component.scss';
import config from "../../app.config.json"
import { CardComponent, CardPlaceHolder } from "../card/card.component";
import { useComics } from "../hooks/useComics";

const List: React.FC<RouteComponentProps> = (props) =>  {
    const [page, setPage] = React.useState(1);
    const [character, setCharacter] = React.useState('');
    
    const { 
        isLoading, 
        isFetching, 
        isError, 
        data, 
        error, 
    } = useComics(page, character);
    
    React.useEffect(() => {
        const query = new URLSearchParams(props.location.search).get('character') || '';
        setCharacter(query);
        setPage(1);
    }, [props.location.search]);

    if (isError) {
        return <div>Error: {error?.message}</div>
    }

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

export const ListComponent = withRouter(List);