const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const config = require("./config/config");



const apiRoutes = require("./routes");

const corsOption = {
  credentials: true,
  origin: config.corsWhiteListUrls,
  methods: ["GET", "POST"],
};

app.use(cors(corsOption));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define API Routes
app.use("/api", apiRoutes);

// Server Setup
var server;
if (config.mode == "https") {
  var httpsoptions = {
    key: fs.readFileSync(config.certificate.key),
    cert: fs.readFileSync(config.certificate.cert),
  };
  server = require("https").createServer(httpsoptions, app);
} else {
  server = require("http").createServer(app);
}

module.exports = server;
