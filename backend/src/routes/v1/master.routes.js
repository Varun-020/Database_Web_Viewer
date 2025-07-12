const express = require("express");
const masterController = require("../../controllers/master.controller.js");

const router = express.Router();

router.post("/connect", masterController.connecMasterDatabase);

module.exports = router;
