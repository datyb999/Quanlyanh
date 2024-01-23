const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: '51.79.165.207',
  port: 3306,
  user: 'khiem',
  password: 'password',
  database: 'WitherRecast',
  waitForConnections: true,
  connectionLimit: 1000,
  queueLimit: 0,
});

module.exports = { dbConnection: connection };
