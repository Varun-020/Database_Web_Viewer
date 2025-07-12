import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const fetchDatabaseNames = createAsyncThunk(
  "db/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/db/explorer");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const databaseSlice = createSlice({
  name: "db",
  initialState: {
    loading: false,
    database: [],
    response: {
      message: "",
      variant: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatabaseNames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDatabaseNames.fulfilled, (state, action) => {
        state.loading = false;
        state.database = action.payload.response;
      })
      .addCase(fetchDatabaseNames.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const databaseReducer = databaseSlice.reducer;
