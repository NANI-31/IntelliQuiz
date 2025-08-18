import React, { useState } from "react";
import axios from "../hooks/axiosConfig";
import { useSelector } from "react-redux";
import useUserActions from "../hooks/useReduxActions";

import QuizPrompt from "../components/quiz/QuizPrompt";
import QuizInterface from "../components/quiz/QuizInterface";
export default function Quiz() {
  const [quizData, setQuizData] = useState();
  const [text, setText] = useState("");
  const [level, setLevel] = useState("easy");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState({
    timesPerQuestion: [],
    selectedAnswers: [],
  });

  const user = useSelector((state) => state.user.user);
  const { updateUser } = useUserActions();
  const handleSubmit = async () => {
    try {
      setIsDataLoading(true);
      console.log(user._id, text, level);
      const res = await axios.get("/api/quiz", {
        params: {
          userId: user._id,
          text,
          level,
        },
      });
      setQuizData(res.data.quizEntry);
      updateUser(res.data.quizEntry);
      setIsDataLoading(false);
      setIsLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-full">
      {!isLoading ? (
        <QuizPrompt
          text={text}
          setText={setText}
          level={level}
          setLevel={setLevel}
          isDataLoading={isDataLoading}
          handleSubmit={handleSubmit}
        />
      ) : (
        <QuizInterface
          quizData={quizData}
          onNewQuiz={() => {
            setIsLoading(false);
            setQuizData(null);
            setSubmitted(false);
            setSummary({
              timesPerQuestion: [],
              selectedAnswers: [],
            });
            setText("");
          }}
        />
      )}
    </div>
  );
}
