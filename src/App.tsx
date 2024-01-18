import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login/userLogin'
import Home from './USer/Home/home'
import SignUP from './USer/SignUp/signUp';
import GetBus from './USer/ViewBus/viewBus';
import Booking from './USer/Booking/Booking';
import { Provider } from "react-redux";
import store from "./redux/store";
import Ticket from "./USer/Booking/viewTicket";
import AdminViewSeats from './Admin/AdminViewSeats';
import AdminAddBus from './Admin/AdminAddBus';
import AdminOffers from './Admin/AdminOffers';
import AdminHome from './Admin/AdminHome';


// import AdminHome from './Admin'

function App() {

  return (

    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/adminHome' element = {<AdminHome/>} />
        <Route path="/Home" element={<Home />} />
        <Route path='/signUp' element={<SignUP />} />
        <Route path='/viewBus' element={<GetBus />} />
        <Route path='/booking' element = {<Booking width={400} textAlign={'center'} backgroundColor={'rgb(222, 208, 189)'} borderSpacing={30} borderRadius={5}/>}/>
        <Route path='/ticket' element = {<Ticket width={400} textAlign={'center'} backgroundColor={'rgb(222, 208, 189)'} borderSpacing={30} borderRadius={5}/>}/>
        <Route path='/adminAddBus' element = {<AdminAddBus/>} />
        <Route path='/AdminOffers' element = {<AdminOffers/>} />
        <Route path='/adminViewSeats' element = {<AdminViewSeats width={400} textAlign={'center'} backgroundColor={'rgb(222, 208, 189)'} borderSpacing={30} borderRadius={5}/>} />
      </Routes>
    </BrowserRouter>
    </Provider>

  );
}

export default App;