import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Signup=()=>{
    const[email, setEmail] =useState("")
    const[password, setPassword] =useState("")
    const[name,setName] =useState("")
    const navigate =useNavigate()
    function handleRegister(name, email, password) {
        const data = {
            name,
            email,
            password
        }
        if(name == "" && email == ""  && password ==""){
            alert("please fill all the fields ")
         }
        
        fetch('http://localhost:8080/signup', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        }).then((res) => res.json())
            .then((res) => {
                if(res.responce == 'error'){
                    alert(res.message)
                }
                alert(res.message)
                navigate('/login');
                
            })
            .catch((err) => console.log("error in fetch"))
    }

return(
    <div className>
    <h1>Register</h1>
    <TextField className='text' value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic"  label="Name" variant="outlined" />
    <br />
    <br />
    <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
    <br />
    <br />
    <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
    <br />
    <br />
    <Button className="handle_button" onClick={() => handleRegister(name, email, password)} variant="contained" >SIGNUP</Button>
</div>
)
    
}



export default Signup