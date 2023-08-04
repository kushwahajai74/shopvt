import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  products: [],
  isLoading: true,
  error: null,
  productsCount: null,
  resultPerPage: null,
  filteredProductsCount: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.resultPerPage = action.payload.resultPerPage;
        state.productsCount = action.payload.productsCount;
        state.filteredProductsCount = action.payload.filteredProductsCount;

        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getAdminProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.isLoading = false;
      })
      .addCase(getAdminProducts.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (
    {
      keyword = "",
      currentPage = 1,
      price = [0, 150000],
      category,
      ratings = 0,
    },
    thunkAPI
  ) => {
    try {
      let url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      //   console.log(thunkAPI);
      //   console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);
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
export const getAdminProducts = createAsyncThunk(
  "adminProducts/getProducts",
  async (thunkAPI) => {
    try {
      const resp = await axios.get("/api/v1/admin/products");
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
export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;
