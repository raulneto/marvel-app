import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom'

 const Search: React.FC<RouteComponentProps> = (props) => {
    const queryParam = new URLSearchParams(props.location.search).get('character') || '';
    const [query, setQuery] = useState(queryParam);
    const [inputValue, setInputValue] = useState(queryParam);
    const history = useHistory();

    function onKeyUp(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            setQuery(inputValue);
        }
    }

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }

    useEffect(() => {
        const params = new URLSearchParams();

        if (!!query) {
            params.append('character', query);
        } else {
            params.delete('character');
        }

        history.push({ search: params.toString() });
    }, [query, history])

    return <input type="text" value={inputValue} onChange={onChange} onKeyUp={onKeyUp} placeholder="Character"/>
}

export const SearchComponent = withRouter(Search);