const { decrypt } = require("../utils/encryptdecrypt.util");

require("dotenv").config();

module.exports = {
  mode: "http",
  corsWhiteListUrls: ["http://localhost:3000", "localhost:9000"],
  port: process.env.PORT || 9000,
  jwtSecret:
    process.env.JWT_SECRET ||
    "e6a1d14f8d6f3b5d04c9efc9d2e0a8b342e4b9c8f43a12b65a6a2baf062dbd8f",
  openAIAPIKey: process.env.OPENAI_API_KEY,
  database: {
    dialect: "mssql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    schema: "dbo",
    username: process.env.DB_USER,
    password: decrypt(process.env.DB_PASSWORD),
    logging: console.log,
    adminConfig: {
      dialect: "mssql",
      dialectOptions: {
        options: {
          encrypt: false,
          enableArithAbort: true,
          integratedSecurity: true,
          trustServerCertificate: true,
          rowCollectionOnDone: true,
          database: process.env.DB_NAME,
          requestTimeout: 60000,
        },
      },
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      logging: console.log,
      pool: {
        max: 10,
        min: 0,
        idle: 60000,
        acquire: 180000,
      },
    },
  },
  certificate: {
    key: "path",
    cert: "path",
  },
};
