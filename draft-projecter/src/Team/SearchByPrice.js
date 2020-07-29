import React from 'react'

function SearchByPrice(props) {
    
    return (
        <div>
            <label>Search By Price:
            <select name="searchPriceStatus" value={props.searchPriceStatus} onChange={props.handleChange}>
                                <option value="byMinPrice">By Minimum Price</option>
                                <option value="byMaxPrice">By Maximum Price</option>
            </select>
            <input name="searchPrice" value={props.searchPrice} onChange={props.handleChange}/>
            </label>
        </div>
    )
}

export default SearchByPrice