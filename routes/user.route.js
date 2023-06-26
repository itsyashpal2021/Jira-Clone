const express = require("express");
const router = express.Router();
const {
  Signup
} = require("../controllers/user.controller");

router.post("/signup", Signup);
// router.post("/login", Login);
// router.post("/logout", checkAccessToken, Logout);

module.exports = router;
