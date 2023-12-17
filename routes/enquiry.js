const express = require("express");
const router = express.Router();

const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getAllEnquiries,
  getEnquiryById,
} = require("../controller/enquiry");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
// Routes
router.post("/createEnquiry", createEnquiry);

router.put("/updateEnquiry", isAuthenticatedUser, authorizeRoles("admin"), updateEnquiry);

router.delete("/deleteEnquiry", isAuthenticatedUser, authorizeRoles("admin"), deleteEnquiry);

router.get("/getAllEnquiries", isAuthenticatedUser, authorizeRoles("admin"), getAllEnquiries);

router.post("/getEnquiryById", isAuthenticatedUser, authorizeRoles("admin"), getEnquiryById);

module.exports = router;
