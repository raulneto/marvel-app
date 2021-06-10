import * as React from "react";
import './header.component.scss';
import logo from '../../assets/images/marvel_logo.png';
import { SearchComponent } from '../search/search.component'

export const HeaderComponent: React.FC = () =>  {
    return (
        <header>
            <div className="logotipo"><img src={logo} /></div>
            <div className="search">
                <SearchComponent />
            </div>
        </header>
    )
}