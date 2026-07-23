import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/auth.service";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      await registerUser(formData);

      alert("Registration successful");

      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">


        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Create Account 🚘
          </h1>

          <p className="text-gray-500 mt-2">
            Join the vehicle inventory system
          </p>

        </div>



        <form onSubmit={handleSubmit} className="space-y-5">


          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />


          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />


          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />



          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </button>


        </form>



        <p className="text-center mt-6 text-gray-600">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>


      </div>

    </div>
  );
};

export default Register;