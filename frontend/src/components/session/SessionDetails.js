import { lazy, Suspense } from "react";
import { Tabs } from "antd";
import { sessions } from "react-redux";

const SettingsTab = lazy(() => import("./SettingsTab"));
const AdvancedTab = lazy(() => import("./AdvancedTab"));

const { TabPane } = Tabs;

function SessionDetails() {
 
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Settings" key="1">
        <Suspense fallback={<div>Loading Settings...</div>}>
          <SettingsTab />
        </Suspense>
      </TabPane>
      <TabPane tab="Advanced" key="2">
        <Suspense fallback={<div>Loading Advanced...</div>}>
          <AdvancedTab />
        </Suspense>
      </TabPane>
    </Tabs>
  );
}

export default SessionDetails;
