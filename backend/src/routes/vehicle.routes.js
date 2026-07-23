const express = require("express");
const router = express.Router();

const { createVehicle } = require("../controllers/vehicle.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createVehicle);

module.exports = router;