import './App.css';
import Header from './components/Header';
import ListBooks from './components/ListBooks';
import SearchBar from './components/SearchBar';
import { useEffect, useState } from 'react';
import InputBook from './components/InputBook';
import Favourites from './components/Favourites';


export interface IBookList {
  id: number,
  name: string,
  author: string,
  genre: string,
};

export interface IFavouriteList {
  id: number,
  name: string,
  author: string,
  genre: string,
  userid: number
};




function App() {
  console.log("app component is being rendered")
  const [searchTerm, setSearchTerm] = useState("")
  const [bookList, setBookList] = useState<IBookList[]>([]);
  const [currentPage, setCurrentPage] = useState('Home');
  const [selectedUserID, setSelectedUserID] = useState(1);
  const [favouriteList, setFavouriteList] = useState<IFavouriteList[]>([]);
  console.log({selectedUserID})
  console.log({favouriteList})

  const getFavourites = async () => {
    try {

        const apiBaseURL = process.env.REACT_APP_API_BASE;
        const response = await fetch(apiBaseURL + `/favouriteBooks/${selectedUserID}`)      
        const jsonData = await response.json();
        console.log("retrieved favourite books for specific user", selectedUserID, jsonData, "in get favourites of favourites component")
        setFavouriteList(jsonData)
        
    } catch (error) {
        console.error(error.message)
        
    }
};

const getBooks = async () => {
  console.log("going to do a http get request from /books")
  try {
      const apiBaseURL = process.env.REACT_APP_API_BASE;
      
      const response = await fetch(apiBaseURL + "/books")      

      const jsonData = await response.json();

      setBookList(jsonData)
      console.log("fetched data from http get request from /books: ", {jsonData})
      
  } catch (error) {
      console.error(error.message)
  }
};
  

  useEffect(() => {


    getFavourites();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFavouriteList, selectedUserID]);


  if(currentPage === "Input") {
    return (
      <div className="App">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <InputBook />
      </div>
    );
  }

  else if (currentPage === "Favourites") {
    return (
      <div className="App">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <Favourites 
          selectedUserID={selectedUserID} 
          setSelectedUserID={setSelectedUserID} 
          favouriteList={favouriteList} 
          setFavouriteList={setFavouriteList}
          getFavourites={getFavourites}
          getBooks={getBooks}
          />
      </div>
    );
  }

  else {
    return (
      <div className="App">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <SearchBar setSearchTerm={setSearchTerm} bookList={bookList}/>
        <ListBooks 
          searchTerm={searchTerm} 
          bookList={bookList} 
          setBookList={setBookList} 
          selectedUserID={selectedUserID}
          favouriteList={favouriteList} 
          setFavouriteList={setFavouriteList}
          getFavourites={getFavourites}
          getBooks={getBooks}
      />
      </div>
    );

  }

  
}

export default App;
