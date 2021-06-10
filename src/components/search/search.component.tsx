import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom'

 const Search: React.FC<RouteComponentProps> = (props) => {
    const queryParam = new URLSearchParams(props.location.search).get('character') || '';
    const [query, setQuery] = useState(queryParam);
    const [inputValue, setInputValue] = useState(queryParam);
    const history = useHistory();

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            setQuery(inputValue);
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
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