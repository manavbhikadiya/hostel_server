const express = require("express");
const route = express.Router();

const {uploadProfileController, updateUser, deleteUser, createUser} = require('../controllers/userController')
const {uploadProfile} = require('../middleware/file')

route.post('/', createUser)

route.post('/upload',uploadProfile.single("profile"), uploadProfileController)

route.post('/update/:id', uploadProfile.single("profile"), updateUser)

route.post('/delete/:id', deleteUser)

module.exports = route;