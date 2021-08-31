import React from 'react';
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

  return (
    <div className="App">
      <Header />
      <SearchBar setSearchTerm={setSearchTerm} bookList={bookList}/>
      <ListBooks searchTerm={searchTerm} bookList={bookList} setBookList={setBookList}/>
      <InputBook />
    </div>
  );
}

export default App;
