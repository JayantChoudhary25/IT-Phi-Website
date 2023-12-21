const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: [true, "Please Enter Firstname"],
    },
    lName: {
      type: String,
      required: [true, "Please Enter Lastname"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email Address"],
      unique: true,
    },
    mobile: {
      type: String,
      required: [true, "Please Enter Mobile No."],
      unique: true,
    },
    message: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model("Enquiry", EnquirySchema);

module.exports = Enquiry;
