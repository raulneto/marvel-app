import axios from "axios";
import * as React from "react";
import { useQuery } from "react-query";
import md5 from 'md5';
import { HeaderComponent } from "./header/header.component";
import { ListComponent } from "./list/list.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { useComics } from "./hooks/useComics";

export const AppComponent: React.FC = () =>  {
    return (
        <React.Fragment>
            <HeaderComponent />
            <ListComponent />
        </React.Fragment>
    )
}
