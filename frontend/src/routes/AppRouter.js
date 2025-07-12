import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Main from "../pages/Main";
import CreateSession from "../pages/CreateSession";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }
      />
      <Route path="/auth" element={<CreateSession />} />
    </Routes>
  );
}
