const axios = require("axios");
const Question = require("../models/question.model"); // import your model

const JUDGE0_API = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

const headers = {
  "Content-Type": "application/json",
  "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
};

const runCode = async (req, res) => {
  const { code, language_id, questionId } = req.body;

  if (!code || !language_id || !questionId) {
    return res.status(400).json({ error: "Code, Language ID and Question ID are required" });
  }

  try {
    // Get test cases from DB
    const question = await Question.findById(questionId);
    if (!question || !question.testCases || question.testCases.length === 0) {
      return res.status(404).json({ error: "Question or test cases not found" });
    }

    const results = [];

    for (let test of question.testCases) {
      const response = await axios.post(
        JUDGE0_API,
        {
          source_code: code,
          language_id,
          stdin: test.input,
        },
        { headers }
      );

      const output = response.data.stdout?.trim();
      results.push({
        input: test.input,
        expected: test.expected,
        output,
        passed: output === test.expected,
      });
    }

    const passedAll = results.every(r => r.passed);

    res.json({
      status: passedAll ? "Accepted" : "Failed",
      results,
    });

  } catch (err) {
    console.error("Error in runCode:", err.message);
    res.status(500).json({ error: "Something went wrong while executing code" });
  }
};

module.exports = { runCode };
