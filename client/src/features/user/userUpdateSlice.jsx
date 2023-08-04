import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isUpdated: false,
  error: null,
};

const updateProfile = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    updateReset: (state) => {
      state.isUpdated = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdated = action.payload.success;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isUpdated = action.payload.success;
        state.isLoading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const updateUser = createAsyncThunk(
  "profile/updateUser",
  async ({ myForm }, thunkAPI) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.put("/api/v1/me/update", myForm, config);
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

export const updatePassword = createAsyncThunk(
  "profile/updatePassword",
  async ({ myForm }, thunkAPI) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        "/api/v1/password/update",
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
export const { clearErrors, updateReset } = updateProfile.actions;
export default updateProfile.reducer;
