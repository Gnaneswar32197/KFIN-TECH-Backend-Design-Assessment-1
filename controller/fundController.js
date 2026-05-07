const {
    addFund,
    fetchFunds,
    insertNAV
} = require("../models/fundModel");



const createFund = (req, res) => {

    const data = req.body;

    addFund(data, function(err) {

        if (err) {
            return res.status(500).json({
                message: "Error creating fund",
                error: err.message
            });
        }

        res.status(201).json({
            message: "Fund created successfully"
        });
    });
};



const getFunds = (req, res) => {

    fetchFunds((err, rows) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(200).json(rows);
    });
};



const updateNAV = (req, res) => {

    console.log(req.body);

    const fundId = req.params.fundId;

    const data = {
        fund_id: fundId,
        nav_value: req.body.nav_value,
        nav_date: req.body.nav_date
    };

    insertNAV(data, function(err) {

        if (err) {
            return res.status(500).json(err.message);
        }

        res.json({
            message: "NAV updated successfully"
        });
    });
};

module.exports = {
    createFund,
    getFunds,
    updateNAV
};