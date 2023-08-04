import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  message: null,
  error: null,
  success: false,
};

const forgotPasswordSlice = createSlice({
  name: "forgotpassword",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    forgotReset: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});
//forgot password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/password/forgot",
        { email },
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
//reset password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, myForm }, thunkAPI) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        myForm,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const { clearErrors, forgotReset } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
