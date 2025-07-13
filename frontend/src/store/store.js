import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/AuthSlice";
import { sessionReducer } from "../slices/SessonDetailsSlice";
import { databaseReducer } from "../slices/DatabaseSlice";
import { queryReducer } from "../slices/QuerySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer,
    db: databaseReducer,
    query: queryReducer,
  },
});

export default store;
