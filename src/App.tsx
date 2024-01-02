import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login/userLogin'
import Home from './Home/home'
import SignUP from './SignUp/signUp';
import GetBus from './ViewBus/viewBus';
import Booking from './Booking/Booking';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path='/signUp' element={<SignUP />} />
        <Route path='/viewBus' element={<GetBus />} />
        <Route path='/booking' element = {<Booking/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
