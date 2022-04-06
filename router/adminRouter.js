const express = require("express");
const route = express.Router();
const { registerAdmin, loginAdmin } = require("../controllers/adminController");

route.post("/registerAdmin", registerAdmin);

route.post("/loginAdmin", loginAdmin);

module.exports = route;
