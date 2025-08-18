const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    avatar: String,
    googleId: String,
    date: {
      type: Date,
      default: Date.now,
    },
    quizzes: [
      {
        prompt: { type: String, required: true },
        questions: [
          {
            question: { type: String, required: true },
            choices: [{ type: String, required: true }],
            answerIndex: { type: Number, required: true },
            explanation: { type: String },
          },
        ],
        total: { type: Number, required: true },
        correct: { type: Number },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
