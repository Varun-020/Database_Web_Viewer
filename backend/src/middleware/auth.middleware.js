const jwt = require("jsonwebtoken");
const MasterService = require("../services/master.service");
const wrapDbConnection = require("../utils/wrapDbConnection");

module.exports = async function connectDbMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const config = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const service = new MasterService(req);
    const connection = await service.connect(config);

    req.db = await wrapDbConnection(connection);
    next();
  } catch (err) {
    console.error("DB Middleware Error:", err.message);
    return res.status(403).json({ error: err.message });
  }
};
