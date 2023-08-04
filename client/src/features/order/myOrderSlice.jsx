import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  error: null,
  isLoading: false,
};

const myOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(myOrders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(myOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

//my orders
export const myOrders = createAsyncThunk("myOrders/get", async (thunkAPI) => {
  try {
    const { data } = await axios.get("/api/v1/orders/me");
    return data.orders;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
});
export const { clearErrors } = myOrderSlice.actions;

export default myOrderSlice.reducer;
