const Question = require('../models/question.model');  // Import the Question model


const createQuestion = async (req, res) => {
  const { title, description, difficulty, tags, chapter, testCases } = req.body;
  

  if (!title || !description || !difficulty || !tags || !chapter) {
    return res.status(400).json({
      message: "All fields are required: title, description, difficulty, tags, chapter",
    });
  }

  try {
    const newQuestion = new Question({
      title,
      description,
      difficulty,
      tags,
      chapter,
      testCases,
    });

    await newQuestion.save();
    res.status(201).json({
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating question",
      error: error.message,
    });
  }
};


const getAllQuestions = async (req, res) => {
  const { difficulty, tags, chapter } = req.query;  

  try {
    let filter = {};
    if (difficulty) filter.difficulty = difficulty;
    if (tags) filter.tags = { $in: tags.split(',') };  
    if (chapter) filter.chapter = chapter;

    const questions = await Question.find(filter);  
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching questions",
      error: error.message,
    });
  }
};


const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching question",
      error: error.message,
    });
  }
};

module.exports = { createQuestion, getAllQuestions, getQuestionById };
