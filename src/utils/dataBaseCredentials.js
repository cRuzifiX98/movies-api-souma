const mysql = require('mysql');

module.exports.con = mysql.createConnection({
  host: '172.17.0.2',
  user: 'root',
  password: 'root',
  database: 'test',
});
