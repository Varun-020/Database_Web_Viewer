const DBRepository = require("../repositories/db.repository.js");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const { Client: PgClient } = require("pg");
const { Connection } = require("tedious");
const sql = require("mssql");
const msnodesqlv8 = require("msnodesqlv8");

class MasterService {
  constructor(req) {
    this.req = req;
    this.repository = new DBRepository(req);
  }

  async connect({
    networkType,
    library,
    host,
    port,
    username,
    password,
    database,
    useWindowsAuth,
  }) {
    const defaultDatabaseMap = {
      "Microsoft SQL Server (TCP/IP)": "master",
      "MySQL (TCP/IP)": "information_schema",
      "PostgreSQL (TCP/IP)": "postgres",
    };

    const defaultDb = defaultDatabaseMap[networkType] || "default";
    const dbName = database && database.trim() !== "" ? database : defaultDb;

    let config = { library, host, port, username, password, database: dbName };

    if (useWindowsAuth && networkType == "Microsoft SQL Server (TCP/IP)") {
      return await this.connectViaWindowsAuth(config);
    }

    switch (networkType) {
      case "Microsoft SQL Server (TCP/IP)":
        return await this.connectMSSQL(config);
      case "MySQL (TCP/IP)":
        return await this.connectMySQL(config);
      case "PostgreSQL (TCP/IP)":
        return await this.connectPostgres(config);
      default:
        throw new Error("Unsupported network type");
    }
  }

  async connectViaWindowsAuth({ host, port, database }) {
    const db = database || "master";
    const instance =
      host === "127.0.0.1" ? "localhost\\SQLSERVER" : `${host}\\SQLSERVER`;
    const connectionString = `Driver={ODBC Driver 17 for SQL Server};Server=${instance};Database=${db};Trusted_Connection=Yes;`;

    return new Promise((resolve, reject) => {
      msnodesqlv8.query(connectionString, "SELECT 1", (err) => {
        if (err) {
          console.error("Windows Auth connection failed:", err);
          return reject(
            new Error(
              "Windows Authentication connection failed: " + err.message
            )
          );
        }

        const client = {
          connectionString,
          query: (sql) =>
            new Promise((res, rej) =>
              msnodesqlv8.query(connectionString, sql, (error, rows) => {
                if (error) rej(error);
                else res(rows);
              })
            ),
        };
        resolve(client);
      });
    });
  }

  async connectMSSQL({ library, host, port, username, password, database }) {
    if (library === "tedious") {
      const config = {
        server: host,
        authentication: {
          type: "default",
          options: { userName: username, password: password },
        },
        options: {
          database,
          encrypt: false,
          trustServerCertificate: true,
          port: parseInt(port),
        },
      };

      return new Promise((resolve, reject) => {
        const connection = new Connection(config);
        connection.on("connect", (err) => {
          if (err) reject(err);
          else resolve(connection);
        });
        connection.connect();
      });
    } else if (library === "mssql") {
      const config = {
        user: username,
        password,
        server: host,
        database,
        port: parseInt(port),
        options: { encrypt: false, trustServerCertificate: true },
      };

      try {
        const pool = await sql.connect(config);
        return pool;
      } catch (err) {
        console.log(err);
        throw err;
      }
    } else {
      throw new Error("Unsupported MSSQL library");
    }
  }

  async connectMySQL({ library, host, port, username, password, database }) {
    if (library === "mysql2") {
      const conn = await mysql.createConnection({
        host,
        user: username,
        password,
        database,
        port: parseInt(port),
      });
      return conn;
    } else {
      throw new Error("Unsupported MySQL library");
    }
  }

  async connectPostgres({ library, host, port, username, password, database }) {
    if (library === "pg") {
      const client = new PgClient({
        host,
        user: username,
        password,
        database,
        port: parseInt(port),
      });
      await client.connect();
      return client;
      t;
    } else {
      throw new Error("Unsupported PostgreSQL library");
    }
  }

  // async connect(args) {
  //   const { host, username, password, port } = args;

  //   try {
  //     const sequelize = new Sequelize("master", username, password, {
  //       host,
  //       port,
  //       dialect: "mssql",
  //       dialectOptions: {
  //         options: {
  //           encrypt: false,
  //           trustServerCertificate: true,
  //         },
  //       },
  //       logging: false,
  //     });
  //     await sequelize.authenticate();

  //     const token = jwt.sign(
  //       { host, username, password, port },
  //       process.env.JWT_SECRET_KEY,
  //       {
  //         expiresIn: process.env.JWT_VALIDITY,
  //       }
  //     );
  //     await sequelize.close();
  //     return { status: "success", message: "Connection Successful", token };
  //   } catch (err) {
  //     throw new Error("Connection failed: " + err.message);
  //   }
  // }
}

module.exports = MasterService;
