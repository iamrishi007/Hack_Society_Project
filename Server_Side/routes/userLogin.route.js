const express = require("express");
const userLogin = require("../controllers/userLogin");

const userLoginRoute = express.Router();

userLoginRoute.post("/login", userLogin);

module.exports = userLoginRoute;
