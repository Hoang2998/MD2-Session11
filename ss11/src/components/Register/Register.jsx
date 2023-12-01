import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function Register() {
const [nameInput,setNameInput] = useState({
    name:"",
    email:"",
    password:""
})
const navigate = useNavigate()

const handleChange = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
   
    setNameInput({...nameInput,[name]:value})
}
console.log(nameInput)
const  handleRegister=()=>{
    fetch("http://localhost:3000/user")
    .then ((result) => {return result.json()})
    .then (data => { 
        let result = data.find((item)=>{
                return item.email == nameInput.email
        })   
        if(result){
            console.log("tai khoan da ton tai");
        }else{
            saveUser(nameInput)
            navigate("/login")
        }
    })
    .catch (err=>console.log("err",err))
}
const saveUser = (user)=>{
    fetch("http://localhost:3000/user",{
    method:"POST",
    headers:{
        'Content-type':'application/json'
    },
    body:JSON.stringify(user)
    })
    
}
  return (
    <>
        <div>
            <input type="text" 
            name='email'
            onChange={handleChange}
            />
            <label htmlFor="" >Email</label>
        </div>
        <div>
            <input type="password" 
            onChange={handleChange}
            name='password'
            />
            <label htmlFor="">Password</label>
        </div>
        <div>
            <input type="text" 
            onChange={handleChange}
            name='name'
            />
            <label htmlFor="">Name</label>
        </div>
        <div>
            <button onClick={handleRegister} >Register</button>
        </div>
    </>
  )
}
