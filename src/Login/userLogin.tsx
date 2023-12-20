import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './userLogin.css';

const Login = () => {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState<string | number> ("");
  const [password, setPassword] = useState<string | number> ("");
  const [isFalse, setIsFalse] = useState <boolean>(false) 
  const credentials = { username, password };

  async function callApi(url:string = "", data  = {}){
    const result = await fetch(url, {
        method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    })
    return result.json();
  }
  
  const auth = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    callApi(`${process.env.REACT_APP_apiURL}/userAuth/login`, credentials).then((data) => {
        console.log(data);
        if(data.success === true){
          localStorage.setItem('user', data.data)
          const us = localStorage.getItem('user')
          console.log(us);
          
            navigate('/home')
        } else {
          setIsFalse(!isFalse)
        }
    })
  };
  return (
    <div className="outLogin">
      <div className='Login'>
        <h1>Login</h1>
        <form>
          <input className="input" type="text" placeholder="enter your username"
            onChange={(e) => setUsername(e.target.value.trim())}
          />
          <input className="input" type="password" placeholder="enter your password"
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          <button className="loginbtn" onClick={(e) => auth(e)}>
            Login
          </button>
        </form>
        <a href="./signUp">Create new account</a>
      </div>
    </div>
  );
};

export default Login;