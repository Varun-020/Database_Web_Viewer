import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const connectDatabase = createAsyncThunk(
  "db/auth",
  async ({ data, sessionName }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/master/connect", data);
      localStorage.setItem(
        "lastActiveSession",
        JSON.stringify({ data, sessionName })
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: localStorage.getItem("token") || "",
    isAuthenticated: false,
    response: {
      message: "",
      variant: "",
    },
  },
  reducers: {
    logout(state) {
      state.token = "";
      localStorage.removeItem("token");
      state.response = {
        message: "",
        variant: "",
      };
      state.isAuthenticated = false;
    },
    setUserAndToken(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.authenticate;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(connectDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.response = {
          message: action.payload.message,
          variant: action.payload.status === "success" ? "success" : "error",
        };
        localStorage.setItem("token", action.payload.token);
        state.isAuthenticated = true;
      })
      .addCase(connectDatabase.rejected, (state, action) => {
        state.loading = false;
        state.response = {
          message: action.payload.message,
          variant: action.payload.status === "success" ? "success" : "error",
        };
        state.isAuthenticated = false;
      });
  },
});

export const { logout, setUserAndToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
