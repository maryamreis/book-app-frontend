import React from "react";
import { IBookList } from "../App";

interface ISearchBar {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    bookList: IBookList[]
}

function SearchBar(props: ISearchBar): JSX.Element {
    //useState
    
    return (
        <div>
            <input 
                onChange={(event) => props.setSearchTerm(event.target.value)} 
                className="searchBar" 
                type="text" 
                placeholder= "Search for a book..."
            />

            <select
                onChange={(event) => {
                    props.setSearchTerm(event.target.value);
                }}
            >
                {props.bookList.map((book) => (
                    <option key={book.id} value={book.name}>
                        {book.name} - {book.author}
                    </option>
                ))};
            </select>
            

        </div>
    )
}


export default SearchBar