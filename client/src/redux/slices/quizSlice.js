// store/quizSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  selectedAnswers: [],
  timesPerQuestion: [],
  submitted: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizData: (state, action) => {
      state.questions = action.payload;
      state.selectedAnswers = Array(action.payload.length).fill(null);
      state.timesPerQuestion = Array(action.payload.length).fill(0);
      state.submitted = false;
    },
    updateAnswer: (state, action) => {
      const { index, value } = action.payload;
      state.selectedAnswers[index] = value;
    },
    updateTime: (state, action) => {
      const { index, time } = action.payload;
      state.timesPerQuestion[index] = time;
    },
    submitQuiz: (state) => {
      state.submitted = true;
    },
    resetQuiz: () => initialState,
  },
});

export const { setQuizData, submitQuiz, resetQuiz, updateAnswer, updateTime } =
  quizSlice.actions;

export default quizSlice.reducer;
