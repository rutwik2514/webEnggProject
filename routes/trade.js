const express = require("express");
const router = express.Router();
const { Buy, Sell } = require("../controllers/trade");

router.route("/buy").patch(Buy);
router.route("/sell").patch(Sell);

module.exports = router;