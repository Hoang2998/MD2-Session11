import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function Login() {

  const [nameInput,setNameInput] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate()
  const changeValue = (e)=>{
    const {name,value} = e.target
    setNameInput({...nameInput,[name]:value})
  }
  const loginHome = ()=>{
    fetch("http://localhost:3000/user")
    .then(result => result.json())
    .then((data)=>{
      let result = data.find((item)=>{
        return (item.email == nameInput.email && item.password == nameInput.password)

      })
      if(result){
        navigate("/")
      }else{
        alert("tk hoac mk sai")
      }
    })
     
  }
  return (
    <>
    <h1>LOGIN</h1>
      <div>
        <input type="text" 
        onChange={changeValue}
        name='email'
        />
        
        <label htmlFor="">Email</label>
      </div>
      <div>
        <input type="password" 
        onChange={changeValue}
        name='password'
        
        />
        <label htmlFor="">Password</label>
      </div>
      <button onClick={loginHome}>login</button>
    </>
  )
}
