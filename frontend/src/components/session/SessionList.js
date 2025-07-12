import { Input, List, Typography } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditingSessionName,
  setSessionDetails,
  updateSessionName
} from "../../slices/SessonDetailsSlice";
const { Title } = Typography;

function SessionList() {
  const dispatch = useDispatch();
  const { sessions, selectedSession ,sessinNameEditId} = useSelector((state) => state.session);

  const handleRename = (oldName, newName) => {
    dispatch(updateSessionName({oldName,newName}));
  };

  return (
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
        dataSource={sessions}
        renderItem={(item) => (
          <List.Item
            style={{
              cursor: "pointer",
              backgroundColor:
                selectedSession === item.name ? "#e6f7ff" : "white",
              fontWeight: selectedSession === item.name ? "bold" : "normal",
            }}
            onClick={() => dispatch(setSessionDetails(item))}
            onDoubleClick={() => dispatch(setEditingSessionName(item.name))}
          >
            {sessinNameEditId === item.name ? (
              <Input
                size="small"
                autoFocus
                defaultValue={item.name}
                onBlur={(e) => handleRename(item.name, e.target.value)}
                onPressEnter={(e) => handleRename(item.name, e.target.value)}
              />
            ) : (
              item.name
            )}
          </List.Item>
        )}
        style={{ height: "calc(100% - 60px)", overflowY: "auto" }}
      />
    </div>
  );
}

export default SessionList;
