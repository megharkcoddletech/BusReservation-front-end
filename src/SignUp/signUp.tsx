import React, { useState } from "react";
import './signUp.css'
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<{name:string; username:string;
            password:string; email:string; age:string;
          contactNumber:string; gender:string}>(
      {
      name: "",
      username: "",
      password: "",
      email: "",
      age: " ",
      contactNumber: " ",
      gender: ""
      }
    );
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [e.target.name]: e.target.value.trim()});
    }
    console.log('m', data);
    console.log('ty', typeof data);
    
    async function api(url:string = "", data  = {}){
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

const register = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
console.log(22);

  e.preventDefault();
  console.log('gender', data.gender);
  
if (!data.name || !data.username ||  !data.password || !data.email 
  || !data.age || !data.contactNumber  || !data.gender ) {
    alert('fill empty field')
    console.log(data);
} else { 
  api(`${process.env.REACT_APP_apiURL}/userAuth/signup`, data).then((data) => {
    console.log(data);
    if(data.success === true){
        alert('user registered')
        navigate('/home')
    } else {
        alert (data.message)
    }
    
  })
}
}
    return (
        <div className="signUp">
          <div>
          <h1>SignUp</h1>
          </div>
            <form className="signUpForm">
              <div>
              <input className="userInput" type="text" name="name" value={ data.name} onChange={ (e) => handleChange(e) } placeholder="name"/>
                <input className="userInput" type="email" name="email" value={ data.email} onChange = { (e) => handleChange(e) } placeholder="email"/>
                <input className="userInput" type="number" name="age" value = { data.age} onChange = { (e) => handleChange(e) } placeholder="age"/>
                <input className="userInput" type="number" name="contactNumber" value={ data.contactNumber} onChange = { (e) => handleChange(e) } placeholder="phone"/>
                <p>Gender</p>
                <div className="gender">
                    <input type="radio"name="gender" value="female" checked = { data.gender === 'female'}onChange={ (e) => handleChange(e) }/>
                    <label>{"female"}</label>
                    <input type="radio"name="gender"value="male" checked = { data.gender === 'male'} onChange={(e) => handleChange(e) }/>
                    <label>{"male"}</label>
                    <input type="radio" name="gender" value="others" checked = { data.gender === 'others'} onChange={ (e) => handleChange(e) }/>
                    <label>{"others"}</label>                    
                </div>
                <input className="userInput" type="text" name="username" value={ data.username } onChange = { (e) => handleChange(e) } placeholder="username"/>
                <input className="userInput" type="text" name="password" value={ data.password } onChange = { (e) => handleChange(e) } placeholder="password"/>
              </div>
                <button className="signUpbtn" onClick={(e) => register(e)}>sign up</button>
            </form>           
        </div>
    );
}

export default SignUp;