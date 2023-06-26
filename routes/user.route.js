const express = require("express");
const router = express.Router();
const { Signup, Login, ChangePassword } = require("../controllers/user.controller");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/change-password", ChangePassword);

module.exports = router;
