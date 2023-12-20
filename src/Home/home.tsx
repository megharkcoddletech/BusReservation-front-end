import React from "react";
import './home.css';
import { RiAccountCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";



const Home = () => {
  const navigate = useNavigate()
  function logout(){
    localStorage.setItem('user','')
    const us = localStorage.getItem('user')
    console.log('c', us);
    
    navigate('/')
  }
  return (
    <div className='Home'>
      <nav>
      <h1>Home Page </h1>

      <RiAccountCircleLine/>
      <button className="logoutbtn" onClick={logout}>Logout</button>
      </nav>
    </div>
  );
};

export default Home;
