import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const fetchDatabaseNames = createAsyncThunk(
  "db/fetchDatabaseAndTableNames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/db/explorer");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const fetchTableData = createAsyncThunk(
  "db/fetchTableData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/db/table/data", data);
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
    activeDatabase: localStorage.getItem("activedb") || "",
    activeTable: localStorage.getItem("activetable") || "",
    tableData: "",
  },
  reducers: {
    setActiveDatabase: (state, action) => {
      state.activeDatabase = action.payload;
      state.activeTable = "";
      localStorage.setItem("activedb", state.activeDatabase);
    },
    setActiveTable: (state, action) => {
      state.activeTable = action.payload;
      localStorage.setItem("activetable", state.activeTable);
    },
  },
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
      })
      .addCase(fetchTableData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.loading = false;
        state.tableData = action.payload.response;
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setActiveDatabase, setActiveTable } = databaseSlice.actions;
export const databaseReducer = databaseSlice.reducer;
