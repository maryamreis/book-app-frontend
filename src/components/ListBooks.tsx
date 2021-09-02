import React, {useEffect} from "react";
import {IBookList} from "../Types"
import filterBooks from "../utils/filterBooks";
import ShowBook from "./ShowBook";

interface IListBooks {
    searchTerm: string
    bookList: IBookList[]
    setBookList: React.Dispatch<React.SetStateAction<IBookList[]>>
}


function ListBooks(props: IListBooks): JSX.Element {
    const setBookList = props.setBookList
    

    useEffect(() => {
        const getBooks = async () => {
            try {
                const apiBaseURL = process.env.REACT_APP_API_BASE;
                const response = await fetch(apiBaseURL + "/books")      

                // const response = await fetch("http://localhost:4000/books");
                const jsonData = await response.json();
    
                setBookList(jsonData)
                
            } catch (error) {
                console.error(error.message)
            }
        };

        getBooks();
    }, [setBookList]);

    return (
        <div className="listBooks">
            {filterBooks(props.bookList, props.searchTerm).map((book) => (
                <ShowBook 
                key={book.id}
                id={book.id}
                name={book.name}
                author={book.author}
                genre={book.genre}/>
            ))}

        </div>

    )

}

export default ListBooks
