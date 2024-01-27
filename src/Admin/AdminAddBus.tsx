import React, { useState } from "react";
import '../USer/SignUp/signUp.css'
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import PostApiCall from "../GetApi/PostApiCall";

type User = {
   name: string;
   busNumber: string;
   type: string;
   farePerKm :number;
   ratings : number;
   status: string;
}

const AdminAddBus = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<User>(
    {
        name: '',
        busNumber: '',
        type: '',
        farePerKm :0,
        ratings : 0,
        status:''
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value.trim() });
  }

  const register = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!data.name || !data.busNumber || !data.type || !data.farePerKm
      || !data.ratings || !data.status ) {
      alert('fill empty field')
    } else {
      PostApiCall(`${process.env.REACT_APP_apiURL}/adminBus/addBus`, data).then((data) => {
        if (data.success === true) {
          alert('added new bus')
          navigate('/adminHome')
        } else {
          console.log('api call', data);
          alert(data)
        }
      })
    }
  }
  return (
    <div style={{backgroundColor: "cadetblue"}}>
      <AdminNavbar></AdminNavbar>
      <div className="signUp" style={{boxShadow: "0px"}}>
      <div>
        <h1>Add Bus</h1>
      </div>
      <form className="signUpForm">
        <div>
          <input className="userInput" type="text" name="name" value={data.name} onChange={(e) => handleChange(e)} placeholder="name" />
          <input className="userInput" type="text" name="busNumber" value={data.busNumber} onChange={(e) => handleChange(e)} placeholder="bus number" />
          <input className="userInput" type="text" name="type" value={data.type} onChange={(e) => handleChange(e)} placeholder="type" />
          <input className="userInput" type="number" name="farePerKm" value={data.farePerKm} onChange={(e) => handleChange(e)} placeholder="fare per km" />
          <input className="userInput" type="number" name="ratings" value={data.ratings} onChange={(e) => handleChange(e)} placeholder="ratings" />
          <input className="userInput" type="text" name="status" value={data.status} onChange={(e) => handleChange(e)} placeholder="status" />
        </div>
        <button className="signUpbtn" onClick={(e) => register(e)}>Add Bus</button>
      </form>
    </div>
    </div>

  );
}

export default AdminAddBus;