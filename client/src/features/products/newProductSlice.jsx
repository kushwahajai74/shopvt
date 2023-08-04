import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  product: {},
  success: null,
  isLoading: false,
  error: null,
  isDeleted: null,
  isUpdated: null,
};

const newProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    newProductReset: (state) => {
      state.success = null;
      state.isLoading = false;
    },
    deleteProductReset: (state) => {
      state.isDeleted = null;
      state.isLoading = false;
    },
    updateProductReset: (state) => {
      state.isUpdated = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.product = action.payload.product;
        state.isLoading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.isLoading = false;
        state.isDeleted = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.isUpdated = true;
        state.isLoading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        // console.log(action.payload);
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (myForm, thunkAPI) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/admin/product/new`,
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

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
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

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ productId, myForm }, thunkAPI) => {
    console.log(productId, myForm);
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/v1/admin/product/${productId}`,
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

export const {
  clearErrors,
  newProductReset,
  deleteProductReset,
  updateProductReset,
} = newProductSlice.actions;

export default newProductSlice.reducer;
