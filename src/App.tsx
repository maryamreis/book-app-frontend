import './App.css';
import Header from './components/Header';
import ListBooks from './components/ListBooks';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import InputBook from './components/InputBook';
import Favourites from './components/Favourites';


export interface IBookList {
  id: number,
  name: string,
  author: string,
  genre: string,
};


function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [bookList, setBookList] = useState<IBookList[]>([]);
  const [currentPage, setCurrentPage] = useState('Home');
  const [selectedUserID, setSelectedUserID] = useState("1");
  console.log({selectedUserID})

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
        <Favourites selectedUserID={selectedUserID} setSelectedUserID={setSelectedUserID}/>
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
      />
      </div>
    );

  }

  
}

export default App;
