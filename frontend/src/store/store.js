import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/AuthSlice";
import { sessionReducer } from "../slices/SessonDetailsSlice";
import { databaseReducer } from "../slices/DatabaseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer,
    db: databaseReducer,
  },
});

export default store;
