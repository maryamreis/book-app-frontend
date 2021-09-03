import { Box, Heading, Text } from "@chakra-ui/react";
import { IBookList } from "../Types";

function ShowBook(props: IBookList): JSX.Element {
    return(
        <Box bg="cyan.50" borderWidth="2px" borderColor="cyan.500">
            <Heading size="md">
                {props.name}
            </Heading>
            <Text>
                {props.author}
            </Text>
            <Text fontSize="xs">
                {props.genre}
            </Text>
        </Box>
    )
};

export default ShowBook;



