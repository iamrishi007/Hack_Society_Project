const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  tags: [String],
  chapter: { type: String, required: true },
  testCases: [
    {
      input: { type: [mongoose.Schema.Types.Mixed], required: true },
      expectedOutput: { type: String, required: true },
    }
  ],
});

module.exports = mongoose.model("question", questionSchema);
