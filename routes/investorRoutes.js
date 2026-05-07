const express = require('express');

const router = express.Router();

const { login } = require('../controller/investorController');
const {
    createInvestor,
    getInvestor,
    getHoldings,
    getNetWorth
} = require("../controller/investorController");
const { checkAccess } = require("../utility/middleware");

router.post('/login', login);


router.post("/",createInvestor);

router.get("/:investorId", getInvestor);

router.get("/:investorId/holdings", getHoldings);

router.get("/:investorId/networth", getNetWorth);


module.exports = router;