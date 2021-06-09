import * as React from "react";
import './card.component.scss';

type ICard = {
    image: any;
    isFavourite: boolean;
    title: any;
}

export const CardComponent: React.FC<ICard> = (props) =>  {
    const { image, isFavourite, title } = props;
    const favouriteClass = isFavourite ? 'is-fav' : '';

    return (
        <div className={`comics-card ${favouriteClass}`}>
            <img className="comic-img" src={image} />
            <a className="favourite"><span className="icon"></span></a>
            <div className="info">
                <div className="text">{title}</div>
            </div>
        </div>
    )
}

export const CardPlaceHolder: React.FC = () => {
    return <div className="comics-card placeholder"></div>
}