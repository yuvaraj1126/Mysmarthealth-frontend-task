import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "../services/authApi.js";

function Register() {
  const authService = new AuthService();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    username: formData.name,
    email: formData.email,
    password: formData.password
  };

  console.log("Sending:", payload);

  const res = await authService.createUser(payload);

  if (res?.status === 201 || res?.status === 200) {
    navigate("/login");
  } else {
    alert(res.message || "Registration failed");
  }
};

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Register
        </button>
        <p className="text-sm mt-2 text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
