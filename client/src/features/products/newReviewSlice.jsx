import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  success: null,
  isLoading: true,
  error: null,
};

const newReviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    newReviewReset: (state) => {
      state.success = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newReview.fulfilled, (state, action) => {
        state.success = action.payload;
        state.isLoading = false;
      })
      .addCase(newReview.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const newReview = createAsyncThunk(
  "product/newReview",
  async (reviewData, thunkAPI) => {
    try {
      console.log(reviewData);
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
      return data.success;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
export const { clearErrors, newReviewReset } = newReviewSlice.actions;

export default newReviewSlice.reducer;
