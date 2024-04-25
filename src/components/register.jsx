import React, { useState } from "react";
import SignupImg from "../Assets/signup.svg";

function Register() {
  //***********states ***********
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //sets email as user inputs
  const emailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  //sets name as user inputs
  const nameChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  //sets username as user inputs
  const usernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  //sets password as user inputs
  const passwordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  //sets confirm password as user inputs
  const confirmPasswordChange = (event) => {
    const { value } = event.target;
    setConfirmPassword(value);
  };

  //function after clicking the register button
  const registerClick = async () => {
    //any field should not be empty
    if (
      name === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      window.alert("No Field can be empty");
      return;
    }
    //if password and confirmPassword does not match
    if (password !== confirmPassword) {
      window.alert("Password and Confirm Password don't match");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    //stringifies data
    const requestBody = JSON.stringify({
      name,
      username,
      email,
      password,
    });

    //sends data to backend and redirects to login page
    try {
      const response = await fetch("http://localhost:4000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
      const data = await response.json();
      window.location.href = "login";
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
        <div
          className="col-md-6 p-4 text-light d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#040C18" }}
        >
          <div className="col-md-7">
            <div className="col d-flex flex-column align-items-start">
              <div className="mb-3">
                <h1 className="fw-bold">Register</h1>
                <p>Get Started with demo cash and start your trading journey</p>
              </div>
              <label className="form-label my-1" style={{ fontSize: "1.5rem" }}>
                Name
              </label>
              <input
                type="tel"
                className="form-control my-1 w-75"
                id="name"
                placeholder="Enter Your Name"
                onChange={nameChange}
                value={name}
                style={{ width: "95%" }}
              />
              <label className="form-label my-1" style={{ fontSize: "1.5rem" }}>
                Username
              </label>
              <input
                type="tel"
                className="form-control my-1 w-75"
                id="name"
                placeholder="Enter Your Name"
                onChange={usernameChange}
                value={username}
                style={{ width: "95%" }}
              />
              <label className="form-label my-1" style={{ fontSize: "1.5rem" }}>
                Email Address
              </label>
              <input
                type="email"
                className="form-control my-1 w-75"
                id="email"
                placeholder="Eg. abc@xyz.com"
                onChange={emailChange}
                value={email}
                style={{ width: "95%" }}
              />
              <label className="form-label my-1" style={{ fontSize: "1.5rem" }}>
                Password
              </label>
              <input
                type="password"
                className="form-control my-1 w-75"
                id="password"
                placeholder="Set A Password"
                onChange={passwordChange}
                value={password}
                style={{ width: "95%" }}
              />
              <label className="form-label my-1" style={{ fontSize: "1.5rem" }}>
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control my-1 w-75"
                id="confirmPassword"
                placeholder="Re-Enter The Password"
                onChange={confirmPasswordChange}
                value={confirmPassword}
                style={{ width: "95%" }}
              />
              <div className="row w-100 justify-content-start mt-4 mb-3 mx-0">
                <div
                  className="btn my-1 p-2 rounded-pill"
                  onClick={registerClick}
                  style={{
                    backgroundColor: "#F49867",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    width: "11rem",
                  }}
                >
                  SignUp
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-md-6  p-4"
          style={{
            background:
              "linear-gradient(89.97deg, #040c18 1.84%, #F49867 102.67%)",
          }}
        >
          <img src={SignupImg} alt="" />
        </div>
      </section>
    </>
  );
}

export default Register;
