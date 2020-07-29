import React from 'react'

function SearchByName(props) {

    return (
        <div>
            <label>Search By Name:
            <input name="searchName" value={props.searchName} onChange={props.handleChange}/>
            </label>
        </div>
    )
}

export default SearchByName