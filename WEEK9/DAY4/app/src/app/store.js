import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/userSlice.js";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
