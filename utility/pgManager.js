// const { Client, Pool } = require('pg')
// require('dotenv').config();
// const client = new Client({
//   host: 'aws-1-ap-south-1.pooler.supabase.com',
//   port: 6543,
//   user: 'postgres.zwhgoqgjskmehppiryjx',
//   password: process.env.password,
//   database: 'postgres',
//   maxUses: 4,
//   ssl: {
//     rejectUnauthorized: false
//   }
// })

// async function run() {
//   await client.connect()

//   const res = await client.query('SELECT * FROM investor;')
//   console.log(res.rows)

//   //await client.end()
// }

// run()
// module.exports = client;

const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
    host: "aws-1-ap-south-1.pooler.supabase.com",
    port: 6543,
    user: "postgres.zwhgoqgjskmehppiryjx",
    password: process.env.password,
    database: "postgres",
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect()
.then(() => {
    console.log("Connected to PostgreSQL");
})
.catch((err) => {
    console.log("DB Connection Error", err);
});

module.exports = client;