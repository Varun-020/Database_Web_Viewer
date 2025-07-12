const DBService = require("../services/db.service.js");

class DBController {
  async fetchDatabaseList(req, res) {
    try {
      const response = await new DBService(
        req
      ).showDatabaseListWithTableNames();
      res.status(200).json({ status: "success", response });
    } catch (err) {
      res.status(500).json({ status: "failed", error: err.message });
    }
  }
}

module.exports = new DBController();
