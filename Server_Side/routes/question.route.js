const express = require("express");
const router = express.Router();
const { getAllQuestions, getQuestionById, createQuestion } = require("../controllers/question.controller");


router.post("/", createQuestion);


router.get("/", getAllQuestions);


router.get("/:id", getQuestionById);

module.exports = router;
