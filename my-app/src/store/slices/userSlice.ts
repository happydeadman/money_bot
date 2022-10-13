import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  userId: string;
  userName: string;
  token: string;
}

const initialState: IUser = {
  userId: "",
  userName: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.token = action.payload.token;
    },
    removeUser(state) {
      state.userId = "";
      state.userName = "";
      state.token = "";
    },
  },
});
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
