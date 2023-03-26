const dotenv = require('dotenv');
dotenv.config()

const PORT = process.env.PORT || 8080


module.exports = {
    PORT,
    dataBase: {
        username: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
}
