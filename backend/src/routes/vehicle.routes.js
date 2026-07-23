const express = require("express");
const router = express.Router();

const {
  createVehicle,
  getAllVehicles,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
} = require("../controllers/vehicle.controller");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

router.post("/", authMiddleware, createVehicle);

router.get("/", authMiddleware, getAllVehicles);

router.get("/search", authMiddleware, searchVehicles);

router.put("/:id", authMiddleware, updateVehicle);

router.delete("/:id", authMiddleware, adminMiddleware, deleteVehicle);

router.post("/:id/purchase", authMiddleware, purchaseVehicle);

router.post(
  "/:id/restock",
  authMiddleware,
  adminMiddleware,
  restockVehicle
);

module.exports = router;