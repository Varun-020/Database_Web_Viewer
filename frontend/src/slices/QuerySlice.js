import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const savedState = JSON.parse(localStorage.getItem("queryState"));

const querySlice = createSlice({
  name: "session",
  initialState: savedState || {
    tabs: [{ key: "tab-1", title: "Query 1", query: "", queryResults: [] }],
    activeKey: "tab-1",
    max_tabs: 10,
    tabCounter: 1,
  },
  reducers: {
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
      localStorage.setItem("queryState", JSON.stringify(state));
    },

    addTab: (state) => {
      if (state.tabs.length >= state.max_tabs) return;

      const newKey = `tab-${++state.tabCounter}`;
      state.tabs.push({
        key: newKey,
        title: `Query ${state.tabCounter}`,
        query: "",
        queryResults: [],
      });
      state.activeKey = newKey;
      localStorage.setItem("queryState", JSON.stringify(state));
    },

    handleQueryChange: (state, action) => {
      const { query, key } = action.payload;
      const tab = state.tabs.find((tab) => tab.key === key);
      if (tab) tab.query = query;
      localStorage.setItem("queryState", JSON.stringify(state));
    },

    removeTab: (state, action) => {
      const keyToRemove = action.payload;
      const index = state.tabs.findIndex((tab) => tab.key === keyToRemove);
      if (index === -1) return;
      state.tabs.splice(index, 1);
      if (state.activeKey === keyToRemove) {
        if (state.tabs.length) {
          const newIndex = index > 0 ? index - 1 : 0;
          state.activeKey = state.tabs[newIndex].key;
        } else {
          const newKey = `tab-1`;
          state.tabs.push({
            key: newKey,
            title: "Query 1",
            query: "",
            queryResults: [],
          });
          state.activeKey = newKey;
          state.tabCounter = 1;
        }
      }
      localStorage.setItem("queryState", JSON.stringify(state));
    },
  },
});

export const { setActiveKey, addTab, handleQueryChange, removeTab } =
  querySlice.actions;
export const queryReducer = querySlice.reducer;
