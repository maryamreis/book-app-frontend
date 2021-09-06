import { Box, Select, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IBookList } from "../App";
import ShowBook from "./ShowBook";

export interface IUserList {
    id: number,
    firstname: string,
    lastname: string
};


function ListFavourites(): JSX.Element{
    const [favouriteList, setFavouriteList] = useState<IBookList[]>([]);
    const [userList, setUserList] = useState<IUserList[]>([]);
    const [selectedUserID, setSelectedUserID] = useState("")
    console.log(userList)

    

    useEffect(() => {
        const getUserList = async () => {
        
            try {
                const apiBaseURL = process.env.REACT_APP_API_BASE;
                    
                const response = await fetch(apiBaseURL + "/users");
        
                const jsonData = await response.json();
        
                setUserList(jsonData)
    
            } catch (error) {
                console.log(error.message) 
            }
        };

        getUserList();

    }, [setUserList])



    useEffect(() => {
        const getFavourites = async () => {
            try {

                const apiBaseURL = process.env.REACT_APP_API_BASE;
                const response = await fetch(apiBaseURL + `/favouriteBooks/${selectedUserID}`)      
                const jsonData = await response.json();
                console.log(jsonData)
                setFavouriteList(jsonData)
                
            } catch (error) {
                console.error(error.message)
                
            }
        };

        getFavourites();

    }, [setFavouriteList, selectedUserID])
    

    
    return (
        <Box>
            
            <Select w="40%"
                my="32px"
                ml="32px"
                onChange={(event) => {
                    setSelectedUserID(event.target.value);
                }}
            >
                {userList.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.firstname}
                    </option>
                ))};
            </Select>


            <SimpleGrid minChildWidth="20%" spacing="10" marginX="5" ml="32px" mr="32px">
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

        </Box>

    );

};

export default ListFavourites;

