const express = require("express");
const route = express.Router();
const { registerAdmin, loginAdmin,logoutAdmin } = require("../controllers/adminController");

route.post("/registerAdmin", registerAdmin);

route.post("/loginAdmin", loginAdmin);

route.get('/logout',logoutAdmin);

module.exports = route;
