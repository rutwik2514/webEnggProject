import React, { useEffect, useState } from "react";

function Navbar_loggedin() {
  function handleClickLogout() {
    window.localStorage.removeItem("user");
    window.location.href = "/";
  }
  function handleClick() {
    window.location.href = "/analysis";
  }
  function handleClickBuy() {
    window.location.href = "/buy";
  }
  function handleClickSell() {
    window.location.href = "/sell";
  }
  function handleClickDashboard() {
    window.location.href = "/dashboard";
  }
  const [user, setUser] = useState({
    username: "",
    portfolio: [],
    transactions: [],
    balance: 0,
  });

  const token = localStorage.getItem("user");
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "BEARER " + token,
        },
      });
      const data = await response.json();
      setUser(data.userData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (user.username == "") {
    // window.location.href = "/login";
    return (<h1 className="text-danger text-center m-3">Not Authorized</h1>)
  }
  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <h3
            style={{
              color: "white",
              paddingRight: "1vw",
              fontSize: "2.5rem",
              paddingLeft: "0.1rem",
              fontWeight: "bolder",
            }}
            id="logo"
          >
            PaperMarket
          </h3>
        </div>
      </div>
      <div className="navbar-sign">
        <button
          type="button"
          onClick={handleClickLogout}
          className=" btn mx-2"
          style={{
            borderRadius: "1.4rem",
            // backgroundColor: "#5c11ac",
            color: "#efbdf4",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
      <div className="navbar-sign">
        <button
          type="button"
          className="btn mx-2"
          style={{
            borderRadius: "1.4rem",
            // backgroundColor: "#5c11ac",
            color: "#efbdf4",
            fontWeight: "bold",
          }}
          onClick={handleClick}
        >
          Prediction Game
        </button>
      </div>
      <div className="navbar-sign">
        <button
          type="button"
          className="btn mx-2"
          onClick={handleClickBuy}
          style={{
            borderRadius: "1.4rem",
            // backgroundColor: "#5c11ac",
            color: "#efbdf4",
            fontWeight: "bold",
          }}
        >
          Buy
        </button>
      </div>
      <div className="navbar-sign">
        <button
          type="button"
          className="btn mx-2"
          onClick={handleClickSell}
          style={{
            borderRadius: "1.4rem",
            // backgroundColor: "#5c11ac",
            color: "#efbdf4",
            fontWeight: "bold",
          }}
        >
          Sell
        </button>
      </div>
      <div className="navbar-sign">
        <button
          type="button"
          className="btn mx-2"
          onClick={handleClickDashboard}
          style={{
            borderRadius: "1.4rem",
            // backgroundColor: "#5c11ac",
            color: "#efbdf4",
            fontWeight: "bold",
          }}
        >
          Dashboard
        </button>
        <div className="navbar-sign">
          <button type="button" className=" mx-2" id="credits">
            ${Math.round(user.balance)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar_loggedin;
