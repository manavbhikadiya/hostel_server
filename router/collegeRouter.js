const express = require("express");
const route = express.Router();
const {addCollege, updateCollge, deleteCollege} = require('../controllers/collegeController')

route.post('/addCollege/:admin_id', addCollege)

route.post('/updateCollege/:id', updateCollge)

route.post('/deleteCollege/:id', deleteCollege)

module.exports = route