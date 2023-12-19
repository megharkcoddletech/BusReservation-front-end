import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './userLogin'
import Home from './Home'

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
