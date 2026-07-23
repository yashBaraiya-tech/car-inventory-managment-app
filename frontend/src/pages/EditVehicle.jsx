import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVehicles, updateVehicle } from "../services/vehicle.service";

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    loadVehicle();
  }, []);

  const loadVehicle = async () => {
    try {
      const res = await getVehicles();

      const vehicle = res.data.find((v) => v._id === id);

      if (!vehicle) {
        alert("Vehicle not found");
        return;
      }

      setFormData(vehicle);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateVehicle(id, {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });

      alert("Vehicle updated successfully");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Vehicle</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="make"
          value={formData.make}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="model"
          value={formData.model}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Update Vehicle</button>
      </form>
    </div>
  );
};

export default EditVehicle;