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
  const [searchTerm, setSearchTerm] = useState("")
  const [bookList, setBookList] = useState<IBookList[]>([]);
  const [currentPage, setCurrentPage] = useState('Home');
  const [selectedUserID, setSelectedUserID] = useState(1);
  const [favouriteList, setFavouriteList] = useState<IFavouriteList[]>([]);
  console.log({selectedUserID})
  console.log({favouriteList})

  

  useEffect(() => {
    const getFavourites = async () => {
        try {

            const apiBaseURL = process.env.REACT_APP_API_BASE;
            const response = await fetch(apiBaseURL + `/favouriteBooks/${selectedUserID}`)      
            const jsonData = await response.json();
            console.log("retrieved favourite books for specific user", selectedUserID, jsonData, "in get favourites of favourites component")
            setFavouriteList(jsonData)
            console.log("http get request from /favouriteBooks/:id fetched: ", {jsonData})
            
        } catch (error) {
            console.error(error.message)
            
        }
    };

    getFavourites();

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
      />
      </div>
    );

  }

  
}

export default App;
