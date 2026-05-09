// const {
//     addFund,
//     fetchFunds,
//     insertNAV
// } = require("../models/fundModel");



// const createFund = (req, res) => {

//     const data = req.body;

//     addFund(data, function(err) {

//         if (err) {
//             return res.status(500).json({
//                 message: "Error creating fund",
//                 error: err.message
//             });
//         }

//         res.status(201).json({
//             message: "Fund created successfully"
//         });
//     });
// };



// const getFunds = (req, res) => {

//     fetchFunds((err, rows) => {

//         if (err) {
//             return res.status(500).json({
//                 error: err.message
//             });
//         }

//         res.status(200).json(rows);
//     });
// };



// const updateNAV = (req, res) => {

//     console.log(req.body);

//     const fundId = req.params.fundId;

//     const data = {
//         fund_id: fundId,
//         nav_value: req.body.nav_value,
//         nav_date: req.body.nav_date
//     };

//     insertNAV(data, function(err) {

//         if (err) {
//             return res.status(500).json(err.message);
//         }

//         res.json({
//             message: "NAV updated successfully"
//         });
//     });
// };

// module.exports = {
//     createFund,
//     getFunds,
//     updateNAV
// };
const {
    addFund,
    fetchFunds,
    insertNAV
} = require("../models/fundModel");




// CREATE FUND

const createFund = async (req, res) => {

    try {

        await addFund(req.body);

        res.status(201).json({
            message: "Fund created successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error creating fund",
            error: err.message
        });
    }
};




// GET ALL FUNDS

const getFunds = async (req, res) => {

    try {

        const result = await fetchFunds();

        res.status(200).json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching funds",
            error: err.message
        });
    }
};




// UPDATE NAV

const updateNAV = async (req, res) => {

    try {

        const fundId = req.params.fundId;

        const data = {
            fund_id: fundId,
            nav_value: req.body.nav_value,
            nav_date: req.body.nav_date
        };

        await insertNAV(data);

        res.status(200).json({
            message: "NAV updated successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error updating NAV",
            error: err.message
        });
    }
};

module.exports = {
    createFund,
    getFunds,
    updateNAV
};