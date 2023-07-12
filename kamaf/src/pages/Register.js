import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



export const Register= () =>{

    const [email,setemai]=useState('');
    const [password,setpass]=useState('');
    const [name,setname]=useState('');
    
    const handlesubmit =(e)=>
    {
        e.preventDefualt();
        console.log(email);

    }

    const Navigate=useNavigate();

    return (
        <div className="Register">

        <form className="regform" onSubmit={handlesubmit} >
        <label htmlfor="email">email</label>
        <input value={email} onChange={(e) => setemai(e.target.value)} type="email" name="email" placeholder="abc@gmail.com" />
        <label htmlfor="password">password</label>
        <input value={password} onChange={(e) => setpass(e.target.value)} type="password" name="password" placeholder="********" />
        <label htmlfor="name">Name</label>
        <input value={name} onchange={(e) => setname(e.target.value)} type="text" name="name"/>
        <button>Register</button>
        </form>
        <button className="link"  onClick={()=>Navigate('/Login')}>
              Already have an account?Login here
          </button>
          </div>
        
    )
}