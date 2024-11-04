import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth";
import tasksSlice from "./tasks";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  tasks: tasksSlice.reducer
})

const store = configureStore({
  reducer: rootReducer
});

const {setUsername, setPassword, setRepeatPassword, setEmail, setIsAuthenticated} = authSlice.actions;
const {setBricks, setData, setIsUnloadingPlace, setBrickPosition} = tasksSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export {
  store,
  setPassword,
  setRepeatPassword,
  setEmail,
  setUsername,
  setIsAuthenticated,
  setBricks,
  setData,
  setIsUnloadingPlace,
  setBrickPosition
};