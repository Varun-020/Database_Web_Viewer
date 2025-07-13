import { Layout, Typography, Button, Tooltip } from "antd";
import {
  PlayCircleOutlined,
  ClockCircleOutlined,
  SaveOutlined,
  UploadOutlined,
  DownloadOutlined,
  SettingOutlined,
  LogoutOutlined,
  DatabaseOutlined,
  TableOutlined,
  PartitionOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/AuthSlice";

export default function TopBar() {
  const dispatch = useDispatch();
  const { activeDatabase, activeTable } = useSelector((state) => state.db);
  return (
    <Layout.Header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #eee",
        padding: "0 12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 36,
      }}
    >
      <div style={{ width: 240 }}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          🧩 DB Tool
        </Typography.Title>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {activeDatabase && (
          <Tooltip title="Info">
            <Button
              size="small"
              icon={<DatabaseOutlined />}
              style={{
                backgroundColor: "#f6f6f6",
                borderColor: "#d9d9d9",
                color: "#444",
                cursor: "default",
              }}
            >
              Databae:&nbsp;{activeDatabase}
            </Button>
          </Tooltip>
        )}
        {activeTable && (
          <>
            <Tooltip title="Schema">
              <Button
                size="small"
                icon={<PartitionOutlined />}
                onClick={() => console.log(`View data of ${activeTable}`)}
              >
                Table:&nbsp;{activeTable}
              </Button>
            </Tooltip>
            <Tooltip title="View Data">
              <Button
                size="small"
                icon={<TableOutlined />}
                onClick={() => console.log(`View data of ${activeTable}`)}
              >
                Data
              </Button>
            </Tooltip>
          </>
        )}
        <Tooltip title="Run Query">
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            size="small"
            onClick={() => console.log("Run query")}
          />
        </Tooltip>

        <Tooltip title="History">
          <Button icon={<ClockCircleOutlined />} size="small" />
        </Tooltip>

        <Tooltip title="Saved Queries">
          <Button icon={<SaveOutlined />} size="small" />
        </Tooltip>

        <Tooltip title="Import">
          <Button icon={<UploadOutlined />} size="small" />
        </Tooltip>

        <Tooltip title="Export">
          <Button icon={<DownloadOutlined />} size="small" />
        </Tooltip>

        <Tooltip title="Settings">
          <Button icon={<SettingOutlined />} size="small" />
        </Tooltip>
      </div>

      <div>
        <Button
          danger
          icon={<LogoutOutlined />}
          size="small"
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      </div>
    </Layout.Header>
  );
}
