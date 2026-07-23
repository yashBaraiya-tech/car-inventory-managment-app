const express = require("express");
const router = express.Router();

const {
  createVehicle,
  getAllVehicles,
} = require("../controllers/vehicle.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createVehicle);

router.get("/", authMiddleware, getAllVehicles);

module.exports = router;