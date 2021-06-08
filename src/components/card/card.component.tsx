import * as React from "react";
import './card.component.scss';

interface ICard {
    isFavourite: boolean;
}

export const CardComponent: React.FC<ICard> = (props) =>  {
    const favouriteClass = props.isFavourite ? 'is-fav' : '';
    return (
        <div className={`comics-card ${favouriteClass}`}>
            <img className="comic-img" src="http://x.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/portrait_fantastic.jpg" />
            <a className="favourite"><span className="icon"></span></a>
            <div className="info">
                <div className="text">Spider-man/Deadpool</div>
                <div className="text">(2016) #50</div>
            </div>
        </div>
    )
}