import { Button, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Title } = Typography;

function Header() {
  const closeTab = () => window.close();
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px 12px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          DB Tool
        </Title>
        <Button icon={<CloseOutlined />} onClick={closeTab} type="text" />
      </div>
    </div>
  );
}

export default Header;
