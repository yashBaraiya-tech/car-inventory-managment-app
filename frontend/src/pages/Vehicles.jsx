import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getVehicles,
  searchVehicles,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
} from "../services/vehicle.service";
import { useAuth } from "../context/AuthContext";

const Vehicles = () => {
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
      <h2>Vehicle Inventory</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Make"
          value={filters.make}
          onChange={(e) =>
            setFilters({ ...filters, make: e.target.value })
          }
        />

        <input
          placeholder="Model"
          value={filters.model}
          onChange={(e) =>
            setFilters({ ...filters, model: e.target.value })
          }
          style={{ marginLeft: "10px" }}
        />

        <input
          placeholder="Category"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
          style={{ marginLeft: "10px" }}
        />

        <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
          Search
        </button>

        <button onClick={handleReset} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </div>

      {vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle._id}>
                <td>{vehicle.make}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.category}</td>
                <td>${vehicle.price}</td>
                <td>{vehicle.quantity}</td>

                <td>
                  <Link to={`/vehicles/edit/${vehicle._id}`}>
                    <button>Edit</button>
                  </Link>

                  <button
                    onClick={() => handlePurchase(vehicle._id)}
                    style={{ marginLeft: "5px" }}
                  >
                    Purchase
                  </button>

                  {user?.role === "admin" && (
                    <>
                      <button
                        onClick={() => handleRestock(vehicle._id)}
                        style={{ marginLeft: "5px" }}
                      >
                        Restock
                      </button>

                      <button
                        onClick={() => handleDelete(vehicle._id)}
                        style={{
                          marginLeft: "5px",
                          background: "red",
                          color: "white",
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Vehicles;