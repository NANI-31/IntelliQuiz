const router = require("express").Router();
const quiz = require("../controllers/quizController");

router.get("/", quiz.getQuiz);
// router.get("/:id", quiz.getQuiz);
// router.post("/", quiz.createQuiz);
// router.put("/:id", quiz.updateQuiz);
// router.delete("/:id", quiz.deleteQuiz);

module.exports = router;
