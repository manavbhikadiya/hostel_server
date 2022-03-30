const express = require("express");
const route = express.Router();
const {addCollege, updateCollge, deleteUser} = require('../controllers/collegeController')

route.post('/addCollege', addCollege)

route.post('/updateCollege/:id', updateCollge)

route.post('/deleteCollege/:id', deleteUser)

module.exports = route