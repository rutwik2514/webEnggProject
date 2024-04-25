import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar_loggedin from "../Elements/Navbars/navbar_loggedin";
import { IconName } from "react-icons/bi";
import ProfitImg from "../Assets/Profit.svg"
import WalletImg from "../Assets/Wallet.svg"
import UserImg from "../Assets/User.svg"

function Dashboard() {
  const [totalProfit, setTotalProfit] = React.useState(0);
  const [user, setUser] = React.useState({
    portfolio: [],
    transactions: [],
    balance: 0,
  });
  //getting data from api to show on dashboard
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
      //   console.log("here", user);
    } catch (error) {
      console.log(error);
    }
  };
  //calculating profit
  React.useEffect(() => {
    getData();
    let largest = 0;
    let sum = 0;
    const Array = user.transactions;
    console.log("here", Array);
    for (let index = 0; index < Array.length; index++) {
      console.log("sum", sum);
      const element = Array[index];
      if (element.trade === "buy") sum -= element.price * element.qty;
      else sum += element.price * element.qty;
    }
    setTotalProfit(sum);
  }, [user.balance]);

  //displaying portfolio
  const render = user.portfolio.map((element, index) => {
    return (
      <div
        className="d-flex card flex-row justify-content-around p-1 m-2"
        key={index}
      >
        <div className="col-md-4">
          <h2 className="text-center">{element.stock}</h2>
        </div>
        <div className="col-md-4">
          <h2 className="text-center">{element.qty}</h2>
        </div>
        <div className="col-md-4">
          <h2 className="text-center">${element.price}</h2>
        </div>
      </div>
    );
  });
  //displaying transaction history
  const historyRender = user.transactions.map((element, index) => {
    return (
      <div
        className="d-flex card flex-row justify-content-around p-1 m-1"
        key={index}
      >
        <div className="col-md-3">
          <h2 className="text-center">{element.stock}</h2>
        </div>
        <div className="col-md-3">
          <h2 className="text-center text-capitalize">{element.trade}</h2>
        </div>
        <div className="col-md-3">
          <h2 className="text-center">{element.qty}</h2>
        </div>
        <div className="col-md-3">
          <h2 className="text-center">${element.price}</h2>
        </div>
      </div>
    );
  });
  return (
    <>
      <section className="m-0 p-0" style={{ height: "100vh" }}>
        <Navbar_loggedin />
        <div
          className="d-flex m-0 p-1 justify-content-between"
          style={{ height: "87vh" }}
          id="bottom-d-flex"
        >
          <div
            className="col-md-2 d-flex flex-column justify-content-between py-2"
            id="left-panel"
            style={{
              background:
                "radial-gradient(circle at 5% 23%, rgba(0, 40, 83, 1) 2%, rgba(4, 12, 24, 1) 25%)",
            }}
          >
            <div className="py-3">
              <div className="p-2 text-center my-4 card text-dark shadow-lg">
                <h2>Dashboard</h2>
              </div>
              <div className="p-2 text-center my-4 text-light">
                <h2>
                  <Link to="/analysis">Analysis</Link>
                </h2>
              </div>
              <div className="p-2 text-center my-4 text-light">
                <h2>Help</h2>
              </div>
            </div>
          </div>
          <div
            className="col-md-10 bg-secondary p-2"
            id="right-panel"
            style={{ borderRadius: "1.3rem" }}
          >
            <div className="d-flex justify-content-around align-items-center h-25 pb-1">
              <div
                className="col-md-2 card d-flex flex-row justify-content-between p-2"
                style={{ borderRadius: "1rem" }}
              >
                <div
                  className="col-3 "
                  style={{
                    height: "6rem",
                    width: "6rem",
                    borderRadius: "0.5rem",
                  }}
                ><img src={UserImg} alt="" /></div>
                <div className="col-7">
                  <h2 className="fw-bold ps-1"> Hello,</h2>
                  <h2 className="fw-bold ps-1">{user.username}</h2>
                </div>
              </div>
              <div
                className="col-md-2 card d-flex flex-row justify-content-between p-2"
                style={{ borderRadius: "1rem" }}
              >
                <div
                  className="col-3"
                  style={{
                    height: "6rem",
                    width: "6rem",
                    borderRadius: "0.5rem",
                  }}
                ><img src={ProfitImg} alt="" /></div>
                <div className="col-7 ">
                  <h2 className="fw-bold">Profit :</h2>
                  <h2>${Math.round(totalProfit)}</h2>
                </div>
              </div>
              <div
                className="col-md-2 card d-flex flex-row justify-content-between p-2"
                style={{ borderRadius: "1rem" }}
              >
                <div
                  className="col-3"
                  style={{
                    height: "6rem",
                    width: "6rem",
                    borderRadius: "0.5rem",
                  }}
                ><img src={WalletImg} alt="" /></div>
                <div className="col-7">
                  <h2 className="fw-bold ">Balance :</h2>
                  <h2 className="">${Math.round(user.balance)}</h2>
                </div>
              </div>
            </div>
            <div className="d-flex h-75 justify-content-around">
              <div
                className="col-md-7 card p-2"
                style={{
                  borderRadius: "1.3rem",
                  backgroundColor: "rgb(1, 22, 44)"
                }}
              >
                <div
                  className="d-flex card flex-row justify-content-around p-1 m-2"
                  style={{ backgroundColor: "rgb(1, 22, 44)" }}
                >
                  <div
                    style={{
                      color:'wheat'
                    }}
                  >
                    <h1 className="fw-bold">Stock</h1>
                  </div>
                  <div
                    style={{
                      color:'wheat'
                    }}
                  >
                    <h1 className="fw-bold">Qty</h1>
                  </div>
                  <div
                    style={{
                      color:'wheat'
                    }}
                  >
                    <h1 className="fw-bold">Price</h1>
                  </div>
                </div>
                {render}
              </div>
              <div className="col-md-4 card" style={{ borderRadius: "1.3rem",backgroundColor: "rgb(1, 22, 44)" }}>
                <div
                  className="d-flex card flex-row justify-content-around"
                  style={{ backgroundColor: "rgb(1, 22, 44)",paddingTop:'1.25rem' }}
                >
                  <div
                    style={{
                      color:'wheat',
                    }}
                  >
                    <h1 className="fw-bold"style={{fontSize:'2.3rem'}}>Stock</h1>
                  </div>
                  <div
                    style={{
                      color:'wheat'
                    }}
                  >
                    <h1 className="fw-bold"  style={{fontSize:'2.3rem'}}>Trade</h1>
                  </div>
                  <div
                    style={{
                      color:'wheat'
                    }}
                  >
                    <h1 className="fw-bold" style={{fontSize:'2.3rem'}}>Qty</h1>
                  </div>
                  <div
                    style={{
                      color:'wheat'
                    }}
                  >
                    <h1 className="fw-bold" style={{fontSize:'2.3rem'}}>Price</h1>
                  </div>
                </div>
                {historyRender}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
