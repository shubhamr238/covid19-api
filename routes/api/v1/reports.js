const express = require("express");
const router = express.Router();

const reportController=require('../../../controller/api/v1/reports');

router.get("/:status", reportController.status);

module.exports = router;