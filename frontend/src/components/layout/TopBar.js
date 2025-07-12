import { Typography, Button } from "antd";
import { logout } from "../../slices/AuthSlice.js";
import { useDispatch } from "react-redux";

function TopBar() {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        background: "#f5f5f5",
        padding: "4px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Typography.Title level={5} style={{ margin: 0 }}>
        DB Tool
      </Typography.Title>
      <div>
        <Button size="small" type="default" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default TopBar;
