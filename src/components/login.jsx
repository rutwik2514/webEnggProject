import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginImg from "../Assets/login.svg"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Set's value of username as user inputs the data
  const usernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };
  //Set's valye of password as user inputs the data
  const passwordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };
  //function after login button is beign clicked
  const loginClick = async () => {
    if (username === "" || password === "") {
      window.alert("No Field can be empty");
      return;
    }
    const requestBody = JSON.stringify({
      username,
      password,
    });
    //connecting with backend, verifying if the user if vereified user or not
    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
      const { token} = await response.json();
      localStorage.setItem("user", token);
      const path = "/in";
      window.location.href = path;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section
        className="justify-content-start row m-0"
        style={{
          height: "100vh",
          width: "100%",
          background: "rgb(34, 33, 35)",
        }}
      >
        <div className="col-md-6 p-4 text-light d-flex align-items-center justify-content-center" style={{backgroundColor:"#040C18"}}>
          <div className="col-md-7">
            <div className="col d-flex flex-column align-items-start">
              <div className="mb-3">
                <h1 className="fw-bold">Login</h1>
                <p>Get Started with demo cash and start your trading journey</p>
              </div>
              <label className="form-label my-1" style={{ fontSize: "1.3rem" }}>
                Username
              </label>
              <input
                type="username"
                className="form-control my-1 w-75"
                id="username"
                placeholder="Eg. abc@xyz.com"
                onChange={usernameChange}
                value={username}
              />
              <label className="form-label my-1" style={{ fontSize: "1.3rem" }}>
                Password
              </label>
              <input
                type="password"
                className="form-control my-1 w-75"
                id="password"
                placeholder="Set A Password"
                onChange={passwordChange}
                value={password}
              />
              <div className="row w-100 justify-content-start mt-4 mb-3 mx-0">
                <div
                  className="btn my-1 p-2 rounded-pill"
                  onClick={loginClick}
                  style={{backgroundColor:'#F49867' ,color:'black',fontWeight:'bold',fontSize:'1.5rem',width:'11rem'}}
                >
                  Login
                </div>
              </div>
              <p>Not Registered Yet? <Link to="/register" className="text-primary">Create an account</Link></p>
            </div>
          </div>
        </div>
        <div className="col-md-6  p-4" style={{background:'linear-gradient(89.97deg, #040c18 1.84%, #F49867 102.67%)'}} >
          <img src={LoginImg} alt="" />
        </div>
      </section>
    </>
  );
}

export default Login;
