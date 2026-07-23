import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getVehicles,
  deleteVehicle,
} from "../services/vehicle.service";
import { useAuth } from "../context/AuthContext";

const Vehicles = () => {
  const { user } = useAuth();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) return;

    try {
      await deleteVehicle(id);

      alert("Vehicle deleted successfully");

      loadVehicles();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Vehicle Inventory</h2>

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

                  {user?.role === "admin" && (
                    <>
                      {" "}
                      <button
                        onClick={() => handleDelete(vehicle._id)}
                        style={{
                          marginLeft: "10px",
                          color: "white",
                          background: "red",
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