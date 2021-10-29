import React from 'react';
import './search.css';
import Glass from '../../media/Glass.svg';

const Search = ({handleFilterByName}) => {
    return (
        <div className="search-by-name">
            <img src={Glass} alt="" className="search-glass"/>
            <input type="text" className="search-input" placeholder="Поиск" onChange={handleFilterByName}/>
        </div>
    )
}

export default Search
