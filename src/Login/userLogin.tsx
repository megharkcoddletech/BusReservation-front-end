
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './userLogin.css';

const Login = () => {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState<string | number> ("");
  const [password, setPassword] = useState<string | number> ("");
  const credentials = { username, password };

  const auth = async (e: any) => {
    e.preventDefault();
   await fetch("http://localhost:3001/userAuth/login", {
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
        <input className="input" type="text" placeholder="enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input className="input" type="password" placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginbtn" onClick={(e) => auth(e)}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
