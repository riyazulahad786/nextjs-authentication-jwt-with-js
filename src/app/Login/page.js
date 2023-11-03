"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async (event) => {
    event.preventDefault();
     try {
    const res = await axios.post("/api/users/Login", user)
    console.log("Login success",res.data)
    router.push('/')
     } catch (error) {
        console.log(error,"Login failed")
     }
  };
  return (
    <div>
      <h1>Login</h1>
      <div>
        <form className="w-50 mx-auto">
          <div className="form-group">
            <label>Email address</label>
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
            <label>Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e)=> setUser({...user, password:e.target.value})}

            />
          </div>
          <button onClick={onLogin} type="submit" className=" mt-5 btn btn-primary">
            Submit
          </button>
          <div className="d-flex justify-content-center">
          <Link href="/Register">visit To Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
