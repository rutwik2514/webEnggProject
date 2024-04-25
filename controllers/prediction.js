const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { spawn } = require("child_process");

const predictionTrade = async (req, res) => {
  try {
    if (!req.headers.authorization.startsWith("BEARER ")) {
      res.status(404).send({ status: "not ok", msg: "invalid request" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const { prediction, stock } = req.body;
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const userData = await User.findOne(user);
    const date = new Date();
    if (!userData) {
      return res.status(400).send({ status: "not ok", msg: "user not found" });
    }
    if (userData.balance < 50) {
      return res
        .status(400)
        .send({ status: "not ok", msg: "not enough balance" });
    } 
    else {
      let ans = 0;
      await new Promise((resolve, reject) => {
        var childpython = spawn("python", ["PredictorModel.py", stock]);
        childpython.stdout.on("data", (data) => {
          ans = `${data}`;
          ans = Number(ans);
          ans = ans < 50 ? 1 : 0;
          resolve(true);
        });
        childpython.stderr.on("data", (data) => {
          console.error(`stderr: ${data}`);
          resolve(true);
        });
      }).then(() => {
        return res.send({ status: "done", win: ans === prediction ? 1 : 0 });
      });

      let reward = -50;
      if (ans == prediction) {
        console.log("here");
        reward = 75;
      }
      const newUser = await User.findByIdAndUpdate(userData._id, {
        balance: userData.balance + reward,
        lastPrediction: date.getDate() + "/" + (Number(date.getMonth()) + 1),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { predictionTrade };


    // else if (
    //   userData.lastPrediction ==
    //   date.getDate() + "/" + (Number(date.getMonth()) + 1)
    // ) {
    //   return res
    //     .status(400)
    //     .send({ status: "not ok", msg: "limit exceeded" });
    // } 