import { Box, Select, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IFavouriteList } from "../App";
import ShowBook from "./ShowBook";

export interface IUserList {
    id: number,
    firstname: string,
    lastname: string
};

export interface IUserIDAndFavourites {
    selectedUserID: number,
    setSelectedUserID: React.Dispatch<React.SetStateAction<number>>
    favouriteList: IFavouriteList[],
    setFavouriteList: React.Dispatch<React.SetStateAction<IFavouriteList[]>>,
};


function ListFavourites(props:IUserIDAndFavourites): JSX.Element{
    const [userList, setUserList] = useState<IUserList[]>([]);
    //const [selectedUserName, setSelectedUserName] = useState("")

    console.log({userList});

    useEffect(() => {
        const getUserList = async () => {
            console.log("UseEffect triggered http get request from /users")
        
            try {
                const apiBaseURL = process.env.REACT_APP_API_BASE;
                    
                const response = await fetch(apiBaseURL + "/users");
        
                const jsonData = await response.json();
        
                setUserList(jsonData)
                console.log("http get request from /users fetched: ", {userList})
    
            } catch (error) {
                console.log(error.message) 
            }
        };

        getUserList();

    }, [setUserList]);

    
    return (
        <Box>
            
            <Select w="40%"
                my="32px"
                ml="32px"
                //placeholder={selectedUserName}
                onChange={(event) => {
                    props.setSelectedUserID(parseInt(event.target.value))
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
                {props.favouriteList.map((book) => (
                    <ShowBook 
                    key={book.id}
                    id={book.id}
                    name={book.name}
                    author={book.author}
                    genre={book.genre}
                    selectedUserID={props.selectedUserID}
                    favouriteList={props.favouriteList} 
                    setFavouriteList={props.setFavouriteList}
                    />
                ))}
            </SimpleGrid>

        </Box>

    );

};

export default ListFavourites;

