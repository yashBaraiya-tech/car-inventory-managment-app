const vehicleService = require("../services/vehicle.service");

const createVehicle = async (req, res) => {
  try {
    const result = await vehicleService.createVehicle(req.body);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllVehicles = async (req, res) => {
  try {
    const result = await vehicleService.getAllVehicles();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
};