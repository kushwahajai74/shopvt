import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isLoading: null,
  isAuthenticated: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

//login user
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
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
//register user
export const register = createAsyncThunk(
  "user/register",
  async (myForm, thunkAPI) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post("/api/v1/register", myForm, config);
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
//load user
export const loadUser = createAsyncThunk("user/loadUser", async (thunkAPI) => {
  try {
    const { data } = await axios.get("/api/v1/me");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
});
//logout user
export const logout = createAsyncThunk("user/logout", async (thunkAPI) => {
  try {
    await axios.get("/api/v1/logout");
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
