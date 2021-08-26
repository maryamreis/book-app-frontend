import React, {useState, useEffect} from "react";
import {IBookList} from "../Types"
import ShowBook from "./ShowBook";


function ListBooks(): JSX.Element {
    const [bookList, setBookList] = useState<IBookList[]>([]);

    const getBooks = async () => {
        try {
            const response = await fetch("http://localhost:4000/books");
            const jsonData = await response.json();

            setBookList(jsonData)
            
        } catch (error) {
            console.error(error.message)
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div>
            
            {bookList.map((book) => (
                <ShowBook 
                id={book.id}
                name={book.name}
                author={book.author}
                genre={book.genre}/>
            ))}

        </div>

    )

}

export default ListBooks
