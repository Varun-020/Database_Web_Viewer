import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

const emptyForm = {
  networkType: "",
  library: "",
  host: "",
  username: "",
  password: "",
  port: "",
  database: "",
  comments: "",
  useWindowsAuth: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    loading: false,
    selectedSession: "",
    sessinNameEditId: "",
    sessions: JSON.parse(localStorage.getItem("sessions")) || [],
    form: { ...emptyForm },
  },
  reducers: {
    setFormValue: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    checkLastActiveSession: (state, action) => {
      let lastActiveSession = JSON.parse(
        localStorage.getItem("lastActiveSession")
      );
      if (lastActiveSession) {
        let { data, sessionName } = lastActiveSession;
        state.form = data;
        state.selectedSession = sessionName;
      }
    },
    setSessionDetails: (state, action) => {
      state.form = action.payload.data;
      state.selectedSession = action.payload.name;
    },
    resetForm: (state) => {
      state.form = { ...emptyForm };
    },
    setEditingSessionName: (state, action) => {
      state.sessinNameEditId = action.payload;
    },
    updateSessionName: (state, action) => {
      let { oldName, newName } = action.payload;
      const existingIndex = state.sessions.findIndex((s) => s.name === oldName);
      if (existingIndex !== -1) {
        console.log("edit time form", state.form);
        state.sessions[existingIndex].name = newName;
        state.sessinNameEditId = "";
        state.selectedSession = "";
      }
      localStorage.setItem("sessions", JSON.stringify(state.sessions));
    },
    createSession: (state, action) => {
      const baseName = "unnamed";
      let counter = 0;
      let uniqueName = baseName;

      while (state.sessions.some((s) => s.name === uniqueName)) {
        counter += 1;
        uniqueName = `${baseName} ${counter}`;
      }
      state.selectedSession = uniqueName;
      state.form = { ...emptyForm };
      let updatedSessions = [
        ...state.sessions,
        {
          name: uniqueName,
          data: { ...emptyForm },
        },
      ];
      state.sessions = updatedSessions;
    },
    saveSession: (state, action) => {
      const { sessionName, form } = action.payload;
      const existingIndex = state.sessions.findIndex(
        (s) => s.name === sessionName
      );
      if (existingIndex !== -1) {
        state.sessions[existingIndex].data = form;
        state.sessions[existingIndex].name = sessionName;
        state.selectedSession = "";
        state.form = { ...emptyForm };
      }
      localStorage.setItem("sessions", JSON.stringify(state.sessions));
    },
    deleteSession: (state, action) => {
      const { sessionName } = action.payload;
      state.sessions = state.sessions.filter((s) => s.name !== sessionName);
      if (state.selectedSession === sessionName) {
        state.selectedSession = "";
        state.form = { ...emptyForm };
      }
      localStorage.setItem("sessions", JSON.stringify(state.sessions));
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setFormValue,
  checkLastActiveSession,
  createSession,
  deleteSession,
  setSessionDetails,
  setEditingSessionName,
  updateSessionName,
  saveSession,
  resetForm,
} = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
