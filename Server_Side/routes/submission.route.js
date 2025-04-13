const express = require("express");
const { submitCode } = require("../controllers/submission.controller"); 
const router = express.Router();


router.post("/", submitCode); 

module.exports = router;
