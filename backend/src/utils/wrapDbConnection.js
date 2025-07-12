// utils/wrapDbConnection.js
const { Request } = require("tedious");

async function wrapDbConnection(db) {
  // Sequelize
  if (typeof db.query === "function" && db.getDialect) {
    db.runQuery = async (sql) => {
      const [rows] = await db.query(sql);
      return rows;
    };
    return db;
  }
  // mysql2
  if (db.execute && typeof db.query === "function") {
    db.runQuery = async (sql) => {
      const [rows] = await db.query(sql);
      return rows;
    };
    return db;
  }

  // pg
  if (db.constructor?.name === "Client") {
    db.runQuery = async (sql) => {
      const result = await db.query(sql);
      return result.rows;
    };
    return db;
  }

  //mssql
  if (
    db.constructor?.name === "ConnectionPool" ||
    db.constructor?.name === "Transaction"
  ) {
    db.runQuery = async (sqlQuery) => {
      const result = await db.request().query(sqlQuery);
      return result.recordset;
    };
    return db;
  }

  // msnodesqlv8
  if (db.client === require("msnodesqlv8")) {
    db.runQuery = (sql) =>
      new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      });
    return db;
  }

  // tedious
  if (db.execSql) {
    db.runQuery = (sql) =>
      new Promise((resolve, reject) => {
        const rows = [];
        const request = new Request(sql, (err) => {
          if (err) return reject(err);
        });
        request.on("row", (columns) => {
          const row = {};
          columns.forEach((col) => (row[col.metadata.colName] = col.value));
          rows.push(row);
        });
        request.on("requestCompleted", () => resolve(rows));
        db.execSql(request);
      });
    return db;
  }

  throw new Error("Unknown DB connection type");
}

module.exports = wrapDbConnection;
