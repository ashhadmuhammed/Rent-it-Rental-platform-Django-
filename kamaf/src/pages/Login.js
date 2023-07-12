import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'

export const Login = () => {
  const [email, setemai] = useState("");
  const [password, setpass] = useState("");

  const handlesubmit = (e) => {
    e.preventDefualt();
    console.log(email);
  };


  const Navigate=useNavigate()

  return (
    <div className="Login">
    <div className="authform">
      <form className="logform" onSubmit={handlesubmit}>
        <label htmlfor="email">email</label>
        <input
          value={email}
          onChange={(e) => setemai(e.target.value)}
          type="email"
          name="email"
          placeholder="abc@gmail.com"
        />
        <label htmlfor="password">password</label>
        <input
          value={password}
          onChange={(e) => setpass(e.target.value)}
          type="password"
          name="password"
          placeholder="********"
        />
        <button>Login</button>
      </form>
      </div>
{
    

      <button className="link" onClick={() => Navigate('/Register')}>
        Don't have an account?Register here
      </button> 
     
    }
    </div>
    
    
  );
};
