const mongoose = require("mongoose");
const Vehicle = require("../models/Vehicle");

const createVehicle = async (vehicleData, file) => {
  const vehicle = await Vehicle.create({
    ...vehicleData,
    image: file ? `/uploads/${file.filename}` : "",
  });

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

  if (query.make)
    filter.make = { $regex: query.make, $options: "i" };

  if (query.model)
    filter.model = { $regex: query.model, $options: "i" };

  if (query.category)
    filter.category = {
      $regex: query.category,
      $options: "i",
    };

  if (query.minPrice || query.maxPrice) {
    filter.price = {};

    if (query.minPrice)
      filter.price.$gte = Number(query.minPrice);

    if (query.maxPrice)
      filter.price.$lte = Number(query.maxPrice);
  }

  const vehicles = await Vehicle.find(filter);

  return {
    success: true,
    count: vehicles.length,
    data: vehicles,
  };
};

const updateVehicle = async (id, vehicleData, file) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid vehicle ID");
  }

  const updateData = {
    ...vehicleData,
  };

  if (file) {
    updateData.image = `/uploads/${file.filename}`;
  }

  const vehicle = await Vehicle.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  return {
    success: true,
    message: "Vehicle updated successfully",
    data: vehicle,
  };
};

const deleteVehicle = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid vehicle ID");
  }

  const vehicle = await Vehicle.findByIdAndDelete(id);

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  return {
    success: true,
    message: "Vehicle deleted successfully",
  };
};

const purchaseVehicle = async (id, quantity) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid vehicle ID");
  }

  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  if (quantity <= 0) {
    throw new Error(
      "Purchase quantity must be greater than zero"
    );
  }

  if (vehicle.quantity < quantity) {
    throw new Error("Insufficient stock");
  }

  vehicle.quantity -= quantity;

  await vehicle.save();

  return {
    success: true,
    message: "Vehicle purchased successfully",
    data: vehicle,
  };
};

const restockVehicle = async (id, quantity) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid vehicle ID");
  }

  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  if (quantity <= 0) {
    throw new Error(
      "Restock quantity must be greater than zero"
    );
  }

  vehicle.quantity += quantity;

  await vehicle.save();

  return {
    success: true,
    message: "Vehicle restocked successfully",
    data: vehicle,
  };
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