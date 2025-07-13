const { Op } = require("sequelize");

class DBRepository {
  constructor(req) {
    this.db = req.db;
  }

  async getAllDatabaseNames() {
    const queryMap = {
      mysql: `
    SELECT table_schema AS database_name, table_name
    FROM information_schema.tables
    WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('information_schema', 'mysql', 'performance_schema', 'sys')
    ORDER BY table_schema, table_name;
  `,
      postgres: `
    SELECT table_catalog AS database_name, table_name
    FROM information_schema.tables
    WHERE table_type = 'BASE TABLE'
      AND table_schema NOT IN ('pg_catalog', 'information_schema')
    ORDER BY table_catalog, table_name;
  `,
      mssql: `SELECT name FROM sys.databases WHERE state = 0`,
    };

    let dialect = "mssql";
    // if (this.db.getDialect) dialect = this.db.getDialect();
    // else if (this.db.constructor?.name === "Client") dialect = "postgres";
    // else if (this.db.execute) dialect = "mysql";

    const sql = queryMap[dialect] || queryMap.mssql;
    return await this.db.runQuery(sql);
  }

  async getTableNamesForDatabase(db) {
    const queryMap = {
      mysql: `
    SELECT table_schema AS database_name, table_name
    FROM information_schema.tables
    WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('information_schema', 'mysql', 'performance_schema', 'sys')
    ORDER BY table_schema, table_name;
  `,
      postgres: `
    SELECT table_catalog AS database_name, table_name
    FROM information_schema.tables
    WHERE table_type = 'BASE TABLE'
      AND table_schema NOT IN ('pg_catalog', 'information_schema')
    ORDER BY table_catalog, table_name;
  `,
      mssql: `SELECT name FROM [${db}].sys.tables`,
    };

    let dialect = "mssql";
    // if (this.db.getDialect) dialect = this.db.getDialect();
    // else if (this.db.constructor?.name === "Client") dialect = "postgres";
    // else if (this.db.execute) dialect = "mysql";

    const sql = queryMap[dialect] || queryMap.mssql;
    return await this.db.runQuery(sql);
  }
}

module.exports = DBRepository;
