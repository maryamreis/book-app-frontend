import { Box, Button, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import { IBookList } from "../Types";

function ShowBook(props: IBookList): JSX.Element {

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
    }

    return(
        <Box bg="cyan.50" borderWidth="2px" borderColor="cyan.500" boxShadow="lg" rounded="md">
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
                    }}>
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



