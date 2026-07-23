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
import ConfirmModal from "../components/ConfirmModal";
import QuantityModal from "../components/QuantityModal";
import { toast } from "react-toastify";

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

  const [deleteId, setDeleteId] = useState(null);
  const [purchaseId, setPurchaseId] = useState(null);
  const [restockId, setRestockId] = useState(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const res = await getVehicles();
      setVehicles(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await searchVehicles(filters);
      setVehicles(res.data);
    } catch (error) {
      toast.error("Search failed");
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

  const confirmDelete = async () => {
    try {
      await deleteVehicle(deleteId);

      toast.success("Vehicle deleted successfully");

      loadVehicles();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }

    setDeleteId(null);
  };

  const confirmPurchase = async (quantity) => {
    try {
      await purchaseVehicle(purchaseId, quantity);

      toast.success("Purchase completed");

      loadVehicles();
    } catch (error) {
      toast.error(error.response?.data?.message || "Purchase failed");
    }

    setPurchaseId(null);
  };

  const confirmRestock = async (quantity) => {
    try {
      await restockVehicle(restockId, quantity);

      toast.success("Vehicle restocked");

      loadVehicles();
    } catch (error) {
      toast.error(error.response?.data?.message || "Restock failed");
    }

    setRestockId(null);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Vehicle Inventory
        </h2>

        <div className="flex flex-wrap gap-3 mb-6">
          <input
            className="border rounded px-3 py-2"
            placeholder="Make"
            value={filters.make}
            onChange={(e) =>
              setFilters({
                ...filters,
                make: e.target.value,
              })
            }
          />

          <input
            className="border rounded px-3 py-2"
            placeholder="Model"
            value={filters.model}
            onChange={(e) =>
              setFilters({
                ...filters,
                model: e.target.value,
              })
            }
          />

          <input
            className="border rounded px-3 py-2"
            placeholder="Category"
            value={filters.category}
            onChange={(e) =>
              setFilters({
                ...filters,
                category: e.target.value,
              })
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
            onDelete={setDeleteId}
            onPurchase={setPurchaseId}
            onRestock={setRestockId}
            onEdit={handleEdit}
          />
        )}
      </div>

      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Vehicle"
        message="Are you sure you want to delete this vehicle?"
        onConfirm={confirmDelete}
        onClose={() => setDeleteId(null)}
      />

      <QuantityModal
        isOpen={purchaseId !== null}
        title="Purchase Vehicle"
        onConfirm={confirmPurchase}
        onClose={() => setPurchaseId(null)}
      />

      <QuantityModal
        isOpen={restockId !== null}
        title="Restock Vehicle"
        onConfirm={confirmRestock}
        onClose={() => setRestockId(null)}
      />
    </>
  );
};

export default Vehicles;