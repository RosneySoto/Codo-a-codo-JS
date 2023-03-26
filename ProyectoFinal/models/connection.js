const dotenv = require('dotenv');
dotenv.config()
// const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
// const { dataBase, database } = require('../config');


//////// CONEXION CON MYSQL //////////////
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT
// });

// connection.connect();

// module.exports = connection;


//////// CONEXION CON SEQUELIZE //////////////
// const sequelize = new Sequelize(
//   dataBase.database,
//   dataBase.username,
//   dataBase.password, {
//     host: dataBase.host,
//     dialect: 'mysql',
//     port: dataBase.port,
//     logging: true
//   }
// );

const sequelize = new Sequelize('mysql://ue36upubkeeicifm:AuKBpEIe18hMnz7iTXnT@bxqtqdz1eyww3h2ozhck-mysql.services.clever-cloud.com:3306/bxqtqdz1eyww3h2ozhck')

module.exports = sequelize;