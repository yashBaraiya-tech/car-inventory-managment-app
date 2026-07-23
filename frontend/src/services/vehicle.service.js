import api from "./api";

export const getVehicles = async (
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "desc"
) => {
  const response = await api.get("/vehicles", {
    params: {
      page,
      limit,
      sortBy,
      order,
    },
  });

  return response.data;
};

export const createVehicle = async (formData) => {
  const response = await api.post("/vehicles", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateVehicle = async (id, formData) => {
  const response = await api.put(`/vehicles/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteVehicle = async (id) => {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
};

export const searchVehicles = async (params) => {
  const response = await api.get("/vehicles/search", {
    params,
  });

  return response.data;
};

export const purchaseVehicle = async (id, quantity) => {
  const response = await api.post(`/vehicles/${id}/purchase`, {
    quantity,
  });

  return response.data;
};

export const restockVehicle = async (id, quantity) => {
  const response = await api.post(`/vehicles/${id}/restock`, {
    quantity,
  });

  return response.data;
};