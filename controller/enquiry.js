const Enquiry = require("../models/Enquiry");
const validateMongoDbId = require("../utils/validateMongodbId");

// Create a new enquiry
exports.createEnquiry = async (req, res) => {
  const { firstname, lastname, email, mobile, message } = req.body;
  
  try {
    const newEnquiry = await Enquiry.create({
      firstname,
      lastname,
      email,
      mobile,
      message,
    });
    
    res.status(201).json(newEnquiry); // Status code 201 for resource creation
  } catch (error) {
    res.status(500).json({ error: error.message }); // Status code 500 for internal server error
  }
};

// Update an enquiry by ID
exports.updateEnquiry = async (req, res) => {
  const { id } = req.body;
  validateMongoDbId(id);
  
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedEnquiry) {
      return res.status(404).json({ error: "Enquiry not found" }); // Status code 404 for not found
    }
    
    res.json(updatedEnquiry);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Status code 500 for internal server error
  }
};

// Delete an enquiry by ID
exports.deleteEnquiry = async (req, res) => {
  const { id } = req.body;
  validateMongoDbId(id);
  
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return res.status(404).json({ error: "Enquiry not found" }); // Status code 404 for not found
    }
    
    res.json(deletedEnquiry);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Status code 500 for internal server error
  }
};

// Get all enquiries
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Status code 500 for internal server error
  }
};

// Get a specific enquiry by ID
exports.getEnquiryById = async (req, res) => {
  const { id } = req.body;
  validateMongoDbId(id);

  try {
    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({ error: "Enquiry not found" }); // Status code 404 for not found
    }
    
    res.json({ enquiry });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Status code 500 for internal server error
  }
};
