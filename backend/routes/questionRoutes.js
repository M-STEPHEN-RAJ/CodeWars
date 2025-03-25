const express = require("express");
const Question = require("../models/Question");
const router = express.Router();

const getPoints = (difficulty) => {
    if (difficulty === "Easy") return 5;
    if (difficulty === "Medium") return 10;
    if (difficulty === "Hard") return 20;
    return 0;
};

// Add a question
router.post("/add", async (req, res) => {
  try {
      console.log("Incoming request data:", req.body); // Debugging log

      const { title, description, difficulty, predefinedCode, expectedOutput, testCases, status } = req.body;
      const points = getPoints(difficulty);

      const question = new Question({
          title,
          description,
          difficulty,
          points,
          predefinedCode,
          expectedOutput,
          testCases,
          status // Now supporting multiple test cases
      });

      await question.save();
      res.status(201).json({ message: "Question added successfully" });
  } catch (error) {
      console.error("Error adding question:", error); // Log errors
      res.status(500).json({ error: "Error adding question" });
  }
});


// Get all questions
router.get("/", async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: "Error fetching questions" });
    }
});

// Get a specific question by ID
router.get("/:id", async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }
        res.json(question);
    } catch (error) {
        console.error("Error fetching question:", error);
        res.status(500).json({ error: "Error fetching question" });
    }
});

// Update a question
router.put("/update/:id", async (req, res) => {
    try {
        const { title, description, difficulty, predefinedCode, expectedOutput } = req.body;
        const points = getPoints(difficulty);

        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            { title, description, difficulty, points, predefinedCode, expectedOutput },
            { new: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ error: "Question not found" });
        }
        res.json({ message: "Question updated successfully", updatedQuestion });
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(500).json({ error: "Error updating question" });
    }
});

// Delete a question
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) {
            return res.status(404).json({ error: "Question not found" });
        }
        res.json({ message: "Question deleted successfully" });
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ error: "Error deleting question" });
    }
});

// BULK ADD Questions
router.post("/bulkAdd", async (req, res) => {
    try {
      const questionsData = req.body; // Expecting an array of question objects
      if (!Array.isArray(questionsData) || questionsData.length === 0) {
        return res.status(400).json({ error: "No questions provided for bulk add." });
      }
  
      // Map through the incoming data to calculate points for each question
      const formattedQuestions = questionsData.map((q) => ({
        title: q.title,
        description: q.description,
        difficulty: q.difficulty,
        points: getPoints(q.difficulty),
        predefinedCode: q.predefinedCode,
        testCases: q.testCases,
        status: q.status || "Unattempted"
      }));
  
      await Question.insertMany(formattedQuestions);
      res.status(201).json({ message: `${formattedQuestions.length} Questions added successfully.` });
    } catch (error) {
      console.error("Error during bulk add:", error);
      res.status(500).json({ error: "Error adding questions in bulk." });
    }
  });

  router.delete("/deleteAll", async (req, res) => {
    try {
      await Question.deleteMany({});
      res.json({ message: "All questions deleted successfully" });
    } catch (error) {
      console.error("Error deleting all questions:", error);
      res.status(500).json({ error: "Error deleting all questions" });
    }
  });
  
  

module.exports = router;
