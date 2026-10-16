import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const USER_API_URL = "https://jsonplaceholder.typicode.com/users/1";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(USER_API_URL);

      if (!response.ok) {
        return rejectWithValue(`The request failed (${response.status}). Please try again.`);
      }

      return await response.json();
    } catch {
      return rejectWithValue("Could not reach the user service. Check your connection and try again.");
    }
  },
  {
    condition: (_, { getState }) => getState().users.status !== "loading",
  },
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        if (action.meta.condition) return;
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong while loading the user.";
      });
  },
});

export default userSlice.reducer;
