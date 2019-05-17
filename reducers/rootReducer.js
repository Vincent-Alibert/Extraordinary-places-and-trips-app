import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import DreamsReducer from "./dreamsReducer";

const rootReducer = combineReducers({
  user: UserReducer,
  dreams: DreamsReducer
});

export default rootReducer;
