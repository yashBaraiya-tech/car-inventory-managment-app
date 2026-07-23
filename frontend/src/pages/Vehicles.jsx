import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getVehicles,
  searchVehicles,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
} from "../services/vehicle.service";
import { useAuth } from "../context/AuthContext";
import VehicleTable from "../components/VehicleTable";

const Vehicles = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    make: "",
    model: "",
    category: "",
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const res = await getVehicles();
      setVehicles(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await searchVehicles(filters);
      setVehicles(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setFilters({
      make: "",
      model: "",
      category: "",
    });

    loadVehicles();
  };

  const handleEdit = (id) => {
    navigate(`/vehicles/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;

    try {
      await deleteVehicle(id);
      alert("Vehicle deleted");
      loadVehicles();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handlePurchase = async (id) => {
    const quantity = Number(prompt("Enter purchase quantity"));

    if (!quantity || quantity <= 0) return;

    try {
      await purchaseVehicle(id, quantity);
      alert("Purchase successful");
      loadVehicles();
    } catch (error) {
      alert(error.response?.data?.message || "Purchase failed");
    }
  };

  const handleRestock = async (id) => {
    const quantity = Number(prompt("Enter restock quantity"));

    if (!quantity || quantity <= 0) return;

    try {
      await restockVehicle(id, quantity);
      alert("Restock successful");
      loadVehicles();
    } catch (error) {
      alert(error.response?.data?.message || "Restock failed");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vehicle Inventory</h2>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          className="border rounded px-3 py-2"
          placeholder="Make"
          value={filters.make}
          onChange={(e) =>
            setFilters({ ...filters, make: e.target.value })
          }
        />

        <input
          className="border rounded px-3 py-2"
          placeholder="Model"
          value={filters.model}
          onChange={(e) =>
            setFilters({ ...filters, model: e.target.value })
          }
        />

        <input
          className="border rounded px-3 py-2"
          placeholder="Category"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>

        <button
          onClick={handleReset}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <VehicleTable
          vehicles={vehicles}
          user={user}
          onDelete={handleDelete}
          onPurchase={handlePurchase}
          onRestock={handleRestock}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default Vehicles;