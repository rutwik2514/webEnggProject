const express = require("express");
const router = express.Router();
const { predictionTrade } = require("../controllers/prediction");

router.route("/prediction").post(predictionTrade);

module.exports = router;