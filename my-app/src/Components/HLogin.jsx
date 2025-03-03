import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const HLogin = () => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    password: ""
  });
  

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const response= await axios.post("/api/login-hospital", formData);
      alert("Login successful!");
      if (typeof window !== "undefined") {
        localStorage.setItem("HName", response.Userr.hospitalName);
        localStorage.setItem("id", response.Userr._id);
        localStorage.setItem("contact", response.Userr.contactNumber);
      }
      router.push("/dashboard");
    } catch (error) {
      alert("Login failed! Invalid credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">Hospital Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="text" name="hospitalName" placeholder="Hospital Name" className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300" required onChange={handleChange} />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Login</button>
        </form>
        <p className="text-center mt-4">Don't have an account? <a href="/hregistration" className="text-blue-600 hover:underline">Register here</a></p>
      </div>
    </div>
  );
};

export default HLogin;
