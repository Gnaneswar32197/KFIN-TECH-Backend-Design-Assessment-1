// const db = require("../utility/pgManager");



// const addInvestor = (data, callback) => {

//     const query = `
//         INSERT INTO investor
//         (
//             investor_id,
//             first_name,
//             middle_name,
//             last_name,
//             pancard_no,
//             aadhaar_no,
//             passport_no,
//             date_of_birth,
//             gender,
//             occupation
//         )
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     db.run(
//         query,
//         [
//             data.investor_id,
//             data.first_name,
//             data.middle_name,
//             data.last_name,
//             data.pancard_no,
//             data.aadhaar_no,
//             data.passport_no,
//             data.date_of_birth,
//             data.gender,
//             data.occupation
//         ],
//         callback
//     );
// };



// const fetchInvestor = (investorId, callback) => {

//     const query = `
//         SELECT *
//         FROM investor
//         WHERE investor_id = ?
//     `;

//     db.get(query, [investorId], callback);
// };



// const fetchHoldings = (investorId, callback) => {

//     const query = `
//         SELECT
//             mf.fund_name,
//             ph.total_units,
//             nh.nav_value,
//             (ph.total_units * nh.nav_value) AS current_value
//         FROM portfolio_holdings ph

//         JOIN portfolio p
//         ON ph.portfolio_id = p.portfolio_id

//         JOIN mutual_fund mf
//         ON ph.fund_id = mf.fund_id

//         JOIN nav_history nh
//         ON mf.fund_id = nh.fund_id

//         WHERE p.investor_id = ?

//         AND nh.nav_date = (
//             SELECT MAX(nav_date)
//             FROM nav_history
//             WHERE fund_id = mf.fund_id
//         )
//     `;

//     db.all(query, [investorId], callback);
// };


// const fetchNetWorth = (investorId, callback) => {

//     const query = `
//         SELECT
//             SUM(ph.total_units * nh.nav_value) AS total_networth
//         FROM portfolio_holdings ph

//         JOIN portfolio p
//         ON ph.portfolio_id = p.portfolio_id

//         JOIN nav_history nh
//         ON ph.fund_id = nh.fund_id

//         WHERE p.investor_id = ?

//         AND nh.nav_date = (
//             SELECT MAX(nav_date)
//             FROM nav_history
//             WHERE fund_id = ph.fund_id
//         )
//     `;

//     db.get(query, [investorId], callback);
// };

// module.exports = {
//     addInvestor,
//     fetchInvestor,
//     fetchHoldings,
//     fetchNetWorth
// };

const client = require("../utility/pgManager");

const invalidTokens = [];

const addInvestor = async (data) => {

    const {
        investor_id,
        first_name,
        middle_name,
        last_name,
        pancard_no,
        aadhaar_no,
        date_of_birth,
        gender,
        occupation,
        passport_no
    } = data;

    const query = `
        INSERT INTO investor(
            investor_id,
            first_name,
            middle_name,
            last_name,
            pancard_no,
            aadhaar_no,
            date_of_birth,
            gender,
            occupation,
            passport_no
        )
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    `;

    return client.query(query, [
        investor_id,
        first_name,
        middle_name,
        last_name,
        pancard_no,
        aadhaar_no,
        date_of_birth,
        gender,
        occupation,
        passport_no
    ]);
};

const fetchInvestor = async (investorId) => {

    const query = `
        SELECT *
        FROM investor
        WHERE investor_id = $1
    `;

    return client.query(query, [investorId]);
};





// FETCH HOLDINGS

const fetchHoldings = async (investorId) => {

    const query = `
        SELECT
            mf.fund_name,
            ph.total_units,
            nh.nav_value,
            (ph.total_units * nh.nav_value) AS current_value

        FROM portfolio_holdings ph

        JOIN portfolio p
        ON ph.portfolio_id = p.portfolio_id

        JOIN mutual_fund mf
        ON ph.fund_id = mf.fund_id

        JOIN nav_history nh
        ON mf.fund_id = nh.fund_id

        WHERE p.investor_id = $1

        AND nh.nav_date = (
            SELECT MAX(nav_date)
            FROM nav_history
            WHERE fund_id = mf.fund_id
        )
    `;

    return client.query(query, [investorId]);
};




// FETCH NET WORTH

const fetchNetWorth = async (investorId) => {

    const query = `
        SELECT
            SUM(ph.total_units * nh.nav_value) AS total_networth

        FROM portfolio_holdings ph

        JOIN portfolio p
        ON ph.portfolio_id = p.portfolio_id

        JOIN nav_history nh
        ON ph.fund_id = nh.fund_id

        WHERE p.investor_id = $1

        AND nh.nav_date = (
            SELECT MAX(nav_date)
            FROM nav_history
            WHERE fund_id = ph.fund_id
        )
    `;

    return client.query(query, [investorId]);
};

module.exports = {
    addInvestor,
    fetchInvestor,
    fetchHoldings,
    fetchNetWorth,
    invalidTokens
};