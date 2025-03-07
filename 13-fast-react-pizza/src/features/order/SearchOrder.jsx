import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchOrder() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    function handeleSubmit(e) {
        e.preventDefault();
        if (!query) return;
        navigate(`/order/${query}`);
        setQuery('');
    }
    return (
        <form onSubmit={handeleSubmit}>
            <input
                type='text'
                placeholder='Search order #'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </form>
    );
}
