import {
  setToken,
  clearUsersData,
  login,
  logout,
  updateUser,
} from "../redux/slices/userSlice";
import {
  setQuizData,
  submitQuiz,
  resetQuiz,
  updateAnswer,
  updateTime,
} from "../redux/slices/quizSlice";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
export default function useUserActions() {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      login,
      setToken,
      clearUsersData,
      updateUser,
      logout,
    },
    dispatch
  );
}

export function useQuizActions() {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      setQuizData,
      submitQuiz,
      resetQuiz,
      updateAnswer,
      updateTime,
    },
    dispatch
  );
}
