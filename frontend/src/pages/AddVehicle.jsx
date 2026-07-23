import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVehicle } from "../services/vehicle.service";

const AddVehicle = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createVehicle({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });

      alert("Vehicle added successfully");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add vehicle");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Vehicle</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="make"
          placeholder="Make"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="model"
          placeholder="Model"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
};

export default AddVehicle;