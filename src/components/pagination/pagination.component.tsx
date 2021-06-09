import * as React from "react";
import './pagination.component.scss';


export const PaginationComponent: React.FC = () =>  {
    return (
        <div className="pagination">
            <a className="button">Previous Page</a>
            <a className="button">Next Page</a>
        </div>
    )
}