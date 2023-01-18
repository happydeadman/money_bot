import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  userId: any;
  userName: string;
  token: string;
}

const initialState: IUser = {
  userId: undefined,
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
      state.userId = undefined;
      state.userName = "";
      state.token = "";
    },
  },
});
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
