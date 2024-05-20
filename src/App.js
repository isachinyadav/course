import React, { useState } from 'react'
import "./App.css"
import Main from "./components/MainPage"
import Create from './components/Create'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
  };
  console.log(items);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Main Items={items}/>} />
      <Route path="/create" element={<Create addItem={addItem} />} />
      </Routes>
    </Router>
    
  )
}

export default App