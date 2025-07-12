const express = require("express");
const masterRoutes = require("./master.routes");
const dbRoutes = require("./db.routes.js");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

router.use("/master", masterRoutes);
router.use("/db", authMiddleware, dbRoutes);

module.exports = router;
