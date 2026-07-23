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

const searchVehicles = async (req, res) => {
  try {
    const result = await vehicleService.searchVehicles(req.query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const result = await vehicleService.updateVehicle(req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const result = await vehicleService.deleteVehicle(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const purchaseVehicle = async (req, res) => {
  try {
    const result = await vehicleService.purchaseVehicle(
      req.params.id,
      req.body.quantity
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const restockVehicle = async (req, res) => {
  try {
    const result = await vehicleService.restockVehicle(
      req.params.id,
      req.body.quantity
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
};