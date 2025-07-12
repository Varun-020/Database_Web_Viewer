import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDatabaseNames } from "../slices/DatabaseSlice";
import TopBar from "../components/layout/TopBar";
import Sidebar from "../components/layout/Sidebar";

function Main() {
  const dispatch = useDispatch();
  const { database } = useSelector((state) => state.db);
  useEffect(() => {
    dispatch(fetchDatabaseNames());
  }, [dispatch]);

  return (
    <div>
      <TopBar />
      <Sidebar databases={database} />
      <div style={{ flex: 1, padding: 20 }}>{/* Content area */}</div>
    </div>
  );
}

export default Main;
