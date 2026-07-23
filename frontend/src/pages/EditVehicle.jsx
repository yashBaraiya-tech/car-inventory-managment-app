import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getVehicles,
  updateVehicle,
} from "../services/vehicle.service";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL.replace("/api", "");

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

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    loadVehicle();
  }, []);

  const loadVehicle = async () => {
    try {
      const res = await getVehicles();

      const vehicle = res.data.find((v) => v._id === id);

      if (!vehicle) {
        toast.error("Vehicle not found");
        return;
      }

      setFormData({
        make: vehicle.make,
        model: vehicle.model,
        category: vehicle.category,
        price: vehicle.price,
        quantity: vehicle.quantity,
      });

      if (vehicle.image) {
        setPreview(`${API_URL}${vehicle.image}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load vehicle");
    }
  };

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

      await updateVehicle(id, data);

      toast.success("Vehicle updated successfully");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6 mt-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Vehicle
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="make"
          value={formData.make}
          onChange={handleChange}
          placeholder="Make"
          className="w-full border rounded p-3"
          required
        />

        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
          className="w-full border rounded p-3"
          required
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border rounded p-3"
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border rounded p-3"
          required
        />

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full border rounded p-3"
          required
        />

        <div>
          <label className="block font-semibold mb-2">
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
              alt="Vehicle"
              className="w-60 h-40 object-cover rounded border"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Update Vehicle
        </button>
      </form>
    </div>
  );
};

export default EditVehicle;