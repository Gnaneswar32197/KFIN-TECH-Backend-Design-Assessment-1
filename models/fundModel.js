// const db = require('../utility/pgManager');



// const addFund = (data, callback) => {

//     const query = `
//         INSERT INTO mutual_fund
//         (fund_id, amc_id, fund_name, fund_category, fund_type)
//         VALUES (?, ?, ?, ?, ?)
//     `;

//     db.run(
//         query,
//         [
//             data.fund_id,
//             data.amc_id,
//             data.fund_name,
//             data.fund_category,
//             data.fund_type
//         ],
//         callback
//     );
// };



// const fetchFunds = (callback) => {

//     const query = `
//         SELECT
//             mf.fund_id,
//             mf.fund_name,
//             mf.fund_category,
//             mf.fund_type,
//             a.amc_name
//         FROM mutual_fund mf
//         INNER JOIN amc a
//         ON mf.amc_id = a.amc_id
//     `;

//     db.all(query, [], (err, rows) => {

//         if (err) {
//             console.log(err);
//         }

//         callback(err, rows);
//     });
// };


// const insertNAV = (data, callback) => {

//     const query = `
//         INSERT INTO nav_history
//         (fund_id, nav_value, nav_date)
//         VALUES (?, ?, ?)
//     `;

//     db.run(
//         query,
//         [
//             data.fund_id,
//             data.nav_value,
//             data.nav_date
//         ],
//         function(err) {
//             callback(err);
//         }
//     );
// };

// module.exports = {
//     addFund,
//     fetchFunds,
//     insertNAV
// };
const client = require("../utility/pgManager");



// ADD FUND

const addFund = async (data) => {

    const {
        fund_id,
        amc_id,
        fund_name,
        fund_category,
        fund_type
    } = data;

    const query = `
        INSERT INTO mutual_fund(
            fund_id,
            amc_id,
            fund_name,
            fund_category,
            fund_type
        )
        VALUES($1,$2,$3,$4,$5)
    `;

    return client.query(query, [
        fund_id,
        amc_id,
        fund_name,
        fund_category,
        fund_type
    ]);
};




// FETCH FUNDS

const fetchFunds = async () => {

    const query = `
        SELECT *
        FROM mutual_fund
        ORDER BY fund_name
    `;

    return client.query(query);
};




// INSERT NAV

const insertNAV = async (data) => {

    const {
        fund_id,
        nav_value,
        nav_date
    } = data;

    const query = `
        INSERT INTO nav_history(
            fund_id,
            nav_value,
            nav_date
        )
        VALUES($1,$2,$3)
    `;

    return client.query(query, [
        fund_id,
        nav_value,
        nav_date
    ]);
};

module.exports = {
    addFund,
    fetchFunds,
    insertNAV
};