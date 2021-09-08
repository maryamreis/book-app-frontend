import { SimpleGrid } from "@chakra-ui/react";
import React, {useEffect} from "react";
import { IFavouriteList } from "../App";
import {IBookList} from "../Types"
import filterBooks from "../utils/filterBooks";
import ShowBook from "./ShowBook";

interface IListBooks {
    searchTerm: string
    bookList: IBookList[]
    setBookList: React.Dispatch<React.SetStateAction<IBookList[]>>
    selectedUserID: number,
    favouriteList: IFavouriteList[],
    setFavouriteList: React.Dispatch<React.SetStateAction<IFavouriteList[]>>,
    getFavourites: () => Promise<void>,
    getBooks:() => Promise<void>
};


function ListBooks(props: IListBooks): JSX.Element {
    const getBooks = props.getBooks;

    
    
    useEffect(() => {
        
        getBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <SimpleGrid minChildWidth="20%" spacing="10" marginX="5">
            {filterBooks(props.bookList, props.searchTerm).sort((a, b) => a.name.localeCompare(b.name)).map((book) => (
                <ShowBook 
                key={book.id}
                id={book.id}
                name={book.name}
                author={book.author}
                genre={book.genre}
                selectedUserID={props.selectedUserID}
                favouriteList={props.favouriteList} 
                setFavouriteList={props.setFavouriteList}
                getFavourites={props.getFavourites}
                getBooks={props.getBooks}
                />
            ))}

        </SimpleGrid>

    )

}

export default ListBooks
