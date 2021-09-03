import { Box, Button, Divider, Flex, Heading, Spacer } from "@chakra-ui/react"

interface IHeader{
    currentPage: string,
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}


function Header(props: IHeader): JSX.Element {
    //usestate with string of name in app
    //react-router try after

    return (
        <Box my="32px" mx="10">
            <Flex >
                <Box>
                    <Heading color="cyan.500">Book Search App</Heading>
                    
                </Box>
                <Spacer/>
                <Box>
                    <Button mr="2" variant="ghost" onClick={() => props.setCurrentPage('Home')}>Home</Button>
                    <Button variant="ghost" onClick={() => props.setCurrentPage('Input')}>Input a book</Button>
                    <Button variant="ghost" onClick={() => props.setCurrentPage('Favourites')}>Favourites</Button>

                </Box>
            </Flex>
            <Divider orientation="horizontal" mt="10px"/>

        </Box>
        

        // <nav className = "header">
        //     <Heading>Book Search App</Heading>
        //     <nav>
        //         <ul>
        //             <li onClick={() => props.setCurrentPage('Home')}>Home</li>
        //             <li onClick={() => props.setCurrentPage('Input')}>Input a book</li>
        //         </ul>
        //     </nav>
            
        // </nav>




    )
}

export default Header