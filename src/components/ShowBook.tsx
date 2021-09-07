import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";

export interface IShowBook {
    id: number,
    name: string,
    author: string,
    genre: string
    selectedUserID: string
};

export interface IBookObject {
    userid: string,
    bookid: number,
    favouriteid: number
};

export interface IBookObjectWithoutFavourite {
    userid: string,
    bookid: number
};


function ShowBook(props: IShowBook): JSX.Element {
    
    function containsBookInFavourites(book: IBookObjectWithoutFavourite, list: IBookObject[]) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].bookid === book.bookid && list[i].userid === book.userid) {
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
        
        } catch (error) {
            console.error(error.message)            
        }
    };

    const addToFavourites = async() => {
        console.log(props.selectedUserID, props.id);
        const userid = props.selectedUserID;
        const bookid = props.id;
        const body = {userid, bookid};

        const apiBaseURL = process.env.REACT_APP_API_BASE;
        const response = await fetch(apiBaseURL + `/favourites`);
        const favouriteJSONList = await response.json();
        console.log({favouriteJSONList})

        console.log(containsBookInFavourites(body, favouriteJSONList))
        
        if (containsBookInFavourites(body, favouriteJSONList) === true){
            try {
                const apiBaseURL = process.env.REACT_APP_API_BASE;
                await fetch(apiBaseURL + `/favourites`, {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
            

            
            } catch (error) {
                console.error(error.message);            
            }
        }

        else {
            try {
                const apiBaseURL = process.env.REACT_APP_API_BASE;
                await fetch(apiBaseURL + `/favourites`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
            
            } catch (error) {
                console.error(error.message);            
            }
        }
        
    };


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
                    bg={'cyan.400'}
                    color={'white'}
                    _hover={{
                    bg: 'blue.500',
                    }}
                    _focus={{
                    bg: 'cyan.500',
                    }}
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
                    _hover={{
                    bg: 'blue.500',
                    }}
                    _focus={{
                    bg: 'cyan.500',
                    }}
                    onClick={deleteBook}
                    >
                    delete
                </Button>
            </Stack>
        </Box>
    )
};

export default ShowBook;



