const express = require("express");
const route = express.Router();
const {hostelController} = require('../controllers/hostel')
const {uploadProfile} =  require('../middleware/file')
route.post("/addHostel/:college_id",uploadProfile.single('profile'),hostelController );
module.exports = route