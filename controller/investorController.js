// const { signJwt } = require('../utility/authManager');

// function login(req, res) {

//     const { email, password } = req.body;

   
//     if (email === 'nani@gmail.com' && password === 'nani') {

//         const token = signJwt({
//             email: email
//         });

//         return res.json({
//             message: 'Login Success',
//             token: token
//         });
//     }

//     return res.status(401).json({
//         message: 'Invalid Credentials'
//     });
// }

// const {
//     addInvestor,
//     fetchInvestor,
//     fetchHoldings,
//     fetchNetWorth
// } = require("../models/investorModel");



// const createInvestor = (req, res) => {

//     const data = req.body;

//     addInvestor(data, (err) => {

//         if (err) {

//             if (err.message.includes("UNIQUE")) {
//                 return res.status(400).json({
//                     message: "Investor already exists"
//                 });
//             }

//             return res.status(500).json({
//                 message: "Error creating investor",
//                 error: err.message
//             });
//         }

//         res.status(201).json({
//             message: "Investor created successfully"
//         });
//     });
// };


// const getInvestor = (req, res) => {

//     const investorId = req.params.investorId;

//     fetchInvestor(investorId, (err, row) => {

//         if (err) {
//             return res.status(500).json(err.message);
//         }

//         if (!row) {
//             return res.status(404).json({
//                 message: "Investor not found"
//             });
//         }

//         res.status(200).json(row);
//     });
// };



// const getHoldings = (req, res) => {

//     const investorId = req.params.investorId;

//     fetchHoldings(investorId, (err, rows) => {

//         if (err) {
//             return res.status(500).json(err.message);
//         }

//         res.status(200).json(rows);
//     });
// };



// const getNetWorth = (req, res) => {

//     const investorId = req.params.investorId;

//     fetchNetWorth(investorId, (err, row) => {

//         if (err) {
//             return res.status(500).json(err.message);
//         }

//         res.status(200).json(row);
//     });
// };

// module.exports = {
//     createInvestor,
//     getInvestor,
//     getHoldings,
//     getNetWorth,
//     login
// };

const {
    addInvestor,
    fetchInvestor,
    fetchHoldings,
    fetchNetWorth
} = require("../models/investorModel");

const { signJwt } = require("../utility/authManager");

const createInvestor = async (req, res) => {

    try {

        await addInvestor(req.body);

        res.status(201).json({
            message: "Investor created successfully"
        });

    } catch (err) {

        console.log(err);

        if (err.code === "23505") {
            return res.status(400).json({
                message: "Investor already exists"
            });
        }

        res.status(500).json({
            message: "Error creating investor"
        });
    }
};

const getInvestor = async (req, res) => {

    try {

        const investorId = req.params.investorId;

        const result = await fetchInvestor(investorId);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Investor not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching investor"
        });
    }
};

const getHoldings = async (req, res) => {

    try {

        const investorId = req.params.investorId;

        const result = await fetchHoldings(investorId);

        res.status(200).json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching holdings"
        });
    }
};




// GET NET WORTH

const getNetWorth = async (req, res) => {

    try {

        const investorId = req.params.investorId;

        const result = await fetchNetWorth(investorId);

        res.status(200).json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching net worth"
        });
    }
};


const login = async (req, res) => {

    const { email, password } = req.body;

    if (email === "nani@gmail.com" && password === "nani") {

        const token = signJwt({
            email
        });

        return res.json({
            message: "Login Success",
            token
        });
    }

    return res.status(401).json({
        message: "Invalid Credentials"
    });
};

module.exports = {
    createInvestor,
    getInvestor,
    getHoldings,
    getNetWorth,
    login
};