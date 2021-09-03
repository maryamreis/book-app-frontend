import { Flex, Input, Select, Spacer } from "@chakra-ui/react";
import React from "react";
import { IBookList } from "../App";

interface ISearchBar {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    bookList: IBookList[]
}

function SearchBar(props: ISearchBar): JSX.Element {
    //useState
    
    return (
        <Flex mb="32px" mx="5">
            <Input w="40%"
                onChange={(event) => props.setSearchTerm(event.target.value)} 
                className="searchBar" 
                type="text" 
                placeholder= "Search for a book..."
            />
            <Spacer />

            <Select w="40%"
                onChange={(event) => {
                    props.setSearchTerm(event.target.value);
                }}
            >
                {props.bookList.map((book) => (
                    <option key={book.id} value={book.name}>
                        {book.name} - {book.author}
                    </option>
                ))};
            </Select>
            

        </Flex>
    )
}


export default SearchBar