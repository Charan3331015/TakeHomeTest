const { getCipherInfo } = require('crypto')
const { Pool,Client} = require('pg')

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "mypassword",
    database: "postgres"
})
module.exports = pool