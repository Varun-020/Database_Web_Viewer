const express = require("express");

const v1Routes = require("./v1");
// const v2Routes = require("./v2"); // Future-proofing

const router = express.Router();

router.use("/v1", v1Routes);
// router.use("/v2", v2Routes); // Future API versions

module.exports = router;
