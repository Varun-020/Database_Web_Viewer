import { Collapse } from "antd";
const { Panel } = Collapse;

const Sidebar = ({ databases }) => {
  return (
    <div
      style={{
        width: 220,
        overflowY: "auto",
        borderRight: "1px solid #f0f0f0",
        padding: "8px 4px",
        background: "#fff",
      }}
    >
      <Collapse
        accordion
        bordered={false}
        style={{ backgroundColor: "transparent" }}
        expandIconPosition="start"
      >
        {databases.map(({ database, tables }) => (
          <Panel
            header={<span style={{ fontSize: 13 }}>{database}</span>}
            key={database}
            style={{
              marginBottom: 4,
              padding: "2px !important",
            }}
          >
            {tables.length > 0 ? (
              <ul style={{ listStyle: "none", paddingLeft: 12, margin: 0 }}>
                {tables.map((table) => (
                  <li
                    key={table}
                    style={{
                      padding: "2px 0",
                      fontSize: 12,
                      color: "#555",
                      cursor: "pointer",
                    }}
                  >
                    {table}
                  </li>
                ))}
              </ul>
            ) : (
              <div
                style={{
                  fontSize: 12,
                  color: "#999",
                  fontStyle: "italic",
                  paddingLeft: 8,
                }}
              >
                No tables
              </div>
            )}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Sidebar;
