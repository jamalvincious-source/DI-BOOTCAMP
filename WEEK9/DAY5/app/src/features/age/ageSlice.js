import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const UPDATE_DELAY_MS = 700;

function createAgeUpdateThunk(type, change) {
  return createAsyncThunk(type, async (_, { signal }) => {
    await new Promise((resolve, reject) => {
      const timeout = window.setTimeout(resolve, UPDATE_DELAY_MS);
      signal.addEventListener(
        "abort",
        () => {
          window.clearTimeout(timeout);
          reject(new DOMException("Age update cancelled.", "AbortError"));
        },
        { once: true },
      );
    });

    return change;
  });
}

export const ageUpAsync = createAgeUpdateThunk("age/ageUpAsync", 1);
export const ageDownAsync = createAgeUpdateThunk("age/ageDownAsync", -1);

const ageSlice = createSlice({
  name: "age",
  initialState: {
    age: 25,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ageUpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ageUpAsync.fulfilled, (state, action) => {
        state.age += action.payload;
        state.loading = false;
      })
      .addCase(ageUpAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.error.name !== "AbortError") {
          state.error = action.error.message ?? "Could not update your age.";
        }
      })
      .addCase(ageDownAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ageDownAsync.fulfilled, (state, action) => {
        state.age = Math.max(0, state.age + action.payload);
        state.loading = false;
      })
      .addCase(ageDownAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.error.name !== "AbortError") {
          state.error = action.error.message ?? "Could not update your age.";
        }
      });
  },
});

export default ageSlice.reducer;
