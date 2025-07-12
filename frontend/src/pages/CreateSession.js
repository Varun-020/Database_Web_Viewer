import { useState, useEffect } from "react";
import { Modal, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/session/Header";
import Footer from "../components/session/Footer";
import SessionList from "../components/session/SessionList";
import SessionDetails from "../components/session/SessionDetails";
import { checkLastActiveSession } from "../slices/SessonDetailsSlice";

const CreateSession = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedSession } = useSelector((state) => state.session);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(checkLastActiveSession())
  }, [dispatch]);

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
        <Header />
        <div style={{ display: "flex", height: "100%" }}>
          <SessionList />
          <div style={{ flex: 1, padding: 16, minHeight: 450 }}>
            {selectedSession && <SessionDetails />}
          </div>
        </div>
        <Divider style={{ margin: 0 }} />
        <Footer />
      </div>
    </Modal>
  );
};

export default CreateSession;
