const db = require("../utility/dbManager");



const addSIP = (data, callback) => {

    const query = `
        INSERT INTO sip_registration
        (
            sip_id,
            portfolio_id,
            fund_id,
            sip_amount,
            sip_date,
            start_date,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        query,
        [
            data.sip_id,
            data.portfolio_id,
            data.fund_id,
            data.sip_amount,
            data.sip_date,
            data.start_date,
            data.status
        ],
        callback
    );
};



const fetchSIP = (sipId, callback) => {

    const query = `
        SELECT *
        FROM sip_registration
        WHERE sip_id = ?
    `;

    db.get(query, [sipId], callback);
};



const getLatestNAV = (fundId, callback) => {

    const query = `
        SELECT nav_value
        FROM nav_history
        WHERE fund_id = ?
        ORDER BY nav_date DESC
        LIMIT 1
    `;

    db.get(query, [fundId], callback);
};



const addTransaction = (data, callback) => {

    const query = `
        INSERT INTO investment_transaction
        (
            transaction_id,
            sip_id,
            fund_id,
            transaction_amount,
            nav_at_purchase,
            units_allocated,
            transaction_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        query,
        [
            data.transaction_id,
            data.sip_id,
            data.fund_id,
            data.transaction_amount,
            data.nav_at_purchase,
            data.units_allocated,
            data.transaction_date
        ],
        callback
    );
};



const fetchTransactions = (sipId, callback) => {

    const query = `
        SELECT *
        FROM investment_transaction
        WHERE sip_id = ?
    `;

    db.all(query, [sipId], callback);
};

module.exports = {
    addSIP,
    fetchSIP,
    getLatestNAV,
    addTransaction,
    fetchTransactions
};