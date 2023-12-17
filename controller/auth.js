const User = require("../models/User");
const ErrorResponse = require("../utils/errorRes");
const sendEmail = require("../utils/sendEmail");
const validateMongoDbId = require("../utils/validateMongodbId");
const crypto = require("crypto");
const uniqid = require('uniqid');
const { generateToken } = require("../config/jwtToken");
const sendToken = require("../utils/jwtToken");


exports.register = async (req, res, next) => {
  const { email, mobile } = req.body;

  const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });

  if (existingUser) {
    return res
      .status(203)
      .json({ error: "User with this email or mobile number already exists." });
  }

  try {
    const newUser = await User.create(req.body);
    sendToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const findAdmin = await User.findOne({ email }).select("+password");
    
    if (!findAdmin) {
      throw new Error("Admin not found");
    }

    if (findAdmin.role !== "admin") {
      throw new Error("Not Authorized");
    }

    if (await findAdmin.matchPasswords(password)) {
      sendToken(findAdmin, 201, res);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  // Clear the token cookie
  res.clearCookie('token');

  // Send a response indicating successful logout
  res.status(200).json({ success: true, message: 'Logout successful' });
};

