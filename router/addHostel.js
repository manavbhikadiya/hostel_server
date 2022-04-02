const express = require("express");
const route = express.Router();
const { addHostel, updateHostel, removeHostel } = require('../controllers/hostel')
const { uploadProfile } = require('../middleware/file')

// hostel adder
route.post("/add/:college_id", uploadProfile.single('hostel_image'), addHostel);

// hostel modifier
route.post('/update/:id', uploadProfile.single('hostel_image'), updateHostel)

// hostel remover
route.post('/delete/:id', removeHostel)

module.exports = route