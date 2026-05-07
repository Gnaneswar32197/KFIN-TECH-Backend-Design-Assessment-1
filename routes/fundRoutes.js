const express = require("express");
const router = express.Router();

const {
    createFund,
    getFunds,
    updateNAV
} = require("../controller/fundController");

router.post("/", createFund);

router.get("/", getFunds);

router.put("/:fundId/nav", updateNAV);

module.exports = router;