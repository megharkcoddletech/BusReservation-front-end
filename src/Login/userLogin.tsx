import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './userLogin.css';

type Auth = { username: string; password: string }

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<Auth>(
    {
      username: "",
      password: ""
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value.trim() })
  }
  async function callApi(url: string = "", data = {}) {
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
      if (data.success === true) {
        localStorage.setItem('user', data.data)
        navigate('/home')
      }
      else {
        alert(data.message)
      }
    })
  };
  return (
    <div className="loginMain">
      <div className="outLogin">
        <div className='Login'>
          <h1>Login</h1>
          <form>
            <input className="input" type="text" placeholder="enter your username"
              name="username" value={credentials.username} onChange={(e) => handleChange(e)}
            />
            <input className="input" type="password" placeholder="enter your password"
              name="password" value={credentials.password} onChange={(e) => handleChange(e)}
            />
            <button className="loginbtn" onClick={(e) => auth(e)}>
              Login
            </button>
          </form>
          <a className="createNew" href="./signUp">Create new account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;