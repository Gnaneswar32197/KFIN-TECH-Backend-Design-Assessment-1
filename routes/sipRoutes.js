const express = require("express");

const router = express.Router();

const {
    createSIP,
    getSIP,
    processSIP,
    getTransactions
} = require("../controller/sipController");

router.post("/", createSIP);

router.get("/:sipId", getSIP);

router.post("/:sipId/process", processSIP);

router.get("/:sipId/transactions", getTransactions);

module.exports = router;