import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";

const store = configureStore({
  reducer: authSlice.reducer,
});

const {setUsername, setPassword, setRepeatPassword, setEmail, setIsAuthenticated} = authSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export {
  store,
  setPassword,
  setRepeatPassword,
  setEmail,
  setUsername,
  setIsAuthenticated
};