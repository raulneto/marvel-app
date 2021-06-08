import * as React from "react";
import './header.component.scss';
import logo from '../../assets/images/marvel_logo.png';

export const HeaderComponent: React.FC = () =>  {
    return (
        <header>
            <div className="logotipo"><img src={logo} /></div>
            <div className="search">
                <input type="text" />
            </div>
        </header>
    )
}