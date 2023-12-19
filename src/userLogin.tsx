
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

const Login = () => {
  const navigate = useNavigate(); 
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const credentials = { username, password };

  const auth = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:3001/userAuth/login", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(credentials),
    })
    .then(response => {
      if (!response.ok){ 
        throw new Error(`authentication failed`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      navigate("/home"); 
    })
    .catch(error => {
      console.error("Authentication error:", error);
    });
  };

  return (
    <div className='Login'>
      <h1>Login</h1>
      <form>
        <input className="input" type="text" id="username" placeholder="enter your username"
          onChange={(e) => setusername(e.target.value)}
        ></input>
        <input className="input" type="password" id="password" placeholder="enter your password"
          onChange={(e) => setpassword(e.target.value)}
        ></input>
        <button className="loginbtn" onClick={(e) => auth(e)}>
          Login
        </button>
      </form>
      <p className="message"></p>
    </div>
  );
};

export default Login;
