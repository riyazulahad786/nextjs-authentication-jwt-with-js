"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
function Register() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  
  const onRegister = async (event) => {
    event.preventDefault();
    try {
     const response = await axios.post("/api/users/Register",user)
     console.log("register is success",response.data)
     router.push('/Login')
    } catch (error) {
      console.log(error,"error from client")
      toast.error(error.message)
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <div>
        <form className="w-50 mx-auto">
          <div className="form-group">
            <label >Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="email"
              value={user.email}
              onChange={(e)=> setUser({...user, email:e.target.value})}
             
            />
          </div>
          <div className="form-group">
            <label >User name</label>
            <input
             id="username"
              type="text"
              className="form-control"
              placeholder="username"
              onChange={(e)=> setUser({...user, username:e.target.value})}

             
            />
          </div>
          <div className="form-group">
            <label >Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e)=> setUser({...user, password:e.target.value})}

            />
          </div>
          <button onClick={onRegister} type="submit" className=" mt-5 btn btn-primary">
            Submit
          </button>
          <div className="d-flex justify-content-center">
          <Link href="/Login">visit login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
