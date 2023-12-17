const express = require('express');
const router = express.Router();

const {
  register,
  adminLogin,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("../controller/auth");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.post("/adminLogin", adminLogin);

router.get("/logout", logout);

router.post("/register", register);

router.post("/updatePassword", isAuthenticatedUser, updatePassword);

router.post("/forgotpassword", forgotPassword);

router.put("/resetpassword/:resetToken", resetPassword);


module.exports = router;
