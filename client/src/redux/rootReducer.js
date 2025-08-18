import { combineReducers } from "redux";
import userSlice from "./slices/userSlice";
import quizSlice from "./slices/quizSlice";

const appReducer = combineReducers({
  user: userSlice,
  quiz: quizSlice,
});
const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
