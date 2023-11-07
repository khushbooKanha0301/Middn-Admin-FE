import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slices/notificationSlice";
import authenticationReducer from "./slices/AuthenticationSlice";
import commonReducer from "./slices/commonSlice";
import userReducer from "./slices/UserSlice";

const rootReducer = combineReducers({
  authenticationReducer,
  notificationReducer,
  commonReducer,
  userReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
