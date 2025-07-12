import React from "react";
import { Typography } from "antd";

const { Paragraph } = Typography;

const AdvancedTab = () => {
  return (
    <div>
      <Paragraph type="secondary">
        Advanced settings will go here. You can customize connection parameters, SSL configurations,
        timeouts, and more in future updates.
      </Paragraph>
    </div>
  );
};

export default AdvancedTab;
