const express = require("express");
const userRegister = require("../controllers/userRegister");

const userRouter = express.Router();


userRouter.post("/register", userRegister);

module.exports = userRouter;
