const {
    addSIP,
    fetchSIP,
    getLatestNAV,
    addTransaction,
    fetchTransactions
} = require("../models/sipModel");



const createSIP = (req, res) => {

    const data = req.body;

    addSIP(data, (err) => {

        if (err) {
            return res.status(500).json({
                message: "Error creating SIP",
                error: err.message
            });
        }

        res.status(201).json({
            message: "SIP created successfully"
        });
    });
};



const getSIP = (req, res) => {

    const sipId = req.params.sipId;

    fetchSIP(sipId, (err, row) => {

        if (err) {
            return res.status(500).json(err.message);
        }

        res.status(200).json(row);
    });
};



const processSIP = (req, res) => {

    const sipId = req.params.sipId;

    fetchSIP(sipId, (err, sip) => {

        if (err || !sip) {
            return res.status(404).json({
                message: "SIP not found"
            });
        }

        getLatestNAV(sip.fund_id, (err, nav) => {

            if (err || !nav) {
                return res.status(404).json({
                    message: "NAV not found"
                });
            }

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

            addTransaction(transactionData, (err) => {

                if (err) {
                    return res.status(500).json({
                        message: "Error processing SIP",
                        error: err.message
                    });
                }

                res.status(200).json({
                    message: "SIP processed successfully",
                    transaction: transactionData
                });
            });
        });
    });
};



const getTransactions = (req, res) => {

    const sipId = req.params.sipId;

    fetchTransactions(sipId, (err, rows) => {

        if (err) {
            return res.status(500).json(err.message);
        }

        res.status(200).json(rows);
    });
};

module.exports = {
    createSIP,
    getSIP,
    processSIP,
    getTransactions
};