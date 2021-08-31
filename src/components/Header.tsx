
interface IHeader{
    currentPage: string,
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}


function Header(props: IHeader): JSX.Element {
    //usestate with string of name in app
    //react-router try after

    return (
        <nav className = "header">
            <h1>Book Search App</h1>
            <nav>
                <ul>
                    <li onClick={() => props.setCurrentPage('Home')}>Home</li>
                    <li onClick={() => props.setCurrentPage('Input')}>Input a book</li>
                </ul>
            </nav>
            
        </nav>




    )
}

export default Header