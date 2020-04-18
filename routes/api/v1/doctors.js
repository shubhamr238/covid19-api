const express = require("express");
const router = express.Router();

const DoctorController=require('../../../controller/api/v1/doctors');

router.post("/register", DoctorController.register);
router.post("/login", DoctorController.login);

module.exports = router;