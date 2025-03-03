import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const HRegistration = () => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    state: "",
    city: "",
    pincode: "",
    contactNumber: "",
    password: ""
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/Hospital/Register", formData, {
        withCredentials: true, // Ensures cookies are sent
      });
    
      if (response.data?.Userr) {
        const { hospitalName, _id, contactNumber } = response.data.Userr;
        if (typeof window !== "undefined") {
          localStorage.setItem("HName", hospitalName);
          localStorage.setItem("id", _id);
          localStorage.setItem("contact", contactNumber);
        }
      }
    
      alert("Registration successful!");
      router.push("/hospitalhome");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed!");
    }
  }    
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">Hospital Registration</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="text" name="hospitalName" placeholder="Hospital Name" className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300" required onChange={handleChange} />
          <input type="text" name="state" placeholder="State" className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300" required onChange={handleChange} />
          <input type="text" name="city" placeholder="City" className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300" required onChange={handleChange} />
          <input type="text" name="pincode" placeholder="Pincode" className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300" required onChange={handleChange} />
          <input type="text" name="contactNumber" placeholder="Contact Number" className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300" required onChange={handleChange} />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Register</button>
        </form>
        <p className="text-center mt-4">Already registered? <a href="/hlogin" className="text-blue-600 hover:underline">Login here</a></p>
      </div>
    </div>
  );
};

export default HRegistration;
