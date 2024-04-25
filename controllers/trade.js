const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


// Buy Stock
const Buy = async (req, res) => {
  try {
    if (!req.headers.authorization.startsWith("BEARER ")) {
      return res.status(404).send({ status: "not ok", msg: "invalid request" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const { qty, price, stock } = req.body;
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const userData = await User.findOne(user);
    const date = new Date();
    if (!userData) {
      return res.status(400).send({ status: "not ok", msg: "user not found" });
    }
    if (userData.balance < qty * price) {
      return res.status(400).send({ status: "not ok", msg: "not enough balance" });
    }
    let portfolio = userData.portfolio;
    let transactionArray = userData.transactions;
    let exists = false;
    portfolio.forEach(async (element) => {
      if (element.stock == stock) {
        exists = true;
        element.price =
          (element.qty * element.price + qty * price) / (element.qty + qty);
        element.qty += qty;
        element.dates.push({
          day: date.getDate() + "/" + (Number(date.getMonth()) + 1),
          time:
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
        });
        transactionArray.push({
          trade: "buy",
          stock,
          qty,
          price,
          date: {
            day: date.getDate() + "/" + (Number(date.getMonth()) + 1),
            time:
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds(),
          },
        });
        const newUser = await User.findByIdAndUpdate(userData._id, {
          portfolio: portfolio,
          balance: userData.balance - qty * price,
          transactions: transactionArray,
        });
        return res.status(200).send({ status: "ok", msg: "trade done", newUser });
      }
    });
    if (!exists) {
      portfolio.push({
        stock,
        qty,
        price,
        dates: [
          {
            day: date.getDate() + "/" + (Number(date.getMonth()) + 1),
            time:
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds(),
          },
        ],
      });
      transactionArray.push({
        trade: "buy",
        stock,
        qty,
        price,
        date: {
          day: date.getDate() + "/" + (Number(date.getMonth()) + 1),
          time:
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
        },
      });
      const newUser = await User.findByIdAndUpdate(userData._id, {
        portfolio: portfolio,
        balance: userData.balance - qty * price,
        transactions: transactionArray,
      });
      return res.status(200).send({ status: "ok", msg: "trade done", newUser });
    }
  } catch (error) {
    console.log(error);
  }
};

const Sell = async (req, res) => {
  try {
    if (!req.headers.authorization.startsWith("BEARER ")) {
      return res.status(404).send({ status: "not ok", msg: "invalid Request" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const { qty, price, stock } = req.body;
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const userData = await User.findOne(user);
    const date = new Date();
    if (!userData) {
      return res.status(400).send({ status: "not ok", msg: "user not found" });
    }
    
    let portfolio = userData.portfolio;
    let transactionArray = userData.transactions;
    let exists = false;
    portfolio.forEach(async (element) => {
      if (element.stock == stock) {
        if(element.qty<qty){
          return res.status(400).send({status:'not ok', msg:'invalid qty'})
        }
        else if (element.qty == qty) {
          portfolio.remove(element);
          exists = true;
        } else {
          exists = true;
          element.qty -= qty;
        }
      }
    });
    if (exists) {
      transactionArray.push({
        trade: "sell",
        stock,
        qty,
        price,
        date: {
          day: date.getDate() + "/" + (Number(date.getMonth()) + 1),
          time:
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
        },
      });
      const newUser = await User.findByIdAndUpdate(userData._id, {
        portfolio,
        balance: userData.balance + qty * price,
        transactions:transactionArray
      });
      return res.status(200).send({ status: "ok", msg: "trade done", newUser });
    } else {
      return res.status(400).send({ status: "not ok", msg: "invalid trade" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { Buy, Sell };