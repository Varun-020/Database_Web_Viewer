import { Table, Empty } from "antd";
import { useSelector } from "react-redux";

export default function QueryResultPanel() {
  const { queryResult } = useSelector((state) => state.db);

  if (!queryResult || queryResult.length === 0) {
    return <Empty description="No Data" style={{ marginTop: 20 }} />;
  }

  const columns = Object.keys(queryResult[0] || {}).map((key) => ({
    title: key,
    dataIndex: key,
    key,
  }));

  return <Table dataSource={queryResult} columns={columns} rowKey={(row) => row.id || JSON.stringify(row)} />;
}
