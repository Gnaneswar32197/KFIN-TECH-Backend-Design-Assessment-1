const {
    addSIP,
    fetchSIP,
    getLatestNAV,
    addTransaction,
    fetchTransactions
} = require("../models/sipModel");




// CREATE SIP

const createSIP = async (req, res) => {

    try {

        await addSIP(req.body);

        res.status(201).json({
            message: "SIP created successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error creating SIP",
            error: err.message
        });
    }
};




// GET SIP

const getSIP = async (req, res) => {

    try {

        const sipId = req.params.sipId;

        const result = await fetchSIP(sipId);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "SIP not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching SIP"
        });
    }
};




// PROCESS SIP

const processSIP = async (req, res) => {

    try {

        const sipId = req.params.sipId;

        const sipResult = await fetchSIP(sipId);

        if (sipResult.rows.length === 0) {
            return res.status(404).json({
                message: "SIP not found"
            });
        }

        const sip = sipResult.rows[0];

        const navResult = await getLatestNAV(sip.fund_id);

        if (navResult.rows.length === 0) {
            return res.status(404).json({
                message: "NAV not found"
            });
        }

        const nav = navResult.rows[0];

        const units = sip.sip_amount / nav.nav_value;

        const transactionData = {
            transaction_id: "TXN" + Date.now(),
            sip_id: sip.sip_id,
            fund_id: sip.fund_id,
            transaction_amount: sip.sip_amount,
            nav_at_purchase: nav.nav_value,
            units_allocated: units,
            transaction_date: new Date().toISOString().split("T")[0]
        };

        await addTransaction(transactionData);

        res.status(200).json({
            message: "SIP processed successfully",
            transaction: transactionData
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error processing SIP",
            error: err.message
        });
    }
};




// GET TRANSACTIONS

const getTransactions = async (req, res) => {

    try {

        const sipId = req.params.sipId;

        const result = await fetchTransactions(sipId);

        res.status(200).json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching transactions"
        });
    }
};

module.exports = {
    createSIP,
    getSIP,
    processSIP,
    getTransactions
};