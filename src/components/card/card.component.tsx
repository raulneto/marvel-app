import * as React from "react";
import './card.component.scss';

type ICard = {
    id: string;
    image: any;
    isFavourite: boolean;
    setFavouriteComic: (id: string, isFavourite: boolean) => void;
    title: string;
}

export const CardComponent: React.FC<ICard> = (props) =>  {
    const { id, image, isFavourite, setFavouriteComic, title } = props;
    const favouriteClass = isFavourite ? 'is-fav' : '';

    return (
        <div className={`comics-card ${favouriteClass}`}>
            <img alt={title} className="comic-img" src={image} />
            <button onClick={() => setFavouriteComic(id, isFavourite)} className="favourite">
                <span className="icon"></span>
            </button>
            <div className="info">
                <div className="text">{title}</div>
            </div>
        </div>
    );
}

export const CardPlaceHolder: React.FC = () => {
    return <div className="comics-card placeholder"></div>
}