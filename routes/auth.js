const express = require("express");
const router = express.Router();

const {
  register,
  login,
  adminLogin,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("../controller/auth");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/login").post(login);

router.route("/adminLogin").post(adminLogin);

router.route("/logout").get(logout);

// Create User
router.route("/register").post(register);

// Update User Password
router.post("/updatePassword", isAuthenticatedUser, updatePassword);

router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").put(resetPassword);


module.exports = router;
