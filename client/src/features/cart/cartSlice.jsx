import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removalFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload
      );
    },
    savingShipingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    });
  },
});

//add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, quantity }, thunkAPI) => {
    try {
      const { data } = await axios(`/api/v1/product/${id}`);

      const payload = {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      };

      thunkAPI.dispatch(addToCart.fulfilled(payload));
      localStorage.setItem(
        "cartItems",
        JSON.stringify(thunkAPI.getState().cart.cartItems)
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, thunkAPI) => {
    try {
      thunkAPI.dispatch(removalFromCart(id));

      localStorage.setItem(
        "cartItems",
        JSON.stringify(thunkAPI.getState().cart.cartItems)
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
export const saveShippingInfo = createAsyncThunk(
  "cart/saveShippingInfo",
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(savingShipingInfo(data));

      localStorage.setItem(
        "shippingInfo",
        JSON.stringify(thunkAPI.getState().cart.shippingInfo)
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const { removalFromCart, savingShipingInfo } = cartSlice.actions;
export default cartSlice.reducer;
