import React, { Component } from "react";
import Image from "../Assets/buy.svg";
import Navbar_loggedin from "../Elements/Navbars/navbar_loggedin";
const moment = require("moment");
function Apitest() {
  //***********************************STATES******************************* */
  const [symbol, setsymbol] = React.useState("");
  const [data, setData] = React.useState(false);
  const [data2, setData2] = React.useState();
  const [canBuy, setCanBuy] = React.useState(1);
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const token = localStorage.getItem("user");
  //**************** getting key in format YYYY-MM-DD HH:mm:00 so as to acess data recived from api */
  var startdate = moment();
  startdate = startdate.subtract(2, "days");
  startdate = startdate.format("YYYY-MM-DD, HH:mm:00");
  const remainder = 5 - (moment().minutes() % 5);
  const dateTime = moment(startdate)
    .add(remainder, "minutes")
    .format("YYYY-MM-DD HH:mm:00");
  console.log("date", dateTime);
  //**********************************FUNCTIONS****************************** */
  //sets user input in symbol
  function handleChange(e) {
    const { value } = e.target;
    setsymbol(value);
  }
  //as soon as button is clicked, data is being fetched from the api.
  async function handleClick2(e) {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=JBQTJBWV8LLJYL6Y`
    )
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  }
  function handleChangeQuantity(e) {
    const { value } = e.target;
    setQuantity(value);
    console.log(quantity);
  }
  const buyStock = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/buy", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "BEARER " + token,
        },
        body: JSON.stringify({
          stock: symbol,
          qty: Number(quantity),
          price: Number(price),
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //checks if market is open to buy and sell stocks
  React.useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    // if (hours >= 12 && hours < 20) {
    //   console.log("camein");
    //   setCanBuy(1);
    // } else {
    //   setCanBuy(0);
    // }
  }, []);

  //stores data in data2
  React.useEffect(() => {
    setData2(data["Time Series (5min)"]);
  }, [data]);

  //checks data with data from api and sets price
  React.useEffect(() => {
    console.log("date time is", dateTime);
    for (var i in data2) {
      // console.log("i", i);
      if (i == "2024-04-17 12:20:00") {
        setPrice(data2[i]["4. close"]);
        break;
      }
    }
  }, [data2]);

  return (
    <>
      <section>
        <Navbar_loggedin />
        <center>
          <div
            className="card  "
            style={{
              width: "50vw",
              marginBottom: "8vh",
              marginTop: "2vh",
              backgroundColor: "#040C18",
            }}
          >
            <h3
              style={{
                color: "white",
                fontWeight: "bolder",
                fontSize: "3rem",
                paddingBottom: "1.5rem",
              }}
            >
              Stocks
            </h3>
            <div>
              <input
                type="text"
                className="m-2 rounded-pill p-3"
                placeholder="Enter stock name"
                onChange={handleChange}
                style={{
                  width: "25vw",
                  borderRadius: "3rem",
                  height: "4rem",
                  fontSize: "2rem",
                  textAlign: "center",
                }}
              />
            </div>
          </div>

          {canBuy ? (
            <>
              <center className="m-3">
                <button
                  type="button"
                  className=" btn btn-outline-primary  p-2 rounded-pill"
                  style={{
                    width: "10rem",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    marginBottom: "5vh",
                  }}
                  onClick={handleClick2}
                >
                  Search
                </button>
              </center>
              {price && (
                <section
                  className="d-flex justify-content-start "
                  style={{ width: "95vw" }}
                >
                  <div
                    className="card col-md-5 mx-4"
                    style={{
                      marginTop: "0vh",
                      maxHeight: "50vh",
                      borderRadius: "3rem",
                      backgroundColor: "#c1b9b9",
                    }}
                  >
                    <h4
                      className="text-start m-5 "
                      style={{ fontSize: "2rem" }}
                    >
                      Stock Name: {symbol}{" "}
                    </h4>
                    <h4 className="text-start m-5" style={{ fontSize: "2rem" }}>
                      Stock Price: {price}
                    </h4>
                    <div className="d-flex align-items-center">
                      <h4
                        className="text-start m-5"
                        style={{ fontSize: "2rem" }}
                      >
                        Quantity:{" "}
                      </h4>
                      <input
                        type="text"
                        className="m-2 rounded-pill p-3"
                        placeholder="Quantity"
                        onChange={handleChangeQuantity}
                        style={{
                          width: "10vw",
                          borderRadius: "3rem",
                          height: "4rem",
                          fontSize: "2rem",
                          textAlign: "center",
                          marginLeft: "20vw",
                        }}
                      />
                    </div>
                    <center>
                      <button
                        className="btn btn-success "
                        style={{
                          width: "13vw",
                          borderRadius: "2rem",
                          fontSize: "1.9rem",
                          alignItems: "center",
                        }}
                        onClick={buyStock}
                      >
                        Buy
                      </button>
                    </center>
                  </div>
                  <div className="md-5" style={{ marginLeft: "15vw" }}>
                    <img src={Image} alt="" style={{ height: "60vh" }} />
                  </div>
                </section>
              )}
            </>
          ) : (
            <h3 style={{ color: "red", fontWeight: "bold", fontSize: "3rem" }}>
              Market is Closed . Not available at this time
            </h3>
          )}
        </center>
      </section>
    </>
  );
}

export default Apitest;
