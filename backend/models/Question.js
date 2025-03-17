const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Question Title
  description: { type: String, required: true }, // Problem Statement
  difficulty: { 
    type: String, 
    enum: ["Easy", "Medium", "Hard"], 
    required: true 
  }, // Difficulty Level
  points: { type: Number, required: true }, // Points Based on Difficulty
  predefinedCode: {
    c: { type: String, required: true },
    java: { type: String, required: true },
    python: { type: String, required: true }
  }, // Predefined code for multiple languages
  expectedOutput: { type: String, required: true },
  testCases: [{
    input: { type: String, required: true }, // Input for test case
    expectedOutput: { type: String, required: true } // Expected Output
  }], status: { 
    type: String, 
    enum: ["Unattempted", "Completed", "Review"], 
    default: "Unattempted" 
  }
});

module.exports = mongoose.model("Question", questionSchema);
