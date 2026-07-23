const Vehicle = require("../models/Vehicle");

const createVehicle = async (vehicleData) => {
  const vehicle = await Vehicle.create(vehicleData);

  return {
    success: true,
    message: "Vehicle created successfully",
    data: vehicle,
  };
};

const getAllVehicles = async () => {
  const vehicles = await Vehicle.find().sort({ createdAt: -1 });

  return {
    success: true,
    count: vehicles.length,
    data: vehicles,
  };
};

module.exports = {
  createVehicle,
  getAllVehicles,
};