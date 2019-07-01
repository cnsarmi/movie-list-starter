import React from 'react';

const Search = (props) => (
    <div>
        <input onChange={props.handleChange} type="text" value={props.filter}></input>
        <input onClick={props.handleClick} type="submit" value="Filter Movies"></input>
    </div>
)

export default Search;