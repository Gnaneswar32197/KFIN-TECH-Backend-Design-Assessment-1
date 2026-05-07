const { signJwt } = require('../utility/authManager');

function login(req, res) {

    const { email, password } = req.body;

   
    if (email === 'nani@gmail.com' && password === 'nani') {

        const token = signJwt({
            email: email
        });

        return res.json({
            message: 'Login Success',
            token: token
        });
    }

    return res.status(401).json({
        message: 'Invalid Credentials'
    });
}

const {
    addInvestor,
    fetchInvestor,
    fetchHoldings,
    fetchNetWorth
} = require("../models/investorModel");



const createInvestor = (req, res) => {

    const data = req.body;

    addInvestor(data, (err) => {

        if (err) {

            if (err.message.includes("UNIQUE")) {
                return res.status(400).json({
                    message: "Investor already exists"
                });
            }

            return res.status(500).json({
                message: "Error creating investor",
                error: err.message
            });
        }

        res.status(201).json({
            message: "Investor created successfully"
        });
    });
};


const getInvestor = (req, res) => {

    const investorId = req.params.investorId;

    fetchInvestor(investorId, (err, row) => {

        if (err) {
            return res.status(500).json(err.message);
        }

        if (!row) {
            return res.status(404).json({
                message: "Investor not found"
            });
        }

        res.status(200).json(row);
    });
};



const getHoldings = (req, res) => {

    const investorId = req.params.investorId;

    fetchHoldings(investorId, (err, rows) => {

        if (err) {
            return res.status(500).json(err.message);
        }

        res.status(200).json(rows);
    });
};



const getNetWorth = (req, res) => {

    const investorId = req.params.investorId;

    fetchNetWorth(investorId, (err, row) => {

        if (err) {
            return res.status(500).json(err.message);
        }

        res.status(200).json(row);
    });
};

module.exports = {
    createInvestor,
    getInvestor,
    getHoldings,
    getNetWorth,
    login
};