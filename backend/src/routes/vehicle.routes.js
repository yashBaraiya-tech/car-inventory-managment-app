const express = require("express");
const router = express.Router();

const {
  createVehicle,
  getAllVehicles,
  searchVehicles,
} = require("../controllers/vehicle.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createVehicle);

router.get("/", authMiddleware, getAllVehicles);

router.get("/search", authMiddleware, searchVehicles);

module.exports = router;