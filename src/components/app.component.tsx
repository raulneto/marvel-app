import * as React from "react";
import { HeaderComponent } from "./header/header.component";
import { ListComponent } from "./list/list.component";
import { PaginationComponent } from "./pagination/pagination.component";

export const AppComponent: React.FC = () =>  {
    return (
        <div className="app">
            <HeaderComponent />
            <ListComponent />
            <PaginationComponent />
        </div>
    )
}