import { useDispatch, useSelector } from "react-redux";
import { setFormValue } from "../../slices/SessonDetailsSlice";
import { Form, Input, Select, Checkbox } from "antd";

const { TextArea } = Input;
const { Option } = Select;

let options = [
  {
    networkType: "Microsoft SQL Server (TCP/IP)",
    library: ["tedious", "mssql"],
    port: 1433,
  },
  {
    networkType: "MySQL (TCP/IP)",
    library: ["mysql2", "mysql", "sequelize"],
    port: 3306,
  },
  {
    networkType: "PostgreSQL (TCP/IP)",
    library: ["pg", "pg-promise", "sequelize"],
    port: 5432,
  },
];

const SettingsTab = () => {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.session);

  const handleChange = (name, value) => {
    dispatch(setFormValue({ field: name, value: value }));
  };

  const handleTypeChange = (networkType) => {
    const selected = options.find((opt) => opt.networkType === networkType);
    if (selected) {
      handleChange("networkType", selected.networkType);
      handleChange("library", selected.library[0]);
      handleChange("port", selected.port);
    }
  };

  const selectedType = options.find(
    (opt) => opt.networkType === form?.networkType
  );

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      colon={false}
      labelAlign="left"
    >
      <Form.Item label="Network Type" style={{ marginBottom: "8px" }}>
        <Select value={form?.networkType} onChange={handleTypeChange}>
          {options.map((opt) => (
            <Option key={opt.networkType} value={opt.networkType}>
              {opt.networkType}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Library" style={{ marginBottom: "8px" }}>
        <Select
          value={form?.library}
          onChange={(value) => handleChange("library", value)}
        >
          {(selectedType?.library || []).map((lib) => (
            <Option key={lib} value={lib}>
              {lib}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Hostname / IP" style={{ marginBottom: "8px" }}>
        <Input
          value={form?.host}
          onChange={(e) => handleChange("host", e.target.value)}
        />
      </Form.Item>

      <Form.Item label=" " style={{ marginBottom: "8px" }}>
        <Checkbox
          checked={form?.useWindowsAuth}
          onChange={(e) => handleChange("useWindowsAuth", e.target.checked)}
        >
          Use Windows Authentication
        </Checkbox>
      </Form.Item>

      <Form.Item label="Username" style={{ marginBottom: "8px" }}>
        <Input
          value={form?.username}
          disabled={form?.useWindowsAuth}
          onChange={(e) => handleChange("username", e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Password" style={{ marginBottom: "8px" }}>
        <Input.Password
          value={form?.password}
          disabled={form?.useWindowsAuth}
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Port" style={{ marginBottom: "8px" }}>
        <Input
          value={form?.port}
          onChange={(e) => handleChange("port", e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Database" style={{ marginBottom: "8px" }}>
        <Input
          value={form?.database}
          onChange={(e) => handleChange("database", e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Comments" style={{ marginBottom: "8px" }}>
        <TextArea
          rows={3}
          value={form?.comments}
          onChange={(e) => handleChange("comments", e.target.value)}
        />
      </Form.Item>
    </Form>
  );
};

export default SettingsTab;
