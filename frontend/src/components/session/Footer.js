import { useDispatch, useSelector } from "react-redux";
import { Button, Space } from "antd";
import {
  createSession,
  resetForm,
  saveSession,
  deleteSession,
} from "../../slices/SessonDetailsSlice";
import { connectDatabase } from "../../slices/AuthSlice";

function Footer() {
  const dispatch = useDispatch();
  const { form, selectedSession } = useSelector((state) => state.session);

  const handleNew = () => {
    dispatch(createSession());
  };
  const handleSave = () => {
    if (selectedSession) {
      dispatch(saveSession({ form, sessionName: selectedSession }));
    }
  };
  const handleDelete = () => {
    if (selectedSession) {
      dispatch(deleteSession({ sessionName: selectedSession }));
    }
  };

  return (
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
        <Button danger onClick={() => handleDelete(selectedSession)}>
          Delete
        </Button>
      </Space>
      <Space>
        <Button
          type="primary"
          onClick={() =>
            dispatch(
              connectDatabase({ data: form, sessionName: selectedSession })
            )
          }
        >
          Open
        </Button>
        <Button onClick={() => dispatch(resetForm())}>Cancel</Button>
        <Button>More</Button>
      </Space>
    </div>
  );
}

export default Footer;
