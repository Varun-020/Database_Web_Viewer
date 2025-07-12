import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  Modal,
  Button,
  Tabs,
  Input,
  Select,
  List,
  Typography,
  Row,
  Col,
  Space,
  Divider,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { connectDatabase } from "../slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const SettingsTab = lazy(() => import("../components/session/SettingsTab"));
const AdvancedTab = lazy(() => import("../components/session/AdvancedTab"));

const { TabPane } = Tabs;
const { Title } = Typography;

const DBAuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(true);
  const [formData, setFormData] = useState({
    networkType: "TCP/IP",
    library: "tedious",
    host: "127.0.0.1",
    username: "sa",
    password: "root",
    port: "1433",
    database: "master",
    comments: "",
  });
  const [sessions, setSessions] = useState({});
  const [selectedSession, setSelectedSession] = useState(null);
  const [editingSessionName, setEditingSessionName] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("db_sessions")) || {};
    setSessions(saved);
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const closeTab = () => window.close();

  const handleOpenConnection = () => dispatch(connectDatabase(formData));

  const generateSessionName = () => {
    let index = 1;
    while (sessions[`Session${index}`]) index++;
    return `Session${index}`;
  };

  const handleNew = () => {
    const name = generateSessionName();
    setSelectedSession(name);
    setFormData({
      networkType: "TCP/IP",
      library: "tedious",
      host: "",
      username: "",
      password: "",
      port: "1433",
      database: "master",
      comments: "",
    });
  };

  const handleSave = () => {
    if (!selectedSession) return;
    const updated = { ...sessions, [selectedSession]: formData };
    localStorage.setItem("db_sessions", JSON.stringify(updated));
    setSessions(updated);
  };

  const handleDelete = () => {
    if (!selectedSession) return;
    const updated = { ...sessions };
    delete updated[selectedSession];
    localStorage.setItem("db_sessions", JSON.stringify(updated));
    setSessions(updated);
    setSelectedSession(null);
    setFormData({
      networkType: "TCP/IP",
      library: "tedious",
      host: "",
      username: "",
      password: "",
      port: "1433",
      database: "master",
      comments: "",
    });
  };

  const handleSessionClick = (name) => {
    setSelectedSession(name);
    setFormData(sessions[name]);
  };

  const handleRename = (oldName, newName) => {
    if (!newName || oldName === newName || sessions[newName]) return;
    const updated = { ...sessions };
    updated[newName] = updated[oldName];
    delete updated[oldName];
    localStorage.setItem("db_sessions", JSON.stringify(updated));
    setSessions(updated);
    setSelectedSession(newName);
    setEditingSessionName(null);
  };

  return (
    <Modal
      open={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      width={800}
      closable={false}
      style={{ top: 40 }}
      maskClosable={false}
    >
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

        <div style={{ display: "flex", height: "100%" }}>
          <div
            style={{
              width: 200,
              borderRight: "1px solid #f0f0f0",
              padding: 12,
            }}
          >
            <Title level={5}>Sessions</Title>
            <List
              size="small"
              bordered
              dataSource={Object.keys(sessions)}
              renderItem={(item) => (
                <List.Item
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedSession === item ? "#e6f7ff" : "white",
                    fontWeight: selectedSession === item ? "bold" : "normal",
                  }}
                  onClick={() => handleSessionClick(item)}
                  onDoubleClick={() => setEditingSessionName(item)}
                >
                  {editingSessionName === item ? (
                    <Input
                      size="small"
                      autoFocus
                      defaultValue={item}
                      onBlur={(e) => handleRename(item, e.target.value)}
                      onPressEnter={(e) => handleRename(item, e.target.value)}
                    />
                  ) : (
                    item
                  )}
                </List.Item>
              )}
              style={{ height: "calc(100% - 60px)", overflowY: "auto" }}
            />
          </div>

          <div style={{ flex: 1, padding: 16 }}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Settings" key="1">
                <Suspense fallback={<div>Loading Settings...</div>}>
                  <SettingsTab
                    formData={formData}
                    handleChange={handleChange}
                  />
                </Suspense>
              </TabPane>
              <TabPane tab="Advanced" key="2">
                <Suspense fallback={<div>Loading Advanced...</div>}>
                  <AdvancedTab />
                </Suspense>
              </TabPane>
            </Tabs>
          </div>
        </div>

        <Divider style={{ margin: 0 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "6px 12px",
            background: "#fafafa",
          }}
        >
          <Space>
            <Button onClick={handleNew}>New</Button>
            <Button onClick={handleSave}>Save</Button>
            <Button danger onClick={handleDelete}>
              Delete
            </Button>
          </Space>
          <Space>
            <Button type="primary" onClick={handleOpenConnection}>
              Open
            </Button>
            <Button>Cancel</Button>
            <Button>More</Button>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default DBAuthPage;
