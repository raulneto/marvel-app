import axios from "axios";
import * as React from "react";
import { HeaderComponent } from "./header/header.component";
import { ListComponent } from "./list/list.component";

export const AppComponent: React.FC = () =>  {
    return (
        <React.Fragment>
            <HeaderComponent />
            <ListComponent />
        </React.Fragment>
    )
}
