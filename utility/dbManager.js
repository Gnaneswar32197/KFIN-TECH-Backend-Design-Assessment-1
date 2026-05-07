const sqlite3 = require('sqlite3')
const db = new sqlite3.Database("C:\\Users\\DELL\\Downloads\\Assignment-2.db", (error) => {
    if (error) {
        console.log("Error Occured")
    } else {
        console.log("Connected to DB")
    }
})

module.exports = db;