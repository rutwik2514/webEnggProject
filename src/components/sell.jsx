import React,{useState} from "react";
import Image from "../Assets/sell.svg";
import Navbar_loggedin from "../Elements/Navbars/navbar_loggedin";
const moment = require("moment");

function Sell() {
  //******states*******
  const [symbol, setSymbol] = React.useState("");
  const [purchasePrice, setPurchasePrice] = React.useState(0);
  const [data, setData] = React.useState(false);
  const [data2, setData2] = React.useState();
  const [canBuy, setCanBuy] = React.useState(0);
  const [error, setError] = React.useState(false);
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [user, setUser] = useState({
    username: "",
    portfolio: [],
    transactions: [],
    balance: 0,
  });
  const token = localStorage.getItem("user");

  //******************gets current date and time and converts into YYYY-MM-DD HH:mm:00 format because we recive data in interval of 5 minutes********************
  var startdate = moment();
  startdate = startdate.subtract(2, "days");
  startdate = startdate.format("YYYY-MM-DD, HH:mm:00");
  const remainder = 5 - (moment().minutes() % 5);
  const dateTime = moment(startdate)
    .add(remainder, "minutes")
    .format("YYYY-MM-DD HH:mm:00");
  console.log("date", dateTime);

  function handleChangeQuantity(e) {
    const { value } = e.target;
    setQuantity(value);
  }
  //sending information to backend whichever stocks want to sell
  const sellStock = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/sell", {
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
      if (data.status == "not ok") {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  //fetching data from api
  async function handleClick2(e) {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=JBQTJBWV8LLJYL6Y`
    )
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
    await getData();
    console.log('here ',purchasePrice)
    user.portfolio.forEach((element) => {
      if (element.stock == symbol) {
        setPurchasePrice(element.price);
      }
    });
    console.log('here2 ',purchasePrice)
  }

  function handleChangeSymbol(e) {
    const { value } = e.target;
    setSymbol(value);
  }

  //*****************************USEEFFECTS******************************************* */
  React.useEffect(() => {
    if (error == true) {
      setError(false);
      window.alert("Please enter valid quantity");
    }
  }, [error]);
  //checks if stock market is open to buy and sell
  React.useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 12 && hours < 20) {
      console.log("camein");
      setCanBuy(1);
    } else {
      setCanBuy(0);
    }
  }, []);

  //sets data in data2
  React.useEffect(() => {
    setData2(data["Time Series (5min)"]);
  }, [data]);

  //checking current price
  React.useEffect(() => {
    console.log(data2);
    for (var i in data2) {
      if (i == dateTime) {
        setPrice(data2[i]["4. close"]);
        break;
      } else {
      }
    }
  }, [data2]);

  return (
    <>
      <Navbar_loggedin />
      <div className="m-5">.</div>
      {canBuy ? (
        <section
          className="d-flex justify-content-start my-5"
          style={{ marginLeft: "3vw" }}
        >
          <div
            className="card col-md-5 justify-content-center p-3 pt-1"
            style={{
              border: "1px solid white",
              borderRadius: "5%",
              backgroundColor: "#c1b9b9",
            }}
          >
            <h1 className="" style={{ color: "black" }}>
              Sell Stock
            </h1>
            <hr
              style={{
                height: "4px",
                color: "#040C18",
                backgroundColor: "#040C18",
              }}
            />
            <h2 className="m-3">Stock Name: {symbol}</h2>
            <div className="d-flex justify-content-start align-items-center">
              <input
                type="text"
                className="m-2 rounded-pill p-3"
                placeholder="Stock Name"
                onChange={handleChangeSymbol}
                style={{
                  width: "10vw",
                  borderRadius: "3rem",
                  height: "4rem",
                  fontSize: "2rem",
                  textAlign: "center",
                  marginLeft: "20vw",
                }}
              />
              <button
                className="btn btn-success"
                style={{
                  height: "6vh",
                  width: "7vw",
                  borderRadius: "2rem",
                  fontSize: "1.9rem",
                  alignItems: "center",
                }}
                onClick={handleClick2}
              >
                Search
              </button>
            </div>
            <h2 className="m-3">Stock Purchased Price: {purchasePrice}</h2>
            <h2 className="m-3">Stock Current Price: {price}</h2>
            <h2 className="m-3">Profit: {Math.round((price-purchasePrice)*quantity)}</h2>
            <div className="d-flex pb-4">
            <h2 className="m-3">Quantity: {}</h2>
              <input
                type="text"
                className="m-2 rounded-pill p-3 ms-5 w-25"
                placeholder="Quantity"
                onChange={handleChangeQuantity}
                style={{
                  width: "10vw",
                  borderRadius: "3rem",
                  height: "3.4rem",
                  fontSize: "2rem",
                  textAlign: "center",
                  marginLeft: "20vw",
                }}
              />
            </div>
              <center>
                <button
                  className="btn btn-danger"
                  style={{
                    width: "13vw",
                    borderRadius: "2rem",
                    fontSize: "1.9rem",
                    alignItems: "center",
                  }}
                  onClick={sellStock}
                >
                  Sell
                </button>
              </center>
          </div>
          <div className="d-flex justify-content-end col-md-6">
            <img src={Image} alt="" style={{ width: "33vw" }} />
          </div>
        </section>
      ) : (
        <h3 style={{ color: "red", fontWeight: "bold", fontSize: "3rem" }}>
          Market is Closed . Not available at this time
        </h3>
      )}
      <section className="d-flex justify-content-center"></section>
    </>
  );
}

export default Sell;
