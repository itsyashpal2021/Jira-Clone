const express = require("express");
const router = express.Router();
const {
  setUsername,
  signInWithGoogle,
  Signup,
  Login,
  ChangePassword,
} = require("../controllers/user.controller");

router.post("/googleAuth", signInWithGoogle);
router.post("/setUsername", setUsername);
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/change-password", ChangePassword);

module.exports = router;
