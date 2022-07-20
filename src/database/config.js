require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_OPTIONS = process.env.DB_OPTIONS

module.exports = { 
    host: DB_HOST, 
    username: DB_USER, 
    password: DB_PASSWORD, 
    options: DB_OPTIONS
}