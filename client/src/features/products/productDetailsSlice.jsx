import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  product: [],
  isLoading: true,
  error: null,
};

const productDetailsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.product = action.payload.product;
        state.isLoading = false;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, thunkAPI) => {
    try {
      //   console.log(thunkAPI);
      //   console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(`/api/v1/product/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const { clearErrors } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
