import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth";
import tasksSlice from "./tasks";
import explorerSlice from "./explorer";
import userSlice from "./user";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  tasks: tasksSlice.reducer,
  explorer: explorerSlice.reducer,
  user: userSlice.reducer
})

const store = configureStore({
  reducer: rootReducer
});

const {setUsername, setPassword, setRepeatPassword, setEmail, setIsAuthenticated} = authSlice.actions;
const {addNewBrick, setData, setIsUnloadingPlace, setBrickPosition, updateBricks, addTask, removeTask, setImportance, setTaskText} = tasksSlice.actions;
const {createFolder, createObject, deleteItem, changeUnwrap} = explorerSlice.actions;
const {setInformation} = userSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export {
  store,
  setPassword,
  setRepeatPassword,
  setEmail,
  setUsername,
  setIsAuthenticated,
  addNewBrick,
  setData,
  setIsUnloadingPlace,
  setBrickPosition,
  updateBricks,
  addTask,
  removeTask,
  setImportance,
  setTaskText,
  createFolder,
  createObject,
  deleteItem,
  changeUnwrap,
  setInformation
};