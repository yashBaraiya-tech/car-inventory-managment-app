const express = require("express");
const router = express.Router();

const {
  createVehicle,
  getAllVehicles,
  searchVehicles,
  updateVehicle,
} = require("../controllers/vehicle.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createVehicle);

router.get("/", authMiddleware, getAllVehicles);

router.get("/search", authMiddleware, searchVehicles);

router.put("/:id", authMiddleware, updateVehicle);

module.exports = router;