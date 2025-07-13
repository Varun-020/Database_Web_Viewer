import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addTab, removeTab, setActiveKey } from "../../slices/QuerySlice";

export default function QueryBar() {
  const dispatch = useDispatch();
  const { tabs, activeKey, max_tabs } = useSelector((state) => state.query);

  return (
    <Layout.Header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #eee",
        padding: "0 8px",
        display: "flex",
        alignItems: "center",
        height: 24,
        flexWrap: "wrap",
        gap: "4px",
      }}
    >
      {tabs.map((tab) => (
        <button
          className={tab.key == activeKey ? "tab-btn active" : "tab-btn"}
          key={tab.key}
          onClick={() => dispatch(setActiveKey(tab.key))}
        >
          {tab.title}
          {tab.key !== "tab-1" && (
            <span
              className="close-icon"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeTab(tab.key));
              }}
            >
              ×
            </span>
          )}
        </button>
      ))}
      {tabs.length < max_tabs && (
        <button className="add-tab-btn" onClick={() => dispatch(addTab())}>
          ＋
        </button>
      )}
    </Layout.Header>
  );
}
