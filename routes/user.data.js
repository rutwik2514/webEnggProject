const express = require("express");
const router = express.Router();
const { getUserData } = require("../controllers/user.data");

router.route("/dashboard").post(getUserData);

module.exports = router;