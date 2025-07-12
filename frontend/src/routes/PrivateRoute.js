import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setUserAndToken } from "../slices/AuthSlice";
import { jwtDecode } from "jwt-decode";

function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const tenant = localStorage.getItem("tenant");

  const { token } = useSelector((state) => state.auth);

  const verifyToken = (token) => {
    const decodeToken = jwtDecode(token);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn) {
      localStorage.removeItem("myToken");
      dispatch(setUserAndToken({ token: "", authenticate: false }));
      return null;
    } else {
      return decodeToken;
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("token");

    if (authToken) {
      const decoded = verifyToken(authToken);
      if (decoded) {
        const { user } = decoded;
        dispatch(setUserAndToken({ token: authToken, authenticate: true }));
      }
    }
  }, [dispatch, location, tenant]);

  if (!token) {
    return <Navigate to={`/auth`} state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;
