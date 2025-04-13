const mongoose = require('mongoose');

// Schema for submission
const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, 
  language: { type: String, required: true }, 
  code: { type: String, required: true }, 
  output: { type: [String], required: true },  
  expectedOutput: { type: [String], required: true },  
  passed: { type: Boolean, required: true },  
  submittedAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Submission', submissionSchema);
