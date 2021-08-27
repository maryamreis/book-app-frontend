import React from 'react';
import './App.css';
import Header from './components/Header';
import ListBooks from './components/ListBooks';
import SearchBar from './components/SearchBar';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="App">
      <Header />
      <SearchBar setSearchTerm={setSearchTerm}/>
      <ListBooks searchTerm={searchTerm}/>
    </div>
  );
}

export default App;
