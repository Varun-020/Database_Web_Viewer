const DBRepository = require("../repositories/db.repository.js");
class DBService {
  constructor(req) {
    this.req = req;
    this.repository = new DBRepository(req);
  }

  async showDatabaseListWithTableNames() {
    try {
      let databasesResult = await this.repository.getAllDatabaseNames();
      const databases = databasesResult.map((row) => row.name);
      let result = [];
      for (const dbName of databases) {
        const tablesResult = await this.repository.getTableNamesForDatabase(
          dbName
        );
        const tables = tablesResult.map((row) => row.name);
        result.push({
          database: dbName,
          tables,
        });
      }

      return result;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  groupByDatabase = (data) => {
    const result = {};
    data.forEach(({ database_name, table_name }) => {
      if (!result[database_name]) result[database_name] = [];
      if (table_name) result[database_name].push(table_name);
    });
    return Object.entries(result).map(([database, tables]) => ({
      database,
      tables,
    }));
  };
}

module.exports = DBService;
