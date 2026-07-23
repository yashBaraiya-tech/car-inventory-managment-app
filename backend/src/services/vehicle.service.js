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

const searchVehicles = async (query) => {
  const filter = {};

  if (query.make) {
    filter.make = { $regex: query.make, $options: "i" };
  }

  if (query.model) {
    filter.model = { $regex: query.model, $options: "i" };
  }

  if (query.category) {
    filter.category = { $regex: query.category, $options: "i" };
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};

    if (query.minPrice) {
      filter.price.$gte = Number(query.minPrice);
    }

    if (query.maxPrice) {
      filter.price.$lte = Number(query.maxPrice);
    }
  }

  const vehicles = await Vehicle.find(filter);

  return {
    success: true,
    count: vehicles.length,
    data: vehicles,
  };
};

const updateVehicle = async (id, vehicleData) => {
  const vehicle = await Vehicle.findByIdAndUpdate(id, vehicleData, {
    new: true,
    runValidators: true,
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  return {
    success: true,
    message: "Vehicle updated successfully",
    data: vehicle,
  };
};

module.exports = {
  createVehicle,
  getAllVehicles,
  searchVehicles,
  updateVehicle,
};