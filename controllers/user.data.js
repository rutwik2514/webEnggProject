const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const getUserData = async (req, res) => {
  try {
    if (!req.headers.authorization.startsWith("BEARER ")) {
      res.status(404).send({ status: "not ok", msg: "Invalid Request" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const userData = await User.findOne(user);
    if (!userData) {
      res.status(400).send({ status: "not ok", msg: "user not found" });
    }
    res.status(200).send({ status: "ok", userData });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUserData };
