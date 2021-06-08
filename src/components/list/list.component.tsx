import * as React from "react";
import './list.component.scss';
import { CardComponent } from "../card/card.component";

export const ListComponent: React.FC = () =>  {
    return (
        <div className="comics-list">
            <CardComponent isFavourite />
            <CardComponent isFavourite={false} />
            <CardComponent isFavourite={false} />
            <CardComponent isFavourite />
            <CardComponent isFavourite={false} />
        </div>
    )
}