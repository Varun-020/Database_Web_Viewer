const DBRepository = require("../repositories/db.repository.js");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");

class DBService {
  constructor(req) {
    this.req = req;
    this.repository = new DBRepository(req);
  }

   async showDatabaseListWithTableNames() {
    try {
      let data = await this.repository.getAllDatabaseNames();
      console.log(data);
      
      const explorer = this.groupByDatabase(data);
      return explorer;
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
