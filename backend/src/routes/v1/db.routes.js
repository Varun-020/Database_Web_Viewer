const express = require("express");
const dbController = require("../../controllers/db.controller.js");

const router = express.Router();

router.get("/explorer", dbController.fetchDatabaseList);

module.exports = router;
