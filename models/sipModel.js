const client = require("../utility/pgManager");




// ADD SIP

const addSIP = async (data) => {

    const {
        sip_id,
        portfolio_id,
        fund_id,
        sip_amount,
        sip_date,
        start_date,
        status
    } = data;

    const query = `
        INSERT INTO sip_registration(
            sip_id,
            portfolio_id,
            fund_id,
            sip_amount,
            sip_date,
            start_date,
            status
        )
        VALUES($1,$2,$3,$4,$5,$6,$7)
    `;

    return client.query(query, [
        sip_id,
        portfolio_id,
        fund_id,
        sip_amount,
        sip_date,
        start_date,
        status
    ]);
};




// FETCH SIP

const fetchSIP = async (sipId) => {

    const query = `
        SELECT *
        FROM sip_registration
        WHERE sip_id = $1
    `;

    return client.query(query, [sipId]);
};




// GET LATEST NAV

const getLatestNAV = async (fundId) => {

    const query = `
        SELECT nav_value
        FROM nav_history
        WHERE fund_id = $1
        ORDER BY nav_date DESC
        LIMIT 1
    `;

    return client.query(query, [fundId]);
};




// ADD TRANSACTION

const addTransaction = async (data) => {

    const {
        transaction_id,
        sip_id,
        fund_id,
        transaction_amount,
        nav_at_purchase,
        units_allocated,
        transaction_date
    } = data;

    const query = `
        INSERT INTO investment_transaction(
            transaction_id,
            sip_id,
            fund_id,
            transaction_amount,
            nav_at_purchase,
            units_allocated,
            transaction_date
        )
        VALUES($1,$2,$3,$4,$5,$6,$7)
    `;

    return client.query(query, [
        transaction_id,
        sip_id,
        fund_id,
        transaction_amount,
        nav_at_purchase,
        units_allocated,
        transaction_date
    ]);
};




// FETCH TRANSACTIONS

const fetchTransactions = async (sipId) => {

    const query = `
        SELECT *
        FROM investment_transaction
        WHERE sip_id = $1
    `;

    return client.query(query, [sipId]);
};

module.exports = {
    addSIP,
    fetchSIP,
    getLatestNAV,
    addTransaction,
    fetchTransactions
};