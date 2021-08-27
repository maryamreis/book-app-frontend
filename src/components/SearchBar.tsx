import React from "react";

interface ISearchBar {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

function SearchBar(props: ISearchBar): JSX.Element {
    //useState
    
    return (
        <div>
            <input onChange={(event) => props.setSearchTerm(event.target.value)} className="searchBar" type="text" placeholder= "Search for a book..."></input>
        </div>
    )
}

export default SearchBar