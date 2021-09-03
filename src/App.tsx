import './App.css';
import Header from './components/Header';
import ListBooks from './components/ListBooks';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import InputBook from './components/InputBook';


export interface IBookList {
  id: number,
  name: string,
  author: string,
  genre: string
};

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [bookList, setBookList] = useState<IBookList[]>([]);
  const [currentPage, setCurrentPage] = useState('Home');

  if(currentPage === 'Input') {
    return (
      <div className="App">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <InputBook />
      </div>
    );
  }

  else {
    return (
      <div className="App">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <SearchBar setSearchTerm={setSearchTerm} bookList={bookList}/>
        <ListBooks searchTerm={searchTerm} bookList={bookList} setBookList={setBookList}/>
      </div>
    );

  }

  
}

export default App;
