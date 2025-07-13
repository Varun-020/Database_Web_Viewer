import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { fetchDatabaseNames } from "../slices/DatabaseSlice";
import TopBar from "../components/layout/TopBar";
import Sidebar from "../components/layout/Sidebar";
import QueryBar from "../components/layout/QueryBar";
import QueryEditor from "../features/query/QueryEditor";

function Main() {
  const dispatch = useDispatch();
  const { database } = useSelector((state) => state.db);

  useEffect(() => {
    dispatch(fetchDatabaseNames());
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <TopBar />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar databases={database} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <QueryBar />
          <PanelGroup direction="vertical" style={{ flex: 1 }}>
            <Panel defaultSize={60} minSize={25}>
              <div style={{ height: "100%", overflow: "hidden" }}>
                <QueryEditor />
              </div>
            </Panel>
            <PanelResizeHandle
              style={{ height: 10, background: "#d9d9d9", cursor: "row-resize" }}
            />
            <Panel defaultSize={40} minSize={25}>
              <div style={{ height: "100%", overflowY: "auto", padding: 12 }}>
                <div style={{ fontSize: 13, color: "#333" }}>
                  Query results will appear here...
                </div>
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </div>
  );
}

export default Main;
