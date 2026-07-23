import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVehicle } from "../services/vehicle.service";
import { toast } from "react-toastify";

const AddVehicle = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("make", formData.make);
      data.append("model", formData.model);
      data.append("category", formData.category);
      data.append("price", Number(formData.price));
      data.append("quantity", Number(formData.quantity));

      if (image) {
        data.append("image", image);
      }

      await createVehicle(data);

      toast.success("Vehicle added successfully");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add vehicle"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6 mt-6">
      <h1 className="text-3xl font-bold mb-6">
        Add Vehicle
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="make"
          placeholder="Make"
          value={formData.make}
          onChange={handleChange}
          required
          className="w-full border rounded p-3"
        />

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          required
          className="w-full border rounded p-3"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border rounded p-3"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border rounded p-3"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="w-full border rounded p-3"
        />

        <div>
          <label className="block mb-2 font-semibold">
            Vehicle Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {preview && (
          <div>
            <img
              src={preview}
              alt="Preview"
              className="w-48 h-32 object-cover rounded border"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;