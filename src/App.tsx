import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login/userLogin'
import Home from './Home/home'
import SignUP from './SignUp/signUp';
import GetBus from './ViewBus/viewBus';
import Booking from './Booking/Booking';
import { Provider } from "react-redux";
import store from "./redux/store";
import Ticket from "./Booking/viewTicket"

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path='/signUp' element={<SignUP />} />
        <Route path='/viewBus' element={<GetBus />} />
        <Route path='/booking' element = {<Booking/>}/>
        <Route path='/ticket' element = {<Ticket/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
