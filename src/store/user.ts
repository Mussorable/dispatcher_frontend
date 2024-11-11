import { createSlice } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
}

const initialState: User = {
  name: "",
  email: ""
};

const userSlice = createSlice({
  name: "user",
  initialState, 
  reducers: {
    setInformation: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    }
  }
});

export default userSlice;