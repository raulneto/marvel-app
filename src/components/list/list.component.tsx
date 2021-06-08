import * as React from "react";
import './list.component.scss';
import { CardComponent } from "../card/card.component";

export const ListComponent: React.FC = () =>  {
    return (
        <div className="comics-list">
            <CardComponent />
            <CardComponent />
            <CardComponent />
        </div>
    )
}