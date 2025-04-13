const Submission = require("../models/submission.model");
const Question = require("../models/question.model");
const runCode = require("../utils/judge0"); // 👈 Import helper

const submitCode = async (req, res) => {
  const { userId, questionId, language_id, code } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: "Question not found" });

    const expectedOutput = question.expectedOutput.trim();
    const outputFromAPI = await runCode(code, language_id, ""); // no custom input for now
    const actualOutput = (outputFromAPI.stdout || "").trim();

    const passed = actualOutput === expectedOutput;

    const submission = new Submission({
      userId,
      questionId,
      language: language_id,
      code,
      output: [actualOutput],
      expectedOutput: [expectedOutput],
      passed,
    });

    await submission.save();

    res.status(200).json({
      message: "Code submitted",
      output: actualOutput,
      passed,
    });
  } catch (error) {
    console.error("Submit code error:", error);
    res.status(500).json({ message: "Error submitting code", error: error.message });
  }
};

module.exports = { submitCode };
