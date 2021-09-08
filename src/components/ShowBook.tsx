import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { IFavouriteList } from "../App";

export interface IShowBook {
    id: number,
    name: string,
    author: string,
    genre: string
    selectedUserID: number,
    favouriteList: IFavouriteList[],
    setFavouriteList: React.Dispatch<React.SetStateAction<IFavouriteList[]>>,
    getFavourites: () => Promise<void>,
    getBooks:() => Promise<void>

};

export interface IBookObject {
    userid: number,
    bookid: number,
    favouriteid: number
};

export interface IBookObjectWithoutFavourite {
    userid: number,
    bookid: number
};


function ShowBook(props: IShowBook): JSX.Element {
    console.log("showBook component being rendered")
    
    // function containsBookInFavourites(book: IBookObjectWithoutFavourite, list: IBookObject[]) {
    //     console.log("containsBookInFavourites function:", "book:", book, "list:",list)
    //     for (let i = 0; i < list.length; i++) {
    //         if (list[i].bookid === book.bookid && list[i].userid === book.userid) {
    //             return true;
    //         }
    //     }
    //     return false;
    // };

    function containsBookInFavouritesOfFavouritesList(book: IBookObjectWithoutFavourite, list: IFavouriteList[]) {
        //console.log("containsBookInFavouritesOfFavouritesList function:", "book:", book, "list:",list)
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === book.bookid && list[i].userid === book.userid) {
                return true;
            }
        }
        return false;
    };

    const deleteBook = async() => {

        try {
            const apiBaseURL = process.env.REACT_APP_API_BASE;
            await fetch(apiBaseURL + `/books/${props.id}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            });
            props.getBooks();
        
        } catch (error) {
            console.error(error.message)            
        }
    };

    
    const addToFavourites = async() => {
        console.log(props.selectedUserID, props.id);
        const userid = props.selectedUserID;
        const bookid = props.id;
        const body = {userid, bookid};

        // const apiBaseURL = process.env.REACT_APP_API_BASE;
        // const response = await fetch(apiBaseURL + `/favourites`);
        // const favouriteJSONList = await response.json();
        // console.log({favouriteJSONList});

        //console.log("containsBookinfavourites returns:",containsBookInFavourites(body, favouriteJSONList))
        
        if (containsBookInFavouritesOfFavouritesList(body, props.favouriteList) === true){
            console.log("going to do a http delete request to /favourties to delete the book from favourites", body)
            
            try {
                const apiBaseURL = process.env.REACT_APP_API_BASE;
                await fetch(apiBaseURL + `/favourites`, {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
                props.getFavourites()
            

            
            } catch (error) {
                console.error(error.message);            
            }
        }

        else {
            console.log("going to do a http post to /favourites of: ", body )
            try {
                const apiBaseURL = process.env.REACT_APP_API_BASE;
                console.log("posting to favourites", apiBaseURL, body)
                await fetch(apiBaseURL + `/favourites`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
                props.getFavourites();
            
            } catch (error) {
                console.error(error.message);            
            }
        }
    };





    function checkIfInFavourites(){
        //console.log(props.selectedUserID, props.id);
        const userid = props.selectedUserID;
        const bookid = props.id;
        const body = {userid, bookid};

        // const apiBaseURL = process.env.REACT_APP_API_BASE;
        // const response = await fetch(apiBaseURL + `/favourites`);
        // const favouriteJSONList = await response.json();
        // console.log({favouriteJSONList})

        // console.log("containsBookinfavourites returns:",containsBookInFavourites(body, favouriteJSONList))
        
        if (containsBookInFavouritesOfFavouritesList(body, props.favouriteList) === true){
            return true
        }
        else {
            return false
        }

    };
    //const checkIfInFavourites = async() => {
        
    //};

    return(
        <Box bg="cyan.50" borderWidth="2px" borderColor="cyan.500" boxShadow="lg" rounded="md" maxWidth="317px">
            <Heading size="md" mt="20px" ml="10px" mr="10px">
                {props.name}
            </Heading>
            <Text mt="10px">
                {props.author}
            </Text>
            <Text fontSize="xs">
                {props.genre}
            </Text>
            
            <Stack mt={10} mb={10} ml={5} mr={5} direction={'row'} spacing={2}>
                <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    // mt="20px"
                    // mb="20px"
                    //bg={'cyan.400'}
                    bg={checkIfInFavourites()===true ? 'pink.500' : 'cyan.500'}
                    color={'white'}
                    
                    onClick={addToFavourites}
                    >
                    favourite
                </Button>
                <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    // mt="20px"
                    // mb="20px"
                    bg={'cyan.400'}
                    color={'white'}
                    onClick={deleteBook}
                    >
                    delete
                </Button>
            </Stack>
        </Box>
    )
};

export default ShowBook;



