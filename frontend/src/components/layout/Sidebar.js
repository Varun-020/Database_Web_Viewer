import { Collapse } from "antd";
import { DatabaseOutlined, TableOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDatabase, setActiveTable } from "../../slices/DatabaseSlice";
const { Panel } = Collapse;

const Sidebar = ({ databases }) => {
  const dispatch = useDispatch();
  const { activeDatabase, activeTable } = useSelector((state) => state.db);

  const handleTableClick = (database, tableName) => {
    dispatch(setActiveDatabase(database));
    dispatch(setActiveTable(tableName));
  };

  return (
    <div className="sidebar-container">
      <Collapse
        accordion
        bordered={false}
        expandIconPosition="start"
        className="sidebar-collapse"
      >
        {databases.map(({ database, tables }) => (
          <Panel
            header={
              <span
                className={
                  activeDatabase == database
                    ? "sidebar-db-title active-db"
                    : "sidebar-db-title"
                }
                onClick={() => dispatch(setActiveDatabase(database))}
              >
                <DatabaseOutlined style={{ marginRight: 6 }} />
                {database}
              </span>
            }
            key={database}
            className="sidebar-panel"
            collapsible="icon"
          >
            {tables.length > 0 ? (
              <ul className="table-list">
                {tables.map((table) => (
                  <li
                    key={table}
                    className={
                      activeTable == table
                        ? "table-item active-db"
                        : "table-item"
                    }
                    onClick={() => handleTableClick(database, table)}
                  >
                    <TableOutlined style={{ marginRight: 6 }} />
                    {table}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-tables">No tables</div>
            )}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Sidebar;
