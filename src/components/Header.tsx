function Header(): JSX.Element {
    return (
        <nav className = "header">
            <h1>Book Search App</h1>
            <nav>
                <ul>
                    <li>Search</li>
                    <li>Favourites</li>
                </ul>
            </nav>
            
        </nav>
    )
}

export default Header