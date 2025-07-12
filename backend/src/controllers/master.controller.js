const jwt = require("jsonwebtoken");
const MasterService = require("../services/master.service.js");

class MasterController {
  async connecMasterDatabase(req, res) {
    const {
      host,
      username,
      password,
      port,
      networkType,
      library,
      database,
      useWindowsAuth,
    } = req.body;

    if (!networkType) {
      return res
        .status(400)
        .json({ status: "failed", error: "Network Type is required" });
    }
    if (!library) {
      return res
        .status(400)
        .json({ status: "failed", error: "Library is required" });
    }
    if (!host) {
      return res
        .status(400)
        .json({ status: "failed", error: "Hostname/IP is required" });
    }
    if (!username && !useWindowsAuth) {
      return res
        .status(400)
        .json({ status: "failed", error: "Username is required" });
    }
    if (!password && !useWindowsAuth) {
      return res
        .status(400)
        .json({ status: "failed", error: "Password is required" });
    }
    if (!port) {
      return res
        .status(400)
        .json({ status: "failed", error: "Port is required" });
    }

    try {
      const response = await new MasterService(req).connect(req.body);
      const token = jwt.sign(req.body, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_VALIDITY,
      });
      res
        .status(200)
        .json({ status: "success", message: "Connection Successful", token });
    } catch (err) {
      res.status(500).json({ status: "failed", error: err.message });
    }
  }
}

module.exports = new MasterController();
