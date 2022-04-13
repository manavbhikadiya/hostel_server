const express = require("express");
const route = express.Router();
const { getAllHostels,addHostel, updateHostel, removeHostel, getAllHostelsOfCollege, getHostelDetails, getFavouriteHostels } = require('../controllers/hostelController');
const authenticate = require("../middleware/authenticate");
const { uploadProfile } = require('../middleware/file')

route.get('/getAllhostels',getAllHostels);

route.get('/getAllHostelsOfCollege/:college_id', getAllHostelsOfCollege);

route.get("/getHostelDetails/:college_id/:hostel_id", getHostelDetails);

route.get("/getFavouriteHostels/:user_id",getFavouriteHostels);


// hostel adder
route.post("/addHostel/:college_id", uploadProfile.single('hostel_image'), addHostel);

// hostel modifier
route.post('/update/:id', uploadProfile.single('hostel_image'), updateHostel)

// hostel remover
route.post('/delete/:id', removeHostel)

route.get('/initalData',authenticate,(req,res)=>{
    res.send(req.rootAdmin);
})

module.exports = route