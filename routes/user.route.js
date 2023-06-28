const express = require("express");
const router = express.Router();
const {
  setUsername,
  signInWithGoogle,
  Signup,
  Login,
  ChangePassword,
  checkSession,
} = require("../controllers/user.controller");

router.post("/googleAuth", signInWithGoogle);
router.post("/setUsername", setUsername);
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/change-password", ChangePassword);
router.post("/checkSession", checkSession);

module.exports = router;
