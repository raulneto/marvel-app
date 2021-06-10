import React, { ChangeEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export const SearchComponent: React.FC = () => {
    const [query, setQuery] = useState('');
    const history = useHistory();

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }

    useEffect(() => {
        const params = new URLSearchParams();

        if (query) {
            params.append('character', query);
        } else {
            params.delete('character');
        }

        history.push({ search: params.toString() });
    }, [query, history])

    return <input type="text" value={query} onChange={onChange} />
}
