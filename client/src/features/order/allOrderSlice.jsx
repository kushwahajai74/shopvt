import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  error: null,
  isLoading: false,
  isUpdated: null,
  isDeleted: null,
};

const allOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    updateOrderReset: (state) => {
      state.isUpdated = null;
    },
    deleteOrderReset: (state) => {
      state.isDeleted = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allOrders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(allOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(allOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

//get all orders(Admin)
export const allOrders = createAsyncThunk(
  "getAllOrders/admin",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get("/api/v1/admin/orders");
      return data.orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
export const updateOrder = createAsyncThunk(
  "updateOrder/Admin",
  async ({ id, myForm }, thunkAPI) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/admin/order/${id}`,
        myForm,
        config
      );
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
export const deleteOrder = createAsyncThunk(
  "deleteOrder/Admin",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
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

export const { clearErrors, updateOrderReset, deleteOrderReset } =
  allOrderSlice.actions;

export default allOrderSlice.reducer;
