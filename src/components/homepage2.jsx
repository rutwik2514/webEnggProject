import React, {useState, useEffect } from "react";
import Navbar_loggedin from "../Elements/Navbars/navbar_loggedin";
import Header from "../Elements/Headers/Header";
import Feautres from "../Elements/feautres/Feautres";
import Homepagesignup from "../Elements/Homepagesignup/Homepagesignup";
import Footer from "../Elements/footer/footer";
function Homepage2() {

  // const [user, setUser] = useState({
  //   username:'',
  //   portfolio: [],
  //   transactions: [],
  //   balance: 0,
  // });

  // const token = localStorage.getItem("user");
  // const getData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:4000/api/v1/dashboard", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "BEARER " + token,
  //       },
  //     });
  //     const data = await response.json();
  //     setUser(data.userData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(()=>{
  //   getData();
  // },[]);
  // if(user.username==''){
  //   return(<h1 className="text-center text-danger mt-4">Not Authorized to Access this Route</h1>)
  // }
  return (
    <>
    {/* Renders components of homepage after log in */}
    <div className="gradient__bg">
      <Navbar_loggedin />
      <Header />
      <Feautres />
      <Homepagesignup />
      <Footer /></div>
      
    </>
  );
}

export default Homepage2;
