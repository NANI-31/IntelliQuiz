const User = require("../models/userSchema");
const getQuizzes = require("../utils/getQuizzes");
exports.getQuiz = async (req, res) => {
  try {
    // Find the user by id
    console.log(req.query);
    const { userId, text, level } = req.query;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    console.log(getQuizzes());
    const quizzes = await getQuizzes();
    console.log(quizzes.length);
    const quizEntry = {
      prompt: text,
      questions: quizzes,
      total: quizzes.length,
      createdAt: new Date(),
    };

    user.quizzes.push(quizEntry);
    await user.save();
    console.log("Quiz saved successfully!", quizEntry);
    res.status(200).json({ message: "Quiz saved successfully!", quizEntry });
  } catch (error) {
    console.error("Error saving quiz:", error);
    throw error;
  }
};
