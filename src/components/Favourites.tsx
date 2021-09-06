import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IBookList } from "../App";
import ShowBook from "./ShowBook";


function ListFavourites(): JSX.Element{
    const [favouriteList, setFavouriteList] = useState<IBookList[]>([]);

    useEffect(() => {
        const getFavourites = async () => {
            try {

                const apiBaseURL = process.env.REACT_APP_API_BASE;
                const response = await fetch(apiBaseURL + "/favouriteBooks/1")      
                const jsonData = await response.json();
    
                setFavouriteList(jsonData)
                
            } catch (error) {
                console.error(error.message)
                
            }
        };

        getFavourites();

    }, [setFavouriteList])
    
    
    return (

        <SimpleGrid minChildWidth="20%" spacing="10" marginX="5">
            {/* {filterBooks(props.bookList, props.searchTerm).map((book) => ( */}
            {favouriteList.map((book) => (
                <ShowBook 
                key={book.id}
                id={book.id}
                name={book.name}
                author={book.author}
                genre={book.genre}/>
            ))}

        </SimpleGrid>

    );

};

export default ListFavourites;

