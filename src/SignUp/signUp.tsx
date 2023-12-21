import React, { useState } from "react";
import './signUp.css'
import { useNavigate } from "react-router-dom";
const SignUp = () => {
    const navigate = useNavigate();

    const [name, setName] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [age, setAge] = useState(" ");
    const [contactNumber, setContactNumber] = useState(" ");
    const [username, setUsername] = useState(" ");
    const [password, setPassword] = useState(" ");
    const[gender, setGender] = useState('');
    console.log('ff', gender);
    
    const credentials = {name,username,password, email,age, contactNumber, gender}
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
  e.preventDefault();
  api(`${process.env.REACT_APP_apiURL}/userAuth/signup`, credentials).then((data) => {
    console.log(data);
    if(data.success === true){
        alert('user registered')
        navigate('/home')
    } else {
        alert (data.message)
    }
    
  })
}
    return (
        <div className="signUp">
            <h1>SignUp</h1>
            <form>
                <input type="text" onChange={(e) => setName(e.target.value.trim())} placeholder="name"/>
                <input type="email" onChange = {(e) => setEmail(e.target.value.trim())} placeholder="email"/>
                <input type="number" onChange = {(e) => setAge(e.target.value.trim())} placeholder="age"/>
                <input type="number" onChange = {(e) => setContactNumber(e.target.value.trim())} placeholder="phone"/>
                <div className="gender">
                    <p>Gender</p>
                    <label htmlFor="gender">Female</label>
                    <input type="radio"name="gender"value="feMale"onChange={(e) => setGender(e.target.value)}/>
        
                    <label htmlFor="gender">Male</label>
                    <input type="radio"name="gender"value="male" onChange={(e) => setGender(e.target.value)}/>
                    
                    <label htmlFor="gender">Others</label>
                    <input type="radio" name="gender" value="others" onChange={(e) => setGender(e.target.value)}/>
                    
                </div>
                <input type="text" onChange = {(e) => setUsername(e.target.value.trim())} placeholder="username"/>
                <input type="text" onChange = {(e) => setPassword(e.target.value.trim())} placeholder="password"/>
                <button className="signUp" onClick={(e) => register(e)}>sign up</button>
            </form>           
        </div>
    );
}

export default SignUp;